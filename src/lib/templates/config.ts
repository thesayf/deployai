/**
 * Template System Configuration
 * Defines default section configurations and template structures
 */

import { LandingPageTemplate, SectionConfig, ComponentVariant } from "./types";

// Default section configurations for all templates
export const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    component: "Hero",
    enabled: true,
    order: 1,
    props: {},
  },
  {
    component: "ProblemAgitation",
    enabled: true,
    order: 2,
    props: {},
  },
  {
    component: "BenefitsGrid",
    enabled: true,
    order: 3,
    props: {},
  },
  {
    component: "ServiceFeatures",
    enabled: true,
    order: 4,
    props: {},
  },
  {
    component: "StickyScrollCards",
    enabled: true,
    order: 5,
    props: {},
  },
  {
    component: "CaseStudies",
    enabled: true,
    order: 6,
    props: {},
  },
  {
    component: "StaggerTestimonials",
    enabled: true,
    order: 7,
    props: {},
  },
  {
    component: "PricingSection",
    enabled: true,
    order: 8,
    props: {},
  },
  {
    component: "RiskReversal",
    enabled: true,
    order: 9,
    props: {},
  },
  {
    component: "CalendlyInline",
    enabled: true,
    order: 10,
    props: {},
  },
  {
    component: "FAQ",
    enabled: true,
    order: 11,
    props: {},
  },
];

// Variant-specific section overrides
export const VARIANT_SECTION_CONFIGS: Record<
  ComponentVariant,
  Partial<SectionConfig>[]
> = {
  customSoftware: [
    {
      component: "Hero",
      props: { variant: "customSoftware" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "customSoftware" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "customSoftware" },
    },
    {
      component: "FAQ",
      props: { variant: "customSoftware" },
    },
  ],
  webapp: [
    {
      component: "Hero",
      props: { variant: "webapp" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "webapp" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "webapp" },
    },
    {
      component: "FAQ",
      props: { variant: "webapp" },
    },
  ],
  ai: [
    {
      component: "Hero",
      props: { variant: "ai" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "ai" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "ai" },
    },
    {
      component: "FAQ",
      props: { variant: "ai" },
    },
    {
      component: "CaseStudies",
      props: { filter: "ai" },
    },
  ],
  automation: [
    {
      component: "Hero",
      props: { variant: "automation" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "automation" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "automation" },
    },
    {
      component: "FAQ",
      props: { variant: "automation" },
    },
    {
      component: "CaseStudies",
      props: { filter: "automation" },
    },
  ],
  saas: [
    {
      component: "Hero",
      props: { variant: "saas" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "saas" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "saas" },
    },
    {
      component: "FAQ",
      props: { variant: "saas" },
    },
  ],
  mobile: [
    {
      component: "Hero",
      props: { variant: "mobile" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "mobile" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "mobile" },
    },
    {
      component: "FAQ",
      props: { variant: "mobile" },
    },
  ],
  ecommerce: [
    {
      component: "Hero",
      props: { variant: "ecommerce" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "ecommerce" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "ecommerce" },
    },
    {
      component: "FAQ",
      props: { variant: "ecommerce" },
    },
  ],
  healthcare: [
    {
      component: "Hero",
      props: { variant: "healthcare" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "healthcare" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "healthcare" },
    },
    {
      component: "FAQ",
      props: { variant: "healthcare" },
    },
  ],
  fintech: [
    {
      component: "Hero",
      props: { variant: "fintech" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "fintech" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "fintech" },
    },
    {
      component: "FAQ",
      props: { variant: "fintech" },
    },
  ],
  realestate: [
    {
      component: "Hero",
      props: { variant: "realestate" },
    },
    {
      component: "ProblemAgitation",
      props: { variant: "realestate" },
    },
    {
      component: "ServiceFeatures",
      props: { variant: "realestate" },
    },
    {
      component: "FAQ",
      props: { variant: "realestate" },
    },
  ],
};

