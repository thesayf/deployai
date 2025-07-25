import type { Meta, StoryObj } from '@storybook/nextjs';
import { HeadingH1 } from './HeadingH1';

const meta = {
  title: 'Typography/HeadingH1',
  component: HeadingH1,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Main heading component with multiple neubrutalist variants. Used for page titles and hero sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['hero', 'brutal-outline', 'split-color', 'gradient', 'shadow-stack', 'glitch', 'neon'],
      description: 'Visual variant of the heading',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'red', 'magenta'],
      description: 'Accent color for the heading',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
  args: {
    children: 'Transform Your Ideas Into Reality',
    animate: true,
  },
} satisfies Meta<typeof HeadingH1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  args: {
    variant: 'hero',
    accentColor: 'orange',
    align: 'center',
  },
};

export const BrutalOutline: Story = {
  args: {
    variant: 'brutal-outline',
    accentColor: 'blue',
    children: 'Bold & Impactful',
  },
};

export const SplitColor: Story = {
  args: {
    variant: 'split-color',
    accentColor: 'red',
    children: 'Creative Solutions',
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: 'Future Forward',
  },
};

export const ShadowStack: Story = {
  args: {
    variant: 'shadow-stack',
    accentColor: 'magenta',
    children: 'Stand Out',
  },
};

export const Glitch: Story = {
  args: {
    variant: 'glitch',
    accentColor: 'blue',
    children: 'Digital Edge',
  },
};

export const Neon: Story = {
  args: {
    variant: 'neon',
    accentColor: 'orange',
    children: 'Bright Ideas',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <HeadingH1 variant="hero" accentColor="orange">Hero Variant</HeadingH1>
      <HeadingH1 variant="brutal-outline" accentColor="blue">Brutal Outline</HeadingH1>
      <HeadingH1 variant="split-color" accentColor="red">Split Color</HeadingH1>
      <HeadingH1 variant="gradient">Gradient Style</HeadingH1>
      <HeadingH1 variant="shadow-stack" accentColor="magenta">Shadow Stack</HeadingH1>
      <HeadingH1 variant="glitch" accentColor="blue">Glitch Effect</HeadingH1>
      <HeadingH1 variant="neon" accentColor="orange">Neon Glow</HeadingH1>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <HeadingH1 variant="hero" align="left">Left Aligned</HeadingH1>
      <HeadingH1 variant="hero" align="center">Center Aligned</HeadingH1>
      <HeadingH1 variant="hero" align="right">Right Aligned</HeadingH1>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <HeadingH1 variant="hero" accentColor="orange">Orange Accent</HeadingH1>
      <HeadingH1 variant="hero" accentColor="blue">Blue Accent</HeadingH1>
      <HeadingH1 variant="hero" accentColor="red">Red Accent</HeadingH1>
      <HeadingH1 variant="hero" accentColor="magenta">Magenta Accent</HeadingH1>
      <HeadingH1 variant="hero" accentColor="orange">Yellow Accent</HeadingH1>
      <HeadingH1 variant="hero" accentColor="blue">Cyan Accent</HeadingH1>
    </div>
  ),
};