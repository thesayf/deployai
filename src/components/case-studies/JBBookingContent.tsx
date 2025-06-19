import React from "react";

export const JBBookingContent = () => {
  return (
    <div className="flex-1 p-3 space-y-3 bg-zinc-50 overflow-hidden pointer-events-none">
      {/* Vehicle Selection */}
      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
          🚗 Vehicle Information
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Vehicle Type</label>
            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
              2023 Mercedes S-Class
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Color</label>
            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
              Obsidian Black
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Selection */}
      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
          ✨ Service Packages
        </h4>
        <div className="space-y-2">
          <div className="p-2 border-2 border-yellow-400 bg-yellow-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold text-sm">Luxe Package</h5>
                <p className="text-xs text-zinc-600">Complete detail, paint enhancement, interior deep clean</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-full">Most Popular</span>
                  <span className="text-xs text-zinc-500">⏱️ 4-5 hours</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-yellow-600">£150</span>
                <div className="w-4 h-4 bg-yellow-600 rounded-full flex items-center justify-center ml-auto mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-2 border border-zinc-300 bg-white rounded-lg opacity-60">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold text-sm">Gold Package</h5>
                <p className="text-xs text-zinc-600">Exterior wash, wax, tyre shine, interior vacuum</p>
              </div>
              <span className="text-lg font-bold text-zinc-600">£85</span>
            </div>
          </div>
          
          <div className="p-2 border border-zinc-300 bg-white rounded-lg opacity-60">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-bold text-sm">Paint Correction</h5>
                <p className="text-xs text-zinc-600">Multi-stage polish, swirl removal, ceramic coating</p>
              </div>
              <span className="text-lg font-bold text-zinc-600">£250+</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Date & Time Selection */}
      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
          📅 Schedule Service
        </h4>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Preferred Date</label>
            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
              2024-06-20
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">Time Slot</label>
            <div className="w-full p-2 border border-zinc-300 rounded text-xs bg-white">
              9:00 AM - 1:00 PM
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="mb-2">
          <label className="block text-xs font-semibold text-zinc-700 mb-1">Service Location</label>
          <div className="flex gap-1">
            <div className="flex-1 p-2 border border-zinc-300 rounded text-xs bg-white">
              15 Maple Street, Birmingham, B12 9QR
            </div>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
              📍
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Info */}
      <div className="bg-white rounded-lg border border-zinc-200 p-3 shadow-sm">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
          👤 Contact Information
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border border-zinc-300 rounded text-xs bg-white">
            Marcus Johnson
          </div>
          <div className="p-2 border border-zinc-300 rounded text-xs bg-white">
            +44 7563 027260
          </div>
        </div>
      </div>
      
      {/* Booking Summary & CTA */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-lg p-3 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-sm">Booking Summary</h4>
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Available
          </div>
        </div>
        <div className="space-y-1 mb-3 text-xs">
          <div className="flex justify-between">
            <span>Luxe Package</span>
            <span>£150.00</span>
          </div>
          <div className="flex justify-between">
            <span>Service Date</span>
            <span>June 20, 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Time Slot</span>
            <span>9:00 AM - 1:00 PM</span>
          </div>
          <div className="border-t border-yellow-500 pt-1 flex justify-between font-bold text-sm">
            <span>Total</span>
            <span>£150.00</span>
          </div>
        </div>
        <div className="w-full bg-black text-white py-2 rounded-lg font-bold text-sm text-center">
          Confirm Booking & Pay
        </div>
      </div>
    </div>
  );
};