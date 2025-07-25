import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'cta'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Primary CTA - High conversion hero buttons
export const PrimaryCTA: Story = {
  args: {
    intent: 'cta',
    size: 'large',
    children: 'Start Free Trial',
  },
  parameters: {
    docs: {
      description: {
        story: 'High-impact CTA for hero sections and primary conversions. Features gradient background, pulse animation, and shadow effects.',
      },
    },
  },
};

// 2. Secondary Action - Supporting actions
export const SecondaryAction: Story = {
  args: {
    intent: 'secondary',
    size: 'medium',
    children: 'Learn More',
  },
  parameters: {
    docs: {
      description: {
        story: 'For secondary actions that complement primary CTAs. Dark background provides contrast without competing for attention.',
      },
    },
  },
};

// 3. Outline Ghost - Tertiary actions
export const OutlineGhost: Story = {
  args: {
    intent: 'outline',
    size: 'medium',
    children: 'View Documentation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lightweight option for tertiary actions, navigation links, or when multiple buttons are grouped together.',
      },
    },
  },
};

// 4. Danger/Destructive - Warning actions
export const DangerDestructive: Story = {
  render: () => (
    <Button 
      className="bg-red-600 hover:bg-red-700 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
      size="medium"
    >
      Delete Account
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Destructive actions that require user attention. Red background with hard shadows following neubrutalist principles.',
      },
    },
  },
};

// 5. Success/Confirmation - Positive actions
export const SuccessConfirmation: Story = {
  render: () => (
    <Button 
      className="bg-emerald-500 hover:bg-emerald-600 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
      size="medium"
    >
      Complete Purchase
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Positive actions like confirmations and completions. Green signals success and forward progress.',
      },
    },
  },
};

// 6. Info/Utility - Informational actions
export const InfoUtility: Story = {
  render: () => (
    <Button 
      className="bg-blue-500 hover:bg-blue-600 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
      size="medium"
    >
      Download Report
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Informational actions like downloads, exports, or viewing details. Blue maintains professional trust.',
      },
    },
  },
};

// 7. Premium/Special - Exclusive actions
export const PremiumSpecial: Story = {
  render: () => (
    <Button 
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 relative overflow-hidden"
      size="large"
    >
      <span className="relative z-10">Unlock Premium</span>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity"></div>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Premium features and special offers. Gradient background with enhanced shadows for exclusivity.',
      },
    },
  },
};

// 8. Minimal Text Link - Navigation
export const MinimalTextLink: Story = {
  render: () => (
    <Button 
      className="bg-transparent hover:bg-gray-100 text-black border-0 shadow-none hover:shadow-none underline decoration-2 underline-offset-4 decoration-orange-500 hover:decoration-orange-600 hover:scale-100"
      size="small"
    >
      Skip to Content →
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal text-based buttons for navigation, skip links, or inline actions. Maintains brutalist aesthetic with bold underlines.',
      },
    },
  },
};

// Showcase all button states
export const ButtonShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-gray-50">
      <div>
        <h3 className="text-lg font-bold mb-4">Primary Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="cta" size="large">Get Started</Button>
          <Button intent="primary" size="large">Sign Up Free</Button>
          <Button intent="cta" size="medium">Try Demo</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Secondary Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <Button intent="secondary" size="medium">Learn More</Button>
          <Button intent="outline" size="medium">View Pricing</Button>
          <Button intent="secondary" size="small">See Details</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Semantic Actions</h3>
        <div className="flex gap-4 flex-wrap">
          <Button className="bg-red-600 hover:bg-red-700 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Delete
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Confirm
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Download
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Premium
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Button Sizes</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete showcase of all button variations, states, and sizes following neubrutalist design principles.',
      },
    },
  },
};

// Interactive example with all states
export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex gap-4 items-center">
        <Button intent="primary">Default</Button>
        <Button intent="primary" className="hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Hover Me</Button>
        <Button intent="primary" className="opacity-60 cursor-not-allowed" disabled>Disabled</Button>
        <Button intent="primary" className="animate-pulse">Loading...</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive button states showing default, hover, disabled, and loading states.',
      },
    },
  },
};

// Grouped buttons example
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Button intent="outline" size="medium" className="rounded-r-none">Previous</Button>
        <Button intent="outline" size="medium" className="rounded-none border-l-0">1</Button>
        <Button intent="primary" size="medium" className="rounded-none">2</Button>
        <Button intent="outline" size="medium" className="rounded-none border-l-0">3</Button>
        <Button intent="outline" size="medium" className="rounded-l-none border-l-0">Next</Button>
      </div>
      
      <div className="flex gap-2">
        <Button intent="secondary" size="small">Save Draft</Button>
        <Button intent="primary" size="small">Publish</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of grouped buttons for pagination, multi-action forms, and toolbars.',
      },
    },
  },
};