# AI Business Quiz - Dev-Ready Specification

## Question Schema & Implementation Guide

### Question 1: Industry & Business Type
```json
{
  "id": "industry",
  "type": "text",
  "required": true,
  "maxLength": 100,
  "placeholder": "e.g., Commercial real estate brokerage, Personal injury law firm, E-commerce clothing retailer",
  "validation": "minLength: 5",
  "scoring": "contextual",
  "aiAnalysis": "industry-specific tools and case studies"
}
```
**What industry and business type best describes your company?**
*Be specific - e.g., "Commercial real estate brokerage," "Personal injury law firm," "E-commerce clothing retailer"*

---

### Question 2: Company Size
```json
{
  "id": "companySize",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "1-10", "label": "1-10 employees", "points": 1},
    {"value": "11-50", "label": "11-50 employees", "points": 2},
    {"value": "51-200", "label": "51-200 employees", "points": 3},
    {"value": "201-1000", "label": "201-1000 employees", "points": 4},
    {"value": "1000+", "label": "1000+ employees", "points": 5}
  ],
  "scoring": "1-5 points based on implementation complexity needs"
}
```
**How many employees does your company have?**

---

### Question 3: Primary Business Objectives
```json
{
  "id": "businessObjectives", 
  "type": "multi-select",
  "required": true,
  "maxSelections": 3,
  "minSelections": 1,
  "options": [
    {"value": "increase-revenue", "label": "Increase sales revenue by X%", "points": 3, "aiCategory": "sales-marketing"},
    {"value": "reduce-response-time", "label": "Reduce customer response time (hours to minutes)", "points": 4, "aiCategory": "customer-service"},
    {"value": "cut-costs", "label": "Cut operational costs by X%", "points": 3, "aiCategory": "process-automation"},
    {"value": "improve-satisfaction", "label": "Improve customer satisfaction scores", "points": 3, "aiCategory": "customer-experience"},
    {"value": "reduce-manual-work", "label": "Reduce manual processing time", "points": 4, "aiCategory": "automation"},
    {"value": "increase-conversions", "label": "Increase lead conversion rates", "points": 3, "aiCategory": "sales-ai"},
    {"value": "eliminate-errors", "label": "Eliminate data entry errors", "points": 4, "aiCategory": "data-automation"},
    {"value": "speed-fulfillment", "label": "Speed up order fulfillment", "points": 3, "aiCategory": "operations-ai"},
    {"value": "improve-quality", "label": "Improve product/service quality and reduce defects", "points": 4, "aiCategory": "quality-control"},
    {"value": "prevent-fraud", "label": "Prevent fraud and reduce financial risks", "points": 5, "aiCategory": "fraud-detection"},
    {"value": "reduce-downtime", "label": "Reduce equipment downtime and maintenance costs", "points": 5, "aiCategory": "predictive-maintenance"},
    {"value": "improve-hiring", "label": "Improve employee retention and hiring efficiency", "points": 3, "aiCategory": "hr-ai"},
    {"value": "enhance-security", "label": "Enhance cybersecurity and data protection", "points": 4, "aiCategory": "security-ai"},
    {"value": "accelerate-innovation", "label": "Accelerate innovation and product development", "points": 4, "aiCategory": "innovation-ai"},
    {"value": "meet-compliance", "label": "Meet regulatory compliance requirements", "points": 4, "aiCategory": "compliance-ai"},
    {"value": "reduce-environmental-impact", "label": "Reduce environmental impact and energy costs", "points": 3, "aiCategory": "sustainability-ai"}
  ],
  "scoring": "3-15 points total (sum of selected options)"
}
```
**What are your most important measurable goals this year? (Choose up to 3)**

---

### Question 4: Biggest Business Challenge
```json
{
  "id": "biggestChallenge",
  "type": "textarea",
  "required": true,
  "maxLength": 500,
  "minLength": 10,
  "placeholder": "Describe the single biggest issue limiting your business growth...",
  "scoring": "contextual",
  "aiAnalysis": "problem-specific solution mapping"
}
```
**What's the single biggest challenge limiting your business growth right now?**

