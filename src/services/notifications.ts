import { supabaseAdmin } from '@/lib/supabase';

export type NotificationType =
  | 'waitlist_lead'
  | 'account_paused'
  | 'account_resumed'
  | 'assessment_completed'
  | 'usage_warning'
  | 'payment_failed'
  | 'trial_ending'
  | 'assessment_request';

export type NotificationPriority = 'high' | 'medium' | 'low';

export interface CreateNotificationParams {
  tenantId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  priority?: NotificationPriority;
  metadata?: Record<string, any>;
}

/**
 * Create a new notification for a tenant
 */
export async function createNotification(params: CreateNotificationParams) {
  const supabase = supabaseAdmin();

  const { error } = await supabase.from('notifications').insert({
    tenant_id: params.tenantId,
    type: params.type,
    title: params.title,
    message: params.message,
    link: params.link || null,
    priority: params.priority || 'medium',
    metadata: params.metadata || {},
    read: false,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('[NOTIFICATIONS] Failed to create notification:', error);
    return { success: false, error };
  }

  return { success: true };
}

/**
 * Create notification for new waitlist lead (when paused)
 */
export async function notifyWaitlistLead(
  tenantId: string,
  tenantSubdomain: string,
  candidateName: string,
  candidateEmail: string
) {
  return createNotification({
    tenantId,
    type: 'waitlist_lead',
    title: 'New Waitlist Lead',
    message: `${candidateName} joined the waitlist`,
    link: `/${tenantSubdomain}/admin/assessments?status=requested`,
    priority: 'medium',
    metadata: {
      candidateName,
      candidateEmail,
    },
  });
}

/**
 * Create notification for account paused
 */
export async function notifyAccountPaused(
  tenantId: string,
  tenantSubdomain: string
) {
  return createNotification({
    tenantId,
    type: 'account_paused',
    title: 'Account Paused',
    message: 'Assessments are paused. New clients cannot take assessments.',
    link: `/${tenantSubdomain}/admin/settings/billing`,
    priority: 'high',
  });
}

/**
 * Create notification for account resumed
 */
export async function notifyAccountResumed(
  tenantId: string,
  tenantSubdomain: string
) {
  return createNotification({
    tenantId,
    type: 'account_resumed',
    title: 'Assessments Resumed',
    message: 'Your assessment portal is now active',
    link: `/${tenantSubdomain}/admin`,
    priority: 'low',
  });
}

/**
 * Create notification for completed assessment
 */
export async function notifyAssessmentCompleted(
  tenantId: string,
  tenantSubdomain: string,
  candidateName: string,
  companyName: string,
  assessmentId: string
) {
  return createNotification({
    tenantId,
    type: 'assessment_completed',
    title: 'Assessment Completed',
    message: `${candidateName} from ${companyName} completed their assessment`,
    link: `/${tenantSubdomain}/admin/assessments/${assessmentId}`,
    priority: 'low',
    metadata: {
      candidateName,
      companyName,
      assessmentId,
    },
  });
}

/**
 * Create notification for usage warning
 */
export async function notifyUsageWarning(
  tenantId: string,
  tenantSubdomain: string,
  percentage: number,
  used: number,
  limit: number
) {
  return createNotification({
    tenantId,
    type: 'usage_warning',
    title: `${percentage}% Usage Reached`,
    message: `You've used ${used} of ${limit} assessments this period`,
    link: `/${tenantSubdomain}/admin/settings/billing`,
    priority: percentage >= 100 ? 'high' : 'medium',
    metadata: {
      percentage,
      used,
      limit,
    },
  });
}

/**
 * Create notification for payment failed
 */
export async function notifyPaymentFailed(
  tenantId: string,
  tenantSubdomain: string,
  amount: number
) {
  return createNotification({
    tenantId,
    type: 'payment_failed',
    title: 'Payment Failed',
    message: `Payment of $${amount} failed. Please update your payment method.`,
    link: `/${tenantSubdomain}/admin/settings/billing`,
    priority: 'high',
    metadata: {
      amount,
    },
  });
}

/**
 * Create notification for trial ending
 */
export async function notifyTrialEnding(
  tenantId: string,
  tenantSubdomain: string,
  daysRemaining: number
) {
  return createNotification({
    tenantId,
    type: 'trial_ending',
    title: 'Trial Ending Soon',
    message: `Your trial ends in ${daysRemaining} days`,
    link: `/${tenantSubdomain}/admin/settings/billing`,
    priority: 'high',
    metadata: {
      daysRemaining,
    },
  });
}
