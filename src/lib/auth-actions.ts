import { createClient } from '@/utils/supabase/client';

export async function signInWithGoogleClient(tenant: string) {
  const supabase = createClient();

  // Store the tenant subdomain before OAuth redirect
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_redirect_subdomain', tenant);
  }

  const origin = window.location.origin;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithEmailClient(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signUpWithEmailClient(email: string, password: string) {
  const supabase = createClient();
  const origin = window.location.origin;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}