import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useTenant } from '@/contexts/TenantContext';
import { Upload, X, Plus, Eye, Save, AlertCircle } from 'lucide-react';

interface ClientLogo {
  url: string;
  alt: string;
}

export default function BrandingSettingsPage() {
  const router = useRouter();
  const { tenant } = router.query;
  const { tenantContext, refetchTenant } = useTenant();

  const [logoUrl, setLogoUrl] = useState('');
  const [brandColor, setBrandColor] = useState('#FF6B35');
  const [tagline, setTagline] = useState('');
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // New client logo form
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [newLogoAlt, setNewLogoAlt] = useState('');

  // Load current branding settings
  useEffect(() => {
    if (tenantContext?.tenant) {
      setLogoUrl(tenantContext.tenant.logo_url || '');
      setBrandColor(tenantContext.tenant.brand_color || '#FF6B35');
      setTagline(tenantContext.tenant.tagline || '');
      setClientLogos(tenantContext.tenant.client_logos || []);
    }
  }, [tenantContext]);

  const handleAddClientLogo = () => {
    if (!newLogoUrl.trim()) {
      setError('Logo URL is required');
      return;
    }

    setClientLogos([...clientLogos, {
      url: newLogoUrl,
      alt: newLogoAlt || 'Client logo'
    }]);

    setNewLogoUrl('');
    setNewLogoAlt('');
    setError(null);
  };

  const handleRemoveClientLogo = (index: number) => {
    setClientLogos(clientLogos.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/tenant/update-branding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-subdomain': tenant as string,
        },
        body: JSON.stringify({
          logo_url: logoUrl,
          brand_color: brandColor,
          tagline: tagline,
          client_logos: clientLogos,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save branding settings');
      }

      setSuccess('Branding settings saved successfully!');

      // Refresh tenant context
      await refetchTenant();

    } catch (err: any) {
      console.error('Error saving branding:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const previewUrl = `/${tenant}/assessment`;

  return (
    <ProtectedRoute>
      <AdminLayout title="Branding Settings">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Branding Settings</h1>
              <p className="text-gray-600 mt-1">
                Customize how your AI assessment landing page looks to your clients
              </p>
            </div>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview
            </a>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Logo Upload */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Logo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended size: 200x80px. Accepts PNG, JPG, or SVG.
                </p>
              </div>
              {logoUrl && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-20 object-contain"
                    onError={() => setError('Failed to load logo')}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Brand Color */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Brand Color</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#FF6B35"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm w-32"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Used for buttons, icons, and accents
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <button
                    className="px-6 py-3 text-white font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ backgroundColor: brandColor }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Tagline</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Tagline (Optional)
                </label>
                <textarea
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Discover exactly where AI can transform your business in under 3 minutes"
                  rows={2}
                  maxLength={150}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {tagline.length}/150 characters. Leave blank to use default tagline.
                </p>
              </div>
            </div>
          </div>

          {/* Client Logos (Social Proof) */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Client Logos</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add logos of clients you've worked with for social proof
            </p>

            {/* Existing Logos */}
            {clientLogos.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {clientLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg group"
                    >
                      <button
                        onClick={() => handleRemoveClientLogo(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={logo.url}
                        alt={logo.alt}
                        className="h-12 w-full object-contain grayscale"
                      />
                      <p className="mt-2 text-xs text-gray-600 text-center truncate">
                        {logo.alt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Logo Form */}
            <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900">Add Client Logo</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                    placeholder="https://example.com/client-logo.png"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={newLogoAlt}
                    onChange={(e) => setNewLogoAlt(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              <button
                onClick={handleAddClientLogo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Logo
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