---

### Question 5: Specific Problem Areas
```json
{
  "id": "problemAreas",
  "type": "multi-select",
  "required": true,
  "maxSelections": 10,
  "minSelections": 1,
  "options": [
    {"value": "lead-qualification", "label": "Lead qualification and follow-up", "points": 2, "aiCategory": "sales-automation"},
    {"value": "customer-support", "label": "Customer inquiry response/support", "points": 3, "aiCategory": "customer-service-ai"},
    {"value": "order-processing", "label": "Order processing and fulfillment", "points": 3, "aiCategory": "process-automation"},
    {"value": "inventory-tracking", "label": "Inventory tracking and management", "points": 3, "aiCategory": "inventory-ai"},
    {"value": "invoice-collections", "label": "Invoice creation and collections", "points": 2, "aiCategory": "finance-automation"},
    {"value": "employee-scheduling", "label": "Employee scheduling and payroll", "points": 2, "aiCategory": "hr-automation"},
    {"value": "appointment-booking", "label": "Appointment booking and calendar management", "points": 2, "aiCategory": "scheduling-automation"},
    {"value": "document-creation", "label": "Document creation and review", "points": 3, "aiCategory": "document-ai"},
    {"value": "data-entry", "label": "Data entry between systems", "points": 4, "aiCategory": "data-automation"},
    {"value": "quality-control", "label": "Quality control and inspection", "points": 4, "aiCategory": "quality-ai"},
    {"value": "reporting", "label": "Reporting and performance tracking", "points": 3, "aiCategory": "analytics-ai"}
  ],
  "scoring": "2-40 points total (sum of selected options)"
}
```
**Which specific processes cause you the most headaches? (Select all that apply)**

---

### Question 6: Cost Impact Assessment
```json
{
  "id": "costImpact",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "under-1k", "label": "Under $1,000/month", "points": 1},
    {"value": "1k-5k", "label": "$1,000 - $5,000/month", "points": 2},
    {"value": "5k-15k", "label": "$5,000 - $15,000/month", "points": 3},
    {"value": "15k-50k", "label": "$15,000 - $50,000/month", "points": 4},
    {"value": "over-50k", "label": "Over $50,000/month", "points": 5},
    {"value": "not-sure", "label": "Not sure, but it's significant", "points": 3}
  ],
  "scoring": "1-5 points (higher cost = higher AI ROI potential)"
}
```
**What's the monthly cost impact of your biggest operational problem?**
*Think about lost revenue, extra labor costs, missed opportunities*

---

### Question 7: Manual Work Assessment
```json
{
  "id": "manualWork",
  "type": "single-select", 
  "required": true,
  "options": [
    {"value": "under-10", "label": "Less than 10%", "points": 1},
    {"value": "10-25", "label": "10-25%", "points": 2},
    {"value": "25-40", "label": "25-40%", "points": 3},
    {"value": "40-60", "label": "40-60%", "points": 4},
    {"value": "over-60", "label": "More than 60%", "points": 5}
  ],
  "scoring": "1-5 points (more manual work = more automation opportunity)"
}
```
**How much time does your team spend on repetitive, manual tasks?**

---

### Question 8: Decision Making Maturity
```json
{
  "id": "decisionMaking",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "gut-instinct", "label": "Mostly gut instinct and experience", "points": 1},
    {"value": "some-data", "label": "Some data, but mainly for validation", "points": 2},
    {"value": "data-influences", "label": "Data influences most decisions", "points": 3},
    {"value": "strong-foundation", "label": "Strong data foundation with few gaps", "points": 4},
    {"value": "comprehensive", "label": "Comprehensive data analysis drives everything", "points": 5}
  ],
  "scoring": "1-5 points (data readiness for AI implementation)"
}
```
**How data-driven is your decision making?**

---

