import type { Meta, StoryObj } from '@storybook/nextjs';
import { Caption } from './Caption';
import { Calendar, Clock, User, Tag } from 'lucide-react';

const meta = {
  title: 'Typography/Caption',
  component: Caption,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Small text component for captions, metadata, labels, and timestamps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'meta', 'label', 'timestamp'],
      description: 'Visual variant of the caption',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    uppercase: {
      control: 'boolean',
      description: 'Transform text to uppercase',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
  args: {
    children: 'Caption text',
    animate: true,
  },
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Image caption or description',
  },
};

export const Meta: Story = {
  args: {
    variant: 'meta',
    children: (
      <>
        <User size={14} />
        <span>John Doe</span>
        <span>•</span>
        <Calendar size={14} />
        <span>March 15, 2024</span>
      </>
    ),
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    uppercase: true,
    children: 'NEW',
  },
};

export const Timestamp: Story = {
  args: {
    variant: 'timestamp',
    children: '2024-03-15 14:30:00',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Caption variant="default">Default caption style</Caption>
      <Caption variant="meta">
        <User size={14} />
        <span>Meta information with icons</span>
      </Caption>
      <Caption variant="label" uppercase>Label Style</Caption>
      <Caption variant="timestamp">2024-03-15 14:30:00</Caption>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-3">
      <Caption color="default">Default color caption</Caption>
      <Caption color="muted">Muted color for secondary text</Caption>
      <Caption color="accent">Accent color for emphasis</Caption>
    </div>
  ),
};

export const BlogPostMeta: Story = {
  render: () => (
    <div className="space-y-2">
      <h3 className="text-2xl font-bold">Understanding React Hooks</h3>
      <Caption variant="meta" color="muted">
        <User size={14} />
        <span>Sarah Johnson</span>
        <span>•</span>
        <Clock size={14} />
        <span>5 min read</span>
        <span>•</span>
        <Calendar size={14} />
        <span>March 15, 2024</span>
      </Caption>
    </div>
  ),
};

export const ImageWithCaption: Story = {
  render: () => (
    <figure className="space-y-2">
      <div className="bg-concrete border-3 border-black h-48 flex items-center justify-center">
        <span className="text-graphite">Image Placeholder</span>
      </div>
      <Caption variant="default" align="center" color="muted">
        Figure 1: Example of neubrutalist design principles in action
      </Caption>
    </figure>
  ),
};

export const ProductLabels: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Caption variant="label" uppercase>New</Caption>
      <Caption variant="label" uppercase>Sale</Caption>
      <Caption variant="label" uppercase>Limited</Caption>
      <Caption variant="label" uppercase>Popular</Caption>
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Caption variant="default" uppercase color="default" className="mb-1">
          Email Address
        </Caption>
        <input 
          type="email" 
          className="w-full px-4 py-2 border-3 border-black"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Caption variant="default" uppercase color="default" className="mb-1">
          Password
        </Caption>
        <input 
          type="password" 
          className="w-full px-4 py-2 border-3 border-black"
          placeholder="••••••••"
        />
        <Caption variant="default" color="muted" className="mt-1">
          Must be at least 8 characters
        </Caption>
      </div>
    </div>
  ),
};