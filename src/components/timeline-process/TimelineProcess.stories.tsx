import type { Meta, StoryObj } from '@storybook/nextjs';
import { TimelineProcess } from './TimelineProcess';

const meta: Meta<typeof TimelineProcess> = {
  title: 'Components/TimelineProcess',
  component: TimelineProcess,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Timeline Process - Neubrutalist Process Visualization Component

A comprehensive timeline component for visualizing multi-step processes with expandable tasks, progress tracking, and brutal aesthetics.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Pure geometric shapes
- **Bold 4px borders** with 6-8px brutal shadows
- **Progress bars** with gradient fills
- **Status badges** with shadow effects

### Typography
- **Bold week numbers** with uppercase styling
- **Large headings** for step titles
- **Clear task hierarchy** with status indicators
- **Consistent spacing** using 8px base unit

### Interactive Elements
- **Expandable task lists** with smooth animations
- **Hover effects** with transform and shadow changes
- **Progress visualization** at step and overall levels
- **Status indicators** for each task

## Variants

### Default
Full-width horizontal timeline with 4 columns on desktop, perfect for process overviews.

### Compact
2-column grid layout for space-efficient display while maintaining all features.

### Vertical
Single column vertical layout ideal for mobile or narrow spaces.

## Progress Tracking

### Step Progress
Each step shows completion percentage based on task statuses.

### Overall Progress
Top-level progress bar shows total project completion.

### Task Status
- **Completed** - Green check with emerald color
- **In Progress** - Blue clock icon
- **Pending** - Gray circle outline

## Usage Guidelines

### Placement
- **Landing pages** - Use default variant for process overview
- **Service pages** - Show detailed project timelines
- **Dashboards** - Use compact variant for status updates
- **Mobile** - Automatically switches to vertical layout

### Content Tips
- Keep step titles concise (2-4 words)
- Task descriptions should be specific and actionable
- Use consistent status updates
- Include realistic timelines
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title for the timeline',
      table: {
        defaultValue: { summary: 'Your Next 4 Weeks With Us' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
      table: {
        defaultValue: { summary: 'From concept to launch in 30 days' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'vertical'],
      description: 'Layout variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showProgress: {
      control: 'boolean',
      description: 'Show progress bars and percentages',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    darkMode: {
      control: 'boolean',
      description: 'Enable dark mode styling',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Custom timeline data for different scenarios
const customTimeline = [
  {
    id: 'phase-1',
    week: 1,
    title: 'Discovery',
    description: 'Understanding your vision and requirements',
    icon: 'target' as const,
    color: 'orange' as const,
    tasks: [
      {
        id: 'disc-1',
        title: 'Stakeholder Interviews',
        description: 'Deep dive sessions with key team members',
        status: 'completed' as const,
      },
      {
        id: 'disc-2',
        title: 'Market Research',
        description: 'Competitive analysis and user research',
        status: 'completed' as const,
      },
      {
        id: 'disc-3',
        title: 'Technical Feasibility',
        description: 'Architecture planning and tech stack selection',
        status: 'completed' as const,
      },
    ],
  },
  {
    id: 'phase-2',
    week: 2,
    title: 'Design',
    description: 'Creating the visual and interaction design',
    icon: 'rocket' as const,
    color: 'blue' as const,
    tasks: [
      {
        id: 'design-1',
        title: 'UI/UX Design',
        description: 'Complete design system and mockups',
        status: 'completed' as const,
      },
      {
        id: 'design-2',
        title: 'Prototype Development',
        description: 'Interactive prototype for user testing',
        status: 'in-progress' as const,
      },
      {
        id: 'design-3',
        title: 'Design Review & Iteration',
        description: 'Feedback incorporation and refinements',
        status: 'pending' as const,
      },
    ],
  },
  {
    id: 'phase-3',
    week: 3,
    title: 'Development',
    description: 'Building the product with modern technologies',
    icon: 'code' as const,
    color: 'magenta' as const,
    tasks: [
      {
        id: 'dev-1',
        title: 'Frontend Development',
        description: 'React components and user interfaces',
        status: 'pending' as const,
      },
      {
        id: 'dev-2',
        title: 'Backend APIs',
        description: 'Server logic and database integration',
        status: 'pending' as const,
      },
      {
        id: 'dev-3',
        title: 'Integration Testing',
        description: 'End-to-end testing and bug fixes',
        status: 'pending' as const,
      },
    ],
  },
  {
    id: 'phase-4',
    week: 4,
    title: 'Launch',
    description: 'Going live and post-launch support',
    icon: 'users' as const,
    color: 'red' as const,
    tasks: [
      {
        id: 'launch-1',
        title: 'Deployment Setup',
        description: 'Production environment configuration',
        status: 'pending' as const,
      },
      {
        id: 'launch-2',
        title: 'Go Live',
        description: 'Launch to production with monitoring',
        status: 'pending' as const,
      },
      {
        id: 'launch-3',
        title: 'Knowledge Transfer',
        description: 'Documentation and training sessions',
        status: 'pending' as const,
      },
    ],
  },
];

// Default story
export const Default: Story = {
  args: {},
};

// Compact variant
export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

// Vertical variant
export const Vertical: Story = {
  args: {
    variant: 'vertical',
  },
};

// Without progress bars
export const NoProgress: Story = {
  args: {
    showProgress: false,
  },
};

// Custom timeline
export const CustomTimeline: Story = {
  args: {
    steps: customTimeline,
    title: 'Project Roadmap',
    subtitle: 'Your journey from idea to reality',
  },
};

// All tasks completed
export const AllCompleted: Story = {
  args: {
    steps: customTimeline.map(step => ({
      ...step,
      tasks: step.tasks.map(task => ({
        ...task,
        status: 'completed' as const,
      })),
    })),
    title: 'Project Complete! 🎉',
    subtitle: 'All milestones achieved successfully',
  },
};

// Short timeline (2 weeks)
export const ShortTimeline: Story = {
  args: {
    steps: customTimeline.slice(0, 2),
    title: 'Quick Sprint Process',
    subtitle: '2-week rapid development cycle',
  },
};

// Extended timeline (6 weeks)
export const ExtendedTimeline: Story = {
  args: {
    steps: [
      ...customTimeline,
      {
        id: 'phase-5',
        week: 5,
        title: 'Optimization',
        description: 'Performance tuning and enhancements',
        icon: 'rocket' as const,
        color: 'orange' as const,
        tasks: [
          {
            id: 'opt-1',
            title: 'Performance Audit',
            description: 'Comprehensive performance analysis',
            status: 'pending' as const,
          },
          {
            id: 'opt-2',
            title: 'Code Optimization',
            description: 'Refactoring for speed and efficiency',
            status: 'pending' as const,
          },
        ],
      },
      {
        id: 'phase-6',
        week: 6,
        title: 'Scaling',
        description: 'Preparing for growth and expansion',
        icon: 'users' as const,
        color: 'blue' as const,
        tasks: [
          {
            id: 'scale-1',
            title: 'Infrastructure Scaling',
            description: 'Auto-scaling and load balancing setup',
            status: 'pending' as const,
          },
          {
            id: 'scale-2',
            title: 'Feature Expansion',
            description: 'Additional features based on feedback',
            status: 'pending' as const,
          },
        ],
      },
    ],
    title: 'Enterprise Development Process',
    subtitle: '6-week comprehensive build cycle',
    variant: 'compact',
  },
};

// Mobile responsive (vertical)
export const MobileView: Story = {
  args: {
    variant: 'vertical',
    steps: customTimeline.slice(0, 3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// In dashboard context
export const DashboardContext: Story = {
  args: {
    variant: 'compact',
    showProgress: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f5f5f5', padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
            Project Dashboard
          </h1>
          <p style={{ color: '#666' }}>
            Track your project progress in real-time
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

// Landing page section
export const LandingPageSection: Story = {
  args: {
    title: 'How We Build Your MVP',
    subtitle: 'A proven 4-week process that delivers results',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', padding: '64px 32px' }}>
        <Story />
      </div>
    ),
  ],
};

// Dark background
export const OnDarkBackground: Story = {
  args: {
    variant: 'default',
    darkMode: true,
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#1a1a1a', padding: '64px 32px' }}>
        <Story />
      </div>
    ),
  ],
};