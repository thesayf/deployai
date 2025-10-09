# SaaS Platform Design Guidelines

This document extends the main [CLAUDE.md](./CLAUDE.md) design guidelines with specific patterns for the multi-tenant SaaS platform.

## Design Reference

The **AI Assessment Landing Page** (`/src/components/assessment-landing/AssessmentLanding.tsx`) serves as the design reference for all SaaS platform pages.

## Design Principles

### 1. Clean & Simple First
- Start with clean, minimal layouts
- Add subtle neobrutalist accents (not full neobrutalist everywhere)
- Use whitespace generously
- Keep typography hierarchy clear

### 2. Subtle Neobrutalist Elements

**Use sparingly:**
- `border-3 border-black` on cards and important CTAs
- `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` box shadows
- `hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]` on hover
- `hover:-translate-y-0.5` subtle lift effect

**Avoid:**
- Heavy borders on everything
- Hard shadows on every element
- Uppercase text everywhere (use selectively)
- Overly bold, in-your-face design

### 3. Section Structure

Always use `SectionWrapper` for consistent spacing and backgrounds:

```tsx
import { SectionWrapper } from '@/components/section-wrapper';

// Dark hero section
<SectionWrapper variant="dark" spacing="none">
  <div className="py-12 md:min-h-[60vh] md:flex md:items-center">
    {/* Hero content */}
  </div>
</SectionWrapper>

// Content section
<SectionWrapper variant="default" spacing="large">
  {/* Main content */}
</SectionWrapper>

// Accent section
<SectionWrapper variant="warmPeach" spacing="large">
  {/* Supporting content */}
</SectionWrapper>
```

### 4. Typography Scale

```tsx
// Page titles (dark sections)
<h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">

// Section titles
<h2 className="text-2xl md:text-4xl font-bold mb-4">

// Subsection titles
<h3 className="text-xl md:text-2xl font-bold mb-4">

// Body text
<p className="text-base md:text-lg text-gray-700">

// Small text / metadata
<p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
```

### 5. Color Palette

```tsx
// Primary CTA color
#FF6B35 (Orange) - Use for main CTAs and accents

// Supporting colors
#00C851 (Green) - Success states, checkmarks
#FFB300 (Amber) - Warnings, highlights
#457B9D (Blue) - Secondary actions
#E63946 (Red) - Errors, urgent actions

// Backgrounds
dark: #212121 (Hero sections)
warmPeach: #FFF5F0 (Soft accent sections)
concrete: #F5F5F5 (Neutral separators)
default: #FFFFFF (Main content)
```

### 6. Card Design

**Standard card with subtle neobrutalist accent:**
```tsx
<div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
  {/* Card content */}
</div>
```

**Gradient card (for stats/highlights):**
```tsx
<div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
  {/* Card content */}
</div>
```

### 7. Button Patterns

Use the shared `Button` component:

```tsx
import { Button } from '@/components/shared/Button';

// Primary CTA
<Button size="large" intent="cta">
  START FREE TRIAL
</Button>

// Secondary action
<Button size="large" intent="primary">
  Learn More →
</Button>
```

### 8. Icons & Checkmarks

**Feature lists:**
```tsx
<li className="flex items-start">
  <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
  <span className="text-gray-700">Feature description</span>
</li>
```

### 9. Animation Patterns

Use Framer Motion for subtle entrance animations:

```tsx
import { motion } from 'framer-motion';

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4, delay: 0.1 }}
>
  {/* Content */}
</motion.div>
```

### 10. Responsive Patterns

**Always consider mobile:**
```tsx
// Text sizing
<h1 className="text-3xl md:text-5xl">

// Spacing
<div className="py-12 md:py-24">

// Grid layouts
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Page-Specific Patterns

### Landing Pages
- Dark hero section with white text
- Alternating white/colored sections
- End with CTA section
- Use motion animations on scroll

### Dashboard Pages
- White background default
- Subtle shadows on cards
- Minimal borders
- Clear information hierarchy

### Billing/Pricing Pages
- Dark hero introducing plans
- White section for plan cards
- Warm accent section for terms/trust signals
- Use gradient for recommended badges

## Dos and Don'ts

### ✅ DO
- Use `SectionWrapper` for all major sections
- Keep most sections white or very light
- Use neobrutalist accents strategically
- Animate on scroll for engagement
- Test on mobile devices

### ❌ DON'T
- Add borders to every element
- Use heavy shadows everywhere
- Make everything uppercase
- Ignore whitespace
- Forget mobile responsiveness

## Landing Page Replication

When creating the SaaS landing page, replicate the AI Assessment page structure:

1. **Hero** - Dark background, white text, clear value prop
2. **How It Works** - 3-step process with icons
3. **Features/Benefits** - Grid of cards with neobrutalist accents
4. **Social Proof** - Testimonial or trust signals
5. **Pricing** - Clean pricing cards (link to `/pricing` or `select-plan`)
6. **Final CTA** - Simple, clear call to action

The AI Assessment page is our reference for "simple + subtle neobrutalist" - NOT heavy neobrutalism throughout.
