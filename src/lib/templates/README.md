# Template System Quick Reference

For full documentation, see [TEMPLATE_SYSTEM.md](/TEMPLATE_SYSTEM.md) at the project root.

## Quick Commands

```bash
# Generate a single page
node scripts/generate-templates.js --locations dubai --services ai-solutions

# Generate all pages for a location
node scripts/generate-templates.js --locations dubai --services all

# Test a template locally
npm run dev
# Visit: http://localhost:3000/templates/custom-software-development-dubai
```

## File Structure

```
/src/lib/templates/
├── data/                  # Data files (edit these to add content)
│   ├── locations.json     # Dubai, Abu Dhabi, etc.
│   ├── services.json      # AI Solutions, Custom Software, etc.
│   └── industries.json    # Real Estate, Healthcare, etc.
├── config.ts             # Template configuration & section setup
├── types.ts              # TypeScript interfaces
├── resolver.ts           # Template generation logic
├── generator.ts          # Batch generation utilities
└── index.ts              # Main exports
```

## Common Tasks

### Add a new location
Edit `data/locations.json`

### Add a new service
1. Edit `data/services.json`
2. Map to variant in `config.ts` → `SERVICE_VARIANT_MAP`

### Modify section layout
Edit `config.ts` → `DEFAULT_SECTIONS` or `VARIANT_SECTION_CONFIGS`

### Change component content
Edit the component file in `/src/components/[component-name]/`

## Component Variants

- `customSoftware` - Custom development focus
- `ai` - AI automation solutions
- `webapp` - Web applications
- `inventory` - Inventory management
- `automation` - Business process automation

## Need Help?

See [TEMPLATE_SYSTEM.md](/TEMPLATE_SYSTEM.md) for detailed documentation.