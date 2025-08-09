import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProfessionalReport } from './ProfessionalReport';
import { 
  generateEcommerceExample, 
  generateLawFirmExample, 
  generateHealthcareExample,
  generateManufacturingExample,
  ReportData
} from './types';

const meta = {
  title: 'Report/ProfessionalReport',
  component: ProfessionalReport,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Professional Report Component

A clean, document-style report component for AI assessment results. No animations, focused on content and readability.

## Features
- **3 Professional Variants**: Executive brief, narrative report, and data sheet
- **Clean Typography**: Professional document styling
- **No Animations**: Static, print-friendly layouts
- **Industry Examples**: Pre-built examples for different industries
- **Responsive Design**: Optimized for all screen sizes

## Variants

### Executive (Default)
Traditional business report format with sections, tables, and clear hierarchy.

### Narrative
Flowing prose style that tells a story about the business transformation opportunity.

### Datasheet
Compact, data-focused layout with minimal prose and maximum information density.

## Usage
Perfect for serious business contexts where animated components would be inappropriate.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['executive', 'narrative', 'datasheet'],
      description: 'Report format style'
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
} satisfies Meta<typeof ProfessionalReport>;

export default meta;
type Story = StoryObj<typeof meta>;

// Executive Brief Examples
export const ExecutiveEcommerce: Story = {
  name: 'Executive Brief - E-commerce',
  args: {
    variant: 'executive',
    data: generateEcommerceExample(),
    companyName: 'TechStyle Fashion Co.',
    generatedDate: new Date()
  }
};

export const ExecutiveLawFirm: Story = {
  name: 'Executive Brief - Law Firm',
  args: {
    variant: 'executive',
    data: generateLawFirmExample(),
    companyName: 'Harrison & Associates LLP',
    generatedDate: new Date()
  }
};

export const ExecutiveHealthcare: Story = {
  name: 'Executive Brief - Healthcare',
  args: {
    variant: 'executive',
    data: generateHealthcareExample(),
    companyName: 'CarePoint Medical Group',
    generatedDate: new Date()
  }
};

// Narrative Report Examples
export const NarrativeEcommerce: Story = {
  name: 'Narrative Report - E-commerce',
  args: {
    variant: 'narrative',
    data: generateEcommerceExample(),
    companyName: 'TechStyle Fashion Co.',
    generatedDate: new Date()
  }
};

export const NarrativeLawFirm: Story = {
  name: 'Narrative Report - Law Firm',
  args: {
    variant: 'narrative',
    data: generateLawFirmExample(),
    companyName: 'Harrison & Associates LLP',
    generatedDate: new Date()
  }
};

export const NarrativeManufacturing: Story = {
  name: 'Narrative Report - Manufacturing',
  args: {
    variant: 'narrative',
    data: generateManufacturingExample(),
    companyName: 'Precision Parts Industries',
    generatedDate: new Date()
  }
};

// Data Sheet Examples
export const DatasheetEcommerce: Story = {
  name: 'Data Sheet - E-commerce',
  args: {
    variant: 'datasheet',
    data: generateEcommerceExample(),
    companyName: 'TechStyle Fashion Co.',
    generatedDate: new Date()
  }
};

export const DatasheetHealthcare: Story = {
  name: 'Data Sheet - Healthcare',
  args: {
    variant: 'datasheet',
    data: generateHealthcareExample(),
    companyName: 'CarePoint Medical Group',
    generatedDate: new Date()
  }
};

export const DatasheetManufacturing: Story = {
  name: 'Data Sheet - Manufacturing',
  args: {
    variant: 'datasheet',
    data: generateManufacturingExample(),
    companyName: 'Precision Parts Industries',
    generatedDate: new Date()
  }
};

