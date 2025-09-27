import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Only initialize on client side to avoid hydration issues
let supabaseAuth: SupabaseClient;

if (typeof window !== 'undefined') {
  supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: {
        getItem: (key: string) => {
          if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key);
          }
          return null;
        },
        setItem: (key: string, value: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value);
          }
        },
        removeItem: (key: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
          }
        },
      },
    },
  });
} else {
  // Server-side placeholder
  supabaseAuth = {} as SupabaseClient;
}

export { supabaseAuth };

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  auth_provider: 'email' | 'google';
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface AdminSession {
  user: AdminUser;
  tenant_id: string;
  tenant_subdomain: string;
  role: string;
  expires_at: string;
}

export async function signInWithGoogle() {
  const { data, error } = await supabaseAuth.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabaseAuth.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabaseAuth.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data: { session }, error } = await supabaseAuth.auth.getSession();
  if (error) throw error;
  return session;
}

export async function refreshSession() {
  const { data: { session }, error } = await supabaseAuth.auth.refreshSession();
  if (error) throw error;
  return session;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabaseAuth.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabaseAuth.auth.onAuthStateChange(callback);
}

export async function createOrGetAdminUser(
  email: string,
  name?: string,
  avatarUrl?: string,
  authProvider: 'email' | 'google' = 'email'
): Promise<{ user_id: string; is_new: boolean }> {
  const { data, error } = await supabaseAuth.rpc('get_or_create_admin_user', {
    p_email: email,
    p_name: name,
    p_avatar_url: avatarUrl,
    p_auth_provider: authProvider,
  });

  if (error) throw error;
  return data[0];
}

export async function verifyTenantAccess(
  userId: string,
  tenantSubdomain: string
): Promise<{ has_access: boolean; tenant_id?: string; user_role?: string }> {
  const { data, error } = await supabaseAuth.rpc('verify_tenant_membership', {
    p_user_id: userId,
    p_tenant_subdomain: tenantSubdomain,
  });

  if (error) throw error;
  return data[0];
}

export async function createAdminSession(
  userId: string,
  tenantId: string,
  expiresInHours: number = 24
): Promise<string> {
  const token = generateSecureToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  const { error } = await supabaseAuth
    .from('admin_sessions')
    .insert({
      user_id: userId,
      tenant_id: tenantId,
      token,
      expires_at: expiresAt.toISOString(),
    });

  if (error) throw error;
  return token;
}

export async function validateAdminSession(token: string): Promise<AdminSession | null> {
  const { data, error } = await supabaseAuth
    .from('admin_sessions')
    .select(`
      *,
      admin_users (
        id,
        email,
        name,
        avatar_url,
        auth_provider
      ),
      tenants (
        id,
        subdomain
      )
    `)
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return null;

  await supabaseAuth
    .from('admin_sessions')
    .update({ last_active_at: new Date().toISOString() })
    .eq('id', data.id);

  return {
    user: data.admin_users as AdminUser,
    tenant_id: data.tenant_id,
    tenant_subdomain: data.tenants.subdomain,
    role: data.role,
    expires_at: data.expires_at,
  };
}

export async function deleteAdminSession(token: string): Promise<void> {
  const { error } = await supabaseAuth
    .from('admin_sessions')
    .delete()
    .eq('token', token);

  if (error) throw error;
}

function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const array = new Uint8Array(length);

  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }

  for (let i = 0; i < length; i++) {
    token += chars[array[i] % chars.length];
  }

  return token;
}

export default supabaseAuth;