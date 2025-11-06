import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { SettingsLayout } from '@/components/admin/settings';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Clock, CreditCard, AlertCircle } from 'lucide-react';
import { CurrentPlanCard } from '@/components/billing/CurrentPlanCard';
import { BillingHistoryTable } from '@/components/billing/BillingHistoryTable';

interface BillingData {
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string;
  subscription_tier: string | null;
  trial_end_date: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
  payment_method_exp_month: number | null;
  payment_method_exp_year: number | null;
  assessments_used: number;
  assessments_limit: number | null;
  assessments_overage: number;
  overage_charges_current_period: number;
}

const TIER_DETAILS = {
  starter: {
    name: 'Starter Plan',
    monthly: 199,
    yearly: 1910,
    assessments: 5,
    overagePrice: 4,
    badgeText: 'FREE',
    badgeColor: 'bg-orange-500 text-white',
    badgeDotColor: 'bg-orange-500',
    features: [
      '5 AI assessments per month',
      'Full platform access',
      'Custom AI agent branding',
      'White-label assessment portal',
      'PDF report exports',
      'Email support',
      '14-day free trial',
    ],
  },
  professional: {
    name: 'Growth Plan',
    monthly: 499,
    yearly: 4790,
    assessments: 20,
    overagePrice: 3,
    badgeText: 'PRO',
    badgeColor: 'bg-orange-500 text-white',
    badgeDotColor: 'bg-orange-500',
    features: [
      '20 AI assessments per month',
      'Everything in Starter',
      'Priority email support',
      'Advanced analytics dashboard',
      'Team collaboration (multiple users)',
      'API access',
      'Custom integrations',
      'Slack notifications',
    ],
  },
  scale: {
    name: 'Enterprise Plan',
    monthly: 997,
    yearly: 9570,
    assessments: null,
    overagePrice: 2,
    badgeText: 'ADVANCE',
    badgeColor: 'bg-green-500 text-white',
    badgeDotColor: 'bg-green-500',
    features: [
      'Unlimited AI assessments',
      'Everything in Professional',
      'Dedicated account manager',
      'Phone support',
      'SLA guarantee (99.9% uptime)',
      'Custom white-label domain',
      'Advanced security (SSO)',
      'Training & onboarding sessions',
      'Quarterly business reviews',
    ],
  },
};

