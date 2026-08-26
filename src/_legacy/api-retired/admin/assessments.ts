import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { checkAdminAuth } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication using JWT token (same as surveys endpoint)
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const supabase = supabaseAdmin();

    // Fetch AI assessments with user data
    const { data: assessments, error } = await supabase
      .from('quiz_responses')
      .select(`
        id,
        user_email,
        user_first_name,
        user_last_name,
        user_company,
        responses,
        created_at,
        ai_reports (
          id,
          report_status,
          access_token,
          email_sent_at,
          created_at,
          updated_at
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[ASSESSMENTS API] Error fetching assessments:', error);
      return res.status(500).json({ error: 'Failed to fetch assessments', details: error.message });
    }

    // Format the data for the admin interface
    const formattedAssessments = assessments?.map(assessment => {
      const report = assessment.ai_reports?.[0];
      
      // Extract industry from responses
      let industry = 'Unknown';
      try {
        const responses = assessment.responses as any;
        if (responses?.industry) {
          industry = responses.industry;
        }
      } catch (e) {
        console.error('Error parsing responses:', e);
      }

      return {
        id: assessment.id,
        userEmail: assessment.user_email,
        userFirstName: assessment.user_first_name || '',
        userLastName: assessment.user_last_name || '',
        userName: `${assessment.user_first_name || ''} ${assessment.user_last_name || ''}`.trim() || 'Anonymous',
        company: assessment.user_company || 'N/A',
        industry,
        status: report?.report_status || 'pending',
        reportId: report?.id || null,
        accessToken: report?.access_token || null,
        emailSent: report?.email_sent_at ? true : false,
        createdAt: assessment.created_at,
        reportCreatedAt: report?.created_at || null,
        reportUpdatedAt: report?.updated_at || null
      };
    }) || [];

    res.status(200).json({ assessments: formattedAssessments });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}