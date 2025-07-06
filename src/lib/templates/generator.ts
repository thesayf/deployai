/**
 * Template Generator
 * Utility for bulk template creation and file generation
 */

import { templateResolver } from "./resolver";
import { LandingPageTemplate } from "./types";

interface GeneratorOptions {
  locations?: string[];
  services?: string[];
  industries?: string[];
  patterns?: ("locationService" | "industryLocation" | "serviceIndustry")[];
  outputDir?: string;
  generateFiles?: boolean;
  fileFormat?: "tsx" | "json" | "md";
}

interface GenerationResult {
  templates: LandingPageTemplate[];
  files?: { path: string; content: string }[];
  summary: {
    total: number;
    byPattern: Record<string, number>;
    byVariant: Record<string, number>;
    byLocation: Record<string, number>;
  };
}

export class TemplateGenerator {
  /**
   * Generate templates based on options
   */
  async generate(options: GeneratorOptions = {}): Promise<GenerationResult> {
    const {
      locations = ["dubai", "abu-dhabi", "sharjah", "uae"],
      services = [
        "custom-software-development",
        "web-development",
        "mobile-development",
      ],
      industries = ["real-estate", "healthcare", "fintech"],
      patterns = ["locationService", "industryLocation", "serviceIndustry"],
      generateFiles = false,
      fileFormat = "tsx",
    } = options;

    // Generate templates
    const templates = templateResolver.generateMultipleTemplates({
      locations,
      services,
      industries,
      patterns,
    });

    // Generate files if requested and in server environment
    let files: { path: string; content: string }[] = [];
    if (generateFiles && typeof window === "undefined") {
      // Only generate files on server-side
      files = await this.generateFileContents(templates, fileFormat);
    }

    // Generate summary
    const summary = this.generateSummary(templates);

    return {
      templates,
      files: generateFiles ? files : undefined,
      summary,
    };
  }

  /**
   * Generate file contents (without writing to disk)
   */
  private async generateFileContents(
    templates: LandingPageTemplate[],
    format: "tsx" | "json" | "md"
  ): Promise<{ path: string; content: string }[]> {
    const files: { path: string; content: string }[] = [];

    for (const template of templates) {
      let content: string;
      let fileName: string;

      switch (format) {
        case "tsx":
          content = this.generateTsxFile(template);
          fileName = `${template.slug}.tsx`;
          break;

        case "json":
          content = JSON.stringify(template, null, 2);
          fileName = `${template.slug}.json`;
          break;

        case "md":
          content = this.generateMarkdownFile(template);
          fileName = `${template.slug}.md`;
          break;
      }

      files.push({ path: fileName, content });
    }

    return files;
  }

  /**
   * Generate TSX file content
   */
  private generateTsxFile(template: LandingPageTemplate): string {
    return `/**
 * Auto-generated landing page: ${template.meta.title}
 * Generated on: ${new Date().toISOString()}
 */

import React from 'react';
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import { LandingPageTemplate } from '@/lib/templates/types';

const template: LandingPageTemplate = ${JSON.stringify(template, null, 2)};

export default function ${this.toPascalCase(template.slug)}Page() {
  return <DynamicTemplate template={template} />;
}

// Export template for other uses
export { template };

// Export getStaticProps for Next.js
export async function getStaticProps() {
  return {
    props: {
      template
    },
    revalidate: 86400 // Revalidate once per day
  };
}`;
  }

  /**
   * Generate Markdown file content
   */
  private generateMarkdownFile(template: LandingPageTemplate): string {
    return `# ${template.meta.title}

**Slug:** \`${template.slug}\`  
**Variant:** ${template.variant}  
**Generated:** ${new Date().toISOString()}

## Meta Information

- **Title:** ${template.meta.title}
- **Description:** ${template.meta.description}
- **Keywords:** ${template.meta.keywords.join(", ")}

## Content

- **Location:** ${template.content.location}
- **Service:** ${template.content.service}
- **Industry:** ${template.content.industry || "N/A"}
- **Target Audience:** ${template.content.targetAudience}
- **Value Proposition:** ${template.content.valueProposition}

### Pain Points
${template.content.painPoints.map((point) => `- ${point}`).join("\n")}

### Benefits
${template.content.benefits.map((benefit) => `- ${benefit}`).join("\n")}

### Urgency Factor
${template.content.urgency || "Limited time offer"}

### Call-to-Action
${template.content.ctaText}

## Sections

| Component | Enabled | Order | Props |
|-----------|---------|--------|-------|
${template.sections
  .map(
    (section) =>
      `| ${section.component} | ${section.enabled} | ${section.order} | ${JSON.stringify(section.props)} |`
  )
  .join("\n")}

## Analytics

${template.analytics ? JSON.stringify(template.analytics, null, 2) : "No analytics configured"}
`;
  }

  /**
   * Generate summary statistics
   */
  private generateSummary(
    templates: LandingPageTemplate[]
  ): GenerationResult["summary"] {
    const summary = {
      total: templates.length,
      byPattern: {} as Record<string, number>,
      byVariant: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
    };

    templates.forEach((template) => {
      // Count by pattern
      const pattern = this.inferPattern(template.slug);
      summary.byPattern[pattern] = (summary.byPattern[pattern] || 0) + 1;

      // Count by variant
      summary.byVariant[template.variant] =
        (summary.byVariant[template.variant] || 0) + 1;

      // Count by location
      summary.byLocation[template.content.location] =
        (summary.byLocation[template.content.location] || 0) + 1;
    });

    return summary;
  }

  /**
   * Infer pattern from slug
   */
  private inferPattern(slug: string): string {
    if (slug.includes("-")) {
      const parts = slug.split("-");
      if (parts.length >= 2) {
        return "locationService";
      }
    }
    return "unknown";
  }

  /**
   * Convert string to PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  /**
   * Generate sitemap XML
   */
  generateSitemap(templates: LandingPageTemplate[], baseUrl: string): string {
    const urls = templates.map((template) => {
      return `  <url>
    <loc>${baseUrl}/templates/${template.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  }

  /**
   * Generate robots.txt
   */
  generateRobotsTxt(baseUrl: string): string {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Specific template pages
Allow: /templates/
Allow: /admin/

# Optimize crawling
Crawl-delay: 1
`;
  }

  /**
   * Generate Next.js rewrites configuration
   */
  generateNextjsRewrites(templates: LandingPageTemplate[]): any[] {
    return templates.map((template) => ({
      source: `/${template.slug}`,
      destination: `/templates/${template.slug}`,
    }));
  }

  /**
   * Generate analytics events configuration
   */
  generateAnalyticsEvents(templates: LandingPageTemplate[]): any[] {
    return templates.map((template) => ({
      event: "page_view",
      template_id: template.id,
      template_slug: template.slug,
      template_variant: template.variant,
      location: template.content.location,
      service: template.content.service,
      industry: template.content.industry,
    }));
  }
}

// Export singleton instance
export const templateGenerator = new TemplateGenerator();

// Utility functions for CLI and server-side use
export async function generateAllTemplates(): Promise<LandingPageTemplate[]> {
  const generator = new TemplateGenerator();
  const result = await generator.generate();
  return result.templates;
}

export async function generateSitemap(
  baseUrl: string,
  templates?: LandingPageTemplate[]
): Promise<string> {
  const generator = new TemplateGenerator();
  const templatesToUse = templates || await generateAllTemplates();
  return generator.generateSitemap(templatesToUse, baseUrl);
}

export function generateRobotsTxt(baseUrl: string): string {
  const generator = new TemplateGenerator();
  return generator.generateRobotsTxt(baseUrl);
}

export default templateGenerator;
