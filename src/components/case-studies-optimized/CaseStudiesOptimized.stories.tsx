import type { Meta, StoryObj } from '@storybook/nextjs';
import { CaseStudiesOptimized } from './CaseStudiesOptimized';

const meta = {
  title: 'Sections/CaseStudiesOptimized',
  component: CaseStudiesOptimized,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main heading with clear value proposition',
    },
    subtitle: {
      control: 'text',
      description: 'Supporting text that reinforces the value',
    },
    variant: {
      control: 'select',
      options: ['data-focused', 'testimonial-first', 'before-after', 'minimal-distraction', 'personalized', 'image-showcase', 'image-testimonial'],
      description: 'Conversion-optimized layout variants',
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta', 'red'],
      description: 'Accent color for highlights and CTAs',
    },
    filter: {
      control: 'select',
      options: ['all', 'software', 'automation', 'ai', 'webapp'],
      description: 'Filter case studies by category',
    },
  },
} satisfies Meta<typeof CaseStudiesOptimized>;

export default meta;
type Story = StoryObj<typeof meta>;

// Data-Focused Variant (Best Practice: Focus on specific results)
export const DataFocused: Story = {
  name: 'Data-Focused (Results First)',
  args: {
    title: 'Proven Results That Drive Growth',
    subtitle: 'Data-backed success stories from businesses like yours',
    variant: 'data-focused',
    accentColor: 'orange',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Testimonial-First Variant (Best Practice: Social proof emphasis)
export const TestimonialFirst: Story = {
  name: 'Testimonial-First (Social Proof)',
  args: {
    title: 'What Our Clients Say',
    subtitle: 'Real feedback from real businesses experiencing real growth',
    variant: 'testimonial-first',
    accentColor: 'blue',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Before-After Variant (Best Practice: Show transformation clearly)
export const BeforeAfter: Story = {
  name: 'Before-After (Transformation)',
  args: {
    title: 'Transformations That Matter',
    subtitle: 'See the measurable impact we deliver in weeks, not months',
    variant: 'before-after',
    accentColor: 'magenta',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Minimal Distraction Variant (Best Practice: Reduce cognitive load)
export const MinimalDistraction: Story = {
  name: 'Minimal Distraction (Clean)',
  args: {
    title: 'Success Simplified',
    subtitle: 'Focus on what matters: results',
    variant: 'minimal-distraction',
    accentColor: 'red',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Personalized Variant (Best Practice: AI-driven relevance)
export const Personalized: Story = {
  name: 'Personalized (Smart Matching)',
  args: {
    title: 'Success Stories Like Yours',
    subtitle: 'Case studies matched to your industry and challenges',
    variant: 'personalized',
    accentColor: 'blue',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFF5F0' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Mobile Optimized Views
export const MobileDataFocused: Story = {
  name: 'Mobile: Data-Focused',
  args: {
    title: 'Proven Results',
    subtitle: 'Real impact, real fast',
    variant: 'data-focused',
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
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

export const MobileMinimal: Story = {
  name: 'Mobile: Minimal',
  args: {
    title: 'Success Stories',
    subtitle: 'Tap to explore',
    variant: 'minimal-distraction',
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
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Image Showcase Variant
export const ImageShowcase: Story = {
  name: 'Image Showcase (Visual Focus)',
  args: {
    title: 'See the Impact',
    subtitle: 'Visual proof of transformation',
    variant: 'image-showcase',
    accentColor: 'orange',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// Image + Testimonial Variant
export const ImageTestimonial: Story = {
  name: 'Image + Testimonial (Combined)',
  args: {
    title: 'Stories Behind the Success',
    subtitle: 'Real results with real testimonials',
    variant: 'image-testimonial',
    accentColor: 'magenta',
    filter: 'all',
  },
  render: (args) => (
    <div style={{ padding: '48px', background: '#F5F5F5' }}>
      <CaseStudiesOptimized {...args} />
    </div>
  ),
};

// All Variants Comparison
export const AllVariantsComparison: Story = {
  name: 'All Conversion-Optimized Variants',
  render: () => (
    <div style={{ background: '#FFFFFF' }}>
      {/* Header */}
      <div style={{ 
        padding: '48px', 
        background: '#000000',
        color: '#FFFFFF',
        textAlign: 'center',
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
        }}>
          Conversion-Optimized Case Study Variants
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.8, maxWidth: '800px', margin: '0 auto' }}>
          Based on 2024 research: data-driven results, social proof, clear transformations, 
          minimal distractions, and personalized experiences
        </p>
      </div>

      {/* Data-Focused */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          1. Data-Focused: Emphasize Measurable Results
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: B2B audiences who need to justify ROI. Features prominent metrics, ratings, and concrete outcomes.
        </p>
        <CaseStudiesOptimized variant="data-focused" accentColor="orange" />
      </div>

      {/* Testimonial-First */}
      <div style={{ padding: '48px', background: '#F5F5F5', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          2. Testimonial-First: Lead with Social Proof
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: Building trust quickly. Client testimonials create emotional connection before presenting data.
        </p>
        <CaseStudiesOptimized variant="testimonial-first" accentColor="blue" />
      </div>

      {/* Before-After */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          3. Before-After: Visualize the Transformation
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: Showing clear progress. Side-by-side comparisons make impact immediately obvious.
        </p>
        <CaseStudiesOptimized variant="before-after" accentColor="magenta" />
      </div>

      {/* Minimal Distraction */}
      <div style={{ padding: '48px', background: '#F5F5F5', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          4. Minimal Distraction: Focus on One Thing
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: High-intent visitors. Removes all friction with single metric and clear CTA.
        </p>
        <CaseStudiesOptimized variant="minimal-distraction" accentColor="red" />
      </div>

      {/* Personalized */}
      <div style={{ padding: '48px', background: '#F5F5F5', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          5. Personalized: Smart Content Matching
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: Diverse audiences. Shows relevance with industry matching and problem-solution alignment.
        </p>
        <CaseStudiesOptimized variant="personalized" accentColor="blue" />
      </div>

      {/* Image Showcase */}
      <div style={{ padding: '48px', borderBottom: '3px solid #000000' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          6. Image Showcase: Visual Engagement
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: Visual learners. Shows product/service in action with compelling imagery and overlay data.
        </p>
        <CaseStudiesOptimized variant="image-showcase" accentColor="orange" />
      </div>

      {/* Image + Testimonial */}
      <div style={{ padding: '48px', background: '#F5F5F5' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          7. Image + Testimonial: Combined Impact
        </h3>
        <p style={{ marginBottom: '32px', color: '#757575' }}>
          Best for: Maximum conversion. Combines visual proof with social proof for double impact.
        </p>
        <CaseStudiesOptimized variant="image-testimonial" accentColor="magenta" />
      </div>
    </div>
  ),
};

// Best Practices Demo
export const BestPracticesShowcase: Story = {
  name: 'Conversion Best Practices Demo',
  render: () => (
    <div style={{ padding: '48px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '48px',
          textAlign: 'center',
        }}>
          Case Study Section Best Practices for 2024
        </h2>

        {/* Best Practices Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '64px',
        }}>
          {[
            {
              title: '📊 Lead with Data',
              description: 'Show quantifiable results upfront. 280% average ROI speaks louder than vague promises.',
            },
            {
              title: '🎯 Minimize Distractions',
              description: 'One clear CTA per case study. Remove navigation and competing elements.',
            },
            {
              title: '📱 Mobile-First Design',
              description: 'Optimized for 6.92 billion smartphone users with touch-friendly interactions.',
            },
            {
              title: '⚡ Fast Loading',
              description: 'Lazy load images and optimize performance for instant engagement.',
            },
            {
              title: '🔄 A/B Test Everything',
              description: 'Test headlines, CTAs, and layouts. Document what converts best.',
            },
            {
              title: '🤖 Smart Personalization',
              description: 'Use AI to match case studies to visitor industry and challenges.',
            },
          ].map((practice, index) => (
            <div
              key={index}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
                {practice.title}
              </h3>
              <p style={{ color: '#757575' }}>{practice.description}</p>
            </div>
          ))}
        </div>

        {/* Live Example */}
        <div style={{ 
          background: '#F5F5F5', 
          padding: '48px', 
          border: '3px solid #000000',
          boxShadow: '6px 6px 0px #000000',
        }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '32px',
            textAlign: 'center',
          }}>
            Optimal Configuration for Maximum Conversion
          </h3>
          <CaseStudiesOptimized 
            variant="data-focused" 
            accentColor="orange"
            title="Join 50+ Companies Growing Faster"
            subtitle="Average 280% ROI in under 30 days"
          />
        </div>
      </div>
    </div>
  ),
};