import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Building2, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { formatSubdomainPreview } from '@/config/site';

export default function CompleteSignupPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Verify user is authenticated
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Not authenticated, redirect to signup
        router.push('/signup');
        return;
      }

      setUserEmail(session.user.email || null);

      // Check if user already has a tenant
      const { data: tenantData } = await supabase
        .from('tenant_members')
        .select('tenant_id, tenants(subdomain)')
        .eq('user_email', session.user.email)
        .single();

      if (tenantData) {
        // User already has a tenant, redirect there
        const tenant = (tenantData as any).tenants;
        router.push(`/${tenant.subdomain}/admin`);
      }
    };

    checkAuth();
  }, [router]);

  // Auto-generate subdomain from company name
  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    const generated = value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20);
    setSubdomain(generated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!companyName || !subdomain) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (subdomain.length < 3) {
      setError('Subdomain must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (!/^[a-z0-9]+$/.test(subdomain)) {
      setError('Subdomain can only contain lowercase letters and numbers');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        throw new Error('Not authenticated');
      }

      // Create tenant via API
      const response = await fetch('/api/auth/complete-oauth-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          companyName,
          subdomain,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete signup');
      }

      // Redirect to billing/select-plan
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push(`/${subdomain}/admin/billing/select-plan`);
      }
    } catch (err: any) {
      console.error('Complete signup error:', err);
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
            Complete Your Signup
          </h1>
          <p className="text-gray-600">
            {userEmail && `Signed in as ${userEmail}`}
          </p>
          <p className="text-gray-600 mt-2">
            Just a couple more details to get started
          </p>
        </div>

        {/* Form */}
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
                  autoFocus
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Continue'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
