import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Clock, CreditCard, AlertCircle } from 'lucide-react';
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
    name: 'Starter',
    monthly: 199,
    yearly: 1910,
    assessments: 5,
    badgeText: 'STARTER',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
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
    name: 'Professional',
    monthly: 499,
    yearly: 4790,
    assessments: 20,
    badgeText: 'PRO',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
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
    name: 'Scale',
    monthly: 997,
    yearly: 9570,
    assessments: null,
    badgeText: 'ADVANCE',
    badgeColor: 'bg-green-100 text-green-800 border-green-200',
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

export default function BillingDashboard() {
  const router = useRouter();
  const { tenant } = router.query;
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
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
        .select('stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier, trial_end_date, current_period_start, current_period_end, cancel_at_period_end, payment_method_brand, payment_method_last4, assessments_used, assessments_limit')
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
          returnUrl: `${window.location.origin}/${tenant}/admin/billing`,
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

  const handleUpgrade = (tier: string) => {
    // Navigate to plan selection or trigger upgrade flow
    router.push(`/${tenant}/admin/billing/plans?selected=${tier}`);
  };

  if (loading) {
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
            <AlertDescription>{error || 'Failed to load billing data'}</AlertDescription>
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

  return (
    <ProtectedRoute>
      <AdminLayout title="Billing & Subscription">
        <div className="space-y-8">
          {/* Page Header with Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
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

          {/* 3-Column Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <PricingCard
              name={TIER_DETAILS.starter.name}
              price={isYearly ? 159 : TIER_DETAILS.starter.monthly}
              priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
              badgeText={TIER_DETAILS.starter.badgeText}
              badgeColor={TIER_DETAILS.starter.badgeColor}
              features={TIER_DETAILS.starter.features}
              isCurrentPlan={currentTier === 'starter'}
              onAction={() => handleUpgrade('starter')}
              actionText={currentTier === 'starter' ? 'Current Plan' : isTrialing ? 'Start Trial' : 'Downgrade'}
              actionVariant={currentTier === 'starter' ? 'outline' : 'default'}
              isDisabled={currentTier === 'starter'}
            />

            <PricingCard
              name={TIER_DETAILS.professional.name}
              price={isYearly ? 399 : TIER_DETAILS.professional.monthly}
              priceLabel={isYearly ? '/month (billed yearly)' : '/month'}
              badgeText={TIER_DETAILS.professional.badgeText}
              badgeColor={TIER_DETAILS.professional.badgeColor}
              features={TIER_DETAILS.professional.features}
              isCurrentPlan={currentTier === 'professional'}
              isDark={true}
              isRecommended={true}
              onAction={() => handleUpgrade('professional')}
              actionText={currentTier === 'professional' ? 'Current Plan' : 'Upgrade Plan'}
              actionVariant="default"
              isDisabled={currentTier === 'professional'}
            />

            <PricingCard
              name={TIER_DETAILS.scale.name}
              price="Custom"
              priceLabel="/month"
              badgeText={TIER_DETAILS.scale.badgeText}
              badgeColor={TIER_DETAILS.scale.badgeColor}
              features={TIER_DETAILS.scale.features}
              isCurrentPlan={currentTier === 'scale'}
              onAction={() => router.push('/contact')}
              actionText={currentTier === 'scale' ? 'Current Plan' : 'Contact Us'}
              actionVariant={currentTier === 'scale' ? 'outline' : 'default'}
              isDisabled={currentTier === 'scale'}
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
