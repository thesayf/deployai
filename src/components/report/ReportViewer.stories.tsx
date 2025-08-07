import type { Meta, StoryObj } from '@storybook/react';
import { ReportViewer } from './ReportViewer';
import { 
  generateEcommerceExample, 
  generateLawFirmExample, 
  generateHealthcareExample,
  generateManufacturingExample,
  ReportData
} from './types';

const meta = {
  title: 'Report/ReportViewer',
  component: ReportViewer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Report Viewer Component

A comprehensive report display component that renders AI assessment results with multiple design variants.

## Features
- **4 Design Variants**: Executive, Impact, Playful, Minimal
- **Responsive Layout**: Mobile, tablet, and desktop optimized
- **Word Limit Compliance**: All content respects schema word limits
- **Industry Examples**: Pre-built examples for different industries
- **Animated Elements**: Smooth transitions and counter animations

## Variants

### Executive (Default)
Professional, clean design with subtle colors and traditional business styling.

### Impact
High-contrast dark theme with bold colors for maximum visual impact.

### Playful
Colorful, engaging design with gradients and hover effects.

### Minimal
Simple, clean design focusing on content over decoration.

## Data Structure
The component expects data that exactly matches the JSON schema from the report generation:
- **problemSummary**: Industry profile and top 3 problems
- **solutions**: Exactly 3 AI solution recommendations
- **measurableImprovements**: Exactly 3 metric improvements
- **actionPlan**: ROI projection and call-to-action
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['executive', 'impact', 'playful', 'minimal'],
      description: 'Visual style variant'
    },
    companyName: {
      control: 'text',
      description: 'Company name for the report'
    },
    generatedDate: {
      control: 'date',
      description: 'Report generation date'
    },
    onScheduleConsultation: {
      action: 'scheduled',
      description: 'Callback when consultation button is clicked'
    }
  }
} satisfies Meta<typeof ReportViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// E-commerce Examples
export const ExecutiveEcommerce: Story = {
  args: {
    variant: 'executive',
    data: generateEcommerceExample(),
    companyName: 'TechStyle Fashion Co.',
    generatedDate: new Date()
  }
};

export const ImpactEcommerce: Story = {
  args: {
    variant: 'impact',
    data: generateEcommerceExample(),
    companyName: 'TechStyle Fashion Co.',
    generatedDate: new Date()
  }
};

// Law Firm Examples
export const ExecutiveLawFirm: Story = {
  args: {
    variant: 'executive',
    data: generateLawFirmExample(),
    companyName: 'Harrison & Associates LLP',
    generatedDate: new Date()
  }
};

export const PlayfulLawFirm: Story = {
  args: {
    variant: 'playful',
    data: generateLawFirmExample(),
    companyName: 'Harrison & Associates LLP',
    generatedDate: new Date()
  }
};

// Healthcare Examples
export const ExecutiveHealthcare: Story = {
  args: {
    variant: 'executive',
    data: generateHealthcareExample(),
    companyName: 'CarePoint Medical Group',
    generatedDate: new Date()
  }
};

export const MinimalHealthcare: Story = {
  args: {
    variant: 'minimal',
    data: generateHealthcareExample(),
    companyName: 'CarePoint Medical Group',
    generatedDate: new Date()
  }
};

// Manufacturing Examples
export const ImpactManufacturing: Story = {
  args: {
    variant: 'impact',
    data: generateManufacturingExample(),
    companyName: 'Precision Parts Industries',
    generatedDate: new Date()
  }
};

export const PlayfulManufacturing: Story = {
  args: {
    variant: 'playful',
    data: generateManufacturingExample(),
    companyName: 'Precision Parts Industries',
    generatedDate: new Date()
  }
};

// Custom data example showing word limit compliance
const customData: ReportData = {
  problemSummary: {
    industryProfile: "Small accounting firm with 8 CPAs serving 200 local businesses", // 11 words ✓
    topProblems: [
      "Tax preparation taking twice industry standard time", // 7 words ✓
      "Client document collection causes significant delays", // 6 words ✓
      "Manual data entry prone to costly errors" // 7 words ✓
    ],
    monthlyOpportunity: "$35,000"
  },
  solutions: [
    {
      category: "Tax Automation Suite", // 3 words ✓
      outcome: "Complete returns 70% faster with built-in accuracy checks", // 9 words ✓
      timeline: "3 weeks to implement",
      caseStudy: "Small CPA firm processed 500 returns in half the time, eliminating overtime costs and improving client satisfaction significantly" // 18 words ✓
    },
    {
      category: "Document Intelligence Portal", // 3 words ✓
      outcome: "Clients upload documents directly with automatic categorization", // 7 words ✓
      timeline: "2 weeks to implement",
      caseStudy: "Accounting practice reduced document collection time by 80%, eliminated missing documents, and improved client experience through self-service portal" // 18 words ✓
    },
    {
      category: "Data Extraction Engine", // 3 words ✓
      outcome: "Extract financial data from any document format instantly", // 8 words ✓
      timeline: "4 weeks to implement",
      caseStudy: "Tax firm eliminated manual entry, reduced errors to near zero, saved 30 hours weekly during tax season" // 17 words ✓
    }
  ],
  measurableImprovements: [
    {
      metric: "Return Preparation",
      currentState: "8 hours",
      projectedState: "2.5 hours",
      improvement: "69% faster"
    },
    {
      metric: "Error Rate",
      currentState: "4.5%",
      projectedState: "0.2%",
      improvement: "96% reduction"
    },
    {
      metric: "Client Onboarding",
      currentState: "3 days",
      projectedState: "30 minutes",
      improvement: "99% faster"
    }
  ],
  actionPlan: {
    roiProjection: "380% in 4 months",
    readinessLevel: "High - Cloud-based systems already in place",
    ctaText: "Book demo of accounting AI tools for your firm", // 9 words ✓
    urgency: "Tax season approaching - implement before January" // 7 words ✓
  }
};

export const CustomAccountingFirm: Story = {
  args: {
    variant: 'executive',
    data: customData,
    companyName: 'Thompson & Reid CPAs',
    generatedDate: new Date()
  }
};

// Interactive example with all variants
export const VariantComparison: Story = {
  render: (args) => (
    <div className="space-y-8 p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">All Variants Comparison</h2>
      <div className="space-y-16">
        {(['executive', 'impact', 'playful', 'minimal'] as const).map(variant => (
          <div key={variant} className="border-4 border-black">
            <div className="bg-black text-white p-4">
              <h3 className="text-xl font-bold uppercase">{variant} Variant</h3>
            </div>
            <ReportViewer
              {...args}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  args: {
    data: generateEcommerceExample(),
    companyName: 'Demo Company',
    generatedDate: new Date()
  },
  parameters: {
    docs: {
      source: {
        code: 'Multiple variants displayed for comparison'
      }
    }
  }
};