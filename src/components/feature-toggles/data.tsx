import {
  FiCheck,
} from "react-icons/fi";

const EmailAutomationComponent = () => {
  return (
    <div className="relative h-full w-full bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">AI Discovery Checklist</h3>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              Manufacturing Assessment
            </div>
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              30 min
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {/* Customer Service */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <FiCheck className="h-3 w-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Customer Service</h4>
                <p className="text-sm text-gray-600">Email support, live chat, phone inquiries</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">$3,400/month</div>
              <div className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">High Priority</div>
            </div>
          </div>
        </div>

        {/* Sales Process */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <FiCheck className="h-3 w-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Sales Process</h4>
                <p className="text-sm text-gray-600">Lead qualification, follow-ups, proposals</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">$5,100/month</div>
              <div className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">High Priority</div>
            </div>
          </div>
        </div>

        {/* Data Entry */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <FiCheck className="h-3 w-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Data Entry & Processing</h4>
                <p className="text-sm text-gray-600">Invoice processing, order entry, reports</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">$2,800/month</div>
              <div className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Medium Priority</div>
            </div>
          </div>
        </div>

        {/* Marketing */}
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                <FiCheck className="h-3 w-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Marketing Automation</h4>
                <p className="text-sm text-gray-600">Email campaigns, social media, content</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">$2,400/month</div>
              <div className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Quick Win</div>
            </div>
          </div>
        </div>

        {/* Inventory (unchecked) */}
        <div className="rounded-lg border border-gray-200 bg-white p-3 opacity-75">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded border-2 border-gray-300"></div>
              <div>
                <h4 className="font-medium text-gray-900">Inventory Management</h4>
                <p className="text-sm text-gray-600">Stock tracking, reorder alerts</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">$1,900/month</div>
              <div className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">Low Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-blue-900">Total Potential Savings</div>
            <div className="text-xs text-blue-700">From 4 automated processes</div>
          </div>
          <div className="text-2xl font-bold text-blue-900">$13,700/mo</div>
        </div>
      </div>
    </div>
  );
};

const BusinessTransformationComponent = () => {
  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      
      {/* Y-axis labels and grid lines */}
      <div className="absolute left-4 top-[20%] text-xs text-gray-600">4,000</div>
      <div className="absolute left-4 top-[40%] text-xs text-gray-600">3,000</div>
      <div className="absolute left-4 top-[60%] text-xs text-gray-600">2,000</div>
      <div className="absolute left-4 top-[80%] text-xs text-gray-600">1,000</div>
      
      {/* Chart SVG - showing cropped view focused on right side */}
      <svg className="absolute inset-0 w-full h-full" viewBox="200 0 400 250" preserveAspectRatio="xMinYMin slice">
        {/* Grid lines */}
        <line x1="0" y1="50" x2="800" y2="50" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="0" y1="100" x2="800" y2="100" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="0" y1="150" x2="800" y2="150" stroke="#1a1a1a" strokeWidth="1" />
        <line x1="0" y1="200" x2="800" y2="200" stroke="#1a1a1a" strokeWidth="1" />
        
        {/* Revenue Line (Teal/Green) - matching reference shape */}
        <path
          d="M 0 90 L 50 85 L 100 88 L 150 82 L 200 85 L 250 80 L 300 78 L 350 75 L 400 45 L 420 40 L 440 38 L 460 35 L 480 32 L 500 28 L 520 25 L 540 20 L 560 15 L 580 10 L 600 5"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
        />
        <path
          d="M 0 90 L 50 85 L 100 88 L 150 82 L 200 85 L 250 80 L 300 78 L 350 75 L 400 45 L 420 40 L 440 38 L 460 35 L 480 32 L 500 28 L 520 25 L 540 20 L 560 15 L 580 10 L 600 5"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="6"
          opacity="0.2"
        />
        
        {/* Costs Line (Orange/Red) - matching reference shape */}
        <path
          d="M 0 120 L 50 110 L 100 125 L 150 115 L 200 130 L 250 120 L 300 125 L 350 130 L 400 150 L 420 155 L 440 158 L 460 160 L 480 162 L 500 165 L 520 168 L 540 170 L 560 172 L 580 175 L 600 178"
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
        />
        <path
          d="M 0 120 L 50 110 L 100 125 L 150 115 L 200 130 L 250 120 L 300 125 L 350 130 L 400 150 L 420 155 L 440 158 L 460 160 L 480 162 L 500 165 L 520 168 L 540 170 L 560 172 L 580 175 L 600 178"
          fill="none"
          stroke="#f97316"
          strokeWidth="6"
          opacity="0.2"
        />
        
        {/* AI Deployment Marker - vertical line at divergence point */}
        <line x1="400" y1="0" x2="400" y2="250" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" opacity="0.4" />
      </svg>
      
      {/* AI System Deployed Label - centered on vertical line */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 z-10">
        <div className="text-blue-400 text-sm font-medium">
          AI System Deployed
        </div>
      </div>
      
      {/* Performance Metrics - positioned cleanly near the lines */}
      <div className="absolute top-[30%] right-[20%] z-10">
        <div className="text-green-400 font-bold text-sm">
          Revenue +340%
        </div>
      </div>
      
      <div className="absolute top-[65%] right-[25%] z-10">
        <div className="text-orange-400 font-bold text-sm">
          Costs -65%
        </div>
      </div>
      
      {/* ROI Box */}
      <div className="absolute bottom-6 right-6 rounded-lg bg-green-600 px-4 py-3 shadow-xl z-10">
        <div className="text-xs text-green-100">ROI in 30 Days</div>
        <div className="text-lg font-bold text-white">$487K/year saved</div>
      </div>
    </div>
  );
};

// Removed unused OrderProcessingComponent

const BusinessAuditComponent = () => {
  return (
    <div className="relative h-full w-full bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Hidden Cost Discovery
        </h3>
        <p className="text-xs text-gray-500">Q2 2024 Business Analysis</p>
      </div>

      {/* Two Column Layout */}
      <div className="mb-3 grid grid-cols-2 gap-3">
        {/* Left Column - Current Monthly Waste */}
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-700">
            Current Monthly Waste
          </h4>

          {/* Customer Support Stack */}
          <div className="mb-2 rounded-lg border border-red-200 bg-red-50 p-2">
            <div className="mb-1 text-sm font-semibold text-red-900">
              Customer Support Stack: $4,200/mo
            </div>
            <div className="space-y-0.5 text-xs text-red-700">
              <div className="flex justify-between">
                <span>Zendesk</span>
                <span>$1,800</span>
              </div>
              <div className="flex justify-between">
                <span>LiveChat</span>
                <span>$900</span>
              </div>
              <div className="flex justify-between">
                <span>Staff overtime</span>
                <span>$1,000</span>
              </div>
            </div>
          </div>

          {/* Marketing Automation */}
          <div className="mb-2 rounded-lg border border-orange-200 bg-orange-50 p-2">
            <div className="mb-1 text-sm font-semibold text-orange-900">
              Marketing Automation: $3,100/mo
            </div>
            <div className="space-y-0.5 text-xs text-orange-700">
              <div className="flex justify-between">
                <span>HubSpot</span>
                <span>$1,600</span>
              </div>
              <div className="flex justify-between">
                <span>Content tools</span>
                <span>$600</span>
              </div>
              <div className="flex justify-between">
                <span>Manual setup</span>
                <span>$500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hidden Revenue Loss */}
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-700">
            Lost Revenue Opportunity
          </h4>

          {/* Slow Response Time */}
          <div className="mb-2 rounded-lg border border-red-300 bg-red-50 p-2">
            <div className="text-sm font-semibold text-red-900">
              Slow Response: -$8,400/mo
            </div>
            <div className="text-xs text-red-700">
              23% leads abandon after 5+ min wait
            </div>
          </div>

          {/* Underutilized Data */}
          <div className="mb-2 rounded-lg border border-red-300 bg-red-50 p-2">
            <div className="text-sm font-semibold text-red-900">
              Underutilized Data: -$5,200/mo
            </div>
            <div className="text-xs text-red-700">
              15% lower conversion rates
            </div>
          </div>

          {/* Manual Quotes */}
          <div className="mb-2 rounded-lg border border-red-300 bg-red-50 p-2">
            <div className="text-sm font-semibold text-red-900">
              Manual Quotes: -$3,600/mo
            </div>
            <div className="text-xs text-red-700">
              48-hour turnaround loses 30% prospects
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Banner */}
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-2 bg-gray-900 p-3 text-center">
        <div className="flex flex-col justify-between rounded bg-red-600 p-3 h-20">
          <div className="text-xs text-red-100">Stop Waste</div>
          <div className="text-lg font-bold text-white">$23,400/mo</div>
        </div>
        <div className="flex flex-col justify-between rounded bg-orange-600 p-3 h-20">
          <div className="text-xs text-orange-100">Capture Lost</div>
          <div className="text-lg font-bold text-white">$17,200/mo</div>
        </div>
        <div className="flex flex-col justify-between rounded bg-blue-600 p-3 h-20">
          <div className="text-xs text-blue-100">Projected Revenue</div>
          <div className="text-lg font-bold text-white">$487,200</div>
        </div>
      </div>
    </div>
  );
};

// Removed unused OrderTask and ActiveOrderTask components

// Removed unused DataAnalyticsComponent

const AIRoadmapComponent = () => {
  return (
    <div className="relative h-full w-full p-4 bg-blue-50">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-900">90-Day AI Transformation Plan</h3>
        <div className="flex items-center gap-1 rounded bg-white px-2 py-1 text-xs text-zinc-600 border">
          <div className="h-5 w-5 rounded bg-zinc-200"></div>
          <span>Your Company</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Week 6 of 12</span>
          <span className="text-sm font-medium text-blue-600">50% Complete</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white border">
          <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"></div>
        </div>
      </div>

      {/* Current Phase */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-100 border border-green-200 p-3">
        <FiCheck className="h-5 w-5 text-green-600" />
        <div>
          <div className="text-sm font-medium text-green-900">Phase 2: Tool Integration</div>
          <div className="text-xs text-green-700">3 tools selected • 2 integrated</div>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <ToolCard name="Claude AI" rating="4.8" savings="$3,200/mo" />
        <ToolCard name="Zapier Pro" rating="4.6" savings="$1,800/mo" />
        <ToolCard name="Custom API" rating="5.0" savings="$5,000/mo" />
      </div>

      {/* ROI Summary */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-white border border-blue-200 p-3 shadow-lg">
        <div className="text-xs text-blue-600 mb-1">Projected Annual Savings</div>
        <div className="text-xl font-bold text-green-600">$120,000</div>
      </div>
    </div>
  );
};

const ToolCard = ({ name, rating, savings }: { name: string; rating: string; savings: string }) => {
  return (
    <div className="rounded-lg bg-white p-2 border">
      <div className="text-xs font-medium mb-1">{name}</div>
      <div className="flex items-center gap-1 text-xs text-yellow-600 mb-1">
        <span>★</span>
        <span>{rating}</span>
      </div>
      <div className="text-xs text-green-600 font-medium mb-2">{savings}</div>
      <button className="w-full rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700">
        Add to Plan
      </button>
    </div>
  );
};

// Removed unused ProcessOptimizationComponent

const GuidedImplementationComponent = () => {
  return (
    <div className="relative h-full w-full bg-gray-50 p-3">
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Week 4 of 9</span>
          <span className="text-xs font-medium text-blue-600">45% Complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </div>
      </div>

      {/* Video Call Interface */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {/* Main Video - Consultant */}
        <div className="col-span-2 rounded-lg bg-gray-900 p-2 relative h-32">
          <div className="absolute top-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
            AI Strategy Expert
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-2 h-12 w-12 mx-auto rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">JD</span>
              </div>
              <div className="text-xs text-gray-300">Sharing: API Flowchart</div>
            </div>
          </div>
        </div>

        {/* Client Video */}
        <div className="rounded-lg bg-gray-800 p-2 relative h-32">
          <div className="absolute top-2 left-2 rounded bg-black/50 px-1 py-0.5 text-xs text-white">
            You
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="h-10 w-10 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Implementation Checklist */}
      <div className="rounded-lg bg-white border p-2 mb-2">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Week 4 Tasks</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1">
            <FiCheck className="h-3 w-3 text-green-500" />
            <span className="text-gray-600 line-through">API Integration</span>
          </div>
          <div className="flex items-center gap-1">
            <FiCheck className="h-3 w-3 text-green-500" />
            <span className="text-gray-600 line-through">Database Setup</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded border-2 border-gray-300"></div>
            <span className="text-gray-800">Automation Workflows</span>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="absolute bottom-2 left-2 right-2 rounded bg-white border p-2">
        <div className="text-xs space-y-1">
          <div className="text-green-600 font-medium">Coach: Great progress on the API! 🎉</div>
          <div className="text-gray-500">You: Thanks! Ready for workflows next</div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <button className="rounded bg-gray-200 p-1">
          <div className="h-3 w-3 bg-gray-600 rounded"></div>
        </button>
        <button className="rounded bg-red-500 p-1">
          <div className="h-3 w-3 bg-white rounded"></div>
        </button>
      </div>
    </div>
  );
};

export const data = [
  {
    id: 1,
    title: "AI Strategy & Discovery",
    Component: EmailAutomationComponent,
    cardTitle: "🔍 AI Strategy & Discovery",
    cardSubtitle:
      "Analyze your current tools and processes to identify the biggest automation opportunities. Get industry-specific ROI projections and see exactly where AI will eliminate costs. Free 30-minute assessment with custom recommendations.",
  },
  {
    id: 2,
    title: "Deep Business Audit",
    Component: BusinessAuditComponent,
    cardTitle: "📊 Deep Business Audit",
    cardSubtitle:
      "Complete evaluation of your workflows, inefficiencies, and revenue opportunities. We map your processes, identify automation gaps, and create a prioritized action plan. Uncover hidden profit potential in your operations.",
  },
  {
    id: 3,
    title: "Custom AI Roadmap",
    Component: AIRoadmapComponent,
    cardTitle: "🗺️ Custom AI Roadmap",
    cardSubtitle:
      "90-day implementation plan with specific tools, timelines, and expected returns. Get step-by-step guides, vendor recommendations, and milestone tracking. Perfect for teams who want to implement AI themselves.",
  },
  {
    id: 4,
    title: "Guided Implementation",
    Component: GuidedImplementationComponent,
    cardTitle: "🤝 Guided Implementation",
    cardSubtitle:
      "Everything in the roadmap plus hands-on coaching and support. Monthly strategy calls, tool integration guidance, and 90-day optimization reviews. We guide you through every step of deployment.",
  },
  {
    id: 5,
    title: "Done-For-You Deployment",
    Component: BusinessTransformationComponent,
    cardTitle: "🚀 Done-For-You Deployment",
    cardSubtitle:
      "Complete AI system development and integration. We build, test, and deploy your custom solutions while you focus on running your business. Full ownership, zero ongoing fees, guaranteed results.",
  },
];
