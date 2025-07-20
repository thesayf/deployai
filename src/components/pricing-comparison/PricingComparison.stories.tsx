import type { Meta, StoryObj } from '@storybook/react';
import { PricingComparison } from './PricingComparison';

const meta = {
  title: 'Blog/PricingComparison',
  component: PricingComparison,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title of the pricing comparison',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
    },
  },
} satisfies Meta<typeof PricingComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dubai Web Development Pricing Guide',
    subtitle: 'Compare service tiers and find the perfect fit for your project',
  },
};

export const CustomPricing: Story = {
  args: {
    title: 'AI-Powered Development Packages',
    subtitle: 'Faster delivery with cutting-edge technology',
    tiers: [
      {
        name: 'MVP Sprint',
        price: 'AED 25,000',
        timeline: '4 weeks',
        description: 'Launch your idea fast with AI assistance',
      },
      {
        name: 'Scale Package',
        price: 'AED 50,000',
        timeline: '6-8 weeks',
        description: 'Production-ready with advanced features',
        recommended: true,
      },
      {
        name: 'Enterprise AI',
        price: 'Custom Quote',
        timeline: '3+ months',
        description: 'Full AI integration and custom solutions',
      },
    ],
    features: [
      {
        name: 'AI-Assisted Development',
        basic: true,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Custom AI Models',
        basic: false,
        ecommerce: 'Basic',
        enterprise: true,
      },
      {
        name: 'Real-time Analytics',
        basic: false,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Deployment Support',
        basic: 'Basic',
        ecommerce: 'Full',
        enterprise: 'White-glove',
      },
      {
        name: 'API Integrations',
        basic: '3',
        ecommerce: '10',
        enterprise: 'Unlimited',
      },
    ],
  },
};

export const MinimalComparison: Story = {
  args: {
    title: 'Quick Pricing Overview',
    subtitle: '',
    features: [
      {
        name: 'Project Scope',
        basic: 'Simple Website',
        ecommerce: 'Online Store',
        enterprise: 'Custom Platform',
      },
      {
        name: 'Development Time',
        basic: '2-4 weeks',
        ecommerce: '4-8 weeks',
        enterprise: '2-6 months',
      },
      {
        name: 'Price Range',
        basic: 'AED 5K-15K',
        ecommerce: 'AED 15K-50K',
        enterprise: 'AED 50K+',
      },
      {
        name: 'Best For',
        basic: 'Small Business',
        ecommerce: 'Retail & Services',
        enterprise: 'Large Organizations',
      },
    ],
  },
};

export const FreelancerVsAgency: Story = {
  args: {
    title: 'Freelancer vs Agency vs AI-First',
    subtitle: 'Choose the right development partner for your needs',
    tiers: [
      {
        name: 'Freelancer',
        price: 'AED 3,000 - 20,000',
        timeline: '2-8 weeks',
        description: 'Individual developers, budget-friendly',
      },
      {
        name: 'Traditional Agency',
        price: 'AED 15,000 - 100,000',
        timeline: '4-16 weeks',
        description: 'Full team, established processes',
      },
      {
        name: 'AI-First Company',
        price: 'AED 10,000 - 75,000',
        timeline: '2-8 weeks',
        description: 'Fast delivery with AI automation',
        recommended: true,
      },
    ],
    features: [
      {
        name: 'Team Size',
        basic: '1 person',
        ecommerce: '3-10 people',
        enterprise: '2-5 people + AI',
      },
      {
        name: 'Project Management',
        basic: 'Basic',
        ecommerce: 'Dedicated PM',
        enterprise: 'AI-Enhanced PM',
      },
      {
        name: 'Design Process',
        basic: 'Template-based',
        ecommerce: 'Custom Design',
        enterprise: 'AI + Custom Design',
      },
      {
        name: 'Code Quality',
        basic: 'Variable',
        ecommerce: 'High',
        enterprise: 'AI-Reviewed',
      },
      {
        name: 'Support & Maintenance',
        basic: 'Limited',
        ecommerce: 'Full Support',
        enterprise: 'Automated + Human',
      },
      {
        name: 'Scalability',
        basic: false,
        ecommerce: true,
        enterprise: true,
      },
      {
        name: 'Risk Level',
        basic: 'Medium-High',
        ecommerce: 'Low',
        enterprise: 'Very Low',
      },
    ],
  },
};

export const TechnologyStack: Story = {
  args: {
    title: 'Technology Stack Comparison',
    subtitle: 'Popular tech choices in Dubai web development',
    tiers: [
      {
        name: 'WordPress/PHP',
        price: 'AED 5,000 - 25,000',
        timeline: '2-6 weeks',
        description: 'Traditional CMS approach',
      },
      {
        name: 'React/Next.js',
        price: 'AED 15,000 - 60,000',
        timeline: '4-10 weeks',
        description: 'Modern JavaScript framework',
        recommended: true,
      },
      {
        name: 'Custom Stack',
        price: 'AED 30,000+',
        timeline: '6-16 weeks',
        description: 'Tailored technology solution',
      },
    ],
    features: [
      {
        name: 'Performance',
        basic: 'Good',
        ecommerce: 'Excellent',
        enterprise: 'Excellent',
      },
      {
        name: 'SEO Capabilities',
        basic: 'Excellent',
        ecommerce: 'Excellent',
        enterprise: 'Customizable',
      },
      {
        name: 'Maintenance Cost',
        basic: 'Low',
        ecommerce: 'Medium',
        enterprise: 'High',
      },
      {
        name: 'Developer Availability',
        basic: 'High',
        ecommerce: 'High',
        enterprise: 'Medium',
      },
      {
        name: 'Scalability',
        basic: 'Limited',
        ecommerce: 'Excellent',
        enterprise: 'Unlimited',
      },
      {
        name: 'Security',
        basic: 'Plugin-based',
        ecommerce: 'Built-in',
        enterprise: 'Custom',
      },
    ],
  },
};