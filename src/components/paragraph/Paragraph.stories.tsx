import type { Meta, StoryObj } from '@storybook/nextjs';
import { Paragraph } from './Paragraph';

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible paragraph component for body text with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['lead', 'body', 'small', 'quote', 'highlight'],
      description: 'Visual variant of the paragraph',
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Text size',
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'white'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    spacing: {
      control: 'boolean',
      description: 'Apply automatic spacing',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable animations',
    },
  },
  args: {
    children: 'This is a paragraph of text that demonstrates the various styling options available. It can be used for body content, lead paragraphs, quotes, and more.',
    animate: true,
    spacing: true,
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'This is a lead paragraph that introduces important content. It has larger text and more prominent styling to catch the reader\'s attention.',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text that can be used for fine print, disclaimers, or secondary information.',
  },
};

export const Quote: Story = {
  args: {
    variant: 'quote',
    children: '"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs',
  },
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
    children: '🎯 Important: This highlighted text stands out with a colored background and border to draw attention to key information.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Paragraph variant="lead">
        Lead paragraph with larger text for introductions and key statements.
      </Paragraph>
      <Paragraph variant="body">
        Regular body text for general content. This is the default style for most paragraph content on the page.
      </Paragraph>
      <Paragraph variant="small">
        Small text for footnotes, captions, or less prominent information.
      </Paragraph>
      <Paragraph variant="quote">
        "A quote variant that adds visual emphasis with a vertical accent bar and italic styling."
      </Paragraph>
      <Paragraph variant="highlight">
        Highlighted text that stands out with a background color and border.
      </Paragraph>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Paragraph size="large">
        Large size text is perfect for emphasis and readability.
      </Paragraph>
      <Paragraph size="medium">
        Medium size text is the standard for body content.
      </Paragraph>
      <Paragraph size="small">
        Small size text works well for secondary information.
      </Paragraph>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Paragraph color="default">Default color for standard text</Paragraph>
      <Paragraph color="muted">Muted color for secondary text</Paragraph>
      <Paragraph color="accent">Accent color for emphasis</Paragraph>
      <div className="bg-obsidian p-4">
        <Paragraph color="white">White text on dark backgrounds</Paragraph>
      </div>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <Paragraph align="left">
        Left aligned text is the default and most common alignment for body content.
      </Paragraph>
      <Paragraph align="center">
        Center aligned text works well for short statements and CTAs.
      </Paragraph>
      <Paragraph align="right">
        Right aligned text can be used for special layouts and design elements.
      </Paragraph>
      <Paragraph align="justify">
        Justified text creates even edges on both sides. This can be useful for formal documents and print-like layouts, though it should be used carefully on the web as it can create awkward spacing.
      </Paragraph>
    </div>
  ),
};

export const ContentExample: Story = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <Paragraph variant="lead">
        Transform your digital presence with our cutting-edge web solutions. We combine innovative design with robust technology to create experiences that drive results.
      </Paragraph>
      <Paragraph variant="body">
        Our team of experts specializes in crafting custom solutions tailored to your unique business needs. From responsive web design to complex application development, we have the skills and experience to bring your vision to life.
      </Paragraph>
      <Paragraph variant="quote">
        "Working with this team has been transformative for our business. They didn't just build us a website; they created a digital ecosystem that has revolutionized how we connect with our customers."
      </Paragraph>
      <Paragraph variant="body">
        We believe in a collaborative approach, working closely with our clients throughout the development process. This ensures that the final product not only meets but exceeds expectations.
      </Paragraph>
      <Paragraph variant="highlight">
        Ready to start your digital transformation? Contact us today for a free consultation and discover how we can help your business thrive in the digital age.
      </Paragraph>
    </article>
  ),
};