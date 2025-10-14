import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useTenant } from '@/contexts/TenantContext';

interface Assessment {
  id: string;
  user_email: string;
  user_company: string;
  user_first_name: string;
  user_last_name: string;
  industry: string;
  company_size: string;
  created_at: string;
  request_status?: 'requested' | 'approved' | 'completed' | null;
  admin_notes?: string | null;
  report?: {
    id: string;
    status: string;
    access_token: string;
    email_sent_at: string | null;
  };
}

interface AssessmentsResponse {
  assessments: Assessment[];
  total: number;
}

export function useAssessments() {
  const { tenantContext } = useTenant();

  const { data, error, isLoading, mutate } = useSWR<AssessmentsResponse>(
    tenantContext
      ? [
          `${typeof window !== 'undefined' ? window.location.origin : ''}/api/admin/assessments?limit=10000`,
          {
            'x-tenant-subdomain': tenantContext.tenant.subdomain,
          },
        ]
      : null,
    ([url, headers]: [string, HeadersInit]) => fetcher<AssessmentsResponse>(url, headers),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000, // 2 seconds
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    }
  );

  return {
    assessments: data?.assessments || [],
    total: data?.total || 0,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

export type { Assessment };
