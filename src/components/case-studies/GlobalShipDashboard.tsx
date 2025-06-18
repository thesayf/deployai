import React from "react";

export const GlobalShipDashboard = () => {
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
            dashboard.globalship.com
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">GS</span>
          </div>
          <div>
            <div className="font-semibold text-lg">GlobalShip Control</div>
            <div className="text-xs text-blue-100">Automated Logistics Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Live</span>
          <span className="text-xs text-blue-100">2,400+ Orders Active</span>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Stats Overview */}
        <div className="p-4 grid grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Orders Today</div>
            <div className="text-xl font-bold text-zinc-900">2,847</div>
            <div className="text-xs text-green-600">+23% vs yesterday</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">On-Time Rate</div>
            <div className="text-xl font-bold text-green-600">99.2%</div>
            <div className="text-xs text-green-600">Target: 95%</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Cost Savings</div>
            <div className="text-xl font-bold text-blue-600">$347K</div>
            <div className="text-xs text-zinc-500">This year</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Auto-Processed</div>
            <div className="text-xl font-bold text-purple-600">87%</div>
            <div className="text-xs text-green-600">+45% efficiency</div>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900">Live Orders - Auto Dispatch</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Real-time</span>
            </div>
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-2 p-3 bg-zinc-50 text-xs font-medium text-zinc-600 border-b border-zinc-200">
                <div>Order ID</div>
                <div>Route</div>
                <div>Status</div>
                <div>ETA</div>
                <div>Driver</div>
                <div>Actions</div>
              </div>
              
              {/* Table Rows */}
              <div className="text-xs">
                <div className="grid grid-cols-6 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#GS-8947</div>
                  <div>London → Manchester</div>
                  <div><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">In Transit</span></div>
                  <div className="font-medium">14:30</div>
                  <div>Sarah M.</div>
                  <div><span className="text-blue-600 cursor-pointer">Track</span></div>
                </div>
                <div className="grid grid-cols-6 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#GS-8948</div>
                  <div>Birmingham → Leeds</div>
                  <div><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Loading</span></div>
                  <div className="font-medium">15:45</div>
                  <div>Auto-Assigned</div>
                  <div><span className="text-blue-600 cursor-pointer">View</span></div>
                </div>
                <div className="grid grid-cols-6 gap-2 p-3 border-b border-zinc-100 hover:bg-zinc-50">
                  <div className="font-mono text-blue-600">#GS-8949</div>
                  <div>Liverpool → Edinburgh</div>
                  <div><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Dispatched</span></div>
                  <div className="font-medium">16:20</div>
                  <div>Mike T.</div>
                  <div><span className="text-blue-600 cursor-pointer">Track</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • Automated Logistics Platform
        </div>
      </div>
    </div>
  );
};