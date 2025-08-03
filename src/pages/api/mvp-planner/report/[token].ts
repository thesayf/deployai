import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const supabase = supabaseAdmin();

    // Get report by access token
    const { data: report, error: reportError } = await supabase
      .from('mvp_planner_reports')
      .select(`
        id,
        report_status,
        report_content,
        mvp_planner_response_id,
        created_at,
        mvp_planner_responses (
          user_email,
          user_first_name,
          project_name,
          responses,
          total_score,
          completed_at
        )
      `)
      .eq('access_token', token)
      .single();

    if (reportError || !report) {
      console.error('Error fetching report:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }

    // Extract the nested response data
    const response = report.mvp_planner_responses;
    if (!response) {
      return res.status(404).json({ error: 'Quiz response not found' });
    }

    // Check if report has been generated
    if (report.report_status === 'completed' && report.report_content) {
      // Return the AI-generated content
      try {
        const reportContent = typeof report.report_content === 'string' 
          ? JSON.parse(report.report_content)
          : report.report_content;
        
        res.status(200).json({
          status: 'completed',
          content: reportContent,
          userInfo: {
            email: response.user_email,
            firstName: response.user_first_name,
            projectName: response.project_name,
          }
        });
      } catch (parseError) {
        console.error('Error parsing report content:', parseError);
        res.status(500).json({ error: 'Invalid report content' });
      }
    } else if (report.report_status === 'failed') {
      res.status(200).json({
        status: 'failed',
        error: 'Report generation failed. Please try again.',
        userInfo: {
          email: response.user_email,
          firstName: response.user_first_name,
          projectName: response.project_name,
        }
      });
    } else {
      // Report is still generating
      res.status(200).json({
        status: report.report_status || 'pending',
        userInfo: {
          email: response.user_email,
          firstName: response.user_first_name,
          projectName: response.project_name,
        },
        responses: response.responses
      });
    }
  } catch (error) {
    console.error('Error in report endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
}