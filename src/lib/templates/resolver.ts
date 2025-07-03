/**
 * Template Resolver
 * Core logic for resolving and generating landing page templates
 */

import {
  LandingPageTemplate,
  TemplateContent,
  ComponentVariant,
  LocationData,
  ServiceData,
  IndustryData,
} from "./types";

import {
  DEFAULT_SECTIONS,
  VARIANT_SECTION_CONFIGS,
  TEMPLATE_PATTERNS,
  DEFAULT_CONTENT_TEMPLATES,
  SERVICE_VARIANT_MAPPINGS,
  LOCATION_CUSTOMIZATIONS,
  VALIDATION_RULES,
  mergeSections,
} from "./config";

// Import data
import locationsData from "./data/locations.json";
import servicesData from "./data/services.json";
import industriesData from "./data/industries.json";

export class TemplateResolver {
  private locations: Record<string, LocationData>;
  private services: Record<string, ServiceData>;
  private industries: Record<string, IndustryData>;

  constructor() {
    this.locations = locationsData;
    this.services = servicesData;
    this.industries = industriesData;
  }

  /**
   * Resolve a template by slug
   */
  resolveBySlug(slug: string): LandingPageTemplate | null {
    const template = this.parseSlugToTemplate(slug);
    if (!template) return null;

    return this.generateTemplate(template);
  }

  /**
   * Generate template configurations for multiple combinations
   */
  generateMultipleTemplates(options: {
    locations?: string[];
    services?: string[];
    industries?: string[];
    patterns?: ("locationService" | "industryLocation" | "serviceIndustry")[];
  }): LandingPageTemplate[] {
    const templates: LandingPageTemplate[] = [];
    const {
      locations = Object.keys(this.locations),
      services = Object.keys(this.services),
      industries = Object.keys(this.industries),
      patterns = ["locationService", "industryLocation", "serviceIndustry"],
    } = options;

    patterns.forEach((pattern) => {
      switch (pattern) {
        case "locationService":
          locations.forEach((locationId) => {
            services.forEach((serviceId) => {
              const template = this.generateLocationServiceTemplate(
                locationId,
                serviceId
              );
              if (template && this.validateTemplate(template)) {
                templates.push(template);
              }
            });
          });
          break;

        case "industryLocation":
          industries.forEach((industryId) => {
            locations.forEach((locationId) => {
              services.forEach((serviceId) => {
                const template = this.generateIndustryLocationTemplate(
                  industryId,
                  locationId,
                  serviceId
                );
                if (template && this.validateTemplate(template)) {
                  templates.push(template);
                }
              });
            });
          });
          break;

        case "serviceIndustry":
          services.forEach((serviceId) => {
            industries.forEach((industryId) => {
              const template = this.generateServiceIndustryTemplate(
                serviceId,
                industryId
              );
              if (template && this.validateTemplate(template)) {
                templates.push(template);
              }
            });
          });
          break;
      }
    });

    return templates;
  }

  /**
   * Parse slug to determine template type and components
   */
  private parseSlugToTemplate(slug: string): {
    type: "locationService" | "industryLocation" | "serviceIndustry";
    components: {
      location?: string;
      service?: string;
      industry?: string;
    };
  } | null {
    const parts = slug.split("-");

    // Try to match location + service pattern (e.g., "custom-software-development-dubai")
    for (const locationId of Object.keys(this.locations)) {
      if (slug.endsWith(`-${locationId}`)) {
        const serviceSlug = slug.replace(`-${locationId}`, "");
        if (this.services[serviceSlug]) {
          return {
            type: "locationService",
            components: { location: locationId, service: serviceSlug },
          };
        }
      }
    }

    // Try to match industry + location + service pattern
    for (const industryId of Object.keys(this.industries)) {
      for (const locationId of Object.keys(this.locations)) {
        if (slug.includes(industryId) && slug.includes(locationId)) {
          const remainingParts = parts.filter(
            (part) =>
              part !== industryId &&
              part !== locationId &&
              !this.locations[locationId].slug.includes(part)
          );
          const serviceSlug = remainingParts.join("-");
          if (this.services[serviceSlug]) {
            return {
              type: "industryLocation",
              components: {
                industry: industryId,
                location: locationId,
                service: serviceSlug,
              },
            };
          }
        }
      }
    }

    // Try to match service + industry pattern
    for (const serviceId of Object.keys(this.services)) {
      for (const industryId of Object.keys(this.industries)) {
        if (
          slug === `${serviceId}-${industryId}` ||
          slug === `${industryId}-${serviceId}`
        ) {
          return {
            type: "serviceIndustry",
            components: { service: serviceId, industry: industryId },
          };
        }
      }
    }

    return null;
  }

