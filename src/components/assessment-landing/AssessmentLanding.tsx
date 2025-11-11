import React from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store';
import { openEmailModal } from '@/store/slices/quizSlice';
import { Button } from '@/components/shared/Button';
import { Clock, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface ClientLogo {
  url: string;
  alt: string;
}

interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
}

interface AssessmentLandingProps {
  onStartAssessment?: () => void;
  companyName?: string;
  brandColor?: string;
  brandColors?: BrandColors;
  logoUrl?: string;
  tagline?: string;
  clientLogos?: ClientLogo[];
}

export const AssessmentLanding: React.FC<AssessmentLandingProps> = ({
  onStartAssessment,
  companyName = 'Your Organization',
  brandColor = '#FF6B35',
  brandColors,
  logoUrl,
  tagline,
  clientLogos = []
}) => {
  const dispatch = useAppDispatch();

  const handleStartAssessment = () => {
    if (onStartAssessment) {
      onStartAssessment();
    } else {
      dispatch(openEmailModal());
    }
  };

  // Use brand colors if provided, otherwise use single brand color
  const colors = brandColors || {
    primary: brandColor || '#FF6B35',
    secondary: '#00D4FF',
    accent: '#FFB800',
    neutral: '#F6F9FC'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean white with colored accents */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-[3px] border-black">
        {/* Colored accent stripe at top */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: colors.primary }}
        />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo or Company Name */}
            {logoUrl ? (
              <div className="flex justify-center mb-8">
                <div className="bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src={logoUrl}
                    alt={companyName}
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
              </div>
            ) : (
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {companyName}
              </h1>
            )}

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              AI Readiness Assessment
            </h2>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
              {tagline || 'Discover exactly where AI can transform your business in under 3 minutes'}
            </p>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              {[
                { icon: Clock, label: 'Under 3 Minutes', color: colors.primary },
                { icon: Target, label: '14 Questions', color: colors.secondary },
                { icon: TrendingUp, label: 'Custom Roadmap', color: colors.accent }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  <item.icon
                    className="h-6 w-6 flex-shrink-0"
                    style={{ color: item.color }}
                  />
                  <span className="font-black text-gray-900 text-sm md:text-base">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartAssessment}
              className="inline-flex items-center justify-center px-8 py-4 text-white font-black text-lg border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              style={{ backgroundColor: colors.primary }}
            >
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <p className="mt-4 text-sm text-gray-600 font-medium">
              No credit card required • Completely free • Instant results
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 border-b-[3px] border-black"
        style={{ backgroundColor: colors.neutral }}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
            How Your Assessment Works
          </h3>
          <p className="text-lg text-gray-700 font-medium mb-12 text-center max-w-3xl mx-auto">
            We'll analyze your business to identify exactly where AI can deliver the highest impact and ROI for your specific situation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                step: '1',
                title: 'Take Assessment',
                description: 'Answer 14 quick questions about your business operations, challenges, and goals',
                color: colors.primary
              },
              {
                icon: TrendingUp,
                step: '2',
                title: 'Get Insights',
                description: 'Receive your AI readiness score and personalized opportunity analysis instantly',
                color: colors.secondary
              },
              {
                icon: CheckCircle,
                step: '3',
                title: 'Implement Solutions',
                description: 'Access your custom AI implementation roadmap with tool recommendations and ROI projections',
                color: colors.accent
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-white border-[3px] border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                {/* Colored left border accent */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1.5"
                  style={{ backgroundColor: item.color }}
                />

                <div
                  className="w-16 h-16 border-[3px] border-black flex items-center justify-center mb-6"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div
                  className="text-sm font-black mb-2"
                  style={{ color: item.color }}
                >
                  STEP {item.step}
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b-[3px] border-black">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
            What You'll Discover
          </h3>
          <p className="text-lg text-gray-700 font-medium mb-12 text-center max-w-3xl mx-auto">
            Your personalized assessment reveals actionable insights tailored to your business
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Revenue Opportunities',
                description: 'Identify where AI can increase your profits and reduce operational costs',
                color: colors.primary
              },
              {
                title: 'Competitive Positioning',
                description: 'Understand how you compare to others in your industry using AI',
                color: colors.secondary
              },
              {
                title: 'Operational Bottlenecks',
                description: 'Discover which tasks AI can automate to save time and money immediately',
                color: colors.accent
              },
              {
                title: 'Implementation Roadmap',
                description: 'Get a clear, step-by-step plan for successfully adopting AI in your business',
                color: colors.primary
              }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex-shrink-0 border-[2px] border-black flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section - Only show if client logos exist */}
      {clientLogos && clientLogos.length > 0 && (
        <section
          className="py-16 px-4 sm:px-6 lg:px-8 border-t-[3px] border-black"
          style={{ backgroundColor: colors.neutral }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 text-center">
              Trusted By
            </h3>
            <p className="text-gray-700 font-medium mb-12 text-center">
              Join businesses who have transformed with AI
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  <img
                    src={logo.url}
                    alt={logo.alt}
                    className="h-10 md:h-12 w-auto object-contain grayscale opacity-70"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 border-t-[3px] border-black"
        style={{ backgroundColor: colors.neutral }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
            Ready to Transform Your Business with AI?
          </h3>
          <p className="text-xl text-gray-700 mb-8 font-medium">
            Take the first step today. Your personalized roadmap is just 3 minutes away.
          </p>
          <button
            onClick={handleStartAssessment}
            className="inline-flex items-center justify-center px-8 py-4 text-white font-black text-lg border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            style={{ backgroundColor: colors.primary }}
          >
            Start Your Free Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-4 text-sm text-gray-600 font-medium">
            Takes less than 3 minutes • No signup required • Instant results
          </p>
        </div>
      </section>
    </div>
  );
};
