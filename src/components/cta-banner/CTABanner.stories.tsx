import type { Meta, StoryObj } from '@storybook/nextjs';
import { CTABanner } from './CTABanner';

const meta: Meta<typeof CTABanner> = {
  title: 'Blog/CTABanner',
  component: CTABanner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# CTA Banner - Neubrutalist Call-to-Action Component

A bold, attention-grabbing CTA banner implementing the full neubrutalist design system with multiple variants for different conversion goals.

## Design System Features

### Neubrutalist Aesthetics
- **No rounded corners** - Sharp geometric edges
- **Bold 4px borders** with 8px brutal shadows
- **Gradient backgrounds** for visual impact
- **Diagonal stripe pattern** overlay for texture

### Typography
- **Display typography** with text shadows
- **Uppercase styling** for emphasis
- **Bold weight** for CTAs
- **High contrast** white on gradient

### Interactive Elements
- **Hover animations** with transform effects
- **Shadow depth changes** on interaction
- **Smooth transitions** for professional feel
- **Icon rotation** for visual interest

## Variants

### Default
Full-featured banner with icon, gradient background, and prominent CTA button.

### Newsletter
Email capture focused with mail icon and subscription messaging.

### Download
Content upgrade promotion with download icon and resource offer.

### Consultation
Service promotion with calendar icon and booking focus.

### Minimal
Clean, simple banner without gradient background for subtle CTAs.

## Color Options
- **Orange** (default) - High energy, attention-grabbing
- **Blue** - Professional, trustworthy
- **Magenta** - Creative, bold
- **Red** - Urgent, important

## Alignment Options
- **Center** (default) - Balanced, formal
- **Left** - Editorial, integrated
- **Right** - Unique, standout

## Usage Tips
- Place after intro paragraph for early engagement
- Use before conclusion for last-chance conversion
- Insert mid-article for content upgrades
- Add to sidebar for persistent visibility
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'newsletter', 'download', 'consultation', 'minimal'],
      description: 'Visual variant of the banner',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: 'text',
      description: 'Main headline text',
    },
    subtitle: {
      control: 'text',
      description: 'Supporting description text',
    },
    buttonText: {
      control: 'text',
      description: 'CTA button label',
    },
    buttonLink: {
      control: 'text',
      description: 'Button destination URL',
      table: {
        defaultValue: { summary: '#' },
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
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show/hide icon',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: 'Build Your AI App in 30 Days',
    subtitle: 'Join 500+ businesses using AI to transform their operations. No recurring fees, full ownership.',
    buttonText: 'Start Your Project',
    buttonLink: '/contact',
  },
};

// Newsletter variant
export const Newsletter: Story = {
  args: {
    variant: 'newsletter',
    title: 'Get AI Insights Weekly',
    subtitle: 'Join 10,000+ developers receiving cutting-edge AI tutorials and industry updates.',
    buttonText: 'Subscribe Now',
    accentColor: 'blue',
  },
};

// Download variant
export const Download: Story = {
  args: {
    variant: 'download',
    title: 'Free AI Development Guide',
    subtitle: 'Download our 50-page guide to building production-ready AI applications.',
    buttonText: 'Download PDF',
    accentColor: 'magenta',
  },
};

// Consultation variant
export const Consultation: Story = {
  args: {
    variant: 'consultation',
    title: 'Book Your Free Strategy Call',
    subtitle: 'Get personalized advice from our AI experts. Limited slots available.',
    buttonText: 'Schedule Call',
    accentColor: 'orange',
  },
};

// Minimal variant
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    title: 'Ready to get started with AI?',
    buttonText: 'Learn More',
  },
};

// Left aligned
export const LeftAligned: Story = {
  args: {
    title: 'Transform Your Business with AI',
    subtitle: 'Discover how artificial intelligence can streamline your operations and boost revenue.',
    buttonText: 'Get Started',
    alignment: 'left',
  },
};

// Right aligned
export const RightAligned: Story = {
  args: {
    title: 'Limited Time Offer',
    subtitle: '50% off AI implementation for the first 10 businesses this month.',
    buttonText: 'Claim Offer',
    alignment: 'right',
    accentColor: 'red',
  },
};

// Without icon
export const NoIcon: Story = {
  args: {
    title: 'Scale Your Startup with AI',
    subtitle: 'From MVP to market leader - leverage AI to accelerate growth.',
    buttonText: 'Explore Solutions',
    showIcon: false,
  },
};

// Blue accent
export const BlueAccent: Story = {
  args: {
    title: 'Enterprise AI Solutions',
    subtitle: 'Trusted by Fortune 500 companies for mission-critical AI deployments.',
    buttonText: 'Request Demo',
    accentColor: 'blue',
  },
};

// Magenta accent
export const MagentaAccent: Story = {
  args: {
    title: 'Creative AI Tools',
    subtitle: 'Unleash your creativity with our suite of AI-powered design tools.',
    buttonText: 'Try For Free',
    accentColor: 'magenta',
  },
};

// Short and punchy
export const ShortPunchy: Story = {
  args: {
    title: 'AI. Fast. Affordable.',
    buttonText: 'Get Quote',
    variant: 'minimal',
  },
};

// Newsletter minimal
export const NewsletterMinimal: Story = {
  args: {
    variant: 'minimal',
    title: 'Stay updated with AI trends',
    buttonText: 'Subscribe',
    accentColor: 'blue',
  },
};

// Urgent CTA
export const UrgentCTA: Story = {
  args: {
    title: 'Last Chance: 24 Hours Left',
    subtitle: 'Early bird pricing ends tomorrow. Lock in your 40% discount now.',
    buttonText: 'Secure Your Spot',
    accentColor: 'red',
  },
};

// Feature announcement
export const FeatureAnnouncement: Story = {
  args: {
    title: 'Introducing AI Code Reviews',
    subtitle: 'Automated code analysis powered by GPT-4. Catch bugs before they ship.',
    buttonText: 'See It In Action',
    variant: 'default',
    accentColor: 'magenta',
  },
};

// Course promotion
export const CoursePromotion: Story = {
  args: {
    variant: 'download',
    title: 'AI Development Masterclass',
    subtitle: '8-week intensive program. Learn to build production AI apps from scratch.',
    buttonText: 'Enroll Now',
    alignment: 'left',
  },
};

// Partnership CTA
export const PartnershipCTA: Story = {
  args: {
    title: 'Become an AI Partner',
    subtitle: 'Join our network of certified AI consultants. Training and leads provided.',
    buttonText: 'Apply Today',
    accentColor: 'blue',
    alignment: 'center',
  },
};

// Mobile app promotion
export const MobileAppPromo: Story = {
  args: {
    title: 'AI Assistant Now on Mobile',
    subtitle: 'Take your AI workflows anywhere. Available on iOS and Android.',
    buttonText: 'Download App',
    variant: 'download',
    accentColor: 'magenta',
  },
};

// Event registration
export const EventRegistration: Story = {
  args: {
    variant: 'consultation',
    title: 'AI Summit Dubai 2024',
    subtitle: 'Join 1000+ AI leaders for 3 days of learning and networking.',
    buttonText: 'Register Now',
    accentColor: 'orange',
  },
};

// Custom onClick handler example
export const WithClickHandler: Story = {
  args: {
    title: 'Track Your Conversions',
    subtitle: 'This banner logs clicks to the console for analytics integration.',
    buttonText: 'Click Me',
    onButtonClick: () => {
      console.log('CTA clicked!');
      alert('CTA clicked! Check console for tracking event.');
    },
  },
};