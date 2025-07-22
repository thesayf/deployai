import type { Meta, StoryObj } from '@storybook/nextjs';
import { AuthorBio } from './AuthorBio';

const meta: Meta<typeof AuthorBio> = {
  title: 'Blog/AuthorBio',
  component: AuthorBio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Author Bio - Neubrutalist Author/Expert Card Component

A bold, personality-driven author bio component implementing the full neubrutalist design system with multiple variants for different contexts.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Sharp geometric edges
- **Bold 4px borders** with 8px brutal shadows
- **Rotated avatar frames** for visual interest
- **Gradient accent bars** for brand consistency

### Typography
- **Uppercase headings** for author names
- **Color-coded roles** with accent colors
- **Clear hierarchy** from name to bio to stats
- **Consistent spacing** using the 8px grid

### Interactive Elements
- **Social link buttons** with hover effects
- **Transform animations** on interaction
- **Shadow depth changes** for tactile feel
- **Color transitions** on hover states

## Variants

### Default
Full-featured bio card with avatar, social links, and optional stats.

### Compact
Minimal inline format perfect for article headers or bylines.

### Detailed
Extended version with expertise tags and comprehensive information.

### Sidebar
Vertical layout optimized for blog sidebars with centered content.

## Features

### Avatar Display
- 3-degree rotation for personality
- Thick borders with accent shadows
- Overflow crop with scale compensation

### Social Links
- Support for Twitter, LinkedIn, GitHub, Website, Email
- Hover states with color fills
- Consistent icon sizing

### Stats Display
- Article count
- Follower metrics
- Clean numerical presentation

### Expertise Tags
- Skill badges with brutal borders
- Uppercase styling
- Flexible wrapping

## Usage Guidelines

### Placement Options
- **Article header** - Use compact variant
- **Article footer** - Use default or detailed
- **Sidebar widget** - Use sidebar variant
- **About page** - Use detailed variant

### Content Tips
- Keep bios concise (2-3 sentences)
- Use active voice and personality
- Include 3-5 expertise tags max
- Provide at least 2 social links
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'sidebar'],
      description: 'Visual variant of the bio card',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    name: {
      control: 'text',
      description: 'Author name',
    },
    role: {
      control: 'text',
      description: 'Author role or title',
    },
    bio: {
      control: 'text',
      description: 'Author biography text',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color theme',
      table: {
        defaultValue: { summary: 'orange' },
      },
    },
    showStats: {
      control: 'boolean',
      description: 'Show/hide statistics',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    articlesCount: {
      control: 'number',
      description: 'Number of articles written',
    },
    followersCount: {
      control: 'text',
      description: 'Follower count (e.g., "12.5K")',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default author data
const defaultAuthor = {
  name: 'Sarah Chen',
  role: 'AI Engineering Lead',
  bio: 'Building the future of AI development. 10+ years in machine learning, specializing in production-ready AI applications and developer tools.',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  socialLinks: [
    { platform: 'twitter' as const, url: 'https://twitter.com/sarahchen' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/in/sarahchen' },
    { platform: 'github' as const, url: 'https://github.com/sarahchen' },
  ],
};

// Default story
export const Default: Story = {
  args: {
    ...defaultAuthor,
  },
};

// Compact variant for article headers
export const Compact: Story = {
  args: {
    ...defaultAuthor,
    variant: 'compact',
  },
};

// Detailed variant with expertise
export const Detailed: Story = {
  args: {
    ...defaultAuthor,
    variant: 'detailed',
    expertise: ['Machine Learning', 'Python', 'TensorFlow', 'MLOps', 'React'],
    showStats: true,
    articlesCount: 47,
    followersCount: '12.5K',
  },
};

// Sidebar variant
export const Sidebar: Story = {
  args: {
    ...defaultAuthor,
    variant: 'sidebar',
    showStats: true,
    articlesCount: 47,
    followersCount: '12.5K',
  },
};

// With stats
export const WithStats: Story = {
  args: {
    ...defaultAuthor,
    showStats: true,
    articlesCount: 132,
    followersCount: '45.2K',
  },
};

// Blue accent
export const BlueAccent: Story = {
  args: {
    name: 'Michael Torres',
    role: 'DevOps Architect',
    bio: 'Kubernetes enthusiast and cloud infrastructure expert. Helping teams scale their applications with modern DevOps practices.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    accentColor: 'blue',
    socialLinks: [
      { platform: 'linkedin' as const, url: 'https://linkedin.com' },
      { platform: 'github' as const, url: 'https://github.com' },
    ],
  },
};

// Magenta accent
export const MagentaAccent: Story = {
  args: {
    name: 'Alex Rivera',
    role: 'Creative Technologist',
    bio: 'Bridging the gap between design and development. Passionate about creating beautiful, functional AI experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    accentColor: 'magenta',
    variant: 'detailed',
    expertise: ['UI/UX', 'Figma', 'Three.js', 'Creative AI'],
  },
};

// Without avatar
export const NoAvatar: Story = {
  args: {
    name: 'Anonymous Developer',
    role: 'Full Stack Engineer',
    bio: 'Sharing insights from the trenches of software development. Focus on practical solutions and clean code.',
    socialLinks: [
      { platform: 'github' as const, url: 'https://github.com' },
      { platform: 'website' as const, url: 'https://example.com' },
    ],
  },
};

// Guest author
export const GuestAuthor: Story = {
  args: {
    name: 'Dr. Emily Watson',
    role: 'Guest Contributor',
    bio: 'Professor of Computer Science at MIT. Research focuses on ethical AI and machine learning interpretability.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    accentColor: 'red',
    socialLinks: [
      { platform: 'twitter' as const, url: 'https://twitter.com' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com' },
    ],
  },
};

// Team member
export const TeamMember: Story = {
  args: {
    name: 'James Park',
    role: 'Founder & CEO',
    bio: 'Serial entrepreneur with a passion for AI. Building tools that empower developers to create amazing products faster.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    showStats: true,
    articlesCount: 89,
    followersCount: '25.8K',
    variant: 'detailed',
    expertise: ['Entrepreneurship', 'AI Strategy', 'Product Design', 'Go-to-Market'],
  },
};

// Minimal social
export const MinimalSocial: Story = {
  args: {
    name: 'Lisa Chang',
    role: 'Technical Writer',
    bio: 'Making complex technical concepts accessible. Specializing in API documentation and developer guides.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    socialLinks: [
      { platform: 'email' as const, url: 'mailto:lisa@example.com' },
    ],
  },
};

// All social platforms
export const AllSocialPlatforms: Story = {
  args: {
    name: 'David Kim',
    role: 'Developer Advocate',
    bio: 'Helping developers succeed with modern tools and practices. Conference speaker and open source contributor.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    socialLinks: [
      { platform: 'twitter' as const, url: 'https://twitter.com' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com' },
      { platform: 'github' as const, url: 'https://github.com' },
      { platform: 'website' as const, url: 'https://example.com' },
      { platform: 'email' as const, url: 'mailto:david@example.com' },
    ],
  },
};

// Compact in context
export const CompactInArticle: Story = {
  args: {
    ...defaultAuthor,
    variant: 'compact',
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Building Scalable AI Applications with Next.js
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <Story />
            <span style={{ color: '#757575' }}>•</span>
            <span style={{ color: '#757575' }}>5 min read</span>
            <span style={{ color: '#757575' }}>•</span>
            <span style={{ color: '#757575' }}>March 15, 2024</span>
          </div>
        </div>
        <p style={{ lineHeight: '1.6' }}>
          In this article, we'll explore how to build production-ready AI applications using Next.js...
        </p>
      </div>
    ),
  ],
};

// Sidebar in context
export const SidebarInBlog: Story = {
  args: {
    ...defaultAuthor,
    variant: 'sidebar',
    showStats: true,
    articlesCount: 47,
    followersCount: '12.5K',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ flex: '1' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            The Future of AI Development
          </h1>
          <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
            Artificial Intelligence is transforming how we build software...
          </p>
          <p style={{ lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          </p>
        </div>
        <div style={{ width: '300px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            About the Author
          </h3>
          <Story />
        </div>
      </div>
    ),
  ],
};

// Long bio
export const LongBio: Story = {
  args: {
    name: 'Jennifer Martinez',
    role: 'Principal Engineer',
    bio: "With over 15 years in software development, I've seen the industry evolve from monoliths to microservices, from waterfall to agile, and now to AI-assisted development. My passion lies in building systems that scale not just technically, but also organizationally.",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    variant: 'detailed',
    expertise: ['System Design', 'Distributed Systems', 'Team Leadership', 'Mentoring'],
    showStats: true,
    articlesCount: 203,
    followersCount: '68.4K',
  },
};