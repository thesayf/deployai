import type { Meta, StoryObj } from '@storybook/react';
import { PricingComparison } from './PricingComparison';

const meta = {
  title: 'Blog/PricingComparison',
  component: PricingComparison,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Pricing Comparison - Neubrutalist Table Component

A bold, impactful pricing comparison table implementing the full neubrutalist design system with responsive layouts and interactive states.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Pure geometric shapes
- **Bold 4px black borders** on desktop, 3px on mobile
- **Brutal shadow effects** - 8px desktop, 4-6px mobile with hover states
- **High contrast** between elements for maximum impact

### Typography System
- **Display typography** for hero titles with text shadows
- **Uppercase styling** for emphasis and recommended badges
- **Font weight hierarchy** from black (900) to medium (500)
- **Consistent letter spacing** for improved readability

### Color Implementation
- **Electric Orange** (#FF6B35) - Primary accent for recommended tiers
- **Gradient effects** - Orange to Crimson for premium elements
- **Semantic colors** - Emerald for positive features, Steel for disabled
- **Black & White foundation** - Maximum contrast for accessibility

### Interactive Elements
- **Hover effects** with shadow depth changes (4px → 6px)
- **Transform animations** on hover (-2px translation)
- **Touch optimized** for mobile with onTouchStart/End handlers
- **Gradient buttons** for recommended tiers

## Layout Features

### Desktop View
- Full table layout with fixed headers
- 4px brutal borders throughout
- Alternating row backgrounds for readability
- Prominent pricing display with gradient backgrounds
- Dark footer with high-contrast CTAs

### Mobile View
- Stacked card layout for each tier
- Gradient accent bars for recommended options
- Feature list with icon/text values
- Touch-friendly interaction zones
- Maintains brutal aesthetics at smaller sizes

## Component Variants

### Default Configuration
Standard pricing table with three tiers and comprehensive feature comparison.

### Custom Pricing
Flexible tier configuration for different business models (MVP, Scale, Enterprise).

### Feature Comparison
Supports boolean values (check/x icons) and text values for nuanced comparisons.

### Without CTA
Clean comparison view without action buttons for informational contexts.

## Accessibility

- **WCAG AA compliant** color contrasts
- **Semantic HTML** table structure on desktop
- **Keyboard navigable** buttons and interactive elements
- **Screen reader friendly** with proper labeling

## Technical Implementation

- Built with React and TypeScript
- Self-contained SVG icons (no external dependencies)
- Inline styles for brutal shadow effects
- Responsive breakpoint at 1024px (lg)
- Touch event handlers for mobile interactions
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the pricing comparison',
      table: {
        defaultValue: { summary: 'Dubai Web Development Pricing Guide' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
      table: {
        defaultValue: { summary: 'Compare service tiers and find the perfect fit for your project' },
      },
    },
    showCTA: {
      control: 'boolean',
      description: 'Show/hide call-to-action buttons',
      table: {
        defaultValue: { summary: true },
      },
    },
    tiers: {
      control: 'object',
      description: 'Array of pricing tier objects',
    },
    features: {
      control: 'object',
      description: 'Array of feature comparison objects',
    },
  },
} satisfies Meta<typeof PricingComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dubai Web Development Pricing Guide',
    subtitle: 'Compare service tiers and find the perfect fit for your project',
  },
};

export const WithoutCTA: Story = {
  args: {
    title: 'Service Comparison Overview',
    subtitle: 'Compare features across different tiers',
    showCTA: false,
  },
};

export const CustomPricing: Story = {
  args: {
    title: 'AI-Powered Development Packages',
    subtitle: 'Faster delivery with cutting-edge technology',
    tiers: [
      {
        name: 'MVP Sprint',
        price: 'AED 25,000',
        timeline: '4 weeks',
        description: 'Launch your idea fast with AI assistance',
      },
      {
        name: 'Scale Package',
        price: 'AED 50,000',
        timeline: '6-8 weeks',
        description: 'Production-ready with advanced features',
        recommended: true,
      },
      {
        name: 'Enterprise AI',
        price: 'Custom Quote',
        timeline: '3+ months',
        description: 'Full AI integration and custom solutions',
      },
    ],
    features: [
      {
        name: 'AI-Assisted Development',
        basic: true,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Custom AI Models',
        basic: false,
        ecommerce: 'Basic',
        enterprise: true,
      },
      {
        name: 'Real-time Analytics',
        basic: false,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Deployment Support',
        basic: 'Basic',
        ecommerce: 'Full',
        enterprise: 'White-glove',
      },
      {
        name: 'API Integrations',
        basic: '3',
        ecommerce: '10',
        enterprise: 'Unlimited',
      },
    ],
  },
};

export const MinimalComparison: Story = {
  args: {
    title: 'Quick Pricing Overview',
    subtitle: '',
    features: [
      {
        name: 'Project Scope',
        basic: 'Simple Website',
        ecommerce: 'Online Store',
        enterprise: 'Custom Platform',
      },
      {
        name: 'Development Time',
        basic: '2-4 weeks',
        ecommerce: '4-8 weeks',
        enterprise: '2-6 months',
      },
      {
        name: 'Price Range',
        basic: 'AED 5K-15K',
        ecommerce: 'AED 15K-50K',
        enterprise: 'AED 50K+',
      },
      {
        name: 'Best For',
        basic: 'Small Business',
        ecommerce: 'Retail & Services',
        enterprise: 'Large Organizations',
      },
    ],
  },
};

