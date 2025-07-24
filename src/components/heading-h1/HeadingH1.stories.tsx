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
    accent: {
      control: 'select',
      options: ['orange', 'blue', 'red', 'magenta', 'yellow', 'cyan'],
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
    responsive: {
      control: 'boolean',
      description: 'Enable responsive text sizing',
    },
  },
  args: {
    children: 'Transform Your Ideas Into Reality',
    animate: true,
    responsive: true,
  },
} satisfies Meta<typeof HeadingH1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  args: {
    variant: 'hero',
    accent: 'orange',
    align: 'center',
  },
};

export const BrutalOutline: Story = {
  args: {
    variant: 'brutal-outline',
    accent: 'blue',
    children: 'Bold & Impactful',
  },
};

export const SplitColor: Story = {
  args: {
    variant: 'split-color',
    accent: 'red',
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
    accent: 'magenta',
    children: 'Stand Out',
  },
};

export const Glitch: Story = {
  args: {
    variant: 'glitch',
    accent: 'cyan',
    children: 'Digital Edge',
  },
};

export const Neon: Story = {
  args: {
    variant: 'neon',
    accent: 'yellow',
    children: 'Bright Ideas',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <HeadingH1 variant="hero" accent="orange">Hero Variant</HeadingH1>
      <HeadingH1 variant="brutal-outline" accent="blue">Brutal Outline</HeadingH1>
      <HeadingH1 variant="split-color" accent="red">Split Color</HeadingH1>
      <HeadingH1 variant="gradient">Gradient Style</HeadingH1>
      <HeadingH1 variant="shadow-stack" accent="magenta">Shadow Stack</HeadingH1>
      <HeadingH1 variant="glitch" accent="cyan">Glitch Effect</HeadingH1>
      <HeadingH1 variant="neon" accent="yellow">Neon Glow</HeadingH1>
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
      <HeadingH1 variant="hero" accent="orange">Orange Accent</HeadingH1>
      <HeadingH1 variant="hero" accent="blue">Blue Accent</HeadingH1>
      <HeadingH1 variant="hero" accent="red">Red Accent</HeadingH1>
      <HeadingH1 variant="hero" accent="magenta">Magenta Accent</HeadingH1>
      <HeadingH1 variant="hero" accent="yellow">Yellow Accent</HeadingH1>
      <HeadingH1 variant="hero" accent="cyan">Cyan Accent</HeadingH1>
    </div>
  ),
};