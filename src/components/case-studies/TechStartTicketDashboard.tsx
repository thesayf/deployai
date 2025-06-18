import React from "react";

export const TechStartTicketDashboard = () => {
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
            admin.techstart.io/tickets
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-slate-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-slate-700 font-bold text-sm">TS</span>
          </div>
          <div>
            <div className="font-semibold text-lg">Support Admin Panel</div>
            <div className="text-xs text-slate-300">Ticket Management Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Live</span>
          <span className="text-xs text-slate-300">23 Active Tickets</span>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Status Overview */}
        <div className="p-4 grid grid-cols-5 gap-3">
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">New Tickets</div>
            <div className="text-lg font-bold text-blue-600">7</div>
            <div className="text-xs text-zinc-500">Last 24h</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">AI Resolved</div>
            <div className="text-lg font-bold text-green-600">142</div>
            <div className="text-xs text-green-600">This week</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Escalated</div>
            <div className="text-lg font-bold text-orange-600">3</div>
            <div className="text-xs text-zinc-500">Needs human</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Avg Response</div>
            <div className="text-lg font-bold text-purple-600">3min</div>
            <div className="text-xs text-green-600">-87% vs manual</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Satisfaction</div>
            <div className="text-lg font-bold text-yellow-600">4.7★</div>
            <div className="text-xs text-green-600">+1.5 improvement</div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900">Recent Ticket Activity</h3>
              <div className="flex gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Auto-Processing</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Real-time</span>
              </div>
            </div>
            
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-2 p-3 bg-zinc-50 text-xs font-medium text-zinc-600 border-b border-zinc-200">
                <div>Ticket ID</div>
                <div>Customer</div>
                <div>Issue Type</div>
                <div>Status</div>
                <div>Assigned To</div>
                <div>Response Time</div>
                <div>Satisfaction</div>
              </div>
              
              {/* Table Rows */}
              <div className="text-xs">
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#TS-3847</div>
                  <div>Alex M.</div>
                  <div>API Integration</div>
                  <div><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Resolved</span></div>
                  <div className="text-indigo-600">AI Assistant</div>
                  <div className="font-medium text-green-600">2 min</div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#TS-3848</div>
                  <div>Sarah K.</div>
                  <div>Billing Query</div>
                  <div><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">In Progress</span></div>
                  <div className="text-indigo-600">AI Assistant</div>
                  <div className="font-medium">1 min</div>
                  <div>-</div>
                </div>
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#TS-3849</div>
                  <div>Mike R.</div>
                  <div>Technical Bug</div>
                  <div><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Escalated</span></div>
                  <div className="text-zinc-600">Human Agent</div>
                  <div className="font-medium">5 min</div>
                  <div>-</div>
                </div>
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#TS-3850</div>
                  <div>Emma L.</div>
                  <div>Feature Request</div>
                  <div><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Resolved</span></div>
                  <div className="text-indigo-600">AI Assistant</div>
                  <div className="font-medium text-green-600">4 min</div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
                <div className="grid grid-cols-7 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#TS-3851</div>
                  <div>John D.</div>
                  <div>Login Issue</div>
                  <div><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Resolved</span></div>
                  <div className="text-indigo-600">AI Assistant</div>
                  <div className="font-medium text-green-600">1 min</div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • Support Management Platform
        </div>
      </div>
    </div>
  );
};