export const FreelancerVsAgency: Story = {
  args: {
    title: 'Freelancer vs Agency vs AI-First',
    subtitle: 'Choose the right development partner for your needs',
    tiers: [
      {
        name: 'Freelancer',
        price: 'AED 3,000 - 20,000',
        timeline: '2-8 weeks',
        description: 'Individual developers, budget-friendly',
      },
      {
        name: 'Traditional Agency',
        price: 'AED 15,000 - 100,000',
        timeline: '4-16 weeks',
        description: 'Full team, established processes',
      },
      {
        name: 'AI-First Company',
        price: 'AED 10,000 - 75,000',
        timeline: '2-8 weeks',
        description: 'Fast delivery with AI automation',
        recommended: true,
      },
    ],
    features: [
      {
        name: 'Team Size',
        basic: '1 person',
        ecommerce: '3-10 people',
        enterprise: '2-5 people + AI',
      },
      {
        name: 'Project Management',
        basic: 'Basic',
        ecommerce: 'Dedicated PM',
        enterprise: 'AI-Enhanced PM',
      },
      {
        name: 'Design Process',
        basic: 'Template-based',
        ecommerce: 'Custom Design',
        enterprise: 'AI + Custom Design',
      },
      {
        name: 'Code Quality',
        basic: 'Variable',
        ecommerce: 'High',
        enterprise: 'AI-Reviewed',
      },
      {
        name: 'Support & Maintenance',
        basic: 'Limited',
        ecommerce: 'Full Support',
        enterprise: 'Automated + Human',
      },
      {
        name: 'Scalability',
        basic: false,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Risk Level',
        basic: 'Medium-High',
        ecommerce: 'Low',
        enterprise: 'Very Low',
      },
    ],
  },
};

export const TechnologyStack: Story = {
  args: {
    title: 'Technology Stack Comparison',
    subtitle: 'Popular tech choices in Dubai web development',
    tiers: [
      {
        name: 'WordPress/PHP',
        price: 'AED 5,000 - 25,000',
        timeline: '2-6 weeks',
        description: 'Traditional CMS approach',
      },
      {
        name: 'React/Next.js',
        price: 'AED 15,000 - 60,000',
        timeline: '4-10 weeks',
        description: 'Modern JavaScript framework',
        recommended: true,
      },
      {
        name: 'Custom Stack',
        price: 'AED 30,000+',
        timeline: '6-16 weeks',
        description: 'Tailored technology solution',
      },
    ],
    features: [
      {
        name: 'Performance',
        basic: 'Good',
        ecommerce: 'Excellent',
        enterprise: 'Excellent',
      },
      {
        name: 'SEO Capabilities',
        basic: 'Excellent',
        ecommerce: 'Excellent',
        enterprise: 'Customizable',
      },
      {
        name: 'Maintenance Cost',
        basic: 'Low',
        ecommerce: 'Medium',
        enterprise: 'High',
      },
      {
        name: 'Developer Availability',
        basic: 'High',
        ecommerce: 'High',
        enterprise: 'Medium',
      },
      {
        name: 'Scalability',
        basic: 'Limited',
        ecommerce: 'Excellent',
        enterprise: 'Unlimited',
      },
      {
        name: 'Security',
        basic: 'Plugin-based',
        ecommerce: 'Built-in',
        enterprise: 'Custom',
      },
    ],
  },
};

export const AIFirstDevelopment: Story = {
  args: {
    title: 'AI-Powered Development Tiers',
    subtitle: 'Build faster, smarter, and more efficiently with AI assistance',
    tiers: [
      {
        name: 'AI Starter',
        price: '$2,500',
        timeline: '2 weeks',
        description: 'Perfect for MVPs and prototypes',
      },
      {
        name: 'AI Professional',
        price: '$7,500',
        timeline: '30 days',
        description: 'Production-ready AI applications',
        recommended: true,
      },
      {
        name: 'AI Enterprise',
        price: '$25,000+',
        timeline: '6-12 weeks',
        description: 'Custom AI solutions at scale',
      },
    ],
    features: [
      {
        name: 'AI Model Integration',
        basic: 'GPT-3.5',
        ecommerce: 'GPT-4 + Claude',
        enterprise: 'Custom Models',
      },
      {
        name: 'Development Speed',
        basic: '10x faster',
        ecommerce: '10x faster',
        enterprise: '5x faster',
      },
      {
        name: 'Code Generation',
        basic: true,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Custom Workflows',
        basic: false,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Vector Database',
        basic: false,
        ecommerce: 'Pinecone',
        enterprise: 'Custom',
      },
      {
        name: 'AI Agents',
        basic: '1',
        ecommerce: '5',
        enterprise: 'Unlimited',
      },
      {
        name: 'Training Data',
        basic: false,
        ecommerce: 'Basic',
        enterprise: 'Full Custom',
      },
      {
        name: 'API Rate Limits',
        basic: '1K/day',
        ecommerce: '10K/day',
        enterprise: 'Unlimited',
      },
      {
        name: 'Support',
        basic: 'Community',
        ecommerce: 'Priority',
        enterprise: 'Dedicated',
      },
      {
        name: 'Deployment',
        basic: 'Shared',
        ecommerce: 'Dedicated',
        enterprise: 'On-premise',
      },
    ],
  },
};