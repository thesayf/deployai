import React from "react";

export const ChatbotMockup = () => {
  return (
    <div className="mx-auto h-[800px] w-full max-w-[500px] overflow-hidden bg-white shadow-2xl">
      {/* Browser URL Bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-3">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="rounded border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600">
            chat.jbluxedetailing.co.uk
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="flex items-center justify-between bg-black p-4 text-white">
        <div className="flex items-center gap-3">
          <img src="/logos/jblogo.png" alt="JB Logo" className="h-8 w-auto" />
          <div>
            <div className="text-lg font-semibold">JB Luxe Chat</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
            Online
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="pointer-events-none h-[440px] space-y-3 overflow-hidden bg-zinc-50 p-4">
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <span className="text-xs font-bold text-yellow-600">JB</span>
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
            <p className="mb-2 text-sm text-zinc-800">
              Welcome to JB Luxe Detailing! 🚗✨ We bring top-tier mobile
              detailing to your location.
            </p>
            <p className="text-sm text-zinc-800">
              To get started, could you tell me what type of vehicle you'd like
              detailed?
            </p>
            <div className="mt-2 text-xs text-zinc-500">2:14 PM</div>
          </div>
        </div>

        {/* Customer Response */}
        <div className="flex justify-end gap-3">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white">
            <p className="text-sm">
              I have a 2023 Mercedes S-Class that needs detailing
            </p>
            <div className="mt-2 text-xs text-blue-100">2:15 PM</div>
          </div>
        </div>

        {/* Bot Response with Services */}
        <div className="flex gap-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black">
            <span className="text-xs font-bold text-yellow-600">JB</span>
          </div>
          <div className="max-w-[80%] space-y-2">
            <div className="rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
              <p className="mb-3 text-sm text-zinc-800">
                Excellent choice! For your Mercedes S-Class, I recommend our
                premium packages. Here are your options:
              </p>
              <div className="space-y-2">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        🌟 Gold Package
                      </div>
                      <div className="mt-1 text-xs text-zinc-600">
                        Exterior wash, wax, tyre shine, interior vacuum
                      </div>
                      <div className="mt-1 text-xs text-green-600">
                        ⏱️ 2-3 hours • Most Popular
                      </div>
                    </div>
                    <div className="font-bold text-yellow-600">£85</div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        💎 Luxe Package
                      </div>
                      <div className="mt-1 text-xs text-zinc-600">
                        Complete detail, paint enhancement, interior deep clean
                      </div>
                      <div className="mt-1 text-xs text-blue-600">
                        ⏱️ 4-5 hours • Premium Service
                      </div>
                    </div>
                    <div className="font-bold text-yellow-600">£150</div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-500">2:15 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 bg-white p-4">
        <div className="text-center text-xs text-zinc-500">
          Powered by deployAI
        </div>
      </div>
    </div>
  );
};
