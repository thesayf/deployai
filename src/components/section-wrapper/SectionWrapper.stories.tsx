import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionWrapper } from './SectionWrapper';

const meta: Meta<typeof SectionWrapper> = {
  title: 'Components/SectionWrapper',
  component: SectionWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Section Wrapper - Background & Spacing System

A flexible wrapper component that provides consistent spacing and background variations for landing page sections.

## Background Variants

### Soft Colors
- **warmPeach** (#FFF5F0) - Soft peach for friendly sections
- **coolMint** (#F0FFF5) - Light mint for fresh feeling
- **skyBlue** (#F0F5FF) - Professional light blue
- **lavender** (#F5F0FF) - Creative light purple
- **concrete** (#F5F5F5) - Neutral gray for separation

### Bold Options
- **dark** (#212121) - High contrast with white text
- **gradient** - Orange to red gradient
- **custom** - Any custom background via prop

## Spacing Options
- **none** - No padding
- **small** - py-8 px-4 (Compact sections)
- **medium** - py-16 px-4 (Default)
- **large** - py-24 px-4 (Hero sections)

## Width Options
- **full** - Full width, no container
- **container** - max-w-7xl (Default)
- **narrow** - max-w-4xl

## Responsive Behavior
Padding adjusts across breakpoints:
- Mobile: px-4
- Tablet: px-6  
- Desktop: px-8

## Usage Guidelines

### Background Patterns
1. **Alternate backgrounds** between sections for visual rhythm
2. **Never place two dark sections** adjacent
3. **Use gradients sparingly** (1-2 per page max)
4. **White backgrounds** make brutal cards pop

### Spacing Recommendations
- **Hero sections**: Use 'large' spacing
- **Content sections**: Use 'medium' spacing (default)
- **Compact sections**: Use 'small' for stats, logos
- **Dense layouts**: Use 'none' and handle internally
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warmPeach', 'coolMint', 'skyBlue', 'lavender', 'concrete', 'dark', 'gradient', 'custom'],
      description: 'Background color variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    customBg: {
      control: 'text',
      description: 'Custom background (CSS value) when variant="custom"',
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Vertical and horizontal spacing',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    width: {
      control: 'select',
      options: ['full', 'container', 'narrow'],
      description: 'Content width constraint',
      table: {
        defaultValue: { summary: 'container' },
      },
    },
    id: {
      control: 'text',
      description: 'Section ID for anchor links',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for demos
const DemoContent = ({ title, description }: { title: string; description: string }) => (
  <div className="text-center">
    <h2 className="text-3xl font-black mb-4" style={{ textShadow: '3px 3px 0px #FF6B35' }}>
      {title}
    </h2>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      {description}
    </p>
    <div className="inline-flex gap-4">
      <div 
        className="bg-white px-8 py-4 font-bold border-4 border-black"
        style={{ boxShadow: '6px 6px 0px #000' }}
      >
        Sample Card
      </div>
      <div 
        className="bg-white px-8 py-4 font-bold border-4 border-black"
        style={{ boxShadow: '6px 6px 0px #FF6B35' }}
      >
        Another Card
      </div>
    </div>
  </div>
);

// Default white background
export const Default: Story = {
  args: {
    children: <DemoContent title="Default White Background" description="Clean white background for primary content sections" />,
  },
};

// Warm Peach
export const WarmPeach: Story = {
  args: {
    variant: 'warmPeach',
    children: <DemoContent title="Warm Peach Background" description="Soft and inviting, perfect for testimonials or features" />,
  },
};

// Cool Mint
export const CoolMint: Story = {
  args: {
    variant: 'coolMint',
    children: <DemoContent title="Cool Mint Background" description="Fresh and modern, great for process or benefit sections" />,
  },
};

// Sky Blue
export const SkyBlue: Story = {
  args: {
    variant: 'skyBlue',
    children: <DemoContent title="Sky Blue Background" description="Professional and trustworthy, ideal for stats or credentials" />,
  },
};

// Lavender
export const Lavender: Story = {
  args: {
    variant: 'lavender',
    children: <DemoContent title="Lavender Background" description="Creative and unique, perfect for innovation-focused content" />,
  },
};

// Concrete
export const Concrete: Story = {
  args: {
    variant: 'concrete',
    children: <DemoContent title="Concrete Background" description="Neutral gray for subtle section separation" />,
  },
};

// Dark
export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-black mb-4 text-white" style={{ textShadow: '3px 3px 0px #FF6B35' }}>
          Dark Background
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          High contrast for CTAs and important announcements
        </p>
        <button 
          className="bg-orange-500 text-white px-8 py-4 font-bold border-4 border-black"
          style={{ boxShadow: '6px 6px 0px #000' }}
        >
          Call to Action
        </button>
      </div>
    ),
  },
};

// Gradient
export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: <DemoContent title="Gradient Background" description="Subtle orange to red gradient adds energy" />,
  },
};

// Custom Background
export const CustomBackground: Story = {
  args: {
    variant: 'custom',
    customBg: 'linear-gradient(135deg, #457B9D 0%, #D62598 100%)',
    children: (
      <div className="text-center text-white">
        <h2 className="text-3xl font-black mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
          Custom Gradient
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          Any custom background via the customBg prop
        </p>
      </div>
    ),
  },
};

// Spacing Variations
export const SpacingSmall: Story = {
  args: {
    variant: 'warmPeach',
    spacing: 'small',
    children: <DemoContent title="Small Spacing (py-8)" description="Compact sections for dense layouts" />,
  },
};

export const SpacingMedium: Story = {
  args: {
    variant: 'coolMint',
    spacing: 'medium',
    children: <DemoContent title="Medium Spacing (py-16)" description="Default spacing for most sections" />,
  },
};

export const SpacingLarge: Story = {
  args: {
    variant: 'skyBlue',
    spacing: 'large',
    children: <DemoContent title="Large Spacing (py-24)" description="Generous spacing for hero sections" />,
  },
};

export const SpacingNone: Story = {
  args: {
    variant: 'concrete',
    spacing: 'none',
    children: (
      <div className="py-16">
        <DemoContent title="No Wrapper Spacing" description="Content handles its own padding" />
      </div>
    ),
  },
};

// Width Variations
export const FullWidth: Story = {
  args: {
    variant: 'gradient',
    width: 'full',
    children: (
      <div className="text-center px-4">
        <h2 className="text-3xl font-black mb-4">Full Width Layout</h2>
        <p className="text-lg">Content spans edge to edge (with internal padding)</p>
      </div>
    ),
  },
};

export const NarrowWidth: Story = {
  args: {
    variant: 'lavender',
    width: 'narrow',
    children: <DemoContent title="Narrow Container" description="max-w-4xl for focused content sections" />,
  },
};

// Responsive Demo
export const ResponsiveDemo: Story = {
  args: {
    variant: 'warmPeach',
    children: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Responsive Padding Demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border-2 border-black">
            <strong>Mobile</strong><br/>
            px-4 (16px)
          </div>
          <div className="p-4 bg-white border-2 border-black">
            <strong>Tablet</strong><br/>
            px-6 (24px)
          </div>
          <div className="p-4 bg-white border-2 border-black">
            <strong>Desktop</strong><br/>
            px-8 (32px)
          </div>
        </div>
      </div>
    ),
  },
};

// Pattern Example
export const AlternatingPattern: Story = {
  decorators: [
    () => (
      <div>
        <SectionWrapper variant="default">
          <DemoContent title="Section 1: White" description="Start with clean white" />
        </SectionWrapper>
        <SectionWrapper variant="warmPeach">
          <DemoContent title="Section 2: Warm Peach" description="Add visual interest" />
        </SectionWrapper>
        <SectionWrapper variant="default">
          <DemoContent title="Section 3: White" description="Return to white for contrast" />
        </SectionWrapper>
        <SectionWrapper variant="skyBlue">
          <DemoContent title="Section 4: Sky Blue" description="Another accent color" />
        </SectionWrapper>
        <SectionWrapper variant="dark" spacing="large">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-4 text-white">Final CTA: Dark</h2>
            <button className="bg-orange-500 text-white px-8 py-4 font-bold">
              Get Started
            </button>
          </div>
        </SectionWrapper>
      </div>
    ),
  ],
};

// Mobile View
export const MobileView: Story = {
  args: {
    variant: 'coolMint',
    children: <DemoContent title="Mobile Viewport" description="Test responsive behavior at 375px width" />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};