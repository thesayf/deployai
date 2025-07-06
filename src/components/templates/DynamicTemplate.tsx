/**
 * Dynamic Template Component
 * Renders landing page templates based on configuration
 */

import React from "react";
import Head from "next/head";
import { LandingPageTemplate } from "@/lib/templates/types";

// Import all components that can be used in templates
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { Hero } from "@/components/hero/Hero";
import { ProblemAgitation } from "@/components/problem-agitation/ProblemAgitation";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { ServiceFeatures } from "@/components/service-features/ServiceFeatures";
import { StickyScrollCards } from "@/components/sticky-scroll-cards/StickyScrollCards";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { StaggerTestimonials } from "@/components/stagger-testimonials/StaggerTestimonials";
import { PricingSection } from "@/components/pricing-section/PricingSection";
import { RiskReversal } from "@/components/risk-reversal/RiskReversal";
import { CalendlyInline } from "@/components/calendly/CalendlyInline";
import { FAQ } from "@/components/faq/FAQ";
import { Footer } from "@/components/footer/Footer";

interface DynamicTemplateProps {
  template: LandingPageTemplate;
  children?: React.ReactNode;
}

// Component mapping
const COMPONENT_MAP = {
  AnimatedNavBar,
  Hero,
  ProblemAgitation,
  BenefitsGrid,
  ServiceFeatures,
  StickyScrollCards,
  CaseStudies,
  StaggerTestimonials,
  PricingSection,
  RiskReversal,
  CalendlyInline,
  FAQ,
  Footer,
} as const;

export const DynamicTemplate: React.FC<DynamicTemplateProps> = ({
  template,
  children,
}) => {
  const { meta, content, sections, analytics } = template;

  // Generate analytics scripts
  const renderAnalytics = () => {
    const scripts = [];

    if (analytics?.googleAnalytics) {
      scripts.push(
        <script
          key="gtag"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalytics}`}
        />,
        <script
          key="gtag-config"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analytics.googleAnalytics}');
            `,
          }}
        />
      );
    }

    if (analytics?.facebookPixel) {
      scripts.push(
        <script
          key="fb-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${analytics.facebookPixel}');
              fbq('track', 'PageView');
            `,
          }}
        />
      );
    }

    return scripts;
  };

  // Render individual section
  const renderSection = (section: any) => {
    const Component =
      COMPONENT_MAP[section.component as keyof typeof COMPONENT_MAP];

    if (!Component) {
      console.warn(`Component ${section.component} not found in COMPONENT_MAP`);
      return null;
    }

    return (
      <Component
        key={section.component}
        {...section.props}
        templateContent={content}
      />
    );
  };

  return (
    <>
      <Head>
        {/* Meta Tags */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />

        {/* Canonical URL */}
        {meta.canonicalUrl && <link rel="canonical" href={meta.canonicalUrl} />}

        {/* Open Graph */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Analytics */}
        {renderAnalytics()}
      </Head>

      <main className="min-h-screen bg-white">
        {/* Render enabled sections in order */}
        {sections
          .filter((section) => section.enabled)
          .sort((a, b) => a.order - b.order)
          .map(renderSection)}

        {/* Always render footer */}
        <Footer />

        {/* Custom children (if any) */}
        {children}
      </main>
    </>
  );
};

// HOC for adding template context
export const withTemplate = <T extends object>(
  Component: React.ComponentType<T>,
  template: LandingPageTemplate
) => {
  const WrappedComponent = (props: T) => (
    <DynamicTemplate template={template}>
      <Component {...props} />
    </DynamicTemplate>
  );
  
  WrappedComponent.displayName = `withTemplate(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

// Hook for accessing template content within components
export const useTemplateContent = () => {
  const context = React.useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContent must be used within a template component"
    );
  }
  return context;
};

// Template context for sharing content across components
const TemplateContext = React.createContext<{
  content: any;
  meta: any;
  variant: string;
} | null>(null);

export const TemplateProvider: React.FC<{
  template: LandingPageTemplate;
  children: React.ReactNode;
}> = ({ template, children }) => {
  const value = {
    content: template.content,
    meta: template.meta,
    variant: template.variant,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
