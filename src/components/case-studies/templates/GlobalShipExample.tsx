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
    <div className="p-6 bg-zinc-100 rounded-lg">
      <h3 className="font-bold text-lg mb-4">GlobalShip Implementation Example</h3>
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Step 1: Customize Templates</h4>
          <pre className="bg-zinc-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
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
          <h4 className="font-semibold mb-2">Step 2: Add to Modal</h4>
          <pre className="bg-zinc-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// CaseStudyModal.tsx additions
const isGlobalShipCaseStudy = caseStudy.id === "automated-logistics";

const globalShipScreens = [
  { name: "Control Dashboard", component: <GlobalShipDashboard /> },
  { name: "Route Optimizer", component: <GlobalShipRouteOptimizer /> }
];`}
          </pre>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Step 3: Update Navigation</h4>
          <pre className="bg-zinc-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Add GlobalShip to the screen mapping
{(isJBCaseStudy ? jbScreens : 
  isGlobalShipCaseStudy ? globalShipScreens : 
  techStartScreens).map((screen, index) => ...`}
          </pre>
        </div>
        
        <div className="bg-green-50 border border-green-200 p-3 rounded">
          <h4 className="font-semibold text-green-800 mb-1">Result:</h4>
          <p className="text-green-700 text-xs">
            GlobalShip case study now has 2 custom screens with proper branding, 
            logistics-specific content, and blue navigation buttons that match their brand.
          </p>
        </div>
      </div>
    </div>
  );
};