/**
 * Template System Types
 * Core TypeScript interfaces for the landing page template system
 */

export type ComponentVariant =
  | "customSoftware"
  | "webapp"
  | "ai"
  | "automation"
  | "saas"
  | "mobile"
  | "ecommerce"
  | "healthcare"
  | "fintech"
  | "realestate"
  | string; // Allow dynamic variants

export interface TemplateContent {
  location: string; // "Dubai", "Abu Dhabi", "UAE", "Sharjah"
  service: string; // "Custom Software", "Web Development", "AI Solutions"
  industry?: string; // "Real Estate", "Healthcare", "Finance"
  targetAudience: string; // "Businesses", "Startups", "Enterprises"
  valueProposition: string; // Main value proposition
  painPoints: string[]; // Industry/location specific pain points
  benefits: string[]; // Key benefits to highlight
  ctaText: string; // Call-to-action text
  urgency?: string; // Urgency factor like "Limited Time", "High Demand"
}

export interface TemplateMeta {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export interface SectionConfig {
  component: string; // Component name like "Hero", "ProblemAgitation"
  enabled: boolean; // Whether to render this section
  variant?: ComponentVariant; // Override variant for this section
  order: number; // Render order
  props?: Record<string, any>; // Additional props for the component
}

export interface LandingPageTemplate {
  id: string;
  slug: string;
  variant: ComponentVariant;
  meta: TemplateMeta;
  content: TemplateContent;
  sections: SectionConfig[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  analytics?: {
    googleAnalytics?: string;
    facebookPixel?: string;
    hotjar?: string;
  };
}

export interface LocationData {
  id: string;
  name: string; // "Dubai", "Abu Dhabi"
  slug: string; // "dubai", "abu-dhabi"
  country: string; // "UAE", "Saudi Arabia"
  timezone: string; // "Asia/Dubai"
  currency: string; // "AED", "SAR"
  businessContext: string; // Local business context
  marketInsights: string[]; // Local market insights
  testimonials: string[]; // Location-specific testimonials
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export interface ServiceData {
  id: string;
  name: string; // "Custom Software Development"
  slug: string; // "custom-software-development"
  category: string; // "Software", "AI", "Automation"
  description: string; // Service description
  features: string[]; // Key features
  techStack: string[]; // Technologies used
  pricing: {
    starting?: number;
    currency: string;
    model: "fixed" | "hourly" | "monthly";
  };
  deliveryTime: string; // "3-4 weeks", "2-3 months"
  caseStudies: string[]; // Case study IDs
}

export interface IndustryData {
  id: string;
  name: string; // "Real Estate", "Healthcare"
  slug: string; // "real-estate", "healthcare"
  description: string; // Industry description
  challenges: string[]; // Common industry challenges
  solutions: string[]; // How we solve them
  compliance: string[]; // Regulatory requirements
  caseStudies: string[]; // Industry-specific case studies
  terminology: Record<string, string>; // Industry-specific terms
}

export interface TemplateVariables {
  [key: string]: string | number | boolean | string[] | Record<string, any>;
}

export interface TemplateValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TemplateGenerationOptions {
  location: string;
  service: string;
  industry?: string;
  variant?: ComponentVariant;
  customizations?: Partial<TemplateContent>;
}

export interface TemplateResolver {
  resolve(slug: string): LandingPageTemplate | null;
  generate(options: TemplateGenerationOptions): LandingPageTemplate;
  validate(template: LandingPageTemplate): TemplateValidationResult;
  interpolate(template: string, variables: TemplateVariables): string;
}

// Content resolver function type
export type ContentResolver<T = any> = (template: LandingPageTemplate) => T;

// Template hook types for React components
export interface UseTemplateResult {
  template: LandingPageTemplate | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface UseTemplateOptions {
  slug: string;
  fallback?: LandingPageTemplate;
}
