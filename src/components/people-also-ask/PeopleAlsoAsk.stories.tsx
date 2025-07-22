import type { Meta, StoryObj } from '@storybook/nextjs';
import { PeopleAlsoAsk } from './PeopleAlsoAsk';

const meta: Meta<typeof PeopleAlsoAsk> = {
  title: 'Blog/PeopleAlsoAsk',
  component: PeopleAlsoAsk,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# People Also Ask - Neubrutalist FAQ Component

A comprehensive FAQ accordion component implementing the full neubrutalist design system with multiple variants and accent color options.

## Design System Features

### Typography Scale
- Display sizes for hero headings with brutal text shadows
- Consistent sizing from headings to body text
- Uppercase styling for emphasis elements

### Color System
- **Primary**: Electric Orange, Crimson Red, Cyber Blue, Deep Magenta
- **Neutrals**: Full grayscale from Concrete to Obsidian
- **Semantic**: Emerald (success), Amber (warning), Sapphire (info)

### Spacing System
- 8px base unit for consistent vertical rhythm
- Scales from xs (4px) to 3xl (64px)
- Applied systematically across all elements

### Brutal Aesthetics
- No rounded corners - pure geometric shapes
- Bold 3px black borders
- Dynamic shadow effects (4px default, 6px on hover)
- Numbered question badges with shadow effects
- Gradient accent bars on open items

## Variants

### Default
Full-featured with all brutal design elements including numbered badges and generous spacing.

### Compact
Reduced padding for denser information display while maintaining brutal aesthetics.

### Minimal
Simplified version with plus/minus icons instead of chevrons, no question numbers.

## Accent Colors

- **Orange** (default): High-energy, attention-grabbing
- **Blue**: Professional, trustworthy
- **Magenta**: Creative, bold

## Interaction Features

- Smooth Framer Motion animations
- Hover effects with shadow depth changes
- Color transitions on state changes
- Optional multi-select mode
- SEO-optimized with FAQ schema markup

## Technical Details

- Built with React and TypeScript
- Animated with Framer Motion
- Height measurements with react-use-measure
- Fully accessible keyboard navigation
- Semantic HTML structure
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'minimal'],
      description: 'Visual variant of the component',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    accentColor: {
      control: 'select',
      options: ['orange', 'blue', 'magenta'],
      description: 'Accent color theme',
      table: {
        defaultValue: { summary: 'orange' },
      },
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple questions to be open simultaneously',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpenIndex: {
      control: 'number',
      description: 'Index of initially open question (0-based)',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    title: {
      control: 'text',
      description: 'Main title for the FAQ section',
      table: {
        defaultValue: { summary: 'People Also Ask' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample FAQ data
const sampleFAQs = [
  {
    question: "What makes deployAI different from traditional development agencies?",
    answer: (
      <div>
        <p>deployAI stands out through our unique approach:</p>
        <ul>
          <li><strong>AI-First Development:</strong> We leverage cutting-edge AI tools to accelerate development by 10x</li>
          <li><strong>Fixed 30-Day Delivery:</strong> Guaranteed timeline with no scope creep</li>
          <li><strong>One-Time Payment:</strong> No recurring fees or hidden costs</li>
          <li><strong>Full Ownership:</strong> You own 100% of the code and infrastructure</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How does the 30-day development process work?",
    answer: (
      <div>
        <p>Our streamlined process ensures rapid delivery:</p>
        <ol>
          <li><strong>Week 1:</strong> Discovery & Architecture Design</li>
          <li><strong>Week 2-3:</strong> Core Development & AI Integration</li>
          <li><strong>Week 4:</strong> Testing, Deployment & Handover</li>
        </ol>
        <p>You'll receive daily updates and have direct access to our development team throughout the process.</p>
      </div>
    ),
  },
  {
    question: "What types of AI applications can you build?",
    answer: (
      <div>
        <p>We specialize in a wide range of AI-powered applications:</p>
        <ul>
          <li>Custom ChatGPT-style interfaces for your business</li>
          <li>AI-powered data analysis and reporting tools</li>
          <li>Intelligent document processing systems</li>
          <li>Automated customer service solutions</li>
          <li>Machine learning prediction models</li>
          <li>Computer vision applications</li>
        </ul>
        <p>Each solution is tailored to your specific business needs and integrated with your existing systems.</p>
      </div>
    ),
  },
  {
    question: "What's included in the fixed price?",
    answer: (
      <div>
        <p>Our all-inclusive package covers:</p>
        <ul>
          <li>✓ Complete custom application development</li>
          <li>✓ AI model integration and training</li>
          <li>✓ Cloud infrastructure setup</li>
          <li>✓ Security implementation</li>
          <li>✓ Testing and quality assurance</li>
          <li>✓ Deployment and go-live support</li>
          <li>✓ Documentation and knowledge transfer</li>
          <li>✓ 30-day post-launch support</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Do you offer ongoing support after delivery?",
    answer: (
      <div>
        <p>Yes! While our core offering is a one-time development service, we provide:</p>
        <ul>
          <li><strong>30 days free support</strong> after launch for any issues</li>
          <li><strong>Optional maintenance packages</strong> for ongoing updates</li>
          <li><strong>Pay-per-feature additions</strong> for future enhancements</li>
          <li><strong>Complete documentation</strong> so your team can maintain the app</li>
        </ul>
        <p>Most clients find they can manage the application independently after our thorough handover process.</p>
      </div>
    ),
  },
  {
    question: "What if my project requirements change during development?",
    answer: (
      <div>
        <p>We handle scope management through our proven process:</p>
        <ul>
          <li><strong>Fixed Core Scope:</strong> We lock in essential features during Week 1</li>
          <li><strong>Flexible Implementation:</strong> Minor adjustments are accommodated</li>
          <li><strong>Change Requests:</strong> Major changes can be added as Phase 2</li>
          <li><strong>Clear Communication:</strong> Daily updates keep everyone aligned</li>
        </ul>
        <p>This approach ensures on-time delivery while maintaining flexibility for critical adjustments.</p>
      </div>
    ),
  },
];

// Default story
export const Default: Story = {
  args: {
    items: sampleFAQs,
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about working with deployAI",
    defaultOpenIndex: 0,
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    items: sampleFAQs,
    title: "Quick FAQ",
    variant: 'compact',
  },
};

// Minimal variant
export const Minimal: Story = {
  args: {
    items: sampleFAQs.slice(0, 3),
    title: "Common Questions",
    variant: 'minimal',
  },
};

// Blue accent color
export const BlueAccent: Story = {
  args: {
    items: sampleFAQs,
    title: "Product FAQ",
    subtitle: "Learn more about our platform",
    accentColor: 'blue',
  },
};

// Magenta accent color
export const MagentaAccent: Story = {
  args: {
    items: sampleFAQs,
    title: "Creative Solutions FAQ",
    accentColor: 'magenta',
  },
};

// Multiple open allowed
export const MultipleOpen: Story = {
  args: {
    items: sampleFAQs,
    title: "Explore All Topics",
    subtitle: "Click multiple questions to compare answers",
    allowMultiple: true,
  },
};

// No default open
export const AllClosed: Story = {
  args: {
    items: sampleFAQs,
    title: "Click to Explore",
    defaultOpenIndex: null,
  },
};

// Different default open
export const ThirdItemOpen: Story = {
  args: {
    items: sampleFAQs,
    title: "AI Applications FAQ",
    defaultOpenIndex: 2,
  },
};

// Compact with blue accent
export const CompactBlue: Story = {
  args: {
    items: sampleFAQs,
    title: "Quick Reference",
    variant: 'compact',
    accentColor: 'blue',
  },
};

// Minimal with multiple
export const MinimalMultiple: Story = {
  args: {
    items: sampleFAQs.slice(0, 4),
    variant: 'minimal',
    allowMultiple: true,
    accentColor: 'magenta',
  },
};

// Kitchen sink - all features
export const KitchenSink: Story = {
  args: {
    items: [
      ...sampleFAQs,
      {
        question: "How do I get started with deployAI?",
        answer: (
          <div>
            <p>Getting started is simple:</p>
            <ol>
              <li><strong>Book a Strategy Call:</strong> Free 30-minute consultation</li>
              <li><strong>Receive Your Proposal:</strong> Fixed price and timeline</li>
              <li><strong>Sign Agreement:</strong> Simple contract, 50% deposit</li>
              <li><strong>Kick-off Meeting:</strong> Begin your 30-day journey</li>
            </ol>
            <p>
              <a href="#" style={{ color: '#FF6B35', fontWeight: 600 }}>
                Book your free strategy call today →
              </a>
            </p>
          </div>
        ),
      },
    ],
    title: "Everything About deployAI",
    subtitle: "Comprehensive guide to our services, process, and pricing",
    allowMultiple: true,
    defaultOpenIndex: 0,
  },
};

// Without title/subtitle
export const NoHeader: Story = {
  args: {
    items: sampleFAQs.slice(0, 3),
    title: undefined,
    subtitle: undefined,
  },
};

// Single item
export const SingleQuestion: Story = {
  args: {
    items: [{
      question: "Ready to build your AI application?",
      answer: (
        <div>
          <p>Let's transform your business with custom AI solutions.</p>
          <p>✓ 30-day delivery guaranteed<br/>
          ✓ Fixed one-time price<br/>
          ✓ You own everything</p>
          <p style={{ marginTop: '16px' }}>
            <strong>Book a free strategy call to discuss your project.</strong>
          </p>
        </div>
      ),
    }],
    variant: 'minimal',
    accentColor: 'orange',
  },
};

// Technical FAQ example
export const TechnicalFAQ: Story = {
  args: {
    items: [
      {
        question: "What tech stack do you use?",
        answer: "We use modern, scalable technologies including React/Next.js, Node.js, Python for AI, and cloud platforms like AWS/GCP.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer: "Yes, we specialize in API integrations and can connect with any system that has an API or database access.",
      },
      {
        question: "How do you ensure security?",
        answer: "We implement industry-standard security practices including encryption, secure authentication, and regular security audits.",
      },
      {
        question: "What about GDPR compliance?",
        answer: "All our applications are built with privacy by design, ensuring full GDPR and data protection compliance.",
      },
    ],
    title: "Technical Details",
    variant: 'compact',
    accentColor: 'blue',
  },
};