# Report Generation Plan

## Overview

This document outlines the implementation plan for the report generation step that transforms the structured JSON data from our 4-stage AI analysis pipeline into a professional, markdown-formatted report.

### Goals
- Generate beautiful, readable reports from AI analysis data
- Maintain flexibility for future report customization
- Enable multiple export formats (web, PDF, email)
- Provide a professional deliverable to end users
- Support dynamic content while maintaining consistent formatting

### Current State
- Stages 1-4 generate structured JSON data stored in `ai_reports` table
- Basic report viewer displays raw data in tabbed interface
- No formatted narrative report generation

### Proposed State
- Add report generation as final step after Stage 4
- Generate markdown-formatted narrative report
- Rich formatting with tables, charts, emphasis
- Export capabilities for sharing

## Architecture

### Pipeline Integration

```
Current Flow:
[Quiz Submit] → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → [Email]

Proposed Flow:
[Quiz Submit] → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → [Report Gen] → [Email]
```

### Data Flow

```typescript
interface ReportGenerationFlow {
  input: {
    reportId: string;
    stage1Analysis: Stage1Analysis;
    stage2Market: Stage2MarketIntelligence;
    stage3Financial: Stage3FinancialAnalysis;
    stage4Strategic: Stage4StrategicRecommendations;
    userInfo: UserInfo;
  };
  
  processing: {
    llmPrompt: string;        // Comprehensive prompt with all data
    tokenLimit: number;       // 15,000-20,000 for full report
    temperature: number;      // 0.7 for creative but consistent output
  };
  
  output: {
    markdownReport: string;   // Full formatted report
    reportMetadata: {
      generatedAt: string;
      wordCount: number;
      sections: string[];
    };
  };
}
```

## Technical Implementation

### 1. New API Endpoint

Create `/api/reports/generate-report.ts`:

```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { reportId } = req.body;
  
  // Fetch all stage data
  const report = await fetchCompleteReport(reportId);
  
  // Generate markdown report
  const markdownReport = await generateAIContent(
    getReportSystemPrompt(),
    getReportUserPrompt(report),
    20000 // Increased token limit
  );
  
  // Store markdown
  await supabase
    .from('ai_reports')
    .update({ 
      markdown_report: markdownReport,
      report_generated_at: new Date().toISOString()
    })
    .eq('id', reportId);
    
  // Return success
  res.json({ success: true, reportId });
}
```

### 2. Report Generation Prompts

#### System Prompt
```typescript
const getReportSystemPrompt = () => `
You are a professional business consultant creating an AI transformation report.

Your role is to transform technical analysis data into a compelling, action-oriented business report that:
- Speaks to C-suite executives and decision makers
- Focuses on business value and ROI
- Provides clear, actionable recommendations
- Uses professional but engaging language
- Includes specific metrics and data points

