import type { Meta, StoryObj } from '@storybook/nextjs';
import { StatsMetricsDynamic } from './StatsMetricsDynamic';

const meta: Meta<typeof StatsMetricsDynamic> = {
  title: 'Components/StatsMetricsDynamic',
  component: StatsMetricsDynamic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Dynamic Stats Display - Experimental Layouts

A collection of unconventional, interactive stats display layouts that break away from traditional grid patterns.

## Variants

### Chaos
Stats positioned randomly with mouse-reactive movement and rotation effects.

### Circular
Stats orbit around a central title in a continuous rotation pattern.

### Stack
Overlapping card stack with 3D depth and hover effects.

### Zigzag
Alternating left-right pattern with connecting lines and corner accents.

### Wave
Stats positioned along a flowing wave pattern with floating animations.

### Orbit
Central hero stat with others orbiting in 3D space at different speeds.

## Interactive Features

- **Mouse tracking** in chaos layout
- **Continuous animations** in circular and orbit layouts
- **Hover transformations** on all cards
- **3D perspective** effects
- **Staggered entrance** animations
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
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle',
    },
    variant: {
      control: 'select',
      options: ['chaos', 'circular', 'stack', 'zigzag', 'orbit', 'wave'],
      description: 'Display variant',
      table: {
        defaultValue: { summary: 'chaos' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Chaos layout
export const ChaosLayout: Story = {
  args: {
    variant: 'chaos',
    stats: [
      {
        id: '1',
        value: 10000,
        label: 'Active Users',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 500,
        label: 'Projects',
        prefix: '+',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 98.5,
        label: 'Uptime',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
      {
        id: '4',
        value: 4.9,
        label: 'Rating',
        suffix: '/5',
        color: 'amber',
        animate: true,
      },
      {
        id: '5',
        value: 24,
        label: 'Support',
        suffix: '/7',
        color: 'magenta',
        animate: true,
      },
    ],
  },
};

// Circular layout
export const CircularLayout: Story = {
  args: {
    variant: 'circular',
    title: 'Core Metrics',
    stats: [
      {
        id: '1',
        value: 150000,
        label: 'Total Users',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 85,
        label: 'Countries',
        prefix: '+',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 99.9,
        label: 'Satisfaction',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
      {
        id: '4',
        value: 4.8,
        label: 'App Rating',
        suffix: '/5',
        color: 'amber',
        animate: true,
      },
    ],
  },
};

// Stack layout
export const StackLayout: Story = {
  args: {
    variant: 'stack',
    title: 'Achievement Stack',
    stats: [
      {
        id: '1',
        value: '$5.2M',
        label: 'Annual Revenue',
        description: 'FY 2024 Performance',
        color: 'emerald',
      },
      {
        id: '2',
        value: 250,
        label: 'Team Members',
        description: 'Across 12 offices',
        prefix: '+',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 1000,
        label: 'Happy Clients',
        description: 'And counting',
        prefix: '+',
        color: 'orange',
        animate: true,
      },
      {
        id: '4',
        value: 15,
        label: 'Years Experience',
        description: 'Industry leadership',
        color: 'magenta',
        animate: true,
      },
    ],
  },
};

// Zigzag layout
export const ZigzagLayout: Story = {
  args: {
    variant: 'zigzag',
    title: 'Growth Timeline',
    stats: [
      {
        id: '1',
        value: 2019,
        label: 'Founded',
        color: 'blue',
      },
      {
        id: '2',
        value: 100,
        label: 'First Customers',
        color: 'orange',
        animate: true,
      },
      {
        id: '3',
        value: '$1M',
        label: 'Series A',
        color: 'emerald',
      },
      {
        id: '4',
        value: 10000,
        label: 'Users Milestone',
        color: 'magenta',
        animate: true,
      },
      {
        id: '5',
        value: 'IPO',
        label: '2025 Goal',
        color: 'red',
      },
    ],
  },
};

// Wave layout
export const WaveLayout: Story = {
  args: {
    variant: 'wave',
    title: 'Performance Wave',
    stats: [
      {
        id: '1',
        value: 23,
        label: 'Response',
        suffix: 'ms',
        color: 'emerald',
        animate: true,
      },
      {
        id: '2',
        value: 99.99,
        label: 'Uptime',
        suffix: '%',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 1.2,
        label: 'Load Time',
        suffix: 's',
        color: 'orange',
        animate: true,
      },
      {
        id: '4',
        value: 100,
        label: 'PageSpeed',
        suffix: '/100',
        color: 'amber',
        animate: true,
      },
      {
        id: '5',
        value: 0,
        label: 'Errors',
        color: 'emerald',
        animate: true,
      },
    ],
  },
};

// Orbit layout
export const OrbitLayout: Story = {
  args: {
    variant: 'orbit',
    stats: [
      {
        id: '1',
        value: 1000000,
        label: 'Total Impact',
        prefix: '+',
        color: 'orange',
        animate: true,
        animationDuration: 3000,
      },
      {
        id: '2',
        value: 50,
        label: 'Countries',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 200,
        label: 'Partners',
        prefix: '+',
        color: 'emerald',
        animate: true,
      },
      {
        id: '4',
        value: 24,
        label: 'Languages',
        color: 'magenta',
        animate: true,
      },
    ],
  },
};

// Mixed chaos colors
export const ChaosMixedColors: Story = {
  args: {
    variant: 'chaos',
    stats: [
      {
        id: '1',
        value: 42,
        label: 'Answer',
        color: 'orange',
        animate: true,
      },
      {
        id: '2',
        value: 3.14,
        label: 'Pi',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 404,
        label: 'Not Found',
        color: 'red',
        animate: true,
      },
      {
        id: '4',
        value: 200,
        label: 'OK',
        color: 'emerald',
        animate: true,
      },
      {
        id: '5',
        value: 8,
        label: 'Infinity',
        color: 'magenta',
        animate: true,
      },
      {
        id: '6',
        value: 1337,
        label: 'Elite',
        color: 'amber',
        animate: true,
      },
    ],
  },
};

// Minimal stack
export const MinimalStack: Story = {
  args: {
    variant: 'stack',
    stats: [
      {
        id: '1',
        value: 'A+',
        label: 'Grade',
        color: 'emerald',
      },
      {
        id: '2',
        value: '#1',
        label: 'Rank',
        color: 'amber',
      },
      {
        id: '3',
        value: '5★',
        label: 'Rating',
        color: 'orange',
      },
    ],
  },
};

// Financial orbit
export const FinancialOrbit: Story = {
  args: {
    variant: 'orbit',
    stats: [
      {
        id: '1',
        value: '$10M',
        label: 'Market Cap',
        color: 'emerald',
      },
      {
        id: '2',
        value: 35,
        label: 'P/E Ratio',
        color: 'blue',
        animate: true,
      },
      {
        id: '3',
        value: 8.5,
        label: 'EPS',
        prefix: '$',
        color: 'orange',
        animate: true,
      },
      {
        id: '4',
        value: 2.5,
        label: 'Dividend',
        suffix: '%',
        color: 'amber',
        animate: true,
      },
    ],
  },
};

// Progress zigzag
export const ProgressZigzag: Story = {
  args: {
    variant: 'zigzag',
    stats: [
      {
        id: '1',
        value: 25,
        label: 'Planning',
        suffix: '%',
        color: 'blue',
        animate: true,
      },
      {
        id: '2',
        value: 50,
        label: 'Development',
        suffix: '%',
        color: 'orange',
        animate: true,
      },
      {
        id: '3',
        value: 75,
        label: 'Testing',
        suffix: '%',
        color: 'amber',
        animate: true,
      },
      {
        id: '4',
        value: 100,
        label: 'Complete',
        suffix: '%',
        color: 'emerald',
        animate: true,
      },
    ],
  },
};

// On dark background
export const OnDarkBackground: Story = {
  args: {
    variant: 'chaos',
    stats: ChaosLayout.args?.stats,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1a1a1a', padding: '64px 32px', minHeight: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

// All variants showcase
export const AllVariants: Story = {
  decorators: [
    () => (
      <div className="space-y-32">
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Chaos Layout</h3>
          <StatsMetricsDynamic stats={ChaosLayout.args?.stats || []} variant="chaos" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Circular Layout</h3>
          <StatsMetricsDynamic stats={CircularLayout.args?.stats || []} variant="circular" title={CircularLayout.args?.title} />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Stack Layout</h3>
          <StatsMetricsDynamic stats={StackLayout.args?.stats || []} variant="stack" title={StackLayout.args?.title} />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Zigzag Layout</h3>
          <StatsMetricsDynamic stats={ZigzagLayout.args?.stats || []} variant="zigzag" title={ZigzagLayout.args?.title} />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Wave Layout</h3>
          <StatsMetricsDynamic stats={WaveLayout.args?.stats || []} variant="wave" title={WaveLayout.args?.title} />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Orbit Layout</h3>
          <StatsMetricsDynamic stats={OrbitLayout.args?.stats || []} variant="orbit" />
        </div>
      </div>
    ),
  ],
};