import type { Meta, StoryObj } from '@storybook/nextjs';
import { AssessmentLanding } from './AssessmentLanding';
import { Provider } from 'react-redux';
import { store } from '@/store';

const meta = {
  title: 'Components/AssessmentLanding',
  component: AssessmentLanding,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Landing page component for the AI Business Readiness Assessment, following ScoreApp layout patterns.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    onStartAssessment: {
      action: 'start assessment clicked',
      description: 'Callback when start assessment button is clicked',
    },
  },
} satisfies Meta<typeof AssessmentLanding>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {},
};

// With custom handler
export const WithCustomHandler: Story = {
  args: {
    onStartAssessment: () => {
      alert('Custom start assessment handler called!');
    },
  },
};

// Mobile view
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Tablet view
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// With different section backgrounds (simulated)
export const WithDarkTheme: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-gray-900">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component looks on a dark background (though it has its own section backgrounds)',
      },
    },
  },
};