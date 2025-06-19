import React from "react";

export const JBDashboardContent = () => {
  return (
    <div className="flex-1 p-3 grid grid-cols-12 gap-3 overflow-hidden pointer-events-none bg-zinc-50">
      {/* Left Sidebar */}
      <div className="col-span-4 space-y-3">
        <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
          <h4 className="font-semibold mb-2 text-sm">Today's Overview</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600">New Bookings</span>
              <span className="font-bold text-green-600">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Completed</span>
              <span className="font-bold text-blue-600">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Revenue</span>
              <span className="font-bold text-yellow-600">£2,350</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
          <h4 className="font-semibold mb-2 text-sm">Upcoming Bookings</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600">Today</span>
              <span className="font-bold text-orange-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Tomorrow</span>
              <span className="font-bold text-blue-600">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">This Week</span>
              <span className="font-bold text-green-600">18</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
          <h4 className="font-semibold mb-2 text-sm">Job Values</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600">Avg Job Value</span>
              <span className="font-bold text-yellow-600">£142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Highest Value</span>
              <span className="font-bold text-green-600">£350</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">This Month</span>
              <span className="font-bold text-blue-600">£4,280</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="col-span-8 space-y-3">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
          <div className="p-2 border-b border-zinc-200 flex justify-between items-center">
            <h4 className="font-semibold text-sm">Recent Bookings</h4>
            <span className="text-xs text-zinc-500">Last 24 hours</span>
          </div>
          <div className="p-2">
            <div className="space-y-2">
              {/* Booking Row 1 */}
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-xs">Marcus Johnson - 2023 BMW X7</p>
                    <p className="text-xs text-zinc-600">Luxe Package • £150</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-green-600">Completed</p>
                  <p className="text-xs text-zinc-500">2:30 PM</p>
                </div>
              </div>
              
              {/* Booking Row 2 */}
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-xs">Sarah Martinez - 2024 Tesla Model S</p>
                    <p className="text-xs text-zinc-600">Paint Correction • £280</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-blue-600">In Progress</p>
                  <p className="text-xs text-zinc-500">4:00 PM</p>
                </div>
              </div>
              
              {/* Booking Row 3 */}
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-xs">David Chen - 2023 Mercedes S-Class</p>
                    <p className="text-xs text-zinc-600">Gold Package • £85</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-yellow-600">Scheduled</p>
                  <p className="text-xs text-zinc-500">Tomorrow 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics Charts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-2">
            <h4 className="font-semibold mb-2 text-xs">Weekly Revenue</h4>
            <div className="flex items-end gap-1 h-16">
              <div className="bg-yellow-600 w-3 h-8 rounded-t"></div>
              <div className="bg-yellow-600 w-3 h-10 rounded-t"></div>
              <div className="bg-yellow-600 w-3 h-6 rounded-t"></div>
              <div className="bg-yellow-600 w-3 h-12 rounded-t"></div>
              <div className="bg-yellow-600 w-3 h-16 rounded-t"></div>
              <div className="bg-yellow-600 w-3 h-14 rounded-t"></div>
              <div className="bg-green-500 w-3 h-16 rounded-t animate-pulse"></div>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Mon - Sun</p>
          </div>
          
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-2">
            <h4 className="font-semibold mb-2 text-xs">Customer Satisfaction</h4>
            <div className="flex items-center justify-center h-16">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">4.9</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-zinc-500 text-center">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};