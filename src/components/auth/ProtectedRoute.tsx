import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, session, loading } = useAuth();
  const { tenantContext } = useTenant();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && tenantContext) {
      router.push(`/${tenantContext.tenant.subdomain}/admin/login`);
    }
  }, [loading, user, tenantContext, router]);

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

  return <>{children}</>;
};

export default ProtectedRoute;