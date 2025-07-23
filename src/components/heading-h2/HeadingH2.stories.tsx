import type { Meta, StoryObj } from '@storybook/nextjs';
import { HeadingH2 } from './HeadingH2';

const meta = {
  title: 'Typography/HeadingH2',
  component: HeadingH2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The heading text content',
      defaultValue: 'Build Your MVP in 4 Weeks',
    },
    variant: {
      control: 'select',
      options: ['default', 'side-accent', 'underline-brutal', 'box-shadow', 'bracket', 'gradient-text', 'split-bg', 'offset-border', 'stamp', 'slash'],
      description: 'Visual style variant',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color for highlights',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xl'],
      description: 'Text size preset',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    animate: {
      control: 'boolean',
      description: 'Enable entrance animation',
    },
  },
} satisfies Meta<typeof HeadingH2>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant
export const Default: Story = {
  args: {
    children: 'Build Your MVP in 4 Weeks',
    variant: 'default',
    accentColor: 'orange',
    size: 'large',
    align: 'left',
    animate: true,
  },
};

// Side Accent variant
export const SideAccent: Story = {
  args: {
    children: 'Real People, Real Impact',
    variant: 'side-accent',
    accentColor: 'orange',
    size: 'large',
    align: 'left',
    animate: true,
  },
};

// Underline Brutal variant
export const UnderlineBrutal: Story = {
  args: {
    children: 'Our Process',
    variant: 'underline-brutal',
    accentColor: 'blue',
    size: 'large',
    align: 'center',
    animate: true,
  },
};

// Box Shadow variant
export const BoxShadow: Story = {
  args: {
    children: 'Success Stories',
    variant: 'box-shadow',
    accentColor: 'magenta',
    size: 'xl',
    align: 'center',
    animate: true,
  },
};

// Bracket variant
export const Bracket: Story = {
  args: {
    children: 'Featured Projects',
    variant: 'bracket',
    accentColor: 'red',
    size: 'large',
    align: 'center',
    animate: true,
  },
};

// Gradient Text variant
export const GradientText: Story = {
  args: {
    children: 'Transform Your Business',
    variant: 'gradient-text',
    accentColor: 'orange',
    size: 'xl',
    align: 'center',
    animate: true,
  },
};

// Split Background variant
export const SplitBackground: Story = {
  args: {
    children: 'Innovation Starts Here',
    variant: 'split-bg',
    accentColor: 'blue',
    size: 'large',
    align: 'center',
    animate: true,
  },
};

// Offset Border variant
export const OffsetBorder: Story = {
  args: {
    children: 'Get Started Today',
    variant: 'offset-border',
    accentColor: 'orange',
    size: 'large',
    align: 'center',
    animate: true,
  },
};

// Stamp variant
export const Stamp: Story = {
  args: {
    children: 'Limited Time',
    variant: 'stamp',
    accentColor: 'red',
    size: 'medium',
    align: 'center',
    animate: true,
  },
};

// Slash variant
export const Slash: Story = {
  args: {
    children: 'Tech Stack',
    variant: 'slash',
    accentColor: 'blue',
    size: 'large',
    align: 'center',
    animate: true,
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '64px',
      padding: '48px',
      background: '#FFFFFF',
      minWidth: '800px',
    }}>
      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>DEFAULT</p>
        <HeadingH2 variant="default" accentColor="orange" size="large">
          Build Your MVP in 4 Weeks
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>SIDE ACCENT</p>
        <HeadingH2 variant="side-accent" accentColor="blue" size="large">
          Real People, Real Impact
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>UNDERLINE BRUTAL</p>
        <HeadingH2 variant="underline-brutal" accentColor="magenta" size="large">
          Our Process
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>BOX SHADOW</p>
        <HeadingH2 variant="box-shadow" accentColor="red" size="large">
          Success Stories
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>BRACKET</p>
        <HeadingH2 variant="bracket" accentColor="orange" size="large">
          Featured Projects
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>GRADIENT TEXT</p>
        <HeadingH2 variant="gradient-text" accentColor="blue" size="large">
          Transform Your Business
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>SPLIT BACKGROUND</p>
        <HeadingH2 variant="split-bg" accentColor="magenta" size="large">
          Innovation Starts Here
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>OFFSET BORDER</p>
        <HeadingH2 variant="offset-border" accentColor="red" size="large">
          Get Started Today
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>STAMP</p>
        <HeadingH2 variant="stamp" accentColor="orange" size="large">
          Limited Time Offer
        </HeadingH2>
      </div>

      <div>
        <p style={{ marginBottom: '16px', color: '#757575', fontSize: '14px' }}>SLASH</p>
        <HeadingH2 variant="slash" accentColor="blue" size="large">
          Tech Stack
        </HeadingH2>
      </div>
    </div>
  ),
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '32px',
      padding: '48px',
      background: '#FFFFFF',
    }}>
      <HeadingH2 variant="side-accent" accentColor="orange" size="small">
        Small Heading Size
      </HeadingH2>
      <HeadingH2 variant="side-accent" accentColor="orange" size="medium">
        Medium Heading Size
      </HeadingH2>
      <HeadingH2 variant="side-accent" accentColor="orange" size="large">
        Large Heading Size
      </HeadingH2>
      <HeadingH2 variant="side-accent" accentColor="orange" size="xl">
        Extra Large Heading Size
      </HeadingH2>
    </div>
  ),
};

