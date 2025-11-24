import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { createClient } from '@/utils/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean; // Default true, set false for billing pages
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresSubscription = true
}) => {
  const { user, session, loading } = useAuth();
  const { tenantContext } = useTenant();
  const router = useRouter();
  const [billingChecked, setBillingChecked] = useState(false);

  useEffect(() => {
    const checkBillingStatus = async () => {
      // First check: user authentication
      if (!loading && !user && tenantContext) {
        console.log('[PROTECTED ROUTE] No user, redirecting to login');
        router.push(`/${tenantContext.tenant.subdomain}/admin/login`);
        return;
      }

      // Second check: billing status (only if subscription is required)
      if (!loading && user && tenantContext && requiresSubscription) {
        console.log('[PROTECTED ROUTE] Checking billing status for:', tenantContext.tenant.subdomain);

        const supabase = createClient();
        const { data: tenant, error } = await supabase
          .from('tenants')
          .select('subscription_status, stripe_customer_id')
          .eq('id', tenantContext.tenant.id)
          .single();

        if (error) {
          console.error('[PROTECTED ROUTE] Error fetching tenant billing:', error);
          setBillingChecked(true);
          return;
        }

        const hasActiveSubscription =
          tenant?.subscription_status === 'active' ||
          tenant?.subscription_status === 'trialing' ||
          tenant?.subscription_status === 'past_due' || // Allow past_due to access billing page
          tenant?.subscription_status === 'unpaid'; // Allow unpaid to access billing page

        const hasPaymentMethod = !!tenant?.stripe_customer_id;

        console.log('[PROTECTED ROUTE] Billing status:', {
          subscription_status: tenant?.subscription_status,
          hasPaymentMethod,
          hasActiveSubscription
        });

        // If no active subscription or payment method, redirect to billing
        if (!hasActiveSubscription || !hasPaymentMethod) {
          console.log('[PROTECTED ROUTE] ⚠️ No active subscription or payment - redirecting to billing');
          router.push(`/${tenantContext.tenant.subdomain}/admin/billing/select-plan`);
          return;
        }

        console.log('[PROTECTED ROUTE] ✅ Billing check passed');
        setBillingChecked(true);
      } else if (!requiresSubscription) {
        // Skip billing check for billing pages themselves
        setBillingChecked(true);
      }
    };

    checkBillingStatus();
  }, [loading, user, tenantContext, router, requiresSubscription]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-600 mb-2">Loading...</div>
          <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
        </div>
      </div>
    );
  }

  if (!user || !session) {
    return null;
  }

  // Wait for billing check to complete before rendering protected content
  if (requiresSubscription && !billingChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium text-gray-600 mb-2">Checking access...</div>
          <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;