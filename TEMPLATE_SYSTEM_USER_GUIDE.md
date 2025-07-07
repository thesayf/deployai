# Template System User Guide

## Overview

The DeployAI Template System automatically generates targeted landing pages for different locations, services, and industries. It creates SEO-optimized pages that maintain your brand consistency while targeting specific keywords and audiences.

## Quick Start

### 1. View Available Templates

Visit the admin dashboard to see all available templates:

```
http://localhost:3000/admin/templates
```

### 2. Generate Templates (CLI)

```bash
node scripts/generate-templates.js
```

### 3. Test a Template

Visit any generated template URL:

```
http://localhost:3000/templates/custom-software-development-dubai
http://localhost:3000/templates/healthcare-solutions-abu-dhabi
```

## Admin Dashboard

### Accessing the Dashboard

Navigate to `/admin/templates` to access the template management interface.

### Features

- **Search**: Find templates by name or keywords
- **Filter**: Filter by template type (locationService, industryLocation, serviceIndustry)
- **Preview**: Click any template to view it live
- **Statistics**: See total template counts and breakdowns

### Using Filters

- **All Templates**: Shows all available templates
- **Location + Service**: Templates like "Custom Software Development Dubai"
- **Industry + Location**: Templates like "Healthcare Solutions Dubai"
- **Service + Industry**: Templates like "Custom Software for Healthcare"

## Adding New Data

### Adding Locations

Edit `src/lib/templates/data/locations.json`:

```json
{
  "newLocation": {
    "name": "Ajman",
    "description": "leading technology hub in the Northern Emirates",
    "keywords": ["ajman", "northern emirates", "uae"],
    "population": "400,000+",
    "economy": "growing commercial center"
  }
}
```

### Adding Services

Edit `src/lib/templates/data/services.json`:

```json
{
  "blockchain": {
    "name": "Blockchain Development",
    "description": "Build secure, decentralized applications",
    "keywords": ["blockchain", "crypto", "defi", "smart contracts"],
    "benefits": [
      "Decentralized architecture",
      "Smart contract development",
      "Cryptocurrency integration"
    ],
    "features": [
      "Ethereum development",
      "Solidity programming",
      "DeFi protocols"
    ]
  }
}
```

### Adding Industries

Edit `src/lib/templates/data/industries.json`:

```json
{
  "education": {
    "name": "Education",
    "description": "Digital transformation for educational institutions",
    "keywords": ["education", "elearning", "schools", "universities"],
    "challenges": [
      "Remote learning management",
      "Student engagement tracking",
      "Digital assessment tools"
    ],
    "solutions": [
      "Learning management systems",
      "Virtual classroom platforms",
      "Student information systems"
    ]
  }
}
```

## CLI Commands

### Generate All Templates

```bash
node scripts/generate-templates.js
```

### Test Template Resolution

```bash
cd src/lib/templates
node test.ts
```

### View Template Statistics

The CLI will show you:

- Total templates generated
- Breakdown by type
- Any errors or warnings

## Template Types Explained

### 1. Location + Service (locationService)

**Format**: `{service}-{location}`
**Example**: `custom-software-development-dubai`
**Best For**: Location-specific service promotion

### 2. Industry + Location (industryLocation)

**Format**: `{industry}-solutions-{location}`
**Example**: `healthcare-solutions-dubai`
**Best For**: Industry-specific solutions in a location

### 3. Service + Industry (serviceIndustry)

**Format**: `{service}-for-{industry}`
**Example**: `custom-software-for-healthcare`
**Best For**: Service specialization for specific industries

## Customizing Templates

### Editing Template Structure

The main template component is in `src/components/templates/DynamicTemplate.tsx`. You can:

- Modify section order
- Add new sections
- Change styling
- Update content structure

### Customizing Content Generation

Edit the resolver logic in `src/lib/templates/resolver.ts` to:

- Change how titles are generated
- Modify meta descriptions
- Update content templates
- Add new template patterns

### SEO Customization

Templates automatically generate:

- **Title Tags**: "{Service} {Location} | {Company Name}"
- **Meta Descriptions**: Tailored to service and location
- **Keywords**: Combined from service, location, and industry data
- **Open Graph Tags**: For social media sharing

