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

  // Check authentication
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const supabase = supabaseAdmin();

    // Fetch all surveys with their report data
    const { data, error } = await supabase
      .from('mvp_planner_responses')
      .select(`
        id,
        project_name,
        user_first_name,
        user_email,
        responses,
        completed_at,
        created_at,
        mvp_planner_reports (
          id,
          access_token,
          report_status,
          report_content
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching surveys:', error);
      return res.status(500).json({ error: 'Failed to fetch surveys' });
    }

    // Transform the data for easier consumption
    const surveys = data?.map(survey => {
      const report = survey.mvp_planner_reports?.[0];
      let packageType = 'Unknown';
      let projectDescription = '';
      
      if (report?.report_content) {
        try {
          const content = typeof report.report_content === 'string' 
            ? JSON.parse(report.report_content) 
            : report.report_content;
          packageType = content.investment?.mvpPackage?.name || 'Unknown';
          projectDescription = content.summary?.description || '';
        } catch (e) {
          console.error('Error parsing report content:', e);
        }
      }

      // Extract responses if available
      let platform = '';
      let targetUser = '';
      if (survey.responses) {
        platform = survey.responses.platform || '';
        targetUser = survey.responses.targetUser || '';
      }

      return {
        id: survey.id,
        projectName: survey.project_name,
        userName: survey.user_first_name || 'Unknown',
        email: survey.user_email,
        platform,
        targetUser,
        projectDescription,
        packageType,
        status: report?.report_status || 'pending',
        reportToken: report?.access_token || null,
        completedAt: survey.completed_at,
        createdAt: survey.created_at,
      };
    }) || [];

    res.status(200).json({ surveys });
  } catch (error) {
    console.error('Error in surveys API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}