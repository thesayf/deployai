import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { SectionWrapper } from '@/components/section-wrapper';
import { siteConfig } from '@/config/site';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface PlanConfig {
  id: 'starter' | 'professional' | 'scale';
  name: string;
  price: number;
  assessments: number | null;
  features: string[];
  recommended?: boolean;
}

const plans: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 199,
    assessments: 5,
    recommended: true,
    features: [
      '5 AI assessments per month',
      'Full platform access',
      'Email support',
      'Basic analytics',
      'Custom branding',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 499,
    assessments: 20,
    features: [
      '20 AI assessments per month',
      'Full platform access',
      'Priority email support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 997,
    assessments: null,
    features: [
      'Unlimited AI assessments',
      'Full platform access',
      'Priority phone & email support',
      'Advanced analytics',
      'Custom branding',
      'API access',
      'Dedicated account manager',
    ],
  },
];

export default function SelectPlan() {
  const router = useRouter();
  const { tenant } = router.query;
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tenantData, setTenantData] = useState<any>(null);

  useEffect(() => {
    const loadTenantData = async () => {
      if (!tenant) return;

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/${tenant}/admin/login`);
        return;
      }

      const { data, error } = await supabase
        .from('tenants')
        .select('id, subdomain, billing_email, company_name, subscription_status, stripe_customer_id')
        .eq('subdomain', tenant)
        .single();

      if (error || !data) {
        setError('Failed to load tenant information');
        return;
      }

      setTenantData(data);
    };

    loadTenantData();
  }, [tenant, router]);

  const handleSelectPlan = async (planId: string) => {
    setIsLoading(planId);
    setError(null);

    try {
      console.log('[SELECT PLAN] 🚀 Starting plan selection for:', planId);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('[SELECT PLAN] ❌ No user found');
        setError('Please sign in to continue');
        return;
      }

      console.log('[SELECT PLAN] ✅ User authenticated:', user.email);

      if (!tenantData) {
        console.log('[SELECT PLAN] ❌ No tenant data loaded');
        setError('Tenant information not loaded');
        return;
      }

      console.log('[SELECT PLAN] Tenant data:', tenantData);

      // Create trial checkout session with selected plan
      const requestBody = {
        tenantId: tenantData.id,
        email: user.email || tenantData.billing_email,
        planId: planId,
        successUrl: `${window.location.origin}/${tenant}/admin/billing/success`,
        cancelUrl: `${window.location.origin}/${tenant}/admin/billing/select-plan`,
      };

      console.log('[SELECT PLAN] 📡 Calling create-trial-session with:', requestBody);

      const response = await fetch('/api/stripe/create-trial-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('[SELECT PLAN] Response status:', response.status);
      const data = await response.json();
      console.log('[SELECT PLAN] Response data:', data);

      if (!response.ok) {
        console.log('[SELECT PLAN] ❌ API error:', data);
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        console.log('[SELECT PLAN] ✅ Redirecting to Stripe:', data.checkoutUrl);
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error('[SELECT PLAN] 💥 ERROR:', err);
      console.error('[SELECT PLAN] Error details:', err.message);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleExploreDashboard = () => {
    router.push(`/${tenant}/admin`);
  };

  return (
    <ProtectedRoute requiresSubscription={false}>
      {/* Hero Section */}
      <SectionWrapper variant="dark" spacing="none">
        <div className="py-12 md:min-h-[60vh] md:flex md:items-center md:py-0">
          <motion.div
            className="max-w-4xl mx-auto text-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {tenantData?.subscription_status === 'past_due' ||
             tenantData?.subscription_status === 'unpaid' ||
             tenantData?.subscription_status === 'canceled' ? (
              <>
                <p className="text-sm font-semibold text-red-400 mb-4 uppercase tracking-wide">
                  Reactivate Your Subscription
                </p>
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
                  Update Your Payment Method
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-semibold max-w-2xl mx-auto">
                  Select your plan below to update your payment information and restore access.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                  {siteConfig.trialDays}-Day Free Trial • No Credit Card Required
                </p>
                <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
                  Choose the Perfect Plan for Your Business
                </h1>
                <p className="text-lg md:text-xl text-gray-300 font-semibold max-w-2xl mx-auto">
                  Start your free trial today. Full access to all features. Cancel anytime.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Payment Failed Banner */}
      {tenantData?.subscription_status === 'past_due' && (
        <SectionWrapper variant="default" spacing="small">
          <div className="max-w-3xl mx-auto p-6 border-[3px] border-black bg-red-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-red-900 mb-2 uppercase">
                  Payment Failed
                </h3>
                <p className="text-red-800 font-semibold mb-4">
                  Your recent payment could not be processed. Please update your payment method below to restore access to your account.
                </p>
                <p className="text-sm text-red-700">
                  Select your plan below to update your payment information and continue using DeployAI.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* Unpaid/Canceled Banner */}
      {(tenantData?.subscription_status === 'unpaid' || tenantData?.subscription_status === 'canceled') && (
        <SectionWrapper variant="default" spacing="small">
          <div className="max-w-3xl mx-auto p-6 border-[3px] border-black bg-amber-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-amber-900 mb-2 uppercase">
                  Subscription {tenantData?.subscription_status === 'canceled' ? 'Canceled' : 'Suspended'}
                </h3>
                <p className="text-amber-800 font-semibold mb-4">
                  Your subscription has been {tenantData?.subscription_status === 'canceled' ? 'canceled' : 'suspended due to failed payments'}.
                  Reactivate below to regain access to your assessments and data.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* Error Message */}
      {error && (
        <SectionWrapper variant="default" spacing="small">
          <div className="max-w-2xl mx-auto p-4 border-3 border-black bg-red-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-red-700 text-center">{error}</p>
          </div>
        </SectionWrapper>
      )}

      {/* Plan Cards */}
      <SectionWrapper variant="default" spacing="large">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 font-bold text-sm">
                  RECOMMENDED
                </div>
              )}

              <div className="p-6">
                {/* Plan Name & Price */}
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">${plan.price}</span>
                    <span className="text-lg text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {plan.assessments ? `${plan.assessments} assessments included` : 'Unlimited assessments'}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="large"
                  intent="cta"
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isLoading !== null}
                  className="w-full"
                >
                  {isLoading === plan.id ? 'SETTING UP...' : 'START FREE TRIAL'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Explore Dashboard */}
      <SectionWrapper variant="concrete" spacing="large">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Want to explore first?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Take a look around the dashboard before committing to a plan. Limited features available without a subscription.
          </p>
          <Button
            size="large"
            intent="primary"
            onClick={handleExploreDashboard}
            disabled={isLoading !== null}
          >
            Explore Dashboard →
          </Button>
        </motion.div>
      </SectionWrapper>

      {/* Trial Terms */}
      <SectionWrapper variant="warmPeach" spacing="large">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-bold text-xl mb-4 text-center">Trial Terms & Conditions</h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>{siteConfig.trialDays}-day free trial</strong> with full platform access</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>No charge</strong> during trial period</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Cancel anytime</strong> with one click from your dashboard</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span><strong>Auto-converts</strong> to paid plan after trial unless cancelled</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </ProtectedRoute>
  );
}
