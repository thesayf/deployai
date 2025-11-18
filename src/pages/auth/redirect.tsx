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
        console.log('[AUTH REDIRECT] 🚀 Starting redirect');
        console.log('[AUTH REDIRECT] Stored subdomain:', storedSubdomain);

        // Check if user is authenticated
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          console.log('[AUTH REDIRECT] ❌ No user found, redirecting to home');
          localStorage.removeItem('auth_redirect_subdomain');
          router.push('/');
          return;
        }

        console.log('[AUTH REDIRECT] ✅ User authenticated:', user.email);

        // Store user email for API authentication
        localStorage.setItem('userEmail', user.email!);

        // Check if user has a tenant
        console.log('[AUTH REDIRECT] 🔍 Checking for tenant membership');
        const { data: tenantMember, error: memberError } = await supabase
          .from('tenant_members')
          .select('tenant_id, tenants(subdomain)')
          .eq('user_email', user.email)
          .single();

        console.log('[AUTH REDIRECT] Tenant member query result:', { tenantMember, memberError });

        if (!tenantMember) {
          // New OAuth user without a tenant - redirect to complete signup
          console.log('[AUTH REDIRECT] ❌ New user without tenant - redirecting to complete signup');
          localStorage.removeItem('auth_redirect_subdomain');
          router.push('/auth/complete-signup');
          return;
        }

        // User has a tenant - use that subdomain (prioritize user's actual tenant over stored value)
        const userTenant = (tenantMember as any).tenants;
        console.log('[AUTH REDIRECT] User tenant:', userTenant);
        const subdomain = userTenant.subdomain || storedSubdomain;
        console.log('[AUTH REDIRECT] Final subdomain to use:', subdomain);

        // Clear the stored subdomain since we found the user's actual tenant
        localStorage.removeItem('auth_redirect_subdomain');

        if (!subdomain) {
          router.push('/');
          return;
        }

        // Get tenant billing status
        const { data: tenant, error } = await supabase
          .from('tenants')
          .select('subdomain, subscription_status, stripe_customer_id')
          .eq('subdomain', subdomain)
          .single();

        if (error || !tenant) {
          console.error('Failed to fetch tenant:', error);
          localStorage.removeItem('auth_redirect_subdomain');
          router.push(`/${subdomain}/admin`);
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
          console.log('[AUTH REDIRECT] ⚠️ No active subscription or payment method - redirecting to plan selection');
          console.log('[AUTH REDIRECT] Redirecting to:', `/${subdomain}/admin/billing/select-plan`);
          // Clear localStorage AFTER determining redirect path
          localStorage.removeItem('auth_redirect_subdomain');
          router.push(`/${subdomain}/admin/billing/select-plan`);
          return;
        }

        // Existing customer with active subscription → Dashboard
        console.log('[AUTH REDIRECT] ✅ Active subscription detected - redirecting to dashboard');
        console.log('[AUTH REDIRECT] Redirecting to:', `/${subdomain}/admin`);
        // Clear localStorage AFTER determining redirect path
        localStorage.removeItem('auth_redirect_subdomain');
        router.push(`/${subdomain}/admin`);

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