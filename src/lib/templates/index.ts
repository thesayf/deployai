/**
 * Template System - Main Export
 * Central export point for the landing page template system
 */

// Types
export type {
  LandingPageTemplate,
  TemplateContent,
  SectionConfig,
  ComponentVariant,
  LocationData,
  ServiceData,
  IndustryData,
  MetaData,
  AnalyticsConfig,
} from "./types";

// Configuration
export {
  DEFAULT_SECTIONS,
  VARIANT_SECTION_CONFIGS,
  TEMPLATE_PATTERNS,
  DEFAULT_CONTENT_TEMPLATES,
  SERVICE_VARIANT_MAPPINGS,
  LOCATION_CUSTOMIZATIONS,
  VALIDATION_RULES,
  mergeSections,
} from "./config";

// Template Resolver
export { TemplateResolver, templateResolver } from "./resolver";

// Template Generator
export { TemplateGenerator, templateGenerator } from "./generator";

// Data
export { default as locationsData } from "./data/locations.json";
export { default as servicesData } from "./data/services.json";
export { default as industriesData } from "./data/industries.json";

// Utility functions
export function generateSlugs(options: {
  locations?: string[];
  services?: string[];
  industries?: string[];
  patterns?: ("locationService" | "industryLocation" | "serviceIndustry")[];
}): string[] {
  const templates = templateResolver.generateMultipleTemplates(options);
  return templates.map((template) => template.slug);
}

export function getTemplateBySlug(slug: string): LandingPageTemplate | null {
  return templateResolver.resolveBySlug(slug);
}

export function getAllTemplates(): LandingPageTemplate[] {
  return templateResolver.generateMultipleTemplates({});
}

export function getTemplateSuggestions(partial: {
  location?: string;
  service?: string;
  industry?: string;
}): LandingPageTemplate[] {
  return templateResolver.getSuggestions(partial);
}

// Helper functions for Next.js
export function generateStaticPaths(): {
  paths: { params: { slug: string } }[];
  fallback: boolean;
} {
  const templates = getAllTemplates();
  const paths = templates.map((template) => ({
    params: { slug: template.slug },
  }));

  return {
    paths,
    fallback: "blocking", // Enable ISR for new templates
  };
}

export function generateStaticProps(slug: string): {
  props: { template: LandingPageTemplate };
  revalidate?: number;
} | null {
  const template = getTemplateBySlug(slug);

  if (!template) return null;

  return {
    props: { template },
    revalidate: 86400, // Revalidate once per day
  };
}
