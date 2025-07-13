# 🚀 Landing Page Template System Documentation

## Overview

The DeployAI template system allows you to generate hundreds of SEO-optimized landing pages automatically. Pages are created based on combinations of **locations**, **services**, and **industries**, all while maintaining consistent design and messaging.

## Table of Contents

1. [Quick Start](#quick-start)
2. [How It Works](#how-it-works)
3. [Creating Landing Pages](#creating-landing-pages)
4. [Adding New Locations & Services](#adding-new-locations--services)
5. [Customizing Templates](#customizing-templates)
6. [Component Variants](#component-variants)
7. [SEO & Analytics](#seo--analytics)
8. [Troubleshooting](#troubleshooting)

## Quick Start

### Generate a landing page in 30 seconds:

```bash
# Generate a single page
node scripts/generate-templates.js --locations dubai --services custom-software-development

# Generate all Dubai pages
node scripts/generate-templates.js --locations dubai --services all

# Generate everything
node scripts/generate-templates.js --locations all --services all
```

Pages are automatically available at:
- `/templates/custom-software-development-dubai`
- `/templates/ai-solutions-abu-dhabi`
- `/templates/web-development-sharjah`

## How It Works

The template system uses a **data-driven approach**:

```
📁 /src/lib/templates/data/
├── locations.json    → Dubai, Abu Dhabi, Sharjah, UAE
├── services.json     → AI Solutions, Custom Software, Web Dev, etc.
└── industries.json   → Real Estate, Healthcare, Fintech, etc.
```

These combine to create landing pages with:
- ✅ Consistent design matching your brand
- ✅ Location-specific content and testimonials
- ✅ Service-specific features and pricing
- ✅ SEO optimization for local search

## Creating Landing Pages

### Method 1: CLI Tool (Recommended)

```bash
# Basic usage
node scripts/generate-templates.js --locations dubai --services ai-solutions

# Multiple locations
node scripts/generate-templates.js --locations "dubai,abu-dhabi" --services custom-software-development

# Industry-specific pages
node scripts/generate-templates.js --locations dubai --services all --industries real-estate
```

### Method 2: Admin Dashboard

1. Visit `/admin/templates`
2. Select location, service, and optionally industry
3. Preview the page
4. Click "Generate Template"

### Method 3: Programmatic API

```typescript
import { templateResolver } from '@/lib/templates';

// Generate a single template
const template = templateResolver.generateTemplate({
  location: 'dubai',
  service: 'custom-software-development'
});

// Generate multiple templates
const templates = templateResolver.generateMultipleTemplates({
  locations: ['dubai', 'abu-dhabi'],
  services: ['ai-solutions', 'web-development'],
  patterns: ['locationService'] // URL pattern
});
```

### Method 4: Direct Access

Templates are automatically accessible at:
```
/templates/[service]-[location]
/templates/[industry]-[service]-[location]
```

Examples:
- `/templates/custom-software-development-dubai`
- `/templates/real-estate-ai-solutions-dubai`

## Adding New Locations & Services

### Add a New Location

Edit `/src/lib/templates/data/locations.json`:

```json
{
  "dubai": {
    "name": "Dubai",
    "country": "UAE",
    "marketInfo": {
      "population": "3.5 million",
      "businesses": "400,000+",
      "techGrowth": "15% YoY"
    },
    "testimonials": [
      {
        "author": "Sarah Chen",
        "company": "TechStart Dubai",
        "content": "DeployAI transformed our operations...",
        "rating": 5
      }
    ],
    "contact": {
      "phone": "+971 4 123 4567",
      "email": "dubai@deployai.com",
      "address": "Business Bay, Dubai, UAE"
    }
  },
  // Add your new location here
  "riyadh": {
    "name": "Riyadh",
    "country": "Saudi Arabia",
    // ... rest of the configuration
  }
}
```

### Add a New Service

Edit `/src/lib/templates/data/services.json`:

```json
{
  "ai-chatbots": {
    "name": "AI Chatbots",
    "shortName": "Chatbots",
    "variant": "ai", // Maps to component variant
    "description": "24/7 intelligent customer support",
    "features": [
      "Natural language processing",
      "Multi-language support",
      "CRM integration"
    ],
    "pricing": {
      "starting": "$2,000",
      "timeline": "2 weeks"
    },
    "techStack": ["OpenAI", "LangChain", "Next.js"]
  }
}
```

Then map it to a variant in `/src/lib/templates/config.ts`:

```typescript
export const SERVICE_VARIANT_MAP: Record<string, ComponentVariant> = {
  // ... existing mappings
  "ai-chatbots": "ai",
};
```

## Customizing Templates

### 1. Modify Component Variants

Each component accepts a `variant` prop that changes its content:

```typescript
// In /src/lib/templates/config.ts
customSoftware: [
  {
    component: "Hero",
    props: { variant: "customSoftware" },
  },
  {
    component: "ProblemAgitation",
    props: { variant: "customSoftware" },
    wrapper: {
      className: "pt-24", // Add spacing
    },
  },
  // ... more sections
]
```

### 2. Add/Remove Sections

Edit the section configuration:

```typescript
// Remove a section
{
  component: "Testimonials",
  enabled: false, // Disable this section
  order: 7,
}

// Add a new section
{
  component: "VideoDemo",
  enabled: true,
  order: 8,
  props: { 
    videoUrl: "https://youtube.com/...",
    autoplay: true 
  },
}
```

### 3. Change Section Order

Modify the `order` property:

```typescript
// Move PricingSection before CaseStudies
{
  component: "PricingSection",
  order: 6, // Was 8
},
{
  component: "CaseStudies",
  order: 7, // Was 6
},
```

### 4. Custom Styling

Add wrapper classes for spacing and styling:

```typescript
{
  component: "BenefitsGrid",
  wrapper: {
    className: "py-16 bg-gray-50", // Padding + background
    style: { 
      backgroundImage: "url('/pattern.svg')" 
    }
  },
}
```

## Component Variants

Current variants and their use cases:

| Variant | Use Case | Key Differences |
|---------|----------|-----------------|
| `customSoftware` | Custom development projects | Ownership focus, 30-day delivery |
| `ai` | AI automation solutions | ROI calculator, efficiency metrics |
| `webapp` | Web applications | Performance stats, scalability |
| `inventory` | Inventory management | Real-time tracking, cost savings |
| `automation` | Business automation | Time savings, process optimization |

### Creating a New Variant

1. Add variant to types:
```typescript
// In /src/lib/templates/types.ts
export type ComponentVariant = 
  | "customSoftware"
  | "webapp"
  | "yourNewVariant"; // Add here
```

2. Add variant configuration:
```typescript
// In /src/lib/templates/config.ts
export const VARIANT_SECTION_CONFIGS = {
  yourNewVariant: [
    {
      component: "Hero",
      props: { variant: "yourNewVariant" },
    },
    // ... configure sections
  ]
};
```

3. Update components to handle the variant:
```typescript
// In each component that needs variant support
const content = {
  yourNewVariant: {
    title: "Your Custom Title",
    subtitle: "Your custom subtitle",
  }
};
```

## SEO & Analytics

### SEO Configuration

Templates automatically generate SEO metadata:

```typescript
// Generated automatically
{
  title: "Custom Software Development Dubai | DeployAI",
  description: "Leading custom software development in Dubai...",
  keywords: ["custom software", "dubai", "development"],
  canonicalUrl: "https://deployai.com/templates/custom-software-development-dubai"
}
```

### Analytics Integration

Add tracking in template configuration:

```typescript
const template = {
  // ... other config
  analytics: {
    googleAnalytics: "G-XXXXXXXXXX",
    facebookPixel: "XXXXXXXXXXXXXXX",
  }
};
```

### Structured Data

Templates include JSON-LD structured data for better search visibility:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DeployAI Custom Software",
  "offers": {
    "@type": "Offer",
    "price": "5000",
    "priceCurrency": "AED"
  }
}
```

## Troubleshooting

### Common Issues

**1. Template not found (404)**
- Check slug format: `service-location` (lowercase, hyphenated)
- Verify location and service exist in data files
- Run generation script if template doesn't exist

**2. Missing content**
- Ensure variant is properly mapped in `SERVICE_VARIANT_MAP`
- Check component has content for your variant
- Verify props are passed correctly in config

**3. Styling issues**
- Check wrapper className is valid Tailwind
- Ensure global styles are imported
- Verify component variants handle styling

**4. Generation fails**
```bash
# Debug mode
node scripts/generate-templates.js --debug --locations dubai --services ai-solutions

# Check logs
tail -f logs/template-generation.log
```

### Validation

Templates are validated before generation:

```typescript
// Validation rules in config.ts
export const VALIDATION_RULES = {
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  minKeywords: 3,
  maxKeywords: 10,
};
```

## Best Practices

1. **Test locally first**
   ```bash
   npm run dev
   # Visit /templates/your-new-template
   ```

2. **Use consistent naming**
   - Services: `ai-solutions`, `custom-software-development`
   - Locations: `dubai`, `abu-dhabi` (lowercase)

3. **Optimize images**
   - Use WebP format
   - Lazy load below the fold
   - Include alt text for SEO

4. **Monitor performance**
   - Check Core Web Vitals
   - Test mobile responsiveness
   - Verify fast load times

## Examples

### Example 1: Launch Dubai AI Pages

```bash
# Generate all AI service pages for Dubai
node scripts/generate-templates.js \
  --locations dubai \
  --services "ai-solutions,ai-automation,ai-chatbots"

# URLs created:
# /templates/ai-solutions-dubai
# /templates/ai-automation-dubai  
# /templates/ai-chatbots-dubai
```

### Example 2: Real Estate Industry Pages

```bash
# Generate real estate specific pages
node scripts/generate-templates.js \
  --locations "dubai,abu-dhabi" \
  --services all \
  --industries real-estate

# Creates industry-specific content and testimonials
```

### Example 3: Custom Configuration

```typescript
// Programmatic generation with custom config
const template = templateResolver.generateTemplate({
  location: 'dubai',
  service: 'custom-software-development',
  customContent: {
    heroTitle: "Special Offer: 20% Off This Month",
    urgency: "Limited Time",
  },
  analytics: {
    googleAnalytics: "G-SPECIAL-CAMPAIGN"
  }
});
```

## Need Help?

- 📧 Email: dev@deployai.com
- 📚 More docs: `/docs/templates/`
- 💬 Slack: #template-system
- 🐛 Issues: github.com/deployai/deployai/issues

---

Last updated: January 2024 | Version 2.0