  /**
   * Generate Location + Service template
   */
  private generateLocationServiceTemplate(
    locationId: string,
    serviceId: string
  ): LandingPageTemplate | null {
    const location = this.locations[locationId];
    const service = this.services[serviceId];

    if (!location || !service) return null;

    const variant = SERVICE_VARIANT_MAPPINGS[serviceId] || "customSoftware";
    const pattern = TEMPLATE_PATTERNS.locationService;

    return this.generateTemplate({
      type: "locationService",
      location,
      service,
      variant,
      pattern,
    });
  }

  /**
   * Generate Industry + Location + Service template
   */
  private generateIndustryLocationTemplate(
    industryId: string,
    locationId: string,
    serviceId: string
  ): LandingPageTemplate | null {
    const industry = this.industries[industryId];
    const location = this.locations[locationId];
    const service = this.services[serviceId];

    if (!industry || !location || !service) return null;

    const variant = SERVICE_VARIANT_MAPPINGS[serviceId] || "customSoftware";
    const pattern = TEMPLATE_PATTERNS.industryLocation;

    return this.generateTemplate({
      type: "industryLocation",
      location,
      service,
      industry,
      variant,
      pattern,
    });
  }

  /**
   * Generate Service + Industry template
   */
  private generateServiceIndustryTemplate(
    serviceId: string,
    industryId: string
  ): LandingPageTemplate | null {
    const service = this.services[serviceId];
    const industry = this.industries[industryId];

    if (!service || !industry) return null;

    const variant = SERVICE_VARIANT_MAPPINGS[serviceId] || "customSoftware";
    const pattern = TEMPLATE_PATTERNS.serviceIndustry;

    return this.generateTemplate({
      type: "serviceIndustry",
      service,
      industry,
      variant,
      pattern,
    });
  }

  /**
   * Core template generation logic
   */
  private generateTemplate(params: {
    type: "locationService" | "industryLocation" | "serviceIndustry";
    location?: LocationData;
    service: ServiceData;
    industry?: IndustryData;
    variant: ComponentVariant;
    pattern: any;
  }): LandingPageTemplate {
    const { type, location, service, industry, variant, pattern } = params;

    // Generate content
    const content: TemplateContent = {
      location: location?.name || "UAE",
      service: service.name,
      industry: industry?.name,
      targetAudience: this.generateTargetAudience(industry, location),
      valueProposition: this.generateValueProposition(
        service,
        industry,
        location
      ),
      painPoints: this.generatePainPoints(service, industry),
      benefits: this.generateBenefits(service, industry),
      urgencyFactor: this.generateUrgencyFactor(location),
      ctaText: DEFAULT_CONTENT_TEMPLATES.ctaTexts.primary,
    };

    // Generate meta data
    const meta = {
      title: this.interpolateString(
        pattern.title,
        content,
        service,
        industry,
        location
      ),
      description: this.interpolateString(
        pattern.description,
        content,
        service,
        industry,
        location
      ),
      keywords: pattern.keywords.map((keyword: string) =>
        this.interpolateString(keyword, content, service, industry, location)
      ),
      canonicalUrl: undefined,
    };

    // Generate slug
    const slug = this.interpolateString(
      pattern.slug,
      content,
      service,
      industry,
      location
    );

    // Generate sections
    const variantOverrides = VARIANT_SECTION_CONFIGS[variant] || [];
    const sections = mergeSections(DEFAULT_SECTIONS, variantOverrides);

    return {
      id: this.generateId(slug),
      slug,
      variant,
      meta,
      content,
      sections,
      analytics: {
        googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
        facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
      },
    };
  }

  /**
   * String interpolation for templates
   */
  private interpolateString(
    template: string,
    content: TemplateContent,
    service: ServiceData,
    industry?: IndustryData,
    location?: LocationData
  ): string {
    return template
      .replace(/\{service\}/g, service.name)
      .replace(/\{location\}/g, location?.name || content.location)
      .replace(/\{industry\}/g, industry?.name || "")
      .replace(/\{value-proposition\}/g, content.valueProposition)
      .replace(/\{benefits\}/g, content.benefits.join(", "))
      .replace(/\{target-audience\}/g, content.targetAudience)
      .trim();
  }

