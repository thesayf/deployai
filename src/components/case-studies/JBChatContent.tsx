import React from "react";

export const JBChatContent = () => {
  return (
    <>
      {/* Chat Messages */}
      <div className="h-[400px] overflow-hidden p-4 space-y-3 bg-zinc-50 pointer-events-none">
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-600 text-xs font-bold">JB</span>
          </div>
          <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
            <p className="text-sm text-zinc-800 mb-2">
              Welcome to JB Luxe Detailing! 🚗✨ We bring top-tier mobile detailing to your location.
            </p>
            <p className="text-sm text-zinc-800">
              To get started, could you tell me what type of vehicle you'd like detailed?
            </p>
            <div className="text-xs text-zinc-500 mt-2">2:14 PM</div>
          </div>
        </div>

        {/* Customer Response */}
        <div className="flex gap-3 justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
            <p className="text-sm">I have a 2023 Mercedes S-Class that needs detailing</p>
            <div className="text-xs text-blue-100 mt-2">2:15 PM</div>
          </div>
        </div>

        {/* Bot Response with Services */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-600 text-xs font-bold">JB</span>
          </div>
          <div className="space-y-2 max-w-[80%]">
            <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm">
              <p className="text-sm text-zinc-800 mb-3">
                Excellent choice! For your Mercedes S-Class, I recommend our premium packages. 
                Here are your options:
              </p>
              <div className="space-y-2">
                <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm">🌟 Gold Package</div>
                      <div className="text-xs text-zinc-600 mt-1">
                        Exterior wash, wax, tyre shine, interior vacuum
                      </div>
                      <div className="text-xs text-green-600 mt-1">⏱️ 2-3 hours • Most Popular</div>
                    </div>
                    <div className="font-bold text-yellow-600">£85</div>
                  </div>
                </div>
                
                <div className="border border-zinc-200 rounded-lg p-3 bg-zinc-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm">💎 Luxe Package</div>
                      <div className="text-xs text-zinc-600 mt-1">
                        Complete detail, paint enhancement, interior deep clean
                      </div>
                      <div className="text-xs text-blue-600 mt-1">⏱️ 4-5 hours • Premium Service</div>
                    </div>
                    <div className="font-bold text-yellow-600">£150</div>
                  </div>
                </div>
                
                <div className="border-2 border-yellow-500 rounded-lg p-3 bg-yellow-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm">👑 Paint Correction</div>
                      <div className="text-xs text-zinc-600 mt-1">
                        Multi-stage polish, swirl removal, ceramic coating
                      </div>
                      <div className="text-xs text-green-600 mt-1">⏱️ 6-8 hours • Show Car Finish</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500">From</div>
                      <div className="font-bold text-yellow-600">£250</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 mt-2">2:15 PM</div>
            </div>
          </div>
        </div>

        {/* Customer Selection */}
        <div className="flex gap-3 justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
            <p className="text-sm">I'd like the Luxe Package please</p>
            <div className="text-xs text-blue-100 mt-2">2:16 PM</div>
          </div>
        </div>

        {/* Bot Confirmation & Scheduling */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-yellow-600 text-xs font-bold">JB</span>
          </div>
          <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
            <p className="text-sm text-zinc-800 mb-3">
              Perfect choice! The Luxe Package (£150) includes complete detailing for your S-Class.
            </p>
            <p className="text-sm text-zinc-800 mb-3">
              Now let's schedule your appointment. I have availability:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded p-2">
                <span className="text-sm">Tomorrow (Wed) - 10:00 AM</span>
                <span className="text-xs text-green-600 font-semibold">Available</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded p-2">
                <span className="text-sm">Thursday - 2:00 PM</span>
                <span className="text-xs text-green-600 font-semibold">Available</span>
              </div>
              <div className="flex justify-between items-center bg-yellow-50 border border-yellow-200 rounded p-2">
                <span className="text-sm">Friday - 9:00 AM</span>
                <span className="text-xs text-orange-600 font-semibold">Last Slot</span>
              </div>
            </div>
            <div className="text-xs text-zinc-500 mt-2">2:16 PM</div>
          </div>
        </div>

        {/* Customer Response */}
        <div className="flex gap-3 justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
            <p className="text-sm">Thursday at 2 PM works perfect!</p>
            <div className="text-xs text-blue-100 mt-2">2:17 PM</div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-zinc-200 p-3 bg-white">
        <div className="flex gap-2">
          <div className="flex-1 bg-zinc-100 rounded-full px-4 py-2 text-sm text-zinc-400">
            Type your message...
          </div>
          <div className="bg-yellow-600 text-black rounded-full p-2 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
        <div className="text-xs text-zinc-500 text-center mt-2">
          Powered by deployAI • Average booking time: 3 minutes
        </div>
      </div>
    </>
  );
};