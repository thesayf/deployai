import type { Meta, StoryObj } from '@storybook/react';
import { RelatedArticles } from './RelatedArticles';

const meta: Meta<typeof RelatedArticles> = {
  title: 'Blog/RelatedArticles',
  component: RelatedArticles,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Related Articles - Neubrutalist Article Grid Component

A versatile related articles component implementing the full neubrutalist design system with multiple layout variants for showcasing related or recommended content.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Sharp geometric edges throughout
- **Bold 3-4px borders** with 4-6px brutal shadows
- **Hover animations** with transform effects
- **Number badges** for list variants

### Typography
- **Bold headings** for article titles
- **Uppercase category badges** with accent colors
- **Clear metadata** display (date, read time)
- **Consistent hierarchy** across all variants

### Interactive Elements
- **Hover effects** on cards with shadow depth changes
- **Arrow indicators** that animate on hover
- **Click handling** with optional callbacks
- **Smooth transitions** for professional feel

## Variants

### Grid
Default card grid layout with images, excerpts, and metadata. Perfect for blog post footers.

### List
Numbered list format with horizontal cards. Great for "Top Articles" sections.

### Minimal
Compact list without images. Ideal for sidebars or space-constrained areas.

### Featured
Hero article with smaller supporting articles. Perfect for homepage sections.

## Layout Options

### Columns
- **2 columns** - Wide cards, good for detailed previews
- **3 columns** - Balanced layout (default)
- **4 columns** - Compact cards for many articles

### Content Toggles
- **showExcerpt** - Article preview text
- **showImage** - Featured images
- **showAuthor** - Author info and avatars
- **showTags** - Article tags

## Usage Guidelines

### Placement
- **Article footer** - Use grid variant with 3 columns
- **Sidebar widget** - Use minimal variant
- **Homepage section** - Use featured variant
- **Category pages** - Use list variant

### Content Tips
- Keep titles concise (50-60 characters)
- Excerpts should be 1-2 sentences
- Use high-quality images (16:9 ratio)
- Consistent categorization
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
      table: {
        defaultValue: { summary: 'Related Articles' },
      },
    },
    variant: {
      control: 'select',
      options: ['grid', 'list', 'minimal', 'featured'],
      description: 'Layout variant',
      table: {
        defaultValue: { summary: 'grid' },
      },
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns (grid variant only)',
      table: {
        defaultValue: { summary: 3 },
      },
    },
    showExcerpt: {
      control: 'boolean',
      description: 'Show article excerpts',
      table: {
        defaultValue: { summary: true },
      },
    },
    showImage: {
      control: 'boolean',
      description: 'Show article images',
      table: {
        defaultValue: { summary: true },
      },
    },
    showAuthor: {
      control: 'boolean',
      description: 'Show author information',
      table: {
        defaultValue: { summary: false },
      },
    },
    showTags: {
      control: 'boolean',
      description: 'Show article tags',
      table: {
        defaultValue: { summary: false },
      },
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color theme',
      table: {
        defaultValue: { summary: 'orange' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample articles data
const sampleArticles = [
  {
    id: '1',
    title: 'Building Scalable AI Applications with Next.js',
    excerpt: 'Learn how to create production-ready AI applications using Next.js, including best practices for performance and scalability.',
    category: 'AI Development',
    readTime: '8 min read',
    date: 'Mar 15, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=ai-nextjs',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    tags: ['Next.js', 'AI', 'React'],
  },
  {
    id: '2',
    title: 'The Future of Machine Learning in Web Development',
    excerpt: 'Explore how ML models are being integrated directly into web applications and what this means for developers.',
    category: 'Machine Learning',
    readTime: '6 min read',
    date: 'Mar 12, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=ml-web',
    author: {
      name: 'Michael Torres',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    },
    tags: ['ML', 'Web Dev', 'JavaScript'],
  },
  {
    id: '3',
    title: 'Optimizing Large Language Models for Production',
    excerpt: 'Practical strategies for deploying LLMs efficiently, including quantization, caching, and edge deployment.',
    category: 'LLMs',
    readTime: '10 min read',
    date: 'Mar 10, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=llm-prod',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    tags: ['LLMs', 'Optimization', 'DevOps'],
  },
  {
    id: '4',
    title: 'Building Real-time AI Chat Applications',
    excerpt: 'A comprehensive guide to creating chat applications with streaming responses and context management.',
    category: 'Tutorials',
    readTime: '12 min read',
    date: 'Mar 8, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=chat-ai',
    author: {
      name: 'Emily Watson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
    tags: ['Chat', 'Real-time', 'WebSockets'],
  },
  {
    id: '5',
    title: 'Vector Databases: The Foundation of AI Apps',
    excerpt: 'Understanding vector databases and how they enable semantic search and recommendation systems.',
    category: 'Infrastructure',
    readTime: '7 min read',
    date: 'Mar 5, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vector-db',
    author: {
      name: 'James Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    },
    tags: ['Databases', 'Vectors', 'Search'],
  },
  {
    id: '6',
    title: 'Prompt Engineering Best Practices',
    excerpt: 'Master the art of prompt engineering with these proven techniques for better AI outputs.',
    category: 'AI Development',
    readTime: '5 min read',
    date: 'Mar 3, 2024',
    href: '#',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=prompt-eng',
    author: {
      name: 'Lisa Chang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    tags: ['Prompts', 'AI', 'Best Practices'],
  },
];

// Default grid layout
export const Default: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
  },
};

// Grid with 2 columns
export const TwoColumns: Story = {
  args: {
    articles: sampleArticles.slice(0, 4),
    columns: 2,
  },
};

// Grid with 4 columns
export const FourColumns: Story = {
  args: {
    articles: sampleArticles.slice(0, 4),
    columns: 4,
  },
};

// List variant
export const ListLayout: Story = {
  args: {
    articles: sampleArticles.slice(0, 5),
    variant: 'list',
  },
};

// Minimal variant
export const MinimalLayout: Story = {
  args: {
    title: 'More from AI Development',
    articles: sampleArticles,
    variant: 'minimal',
  },
};

// Featured variant
export const FeaturedLayout: Story = {
  args: {
    title: 'Featured & Trending',
    articles: sampleArticles.slice(0, 4),
    variant: 'featured',
  },
};

// With author info
export const WithAuthors: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    showAuthor: true,
  },
};

// With tags
export const WithTags: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    showTags: true,
  },
};