// Custom Accounting Firm Example
const accountingData: ReportData = {
  executiveSummary: {
    readinessLevel: "High",
    estimatedAnnualOpportunity: "$540,000",
    immediateROI: "425%"
  },
  keyProblems: [
    {
      problem: "Manual tax preparation consuming excessive billable hours",
      currentCost: "$180,000 annually in lost productivity",
      potentialGain: "65% reduction in preparation time"
    },
    {
      problem: "Client portal lacks document automation features",
      currentCost: "2 days average onboarding time",
      potentialGain: "94% faster client onboarding"
    },
    {
      problem: "Compliance tracking requires redundant manual processes",
      currentCost: "8% error rate in compliance",
      potentialGain: "99.8% accuracy rate achievable"
    }
  ],
  recommendedSolutions: [
    {
      solutionName: "Intelligent Tax Software with AI-Powered Form Population",
      directImpact: ["Manual tax preparation", "Calculation errors"],
      primaryBenefits: [
        "Automate calculations and populate forms from client data",
        "Eliminate calculation errors completely",
        "Increase client capacity by 40%"
      ],
      description: "Advanced tax preparation software that uses AI to automatically extract data from client documents, populate forms, and perform complex calculations. This solution integrates with existing practice management systems and provides real-time validation of entries.",
      realWorldProof: [
        {
          caseStudy: "Regional firm with 20 CPAs serving 500 clients",
          metric: "Reduced tax prep time by 65% and increased capacity by 40%"
        }
      ],
      implementationTime: "4 weeks"
    },
    {
      solutionName: "Client Experience Platform with Document Automation",
      directImpact: ["Client onboarding", "Document collection"],
      primaryBenefits: [
        "Self-service portal with automated document collection",
        "Reduce administrative workload by 60%",
        "Improve client satisfaction scores by 45%"
      ],
      description: "Comprehensive client portal that automates document requests, provides secure file sharing, and offers self-service options for common client needs. Features include automated reminders, e-signatures, and intelligent document classification.",
      realWorldProof: [
        {
          caseStudy: "Mid-size CPA practice with 350 clients",
          metric: "Improved satisfaction scores by 45% while reducing admin work by 60%"
        }
      ],
      implementationTime: "3 weeks"
    },
    {
      solutionName: "Compliance Automation Suite with Deadline Tracking",
      directImpact: ["Compliance tracking", "Deadline management"],
      primaryBenefits: [
        "Track deadlines and generate compliance reports automatically",
        "Eliminate missed deadlines completely",
        "Reduce compliance costs by 50%"
      ],
      description: "Intelligent compliance management system that automatically tracks regulatory deadlines, generates required reports, and provides audit trails. Includes built-in updates for changing regulations and customizable workflows for different compliance requirements.",
      realWorldProof: [
        {
          caseStudy: "Accounting firm specializing in corporate compliance",
          metric: "Eliminated missed deadlines and reduced compliance costs by 50%"
        }
      ],
      implementationTime: "5 weeks"
    }
  ],
  projectedOutcomes: [
    {
      tool: "Intelligent Tax Software",
      metric: "Tax Return Time",
      current: "6 hours",
      projected: "2 hours",
      improvementPercentage: "67%"
    },
    {
      tool: "Client Experience Platform",
      metric: "Client Onboarding",
      current: "2 days",
      projected: "1 hour",
      improvementPercentage: "94%"
    },
    {
      tool: "Compliance Automation Suite",
      metric: "Compliance Accuracy",
      current: "92%",
      projected: "99.8%",
      improvementPercentage: "8%"
    }
  ],
  whereToStart: {
    recommendation: "Intelligent Tax Software",
    targetBottleneck: "Manual tax preparation consuming excessive billable hours",
    immediateImpact: "65% reduction in tax preparation time within first month",
    timelineEstimate: "4 weeks full implementation",
    expectedROI: "425% within 6 months",
    implementationNote: "Our team handles all technical complexity - your CPAs just use the system"
  },
  callToAction: {
    primaryCTA: "Schedule Your Free Consultation",
    secondaryCTA: "Download Implementation Guide",
    urgencyMessage: "Tax season approaching - implement before January deadline"
  },
  // Legacy fields for backwards compatibility
  problemSummary: {
    industryProfile: "Mid-size accounting firm with 15 CPAs serving 350 clients",
    topProblems: [
      "Manual tax preparation consuming excessive billable hours",
      "Client portal lacks document automation features",
      "Compliance tracking requires redundant manual processes"
    ],
    monthlyOpportunity: "$45,000"
  },
  solutions: [
    {
      category: "Intelligent Tax Software",
      outcome: "Automate calculations and populate forms from client data",
      timeline: "4 weeks to implement",
      caseStudy: "Regional firm reduced tax prep time by 65%, eliminated calculation errors, and increased client capacity by 40%"
    },
    {
      category: "Client Experience Platform",
      outcome: "Self-service portal with automated document collection",
      timeline: "3 weeks to implement",
      caseStudy: "CPA practice improved client satisfaction scores by 45% while reducing administrative staff workload by 60% annually"
    },
    {
      category: "Compliance Automation Suite",
      outcome: "Track deadlines and generate compliance reports automatically",
      timeline: "5 weeks to implement",
      caseStudy: "Accounting firm eliminated missed deadlines, reduced compliance costs by 50%, and avoided all regulatory penalties completely"
    }
  ],
  measurableImprovements: [
    {
      metric: "Tax Return Time",
      currentState: "6 hours",
      projectedState: "2 hours",
      improvement: "67% faster"
    },
    {
      metric: "Client Onboarding",
      currentState: "2 days",
      projectedState: "1 hour",
      improvement: "94% faster"
    },
    {
      metric: "Compliance Accuracy",
      currentState: "92%",
      projectedState: "99.8%",
      improvement: "8% increase"
    }
  ],
  actionPlan: {
    roiProjection: "425% in 6 months",
    readinessLevel: "High - Modern infrastructure and tech-savvy team",
    ctaText: "Schedule demo of accounting automation solutions today",
    urgency: "Tax season approaching - implement before January deadline"
  }
};

