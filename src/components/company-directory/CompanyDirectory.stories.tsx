import type { Meta, StoryObj } from '@storybook/nextjs';
import { CompanyDirectory, type Company } from './CompanyDirectory';

const meta = {
  title: 'Blog/CompanyDirectory',
  component: CompanyDirectory,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive company directory component featuring advanced filtering and neubrutalist design aesthetics.

## Features

### Design System Implementation
- **Typography**: Full scale from Display (60px) to Caption (12px)
- **Spacing**: Consistent 8px grid system for vertical rhythm
- **Colors**: Professional palette with semantic meanings

### Interactive Elements
- **Filters**: Type, budget, and timeline with grouped layouts
- **Cards**: Company information with visual hierarchy
- **States**: Hover, active, and focus states for all interactive elements

### Responsive Design
- Mobile-first approach with collapsible filters
- Adaptive grid layout (1-3 columns)
- Touch-optimized interactions

### Accessibility
- WCAG-compliant color contrast ratios
- Keyboard navigation support
- Semantic HTML structure
- Screen reader optimizations

## Usage

\`\`\`tsx
import { CompanyDirectory } from '@/components/company-directory';

<CompanyDirectory
  companies={companyData}
  title="Find Your Development Partner"
  subtitle="Browse verified agencies and freelancers"
  showTypeFilter={true}
  showBudgetFilter={true}
  showTimelineFilter={true}
/>
\`\`\`

## Props

- **companies**: Array of company objects with ratings, specialties, and pricing
- **title**: Main heading (optional)
- **subtitle**: Descriptive text (optional)
- **showTypeFilter**: Toggle company type filter
- **showBudgetFilter**: Toggle budget range filter
- **showTimelineFilter**: Toggle timeline filter
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Directory title (Display L - 60px)',
    },
    subtitle: {
      control: 'text',
      description: 'Directory subtitle (Body L - 18px)',
    },
    showTypeFilter: {
      control: 'boolean',
      description: 'Show company type filter group',
    },
    showBudgetFilter: {
      control: 'boolean',
      description: 'Show budget range filter group',
    },
    showTimelineFilter: {
      control: 'boolean',
      description: 'Show timeline filter group',
    },
  },
} satisfies Meta<typeof CompanyDirectory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Dubai web development companies
const dubaiCompanies: Company[] = [
  {
    id: '1',
    name: 'deployAI',
    type: 'ai-first',
    rating: 5.0,
    reviewCount: 42,
    priceRange: 3,
    location: 'Dubai Internet City',
    specialties: ['AI Development', 'MVP in 4 Weeks', 'React/Next.js', 'Python', 'Machine Learning'],
    description: 'AI-powered web development delivering production-ready MVPs in 4 weeks. Specializing in intelligent applications with guaranteed delivery.',
    budgetRange: '5k-15k',
    timeline: 'under-1-month',
    featured: true,
  },
  {
    id: '2',
    name: 'RedSpider Web & Art Design',
    type: 'agency',
    rating: 4.8,
    reviewCount: 84,
    priceRange: 2,
    location: 'Business Bay',
    specialties: ['Web Design', 'E-commerce', 'WordPress', 'SEO', 'Digital Marketing'],
    description: 'Award-winning web design agency with 10+ years experience. Creating beautiful, functional websites for Dubai businesses.',
    budgetRange: '5k-15k',
    timeline: '1-3-months',
  },
  {
    id: '3',
    name: 'WebCastle Technologies',
    type: 'agency',
    rating: 4.8,
    reviewCount: 228,
    priceRange: 3,
    location: 'DIFC',
    specialties: ['Enterprise Solutions', 'Custom Development', 'Mobile Apps', 'Cloud Architecture'],
    description: '16+ years of industry experience delivering enterprise-grade web solutions. Trusted by leading UAE brands.',
    budgetRange: '15k-50k',
    timeline: '3-6-months',
    featured: true,
  },
  {
    id: '4',
    name: 'Ahmed Hassan - Full Stack Dev',
    type: 'freelancer',
    rating: 4.9,
    reviewCount: 37,
    priceRange: 1,
    location: 'Dubai Marina',
    specialties: ['React', 'Node.js', 'MongoDB', 'Fast Delivery'],
    description: 'Senior full-stack developer offering affordable web development. Quick turnaround for startups and small businesses.',
    budgetRange: 'under-5k',
    timeline: 'under-1-month',
  },
  {
    id: '5',
    name: 'Digital Gravity',
    type: 'agency',
    rating: 4.7,
    reviewCount: 156,
    priceRange: 4,
    location: 'Sheikh Zayed Road',
    specialties: ['Digital Transformation', 'UX/UI Design', 'Cloud Solutions', 'DevOps'],
    description: "Choice of UAE's leading brands for website design and web development services. Comprehensive digital solutions.",
    budgetRange: '50k-plus',
    timeline: '3-6-months',
  },
  {
    id: '6',
    name: 'CodeGuru Web Design',
    type: 'agency',
    rating: 5.0,
    reviewCount: 165,
    priceRange: 2,
    location: 'Al Barsha',
    specialties: ['Small Business Sites', 'Landing Pages', 'Maintenance', '24/7 Support'],
    description: 'Perfect 5-star rated agency specializing in small to medium business websites. 24/7 support included.',
    budgetRange: '5k-15k',
    timeline: '1-3-months',
  },
  {
    id: '7',
    name: 'Sarah Johnson - UI/UX Expert',
    type: 'freelancer',
    rating: 4.6,
    reviewCount: 23,
    priceRange: 2,
    location: 'JLT',
    specialties: ['UI/UX Design', 'Figma', 'Webflow', 'Prototyping', 'User Research'],
    description: 'Specialized in creating stunning user interfaces and seamless user experiences. From design to Webflow implementation.',
    budgetRange: '5k-15k',
    timeline: '1-3-months',
  },
  {
    id: '8',
    name: 'Zazz Technologies',
    type: 'agency',
    rating: 4.5,
    reviewCount: 198,
    priceRange: 3,
    location: 'Dubai Internet City',
    specialties: ['Security Focus', 'API Development', 'DevOps', 'Blockchain', 'Web3'],
    description: 'Top website development company with focus on security and scalability. 600+ companies served since 2009.',
    budgetRange: '15k-50k',
    timeline: '3-6-months',
  },
  {
    id: '9',
    name: 'AI Web Studios',
    type: 'ai-first',
    rating: 4.9,
    reviewCount: 31,
    priceRange: 3,
    location: 'Area 2071',
    specialties: ['AI Integration', 'Machine Learning', 'Chatbots', 'Automation', 'NLP'],
    description: 'Next-generation web development powered by AI. Building intelligent applications that learn and adapt.',
    budgetRange: '15k-50k',
    timeline: '1-3-months',
  },
  {
    id: '10',
    name: 'Rashed Al Maktoum - WordPress Pro',
    type: 'freelancer',
    rating: 4.7,
    reviewCount: 52,
    priceRange: 1,
    location: 'Deira',
    specialties: ['WordPress', 'WooCommerce', 'Arabic Sites', 'RTL Design'],
    description: 'WordPress specialist with expertise in Arabic and English websites. Fast, affordable, and reliable service.',
    budgetRange: 'under-5k',
    timeline: 'under-1-month',
  }
];

export const Default: Story = {
  args: {
    companies: dubaiCompanies,
    title: 'Top Web Development Companies in Dubai',
    subtitle: 'Compare agencies, freelancers, and AI-first companies to find your perfect development partner',
  },
};

export const NoFilters: Story = {
  args: {
    companies: dubaiCompanies,
    title: 'Web Development Partners',
    showTypeFilter: false,
    showBudgetFilter: false,
    showTimelineFilter: false,
  },
};

export const TypeFilterOnly: Story = {
  args: {
    companies: dubaiCompanies,
    title: 'Browse by Company Type',
    subtitle: 'Filter companies by their business model',
    showTypeFilter: true,
    showBudgetFilter: false,
    showTimelineFilter: false,
  },
};

export const BudgetFilterOnly: Story = {
  args: {
    companies: dubaiCompanies,
    title: 'Find Companies in Your Budget',
    subtitle: 'Discover development partners that match your financial requirements',
    showTypeFilter: false,
    showBudgetFilter: true,
    showTimelineFilter: false,
  },
};

export const EmptyState: Story = {
  args: {
    companies: [],
    title: 'No Companies Found',
    subtitle: 'Try adjusting your search criteria',
  },
};

export const SingleCompany: Story = {
  args: {
    companies: [dubaiCompanies[0]],
    title: 'Featured Partner',
  },
};

export const FreelancersOnly: Story = {
  args: {
    companies: dubaiCompanies.filter(c => c.type === 'freelancer'),
    title: 'Top Freelance Web Developers',
    subtitle: 'Independent professionals ready to bring your vision to life',
  },
};

export const HighBudgetOnly: Story = {
  args: {
    companies: dubaiCompanies.filter(c => c.budgetRange === '50k-plus' || c.budgetRange === '15k-50k'),
    title: 'Enterprise Development Partners',
    subtitle: 'Premium agencies for large-scale digital transformation projects',
  },
};

export const AIFirstOnly: Story = {
  args: {
    companies: dubaiCompanies.filter(c => c.type === 'ai-first'),
    title: 'AI-Powered Development',
    subtitle: 'Next-generation web development enhanced with artificial intelligence',
  },
};

export const TopRated: Story = {
  args: {
    companies: dubaiCompanies.filter(c => c.rating >= 4.8),
    title: 'Highest Rated Developers',
    subtitle: 'Companies with exceptional client satisfaction scores',
  },
};

export const FastDelivery: Story = {
  args: {
    companies: dubaiCompanies.filter(c => c.timeline === 'under-1-month'),
    title: 'Rapid Development Teams',
    subtitle: 'Get your project delivered in under 30 days',
  },
};

export const MobileView: Story = {
  args: {
    companies: dubaiCompanies.slice(0, 3),
    title: 'Mobile Directory View',
    subtitle: 'Responsive design for all devices',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};