export default function BillingSettings() {
  const router = useRouter();
  const { tenant } = router.query;
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);

  useEffect(() => {
    if (tenant) {
      fetchBillingData();
    }
  }, [tenant]);

  const fetchBillingData = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tenants')
        .select('stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier, trial_end_date, current_period_start, current_period_end, cancel_at_period_end, payment_method_brand, payment_method_last4, payment_method_exp_month, payment_method_exp_year, assessments_used, assessments_limit, assessments_overage, overage_charges_current_period')
        .eq('subdomain', tenant)
        .single();

      if (error) throw error;
      setBillingData(data);

      // Fetch invoices if customer exists
      if (data?.stripe_customer_id) {
        fetchInvoices(data.stripe_customer_id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async (customerId: string) => {
    try {
      setLoadingInvoices(true);
      const response = await fetch(`/api/stripe/invoices?customerId=${customerId}&limit=20`);
      if (!response.ok) throw new Error('Failed to fetch invoices');
      const data = await response.json();
      setInvoices(data.invoices);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!billingData?.stripe_customer_id) return;

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: billingData.stripe_customer_id,
          returnUrl: `${window.location.origin}/${tenant}/admin/settings/billing`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to open customer portal:', err);
    }
  };

  const handleOpenUpgradeModal = async () => {
    if (!billingData?.stripe_customer_id) return;

    try {
      // Open Customer Portal directly to subscription update flow
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: billingData.stripe_customer_id,
          subscriptionId: billingData.stripe_subscription_id,
          returnUrl: `${window.location.origin}/${tenant}/admin/settings/billing`,
          flowType: 'subscription_update', // Direct to plan selection
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to open customer portal:', err);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Settings">
          <SettingsLayout currentTab="billing">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-xl font-medium text-muted-foreground">Loading...</div>
            </div>
          </SettingsLayout>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error || !billingData) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Settings">
          <SettingsLayout currentTab="billing">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || 'Failed to load billing data'}</AlertDescription>
            </Alert>
          </SettingsLayout>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const isTrialing = billingData.subscription_status === 'trialing';
  const currentTier = billingData.subscription_tier as keyof typeof TIER_DETAILS | null;
  const tierDetails = currentTier ? TIER_DETAILS[currentTier] : null;

  // Calculate trial days remaining
  const trialDaysRemaining = billingData.trial_end_date
    ? Math.ceil((new Date(billingData.trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const usagePercentage = billingData.assessments_limit
    ? (billingData.assessments_used / billingData.assessments_limit) * 100
    : 0;

  // Format card expiry
  const cardExpiry = billingData.payment_method_exp_month && billingData.payment_method_exp_year
    ? `${String(billingData.payment_method_exp_month).padStart(2, '0')}/${billingData.payment_method_exp_year}`
    : null;

  return (
    <ProtectedRoute>
      <AdminLayout title="Settings">
        <SettingsLayout currentTab="billing">
          <div className="space-y-8">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Billing & Subscription</h2>
              <p className="text-muted-foreground mt-2">
                Manage your subscription and payment details
              </p>
            </div>

            {/* Trial Status Banner */}
            {isTrialing && billingData.trial_end_date && (
              <Alert className="bg-amber-50 border-amber-200">
                <Clock className="h-4 w-4" />
                <AlertTitle className="text-lg font-semibold">🎉 Free Trial Active</AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  <p className="font-medium">
                    {trialDaysRemaining} days remaining • {billingData.assessments_limit! - billingData.assessments_used} assessments left
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your trial ends on {format(new Date(billingData.trial_end_date), 'MMM d, yyyy')}.
                  </p>
                  <Button onClick={handleManageSubscription} variant="outline" size="sm" className="mt-2">
                    Manage Trial
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Current Plan with Usage */}
            <div className="max-w-2xl">
              {tierDetails ? (
                <CurrentPlanCard
                  planName={tierDetails.name}
                  planTier={currentTier || 'starter'}
                  price={tierDetails.monthly}
                  status={billingData.subscription_status}
                  nextPaymentDate={billingData.current_period_end}
                  nextPaymentAmount={tierDetails.monthly}
                  cancelAtPeriodEnd={billingData.cancel_at_period_end}
                  onUpgrade={handleOpenUpgradeModal}
                  onCancel={handleManageSubscription}
                  assessmentsUsed={billingData.assessments_used}
                  assessmentsLimit={billingData.assessments_limit}
                  currentPeriodEnd={billingData.current_period_end}
                  assessmentsOverage={billingData.assessments_overage || 0}
                  overageChargesCurrentPeriod={billingData.overage_charges_current_period || 0}
                  overagePricePerAssessment={tierDetails.overagePrice}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Active Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      You don't have an active subscription yet. Start your free trial to access all features.
                    </p>
                    <Button onClick={() => router.push(`/${tenant}/admin/billing/select-plan`)}>
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Payment Method Card */}
            {billingData.payment_method_brand && (
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-semibold">Payment Method</CardTitle>
                      <p className="text-sm text-gray-500">
                        {billingData.payment_method_brand} ending in {billingData.payment_method_last4}
                      </p>
                    </div>
                    <Button onClick={handleManageSubscription} variant="outline" size="sm" className="h-9 px-4">
                      Update
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="border-t pt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Expires</span>
                      <span className="text-sm text-gray-900">
                        {cardExpiry || 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cancel Subscription */}
            {billingData.subscription_status === 'active' && !billingData.cancel_at_period_end && (
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">Cancel Subscription</CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="border-t pt-5 space-y-4">
                    <p className="text-sm text-gray-600">
                      You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                    </p>
                    <Button onClick={handleManageSubscription} variant="outline" size="sm" className="h-9 px-4">
                      Manage Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cancellation Notice */}
            {billingData.cancel_at_period_end && billingData.current_period_end && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your subscription will be canceled on {format(new Date(billingData.current_period_end), 'MMMM d, yyyy')}
                </AlertDescription>
              </Alert>
            )}

            {/* Billing History Table */}
            <BillingHistoryTable invoices={invoices} loading={loadingInvoices} />
          </div>
        </SettingsLayout>
      </AdminLayout>
    </ProtectedRoute>
  );
}
