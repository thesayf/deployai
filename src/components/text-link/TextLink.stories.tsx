import type { Meta, StoryObj } from '@storybook/nextjs';
import { TextLink } from './TextLink';
import { ArrowRight } from 'lucide-react';

const meta = {
  title: 'Typography/TextLink',
  component: TextLink,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Inline link component with multiple neubrutalist styles for navigation and CTAs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'arrow', 'button', 'highlight'],
      description: 'Visual variant of the link',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Link size',
    },
    color: {
      control: 'select',
      options: ['default', 'accent', 'white', 'muted'],
      description: 'Link color',
    },
    external: {
      control: 'boolean',
      description: 'Opens in new tab with rel="noopener noreferrer"',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable hover animations',
    },
  },
  args: {
    children: 'Click here',
    href: '#',
    animate: true,
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Learn more',
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    children: 'View documentation',
  },
};

export const Arrow: Story = {
  args: {
    variant: 'arrow',
    children: 'Get started',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
    children: 'Download now',
  },
};

export const Highlight: Story = {
  args: {
    variant: 'highlight',
    children: 'Special offer',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <p>
        Check out our <TextLink href="#" variant="default">default link style</TextLink> for inline navigation.
      </p>
      <p>
        Read the <TextLink href="#" variant="underline">full documentation</TextLink> to learn more.
      </p>
      <p>
        <TextLink href="#" variant="arrow">Continue to next section</TextLink>
      </p>
      <p>
        <TextLink href="#" variant="button">Get Started Free</TextLink>
      </p>
      <p>
        Don't miss our <TextLink href="#" variant="highlight">limited time offer</TextLink> this week only!
      </p>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <TextLink href="#" size="small">Small link text</TextLink>
      <br />
      <TextLink href="#" size="medium">Medium link text</TextLink>
      <br />
      <TextLink href="#" size="large">Large link text</TextLink>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <TextLink href="#" color="default">Default blue link</TextLink>
      <br />
      <TextLink href="#" color="accent">Accent orange link</TextLink>
      <br />
      <TextLink href="#" color="muted">Muted gray link</TextLink>
      <br />
      <div className="bg-obsidian p-4 inline-block">
        <TextLink href="#" color="white">White link on dark</TextLink>
      </div>
    </div>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <nav className="flex gap-6 items-center">
      <TextLink href="#" variant="default">Home</TextLink>
      <TextLink href="#" variant="default">About</TextLink>
      <TextLink href="#" variant="default">Services</TextLink>
      <TextLink href="#" variant="default">Portfolio</TextLink>
      <TextLink href="#" variant="button" color="accent">Contact</TextLink>
    </nav>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-charcoal">
        Our platform helps you build better products faster. 
        <TextLink href="#" variant="underline" className="ml-1">Learn how it works</TextLink> or 
        <TextLink href="#" variant="arrow" className="ml-1">view pricing</TextLink>.
      </p>
      <p className="text-charcoal">
        Join thousands of developers who are already using our tools. 
        <TextLink href="#" variant="button" size="small" className="ml-2">
          Start free trial
        </TextLink>
      </p>
    </div>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <div className="space-y-3">
      <p>
        <TextLink href="https://github.com" external variant="arrow">
          View on GitHub
        </TextLink>
      </p>
      <p>
        <TextLink href="https://twitter.com" external variant="underline">
          Follow us on Twitter
        </TextLink>
      </p>
      <p>
        <TextLink href="https://docs.example.com" external variant="button">
          Read Documentation
        </TextLink>
      </p>
    </div>
  ),
};

export const CTAVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="bg-warmPeach p-6 border-3 border-black">
        <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
        <TextLink href="#" variant="button" color="accent">
          Create your account
        </TextLink>
      </div>
      <div className="bg-skyBlue p-6 border-3 border-black">
        <h3 className="text-xl font-bold mb-2">Need more information?</h3>
        <TextLink href="#" variant="arrow" color="default">
          Download our guide
        </TextLink>
      </div>
      <div className="bg-lavender p-6 border-3 border-black">
        <h3 className="text-xl font-bold mb-2">Special promotion</h3>
        <TextLink href="#" variant="highlight" color="accent">
          Claim 50% discount
        </TextLink>
      </div>
    </div>
  ),
};