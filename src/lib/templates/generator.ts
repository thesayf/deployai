/**
 * Template Generator
 * Utility for bulk template creation and file generation
 */

import { templateResolver } from "./resolver";
import { LandingPageTemplate } from "./types";
import fs from "fs";
import path from "path";

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
      outputDir = "./generated-templates",
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

    // Generate files if requested
    let files: { path: string; content: string }[] = [];
    if (generateFiles) {
      files = await this.generateFiles(templates, outputDir, fileFormat);
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
   * Generate individual template files
   */
  private async generateFiles(
    templates: LandingPageTemplate[],
    outputDir: string,
    format: "tsx" | "json" | "md"
  ): Promise<{ path: string; content: string }[]> {
    const files: { path: string; content: string }[] = [];

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

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

      const filePath = path.join(outputDir, fileName);

      // Write file
      fs.writeFileSync(filePath, content, "utf8");

      files.push({ path: filePath, content });
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
${template.content.urgencyFactor}

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

- **Google Analytics:** ${template.analytics?.googleAnalytics || "Not configured"}
- **Facebook Pixel:** ${template.analytics?.facebookPixel || "Not configured"}

---

*This template was auto-generated using the DeployAI template system.*`;
  }

  /**
   * Generate summary statistics
   */
  private generateSummary(
    templates: LandingPageTemplate[]
  ): GenerationResult["summary"] {
    const byPattern: Record<string, number> = {};
    const byVariant: Record<string, number> = {};
    const byLocation: Record<string, number> = {};

    templates.forEach((template) => {
      // Count by pattern (inferred from slug structure)
      const pattern = this.inferPattern(template.slug);
      byPattern[pattern] = (byPattern[pattern] || 0) + 1;

      // Count by variant
      byVariant[template.variant] = (byVariant[template.variant] || 0) + 1;

      // Count by location
      const location = template.content.location;
      byLocation[location] = (byLocation[location] || 0) + 1;
    });

    return {
      total: templates.length,
      byPattern,
      byVariant,
      byLocation,
    };
  }

  /**
   * Infer pattern from slug structure
   */
  private inferPattern(slug: string): string {
    const parts = slug.split("-");

    if (parts.length >= 4) return "industryLocation";
    if (parts.length >= 3) return "locationService";
    return "serviceIndustry";
  }

  /**
   * Convert kebab-case to PascalCase
   */
  private toPascalCase(str: string): string {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  /**
   * Generate sitemap.xml content
   */
  generateSitemap(templates: LandingPageTemplate[], baseUrl: string): string {
    const urls = templates
      .map(
        (template) => `
  <url>
    <loc>${baseUrl}/${template.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Auto-generated sitemap for landing page templates -->
  <!-- Generated on: ${new Date().toISOString()} -->
  ${urls}
</urlset>`;
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(baseUrl: string): string {
    return `User-agent: *
Allow: /

# Landing page templates
Allow: /custom-software-development-*
Allow: /web-development-*
Allow: /mobile-development-*
Allow: /real-estate-*
Allow: /healthcare-*
Allow: /fintech-*

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
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
   * Generate bulk analytics events
   */
  generateAnalyticsEvents(templates: LandingPageTemplate[]): any[] {
    return templates.map((template) => ({
      name: "template_page_view",
      parameters: {
        template_id: template.id,
        template_variant: template.variant,
        template_location: template.content.location,
        template_service: template.content.service,
        template_industry: template.content.industry || null,
      },
    }));
  }
}

// Export singleton instance
export const templateGenerator = new TemplateGenerator();

// CLI utility functions
export function generateAllTemplates(
  outputDir: string = "./generated-templates"
): void {
  console.log("🚀 Starting template generation...");

  templateGenerator
    .generate({
      outputDir,
      generateFiles: true,
      fileFormat: "tsx",
    })
    .then((result) => {
      console.log(`✅ Generated ${result.summary.total} templates`);
      console.log("📊 Summary:", result.summary);
      console.log(`📁 Files written to: ${outputDir}`);
    })
    .catch((error) => {
      console.error("❌ Error generating templates:", error);
    });
}

export function generateSitemap(
  baseUrl: string,
  outputPath: string = "./public/sitemap.xml"
): void {
  console.log("🗺️  Generating sitemap...");

  templateGenerator
    .generate()
    .then((result) => {
      const sitemap = templateGenerator.generateSitemap(
        result.templates,
        baseUrl
      );
      fs.writeFileSync(outputPath, sitemap, "utf8");
      console.log(`✅ Sitemap generated: ${outputPath}`);
    })
    .catch((error) => {
      console.error("❌ Error generating sitemap:", error);
    });
}
