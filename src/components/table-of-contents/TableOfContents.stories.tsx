import type { Meta, StoryObj } from '@storybook/nextjs';
import { TableOfContents } from './TableOfContents';

const meta = {
  title: 'Blog/TableOfContents',
  component: TableOfContents,
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
    fullWidthLinks: {
      control: 'boolean',
      description: 'Make section links full width',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof TableOfContents>;

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

// Neubrutalist wrapper with content
const NeubrutalistWrapper = ({ 
  children, 
  variant = 'sidebar' 
}: { 
  children: React.ReactNode; 
  variant?: 'sidebar' | 'mobile' | 'minimal';
}) => (
  <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
    {/* Header */}
    <div style={{
      background: '#FFFFFF',
      borderBottom: '3px solid #000000',
      padding: '32px',
      marginBottom: '48px',
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#000000',
        textShadow: '4px 4px 0px #FF6B35',
        marginBottom: '16px',
      }}>
        The Ultimate Guide to Neubrutalist Design
      </h1>
      <p style={{
        fontSize: '20px',
        color: '#424242',
        maxWidth: '800px',
      }}>
        Discover how bold borders, harsh shadows, and vibrant colors are reshaping modern web design.
      </p>
    </div>
    
    {/* Layout Container */}
    <div style={{
      maxWidth: variant === 'sidebar' ? '1400px' : '800px',
      margin: '0 auto',
      padding: '0 32px',
      display: variant === 'sidebar' ? 'grid' : 'block',
      gridTemplateColumns: variant === 'sidebar' ? '300px 1fr' : undefined,
      gap: variant === 'sidebar' ? '48px' : undefined,
    }}>
      {/* TOC */}
      <div style={{ 
        position: variant === 'sidebar' ? 'relative' : undefined,
        marginBottom: variant === 'minimal' ? '32px' : undefined,
      }}>
        {children}
      </div>
      
      {/* Article Content */}
      <article style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px #000000',
        padding: '48px',
        marginTop: variant === 'sidebar' ? '0' : '32px',
      }}>
        {blogSections.map((section, index) => (
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
              {index % 3 === 0 && (
                <div style={{
                  background: '#FFF5F0',
                  border: '2px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  padding: '24px',
                  marginTop: '24px',
                  marginBottom: '24px',
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    💡 Pro Tip:
                  </p>
                  <p style={{ color: '#424242' }}>
                    When implementing neubrutalist design, always ensure sufficient contrast 
                    for accessibility while maintaining the bold aesthetic.
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}
      </article>
    </div>
  </div>
);

// Stories
export const Sidebar: Story = {
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
  ),
};

export const Mobile: Story = {
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
    <NeubrutalistWrapper variant="mobile">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
  ),
};

export const Minimal: Story = {
  args: {
    sections: shortSections,
    title: 'QUICK NAVIGATION',
    showProgress: false,
    variant: 'minimal',
    accentColor: 'blue',
  },
  render: (args) => (
    <NeubrutalistWrapper variant="minimal">
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        padding: '32px',
      }}>
        <TableOfContents {...args} />
      </div>
    </NeubrutalistWrapper>
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
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
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
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
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
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
  ),
};

export const LongContent: Story = {
  args: {
    sections: [
      ...blogSections,
      { id: 'resources', title: 'Additional Resources', level: 0 },
      { id: 'tools', title: 'Design Tools', level: 1 },
      { id: 'frameworks', title: 'CSS Frameworks', level: 1 },
      { id: 'inspiration', title: 'Inspiration Sites', level: 1 },
      { id: 'community', title: 'Community & Support', level: 0 },
      { id: 'forums', title: 'Discussion Forums', level: 1 },
      { id: 'social', title: 'Social Media Groups', level: 1 },
      { id: 'events', title: 'Events & Meetups', level: 1 },
    ],
    title: 'COMPLETE GUIDE',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
  ),
};

export const FullWidthLinks: Story = {
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
    fullWidthLinks: true,
  },
  render: (args) => (
    <NeubrutalistWrapper variant="sidebar">
      <TableOfContents {...args} />
    </NeubrutalistWrapper>
  ),
};

export const LinksComparison: Story = {
  args: {
    sections: blogSections,
    title: 'TABLE OF CONTENTS',
    showProgress: true,
    variant: 'sidebar',
    accentColor: 'orange',
  },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '48px', background: '#F5F5F5' }}>
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>Regular Links (Left-Aligned)</h3>
        <TableOfContents {...args} fullWidthLinks={false} />
      </div>
      <div>
        <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>Full-Width Links</h3>
        <TableOfContents {...args} fullWidthLinks={true} />
      </div>
    </div>
  ),
};