// Template generation patterns
export const TEMPLATE_PATTERNS = {
  // Location + Service patterns
  locationService: {
    slug: "{service}-{location}",
    title: "{service} {location} | {value-proposition}",
    description: "{service} services in {location}. {benefits}",
    keywords: [
      "{service}",
      "{location}",
      "{service} {location}",
      "{industry} {service}",
    ],
  },

  // Industry + Location patterns
  industryLocation: {
    slug: "{industry}-{service}-{location}",
    title: "{industry} {service} {location} | {value-proposition}",
    description:
      "{service} solutions for {industry} businesses in {location}. {benefits}",
    keywords: [
      "{industry} {service}",
      "{location} {industry}",
      "{service} {location}",
      "{industry} software",
    ],
  },

  // Service + Industry patterns
  serviceIndustry: {
    slug: "{service}-{industry}",
    title: "{service} for {industry} | {value-proposition}",
    description:
      "Specialized {service} solutions for {industry} businesses. {benefits}",
    keywords: [
      "{service} {industry}",
      "{industry} software",
      "{service} solutions",
      "{industry} technology",
    ],
  },
};

// Default content templates
export const DEFAULT_CONTENT_TEMPLATES = {
  valuePropositions: {
    customSoftware:
      "Stop paying monthly fees for software that doesn't fit your business",
    webapp: "Build scalable web applications that grow with your business",
    ai: "Harness the power of AI to automate and optimize your operations",
    automation:
      "Streamline your business processes with intelligent automation",
    saas: "Launch your SaaS platform with enterprise-grade features",
    mobile: "Reach customers anywhere with powerful mobile applications",
    ecommerce: "Build online stores that convert visitors into customers",
    healthcare:
      "Improve patient care with secure, compliant healthcare solutions",
    fintech: "Build secure, scalable financial technology solutions",
    realestate:
      "Transform your real estate business with custom software solutions",
  },

  ctaTexts: {
    primary: "Get Your Free Consultation",
    secondary: "Book a Discovery Call",
    tertiary: "Start Your Project Today",
  },

  urgencyFactors: {
    limited: "Limited Time Offer",
    demand: "High Demand in {location}",
    growth: "Growing Market Opportunity",
    competition: "Stay Ahead of Competition",
  },
};

// Industry-specific service mappings
export const INDUSTRY_SERVICE_MAPPINGS = {
  "real-estate": [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
  healthcare: [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
  fintech: [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
  logistics: ["custom-software-development", "automation", "ai-solutions"],
  education: [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
  hospitality: [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
};

// Service-variant mappings
export const SERVICE_VARIANT_MAPPINGS: Record<string, ComponentVariant> = {
  "custom-software-development": "customSoftware",
  "web-development": "webapp",
  "ai-solutions": "ai",
  automation: "automation",
  "saas-development": "saas",
  "mobile-development": "mobile",
  "ecommerce-development": "ecommerce",
};

// Location-specific customizations
export const LOCATION_CUSTOMIZATIONS = {
  dubai: {
    urgencyFactor: "High demand in Dubai's competitive market",
    businessContext: "Dubai's thriving business ecosystem",
    culturalContext: "Dubai's innovative business culture",
  },
  "abu-dhabi": {
    urgencyFactor: "Growing opportunities in Abu Dhabi",
    businessContext: "Abu Dhabi's strategic business environment",
    culturalContext: "Abu Dhabi's government and enterprise focus",
  },
  sharjah: {
    urgencyFactor: "Excellent value in Sharjah market",
    businessContext: "Sharjah's educational and cultural hub",
    culturalContext: "Sharjah's focus on education and manufacturing",
  },
  uae: {
    urgencyFactor: "UAE-wide market opportunities",
    businessContext: "UAE's position as regional business hub",
    culturalContext: "UAE's diverse and innovative business environment",
  },
};

// Template validation rules
export const VALIDATION_RULES = {
  required: [
    "slug",
    "meta.title",
    "meta.description",
    "content.location",
    "content.service",
  ],
  maxLengths: {
    "meta.title": 60,
    "meta.description": 160,
    "content.valueProposition": 200,
  },
  patterns: {
    slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    keywords: /^[a-zA-Z0-9\s,-]+$/,
  },
};

// Export utility function to merge sections
export function mergeSections(
  defaultSections: SectionConfig[],
  overrides: Partial<SectionConfig>[]
): SectionConfig[] {
  const merged = [...defaultSections];

  overrides.forEach((override) => {
    const index = merged.findIndex(
      (section) => section.component === override.component
    );
    if (index !== -1) {
      merged[index] = {
        ...merged[index],
        ...override,
        props: {
          ...merged[index].props,
          ...override.props,
        },
      };
    }
  });

  return merged.sort((a, b) => a.order - b.order);
}
