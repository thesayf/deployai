import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { tenantService, TenantContext as TenantContextType } from '@/services/tenant';

interface TenantProviderState {
  tenantContext: TenantContextType | null;
  loading: boolean;
  error: string | null;
  refetchTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantProviderState | undefined>(undefined);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenantContext, setTenantContext] = useState<TenantContextType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTenantContext = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get tenant from path first (path-based routing)
      let tenantSlug = getTenantFromPath();

      // If not found in path, try subdomain (subdomain-based routing)
      if (!tenantSlug) {
        tenantSlug = getSubdomainFromWindow();
      }

      if (!tenantSlug || tenantSlug === 'www') {
        setTenantContext(null);
        setLoading(false);
        return;
      }

      const userEmail = getUserEmailFromSession();
      const context = await tenantService.getTenantContext(tenantSlug, userEmail);

      if (!context) {
        setError('Invalid tenant subdomain');
        setTenantContext(null);
      } else {
        setTenantContext(context);
      }
    } catch (err) {
      console.error('Error fetching tenant context:', err);
      setError('Failed to load tenant information');
      setTenantContext(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenantContext();
  }, []);

  useEffect(() => {
    fetchTenantContext();
  }, [router.pathname]);

  const refetchTenant = async () => {
    await fetchTenantContext();
  };

  return (
    <TenantContext.Provider
      value={{
        tenantContext,
        loading,
        error,
        refetchTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

function getTenantFromPath(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const pathname = window.location.pathname;
  // Extract tenant from path like /testconsultant/admin
  const match = pathname.match(/^\/([^\/]+)\/(admin|public)/);

  if (match) {
    return match[1];
  }

  return null;
}

function getSubdomainFromWindow(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname;

  // Handle localhost subdomains (e.g., testconsultant.localhost)
  if (hostname.includes('localhost') || hostname === '127.0.0.1') {
    const parts = hostname.split('.');
    if (parts.length > 1 && parts[0] !== 'www') {
      return parts[0];
    }
    return null;
  }

  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'deployai.studio';
  const subdomain = hostname.replace(`.${baseDomain}`, '');

  if (subdomain === hostname || subdomain === 'www') {
    return null;
  }

  return subdomain;
}

function getUserEmailFromSession(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const storedEmail = localStorage.getItem('userEmail');
  return storedEmail || undefined;
}