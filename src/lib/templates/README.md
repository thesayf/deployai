# 🎨 Landing Page Template System

A comprehensive template system for generating dynamic landing pages with location, service, and industry-specific content.

## 🚀 Features

- **Dynamic Template Generation**: Create hundreds of landing pages from a single template
- **Location-Based Targeting**: Support for multiple UAE locations (Dubai, Abu Dhabi, Sharjah, etc.)
- **Service Variations**: Custom software, web development, mobile apps, AI solutions
- **Industry Specialization**: Real estate, healthcare, fintech, and more
- **SEO Optimization**: Automatic meta tags, keywords, and structured data
- **Component System**: Modular sections with variant support
- **Next.js Integration**: Static generation with ISR support
- **Admin Dashboard**: Template management and preview interface
- **CLI Tools**: Batch generation and automation

## 📋 Quick Start

### 1. Basic Usage

```typescript
import { templateResolver } from '@/lib/templates';

// Generate a single template
const template = templateResolver.generateLocationServiceTemplate('dubai', 'custom-software-development');

// Generate multiple templates
const templates = templateResolver.generateMultipleTemplates({
  locations: ['dubai', 'abu-dhabi'],
  services: ['custom-software-development', 'web-development'],
  patterns: ['locationService']
});
```

### 2. Next.js Integration

```typescript
// pages/[slug].tsx
import { DynamicTemplate } from '@/components/templates/DynamicTemplate';
import { getTemplateBySlug } from '@/lib/templates';

export async function getStaticProps({ params }) {
  const template = getTemplateBySlug(params.slug);
  return {
    props: { template },
    revalidate: 86400
  };
}

export default function TemplatePage({ template }) {
  return <DynamicTemplate template={template} />;
}
```

### 3. CLI Generation

```bash
# Generate all templates
node scripts/generate-templates.js

# Generate specific templates
node scripts/generate-templates.js --locations dubai --services custom-software-development

# Generate with sitemap
node scripts/generate-templates.js --sitemap --robots
```

## 🏗️ Architecture

### Core Components

1. **Types** (`types.ts`): TypeScript interfaces and type definitions
2. **Resolver** (`resolver.ts`): Template generation and resolution logic
3. **Generator** (`generator.ts`): Bulk template creation utilities
4. **Config** (`config.ts`): Default configurations and patterns
5. **Data** (`data/`): Location, service, and industry data files

### Template Patterns

- **locationService**: `custom-software-development-dubai`
- **industryLocation**: `real-estate-custom-software-dubai`
- **serviceIndustry**: `custom-software-development-healthcare`

## 📊 Data Structure

### Location Data

```json
{
  "dubai": {
    "id": "dubai",
    "name": "Dubai",
    "slug": "dubai",
    "country": "UAE",
    "businessContext": "Dubai's thriving business ecosystem...",
    "marketInsights": [...],
    "demographics": {...}
  }
}
```

### Service Data

```json
{
  "custom-software-development": {
    "id": "custom-software-development",
    "name": "Custom Software Development",
    "category": "Software",
    "features": [...],
    "benefits": [...],
    "pricing": {...}
  }
}
```

### Industry Data

```json
{
  "real-estate": {
    "id": "real-estate",
    "name": "Real Estate",
    "challenges": [...],
    "solutions": [...],
    "caseStudies": [...]
  }
}
```

## 🎯 Template Configuration

### Section Configuration

```typescript
const sectionConfig: SectionConfig = {
  component: 'Hero',
  enabled: true,
  order: 1,
  props: {
    variant: 'customSoftware',
    showAnnouncement: true
  }
};
```

### Content Templates

```typescript
const contentTemplate: TemplateContent = {
  location: 'Dubai',
  service: 'Custom Software Development',
  industry: 'Real Estate',
  targetAudience: 'Real estate businesses',
  valueProposition: 'Build powerful software...',
  painPoints: [...],
  benefits: [...],
  urgencyFactor: 'Limited time offer',
  ctaText: 'Get Your Custom Solution'
};
```

## 🔧 Customization

### Adding New Locations

1. Add location data to `data/locations.json`
2. Update location-specific customizations in `config.ts`
3. Add market research and local insights

### Adding New Services

1. Add service data to `data/services.json`
2. Create service-specific variants in components
3. Update pricing and feature configurations

### Adding New Industries

1. Add industry data to `data/industries.json`
2. Define industry-specific challenges and solutions
3. Add relevant case studies and testimonials

## 📈 SEO Features

- **Dynamic Meta Tags**: Auto-generated titles and descriptions
- **Keyword Optimization**: Location and service-specific keywords
- **Schema Markup**: Structured data for rich snippets
- **Sitemap Generation**: Automatic sitemap.xml creation
- **Robots.txt**: SEO-friendly crawling rules

## 🎨 Component Variants

All components support multiple variants:

- `Hero`: default, customSoftware, webapp, ai, automation
- `ProblemAgitation`: Industry-specific pain points
- `ServiceFeatures`: Service-specific feature tabs
- `FAQ`: Variant-specific questions and answers
- `Pricing`: Service and location-based pricing

## 🛠️ Development Tools

### Template Dashboard

Visit `/admin/templates` to:

- View all generated templates
- Filter by location, service, or industry
- Preview templates in new tabs
- Download template configurations
- Generate new template files

### CLI Commands

```bash
# Generate all templates
npm run generate:templates

# Generate specific templates
npm run generate:templates -- --locations dubai --services custom-software

# Generate with SEO files
npm run generate:templates -- --sitemap --robots
```

### Testing

```bash
# Run template tests
npm run test:templates

# Validate template structure
npm run validate:templates
```

## 🚀 Deployment

### Static Generation (Recommended)

```bash
# Build all templates as static pages
npm run build

# Deploy to Vercel/Netlify
npm run deploy
```

### Dynamic Generation

```bash
# Enable ISR for dynamic template generation
# Set revalidate: 3600 in getStaticProps
```

## 📝 Best Practices

1. **Content Quality**: Always provide high-quality, relevant content
2. **SEO Optimization**: Use location and service-specific keywords
3. **Performance**: Optimize images and minimize bundle size
4. **Testing**: Validate all templates before deployment
5. **Analytics**: Track template performance and conversion rates

## 🔒 Security

- Input validation for all template parameters
- Sanitization of user-generated content
- Rate limiting for template generation
- Access control for admin dashboard

## 📚 API Reference

### TemplateResolver

- `generateTemplate(location, service, industry?)`: Generate single template
- `generateMultipleTemplates(options)`: Generate multiple templates
- `resolveBySlug(slug)`: Get template by slug
- `getSuggestions(partial)`: Get template suggestions

### TemplateGenerator

- `generate(options)`: Generate templates with files
- `generateFiles(templates, format)`: Create template files
- `generateSitemap(templates, baseUrl)`: Create sitemap
- `generateAnalyticsEvents(templates)`: Create analytics events

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This template system is proprietary to DeployAI and is not open source.

---

**Built with ❤️ by the DeployAI team**
