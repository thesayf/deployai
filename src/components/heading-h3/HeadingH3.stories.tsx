import type { Meta, StoryObj } from '@storybook/nextjs';
import { HeadingH3 } from './HeadingH3';

const meta = {
  title: 'Typography/HeadingH3',
  component: HeadingH3,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Section heading component with decorative neubrutalist variants. Perfect for breaking up content sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pill', 'arrow', 'badge', 'underline', 'numbered'],
      description: 'Visual variant of the heading',
    },
    accent: {
      control: 'select',
      options: ['orange', 'blue', 'red', 'magenta', 'yellow', 'cyan'],
      description: 'Accent color for decorative elements',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    number: {
      control: 'text',
      description: 'Number prefix for numbered variant',
      if: { arg: 'variant', eq: 'numbered' },
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
  args: {
    children: 'Section Heading',
    animate: true,
  },
} satisfies Meta<typeof HeadingH3>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    accent: 'orange',
  },
};

export const Pill: Story = {
  args: {
    variant: 'pill',
    accent: 'blue',
    children: 'Featured Section',
  },
};

export const Arrow: Story = {
  args: {
    variant: 'arrow',
    accent: 'red',
    children: 'Next Steps',
  },
};

export const Badge: Story = {
  args: {
    variant: 'badge',
    accent: 'magenta',
    children: 'Hot Features',
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    accent: 'yellow',
    children: 'Key Benefits',
  },
};

export const Numbered: Story = {
  args: {
    variant: 'numbered',
    number: '01',
    accent: 'cyan',
    children: 'Step One',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <HeadingH3 variant="default" accent="orange">Default Style</HeadingH3>
      <HeadingH3 variant="pill" accent="blue">Pill Badge Style</HeadingH3>
      <HeadingH3 variant="arrow" accent="red">Arrow Indicator</HeadingH3>
      <HeadingH3 variant="badge" accent="magenta">Badge Style</HeadingH3>
      <HeadingH3 variant="underline" accent="yellow">Underline Style</HeadingH3>
      <HeadingH3 variant="numbered" number="01" accent="cyan">Numbered Style</HeadingH3>
    </div>
  ),
};

export const ProcessSteps: Story = {
  render: () => (
    <div className="space-y-8">
      <HeadingH3 variant="numbered" number="01" accent="orange">Discovery Phase</HeadingH3>
      <HeadingH3 variant="numbered" number="02" accent="blue">Design & Planning</HeadingH3>
      <HeadingH3 variant="numbered" number="03" accent="red">Development</HeadingH3>
      <HeadingH3 variant="numbered" number="04" accent="magenta">Testing & Launch</HeadingH3>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <HeadingH3 variant="pill" align="left">Left Aligned</HeadingH3>
      <HeadingH3 variant="pill" align="center">Center Aligned</HeadingH3>
      <HeadingH3 variant="pill" align="right">Right Aligned</HeadingH3>
    </div>
  ),
};