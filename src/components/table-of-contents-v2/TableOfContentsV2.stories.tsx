import type { Meta, StoryObj } from '@storybook/nextjs';
import { TableOfContentsV2 } from './TableOfContentsV2';

const meta = {
  title: 'Blog/TableOfContentsV2',
  component: TableOfContentsV2,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title shown above the table of contents',
      defaultValue: 'TABLE OF CONTENTS',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show reading progress bar',
      defaultValue: true,
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'mobile', 'minimal'],
      description: 'Display variant of the table of contents',
      defaultValue: 'sidebar',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color for active states',
      defaultValue: 'orange',
    },
    mobileBreakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Breakpoint for switching to mobile drawer',
      defaultValue: 'lg',
    },
    stickyOffset: {
      control: 'number',
      description: 'Top offset for sticky positioning (in pixels)',
      defaultValue: 96,
    },
  },
} satisfies Meta<typeof TableOfContentsV2>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample sections for stories
const blogSections = [
  { id: 'introduction', title: 'Introduction to Neubrutalist Design', level: 0 },
  { id: 'what-is-neubrutalism', title: 'What is Neubrutalism?', level: 0 },
  { id: 'core-principles', title: 'Core Design Principles', level: 1 },
  { id: 'color-theory', title: 'Bold Color Theory', level: 1 },
  { id: 'implementation', title: 'Implementation in Web Design', level: 0 },
  { id: 'typography', title: 'Typography Guidelines', level: 1 },
  { id: 'borders-shadows', title: 'Borders and Shadows', level: 1 },
  { id: 'interactive-elements', title: 'Interactive Elements', level: 1 },
  { id: 'case-studies', title: 'Case Studies', level: 0 },
  { id: 'spotify-wrapped', title: 'Spotify Wrapped 2023', level: 1 },
  { id: 'gumroad-redesign', title: 'Gumroad Redesign', level: 1 },
  { id: 'best-practices', title: 'Best Practices', level: 0 },
  { id: 'accessibility', title: 'Accessibility Considerations', level: 1 },
  { id: 'performance', title: 'Performance Impact', level: 1 },
  { id: 'conclusion', title: 'Conclusion', level: 0 },
];

const shortSections = [
  { id: 'intro', title: 'Getting Started', level: 0 },
  { id: 'setup', title: 'Installation & Setup', level: 0 },
  { id: 'usage', title: 'Basic Usage', level: 0 },
  { id: 'advanced', title: 'Advanced Features', level: 0 },
];

// Full blog article content for realistic demos
const BlogArticleContent = ({ sections }: { sections: Section[] }) => (
  <article style={{
    background: '#FFFFFF',
    border: '3px solid #000000',
    boxShadow: '6px 6px 0px #000000',
    padding: '48px',
  }}>
    {sections.map((section) => (
      <section key={section.id} id={section.id} style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: section.level === 0 ? '32px' : '24px',
          fontWeight: 'bold',
          marginBottom: '16px',
          marginLeft: section.level === 1 ? '24px' : '0',
          textTransform: 'uppercase',
        }}>
          {section.title}
        </h2>
        <div style={{ marginLeft: section.level === 1 ? '24px' : '0' }}>
          <p style={{ color: '#424242', marginBottom: '16px', lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neubrutalism represents a 
            return to raw, honest design principles that prioritize function and visual impact 
            over subtlety and refinement.
          </p>
          <p style={{ color: '#424242', marginBottom: '16px', lineHeight: '1.6' }}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This design 
            philosophy embraces bold borders, harsh shadows, and vibrant colors to create 
            interfaces that demand attention.
          </p>
        </div>
      </section>
    ))}
  </article>
);

interface Section {
  id: string;
  title: string;
  level?: number;
}

// Blog post wrapper component
const BlogPostWrapper = ({ children, showContent = true }: { children: React.ReactNode; showContent?: boolean }) => (
  <div style={{ minHeight: '200vh', background: '#F5F5F5' }}>
    {/* Header */}
    <div style={{
      background: '#FFFFFF',
      borderBottom: '3px solid #000000',
      padding: '48px 32px',
      marginBottom: '48px',
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#000000',
        textShadow: '4px 4px 0px #FF6B35',
        marginBottom: '16px',
        maxWidth: '1200px',
        margin: '0 auto 16px',
      }}>
        The Ultimate Guide to Neubrutalist Design
      </h1>
      <p style={{
        fontSize: '20px',
        color: '#424242',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        Discover how bold borders, harsh shadows, and vibrant colors are reshaping modern web design.
      </p>
    </div>

    {/* Content with TOC - Responsive */}
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 32px',
    }}>
      {/* Responsive Grid */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* TOC Container */}
        <div style={{ 
          maxWidth: '100%',
        }}>
          {children}
        </div>

        {/* Article Content */}
        {showContent && <BlogArticleContent sections={blogSections} />}
      </div>
    </div>
  </div>
);

// Stories
export const WithBlogContent: Story = {
  name: 'With Blog Content',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <BlogPostWrapper>
      <TableOfContentsV2 {...args} />
    </BlogPostWrapper>
  ),
};

