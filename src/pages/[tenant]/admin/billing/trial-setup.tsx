import { useRouter } from 'next/router';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TrialSetup() {
  const router = useRouter();
  const { tenant } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartTrial = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('Please sign in to continue');
        return;
      }

      // Get tenant data
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('id, subdomain, billing_email')
        .eq('subdomain', tenant)
        .single();

      if (tenantError || !tenantData) {
        setError('Failed to load tenant information');
        return;
      }

      // Create trial checkout session
      const response = await fetch('/api/stripe/create-trial-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: tenantData.id,
          email: user.email || tenantData.billing_email,
          successUrl: `${window.location.origin}/${tenant}/admin/billing/success`,
          cancelUrl: `${window.location.origin}/${tenant}/admin/billing/trial-setup`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error('Trial setup error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExploreDashboard = () => {
    router.push(`/${tenant}/admin`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main content card */}
        <div className="border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
              Start Your Free Trial
            </h1>
            <p className="text-xl font-bold text-gray-700">
              14 days • No charge • Full access
            </p>
          </div>

          {/* Trial benefits */}
          <div className="mb-8 space-y-4">
            <div className="border-[3px] border-black p-4 bg-[#FFF5F0]">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-black text-lg uppercase mb-1">10 AI Assessments</h3>
                  <p className="text-gray-700">Get detailed business insights and recommendations</p>
                </div>
              </div>
            </div>

            <div className="border-[3px] border-black p-4 bg-[#F0FFF5]">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-black text-lg uppercase mb-1">Full Platform Access</h3>
                  <p className="text-gray-700">All features unlocked during your trial period</p>
                </div>
              </div>
            </div>

            <div className="border-[3px] border-black p-4 bg-[#F0F5FF]">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <h3 className="font-black text-lg uppercase mb-1">Auto-Upgrade</h3>
                  <p className="text-gray-700">Seamlessly convert to paid plan after 14 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important notice */}
          <div className="mb-8 p-4 border-[3px] border-black bg-yellow-50">
            <p className="font-bold text-center">
              💳 Credit card required • No charge for 14 days • Cancel anytime
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 border-[3px] border-black bg-red-50">
              <p className="font-bold text-red-700">{error}</p>
            </div>
          )}

          {/* CTA buttons */}
          <div className="space-y-4">
            <button
              onClick={handleStartTrial}
              disabled={isLoading}
              className="w-full py-4 px-8 bg-[#FF6B35] hover:bg-[#FF8555] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-black text-xl uppercase text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'SETTING UP...' : 'START FREE TRIAL'}
            </button>

            <button
              onClick={handleExploreDashboard}
              disabled={isLoading}
              className="w-full py-3 px-6 bg-white hover:bg-gray-50 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-bold text-lg uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Explore Dashboard First
            </button>
          </div>

          {/* Fine print */}
          <p className="text-sm text-gray-600 text-center mt-8">
            You'll be redirected to Stripe to securely enter your payment details.
            Your trial starts immediately and auto-converts to your chosen plan
            after 14 days unless cancelled.
          </p>
        </div>
      </div>
    </div>
  );
}