import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTenant } from './TenantContext';

// Import types directly
import type { AdminUser, AdminSession } from '@/lib/supabase-auth';

interface AuthContextType {
  user: AdminUser | null;
  session: AdminSession | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const router = useRouter();
  const { tenantContext } = useTenant();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAuthSuccess = async (authUser: any) => {
    if (!tenantContext) {
      setError('No tenant context available');
      return;
    }

    try {
      // Dynamically import auth functions
      const {
        createOrGetAdminUser,
        verifyTenantAccess,
        createAdminSession,
        validateAdminSession,
        signOut
      } = await import('@/lib/supabase-auth');

      const { user_id, is_new } = await createOrGetAdminUser(
        authUser.email,
        authUser.user_metadata?.full_name,
        authUser.user_metadata?.avatar_url,
        authUser.app_metadata?.provider || 'email'
      );

      const { has_access, tenant_id, user_role } = await verifyTenantAccess(
        user_id,
        tenantContext.tenant.subdomain
      );

      if (!has_access) {
        setError('You do not have access to this tenant');
        await signOut();
        return;
      }

      const token = await createAdminSession(user_id, tenant_id!);

      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_session_token', token);
      }

      const adminSession = await validateAdminSession(token);
      if (adminSession) {
        setUser(adminSession.user);
        setSession(adminSession);

        // Check if we're on the callback page, then redirect to admin
        if (router.pathname === '/auth/callback') {
          router.push(`/${tenantContext.tenant.subdomain}/admin`);
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      setError(null);
      const { signInWithGoogle } = await import('@/lib/supabase-auth');
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const { signInWithEmail } = await import('@/lib/supabase-auth');
      const { user: authUser } = await signInWithEmail(email, password);
      if (authUser) {
        await handleAuthSuccess(authUser);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  const handleSignUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const { signUpWithEmail } = await import('@/lib/supabase-auth');
      const { user: authUser } = await signUpWithEmail(email, password);
      if (authUser) {
        setError('Please check your email to verify your account');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  const handleSignOut = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_session_token') : null;

      if (token) {
        const { deleteAdminSession } = await import('@/lib/supabase-auth');
        await deleteAdminSession(token);
        localStorage.removeItem('admin_session_token');
      }

      const { signOut } = await import('@/lib/supabase-auth');
      await signOut();
      setUser(null);
      setSession(null);

      if (tenantContext) {
        router.push(`/${tenantContext.tenant.subdomain}/admin/login`);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const checkSession = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_session_token') : null;

      if (token) {
        const { validateAdminSession } = await import('@/lib/supabase-auth');
        const adminSession = await validateAdminSession(token);
        if (adminSession) {
          setUser(adminSession.user);
          setSession(adminSession);
        } else {
          localStorage.removeItem('admin_session_token');
        }
      }

      const { getSession } = await import('@/lib/supabase-auth');
      const supabaseSession = await getSession();
      if (supabaseSession?.user && !token) {
        await handleAuthSuccess(supabaseSession.user);
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      await checkSession();

      const { onAuthStateChange } = await import('@/lib/supabase-auth');
      const { data: authListener } = onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await handleAuthSuccess(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_session_token');
          }
        }
      });

      setAuthReady(true);

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    };

    initAuth();
  }, [tenantContext]);

  const value = {
    user,
    session,
    loading,
    error,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    signOut: handleSignOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;