export const StandaloneDesktop: Story = {
  name: 'Standalone TOC (Desktop)',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '350px' }}>
        <TableOfContentsV2 {...args} />
      </div>
    </div>
  ),
};

export const StandaloneMinimal: Story = {
  name: 'Standalone TOC (Minimal)',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: false,
    variant: 'minimal',
    accentColor: 'blue',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <TableOfContentsV2 {...args} />
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <BlogPostWrapper>
      <TableOfContentsV2 {...args} />
    </BlogPostWrapper>
  ),
};

export const MobileWithContent: Story = {
  name: 'Mobile With Content',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ background: '#F5F5F5', padding: '16px', minHeight: '200vh' }}>
      {/* Mobile Collapsible TOC */}
      <TableOfContentsV2 {...args} />
      
      {/* Article Content */}
      <article style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        padding: '24px',
        marginTop: '0',
      }}>
        {blogSections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: section.level === 0 ? '24px' : '20px',
              fontWeight: 'bold', 
              marginBottom: '12px',
              marginLeft: section.level === 1 ? '16px' : '0',
            }}>
              {section.title}
            </h2>
            <p style={{ 
              color: '#424242', 
              lineHeight: '1.6',
              marginLeft: section.level === 1 ? '16px' : '0',
            }}>
              Mobile content for {section.title}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </section>
        ))}
      </article>
    </div>
  ),
};

export const MobileDrawer: Story = {
  name: 'Mobile Drawer (Floating)',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'mobile',
    accentColor: 'orange',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', background: '#F5F5F5', padding: '24px' }}>
      <TableOfContentsV2 {...args} />
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Mobile Drawer Demo</h2>
        <p style={{ color: '#424242' }}>Click the menu button at the bottom left to open the Table of Contents drawer.</p>
      </div>
      <BlogArticleContent sections={blogSections} />
    </div>
  ),
};


export const WithoutProgress: Story = {
  args: {
    sections: blogSections,
    title: 'NAVIGATION',
    showProgress: false,
    variant: 'sidebar',
    accentColor: 'magenta',
  },
  render: (args) => (
    <BlogPostWrapper>
      <TableOfContentsV2 {...args} />
    </BlogPostWrapper>
  ),
};

export const BlueAccent: Story = {
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'blue',
  },
  render: (args) => (
    <BlogPostWrapper>
      <TableOfContentsV2 {...args} />
    </BlogPostWrapper>
  ),
};

export const RedAccent: Story = {
  args: {
    sections: blogSections,
    title: 'ARTICLE SECTIONS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'red',
  },
  render: (args) => (
    <BlogPostWrapper>
      <TableOfContentsV2 {...args} />
    </BlogPostWrapper>
  ),
};

export const AllColorVariants: Story = {
  name: 'All Color Variants (Standalone)',
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'minimal',
    accentColor: 'orange',
  },
  render: () => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
      }}>
        {(['orange', 'blue', 'magenta', 'red'] as const).map((color) => (
          <div key={color}>
            <h3 style={{ 
              marginBottom: '16px', 
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
              {color} Accent
            </h3>
            <TableOfContentsV2
              sections={blogSections}
              title="TABLE OF CONTENTS"
              showProgress={true}
              variant="minimal"
              accentColor={color}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CompactTOC: Story = {
  name: 'Compact TOC (Short Content)',
  args: {
    sections: shortSections,
    title: 'QUICK LINKS',
    showProgress: false,
    variant: 'minimal',
    accentColor: 'orange',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <TableOfContentsV2 {...args} />
        <div>
          <h2 style={{ marginBottom: '24px', fontSize: '32px', fontWeight: 'bold' }}>
            Quick Start Guide
          </h2>
          {shortSections.map((section, index) => (
            <section 
              key={section.id} 
              id={section.id} 
              style={{ 
                marginBottom: '48px',
                paddingTop: '48px',
                borderTop: index > 0 ? '3px solid #000000' : 'none',
              }}
            >
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                {section.title}
              </h3>
              <p style={{ color: '#424242', lineHeight: '1.6' }}>
                Content for {section.title}. This demonstrates how the TOC works with shorter content sections.
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  name: 'Responsive Behavior Demo',
  args: {
    sections: blogSections,
    title: 'RESPONSIVE TOC',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
    mobileBreakpoint: 'lg',
  },
  render: (args) => (
    <div style={{ minHeight: '200vh', background: '#F5F5F5', padding: '24px' }}>
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Responsive Table of Contents
        </h2>
        <p style={{ color: '#424242', marginBottom: '8px' }}>
          • Desktop (lg+): Sticky sidebar
        </p>
        <p style={{ color: '#424242', marginBottom: '8px' }}>
          • Mobile (&lt;lg): Collapsible TOC
        </p>
        <p style={{ color: '#424242' }}>
          Resize your browser to see the responsive behavior!
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <TableOfContentsV2 {...args} />
        <BlogArticleContent sections={blogSections} />
      </div>
    </div>
  ),
};