### Question 9: Current Systems
```json
{
  "id": "currentSystems",
  "type": "multi-select",
  "required": true,
  "maxSelections": 10,
  "minSelections": 1,
  "options": [
    {"value": "crm", "label": "CRM (Salesforce, HubSpot, etc.)", "integrationComplexity": "low"},
    {"value": "accounting", "label": "Accounting software (QuickBooks, Xero, etc.)", "integrationComplexity": "low"},
    {"value": "ecommerce", "label": "E-commerce platform (Shopify, WooCommerce, etc.)", "integrationComplexity": "medium"},
    {"value": "erp", "label": "ERP system (SAP, NetSuite, etc.)", "integrationComplexity": "high"},
    {"value": "project-mgmt", "label": "Project management tools (Asana, Monday, etc.)", "integrationComplexity": "low"},
    {"value": "email-marketing", "label": "Email marketing platforms", "integrationComplexity": "low"},
    {"value": "customer-support", "label": "Customer support software", "integrationComplexity": "medium"},
    {"value": "inventory", "label": "Inventory management systems", "integrationComplexity": "medium"},
    {"value": "spreadsheets", "label": "Just spreadsheets and basic tools", "integrationComplexity": "high"},
    {"value": "custom", "label": "Custom/proprietary systems", "integrationComplexity": "very-high"}
  ],
  "scoring": "contextual - used for integration complexity assessment"
}
```
**What business systems do you currently use? (Select all that apply)**

---

### Question 10: Integration Challenges
```json
{
  "id": "integrationChallenges",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "scattered-data", "label": "Data is scattered across different systems", "points": 4},
    {"value": "manual-entry", "label": "Manual data entry between systems", "points": 5},
    {"value": "no-reporting", "label": "Can't get real-time reporting/dashboards", "points": 3},
    {"value": "no-integration", "label": "Systems don't talk to each other", "points": 4},
    {"value": "switching-tools", "label": "Too much time spent switching between tools", "points": 3},
    {"value": "lost-info", "label": "Information gets lost or outdated", "points": 4},
    {"value": "no-single-source", "label": "No single source of truth for data", "points": 4},
    {"value": "systems-fine", "label": "Systems work fine, no major issues", "points": 1}
  ],
  "scoring": "1-5 points (integration opportunity assessment)"
}
```
**What's your biggest challenge with your current systems?**

---

### Question 11: AI Focus Area
```json
{
  "id": "aiFocus",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "customer-facing", "label": "Customer-facing (support, sales, marketing)", "aiCategory": "customer-experience"},
    {"value": "internal-ops", "label": "Internal operations (admin, processing, analysis)", "aiCategory": "operations"},
    {"value": "both-equal", "label": "Both equally important", "aiCategory": "comprehensive"},
    {"value": "not-sure", "label": "Not sure yet", "aiCategory": "assessment-needed"}
  ],
  "scoring": "categorical - determines tool recommendation focus"
}
```
**Where would AI tools have the biggest impact for your business?**

---

### Question 12: AI Experience Level
```json
{
  "id": "aiExperience",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "not-explored", "label": "Haven't explored AI/automation yet", "points": 1},
    {"value": "researching", "label": "Researching but haven't implemented", "points": 2},
    {"value": "mixed-results", "label": "Tested some tools with mixed results", "points": 3},
    {"value": "some-success", "label": "Have some successful implementations", "points": 4},
    {"value": "experienced", "label": "Experienced and looking to expand", "points": 5}
  ],
  "scoring": "1-5 points (implementation readiness)"
}
```
**What's your experience with AI or automation tools?**

---

### Question 13: Team Technical Skills
```json
{
  "id": "teamSkills",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "very-limited", "label": "Very limited - need lots of external help", "points": 1},
    {"value": "basic", "label": "Basic - can use standard software", "points": 2},
    {"value": "moderate", "label": "Moderate - comfortable with technology", "points": 3},
    {"value": "advanced", "label": "Advanced - strong technical skills", "points": 4},
    {"value": "expert", "label": "Expert - have data scientists/AI specialists", "points": 5}
  ],
  "scoring": "1-5 points (adoption readiness)"
}
```
**How tech-savvy is your team?**

---