// Without images
export const NoImages: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    showImage: false,
  },
};

// Without excerpts
export const NoExcerpts: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    showExcerpt: false,
  },
};

// Blue accent
export const BlueAccent: Story = {
  args: {
    title: 'Learn More About AI',
    articles: sampleArticles.slice(0, 3),
    accentColor: 'blue',
  },
};

// Magenta accent
export const MagentaAccent: Story = {
  args: {
    title: 'Creative AI Resources',
    articles: sampleArticles.slice(0, 3),
    accentColor: 'magenta',
  },
};

// Red accent
export const RedAccent: Story = {
  args: {
    title: 'Hot Topics',
    articles: sampleArticles.slice(0, 3),
    accentColor: 'red',
  },
};

// With click handler
export const WithClickHandler: Story = {
  args: {
    articles: sampleArticles.slice(0, 3),
    onArticleClick: (article) => {
      console.log('Article clicked:', article);
      alert(`Clicked: ${article.title}`);
    },
  },
};

// Single article
export const SingleArticle: Story = {
  args: {
    title: 'You might also like',
    articles: [sampleArticles[0]],
    columns: 2,
  },
};

// Many articles
export const ManyArticles: Story = {
  args: {
    title: 'Browse All Articles',
    articles: [...sampleArticles, ...sampleArticles.map(a => ({ ...a, id: `${a.id}-2` }))],
    columns: 4,
  },
};

// Sidebar example
export const SidebarExample: Story = {
  args: {
    title: 'Popular Posts',
    articles: sampleArticles.slice(0, 5),
    variant: 'minimal',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

// In blog post context
export const InBlogPostContext: Story = {
  args: {
    title: 'Keep Reading',
    articles: sampleArticles.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <div>
        <article style={{ marginBottom: '64px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Building Your First AI Application
          </h1>
          <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
            In this comprehensive guide, we'll walk through the process of building your first AI-powered application...
          </p>
          <p style={{ lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </article>
        <Story />
      </div>
    ),
  ],
};

// Homepage section
export const HomepageSection: Story = {
  args: {
    title: 'Latest from the Blog',
    articles: sampleArticles,
    variant: 'featured',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f5f5f5', padding: '64px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </div>
    ),
  ],
};