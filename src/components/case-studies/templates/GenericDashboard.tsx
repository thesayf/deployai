import React from "react";

// TEMPLATE VARIABLES TO CUSTOMIZE:
const COMPANY_NAME = "COMPANY_NAME"; // e.g., "TechStart Solutions"
const BRAND_COLOR = "BRAND_COLOR"; // e.g., "indigo-600"
const DOMAIN_URL = "DOMAIN_URL"; // e.g., "dashboard.techstart.io"
const LOGO_PATH = "LOGO_PATH"; // e.g., "/logos/techstart-logo.png"
const SERVICE_TYPE = "SERVICE_TYPE"; // e.g., "SaaS Platform"
const STATS_TODAY = "STATS_TODAY"; // e.g., "127"
const STATS_ACTIVE = "STATS_ACTIVE"; // e.g., "1,847"
const STATS_REVENUE = "STATS_REVENUE"; // e.g., "$12,450"
const STATS_GROWTH = "STATS_GROWTH"; // e.g., "+23%"

export const GenericDashboard = () => {
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
            <div className="font-semibold text-lg">{COMPANY_NAME} Dashboard</div>
            <div className="text-xs text-blue-100">{SERVICE_TYPE} Control Center</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Live</span>
          <span className="text-xs text-blue-100">{STATS_ACTIVE} Active Users</span>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Stats Overview */}
        <div className="p-4 grid grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Today's Activity</div>
            <div className="text-xl font-bold text-blue-600">{STATS_TODAY}</div>
            <div className="text-xs text-green-600">{STATS_GROWTH} vs yesterday</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Active Users</div>
            <div className="text-xl font-bold text-green-600">{STATS_ACTIVE}</div>
            <div className="text-xs text-zinc-500">Current session</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Revenue</div>
            <div className="text-xl font-bold text-purple-600">{STATS_REVENUE}</div>
            <div className="text-xs text-green-600">This month</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Automation Rate</div>
            <div className="text-xl font-bold text-orange-600">94%</div>
            <div className="text-xs text-green-600">+12% efficiency</div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900">Recent Activity</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live Updates</span>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-4">
              {/* Activity Feed */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">Live Activity Feed</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-semibold">New customer registered</p>
                      <p className="text-zinc-600">John Smith - Premium Plan</p>
                    </div>
                    <span className="text-green-600">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Payment processed</p>
                      <p className="text-zinc-600">Invoice #INV-2024-0847</p>
                    </div>
                    <span className="text-blue-600">5 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-semibold">Support ticket resolved</p>
                      <p className="text-zinc-600">Ticket #TKT-8947 closed</p>
                    </div>
                    <span className="text-purple-600">8 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-semibold">System optimization</p>
                      <p className="text-zinc-600">Performance improved by 15%</p>
                    </div>
                    <span className="text-orange-600">12 min ago</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="bg-zinc-50 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium">System Uptime</span>
                      <span className="text-xs font-bold text-green-600">99.9%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium">Response Time</span>
                      <span className="text-xs font-bold text-blue-600">127ms</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium">Customer Satisfaction</span>
                      <span className="text-xs font-bold text-purple-600">4.8/5</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • Custom Dashboard Platform
        </div>
      </div>
    </div>
  );
};