  /**
   * Generate target audience description
   */
  private generateTargetAudience(
    industry?: IndustryData,
    location?: LocationData
  ): string {
    const base = "Businesses";
    const locationText = location ? ` in ${location.name}` : "";
    const industryText = industry ? ` in the ${industry.name} sector` : "";

    return `${base}${industryText}${locationText}`;
  }

  /**
   * Generate value proposition
   */
  private generateValueProposition(
    service: ServiceData,
    industry?: IndustryData,
    location?: LocationData
  ): string {
    const baseValue =
      DEFAULT_CONTENT_TEMPLATES.valuePropositions[
        service.id as keyof typeof DEFAULT_CONTENT_TEMPLATES.valuePropositions
      ] || service.description;

    if (industry) {
      return `${baseValue} tailored for ${industry.name.toLowerCase()} businesses`;
    }

    if (location) {
      return `${baseValue} for ${location.name} businesses`;
    }

    return baseValue;
  }

  /**
   * Generate pain points
   */
  private generatePainPoints(
    service: ServiceData,
    industry?: IndustryData
  ): string[] {
    const servicePainPoints = [
      "High monthly software costs",
      "Software that doesn't fit your business",
      "Poor integration with existing systems",
      "Limited customization options",
    ];

    if (industry?.challenges) {
      return [
        ...industry.challenges.slice(0, 3),
        ...servicePainPoints.slice(0, 2),
      ];
    }

    return servicePainPoints;
  }

  /**
   * Generate benefits
   */
  private generateBenefits(
    service: ServiceData,
    industry?: IndustryData
  ): string[] {
    const serviceBenefits = service.features.slice(0, 4);

    if (industry?.solutions) {
      return [
        ...industry.solutions.slice(0, 3),
        ...serviceBenefits.slice(0, 2),
      ];
    }

    return serviceBenefits;
  }

  /**
   * Generate urgency factor
   */
  private generateUrgencyFactor(location?: LocationData): string {
    if (location) {
      const customization =
        LOCATION_CUSTOMIZATIONS[
          location.id as keyof typeof LOCATION_CUSTOMIZATIONS
        ];
      return (
        customization?.urgencyFactor || `Growing demand in ${location.name}`
      );
    }

    return "Growing market opportunity";
  }

  /**
   * Generate unique ID for template
   */
  private generateId(slug: string): string {
    return `template-${slug}`;
  }

  /**
   * Validate template against rules
   */
  private validateTemplate(template: LandingPageTemplate): boolean {
    // Check required fields
    for (const field of VALIDATION_RULES.required) {
      if (!this.getNestedValue(template, field)) {
        return false;
      }
    }

    // Check max lengths
    for (const [field, maxLength] of Object.entries(
      VALIDATION_RULES.maxLengths
    )) {
      const value = this.getNestedValue(template, field);
      if (typeof value === "string" && value.length > maxLength) {
        return false;
      }
    }

    // Check patterns
    if (!VALIDATION_RULES.patterns.slug.test(template.slug)) {
      return false;
    }

    return true;
  }

  /**
   * Get nested object value by dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }

  /**
   * Get available locations
   */
  getLocations(): LocationData[] {
    return Object.values(this.locations);
  }

  /**
   * Get available services
   */
  getServices(): ServiceData[] {
    return Object.values(this.services);
  }

  /**
   * Get available industries
   */
  getIndustries(): IndustryData[] {
    return Object.values(this.industries);
  }

  /**
   * Get template suggestions based on partial input
   */
  getSuggestions(partial: {
    location?: string;
    service?: string;
    industry?: string;
  }): LandingPageTemplate[] {
    const suggestions: LandingPageTemplate[] = [];

    if (partial.location && partial.service) {
      const template = this.generateLocationServiceTemplate(
        partial.location,
        partial.service
      );
      if (template) suggestions.push(template);
    }

    if (partial.industry && partial.service) {
      const template = this.generateServiceIndustryTemplate(
        partial.service,
        partial.industry
      );
      if (template) suggestions.push(template);
    }

    if (partial.industry && partial.location && partial.service) {
      const template = this.generateIndustryLocationTemplate(
        partial.industry,
        partial.location,
        partial.service
      );
      if (template) suggestions.push(template);
    }

    return suggestions.filter((t) => this.validateTemplate(t));
  }
}

// Create singleton instance
export const templateResolver = new TemplateResolver();
