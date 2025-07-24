import type { Meta, StoryObj } from '@storybook/nextjs';
import { MVPPricingBrutal } from './MVPPricingBrutal';

const meta: Meta<typeof MVPPricingBrutal> = {
  title: 'Components/MVPPricingBrutal',
  component: MVPPricingBrutal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# MVP Pricing Brutal - Neubrutalist Pricing Component

A bold, attention-grabbing pricing component designed specifically for MVP/product development services with our signature neubrutalist aesthetic.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Sharp, brutal edges
- **Bold 4px borders** with 8px shadows on main card
- **Gradient price box** with dramatic shadows
- **Rotating "Most Popular" badge**

### Typography
- **Large display prices** with gradient backgrounds
- **Uppercase headings** for emphasis
- **Clear hierarchy** from title to features
- **Consistent spacing** throughout

### Interactive Elements
- **Hover effects** on all cards with transform animations
- **Animated feature list** with staggered appearance
- **CTA button** with hover states and icon
- **Payment phase cards** with icon badges

## Variants

### Default
Full two-column layout with pricing card and payment schedule side by side.

### Compact
Similar to default but with tighter spacing for smaller viewports.

### Minimal
Single column layout showing only the main pricing card without payment schedule.

## Color Themes

### Orange (default)
High-energy electric orange for maximum impact.

### Blue
Professional cyber blue for B2B focused products.

### Magenta
Creative deep magenta for innovative solutions.

### Red
Urgent crimson red for limited-time offers.

## Usage Guidelines

### Placement
- **Landing pages** - Above the fold for immediate impact
- **Pricing pages** - As the main pricing option
- **Product pages** - To showcase MVP development services
- **Campaign pages** - For special offers or launches

### Content Tips
- Keep feature list concise (8-10 items max)
- Use action-oriented CTA text
- Include trust signals in guarantee section
- Show clear payment terms upfront
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title for the pricing section',
      table: {
        defaultValue: { summary: 'Simple, Transparent Pricing' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
      table: {
        defaultValue: { summary: 'One price. One deliverable. No hidden costs or scope creep.' },
      },
    },
    price: {
      control: 'text',
      description: 'Price to display',
      table: {
        defaultValue: { summary: '$10,000' },
      },
    },
    ctaText: {
      control: 'text',
      description: 'Call-to-action button text',
      table: {
        defaultValue: { summary: 'Book Your Free Strategy Call' },
      },
    },
    limitText: {
      control: 'text',
      description: 'Scarcity/limit text below CTA',
      table: {
        defaultValue: { summary: 'Limited to 3 new MVPs per month' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'minimal'],
      description: 'Layout variant',
      table: {
        defaultValue: { summary: 'default' },
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

// Default story
export const Default: Story = {
  args: {},
};

// Compact variant
export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

// Minimal variant
export const Minimal: Story = {
  args: {
    variant: 'minimal',
  },
};

// Blue accent
export const BlueAccent: Story = {
  args: {
    accentColor: 'blue',
    title: 'Enterprise MVP Development',
    subtitle: 'Professional development services for your next big idea',
  },
};

// Magenta accent
export const MagentaAccent: Story = {
  args: {
    accentColor: 'magenta',
    title: 'Creative App Solutions',
    subtitle: 'Turn your vision into reality with our innovative approach',
  },
};

// Red accent
export const RedAccent: Story = {
  args: {
    accentColor: 'red',
    title: 'Limited Time Offer',
    subtitle: 'Special pricing for the first 5 projects this month',
    limitText: 'Only 2 spots remaining!',
  },
};

// Custom pricing
export const CustomPricing: Story = {
  args: {
    price: '$15,000',
    title: 'Premium MVP Package',
    features: [
      'Full-stack MVP development',
      'Advanced AI integration (GPT-4, Claude, etc)',
      'Multi-provider payment processing',
      'Advanced user management & roles',
      'Custom admin dashboard',
      'CI/CD pipeline setup',
      '60 days post-launch support',
      'Complete IP ownership',
      'Performance optimization',
      'Security audit included',
    ],
    paymentSchedule: [
      {
        phase: 'Kickoff',
        amount: '$2,000',
        percentage: '13%',
        description: 'Discovery & architecture',
        icon: 'calendar' as const,
      },
      {
        phase: 'Alpha Release',
        amount: '$6,000',
        percentage: '40%',
        description: 'Core features complete',
        icon: 'creditcard' as const,
      },
      {
        phase: 'Launch',
        amount: '$7,000',
        percentage: '47%',
        description: 'Production-ready delivery',
        icon: 'shield' as const,
      },
    ],
  },
};

// Startup special
export const StartupSpecial: Story = {
  args: {
    price: '$7,500',
    title: 'Startup MVP Special',
    subtitle: 'Perfect for bootstrapped founders and early-stage startups',
    features: [
      'Core MVP features only',
      'Basic AI integration',
      'Simple payment processing',
      'User authentication',
      'Basic admin panel',
      'Deployment assistance',
      '14 days support',
      'Source code included',
    ],
    limitText: 'Special pricing for pre-seed startups',
    accentColor: 'blue',
  },
};

// With custom CTA
export const CustomCTA: Story = {
  args: {
    ctaText: 'Start Building Today →',
    onCtaClick: () => alert('Custom CTA clicked!'),
  },
};

// Agency pricing
export const AgencyPricing: Story = {
  args: {
    title: 'Agency Partnership Pricing',
    subtitle: 'White-label MVP development for agencies',
    price: '$8,000',
    features: [
      'White-label development',
      'Agency branding included',
      'Priority support channel',
      'Flexible tech stack',
      'Documentation included',
      'Training session provided',
      'Ongoing support options',
      'Volume discounts available',
    ],
    guaranteeItems: [
      'Fixed timeline guarantee',
      'Weekly progress reports',
      'Direct developer access',
      'IP transfer included',
      'No hidden fees',
    ],
    ctaText: 'Partner With Us',
  },
};

// No payment schedule (minimal)
export const SimplePrice: Story = {
  args: {
    variant: 'minimal',
    title: 'Quick MVP Development',
    subtitle: 'Get to market fast with our streamlined process',
    price: '$9,999',
    limitText: '',
  },
};

// In dark section
export const OnDarkBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ background: '#1a1a1a', padding: '64px 32px' }}>
        <Story />
      </div>
    ),
  ],
};

// In colored section
export const OnColoredBackground: Story = {
  args: {
    accentColor: 'blue',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#FFF5F0', padding: '64px 32px' }}>
        <Story />
      </div>
    ),
  ],
};

// Landing page context
export const LandingPageContext: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <div style={{ background: '#f5f5f5', padding: '64px 32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Build Your MVP in 4 Weeks
          </h1>
          <p style={{ fontSize: '20px', color: '#666', marginBottom: '48px' }}>
            Stop waiting months for your product. We deliver in weeks.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};