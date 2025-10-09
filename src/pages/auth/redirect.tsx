import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/utils/supabase/client';

const AuthRedirect = () => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get the stored subdomain from localStorage
        const storedSubdomain = localStorage.getItem('auth_redirect_subdomain');

        if (!storedSubdomain) {
          // Fallback: try to get subdomain from current hostname
          const hostname = window.location.hostname;
          const subdomain = hostname.split('.')[0];

          if (subdomain && subdomain !== 'localhost' && subdomain !== 'www') {
            router.push(`/${subdomain}/admin`);
          } else {
            router.push('/');
          }
          return;
        }

        // Check if user has completed trial setup
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          localStorage.removeItem('auth_redirect_subdomain');
          router.push('/');
          return;
        }

        // Get tenant billing status
        const { data: tenant, error } = await supabase
          .from('tenants')
          .select('subdomain, subscription_status, stripe_customer_id')
          .eq('subdomain', storedSubdomain)
          .single();

        if (error || !tenant) {
          console.error('Failed to fetch tenant:', error);
          localStorage.removeItem('auth_redirect_subdomain');
          router.push(`/${storedSubdomain}/admin`);
          return;
        }

        // Check if tenant has active subscription
        const hasActiveSubscription =
          tenant.subscription_status === 'active' ||
          tenant.subscription_status === 'trialing';

        const hasPaymentMethod = !!tenant.stripe_customer_id;

        // Route based on subscription status
        if (!hasActiveSubscription || !hasPaymentMethod) {
          // New user OR expired trial → Plan Selection
          console.log('No active subscription or payment method - redirecting to plan selection');
          // Clear localStorage AFTER determining redirect path
          localStorage.removeItem('auth_redirect_subdomain');
          router.push(`/${storedSubdomain}/admin/billing/select-plan`);
          return;
        }

        // Existing customer with active subscription → Dashboard
        console.log('Active subscription detected - redirecting to dashboard');
        // Clear localStorage AFTER determining redirect path
        localStorage.removeItem('auth_redirect_subdomain');
        router.push(`/${storedSubdomain}/admin`);

      } catch (error) {
        console.error('Error during redirect:', error);
        router.push('/');
      } finally {
        setIsChecking(false);
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl font-medium text-gray-600 mb-2">Authenticating...</div>
        <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
      </div>
    </div>
  );
};

export default AuthRedirect;