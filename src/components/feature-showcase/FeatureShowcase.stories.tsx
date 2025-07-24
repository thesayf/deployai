import type { Meta, StoryObj } from '@storybook/nextjs';
import { FeatureShowcase } from './FeatureShowcase';

// Custom Icons for stories
const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 11H5l-4 4 3 3 4-4v-3zm6 0h4l4 4-3 3-4-4v-3zM12 15.5V20l3 3 3-3v-4.5"/>
    <circle cx="12" cy="5.5" r="2.5"/>
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const CpuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/>
    <line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/>
    <line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/>
    <line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/>
    <line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

const meta: Meta<typeof FeatureShowcase> = {
  title: 'Blog/FeatureShowcase',
  component: FeatureShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Feature Showcase - Neubrutalist Feature/Service Display Component

A versatile component for showcasing features, services, or benefits with the full neubrutalist design system. Perfect for product pages, service listings, and feature comparisons.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Sharp geometric edges
- **Bold 3-4px borders** with 4-8px brutal shadows
- **Rotated icon containers** for visual interest
- **Highlight states** with accent colors

### Typography
- **Bold headings** for feature names
- **Clear descriptions** with proper hierarchy
- **Uppercase badges** for special features
- **Consistent spacing** using 8px grid

### Interactive Elements
- **Hover animations** with transform effects
- **Icon scaling** on interaction
- **Shadow depth changes** for tactile feel
- **Click handlers** for navigation

## Variants

### Grid
Icon-focused grid layout perfect for feature overviews. Icons are prominently displayed with centered text.

### Cards
Detailed card layout with headers, descriptions, and feature lists. Great for comprehensive service descriptions.

### Minimal
Compact list format with inline icons. Ideal for space-constrained areas or simple feature lists.

### Detailed
Alternating side-by-side layout with large visuals. Perfect for in-depth feature explanations.

### Bento
Asymmetric grid layout inspired by bento boxes. Features different sized cards for visual hierarchy. The first feature is prominently displayed, followed by varied sizes.

## Layout Options

### Columns
- **2 columns** - Detailed features with more space
- **3 columns** - Balanced layout (default)
- **4 columns** - Compact grid for many features

### Content Options
- **showFeatureList** - Bullet points for each feature
- **showBadge** - Special badges (NEW, POPULAR, etc.)
- **Custom icons** - Support for custom SVG icons

## Usage Guidelines

### When to Use
- Product feature sections
- Service offering pages
- Pricing plan features
- Technology stack displays
- Benefits overviews

### Content Tips
- Keep titles concise (2-4 words)
- Descriptions should be 1-2 sentences
- Feature lists should be 3-5 items max
- Use clear, benefit-focused language
- Consistent icon style throughout
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle',
    },
    variant: {
      control: 'select',
      options: ['grid', 'cards', 'minimal', 'detailed', 'bento'],
      description: 'Display variant',
      table: {
        defaultValue: { summary: 'grid' },
      },
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns (grid/cards variants)',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    showFeatureList: {
      control: 'boolean',
      description: 'Show feature bullet points',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showBadge: {
      control: 'boolean',
      description: 'Show feature badges',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color theme',
      table: {
        defaultValue: { summary: 'orange' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample features data
const sampleFeatures = [
  {
    id: '1',
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze your data in real-time for actionable insights.',
    icon: <BrainIcon className="w-full h-full" />,
    features: [
      'Real-time data processing',
      'Predictive analytics',
      'Anomaly detection',
      'Custom ML models'
    ],
    badge: 'NEW',
    highlight: true,
    href: '#'
  },
  {
    id: '2',
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your applications run at maximum speed with minimal latency.',
    icon: <RocketIcon className="w-full h-full" />,
    features: [
      'Sub-millisecond response',
      'Global CDN distribution',
      'Auto-scaling infrastructure',
      'Performance monitoring'
    ],
    badge: 'POPULAR',
    href: '#'
  },
  {
    id: '3',
    title: 'Advanced Analytics',
    description: 'Comprehensive analytics dashboard with customizable reports and real-time metrics.',
    icon: <ChartIcon className="w-full h-full" />,
    features: [
      'Custom dashboards',
      'Export capabilities',
      'API integration',
      'Historical data'
    ],
    href: '#'
  },
  {
    id: '4',
    title: 'Enterprise Security',
    description: 'Bank-level security protocols protect your data with encryption and compliance.',
    features: [
      'End-to-end encryption',
      'SOC 2 compliance',
      'Regular audits',
      'Access controls'
    ],
    badge: 'SECURE',
    href: '#'
  },
  {
    id: '5',
    title: 'Seamless Integration',
    description: 'Connect with your existing tools and workflows through our extensive API and webhooks.',
    icon: <CpuIcon className="w-full h-full" />,
    features: [
      'REST & GraphQL APIs',
      'Webhook support',
      '100+ integrations',
      'Custom connectors'
    ],
    href: '#'
  },
  {
    id: '6',
    title: '24/7 Support',
    description: 'Expert support team available around the clock to help you succeed.',
    features: [
      'Live chat support',
      'Priority ticketing',
      'Knowledge base',
      'Video tutorials'
    ],
    badge: 'PRO',
    href: '#'
  }
];

// Default grid layout
export const Default: Story = {
  args: {
    title: 'Powerful Features',
    subtitle: 'Everything you need to build amazing AI applications',
    features: sampleFeatures.slice(0, 3),
  },
};

// Grid with 2 columns
export const TwoColumns: Story = {
  args: {
    title: 'Core Features',
    features: sampleFeatures.slice(0, 4),
    columns: 2,
  },
};

// Grid with 4 columns
export const FourColumns: Story = {
  args: {
    title: 'Feature Overview',
    features: sampleFeatures.slice(0, 4),
    columns: 4,
  },
};

// Cards variant
export const CardsLayout: Story = {
  args: {
    title: 'Our Services',
    subtitle: 'Choose the perfect solution for your needs',
    features: sampleFeatures.slice(0, 3),
    variant: 'cards',
  },
};

// Minimal variant
export const MinimalLayout: Story = {
  args: {
    title: 'Key Benefits',
    features: sampleFeatures,
    variant: 'minimal',
  },
};

// Detailed variant
export const DetailedLayout: Story = {
  args: {
    title: 'Platform Capabilities',
    features: sampleFeatures.slice(0, 3),
    variant: 'detailed',
  },
};

// Bento variant
export const BentoLayout: Story = {
  args: {
    title: 'Everything You Need',
    subtitle: 'A complete suite of tools for modern development',
    features: sampleFeatures,
    variant: 'bento',
  },
};

// Bento with different accents
export const BentoBluAccent: Story = {
  args: {
    title: 'Enterprise Solutions',
    features: sampleFeatures.map((f, i) => ({ 
      ...f, 
      highlight: i === 0 
    })),
    variant: 'bento',
    accentColor: 'blue',
  },
};

// Without feature lists
export const NoFeatureLists: Story = {
  args: {
    title: 'Simple Features',
    features: sampleFeatures.slice(0, 3),
    showFeatureList: false,
  },
};

// Without badges
export const NoBadges: Story = {
  args: {
    title: 'Clean Features',
    features: sampleFeatures.slice(0, 3),
    showBadge: false,
  },
};

// Blue accent
export const BlueAccent: Story = {
  args: {
    title: 'Enterprise Features',
    features: sampleFeatures.slice(0, 3),
    accentColor: 'blue',
  },
};

// Magenta accent
export const MagentaAccent: Story = {
  args: {
    title: 'Creative Tools',
    features: sampleFeatures.slice(0, 3),
    accentColor: 'magenta',
  },
};

// Red accent
export const RedAccent: Story = {
  args: {
    title: 'Premium Features',
    features: sampleFeatures.slice(0, 3),
    accentColor: 'red',
  },
};

// All highlighted
export const AllHighlighted: Story = {
  args: {
    title: 'Featured Services',
    features: sampleFeatures.slice(0, 3).map(f => ({ ...f, highlight: true })),
  },
};

// No icons (using defaults)
export const DefaultIcons: Story = {
  args: {
    title: 'Standard Features',
    features: sampleFeatures.slice(0, 4).map(f => ({ ...f, icon: undefined })),
  },
};

// Mixed content
export const MixedContent: Story = {
  args: {
    title: 'All Features',
    features: [
      ...sampleFeatures.slice(0, 2),
      { 
        id: '7', 
        title: 'Simple Feature', 
        description: 'A basic feature without extras' 
      },
      ...sampleFeatures.slice(2, 3)
    ],
  },
};

// With click handler
export const WithClickHandler: Story = {
  args: {
    title: 'Interactive Features',
    features: sampleFeatures.slice(0, 3),
    onFeatureClick: (feature) => {
      console.log('Feature clicked:', feature);
      alert(`Clicked: ${feature.title}`);
    },
  },
};

// Single feature
export const SingleFeature: Story = {
  args: {
    features: [sampleFeatures[0]],
    columns: 2,
  },
};

// Many features
export const ManyFeatures: Story = {
  args: {
    title: 'Complete Feature Set',
    features: [...sampleFeatures, ...sampleFeatures.map(f => ({ 
      ...f, 
      id: `${f.id}-2`,
      badge: undefined 
    }))],
    columns: 4,
  },
};

// In pricing context
export const InPricingContext: Story = {
  args: {
    title: 'Included in Pro Plan',
    features: sampleFeatures.slice(0, 6),
    variant: 'minimal',
    accentColor: 'blue',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Pro Plan - $99/month
          </h1>
          <p style={{ fontSize: '18px', color: '#757575' }}>
            Everything you need to scale your business
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

// Homepage hero section
export const HomepageHero: Story = {
  args: {
    title: 'Why Choose Our Platform',
    subtitle: 'Built for developers, trusted by enterprises',
    features: sampleFeatures.slice(0, 3),
    variant: 'cards',
    accentColor: 'orange',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f5f5f5', padding: '64px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

// Product comparison
export const ProductComparison: Story = {
  args: {
    title: 'Standard vs Pro Features',
    features: [
      {
        id: '1',
        title: 'Standard Features',
        description: 'Essential tools for small teams',
        features: ['5 team members', 'Basic analytics', 'Email support', '10GB storage'],
        highlight: false,
      },
      {
        id: '2',
        title: 'Pro Features',
        description: 'Advanced capabilities for growing businesses',
        features: ['Unlimited members', 'Advanced analytics', 'Priority support', '1TB storage'],
        badge: 'RECOMMENDED',
        highlight: true,
      }
    ],
    variant: 'cards',
    columns: 2,
  },
};