### Question 14: Budget Range
```json
{
  "id": "budget",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "under-10k", "label": "Under $10K (small pilot)", "points": 1},
    {"value": "10k-50k", "label": "$10K - $50K (moderate project)", "points": 2},
    {"value": "50k-200k", "label": "$50K - $200K (significant investment)", "points": 3},
    {"value": "200k-plus", "label": "$200K+ (major transformation)", "points": 4},
    {"value": "need-roi", "label": "Need to see ROI projections first", "points": 2}
  ],
  "scoring": "1-4 points (investment capacity)"
}
```
**What budget range are you considering for AI solutions in the next 6-12 months?**

---

### Question 15: Timeline & Urgency
```json
{
  "id": "timeline",
  "type": "single-select",
  "required": true,
  "options": [
    {"value": "crisis-mode", "label": "Crisis mode - need solutions ASAP", "points": 4},
    {"value": "high-priority", "label": "High priority - within 3 months", "points": 3},
    {"value": "moderate-priority", "label": "Moderate priority - 6-12 months", "points": 2},
    {"value": "low-priority", "label": "Low priority - exploring for future", "points": 1}
  ],
  "scoring": "1-4 points (urgency factor)"
}
```
**What's your timeline for implementing AI solutions?**

---

### Question 16: Success Vision
```json
{
  "id": "successMetrics",
  "type": "textarea",
  "required": true,
  "maxLength": 300,
  "minLength": 20,
  "placeholder": "In 12 months, our biggest win would be...",
  "scoring": "contextual",
  "aiAnalysis": "ROI expectations and success criteria"
}
```
**Complete this statement: "In 12 months, our biggest win would be..."**

---

### Question 17: Leadership & Champion
```json
{
  "id": "leadership",
  "type": "textarea",
  "required": true,
  "maxLength": 200,
  "minLength": 10,
  "placeholder": "CEO, CTO, Operations Manager, etc.",
  "scoring": "contextual",
  "aiAnalysis": "implementation feasibility"
}
```
**Who would champion and oversee AI implementation in your organization?**

---

## Scoring System

### Total Score Calculation
```javascript
const calculateScore = (responses) => {
  let totalPoints = 0;
  
  // Direct point questions (sum)
  totalPoints += responses.companySize.points;
  totalPoints += responses.businessObjectives.reduce((sum, obj) => sum + obj.points, 0);
  totalPoints += responses.problemAreas.reduce((sum, prob) => sum + prob.points, 0);
  totalPoints += responses.costImpact.points;
  totalPoints += responses.manualWork.points;
  totalPoints += responses.decisionMaking.points;
  totalPoints += responses.integrationChallenges.points;
  totalPoints += responses.aiExperience.points;
  totalPoints += responses.teamSkills.points;
  totalPoints += responses.budget.points;
  totalPoints += responses.timeline.points;
  
  return totalPoints;
}
```

### Score Ranges & Recommendations
- **60-85 points**: High AI readiness → Advanced AI tools + specific ROI projections
- **40-59 points**: Medium readiness → Targeted solutions + implementation roadmap  
- **15-39 points**: Foundation building → Education + basic automation + growth plan

### AI Analysis Input Format
```json
{
  "industry": "string",
  "companySize": "string", 
  "businessObjectives": ["array of selected values"],
  "biggestChallenge": "string",
  "problemAreas": ["array of selected values"],
  "costImpactLevel": "string",
  "manualWorkPercentage": "string",
  "dataMaturity": "string",
  "currentSystems": ["array of selected values"],
  "mainIntegrationChallenge": "string",
  "aiFocusArea": "string",
  "aiExperienceLevel": "string",
  "teamSkillLevel": "string",
  "budgetRange": "string",
  "timelineUrgency": "string",
  "successVision": "string",
  "championRole": "string",
  "totalScore": "number",
  "readinessLevel": "string"
}
```

## Implementation Notes

- **Question count**: 17 questions (added 2 for better analysis)
- **Estimated completion time**: 5-6 minutes
- **Required fields**: All questions required
- **Validation**: Client-side and server-side validation for all inputs
- **Auto-save**: Save progress after each question
- **Mobile optimization**: Single question per screen
- **Progress indicator**: "Question X of 17" with progress bar

**✅ This version is ready for development and schema creation.**