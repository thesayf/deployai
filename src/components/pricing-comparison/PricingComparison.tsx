import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

interface PricingFeature {
  name: string;
  basic: boolean | string;
  ecommerce: boolean | string;
  enterprise: boolean | string;
}

interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  description: string;
  recommended?: boolean;
}

interface PricingComparisonProps {
  tiers?: PricingTier[];
  features?: PricingFeature[];
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Basic Website',
    price: 'AED 5,000 - 15,000',
    timeline: '2-4 weeks',
    description: 'Perfect for small businesses and startups',
  },
  {
    name: 'E-commerce',
    price: 'AED 15,000 - 50,000',
    timeline: '4-8 weeks',
    description: 'Full-featured online store with payment integration',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'AED 50,000+',
    timeline: '8-12 weeks',
    description: 'Custom solutions for large organizations',
  },
];

const defaultFeatures: PricingFeature[] = [
  {
    name: 'Responsive Design',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'SEO Optimization',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Content Management System',
    basic: 'WordPress',
    ecommerce: 'WooCommerce',
    enterprise: 'Custom CMS',
  },
  {
    name: 'Number of Pages',
    basic: 'Up to 10',
    ecommerce: 'Up to 50',
    enterprise: 'Unlimited',
  },
  {
    name: 'E-commerce Features',
    basic: false,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Payment Gateway Integration',
    basic: false,
    ecommerce: true,
    enterprise: true,
  },
  {
    name: 'Multi-language Support',
    basic: false,
    ecommerce: 'Optional',
    enterprise: true,
  },
  {
    name: 'Custom API Integration',
    basic: false,
    ecommerce: false,
    enterprise: true,
  },
  {
    name: 'Advanced Analytics',
    basic: false,
    ecommerce: 'Basic',
    enterprise: true,
  },
  {
    name: 'Dedicated Support',
    basic: 'Email',
    ecommerce: 'Priority Email',
    enterprise: '24/7 Phone & Email',
  },
  {
    name: 'Maintenance Period',
    basic: '3 months',
    ecommerce: '6 months',
    enterprise: '12 months',
  },
  {
    name: 'Source Code Access',
    basic: true,
    ecommerce: true,
    enterprise: true,
  },
];

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  tiers = defaultTiers,
  features = defaultFeatures,
  title = 'Dubai Web Development Pricing Guide',
  subtitle = 'Compare service tiers and find the perfect fit for your project',
  showCTA = true,
}) => {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center">
          <FiCheck className="h-5 w-5 text-emerald-500" />
        </div>
      ) : (
        <div className="flex justify-center">
          <FiX className="h-5 w-5 text-zinc-300" />
        </div>
      );
    }
    return <span className="text-sm text-zinc-600">{value}</span>;
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-lg text-zinc-600">{subtitle}</p>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="px-6 py-4 text-left">
                  <div className="h-5"></div>
                  <span className="text-sm font-medium text-zinc-500">Features</span>
                </th>
                {tiers.map((tier, index) => (
                  <th key={index} className="px-6 py-4 text-center">
                    <div className="space-y-1">
                      <div className="h-5">
                        {tier.recommended && (
                          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900">{tier.name}</h3>
                      <p className="text-2xl font-bold text-emerald-600">{tier.price}</p>
                      <p className="text-sm text-zinc-500">{tier.timeline}</p>
                      <p className="text-xs text-zinc-600">{tier.description}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`border-b border-zinc-100 ${
                    index % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.basic)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.ecommerce)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
            {showCTA && (
              <tfoot>
                <tr className="bg-zinc-50">
                  <td className="px-6 py-4" />
                  {tiers.map((tier, index) => (
                    <td key={index} className="px-6 py-4 text-center">
                      <button className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600">
                        Get Started
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Mobile View - Vertical Cards */}
      <div className="lg:hidden">
        <div className="space-y-6">
          {tiers.map((tier, tierIndex) => (
            <div
              key={tierIndex}
              className={`rounded-lg border bg-white p-6 shadow-sm ${
                tier.recommended ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-zinc-200'
              }`}
            >
              {/* Tier Header */}
              <div className="mb-6 text-center">
                {tier.recommended && (
                  <span className="mb-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-semibold text-zinc-900">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-emerald-600">{tier.price}</p>
                <p className="text-sm text-zinc-500">{tier.timeline}</p>
                <p className="mt-1 text-sm text-zinc-600">{tier.description}</p>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {features.map((feature, featureIndex) => {
                  const value = tierIndex === 0 ? feature.basic : tierIndex === 1 ? feature.ecommerce : feature.enterprise;
                  return (
                    <div
                      key={featureIndex}
                      className="flex items-center justify-between border-b border-zinc-100 pb-3 last:border-0"
                    >
                      <span className="text-sm font-medium text-zinc-700">{feature.name}</span>
                      <span className="text-sm">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <FiCheck className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <FiX className="h-5 w-5 text-zinc-300" />
                          )
                        ) : (
                          <span className="text-zinc-600">{value}</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              {showCTA && (
                <button className="mt-6 w-full rounded-lg bg-emerald-500 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600">
                  Get Started
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};