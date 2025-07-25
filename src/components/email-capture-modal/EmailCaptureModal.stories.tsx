import type { Meta, StoryObj } from '@storybook/nextjs';
import { EmailCaptureModal } from './EmailCaptureModal';
import { useState } from 'react';
import { Button } from '@/components/shared/Button';

const meta = {
  title: 'Components/EmailCaptureModal',
  component: EmailCaptureModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A neubrutalist modal component for capturing user information before starting the AI assessment quiz.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
    },
    isSubmitting: {
      control: 'boolean',
      description: 'Shows loading state on submit button',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback when form is submitted',
    },
  },
} satisfies Meta<typeof EmailCaptureModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default modal state
export const Default: Story = {
  args: {
    isOpen: true,
    isSubmitting: false,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
};

// Submitting state
export const Submitting: Story = {
  args: {
    isOpen: true,
    isSubmitting: true,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
};

// Interactive demo
export const InteractiveDemo = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (data: any) => {
      console.log('Form submitted:', data);
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
        alert(`Assessment started for ${data.firstName} ${data.lastName} (${data.email})`);
      }, 2000);
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            AI Business Readiness Assessment
          </h2>
          <p className="text-gray-600 mb-8">
            Click the button below to start the assessment
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            size="large"
            intent="cta"
          >
            Start Your AI Assessment
          </Button>
        </div>

        <EmailCaptureModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing the modal with open/close functionality and form submission',
      },
    },
  },
};

// Form validation demo
export const ValidationDemo = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Try submitting the form without filling in required fields to see validation
          </p>
        </div>
        
        <EmailCaptureModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            console.log('Valid data:', data);
            alert('Form submitted successfully!');
          }}
        />

        {!isOpen && (
          <div className="text-center mt-8">
            <Button onClick={() => setIsOpen(true)}>
              Reopen Modal
            </Button>
          </div>
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo showing form validation in action',
      },
    },
  },
};

// Mobile view simulation
export const MobileView: Story = {
  args: {
    isOpen: true,
    isSubmitting: false,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Modal appearance on mobile devices',
      },
    },
  },
};

// Dark background demo
export const OnDarkBackground: Story = {
  args: {
    isOpen: true,
    isSubmitting: false,
    onClose: () => console.log('Modal closed'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Modal displayed on a dark background',
      },
    },
  },
};