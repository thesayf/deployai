import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Clock, CreditCard, FileText, Settings, Rocket, AlertCircle } from 'lucide-react';

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
  starter: { name: 'Starter', price: 199, assessments: 5, color: 'bg-orange-500' },
  professional: { name: 'Professional', price: 499, assessments: 20, color: 'bg-blue-500' },
  scale: { name: 'Scale', price: 997, assessments: null, color: 'bg-purple-500' },
};

export default function BillingDashboard() {
  const router = useRouter();
  const { tenant } = router.query;
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
  const isActive = billingData.subscription_status === 'active';
  const currentTier = billingData.subscription_tier as keyof typeof TIER_DETAILS;
  const tierInfo = currentTier ? TIER_DETAILS[currentTier] : null;

  // Calculate trial days remaining
  const trialDaysRemaining = billingData.trial_end_date
    ? Math.ceil((new Date(billingData.trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const usagePercentage = billingData.assessments_limit
    ? (billingData.assessments_used / billingData.assessments_limit) * 100
    : 0;

  return (
    <ProtectedRoute>
      <AdminLayout title="Billing">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription and payment details
            </p>
          </div>

          {/* Trial Status Banner */}
          {isTrialing && (
            <Alert className="bg-amber-50 border-amber-200">
              <Clock className="h-4 w-4" />
              <AlertTitle className="text-lg font-semibold">🎉 Free Trial Active</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p className="font-medium">
                  {trialDaysRemaining} days remaining • {billingData.assessments_limit! - billingData.assessments_used} assessments left
                </p>
                <p className="text-sm text-muted-foreground">
                  Your trial ends on {billingData.trial_end_date ? format(new Date(billingData.trial_end_date), 'MMM d, yyyy') : 'N/A'}.
                  You'll be charged ${tierInfo?.price}/month after that unless you cancel.
                </p>
                <Button onClick={handleManageSubscription} variant="outline" size="sm" className="mt-2">
                  Cancel Trial
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Current Plan Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Current Plan</CardTitle>
                  {tierInfo && (
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={`${tierInfo.color} text-white hover:${tierInfo.color}/90`}>
                        {tierInfo.name}
                      </Badge>
                      <span className="text-4xl font-bold">${tierInfo.price}/mo</span>
                    </div>
                  )}
                </div>
                <Button onClick={() => router.push(`/${tenant}/admin/billing/plans`)}>
                  Change Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Assessments</p>
                    <p className="text-2xl font-bold">
                      {tierInfo?.assessments === null ? '∞' : tierInfo?.assessments}
                      {tierInfo?.assessments !== null && ' / month'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <Badge variant={billingData.subscription_status === 'active' ? 'default' : 'secondary'} className="text-base font-bold uppercase">
                      {billingData.subscription_status}
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Next Billing</p>
                    <p className="text-lg font-bold">
                      {billingData.current_period_end
                        ? format(new Date(billingData.current_period_end), 'MMM d, yyyy')
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {billingData.cancel_at_period_end && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ⚠️ Your subscription will cancel at the end of the current billing period
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          {billingData.payment_method_brand && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="border-2 border-gray-300 p-4 rounded bg-gray-50">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg uppercase">{billingData.payment_method_brand}</p>
                      <p className="font-medium">•••• {billingData.payment_method_last4}</p>
                      <p className="text-sm text-muted-foreground">Primary payment method</p>
                    </div>
                  </div>
                  <Button onClick={handleManageSubscription} variant="secondary">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/${tenant}/admin/billing/history`)}>
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-bold text-lg mb-1">Billing History</h3>
                <p className="text-sm text-muted-foreground">View invoices and receipts</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleManageSubscription}>
              <CardContent className="pt-6">
                <Settings className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-bold text-lg mb-1">Manage Subscription</h3>
                <p className="text-sm text-muted-foreground">Update, pause, or cancel</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/${tenant}/admin/billing/plans`)}>
              <CardContent className="pt-6">
                <Rocket className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-bold text-lg mb-1">Upgrade Plan</h3>
                <p className="text-sm text-muted-foreground">Get more assessments</p>
              </CardContent>
            </Card>
          </div>

          {/* Usage Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                  <span>{billingData.assessments_used} used</span>
                  <span>{billingData.assessments_limit === null ? '∞' : billingData.assessments_limit} limit</span>
                </div>
                <Progress value={billingData.assessments_used} max={billingData.assessments_limit || 100} />
              </div>

              {billingData.assessments_limit !== null && billingData.assessments_used >= billingData.assessments_limit && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ⚠️ You've reached your monthly limit. Upgrade to get more assessments.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
