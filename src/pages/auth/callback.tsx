import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/utils/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient();

      // Exchange the code for a session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        // Redirect to login with error
        router.push('/admin/login?error=auth_failed');
        return;
      }

      if (!session) {
        console.error('No session after OAuth callback');
        router.push('/admin/login?error=no_session');
        return;
      }

      console.log('[OAuth] Session established:', session.user.email);

      // Get the stored subdomain from localStorage
      const storedSubdomain = localStorage.getItem('auth_redirect_subdomain');

      if (storedSubdomain) {
        console.log('[OAuth] Found stored subdomain:', storedSubdomain);

        // Check if tenant exists for this user
        const { data: tenantData, error: tenantError } = await supabase
          .from('tenant_members')
          .select('tenant_id, tenants(subdomain)')
          .eq('user_email', session.user.email)
          .single();

        if (!tenantError && tenantData) {
          // User is a member of a tenant
          const tenant = (tenantData as any).tenants;
          console.log('[OAuth] User is member of tenant:', tenant.subdomain);

          // Clean up localStorage
          localStorage.removeItem('auth_redirect_subdomain');

          // Redirect to their tenant dashboard
          router.push(`/${tenant.subdomain}/admin`);
          return;
        }

        // User is not yet a member of any tenant
        // This is a new OAuth signup - redirect to complete signup
        console.log('[OAuth] New user, redirecting to complete signup');
        localStorage.removeItem('auth_redirect_subdomain');

        // Redirect to complete signup page to collect company name/subdomain
        router.push('/auth/complete-signup');
        return;
      }

      // No stored subdomain - try to find any tenant this user belongs to
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenant_members')
        .select('tenant_id, tenants(subdomain)')
        .eq('user_email', session.user.email)
        .limit(1)
        .single();

      if (!tenantError && tenantData) {
        const tenant = (tenantData as any).tenants;
        console.log('[OAuth] Redirecting to tenant:', tenant.subdomain);
        router.push(`/${tenant.subdomain}/admin`);
        return;
      }

      // User has no tenant association - redirect to complete signup
      console.log('[OAuth] No tenant found, redirecting to complete signup');
      router.push('/auth/complete-signup');
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-lg text-gray-700">Completing sign in...</p>
      </div>
    </div>
  );
}
