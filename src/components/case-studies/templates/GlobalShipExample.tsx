import React from "react";

// EXAMPLE: How to customize the generic templates for GlobalShip Logistics case study
// This shows how to replace the template variables with actual company data

// Copy GenericDashboard.tsx and replace these variables:
const COMPANY_NAME = "GlobalShip Logistics";
const BRAND_COLOR = "blue-600";
const DOMAIN_URL = "dashboard.globalship.com";
const LOGO_PATH = "/logos/globalship-logo.png"; // Would need to be added
const SERVICE_TYPE = "Automated Logistics Platform";
const STATS_TODAY = "2,847";
const STATS_ACTIVE = "2,400+";
const STATS_REVENUE = "$347K";
const STATS_GROWTH = "+23%";

// Copy GenericAnalytics.tsx and replace these variables:
const ANALYTICS_COMPANY = "GlobalShip Logistics";
const ANALYTICS_BRAND_COLOR = "purple-600";
const ANALYTICS_DOMAIN = "routes.globalship.com";
const ANALYTICS_SERVICE = "Route Optimization Engine";
const METRIC_1_VALUE = "$347K";
const METRIC_1_LABEL = "Cost Savings";
const METRIC_2_VALUE = "87%";
const METRIC_2_LABEL = "Auto-Processed";
const METRIC_3_VALUE = "2,400+";
const METRIC_3_LABEL = "Orders/Month";

// Then in CaseStudyModal.tsx, add:
/*
const isGlobalShipCaseStudy = caseStudy.id === "automated-logistics";

const globalShipScreens = [
  { name: "Control Dashboard", component: <GlobalShipDashboard /> },
  { name: "Route Optimizer", component: <GlobalShipAnalytics /> }
];

// Add to the conditional logic:
{(isJBCaseStudy ? jbScreens : 
  isGlobalShipCaseStudy ? globalShipScreens : 
  techStartScreens).map((screen, index) => (
    // Navigation buttons with brand colors
    className={`px-3 py-1 text-sm rounded-full border-2 transition-all ${
      currentScreen === index
        ? (isJBCaseStudy ? "border-yellow-600 bg-yellow-600 text-white" : 
           isGlobalShipCaseStudy ? "border-blue-600 bg-blue-600 text-white" :
           "border-indigo-600 bg-indigo-600 text-white")
        : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500"
    }`}
*/

export const GlobalShipExample = () => {
  return (
    <div className="rounded-lg bg-zinc-100 p-6">
      <h3 className="mb-4 text-lg font-bold">
        GlobalShip Implementation Example
      </h3>
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="mb-2 font-semibold">Step 1: Customize Templates</h4>
          <pre className="overflow-x-auto rounded bg-zinc-800 p-3 text-xs text-green-400">
            {`// GlobalShipDashboard.tsx (copied from GenericDashboard.tsx)
const COMPANY_NAME = "GlobalShip Logistics";
const BRAND_COLOR = "blue-600";
const DOMAIN_URL = "dashboard.globalship.com";
const SERVICE_TYPE = "Automated Logistics Platform";
const STATS_TODAY = "2,847";
const STATS_ACTIVE = "2,400+";
const STATS_REVENUE = "$347K";`}
          </pre>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Step 2: Add to Modal</h4>
          <pre className="overflow-x-auto rounded bg-zinc-800 p-3 text-xs text-green-400">
            {`// CaseStudyModal.tsx additions
const isGlobalShipCaseStudy = caseStudy.id === "automated-logistics";

const globalShipScreens = [
  { name: "Control Dashboard", component: <GlobalShipDashboard /> },
  { name: "Route Optimizer", component: <GlobalShipRouteOptimizer /> }
];`}
          </pre>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Step 3: Update Navigation</h4>
          <pre className="overflow-x-auto rounded bg-zinc-800 p-3 text-xs text-green-400">
            {`// Add GlobalShip to the screen mapping
{(isJBCaseStudy ? jbScreens : 
  isGlobalShipCaseStudy ? globalShipScreens : 
  techStartScreens).map((screen, index) => ...`}
          </pre>
        </div>

        <div className="rounded border border-green-200 bg-green-50 p-3">
          <h4 className="mb-1 font-semibold text-green-800">Result:</h4>
          <p className="text-xs text-green-700">
            GlobalShip case study now has 2 custom screens with proper branding,
            logistics-specific content, and blue navigation buttons that match
            their brand.
          </p>
        </div>
      </div>
    </div>
  );
};
