import React from "react";

export const GlobalShipControlDashboard = () => {
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
            control.globalship.com
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
            <div className="font-semibold text-lg">GlobalShip Control Center</div>
            <div className="text-xs text-blue-100">Logistics Management Platform</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Live Tracking</span>
          <span className="text-xs text-blue-100">24/7 Operations</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        <div className="text-center py-20">
          <div className="text-zinc-400 text-lg mb-2">🚢</div>
          <div className="text-zinc-600 font-medium">Control Dashboard</div>
          <div className="text-zinc-500 text-sm">Coming Soon</div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • Logistics Control Platform
        </div>
      </div>
    </div>
  );
};