// Color Variations
export const ColorVariations: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '48px',
      padding: '48px',
      background: '#FFFFFF',
    }}>
      <HeadingH2 variant="underline-brutal" accentColor="orange" size="large">
        Orange Accent Color
      </HeadingH2>
      <HeadingH2 variant="underline-brutal" accentColor="blue" size="large">
        Blue Accent Color
      </HeadingH2>
      <HeadingH2 variant="underline-brutal" accentColor="magenta" size="large">
        Magenta Accent Color
      </HeadingH2>
      <HeadingH2 variant="underline-brutal" accentColor="red" size="large">
        Red Accent Color
      </HeadingH2>
    </div>
  ),
};

// Context Examples
export const ContextExamples: Story = {
  name: 'In Context',
  render: () => (
    <div style={{ 
      padding: '48px',
      background: '#FFFFFF',
      maxWidth: '1200px',
    }}>
      {/* Hero Section */}
      <section style={{ marginBottom: '80px' }}>
        <HeadingH2 variant="gradient-text" accentColor="orange" size="xl" align="center">
          Build Your MVP in 4 Weeks
        </HeadingH2>
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#757575', maxWidth: '600px', margin: '24px auto 0' }}>
          Stop overthinking. Start building. Get your product to market before your competitors even finish their planning meetings.
        </p>
      </section>

      {/* Features Section */}
      <section style={{ marginBottom: '80px' }}>
        <HeadingH2 variant="side-accent" accentColor="blue" size="large">
          Why Choose DeployAI?
        </HeadingH2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '48px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ padding: '24px', background: '#F5F5F5', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Feature {i}</h3>
              <p style={{ color: '#757575' }}>Description of the amazing feature that will transform your business.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section style={{ marginBottom: '80px' }}>
        <HeadingH2 variant="underline-brutal" accentColor="magenta" size="large" align="center">
          Our Process
        </HeadingH2>
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ color: '#757575', maxWidth: '600px', margin: '0 auto' }}>
            From idea to launch in 4 weeks. No delays, no excuses, just results.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#212121', padding: '48px', margin: '-48px', color: 'white' }}>
        <HeadingH2 variant="stamp" accentColor="red" size="large" align="center">
          Limited Spots Available
        </HeadingH2>
        <p style={{ textAlign: 'center', marginTop: '24px', opacity: 0.9 }}>
          We only take on 3 new projects per month to ensure quality delivery.
        </p>
      </section>
    </div>
  ),
};

// Recommendations Guide
export const RecommendationsGuide: Story = {
  name: 'Usage Recommendations',
  render: () => (
    <div style={{ 
      padding: '48px',
      background: '#FFFFFF',
      maxWidth: '1200px',
    }}>
      <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '48px' }}>
        H2 Variant Usage Guide
      </h3>

      <div style={{ display: 'grid', gap: '48px' }}>
        <div style={{ padding: '32px', background: '#F5F5F5', border: '3px solid #000' }}>
          <HeadingH2 variant="default" accentColor="orange" size="medium">
            Default - Clean & Simple
          </HeadingH2>
          <p style={{ marginTop: '16px', color: '#757575' }}>
            <strong>Best for:</strong> Body sections, straightforward content<br />
            <strong>Use when:</strong> You want minimal visual impact<br />
            <strong>Avoid when:</strong> You need to grab attention
          </p>
        </div>

        <div style={{ padding: '32px', background: '#F5F5F5', border: '3px solid #000' }}>
          <HeadingH2 variant="side-accent" accentColor="blue" size="medium">
            Side Accent - Professional
          </HeadingH2>
          <p style={{ marginTop: '16px', color: '#757575' }}>
            <strong>Best for:</strong> Feature lists, process steps<br />
            <strong>Use when:</strong> Creating visual hierarchy<br />
            <strong>Avoid when:</strong> Centering content
          </p>
        </div>

        <div style={{ padding: '32px', background: '#F5F5F5', border: '3px solid #000' }}>
          <HeadingH2 variant="underline-brutal" accentColor="magenta" size="medium">
            Underline Brutal - Bold Statement
          </HeadingH2>
          <p style={{ marginTop: '16px', color: '#757575' }}>
            <strong>Best for:</strong> Section dividers, key messages<br />
            <strong>Use when:</strong> You want strong visual separation<br />
            <strong>Avoid when:</strong> Space is limited
          </p>
        </div>

        <div style={{ padding: '32px', background: '#F5F5F5', border: '3px solid #000' }}>
          <HeadingH2 variant="gradient-text" accentColor="orange" size="medium">
            Gradient Text - High Impact
          </HeadingH2>
          <p style={{ marginTop: '16px', color: '#757575' }}>
            <strong>Best for:</strong> Hero sections, CTAs<br />
            <strong>Use when:</strong> You need maximum attention<br />
            <strong>Avoid when:</strong> Using with busy backgrounds
          </p>
        </div>

        <div style={{ padding: '32px', background: '#212121', border: '3px solid #000', color: 'white' }}>
          <HeadingH2 variant="stamp" accentColor="red" size="medium">
            Stamp - Urgent/Special
          </HeadingH2>
          <p style={{ marginTop: '16px', opacity: 0.9 }}>
            <strong>Best for:</strong> Limited offers, announcements<br />
            <strong>Use when:</strong> Creating urgency<br />
            <strong>Avoid when:</strong> Regular content sections
          </p>
        </div>
      </div>
    </div>
  ),
};