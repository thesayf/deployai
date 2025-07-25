import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar } from './ProgressBar';
import React from 'react';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A neubrutalist progress bar component for showing quiz progress or any step-based progression.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 14 },
      description: 'Current step or progress value',
    },
    total: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Total number of steps',
    },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'minimal'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Height of the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show progress label above bar',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress bar
export const Default: Story = {
  args: {
    current: 7,
    total: 14,
    showLabel: true,
  },
};

// Gradient variant
export const Gradient: Story = {
  args: {
    current: 10,
    total: 14,
    variant: 'gradient',
    showLabel: true,
  },
};

// Minimal variant
export const Minimal: Story = {
  args: {
    current: 3,
    total: 10,
    variant: 'minimal',
    showLabel: true,
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    current: 5,
    total: 14,
    size: 'small',
    showLabel: true,
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    current: 8,
    total: 14,
    size: 'large',
    variant: 'gradient',
    showLabel: true,
  },
};

// Without label
export const NoLabel: Story = {
  args: {
    current: 6,
    total: 14,
    showLabel: false,
  },
};

// Quiz progress examples
export const QuizStart: Story = {
  args: {
    current: 1,
    total: 14,
    variant: 'gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at the start of a 14-question quiz',
      },
    },
  },
};

export const QuizMiddle: Story = {
  args: {
    current: 7,
    total: 14,
    variant: 'gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at the middle of a quiz',
      },
    },
  },
};

export const QuizAlmostDone: Story = {
  args: {
    current: 13,
    total: 14,
    variant: 'gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar when almost completing the quiz',
      },
    },
  },
};

export const QuizComplete: Story = {
  args: {
    current: 14,
    total: 14,
    variant: 'gradient',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 100% completion',
      },
    },
  },
};

// Interactive demo showing all steps
export const InteractiveDemo: Story = {
  args: {
    current: 1,
    total: 14,
  },
  render: () => {
    const [current, setCurrent] = React.useState(1);
    const total = 14;

    return (
      <div className="space-y-8">
        <ProgressBar 
          current={current} 
          total={total} 
          variant="gradient"
          size="large"
        />
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrent(Math.max(1, current - 1))}
            disabled={current === 1}
            className="px-4 py-2 bg-gray-200 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrent(Math.min(total, current + 1))}
            disabled={current === total}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <p className="text-center text-gray-600">
          Question {current} of {total}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing progress bar with navigation controls',
      },
    },
  },
};