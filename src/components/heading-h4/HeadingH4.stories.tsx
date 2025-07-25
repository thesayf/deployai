import type { Meta, StoryObj } from '@storybook/nextjs';
import { HeadingH4 } from './HeadingH4';
import { ArrowRight, Star, Check, Zap } from 'lucide-react';

const meta = {
  title: 'Typography/HeadingH4',
  component: HeadingH4,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Subsection heading component for smaller titles, card headers, and feature titles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'caps', 'tag', 'icon-left'],
      description: 'Visual variant of the heading',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'red', 'magenta'],
      description: 'Accent color',
    },
    icon: {
      control: false,
      description: 'Icon component for icon-left variant',
      if: { arg: 'variant', eq: 'icon-left' },
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
  args: {
    children: 'Feature Title',
    animate: true,
  },
} satisfies Meta<typeof HeadingH4>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    accentColor: 'orange',
  },
};

export const Caps: Story = {
  args: {
    variant: 'caps',
    accentColor: 'blue',
    children: 'All Caps Style',
  },
};

export const Tag: Story = {
  args: {
    variant: 'tag',
    accentColor: 'red',
    children: 'Tagged Feature',
  },
};

export const IconLeft: Story = {
  args: {
    variant: 'icon-left',
    accentColor: 'magenta',
    icon: <Star size={20} />,
    children: 'Premium Feature',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <HeadingH4 variant="default" accentColor="orange">Default Style</HeadingH4>
      <HeadingH4 variant="caps" accentColor="blue">Uppercase Style</HeadingH4>
      <HeadingH4 variant="tag" accentColor="red">Tag Style</HeadingH4>
      <HeadingH4 variant="icon-left" icon={<Zap size={20} />} accentColor="magenta">
        Icon Style
      </HeadingH4>
    </div>
  ),
};

export const FeatureList: Story = {
  render: () => (
    <div className="space-y-4">
      <HeadingH4 variant="icon-left" icon={<Check size={20} />} accentColor="blue">
        Easy Integration
      </HeadingH4>
      <HeadingH4 variant="icon-left" icon={<Zap size={20} />} accentColor="orange">
        Lightning Fast
      </HeadingH4>
      <HeadingH4 variant="icon-left" icon={<Star size={20} />} accentColor="orange">
        Premium Support
      </HeadingH4>
      <HeadingH4 variant="icon-left" icon={<ArrowRight size={20} />} accentColor="blue">
        Future Ready
      </HeadingH4>
    </div>
  ),
};

export const CardHeaders: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border-3 border-black p-6" style={{ boxShadow: '4px 4px 0px #000' }}>
        <HeadingH4 variant="tag" accentColor="orange">Starter Plan</HeadingH4>
        <p className="mt-4 text-charcoal">Perfect for small projects</p>
      </div>
      <div className="bg-white border-3 border-black p-6" style={{ boxShadow: '4px 4px 0px #000' }}>
        <HeadingH4 variant="tag" accentColor="blue">Pro Plan</HeadingH4>
        <p className="mt-4 text-charcoal">Best for growing teams</p>
      </div>
      <div className="bg-white border-3 border-black p-6" style={{ boxShadow: '4px 4px 0px #000' }}>
        <HeadingH4 variant="tag" accentColor="red">Enterprise</HeadingH4>
        <p className="mt-4 text-charcoal">Unlimited possibilities</p>
      </div>
    </div>
  ),
};