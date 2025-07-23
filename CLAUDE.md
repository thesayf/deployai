# Claude Code Guidelines for deployAI

This document provides guidelines for Claude Code when working on the deployAI project.

## Design System

We use a **neubrutalist design system** characterized by:
- Bold 3px black borders
- Hard shadows (4px, 6px, 8px offsets)
- No rounded corners (border-radius: 0)
- High contrast color palette
- Uppercase text for emphasis

See `design_system.md` for complete details.

## Landing Page Assembly Rules

When creating landing pages, follow these guidelines for consistent, professional results.

### Section Order

Standard landing page flow:
1. **Hero** - Always first, captures attention
2. **Stats/Social Proof** - Build credibility early
3. **Features/Benefits** - Show value proposition
4. **Process/How it Works** - Explain the journey
5. **Pricing** - Clear cost information
6. **Testimonials** - Social proof
7. **FAQ** - Address concerns
8. **CTA** - Final conversion push

### Background Patterns

Use `SectionWrapper` component for all sections:

```tsx
import { SectionWrapper } from '@/components/section-wrapper';

<SectionWrapper variant="warmPeach" spacing="large">
  <YourComponent />
</SectionWrapper>
```

#### Classic Pattern (Professional)
- Hero: `default` (white)
- Stats: `warmPeach` 
- Features: `default`
- Process: `coolMint`
- Pricing: `default`
- Testimonials: `skyBlue`
- CTA: `dark`

#### Bold Pattern (High Energy)
- Hero: `gradient`
- Stats: `dark`
- Features: `default`
- Pricing: `custom` with brand color
- CTA: `custom` with electric orange

#### Minimal Pattern (Clean)
- Alternate between `default` and `concrete` only

### Background Rules

1. **Never place two dark sections adjacent** - Too heavy visually
2. **Alternate backgrounds** - Create visual rhythm
3. **Use gradients sparingly** - Maximum 1-2 per page
4. **White after colored sections** - Reset visual palette every 2-3 sections
5. **Test on mobile** - Ensure readability on all backgrounds

### Spacing Guidelines

- **Hero sections**: Use `spacing="large"` (py-24)
- **Content sections**: Use `spacing="medium"` (py-16) - default
- **Compact sections**: Use `spacing="small"` (py-8) for stats, logos
- **Custom spacing**: Use `spacing="none"` and handle internally

### Component-Specific Tips

#### MVPPricingBrutal
- Works best on white or soft colored backgrounds
- The gradient price box provides its own color pop
- Avoid placing on gradient backgrounds

#### StatsMetrics
- The white cards with black borders pop on any background
- Use colored backgrounds (warmPeach, coolMint) for visual interest
- Dark backgrounds work but use sparingly

#### FeatureShowcase
- Best on white or very light backgrounds
- The icon colors provide the visual interest
- Bento variant works well on colored backgrounds

#### CTABanner
- Most impactful on dark or brand color backgrounds
- Creates urgency and draws attention
- Always use as one of the last sections

### Color Meanings

