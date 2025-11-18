import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Mail, Building2, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { formatSubdomainPreview } from '@/config/site';
import { signInWithGoogleClient } from '@/lib/auth-actions';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);

  // Auto-generate subdomain from company name
  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    // Generate subdomain: lowercase, remove spaces/special chars
    const generated = value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);
    setSubdomain(generated);
  };

  const handleGoogleSignup = async () => {
    try {
      setOauthLoading(true);
      setError(null);

      // Note: For OAuth signup, we'll need to collect company name/subdomain
      // after the OAuth flow completes. For now, we'll use a temporary subdomain.
      localStorage.setItem('auth_flow_type', 'signup');

      await signInWithGoogleClient('temp'); // Temporary subdomain
    } catch (err: any) {
      console.error('Google signup error:', err);
      setError('Failed to sign up with Google');
      setOauthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log('[SIGNUP Frontend] 🚀 Starting signup submission');
    console.log('[SIGNUP Frontend] Form data:', { email, companyName, subdomain, hasPassword: !!password });

    // Validation
    if (!email || !password || !companyName || !subdomain) {
      console.log('[SIGNUP Frontend] ❌ Validation failed: Missing fields');
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      console.log('[SIGNUP Frontend] ❌ Validation failed: Password too short');
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (subdomain.length < 3) {
      console.log('[SIGNUP Frontend] ❌ Validation failed: Subdomain too short');
      setError('Subdomain must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (!/^[a-z0-9]+$/.test(subdomain)) {
      console.log('[SIGNUP Frontend] ❌ Validation failed: Invalid subdomain format');
      setError('Subdomain can only contain lowercase letters and numbers');
      setLoading(false);
      return;
    }

    console.log('[SIGNUP Frontend] ✅ Validation passed');

    try {
      // Step 1: Create tenant and user
      console.log('[SIGNUP Frontend] 📡 Calling /api/auth/signup');
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          companyName,
          subdomain,
        }),
      });

      console.log('[SIGNUP Frontend] Response status:', response.status);
      const data = await response.json();
      console.log('[SIGNUP Frontend] Response data:', data);

      if (!response.ok) {
        console.log('[SIGNUP Frontend] ❌ API returned error');
        throw new Error(data.error || 'Signup failed');
      }

      console.log('[SIGNUP Frontend] ✅ Signup API succeeded');

      // Step 2: Auto-login the user
      if (!data.requiresLogin) {
        console.log('[SIGNUP Frontend] 🔐 Attempting auto-login');
        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error('[SIGNUP Frontend] ❌ Auto-login failed:', signInError);
          console.log('[SIGNUP Frontend] Redirecting to manual login');
          // Fall back to manual login
          router.push(`/${subdomain}/admin/login`);
          return;
        }

        console.log('[SIGNUP Frontend] ✅ Auto-login successful');
        // Store subdomain for redirect logic
        localStorage.setItem('auth_redirect_subdomain', subdomain);
      } else {
        console.log('[SIGNUP Frontend] Manual login required');
      }

      // Redirect to appropriate page
      if (data.redirectUrl) {
        console.log('[SIGNUP Frontend] 🚀 Redirecting to:', data.redirectUrl);
        router.push(data.redirectUrl);
      } else {
        // Fallback
        console.log('[SIGNUP Frontend] Using fallback redirect');
        router.push(`/${subdomain}/admin/login`);
      }

    } catch (err: any) {
      console.error('[SIGNUP Frontend] 💥 ERROR:', err);
      console.error('[SIGNUP Frontend] Error details:', err.message);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Start Your Free Trial
          </h1>
          <p className="text-gray-600">
            14 days free • No credit card required
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => handleCompanyNameChange(e.target.value)}
                  placeholder="Acme Consulting"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Subdomain */}
            <div>
              <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-2">
                Your Subdomain
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="subdomain"
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                  placeholder="acmeconsulting"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your portal will be: <strong>{formatSubdomainPreview(subdomain)}</strong>
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading || oauthLoading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {oauthLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold text-gray-900">14</p>
            <p className="text-xs text-gray-600">Day Trial</p>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-600">Free Assessments</p>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-3">
            <p className="text-2xl font-bold text-gray-900">$0</p>
            <p className="text-xs text-gray-600">Setup Fee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
