import React from "react";

// TEMPLATE VARIABLES TO CUSTOMIZE:
const COMPANY_NAME = "COMPANY_NAME"; // e.g., "TechStart Solutions"
const BRAND_COLOR = "BRAND_COLOR"; // e.g., "purple-600"
const DOMAIN_URL = "DOMAIN_URL"; // e.g., "analytics.techstart.io"
const SERVICE_TYPE = "SERVICE_TYPE"; // e.g., "Business Intelligence"
const METRIC_1_VALUE = "METRIC_1_VALUE"; // e.g., "2.4M"
const METRIC_1_LABEL = "METRIC_1_LABEL"; // e.g., "Revenue"
const METRIC_2_VALUE = "METRIC_2_VALUE"; // e.g., "94%"
const METRIC_2_LABEL = "METRIC_2_LABEL"; // e.g., "Efficiency"
const METRIC_3_VALUE = "METRIC_3_VALUE"; // e.g., "847"
const METRIC_3_LABEL = "METRIC_3_LABEL"; // e.g., "Customers"

export const GenericAnalytics = () => {
  return (
    <div className="h-[600px] w-full rounded-2xl border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
      {/* Browser URL Bar */}
      <div className="bg-zinc-100 px-3 py-3 flex items-center gap-2 border-b border-zinc-200">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded px-3 py-1 text-xs text-zinc-600 border border-zinc-300">
            {DOMAIN_URL}
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className={`bg-${BRAND_COLOR} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className={`text-${BRAND_COLOR} font-bold text-sm`}>
              {COMPANY_NAME.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-lg">{COMPANY_NAME} Analytics</div>
            <div className="text-xs text-purple-100">{SERVICE_TYPE} Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Live Data</span>
          <span className="text-xs text-purple-100">Updated 2min ago</span>
        </div>
      </div>
      
      {/* Analytics Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Key Metrics */}
        <div className="p-4 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{METRIC_1_VALUE}</div>
            <div className="text-xs text-zinc-500 mb-2">{METRIC_1_LABEL}</div>
            <div className="text-xs text-green-600">+18% this month</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{METRIC_2_VALUE}</div>
            <div className="text-xs text-zinc-500 mb-2">{METRIC_2_LABEL}</div>
            <div className="text-xs text-green-600">+12% improvement</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{METRIC_3_VALUE}</div>
            <div className="text-xs text-zinc-500 mb-2">{METRIC_3_LABEL}</div>
            <div className="text-xs text-green-600">+24% growth</div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Performance Chart */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
              <div className="p-3 border-b border-zinc-200">
                <h3 className="font-semibold text-sm text-zinc-900">Performance Trends</h3>
                <span className="text-xs text-zinc-500">Last 30 days</span>
              </div>
              <div className="p-4">
                {/* Chart visualization */}
                <div className="flex items-end gap-1 h-24 mb-2">
                  <div className="bg-purple-600 w-4 h-12 rounded-t"></div>
                  <div className="bg-purple-600 w-4 h-16 rounded-t"></div>
                  <div className="bg-purple-600 w-4 h-10 rounded-t"></div>
                  <div className="bg-purple-600 w-4 h-18 rounded-t"></div>
                  <div className="bg-purple-600 w-4 h-20 rounded-t"></div>
                  <div className="bg-purple-600 w-4 h-22 rounded-t"></div>
                  <div className="bg-green-500 w-4 h-24 rounded-t animate-pulse"></div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs text-zinc-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span className="text-green-600 font-semibold">Sun</span>
                </div>
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
              <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-zinc-900">Real-time Activity</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live</span>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>New conversion</span>
                  </div>
                  <span className="text-green-600 font-semibold">+$1,249</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>User signup</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Enterprise</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Goal completed</span>
                  </div>
                  <span className="text-purple-600 font-semibold">+127%</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>API call optimized</span>
                  </div>
                  <span className="text-orange-600 font-semibold">-23ms</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Report generated</span>
                  </div>
                  <span className="text-yellow-600 font-semibold">PDF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-4 bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200">
              <h3 className="font-semibold text-sm text-zinc-900">Top Performing Segments</h3>
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-4 gap-2 p-3 bg-zinc-50 text-xs font-medium text-zinc-600 border-b border-zinc-200">
                <div>Segment</div>
                <div>Performance</div>
                <div>Growth</div>
                <div>Revenue</div>
              </div>
              <div className="text-xs">
                <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-medium">Enterprise Customers</div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 bg-zinc-200 rounded-full h-1">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-green-600">94%</span>
                  </div>
                  <div className="text-green-600 font-semibold">+28%</div>
                  <div className="font-semibold">$847K</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-medium">Premium Users</div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 bg-zinc-200 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <span className="text-blue-600">87%</span>
                  </div>
                  <div className="text-green-600 font-semibold">+19%</div>
                  <div className="font-semibold">$423K</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-medium">SMB Segment</div>
                  <div className="flex items-center gap-1">
                    <div className="w-12 bg-zinc-200 rounded-full h-1">
                      <div className="bg-purple-500 h-1 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <span className="text-purple-600">76%</span>
                  </div>
                  <div className="text-green-600 font-semibold">+15%</div>
                  <div className="font-semibold">$186K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • Advanced Analytics Platform
        </div>
      </div>
    </div>
  );
};