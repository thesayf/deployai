import type { Meta, StoryObj } from '@storybook/nextjs';
import { StatsMetrics } from './StatsMetrics';

const meta: Meta<typeof StatsMetrics> = {
  title: 'Components/StatsMetrics',
  component: StatsMetrics,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Stats/Metrics Display - Neubrutalist Component

A bold, dynamic stats display component with animated counters and multiple layout variants in our signature neubrutalist design system.

## Design System Features

### Neubrutalist Aesthetics
- **Sharp edges** - No rounded corners
- **Bold 3px borders** with 6px shadows  
- **Gradient accent bar** on each stat card
- **Brutal hover effects** with transform animations

### Typography
- **Large display numbers** with animated counting
- **Uppercase labels** for emphasis
- **Clear hierarchy** from value to description
- **Consistent spacing** throughout

### Interactive Elements
- **Animated counters** with easing functions
- **Hover effects** on all cards with depth changes
- **Intersection observer** for scroll-triggered animations
- **Staggered entrance** animations

## Variants

### Grid (default)
Responsive grid layout that adapts from 1 to 4 columns based on screen size.

### Cards
Two-column card layout with centered content and icons above values.

### Minimal
Simple text-only layout focusing on the numbers without cards.

### Featured
First stat is prominently displayed in a larger card spanning 2 columns and rows.

## Animation Features

### Counter Animation
- **Smooth easing** with custom easeOutQuart function
- **Duration control** per stat item
- **Number parsing** from strings with prefixes/suffixes
- **Scroll trigger** using intersection observer

### Motion Effects
- **Staggered children** for sequential appearance
- **Spring physics** for natural movement
- **Transform on hover** for depth perception

## Icon Library

Built-in icon set includes:
- **TrendingUp** - Growth and increase metrics
- **Users** - User/customer related stats
- **Rocket** - Launch and performance metrics
- **Star** - Ratings and achievements
- **Chart** - Analytics and data
- **Clock** - Time-based metrics

## Color Options

### Orange (default)
Electric orange for high-energy metrics.

### Blue
Cyber blue for professional dashboards.

### Magenta
Deep magenta for creative metrics.

### Red
Crimson red for urgent or important stats.

### Emerald
Success green for positive metrics.

### Amber
Warning amber for attention metrics.

## Usage Guidelines

### Placement
- **Landing pages** - Key metrics above the fold
- **Dashboards** - Primary KPI display
- **About pages** - Company achievements
- **Case studies** - Project results

### Content Tips
- Keep labels concise (2-3 words)
- Use prefixes ($, +, etc) for context
- Include descriptions for complex metrics
- Group related stats together
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stats: {
      control: 'object',
      description: 'Array of stat items to display',
    },
    title: {
      control: 'text',
      description: 'Section title',
      table: {
        defaultValue: { summary: '' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle',
      table: {
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: 'select',
      options: ['grid', 'cards', 'minimal', 'featured'],
      description: 'Display variant',
      table: {
        defaultValue: { summary: 'grid' },
      },
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns in grid',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons with stats',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    animateOnScroll: {
      control: 'boolean',
      description: 'Trigger animations when scrolled into view',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    stats: [
      {
        id: '1',
        value: 10000,
        label: 'Active Users',
        description: 'Monthly active users',
        icon: 'users',
        prefix: '+',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 98.5,
        label: 'Uptime',
        description: 'System reliability',
        icon: 'rocket',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
      {
        id: '3',
        value: 4.9,
        label: 'Rating',
        description: 'Average user rating',
        icon: 'star',
        suffix: '/5',
        color: 'amber',
        animate: true,
      },
    ],
  },
};

// With title and subtitle
export const WithHeader: Story = {
  args: {
    title: 'By The Numbers',
    subtitle: 'Our impact and achievements in measurable results',
    stats: [
      {
        id: '1',
        value: 150000,
        label: 'Happy Customers',
        icon: 'users',
        color: 'blue',
        animate: true,
      },
      {
        id: '2',
        value: 500,
        label: 'Projects Completed',
        icon: 'rocket',
        prefix: '+',
        color: 'magenta',
        animate: true,
      },
      {
        id: '3',
        value: 99.9,
        label: 'Client Satisfaction',
        icon: 'star',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
      {
        id: '4',
        value: 24,
        label: 'Support Available',
        icon: 'clock',
        suffix: '/7',
        color: 'amber',
        animate: true,
      },
    ],
    columns: 4,
  },
};

// Cards variant
export const CardsVariant: Story = {
  args: {
    variant: 'cards',
    stats: [
      {
        id: '1',
        value: '$2.5M',
        label: 'Revenue Generated',
        description: 'For our clients in 2024',
        icon: 'trending',
        color: 'orange',
        animate: false, // String value, no animation
      },
      {
        id: '2',
        value: 85,
        label: 'Team Members',
        description: 'Across 12 countries',
        icon: 'users',
        prefix: '+',
        color: 'blue',
        animate: true,
      },
    ],
  },
};

// Minimal variant
export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    stats: [
      {
        id: '1',
        value: 1234567,
        label: 'Downloads',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 98765,
        label: 'Active Users',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 4321,
        label: 'Reviews',
        color: 'magenta',
        animate: true,
      },
    ],
    showIcons: false,
  },
};

// Featured variant
export const FeaturedVariant: Story = {
  args: {
    variant: 'featured',
    title: 'Platform Statistics',
    stats: [
      {
        id: '1',
        value: 1000000,
        label: 'Total Users',
        description: 'Registered accounts on our platform',
        icon: 'users',
        prefix: '+',
        color: 'orange',
        animate: true,
        animationDuration: 3000,
      },
      {
        id: '2',
        value: 50000,
        label: 'Daily Active',
        icon: 'trending',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 15000,
        label: 'Premium Users',
        icon: 'star',
        color: 'magenta',
        animate: true,
      },
    ],
  },
};

// Financial metrics
export const FinancialMetrics: Story = {
  args: {
    title: 'Financial Performance',
    stats: [
      {
        id: '1',
        value: 5200000,
        label: 'Annual Revenue',
        description: 'FY 2024',
        icon: 'chart',
        prefix: '$',
        color: 'emerald',
        animate: true,
        animationDuration: 2500,
      },
      {
        id: '2',
        value: 35,
        label: 'Growth Rate',
        description: 'Year over year',
        icon: 'trending',
        prefix: '+',
        suffix: '%',
        color: 'orange',
        animate: true,
      },
      {
        id: '3',
        value: 180,
        label: 'Enterprise Clients',
        description: 'Fortune 500 companies',
        icon: 'users',
        color: 'blue',
        animate: true,
      },
    ],
  },
};

// Performance metrics
export const PerformanceMetrics: Story = {
  args: {
    variant: 'cards',
    title: 'System Performance',
    stats: [
      {
        id: '1',
        value: 23,
        label: 'Response Time',
        description: 'Average API response',
        icon: 'clock',
        suffix: 'ms',
        color: 'emerald',
        animate: true,
      },
      {
        id: '2',
        value: 99.99,
        label: 'Uptime SLA',
        description: 'Last 90 days',
        icon: 'rocket',
        suffix: '%',
        color: 'blue',
        animate: true,
      },
    ],
  },
};

// Marketing metrics
export const MarketingMetrics: Story = {
  args: {
    stats: [
      {
        id: '1',
        value: 2500000,
        label: 'Page Views',
        icon: 'chart',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 3.5,
        label: 'Avg. Session',
        icon: 'clock',
        suffix: ' min',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 68,
        label: 'Conversion Rate',
        icon: 'trending',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
      {
        id: '4',
        value: 450,
        label: 'Social Shares',
        icon: 'users',
        suffix: 'K',
        color: 'magenta',
        animate: true,
      },
    ],
    columns: 4,
  },
};

// No animation
export const NoAnimation: Story = {
  args: {
    animateOnScroll: false,
    stats: [
      {
        id: '1',
        value: 1000,
        label: 'Instant Display',
        icon: 'rocket',
        animate: false,
      },
      {
        id: '2',
        value: 2000,
        label: 'No Animation',
        icon: 'users',
        animate: false,
      },
      {
        id: '3',
        value: 3000,
        label: 'Static Values',
        icon: 'chart',
        animate: false,
      },
    ],
  },
};

// Mixed colors
export const MixedColors: Story = {
  args: {
    title: 'Diverse Metrics',
    stats: [
      {
        id: '1',
        value: 100,
        label: 'Orange Stat',
        icon: 'trending',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 200,
        label: 'Blue Stat',
        icon: 'users',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 300,
        label: 'Magenta Stat',
        icon: 'rocket',
        color: 'magenta',
        animate: true,
      },
      {
        id: '4',
        value: 400,
        label: 'Red Stat',
        icon: 'star',
        color: 'red',
        animate: true,
      },
      {
        id: '5',
        value: 500,
        label: 'Emerald Stat',
        icon: 'chart',
        color: 'emerald',
        animate: true,
      },
      {
        id: '6',
        value: 600,
        label: 'Amber Stat',
        icon: 'clock',
        color: 'amber',
        animate: true,
      },
    ],
    columns: 3,
  },
};

// Two column layout
export const TwoColumns: Story = {
  args: {
    columns: 2,
    stats: [
      {
        id: '1',
        value: 50,
        label: 'First Half',
        icon: 'chart',
        suffix: '%',
        color: 'blue',
        animate: true,
      },
      {
        id: '2',
        value: 50,
        label: 'Second Half',
        icon: 'chart',
        suffix: '%',
        color: 'orange',
        animate: true,
      },
    ],
  },
};

// Long animation
export const LongAnimation: Story = {
  args: {
    stats: [
      {
        id: '1',
        value: 1000000,
        label: 'Slow Counter',
        description: '5 second animation',
        icon: 'clock',
        color: 'blue',
        animate: true,
        animationDuration: 5000,
      },
      {
        id: '2',
        value: 999,
        label: 'Fast Counter',
        description: '0.5 second animation',
        icon: 'rocket',
        color: 'orange',
        animate: true,
        animationDuration: 500,
      },
    ],
  },
};

// On dark background
export const OnDarkBackground: Story = {
  args: {
    stats: Default.args?.stats,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1a1a1a', padding: '64px 32px' }}>
        <Story />
      </div>
    ),
  ],
};

// In dashboard context
export const DashboardContext: Story = {
  args: {
    title: 'Dashboard Overview',
    stats: [
      {
        id: '1',
        value: 12543,
        label: 'Total Orders',
        icon: 'chart',
        color: 'blue',
        animate: true,
      },
      {
        id: '2',
        value: 98765,
        label: 'Revenue',
        icon: 'trending',
        prefix: '$',
        color: 'emerald',
        animate: true,
      },
      {
        id: '3',
        value: 4.8,
        label: 'Customer Rating',
        icon: 'star',
        suffix: '/5',
        color: 'amber',
        animate: true,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f5f5f5', padding: '32px' }}>
        <div style={{ background: 'white', padding: '32px', border: '1px solid #e0e0e0' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};