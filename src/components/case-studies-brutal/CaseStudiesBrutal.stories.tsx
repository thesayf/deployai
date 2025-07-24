import type { Meta, StoryObj } from '@storybook/nextjs';
import { CaseStudiesBrutal } from './CaseStudiesBrutal';

const meta = {
  title: 'Sections/CaseStudiesBrutal',
  component: CaseStudiesBrutal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main heading for the case studies section',
    },
    subtitle: {
      control: 'text',
      description: 'Subheading text',
    },
    variant: {
      control: 'select',
      options: ['grid', 'carousel', 'stacked', 'bento', 'image-grid', 'image-hover'],
      description: 'Display layout variant',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color for highlights',
    },
    filter: {
      control: 'select',
      options: ['all', 'software', 'automation', 'ai', 'webapp'],
      description: 'Filter case studies by category',
    },
  },
} satisfies Meta<typeof CaseStudiesBrutal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Grid Layout
export const Default: Story = {
  args: {
    title: 'Real People, Real Impact',
    subtitle: 'See how we\'ve transformed operations for companies just like yours',
    variant: 'grid',
    accentColor: 'orange',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Grid Layout with Blue Accent
export const GridBlue: Story = {
  name: 'Grid Layout (Blue)',
  args: {
    title: 'Success Stories That Matter',
    subtitle: 'Real results from real businesses',
    variant: 'grid',
    accentColor: 'blue',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Carousel Layout
export const Carousel: Story = {
  name: 'Carousel Layout',
  args: {
    title: 'Client Success Showcase',
    subtitle: 'Scroll through our latest transformations',
    variant: 'carousel',
    accentColor: 'magenta',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Stacked Cards Layout
export const Stacked: Story = {
  name: 'Stacked Cards',
  args: {
    title: 'Impact Stack',
    subtitle: 'Layer by layer, see how we build success',
    variant: 'stacked',
    accentColor: 'red',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFF5F0' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Bento Grid Layout
export const Bento: Story = {
  name: 'Bento Grid',
  args: {
    title: 'Featured Transformations',
    subtitle: 'Our most impactful projects at a glance',
    variant: 'bento',
    accentColor: 'orange',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Filtered by AI Projects
export const AIProjects: Story = {
  name: 'AI Projects Only',
  args: {
    title: 'AI-Powered Solutions',
    subtitle: 'See how artificial intelligence transforms businesses',
    variant: 'grid',
    accentColor: 'blue',
    filter: 'ai',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F0F5FF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Mobile View Examples
export const MobileGrid: Story = {
  name: 'Mobile Grid View',
  args: {
    title: 'Real Impact',
    subtitle: 'Success stories that inspire',
    variant: 'grid',
    accentColor: 'orange',
    filter: 'all',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '24px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

export const MobileCarousel: Story = {
  name: 'Mobile Carousel View',
  args: {
    title: 'Success Stories',
    subtitle: 'Swipe to explore',
    variant: 'carousel',
    accentColor: 'blue',
    filter: 'all',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '24px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Image Grid Layout
export const ImageGrid: Story = {
  name: 'Image Grid Layout',
  args: {
    title: 'Visual Success Stories',
    subtitle: 'See the interfaces that transform businesses',
    variant: 'image-grid',
    accentColor: 'orange',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// Image Hover Layout
export const ImageHover: Story = {
  name: 'Image Hover Layout',
  args: {
    title: 'Interactive Case Studies',
    subtitle: 'Hover to discover the impact',
    variant: 'image-hover',
    accentColor: 'blue',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <CaseStudiesBrutal {...args} />
    </div>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  name: 'All Variants Showcase',
  render: () => (
    <div style={{ background: '#FFFFFF' }}>
      {/* Grid */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Grid Layout
        </h3>
        <CaseStudiesBrutal variant="grid" accentColor="orange" />
      </div>

      {/* Carousel */}
      <div style={{ padding: '48px', background: '#F5F5F5', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Carousel Layout
        </h3>
        <CaseStudiesBrutal variant="carousel" accentColor="blue" />
      </div>

      {/* Stacked */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Stacked Layout
        </h3>
        <CaseStudiesBrutal variant="stacked" accentColor="magenta" />
      </div>

      {/* Bento */}
      <div style={{ padding: '48px', background: '#F5F5F5', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Bento Grid Layout
        </h3>
        <CaseStudiesBrutal variant="bento" accentColor="red" />
      </div>

      {/* Image Grid */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Image Grid Layout
        </h3>
        <CaseStudiesBrutal variant="image-grid" accentColor="orange" />
      </div>

      {/* Image Hover */}
      <div style={{ padding: '48px', background: '#F5F5F5' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          Image Hover Layout
        </h3>
        <CaseStudiesBrutal variant="image-hover" accentColor="blue" />
      </div>
    </div>
  ),
};

// Color Accent Showcase
export const ColorAccents: Story = {
  name: 'All Color Accents',
  render: () => (
    <div style={{ background: '#FFFFFF' }}>
      <div style={{ padding: '48px' }}>
        <h3 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          marginBottom: '48px',
          textTransform: 'uppercase',
        }}>
          Color Accent Variations
        </h3>
        
        <div style={{ display: 'grid', gap: '64px' }}>
          {(['orange', 'blue', 'magenta', 'red'] as const).map((color) => (
            <div key={color}>
              <h4 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '24px',
                textTransform: 'capitalize',
              }}>
                {color} Accent
              </h4>
              <CaseStudiesBrutal 
                variant="grid" 
                accentColor={color}
                title={`${color.charAt(0).toUpperCase() + color.slice(1)} Success Stories`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};