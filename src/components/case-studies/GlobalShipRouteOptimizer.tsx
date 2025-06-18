import React from "react";

export const GlobalShipRouteOptimizer = () => {
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
            routes.globalship.com
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">GS</span>
          </div>
          <div>
            <div className="font-semibold text-lg">AI Route Optimizer</div>
            <div className="text-xs text-purple-100">Smart Dispatch & Planning</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Optimizing</span>
          <span className="text-xs text-purple-100">87% Auto-Processed</span>
        </div>
      </div>
      
      {/* Route Optimizer Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Quick Stats */}
        <div className="p-4 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Routes Optimized</div>
            <div className="text-lg font-bold text-purple-600">247</div>
            <div className="text-xs text-green-600">Today</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Fuel Saved</div>
            <div className="text-lg font-bold text-green-600">£2,847</div>
            <div className="text-xs text-zinc-500">This month</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Time Reduction</div>
            <div className="text-lg font-bold text-blue-600">-3.2hrs</div>
            <div className="text-xs text-green-600">Per route avg</div>
          </div>
        </div>

        {/* Route Planning Interface */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900">Active Route Optimization</h3>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">AI Processing</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Real-time</span>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="p-4">
              <div className="bg-zinc-100 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-zinc-300">
                <div className="text-center">
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="text-sm font-medium text-zinc-700">Interactive Route Map</div>
                  <div className="text-xs text-zinc-500 mt-1">Real-time optimization in progress</div>
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="p-4 border-t border-zinc-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-3">Current Route (AI Optimized)</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-green-50 rounded border border-green-200">
                      <span>🟢 London Depot</span>
                      <span className="text-green-600">Start - 08:00</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded border border-blue-200">
                      <span>📍 Birmingham Hub</span>
                      <span className="text-blue-600">Stop 1 - 10:30</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded border border-blue-200">
                      <span>📍 Manchester Central</span>
                      <span className="text-blue-600">Stop 2 - 12:45</span>
                    </div>
                    <div className="flex justify-between p-2 bg-purple-50 rounded border border-purple-200">
                      <span>🔴 Leeds Terminal</span>
                      <span className="text-purple-600">End - 15:20</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-3">Optimization Results</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 bg-zinc-50 rounded">
                      <span>Distance Reduced:</span>
                      <span className="font-semibold text-green-600">-47 miles</span>
                    </div>
                    <div className="flex justify-between p-2 bg-zinc-50 rounded">
                      <span>Time Saved:</span>
                      <span className="font-semibold text-green-600">-2.3 hours</span>
                    </div>
                    <div className="flex justify-between p-2 bg-zinc-50 rounded">
                      <span>Fuel Cost:</span>
                      <span className="font-semibold text-green-600">-£89</span>
                    </div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                      <span>AI Confidence:</span>
                      <span className="font-semibold text-yellow-600">94%</span>
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
          Powered by deployAI • AI Route Optimization Engine
        </div>
      </div>
    </div>
  );
};