- **warmPeach** (#FFF5F0) - Friendly, approachable sections
- **coolMint** (#F0FFF5) - Fresh, modern, tech-focused
- **skyBlue** (#F0F5FF) - Professional, trustworthy
- **lavender** (#F5F0FF) - Creative, innovative
- **concrete** (#F5F5F5) - Neutral separator
- **dark** (#212121) - High impact, CTAs
- **gradient** - Energy, excitement (use sparingly)

### Mobile Considerations

All sections automatically adjust padding:
- Mobile: px-4 (16px)
- Tablet: px-6 (24px)
- Desktop: px-8 (32px)

### Example Landing Page Structure

```tsx
// Hero - White background, large spacing
<SectionWrapper variant="default" spacing="large">
  <Hero />
</SectionWrapper>

// Stats - Soft color for interest
<SectionWrapper variant="warmPeach">
  <StatsMetrics />
</SectionWrapper>

// Features - Return to white
<SectionWrapper variant="default">
  <FeatureShowcase />
</SectionWrapper>

// Process - Another soft color
<SectionWrapper variant="skyBlue">
  <TimelineProcess />
</SectionWrapper>

// Pricing - White to let pricing cards pop
<SectionWrapper variant="default" spacing="large">
  <MVPPricingBrutal />
</SectionWrapper>

// Final CTA - Dark for impact
<SectionWrapper variant="dark" spacing="large">
  <CTABanner />
</SectionWrapper>
```

## Blog Layout Guidelines

When creating blog posts or article pages:

### Using BlogLayout Component

The `BlogLayout` component provides a structured layout with a sidebar Table of Contents:

```tsx
import { BlogLayout } from '@/components/blog-layout';

const sections = [
  { id: 'introduction', title: 'Introduction', level: 0 },
  { id: 'main-topic', title: 'Main Topic', level: 0 },
  { id: 'subtopic-1', title: 'Subtopic One', level: 1 },
  { id: 'subtopic-2', title: 'Subtopic Two', level: 1 },
  { id: 'conclusion', title: 'Conclusion', level: 0 },
];

<BlogLayout sections={sections} showProgress={true} accentColor="orange">
  {/* Your article content */}
</BlogLayout>
```

### Table of Contents Configuration

The neubrutalist Table of Contents component supports three variants:

1. **Sidebar** (default) - Fixed sidebar for desktop blog layouts
   - Sticky positioning
   - Progress indicator
   - Smooth scroll to sections
   - 3px black borders with 6px shadow

2. **Mobile** - Floating toggle button with slide-out drawer
   - Fixed bottom-left button
   - Full-height drawer
   - Overlay background
   - Touch-friendly

3. **Minimal** - Static inline display
   - No wrapper styling
   - Perfect for embedding
   - Mobile-first design

### Section Structure

- Use `level: 0` for main sections (H2)
- Use `level: 1` for subsections (H3)
- Each section must have a unique `id` that matches an element in your content
- Keep titles concise for better sidebar display

### Responsive Behavior

- **Desktop (lg+)**: Two-column layout with sticky sidebar TOC
- **Tablet (md)**: Floating TOC button with slide-out drawer
- **Mobile (<md)**: Static TOC section at top of article

### Example Blog Page Structure

```tsx
// Hero section with metadata
<section>
  <h1>Article Title</h1>
  <p>Article excerpt</p>
  <div>Author, Date, Reading time</div>
</section>

// Featured image
<img src="..." alt="..." />

// Article with BlogLayout
<BlogLayout sections={sections}>
  <section id="introduction">
    <h2>Introduction</h2>
    <p>Content...</p>
  </section>
  
  <section id="main-topic">
    <h2>Main Topic</h2>
    <p>Content...</p>
    
    <h3 id="subtopic-1">Subtopic One</h3>
    <p>Content...</p>
  </section>
</BlogLayout>

// Related articles
<section>
  <RelatedArticles articles={...} />
</section>
```

### Best Practices

1. **Content IDs**: Ensure all section IDs in TOC match actual element IDs
2. **Heading Hierarchy**: Maintain logical heading structure (H2 → H3)
3. **Section Length**: Keep sections reasonably sized for better navigation
4. **Mobile Testing**: Always test TOC behavior on mobile devices
5. **Accent Colors**: Use `orange` for general content, `blue` for technical, `red` for important

## Component Creation Guidelines

When creating new components:

1. **Follow the design system** - Use our color tokens and typography
2. **Make components self-contained** - Include all necessary styles
3. **Support multiple variants** - Provide 3-4 layout options
4. **Include proper TypeScript types** - Full type safety
5. **Create comprehensive Storybook stories** - Document all variants
6. **Consider section wrapper compatibility** - Test on different backgrounds

## File Structure

```
src/components/
├── component-name/
│   ├── ComponentName.tsx      # Main component
│   ├── ComponentName.stories.tsx  # Storybook stories
│   └── index.ts              # Export
```

## Testing Checklist

Before completing a component:
- [ ] Works on all background colors
- [ ] Mobile responsive
- [ ] TypeScript errors resolved
- [ ] Storybook stories complete
- [ ] Follows neubrutalist design
- [ ] Tested with SectionWrapper

## Common Commands

- `npm run dev` - Start development server
- `npm run storybook` - Start Storybook
- `npm run build` - Build for production
- `npm run lint` - Run linter
- `npm run type-check` - Check TypeScript

## Git Workflow

1. Work on feature branches
2. Commit with descriptive messages
3. Push to remote regularly
4. Create PRs for review

Remember: Our goal is to create landing pages that are bold, memorable, and conversion-focused while maintaining consistency and scalability.