Formatting Guidelines:
- Use markdown for rich formatting
- Structure content with clear hierarchy (# ## ###)
- Emphasize key metrics with **bold**
- Use > blockquotes for important insights
- Create tables for comparisons
- Use bullet points for easy scanning
- Include emoji sparingly for visual markers (✅ ❌ ⚡ 📈 🎯 ⏱️)

Tone: Professional, confident, action-oriented
Length: Comprehensive but concise (3,000-4,000 words)
`;
```

#### User Prompt Structure
```typescript
const getReportUserPrompt = (data: CompleteReportData) => `
Create a comprehensive AI transformation report using the following analysis data:

Company Information:
- Name: ${data.userInfo.company || 'The Organization'}
- Contact: ${data.userInfo.firstName} ${data.userInfo.lastName}
- Industry: ${data.stage1.analysis.businessContext.industry}

Analysis Results:
[Include all JSON data from stages 1-4]

Required Sections:
1. Executive Summary (1 page equivalent)
   - Headline statement
   - 3-4 key findings
   - Primary recommendation
   - Expected ROI and timeline

2. AI Readiness Assessment
   - Score breakdown with interpretation
   - Comparison to industry benchmarks
   - Strengths and gaps analysis

3. Recommended Solutions
   - Top 3-5 AI tools/platforms
   - Specific use cases for each
   - Implementation complexity
   - Expected outcomes

4. Financial Analysis
   - Current state costs
   - Investment required
   - ROI projections (conservative/realistic/optimistic)
   - Payback period
   - 2-year financial model

5. Implementation Roadmap
   - Phase 1: Quick wins (0-3 months)
   - Phase 2: Core transformation (3-6 months)
   - Phase 3: Advanced capabilities (6-12 months)
   - Key milestones and success metrics

6. Risk Analysis & Mitigation
   - Top 3-5 risks
   - Mitigation strategies
   - Change management considerations

7. Next Steps
   - Immediate actions (next 7 days)
   - 30-day plan
   - How deployAI can help

Format as a professional markdown document ready for rendering.
`;
```

### 3. Database Schema Update

```sql
-- Add columns for markdown report storage
ALTER TABLE ai_reports 
ADD COLUMN markdown_report TEXT,
ADD COLUMN report_generated_at TIMESTAMP,
ADD COLUMN report_version INTEGER DEFAULT 1,
ADD COLUMN report_metadata JSONB;

-- Index for quick retrieval
CREATE INDEX idx_ai_reports_markdown ON ai_reports(id) 
WHERE markdown_report IS NOT NULL;
```

### 4. Report Regeneration Logic

```typescript
// Allow regeneration with version tracking
async function regenerateReport(reportId: string, reason?: string) {
  const { data: currentReport } = await supabase
    .from('ai_reports')
    .select('report_version')
    .eq('id', reportId)
    .single();
    
  const newVersion = (currentReport?.report_version || 0) + 1;
  
  // Generate new report
  const markdownReport = await generateReportContent(reportId);
  
  // Update with new version
  await supabase
    .from('ai_reports')
    .update({
      markdown_report: markdownReport,
      report_version: newVersion,
      report_generated_at: new Date().toISOString(),
      report_metadata: {
        regeneration_reason: reason,
        previous_version: currentReport?.report_version
      }
    })
    .eq('id', reportId);
}
```

## Markdown Report Structure

### Detailed Section Templates

#### 1. Executive Summary
```markdown
# AI Transformation Report

**Prepared for:** [Company Name]  
**Date:** [Current Date]  
**Prepared by:** deployAI

---

## Executive Summary

### 🎯 Your AI Transformation Opportunity

**[Compelling headline from Stage 4 analysis]**

Your organization scored **[AI Score]/100** on our AI readiness assessment, indicating [interpretation]. With the right strategy, you can achieve:

- 📈 **[ROI]%** return on investment within [timeframe]
- ⏱️ **[Payback Period]** payback on initial investment
- 💰 **$[Annual Savings]** in operational efficiency gains
- 🚀 **[Revenue Increase]%** revenue growth opportunity

### Key Findings

1. **[Finding 1]**
   > [Supporting data or insight]

2. **[Finding 2]**
   > [Supporting data or insight]

3. **[Finding 3]**
   > [Supporting data or insight]

### Recommended Immediate Action

[Primary recommendation with specific first step]

---
```

#### 2. Readiness Assessment
```markdown
## AI Readiness Deep Dive

### Your AI Readiness Profile

| Dimension | Your Score | Industry Average | Assessment |
|-----------|------------|------------------|------------|
| AI Opportunity | [Score]/100 | [Avg]/100 | [✅ Above/⚠️ At/❌ Below] Average |
| ROI Potential | [Score]/100 | [Avg]/100 | [Status] |
| Implementation Risk | [Level] | Medium | [Status] |
| Market Opportunity | [Score]/100 | [Avg]/100 | [Status] |

### Strengths to Build On

**[Strength Category]**
- [Specific strength point]
- [Data point supporting this]
- [How to leverage]

### Gaps to Address

**[Gap Category]**
- Current state: [Description]
- Desired state: [Description]
- Path forward: [Specific steps]

---
```

#### 3. Solution Recommendations
```markdown
## Recommended AI Solutions

Based on your specific needs and readiness level, we recommend:

### 🥇 Priority 1: [Solution Category]

**Recommended Tool:** [Tool Name] by [Vendor]

- **Why This Fits:** [Specific reasons based on their pain points]
- **Investment:** $[Cost]/[period] 
- **Complexity:** [Low/Medium/High]
- **Time to Value:** [Timeframe]

**Expected Outcomes:**
- [Specific metric improvement]
- [Process improvement]
- [Cost saving]

**Implementation Overview:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

> 💡 **Pro Tip:** [Specific advice for this implementation]

### 🥈 Priority 2: [Solution Category]
[Similar structure...]

---
```

#### 4. Financial Analysis
```markdown
## Financial Analysis & ROI Projections

### Current State Costs

Your organization is currently spending:

| Cost Category | Weekly | Annual | Notes |
|---------------|--------|---------|--------|
| Manual Labor | $[Amount] | $[Amount] | [Hours] hours/week |
| Inefficiencies | $[Amount] | $[Amount] | [Description] |
| Opportunity Cost | $[Amount] | $[Amount] | [Lost revenue] |
| **Total** | **$[Amount]** | **$[Amount]** | - |

### Investment & Returns

**Total Investment Required:** $[Amount]

**Breakdown:**
- Software/Tools: $[Amount]
- Implementation: $[Amount]
- Training: $[Amount]
- Ongoing Support: $[Amount]

### ROI Scenarios

| Scenario | Adoption Rate | Year 1 ROI | Payback Period |
|----------|---------------|------------|----------------|
| Conservative | [%] | [%] | [Months] |
| **Realistic** | **[%]** | **[%]** | **[Months]** |
| Optimistic | [%] | [%] | [Months] |

### 2-Year Financial Model

```
Year 1:
- Investment: -$[Amount]
- Savings: +$[Amount]
- Revenue Gain: +$[Amount]
- Net Benefit: $[Amount]

Year 2:
- Ongoing Costs: -$[Amount]
- Savings: +$[Amount]
- Revenue Gain: +$[Amount]
- Net Benefit: $[Amount]

2-Year Total ROI: [%]
```

---
```

#### 5. Implementation Roadmap
```markdown
## Implementation Roadmap

### 📍 Phase 1: Quick Wins (Months 1-3)

**Focus:** [Description]

#### Key Initiatives
- [ ] [Initiative 1]
  - Owner: [Role]
  - Duration: [Timeframe]
  - Success Metric: [Metric]

- [ ] [Initiative 2]
  - Owner: [Role]
  - Duration: [Timeframe]
  - Success Metric: [Metric]

**Expected Outcomes:**
- [Outcome 1]
- [Outcome 2]

**Milestone:** [Major achievement]

### 📍 Phase 2: Core Transformation (Months 3-6)
[Similar structure...]

---
```

## Display and Rendering

### 1. React Component Integration

```typescript
// components/report-viewer/MarkdownReportViewer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const MarkdownReportViewer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="max-w-4xl mx-auto prose prose-neubrutalist">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom styled components
          h1: ({children}) => (
            <h1 className="text-4xl font-bold uppercase border-b-6 border-black pb-4 mb-8">
              {children}
            </h1>
          ),
          h2: ({children}) => (
            <h2 className="text-2xl font-bold uppercase mt-12 mb-6 bg-yellow-300 p-4 border-3 border-black shadow-hard">
              {children}
            </h2>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full border-3 border-black shadow-hard">
                {children}
              </table>
            </div>
          ),
          blockquote: ({children}) => (
            <blockquote className="border-l-6 border-blue-500 pl-6 my-6 bg-blue-50 py-4 pr-4">
              {children}
            </blockquote>
          ),
          code: ({node, inline, className, children, ...props}) => {
            // Syntax highlighting for code blocks
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
```

### 2. Report Page Enhancement

```typescript
// pages/report/[id].tsx updates
const ReportPage = () => {
  const [viewMode, setViewMode] = useState<'formatted' | 'data'>('formatted');
  
  return (
    <div>
      {/* Toggle between formatted and data view */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setViewMode('formatted')}
          className={`px-4 py-2 ${viewMode === 'formatted' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Formatted Report
        </button>
        <button 
          onClick={() => setViewMode('data')}
          className={`px-4 py-2 ${viewMode === 'data' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Data View
        </button>
      </div>
      
      {viewMode === 'formatted' ? (
        <MarkdownReportViewer markdown={report.markdown_report} />
      ) : (
        <ReportViewer {...existingProps} />
      )}
    </div>
  );
};
```

## Export Options

### 1. PDF Export

```typescript
// Using react-to-pdf or similar
import { usePDF } from 'react-to-pdf';

const ExportButton = ({ reportId }: { reportId: string }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `ai-report-${reportId}.pdf`,
    page: { margin: 20 }
  });
  
  return (
    <>
      <div ref={targetRef}>
        <MarkdownReportViewer markdown={markdown} />
      </div>
      <button onClick={() => toPDF()}>
        Download PDF
      </button>
    </>
  );
};
```

### 2. Email Template

```typescript
// Generate HTML version for emails
const generateEmailHTML = (markdown: string) => {
  // Convert markdown to HTML with inline styles
  const html = markdownToHTML(markdown);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Inline styles for email compatibility */
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
};
```

### 3. Print Styles

```css
/* Print-specific styles */
@media print {
  .prose {
    max-width: 100%;
  }
  
  .no-print {
    display: none;
  }
  
  h2 {
    page-break-before: auto;
    page-break-after: avoid;
  }
  
  table {
    page-break-inside: avoid;
  }
}
```

## Implementation Timeline

### Week 1: Foundation
- [ ] Create database schema updates
- [ ] Implement basic report generation endpoint
- [ ] Create initial prompt templates
- [ ] Test with sample data

### Week 2: Report Quality
- [ ] Refine prompts based on output quality
- [ ] Add markdown rendering component
- [ ] Implement report regeneration logic
- [ ] Add error handling

### Week 3: UI Integration
- [ ] Update report viewer page
- [ ] Add view mode toggle
- [ ] Implement loading states
- [ ] Add export buttons

### Week 4: Export Features
- [ ] Implement PDF export
- [ ] Create email template
- [ ] Add print styles
- [ ] Test across browsers

### Week 5: Polish & Launch
- [ ] Performance optimization
- [ ] Final UI polish
- [ ] Documentation
- [ ] Deploy to production

## Success Metrics

1. **Report Generation Time:** < 30 seconds
2. **Report Quality:** Consistent formatting, no hallucinations
3. **User Satisfaction:** Positive feedback on readability
4. **Export Success Rate:** > 95% successful exports
5. **Regeneration Usage:** < 10% need regeneration

## Future Enhancements

1. **Template System**
   - Multiple report templates for different industries
   - Customizable sections
   - Brand customization

2. **Interactive Elements**
   - Embedded charts using Chart.js
   - Interactive ROI calculators
   - Collapsible sections

3. **Collaboration Features**
   - Comments on report sections
   - Share via link
   - Track report views

4. **API Access**
   - Webhook for report generation
   - Bulk report generation
   - White-label options

## Conclusion

This report generation system will transform our raw AI analysis into professional, actionable business documents that provide clear value to users. By using markdown as our intermediate format, we maintain flexibility while delivering beautiful, consistent reports across all platforms.