## URL Structure

### Template URLs

- `/templates/{slug}` - Individual template pages
- `/admin/templates` - Management dashboard

### SEO-Friendly URLs

All templates use lowercase, hyphenated slugs:

- `custom-software-development-dubai`
- `healthcare-solutions-abu-dhabi`
- `mobile-app-development-for-fintech`

## Content Strategy

### Automatic Content Generation

Each template includes:

1. **Hero Section**: Service-specific headline with location
2. **Benefits**: Relevant benefits from service data
3. **Features**: Technical features and capabilities
4. **Industry Challenges**: Specific pain points (for industry templates)
5. **Local Focus**: Location-specific business context
6. **Call-to-Action**: Consistent conversion elements

### Content Variations

Templates automatically vary content based on:

- **Service Type**: Technical vs. business focus
- **Location**: Local market conditions and regulations
- **Industry**: Specific challenges and compliance requirements

## Analytics and Tracking

### Built-in Tracking

Templates include:

- Google Analytics (if configured)
- Conversion tracking
- Form submissions
- Page performance metrics

### Custom Events

Track template-specific events:

```javascript
// Templates automatically include tracking for:
// - Template type viewed
// - Location-specific engagement
// - Service interest
// - Industry focus
```

## Troubleshooting

### Common Issues

**Templates not generating:**

- Check data file syntax (JSON validation)
- Ensure all required fields are present
- Run the test script to identify issues

**URLs not working:**

- Verify template exists in resolver
- Check Next.js routing configuration
- Restart development server

**Content not displaying:**

- Verify data structure matches types
- Check template component rendering
- Review console for errors

### Debug Mode

Enable debug mode in the resolver:

```javascript
// In src/lib/templates/resolver.ts
const DEBUG = true; // Set to true for detailed logging
```

### Validation

Run the test script to validate your setup:

```bash
cd src/lib/templates
node test.ts
```

## Performance Optimization

### Static Generation

Templates are optimized for static generation:

- Pre-rendered at build time
- Fast loading and SEO-friendly
- Cached for performance

### Image Optimization

- Use Next.js Image component
- Optimize for different screen sizes
- Lazy load below-the-fold content

### Content Delivery

- Minified CSS and JavaScript
- Optimized font loading
- Progressive enhancement

## Best Practices

### Content Guidelines

1. **Keep it relevant**: Ensure all content relates to the specific service/location/industry
2. **Local context**: Include location-specific business information
3. **Technical accuracy**: Verify industry-specific technical details
4. **Conversion focus**: Maintain clear call-to-action throughout

### SEO Best Practices

1. **Unique content**: Each template should have unique, valuable content
2. **Keyword optimization**: Natural keyword integration
3. **Meta tags**: Compelling titles and descriptions
4. **Internal linking**: Link to related services and case studies

### Maintenance

1. **Regular updates**: Keep service and industry data current
2. **Performance monitoring**: Track page speed and user engagement
3. **Content freshness**: Update location data and market information
4. **A/B testing**: Test different content variations

## Scaling the System

### Adding More Locations

The system can easily scale to hundreds of locations:

1. Add location data to JSON file
2. Regenerate templates
3. Deploy updated site

### Industry Expansion

Add new industries by:

1. Researching industry-specific challenges
2. Creating comprehensive industry data
3. Testing templates with industry experts

### Service Portfolio Growth

Expand services by:

1. Defining new service capabilities
2. Creating benefit and feature lists
3. Ensuring technical accuracy

## Support and Maintenance

### Regular Tasks

- **Weekly**: Review template performance metrics
- **Monthly**: Update location and industry data
- **Quarterly**: Review and refresh content templates

### Monitoring

- Template page views and engagement
- Conversion rates by location/service
- Search rankings for target keywords
- User feedback and inquiries

### Updates

- Keep dependencies updated
- Monitor Next.js updates
- Review SEO best practices
- Update content based on market changes

---

**Need Help?**

- Check the technical documentation in `src/lib/templates/README.md`
- Review the implementation plan in `LANDING_PAGE_TEMPLATE_SYSTEM_PLAN.md`
- Test your changes using the provided test scripts
