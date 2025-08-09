import type { Meta, StoryObj } from '@storybook/nextjs';
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
  executiveSummary: {
    readinessLevel: "High",
    estimatedAnnualOpportunity: "$420,000",
    immediateROI: "380%"
  },
  keyProblems: [
    {
      problem: "Tax preparation taking twice industry standard time",
      currentCost: "$140,000 annually in lost productivity",
      potentialGain: "70% reduction in preparation time"
    },
    {
      problem: "Client document collection causes significant delays",
      currentCost: "3 days average collection time",
      potentialGain: "80% faster document processing"
    },
    {
      problem: "Manual data entry prone to costly errors",
      currentCost: "4.5% error rate costing $50,000 annually",
      potentialGain: "96% reduction in errors"
    }
  ],
  recommendedSolutions: [
    {
      solutionName: "Tax Automation Suite",
      directImpact: ["Tax preparation time", "Accuracy"],
      primaryBenefits: [
        "Complete returns 70% faster with built-in accuracy checks",
        "Eliminate overtime costs during tax season",
        "Improve client satisfaction with faster turnaround"
      ],
      description: "Comprehensive tax preparation software that automates calculations, validates entries, and streamlines the entire return process.",
      realWorldProof: [
        {
          caseStudy: "Small CPA firm with 8 CPAs",
          metric: "Processed 500 returns in half the time"
        }
      ],
      implementationTime: "3 weeks"
    },
    {
      solutionName: "Document Intelligence Portal",
      directImpact: ["Document collection", "Client experience"],
      primaryBenefits: [
        "Clients upload documents directly with automatic categorization",
        "Eliminate missing documents and follow-ups",
        "Improve client experience through self-service"
      ],
      description: "Smart client portal that automates document requests, provides secure uploads, and uses AI to categorize and extract data.",
      realWorldProof: [
        {
          caseStudy: "Accounting practice serving 200 businesses",
          metric: "Reduced document collection time by 80%"
        }
      ],
      implementationTime: "2 weeks"
    },
    {
      solutionName: "Data Extraction Engine",
      directImpact: ["Manual data entry", "Error rates"],
      primaryBenefits: [
        "Extract financial data from any document format instantly",
        "Reduce errors to near zero",
        "Save 30 hours weekly during tax season"
      ],
      description: "AI-powered OCR and data extraction system that automatically pulls financial data from PDFs, images, and scanned documents.",
      realWorldProof: [
        {
          caseStudy: "Tax firm processing 1000+ returns annually",
          metric: "Eliminated manual entry and saved 30 hours weekly"
        }
      ],
      implementationTime: "4 weeks"
    }
  ],
  projectedOutcomes: [
    {
      tool: "Tax Automation Suite",
      metric: "Return Preparation",
      current: "8 hours",
      projected: "2.5 hours",
      improvementPercentage: "69%"
    },
    {
      tool: "Data Extraction Engine",
      metric: "Error Rate",
      current: "4.5%",
      projected: "0.2%",
      improvementPercentage: "96%"
    },
    {
      tool: "Document Intelligence Portal",
      metric: "Client Onboarding",
      current: "3 days",
      projected: "30 minutes",
      improvementPercentage: "99%"
    }
  ],
  whereToStart: {
    recommendation: "Document Intelligence Portal",
    targetBottleneck: "Client document collection causing significant delays",
    immediateImpact: "80% reduction in document collection time within 2 weeks",
    timelineEstimate: "2 weeks full implementation",
    expectedROI: "150% within first month",
    implementationNote: "Quick win with minimal disruption to existing processes"
  },
  callToAction: {
    primaryCTA: "Book Demo of Accounting AI Tools",
    secondaryCTA: "Download ROI Calculator",
    urgencyMessage: "Tax season approaching - implement before January"
  },
  // Legacy fields for backwards compatibility
  problemSummary: {
    industryProfile: "Small accounting firm with 8 CPAs serving 200 local businesses",
    topProblems: [
      "Tax preparation taking twice industry standard time",
      "Client document collection causes significant delays",
      "Manual data entry prone to costly errors"
    ],
    monthlyOpportunity: "$35,000"
  },
  solutions: [
    {
      category: "Tax Automation Suite",
      outcome: "Complete returns 70% faster with built-in accuracy checks",
      timeline: "3 weeks to implement",
      caseStudy: "Small CPA firm processed 500 returns in half the time, eliminating overtime costs and improving client satisfaction significantly"
    },
    {
      category: "Document Intelligence Portal",
      outcome: "Clients upload documents directly with automatic categorization",
      timeline: "2 weeks to implement",
      caseStudy: "Accounting practice reduced document collection time by 80%, eliminated missing documents, and improved client experience through self-service portal"
    },
    {
      category: "Data Extraction Engine",
      outcome: "Extract financial data from any document format instantly",
      timeline: "4 weeks to implement",
      caseStudy: "Tax firm eliminated manual entry, reduced errors to near zero, saved 30 hours weekly during tax season"
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
    ctaText: "Book demo of accounting AI tools for your firm",
    urgency: "Tax season approaching - implement before January"
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