export const AccountingFirmExecutive: Story = {
  name: 'Accounting Firm - Executive',
  args: {
    variant: 'executive',
    data: accountingData,
    companyName: 'Miller & Johnson CPAs',
    generatedDate: new Date()
  }
};

export const AccountingFirmNarrative: Story = {
  name: 'Accounting Firm - Narrative',
  args: {
    variant: 'narrative',
    data: accountingData,
    companyName: 'Miller & Johnson CPAs',
    generatedDate: new Date()
  }
};

export const AccountingFirmDatasheet: Story = {
  name: 'Accounting Firm - Data Sheet',
  args: {
    variant: 'datasheet',
    data: accountingData,
    companyName: 'Miller & Johnson CPAs',
    generatedDate: new Date()
  }
};

// Side-by-side Comparison
export const VariantComparison: Story = {
  name: 'All Variants Comparison',
  render: (args) => (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Professional Report Variants</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Three professional, non-animated report formats designed for serious business contexts.
        Each variant presents the same data with different emphasis and formatting.
      </p>
      
      <div className="space-y-16">
        {/* Executive Brief */}
        <div className="bg-white border-2 border-gray-300 shadow-lg">
          <div className="bg-gray-900 text-white p-4">
            <h3 className="text-xl font-bold">Executive Brief Format</h3>
            <p className="text-sm opacity-80 mt-1">Traditional business report with sections and tables</p>
          </div>
          <ProfessionalReport {...args} variant="executive" />
        </div>

        {/* Narrative Report */}
        <div className="bg-white border-2 border-gray-300 shadow-lg">
          <div className="bg-gray-900 text-white p-4">
            <h3 className="text-xl font-bold">Narrative Report Format</h3>
            <p className="text-sm opacity-80 mt-1">Story-driven format with flowing prose</p>
          </div>
          <ProfessionalReport {...args} variant="narrative" />
        </div>

        {/* Data Sheet */}
        <div className="bg-white border-2 border-gray-300 shadow-lg">
          <div className="bg-gray-900 text-white p-4">
            <h3 className="text-xl font-bold">Data Sheet Format</h3>
            <p className="text-sm opacity-80 mt-1">Compact, data-focused presentation</p>
          </div>
          <ProfessionalReport {...args} variant="datasheet" />
        </div>
      </div>
    </div>
  ),
  args: {
    data: generateHealthcareExample(),
    companyName: 'Demo Organization',
    generatedDate: new Date()
  },
  parameters: {
    docs: {
      source: {
        code: 'All three professional variants displayed for comparison'
      }
    }
  }
};

// Print Preview Example
export const PrintPreview: Story = {
  render: (args) => (
    <div className="bg-white min-h-screen">
      <div className="p-4 bg-gray-100 border-b border-gray-300 print:hidden">
        <p className="text-sm text-gray-600 text-center">
          This view shows how the report will look when printed. Use Cmd/Ctrl+P to print.
        </p>
      </div>
      <ProfessionalReport {...args} />
    </div>
  ),
  args: {
    variant: 'executive',
    data: generateLawFirmExample(),
    companyName: 'Professional Services Inc.',
    generatedDate: new Date()
  },
  parameters: {
    docs: {
      description: {
        story: 'Print-optimized view without animations or unnecessary UI elements'
      }
    }
  }
};