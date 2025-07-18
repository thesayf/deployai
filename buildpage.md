# AI App MVP Landing Page Plan (/build)

## Overview
A focused, high-converting landing page targeting founders and businesses looking to build AI app MVPs quickly and affordably. The page will emphasize speed (4 weeks), transparent pricing (£10k), and risk reduction (10% deposit).

## Core Value Proposition
**Headline**: "Launch Your AI App MVP in 4 Weeks"  
**Subheadline**: "£10k total. 10% to start. Real product in users' hands."

## Page Structure & Components

### 1. Hero Section (Above the Fold)
**Component**: Modified `Hero.tsx` with new "build" variant
- **Headline**: "Launch Your AI App MVP in 4 Weeks"
- **Subheadline**: "£10k total. 10% to start. Real product in users' hands."
- **CTA Button**: "Check If We're a Fit" → Links to Calendly
- **Trust Badges**: 
  - "12 MVPs Launched" (update dynamically)
  - "100% Code Ownership"
  - "10% Deposit Only"
- **Hero Visual**: Split-screen showing:
  - Left: "Day 1: Your idea"
  - Right: "Week 4: Live MVP with real users"

### 2. Problem Agitation Section
**Component**: Modified `ProblemAgitation.tsx` with new "mvp" variant
- **Opening**: "Most developers quote 6 months and £50k for your MVP..."
- **Pain Points** (cycling words):
  - "6-month timelines"
  - "£50k+ quotes"
  - "endless meetings"
  - "no transparency"
- **Solution**: "We deliver real MVPs in 4 weeks for £10k flat"

### 3. Process Timeline Section
**Component**: New `ProcessTimeline.tsx`
- **Visual**: Horizontal timeline with 4 weekly milestones
- **Week 1**: Discovery & Planning
  - Initial consultation
  - Technical architecture
  - Feature prioritization
  - Design mockups
- **Week 2**: Core Development
  - Database setup
  - API development
  - Core features build
  - AI integration
- **Week 3**: Frontend & Testing
  - UI implementation
  - User testing
  - Bug fixes
  - Performance optimization
- **Week 4**: Launch & Handover
  - Deployment
  - User onboarding
  - Documentation
  - Support setup

### 4. Portfolio Section
**Component**: Modified `CaseStudies.tsx` filtered for MVPs
- **3-4 MVP Examples**:
  - AI Customer Support Tool (SaaS)
  - Inventory Prediction System (Retail)
  - Document Processing App (Legal)
  - Sales Intelligence Platform (B2B)
- Each with:
  - Before/after metrics
  - Timeline achieved
  - Tech stack used
  - Client testimonial

### 5. Pricing Section
**Component**: New `MVPPricing.tsx` (simplified from `PricingSection.tsx`)
- **Single Pricing Card**: £10,000
- **Payment Terms**:
  - 10% deposit to start (£1,000)
  - 40% at week 2 milestone (£4,000)
  - 50% on delivery (£5,000)
- **What's Included**:
  - ✓ Full MVP development
  - ✓ AI integration (OpenAI/Claude)
  - ✓ Payment processing (Stripe)
  - ✓ User authentication
  - ✓ Admin dashboard
  - ✓ Deployment & hosting setup
  - ✓ 30 days post-launch support
  - ✓ Complete source code ownership

### 6. Tech Stack Section
**Component**: New `TechStackShowcase.tsx`
- **Modern Stack Visual**:
  - Frontend: React/Next.js
  - Backend: Node.js/Python
  - AI: OpenAI/Claude APIs
  - Database: PostgreSQL/MongoDB
  - Hosting: Vercel/AWS
  - Payments: Stripe

### 7. FAQ Section
**Component**: `FAQ.tsx` with new "mvp" variant
- **Questions**:
  - "What exactly can you build in 4 weeks?"
  - "What if my project needs more than 4 weeks?"
  - "Do I own the code?"
  - "What happens after the MVP launches?"
  - "Can you integrate with my existing systems?"
  - "What if I need changes during development?"

### 8. Risk Reversal Section
**Component**: New `RiskReversalMVP.tsx`
- **Guarantees**:
  - Only 10% deposit required
  - Weekly progress demos
  - Full refund if we miss the deadline
  - You own 100% of the code
  - No vendor lock-in

### 9. Final CTA Section
**Component**: Modified `FinalCTA.tsx`
- **Headline**: "Start Your Project This Month"
- **Subheadline**: "Limited to 3 new MVPs per month to ensure quality"
- **Urgency Element**: "2 spots left for [Current Month]"
- **CTA Button**: "Book Your Free Strategy Call"

## New Components Needed

1. **ProcessTimeline.tsx**
   - Interactive timeline component
   - Hover states showing detailed tasks
   - Progress indicators

2. **MVPPricing.tsx**
   - Simplified single-card pricing
   - Payment schedule visualization
   - Feature checklist

3. **TechStackShowcase.tsx**
   - Logo grid of technologies
   - Hover effects with descriptions
   - "Why this stack" explanations

4. **RiskReversalMVP.tsx**
   - Trust badges
   - Guarantee cards
   - Security/ownership assurances

## Design Requirements

### Visual Style
- **Color Scheme**: Consistent with main brand (orange/red gradients)
- **Typography**: Bold, clear hierarchy
- **Spacing**: Generous white space for clarity
- **Borders**: Signature thick black borders with shadow effects

### Mobile Optimization
- Stack timeline vertically on mobile
- Simplify pricing card for small screens
- Ensure CTAs are thumb-friendly
- Optimize hero for mobile viewing

### Performance
- Lazy load portfolio images
- Optimize animations for 60fps
- Minimize JavaScript bundle
- Implement proper SEO meta tags

## Conversion Optimization

### Trust Elements
- Client logos in hero section
- Specific MVP count (update monthly)
- Real portfolio examples with results
- Transparent pricing upfront
- Clear process visualization

### Urgency & Scarcity
- "Limited to 3 MVPs per month"
- Current month availability counter
- "Book before [date] to start this month"

### Risk Reduction
- 10% deposit emphasis
- Refund guarantee
- Weekly progress updates
- Code ownership guarantee

### Social Proof
- Client testimonials with names/companies
- Before/after metrics
- Case study snippets
- Years of experience badge

## Implementation Notes

1. **Reuse Existing Components**:
   - Hero structure
   - Button styles
   - Section headings
   - FAQ accordion
   - Navigation

2. **Modify for Context**:
   - Problem agitation copy
   - Hero variant
   - FAQ questions
   - CTA messaging

3. **Keep Consistent**:
   - Design system
   - Animation patterns
   - Color usage
   - Typography scale

## Success Metrics
- **Target Conversion Rate**: 8-12%
- **Time on Page**: >2 minutes
- **Scroll Depth**: >80%
- **CTA Clicks**: >15%

## Next Steps
1. Create new components
2. Implement page at /build route
3. Set up tracking/analytics
4. A/B test headlines
5. Monitor and optimize based on data