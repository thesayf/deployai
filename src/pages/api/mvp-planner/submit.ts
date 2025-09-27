import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitMVPPlannerRequest, SubmitMVPPlannerResponse } from '@/types/mvp-planner';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest, addTenantIdToData } from '@/utils/tenant-helpers';
import { tenantService } from '@/services/tenant';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitMVPPlannerResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { quizId, responses, totalScore } = req.body as SubmitMVPPlannerRequest;

    if (!quizId || !responses) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const supabase = supabaseAdmin();

    // Get tenant context if available
    const tenantContext = await getTenantFromRequest(req);

    // Check if tenant can use assessment
    if (tenantContext) {
      if (!tenantContext.canUseAssessment) {
        return res.status(403).json({
          success: false,
          error: `Assessment limit reached. You have used ${tenantContext.tenant.assessments_used} of ${tenantContext.tenant.assessments_limit || 'unlimited'} assessments.`,
        });
      }
    }

    // Update quiz response with final data
    const updateData = addTenantIdToData({
      responses,
      total_score: totalScore,
      completed_at: new Date().toISOString(),
    }, tenantContext?.tenant.id);

    const { error: updateError } = await supabase
      .from('mvp_planner_responses')
      .update(updateData)
      .eq('id', quizId);

    if (updateError) {
      console.error('Error updating quiz response:', updateError);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit quiz',
      });
    }

    // Create report entry
    const insertData = addTenantIdToData({
      mvp_planner_response_id: quizId,
      report_status: 'pending',
    }, tenantContext?.tenant.id);

    const { data: reportData, error: reportError } = await supabase
      .from('mvp_planner_reports')
      .insert(insertData)
      .select('id, access_token')
      .single();

    if (reportError || !reportData) {
      console.error('Error creating report:', reportError);
      return res.status(500).json({
        success: false,
        error: 'Failed to create report',
      });
    }

    // Trigger AI report generation asynchronously
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mvp-planner/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-api-key': process.env.INTERNAL_API_KEY!,
      },
      body: JSON.stringify({ reportId: reportData.id }),
    }).catch(error => {
      console.error('Error triggering report generation:', error);
    });

    // Increment tenant usage if applicable
    if (tenantContext) {
      await tenantService.incrementAssessmentUsage(tenantContext.tenant.id);
    }

    res.status(200).json({
      success: true,
      reportId: reportData.id,
      accessToken: reportData.access_token,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz',
    });
  }
}