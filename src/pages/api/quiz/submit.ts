import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitQuizRequest, SubmitQuizResponse, QuizResponseData } from '@/types/quiz';
import { supabaseAdmin } from '@/lib/supabase';
import quizData from '@/data/quiz-questions.json';
import { getTenantFromRequest, addTenantIdToData } from '@/utils/tenant-helpers';
import { tenantService } from '@/services/tenant';
import { notifyAssessmentCompleted, notifyUsageWarning } from '@/services/notifications';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitQuizResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      reportId: '', 
      processingTime: '',
      error: 'Method not allowed' 
    });
  }

  try {
    const { quizId, finalResponses } = req.body as SubmitQuizRequest;

    // Validate required fields
    if (!quizId || !finalResponses) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Missing required fields',
      });
    }

    // Validate all required questions are answered
    const requiredQuestions = quizData.questions.filter(q => q.required);
    const missingQuestions = requiredQuestions.filter(q => {
      const response = finalResponses[q.id as keyof QuizResponseData];
      return response === undefined || response === null || response === '';
    });

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: `Please answer all required questions. Missing: ${missingQuestions.map(q => q.title).join(', ')}`,
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
          reportId: '',
          processingTime: '',
          error: `Assessment limit reached. You have used ${tenantContext.tenant.assessments_used} of ${tenantContext.tenant.assessments_limit || 'unlimited'} assessments.`,
        });
      }
    }

    // Update quiz with final responses (no scoring)
    const updateData = addTenantIdToData({
      responses: finalResponses,
      industry: finalResponses.industry,
      company_size: finalResponses.companySize,
      completed_at: new Date().toISOString(),
    }, tenantContext?.tenant.id);

    const { data: updatedQuiz, error: updateError } = await supabase
      .from('quiz_responses')
      .update(updateData)
      .eq('id', quizId)
      .select()
      .single();

    if (updateError || !updatedQuiz) {
      console.error('Failed to update quiz:', updateError);
      return res.status(500).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Failed to submit quiz',
      });
    }

    // Check if a report already exists for this quiz
    console.log(`[SUBMIT] Checking for existing report for quiz ${quizId}...`);
    const { data: existingReport, error: existingCheckError } = await supabase
      .from('ai_reports')
      .select('id, access_token, report_status')
      .eq('quiz_response_id', quizId)
      .single();
    
    if (existingCheckError && existingCheckError.code !== 'PGRST116') {
      console.error('[SUBMIT] Error checking for existing report:', existingCheckError);
    }

    let report;
    
    if (existingReport) {
      // Report already exists, use it
      console.log(`[SUBMIT] DUPLICATE PREVENTED: Report already exists for quiz ${quizId}`);
      console.log(`[SUBMIT] Existing report ID: ${existingReport.id}`);
      console.log(`[SUBMIT] Existing report status: ${existingReport.report_status}`);
      report = existingReport;
      
      // Only return if report is already being processed or completed
      if (existingReport.report_status === 'pending' ||
          existingReport.report_status === 'generating' || 
          existingReport.report_status === 'completed') {
        console.log(`Report is already ${existingReport.report_status}, skipping duplicate trigger`);
        return res.status(200).json({
          success: true,
          reportId: existingReport.id,
          processingTime: '45-60 seconds',
        });
      }
    } else {
      // Create new AI report record with 'pending' status for async processing
      console.log(`[SUBMIT] No existing report found, creating new report for quiz ${quizId}...`);
      const insertData = addTenantIdToData({
        quiz_response_id: quizId,
        report_status: 'pending',  // Changed from 'generating' to 'pending' for async processing
        company_name: updatedQuiz.user_company || 'Your Organization',
        industry_context: finalResponses.industry,
      }, tenantContext?.tenant.id);

      const { data: newReport, error: reportError } = await supabase
        .from('ai_reports')
        .insert(insertData)
        .select('id, access_token')
        .single();

      if (reportError || !newReport) {
        console.error('[SUBMIT] Failed to create report:', reportError);
        return res.status(500).json({
          success: false,
          reportId: '',
          processingTime: '',
          error: 'Failed to create report',
        });
      }
      
      console.log(`[SUBMIT] NEW REPORT CREATED: ${newReport.id} for quiz ${quizId}`);
      report = newReport;
    }

    // Report is now created with 'pending' status
    // The workflow will handle updating to 'generating' when it starts processing
    console.log('[SUBMIT] Report created with status: pending');
    
    // Send confirmation email immediately
    console.log('[SUBMIT] Sending confirmation email...');
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`}/api/quiz/send-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quizId,
          reportId: report.id,
          userEmail: updatedQuiz.user_email || '',
          firstName: updatedQuiz.user_first_name || '',
          lastName: updatedQuiz.user_last_name || '',
          company: updatedQuiz.user_company || ''
        }),
      });
      
      if (!emailResponse.ok) {
        console.error('[SUBMIT] Failed to send confirmation email:', await emailResponse.text());
      } else {
        console.log('[SUBMIT] Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('[SUBMIT] Error sending confirmation email:', emailError);
      // Don't fail the whole process if email fails
    }
    
    // Trigger workflow processing (via Upstash Workflow for long-running operations)
    console.log('[SUBMIT] Triggering workflow processing...');
    
    try {
      // Ensure we have a full URL with protocol
      let baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
      
      // Add protocol if missing
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        // In production, use https by default
        baseUrl = `https://${baseUrl}`;
      }
      
      // Import workflow client
      const { triggerWorkflow } = await import('@/lib/workflow/client');
      
      const workflowUrl = `${baseUrl}/api/workflow/process-pipeline`;
      console.log('[SUBMIT] Workflow URL:', workflowUrl);
      
      // Wait max 2 seconds for workflow to start, then return to show animation
      const triggerPromise = triggerWorkflow(
        workflowUrl,
        { reportId: report.id },
        `report-${report.id}` // Unique workflow run ID
      );
      
      const processResponse = await Promise.race([
        triggerPromise,
        new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 2000))
      ]) as any;
      
      if (processResponse.timeout) {
        console.log('[SUBMIT] Workflow trigger initiated (timeout reached, processing continues in background)');
      } else if (processResponse.workflowRunId) {
        console.log('[SUBMIT] Workflow triggered successfully:', processResponse.workflowRunId);
      } else {
        console.error('[SUBMIT] Failed to trigger workflow');
        // Don't fail the request - cron will pick it up as backup
      }
    } catch (error) {
      console.error('[SUBMIT] Error triggering processing:', error);
      // Don't fail the request - cron will pick it up as backup
    }

    // Increment tenant usage and handle overage billing if applicable
    if (tenantContext) {
      try {
        // Use the new database function that tracks overages
        const { data: usageResult, error: usageError } = await supabase
          .rpc('increment_assessment_usage_with_overage', {
            p_tenant_id: tenantContext.tenant.id,
          });

        if (usageError) {
          console.error('[OVERAGE] Failed to increment usage:', usageError);
          // Don't fail the request - log and continue
        } else if (usageResult && usageResult.length > 0) {
          const { success, is_overage, overage_price_cents, assessments_used, assessments_overage } = usageResult[0];

          if (success) {
            console.log('[USAGE] Assessment usage incremented:', {
              assessments_used,
              is_overage,
              assessments_overage,
            });

            // Calculate usage percentage for threshold emails
            const assessmentsLimit = tenantContext.tenant.assessments_limit || 0;
            const percentageUsed = assessmentsLimit > 0
              ? Math.round((assessments_used / assessmentsLimit) * 100)
              : 0;

            // Send usage warning emails at key thresholds (async, don't wait)
            if (assessmentsLimit > 0 && tenantContext.tenant.contact_email) {
              const { SUBSCRIPTION_TIERS } = await import('@/lib/stripe-config');
              const currentTier = tenantContext.tenant.subscription_tier || 'starter';
              const overagePrice = SUBSCRIPTION_TIERS[currentTier as keyof typeof SUBSCRIPTION_TIERS]?.overagePrice || 4;

              // Import email service functions
              const {
                sendUsageWarningEmail,
                sendLimitReachedEmail,
                sendFirstOverageEmail,
                sendAssessmentCompletedNotification,
              } = await import('@/lib/email/email-service');

              // 80% threshold
              if (assessments_used === Math.ceil(assessmentsLimit * 0.8)) {
                console.log('[USAGE] 80% threshold reached - sending warning email');
                sendUsageWarningEmail({
                  tenantId: tenantContext.tenant.id,
                  companyName: tenantContext.tenant.company_name,
                  ownerEmail: tenantContext.tenant.contact_email,
                  assessmentsUsed: assessments_used,
                  assessmentsLimit: assessmentsLimit,
                  percentageUsed: 80,
                  currentTier: currentTier,
                  overagePrice: overagePrice,
                  subdomain: tenantContext.tenant.subdomain,
                }).catch(err => console.error('[USAGE] Failed to send 80% warning:', err));

                // Create usage warning notification (async, don't wait)
                notifyUsageWarning(
                  tenantContext.tenant.id,
                  tenantContext.tenant.subdomain,
                  80,
                  assessments_used,
                  assessmentsLimit
                ).catch(err => console.error('[USAGE] Failed to create 80% notification:', err));
              }

              // 90% threshold
              if (assessments_used === Math.ceil(assessmentsLimit * 0.9)) {
                console.log('[USAGE] 90% threshold reached - sending warning email');
                sendUsageWarningEmail({
                  tenantId: tenantContext.tenant.id,
                  companyName: tenantContext.tenant.company_name,
                  ownerEmail: tenantContext.tenant.contact_email,
                  assessmentsUsed: assessments_used,
                  assessmentsLimit: assessmentsLimit,
                  percentageUsed: 90,
                  currentTier: currentTier,
                  overagePrice: overagePrice,
                  subdomain: tenantContext.tenant.subdomain,
                }).catch(err => console.error('[USAGE] Failed to send 90% warning:', err));

                // Create usage warning notification (async, don't wait)
                notifyUsageWarning(
                  tenantContext.tenant.id,
                  tenantContext.tenant.subdomain,
                  90,
                  assessments_used,
                  assessmentsLimit
                ).catch(err => console.error('[USAGE] Failed to create 90% notification:', err));
              }

              // 100% threshold (limit reached)
              if (assessments_used === assessmentsLimit) {
                console.log('[USAGE] 100% threshold reached - sending limit reached email');
                sendLimitReachedEmail({
                  tenantId: tenantContext.tenant.id,
                  companyName: tenantContext.tenant.company_name,
                  ownerEmail: tenantContext.tenant.contact_email,
                  assessmentsLimit: assessmentsLimit,
                  currentTier: currentTier,
                  overagePrice: overagePrice,
                  subdomain: tenantContext.tenant.subdomain,
                }).catch(err => console.error('[USAGE] Failed to send limit reached:', err));

                // Create usage warning notification (async, don't wait)
                notifyUsageWarning(
                  tenantContext.tenant.id,
                  tenantContext.tenant.subdomain,
                  100,
                  assessments_used,
                  assessmentsLimit
                ).catch(err => console.error('[USAGE] Failed to create 100% notification:', err));
              }
            }

            // If this is an overage, create Stripe invoice item
            if (is_overage && tenantContext.tenant.stripe_customer_id) {
              console.log('[OVERAGE] Overage detected - creating Stripe invoice item');

              // Import overage service
              const { createOverageInvoiceItem } = await import('@/services/stripe-overage');
              const { SUBSCRIPTION_TIERS } = await import('@/lib/stripe-config');
              const currentTier = tenantContext.tenant.subscription_tier || 'starter';
              const overagePrice = SUBSCRIPTION_TIERS[currentTier as keyof typeof SUBSCRIPTION_TIERS]?.overagePrice || 4;

              // Create invoice item
              const invoiceResult = await createOverageInvoiceItem({
                tenantId: tenantContext.tenant.id,
                stripeCustomerId: tenantContext.tenant.stripe_customer_id,
                tier: currentTier,
                assessmentId: quizId,
                assessmentNumber: assessments_used,
                billingPeriodStart: tenantContext.tenant.current_period_start || new Date().toISOString(),
                billingPeriodEnd: tenantContext.tenant.current_period_end || new Date().toISOString(),
              });

              if (invoiceResult.success) {
                console.log('[OVERAGE] Stripe invoice item created:', invoiceResult.invoiceItemId);

                // Send first overage notification email
                if (assessments_overage === 1 && tenantContext.tenant.contact_email) {
                  console.log('[OVERAGE] First overage - sending notification email');
                  const { sendFirstOverageEmail } = await import('@/lib/email/email-service');

                  sendFirstOverageEmail({
                    tenantId: tenantContext.tenant.id,
                    companyName: tenantContext.tenant.company_name,
                    ownerEmail: tenantContext.tenant.contact_email,
                    assessmentsLimit: tenantContext.tenant.assessments_limit || 0,
                    assessmentsUsed: assessments_used,
                    overageCount: assessments_overage,
                    overagePrice: overagePrice,
                    currentOverageCharge: assessments_overage * overagePrice,
                    currentTier: currentTier,
                    subdomain: tenantContext.tenant.subdomain,
                  }).catch(err => console.error('[OVERAGE] Failed to send first overage email:', err));
                }
              } else {
                console.error('[OVERAGE] Failed to create invoice item:', invoiceResult.error);
                // Don't fail the assessment - log error and continue
              }
            }
          }
        }
      } catch (error) {
        console.error('[OVERAGE] Error in overage billing logic:', error);
        // Don't fail the assessment submission
      }
    }

    // Send admin notification email (async, don't wait)
    if (tenantContext && tenantContext.tenant.contact_email) {
      try {
        const { sendAssessmentCompletedNotification } = await import('@/lib/email/email-service');
        const { data: usageData } = await supabase
          .from('tenants')
          .select('assessments_used, assessments_overage')
          .eq('id', tenantContext.tenant.id)
          .single();

        sendAssessmentCompletedNotification({
          tenantId: tenantContext.tenant.id,
          adminEmail: tenantContext.tenant.contact_email,
          companyName: tenantContext.tenant.company_name,
          candidateFirstName: quizData.first_name,
          candidateLastName: quizData.last_name,
          candidateEmail: quizData.email,
          candidateCompany: quizData.company,
          industry: quizData.industry,
          companySize: quizData.company_size,
          completedAt: new Date().toISOString(),
          assessmentId: quizResponse.id,
          reportId: report.id,
          subdomain: tenantContext.tenant.subdomain,
          assessmentsUsed: usageData?.assessments_used || 0,
          assessmentsLimit: tenantContext.tenant.assessments_limit || 0,
          currentTier: tenantContext.tenant.subscription_tier || 'starter',
        }).catch(err => console.error('[ADMIN-NOTIFICATION] Failed to send assessment completed email:', err));

        // Create assessment completed notification (async, don't wait)
        notifyAssessmentCompleted(
          tenantContext.tenant.id,
          tenantContext.tenant.subdomain,
          updatedQuiz.user_first_name || 'Candidate',
          updatedQuiz.user_company || 'Unknown Company',
          quizId
        ).catch(err => console.error('[ADMIN-NOTIFICATION] Failed to create assessment completed notification:', err));
      } catch (error) {
        console.error('[ADMIN-NOTIFICATION] Error sending admin notification:', error);
        // Don't fail the assessment submission
      }
    }

    // Return immediately - don't wait for processing
    res.status(200).json({
      success: true,
      reportId: report.id,
      processingTime: '45-60 seconds',
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      reportId: '',
      processingTime: '',
      error: 'Failed to submit quiz',
    });
  }
}