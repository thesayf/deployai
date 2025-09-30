import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

interface AuthCallbackProps {
  tenant: string;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ tenant }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('[AUTH-CALLBACK] Processing OAuth callback for tenant:', tenant);

        // Import Supabase auth
        const { supabaseAuth } = await import('@/lib/supabase-auth');
        const client = supabaseAuth();

        // Get the current session - Supabase should auto-detect the code in URL
        const { data: { session }, error: sessionError } = await client.auth.getSession();

        if (sessionError) {
          console.error('[AUTH-CALLBACK] Error getting session:', sessionError);
          setError(sessionError.message);
          return;
        }

        if (!session) {
          console.log('[AUTH-CALLBACK] No session found, waiting for auth state change...');
          // Wait a bit for the session to be established
          setTimeout(() => {
            router.push(`/${tenant}/admin`);
          }, 1000);
          return;
        }

        console.log('[AUTH-CALLBACK] Session established:', session);

        // Session is established, redirect to admin
        router.push(`/${tenant}/admin`);
      } catch (err) {
        console.error('[AUTH-CALLBACK] Error:', err);
        setError('Failed to process authentication');
      }
    };

    handleCallback();
  }, [tenant, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-xl font-medium text-red-600 mb-2">Authentication Error</div>
            <div className="text-sm text-gray-600">{error}</div>
          </>
        ) : (
          <>
            <div className="text-xl font-medium text-gray-600 mb-2">Authenticating...</div>
            <div className="animate-pulse bg-gray-300 h-2 w-32 mx-auto rounded"></div>
            <div className="mt-4 text-sm text-gray-500">
              Processing authentication for {tenant}...
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tenant = context.params?.tenant as string;

  if (!tenant) {
    return {
      notFound: true,
    };
  }

  // Verify tenant exists
  const tenantContext = await getTenantFromRequest(context.req);

  if (!tenantContext) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tenant,
    },
  };
};

export default AuthCallback;