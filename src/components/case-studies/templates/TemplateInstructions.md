# Case Study Modal Template Instructions

This directory contains template components for quickly scaffolding new case study modals while preserving the existing working JB case study implementation.

## Using the Templates

### 1. For New Case Studies
Copy the template files and customize the placeholder variables:

```typescript
// Example: Creating a new "FinTech Solutions" case study
import { FinTechDashboard } from "./templates/FinTechDashboard";
import { FinTechAnalytics } from "./templates/FinTechAnalytics";

const finTechScreens = [
  { name: "Main Dashboard", component: <FinTechDashboard /> },
  { name: "Analytics View", component: <FinTechAnalytics /> }
];
```

### 2. Add to Modal Logic
In `CaseStudyModal.tsx`, add the new case study detection:

```typescript
const isFinTechCaseStudy = caseStudy.id === "fintech-solutions";

// Add screens array
const finTechScreens = [...];

// Add to navigation mapping
{(isJBCaseStudy ? jbScreens : 
  isGlobalShipCaseStudy ? globalShipScreens : 
  isFinTechCaseStudy ? finTechScreens : 
  techStartScreens).map((screen, index) => ...
```

### 3. Customize Placeholder Variables

Each template uses these customizable variables:
- `COMPANY_NAME` - Replace with actual company name
- `BRAND_COLOR` - Primary brand color (e.g., "blue-600", "purple-600")
- `DOMAIN_URL` - Company domain for URL bar
- `LOGO_PATH` - Path to company logo
- `SERVICE_TYPE` - Type of service (e.g., "Financial", "Healthcare")
- `METRIC_VALUE` - Key performance metric
- `STATS_*` - Various dashboard statistics

### 4. Template Structure

All templates follow this consistent structure:
```jsx
<div className="h-[600px] w-full rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] overflow-hidden">
  {/* Browser URL Bar */}
  <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
    // Standard browser chrome
  </div>
  
  {/* App Header */}
  <div className="bg-{BRAND_COLOR} text-white p-4 flex items-center justify-between">
    // Company branding and status
  </div>
  
  {/* Main Content */}
  <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
    // Industry-specific interface
  </div>

  {/* App Footer */}
  <div className="border-t border-zinc-200 p-4 bg-white">
    <div className="text-xs text-zinc-500 text-center">
      Powered by deployAI
    </div>
  </div>
</div>
```

## Available Templates

1. **GenericDashboard.tsx** - Basic admin dashboard template
2. **GenericChatbot.tsx** - AI chatbot interface template  
3. **GenericAnalytics.tsx** - Analytics/reporting dashboard template
4. **GenericBooking.tsx** - Booking/scheduling system template
5. **GenericCRM.tsx** - Customer relationship management template

## Industry-Specific Examples

- **HealthcareDashboard.tsx** - Medical practice management
- **FinTechAnalytics.tsx** - Financial services dashboard
- **EcommerceCRM.tsx** - Online retail customer management
- **ManufacturingControl.tsx** - Production monitoring system