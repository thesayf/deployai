import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/utils/supabase/client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Clock, CreditCard, AlertCircle, RefreshCw } from 'lucide-react';
import { PricingCard } from '@/components/billing/PricingCard';
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
  assessments_used: number;
  assessments_limit: number | null;
}

const TIER_DETAILS = {
  starter: {
    name: 'Starter Plan',
    monthly: 199,
    yearly: 1910,
    assessments: 25,
    badgeText: 'FREE',
    badgeColor: 'bg-orange-500 text-white',
    badgeDotColor: 'bg-orange-500',
    features: [
      '25 AI assessments per month',
      'Full platform access',
      'Custom AI agent branding',
      'White-label assessment portal',
      'PDF report exports',
      'Email support',
      '14-day free trial',
    ],
  },
  professional: {
    name: 'Professional Plan',
    monthly: 499,
    yearly: 4790,
    assessments: 100,
    badgeText: 'PRO',
    badgeColor: 'bg-orange-500 text-white',
    badgeDotColor: 'bg-orange-500',
    features: [
      '100 AI assessments per month',
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
    name: 'Scale Plan',
    monthly: 997,
    yearly: 9570,
    assessments: 400,
    badgeText: 'ADVANCE',
    badgeColor: 'bg-green-500 text-white',
    badgeDotColor: 'bg-green-500',
    features: [
      '400 AI assessments per month',
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

// Fetcher for billing data
const fetchBillingData = async (subdomain: string): Promise<BillingData> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tenants')
    .select('stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier, trial_end_date, current_period_start, current_period_end, cancel_at_period_end, payment_method_brand, payment_method_last4, assessments_used, assessments_limit')
    .eq('subdomain', subdomain)
    .single();

  if (error) throw error;
  return data;
};

export default function BillingDashboard() {
  const router = useRouter();
  const { tenant } = router.query;
  const [isYearly, setIsYearly] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use SWR for automatic caching and revalidation
  const { data: billingData, error, isLoading, mutate } = useSWR<BillingData>(
    tenant ? `billing-${tenant}` : null,
    () => fetchBillingData(tenant as string),
    {
      revalidateOnFocus: true, // Refresh when user returns to tab
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      refreshInterval: 0, // No polling, only manual/focus refresh
    }
  );

  // Detect return from Stripe portal and force refresh
  useEffect(() => {
    if (tenant && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const returnedFromStripe = urlParams.get('stripe_return');

      if (returnedFromStripe === 'true') {
        // Remove the parameter from URL
        urlParams.delete('stripe_return');
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);

        // Force refresh billing data with delay to allow webhook processing
        setTimeout(() => {
          mutate();
        }, 1500);
      }
    }
  }, [tenant, mutate]);

  // Fetch invoices when billing data changes
  useEffect(() => {
    if (billingData?.stripe_customer_id) {
      fetchInvoices(billingData.stripe_customer_id);
    }
  }, [billingData?.stripe_customer_id]);

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await mutate();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleForceSync = async () => {
    if (!tenant) return;

    setIsRefreshing(true);
    try {
      const response = await fetch('/api/admin/stripe/force-sync', {
        method: 'POST',
        credentials: 'include', // Important: send cookies for auth
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('[FORCE SYNC] Success:', data);
        // Refresh billing data after sync
        await mutate();
      } else {
        console.error('[FORCE SYNC] Error:', data);
        alert(`Sync failed: ${data.error}`);
      }
    } catch (err) {
      console.error('[FORCE SYNC] Failed:', err);
      alert('Failed to sync subscription data');
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
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
          returnUrl: `${window.location.origin}/${tenant}/admin/billing?stripe_return=true`,
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

  const handleUpgrade = async (tier: string) => {
    // Get tier details for confirmation
    const tierDetails = TIER_DETAILS[tier as keyof typeof TIER_DETAILS];
    if (!tierDetails) return;

    // For trial users: Start their paid subscription
    if (isTrialing) {
      const message = `Start your ${tierDetails.name} subscription now? You'll be charged $${isYearly ? tierDetails.yearly / 12 : tierDetails.monthly}/month.`;
      if (!confirm(message)) return;

      // Trial users need to go through checkout to convert to paid
      try {
        const response = await fetch('/api/stripe/create-upgrade-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-tenant-subdomain': tenant as string,
          },
          credentials: 'include',
          body: JSON.stringify({ newTier: tier }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to start subscription');
        }

        alert(`✓ Success! Your ${tierDetails.name} subscription has been activated.`);

        // Refresh billing data
        setTimeout(() => {
          mutate();
        }, 1500);
      } catch (err: any) {
        console.error('Failed to start subscription:', err);
        alert(`Failed to start subscription: ${err.message || 'Please try again.'}`);
      }
      return;
    }

    // For active subscriptions: Confirm upgrade/downgrade
    const isDowngrade =
      (currentTier === 'professional' && tier === 'starter') ||
      (currentTier === 'scale' && (tier === 'starter' || tier === 'professional'));

    const action = isDowngrade ? 'downgrade' : 'upgrade';
    const message = `Are you sure you want to ${action} to the ${tierDetails.name} plan ($${tierDetails.monthly}/month)?`;

    if (!confirm(message)) return;

    try {
      const response = await fetch('/api/stripe/create-upgrade-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
        },
        credentials: 'include',
        body: JSON.stringify({ newTier: tier }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change subscription');
      }

      // Show success message
      alert(`✓ Success! Your plan has been ${action}d to ${tierDetails.name}. ${
        isDowngrade
          ? 'Changes will apply at the end of your billing period.'
          : 'You will be charged a prorated amount for the remainder of this period.'
      }`);

      // Refresh billing data to show updated subscription
      setTimeout(() => {
        mutate();
      }, 1500);
    } catch (err: any) {
      console.error('Failed to change subscription:', err);
      alert(`Failed to ${action}: ${err.message || 'Please try again.'}`);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Billing">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-xl font-medium text-muted-foreground">Loading...</div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  if (error || !billingData) {
    return (
      <ProtectedRoute>
        <AdminLayout title="Billing">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error?.message || 'Failed to load billing data'}</AlertDescription>
          </Alert>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  const isTrialing = billingData.subscription_status === 'trialing';
  const currentTier = billingData.subscription_tier as keyof typeof TIER_DETAILS | null;

  // Calculate trial days remaining
  const trialDaysRemaining = billingData.trial_end_date
    ? Math.ceil((new Date(billingData.trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const usagePercentage = billingData.assessments_limit
    ? (billingData.assessments_used / billingData.assessments_limit) * 100
    : 0;

  // Helper to determine tier relationship
  const tierRanking = { starter: 1, professional: 2, scale: 3 };
  const isDowngrade = (targetTier: string) => {
    if (!currentTier) return false;
    return tierRanking[targetTier as keyof typeof tierRanking] < tierRanking[currentTier];
  };
  const isUpgrade = (targetTier: string) => {
    if (!currentTier) return false;
    return tierRanking[targetTier as keyof typeof tierRanking] > tierRanking[currentTier];
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Billing & Subscription">
        <div className="space-y-8">
          {/* Page Header with Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
                <button
                  onClick={handleForceSync}
                  disabled={isRefreshing}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
                  title="Sync from Stripe and refresh billing data"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <p className="text-muted-foreground mt-2">
                Keep track of your subscription details, update your billing information, and control your account's payment
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2">
              <span className={!isYearly ? 'font-semibold text-sm' : 'text-sm text-muted-foreground'}>
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={isYearly ? 'font-semibold text-sm' : 'text-sm text-muted-foreground'}>
                Yearly
              </span>
              {isYearly && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              )}
            </div>
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

          {/* Payment Failed Banner - Block plan selection */}
          {(billingData.subscription_status === 'past_due' || billingData.subscription_status === 'unpaid') && (
            <Alert className="bg-red-50 border-red-600">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-lg font-semibold text-red-900">⚠️ Payment Failed</AlertTitle>
              <AlertDescription className="mt-2 space-y-3">
                <p className="font-medium text-red-800">
                  Your payment method was declined. Please update your payment method to restore access.
                </p>
                <p className="text-sm text-red-700">
                  You cannot change plans until your payment is resolved.
                </p>
                <Button
                  onClick={handleManageSubscription}
                  className="bg-red-600 hover:bg-red-700 text-white mt-2"
                >
                  Update Payment Method
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* 3-Column Pricing Cards - Disabled for past_due */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ${(billingData.subscription_status === 'past_due' || billingData.subscription_status === 'unpaid') ? 'opacity-50 pointer-events-none' : ''}`}>
            <PricingCard
              name={TIER_DETAILS.starter.name}
              price={isYearly ? 159 : TIER_DETAILS.starter.monthly}
              priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
              badgeText={TIER_DETAILS.starter.badgeText}
              badgeColor={TIER_DETAILS.starter.badgeColor}
              badgeDotColor={TIER_DETAILS.starter.badgeDotColor}
              features={TIER_DETAILS.starter.features}
              isCurrentPlan={currentTier === 'starter'}
              onAction={() => handleUpgrade('starter')}
              actionText={
                currentTier === 'starter'
                  ? (isTrialing ? 'Start Your Plan' : 'Current Plan')
                  : isTrialing
                    ? (isDowngrade('starter') ? 'Downgrade and Start' : 'Start This Plan')
                    : 'Downgrade'
              }
              actionVariant={currentTier === 'starter' ? 'default' : 'outline'}
              isDisabled={!isTrialing && currentTier === 'starter'}
            />

            <PricingCard
              name={TIER_DETAILS.professional.name}
              price={isYearly ? 399 : TIER_DETAILS.professional.monthly}
              priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
              badgeText={TIER_DETAILS.professional.badgeText}
              badgeColor={TIER_DETAILS.professional.badgeColor}
              badgeDotColor={TIER_DETAILS.professional.badgeDotColor}
              features={TIER_DETAILS.professional.features}
              isCurrentPlan={currentTier === 'professional'}
              isDark={true}
              isRecommended={true}
              onAction={() => handleUpgrade('professional')}
              actionText={
                currentTier === 'professional'
                  ? (isTrialing ? 'Start Your Plan' : 'Current Plan')
                  : isTrialing
                    ? (isDowngrade('professional') ? 'Downgrade and Start' : isUpgrade('professional') ? 'Upgrade and Start' : 'Start This Plan')
                    : (isUpgrade('professional') ? 'Upgrade' : 'Downgrade')
              }
              actionVariant={currentTier === 'professional' ? 'default' : isUpgrade('professional') ? 'default' : 'outline'}
              isDisabled={!isTrialing && currentTier === 'professional'}
            />

            <PricingCard
              name={TIER_DETAILS.scale.name}
              price={isYearly ? 797 : TIER_DETAILS.scale.monthly}
              priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
              badgeText={TIER_DETAILS.scale.badgeText}
              badgeColor={TIER_DETAILS.scale.badgeColor}
              badgeDotColor={TIER_DETAILS.scale.badgeDotColor}
              features={TIER_DETAILS.scale.features}
              isCurrentPlan={currentTier === 'scale'}
              onAction={() => handleUpgrade('scale')}
              actionText={
                currentTier === 'scale'
                  ? (isTrialing ? 'Start Your Plan' : 'Current Plan')
                  : isTrialing
                    ? (isDowngrade('scale') ? 'Downgrade and Start' : 'Upgrade and Start')
                    : 'Upgrade'
              }
              actionVariant={currentTier === 'scale' ? 'default' : isUpgrade('scale') ? 'default' : 'outline'}
              isDisabled={!isTrialing && currentTier === 'scale'}
            />
          </div>

          {/* Usage & Payment Method - 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Usage Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Usage This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                    <span>{billingData.assessments_used} used</span>
                    <span>{billingData.assessments_limit === null ? '∞' : billingData.assessments_limit} limit</span>
                  </div>
                  <Progress value={billingData.assessments_used} max={billingData.assessments_limit || 100} />
                </div>
                {billingData.current_period_end && (
                  <p className="text-sm text-muted-foreground">
                    Resets on {format(new Date(billingData.current_period_end), 'MMM d, yyyy')}
                  </p>
                )}
                {billingData.assessments_limit !== null && billingData.assessments_used >= billingData.assessments_limit && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You've reached your monthly limit. Upgrade to get more assessments.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            {billingData.payment_method_brand && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border-2 border-gray-300 p-3 rounded bg-gray-50">
                        <CreditCard className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-base uppercase">
                          {billingData.payment_method_brand} •••• {billingData.payment_method_last4}
                        </p>
                        <p className="text-sm text-muted-foreground">Primary payment method</p>
                      </div>
                    </div>
                    <Button onClick={handleManageSubscription} variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Billing History Table */}
          <BillingHistoryTable invoices={invoices} loading={loadingInvoices} />
        </div>

      </AdminLayout>
    </ProtectedRoute>
  );
}
