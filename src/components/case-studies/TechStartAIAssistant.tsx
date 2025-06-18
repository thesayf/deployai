import React from "react";

export const TechStartAIAssistant = () => {
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
            support.techstart.io
          </div>
        </div>
      </div>
      
      {/* App Header */}
      <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-sm">TS</span>
          </div>
          <div>
            <div className="font-semibold text-lg">TechStart AI Support</div>
            <div className="text-xs text-indigo-100">Intelligent Customer Assistant</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Online</span>
          <span className="text-xs text-indigo-100">3,200+ Queries/Month</span>
        </div>
      </div>
      
      {/* Support Dashboard Content */}
      <div className="h-[480px] overflow-hidden bg-zinc-50 pointer-events-none">
        {/* Performance Metrics */}
        <div className="p-4 grid grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Response Time</div>
            <div className="text-xl font-bold text-green-600">3min</div>
            <div className="text-xs text-green-600">87% faster</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Auto-Resolved</div>
            <div className="text-xl font-bold text-blue-600">75%</div>
            <div className="text-xs text-zinc-500">of tickets</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Satisfaction</div>
            <div className="text-xl font-bold text-yellow-600">4.7/5</div>
            <div className="text-xs text-green-600">+47% increase</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-zinc-200 shadow-sm">
            <div className="text-xs text-zinc-500 mb-1">Active Tickets</div>
            <div className="text-xl font-bold text-purple-600">23</div>
            <div className="text-xs text-green-600">-89% backlog</div>
          </div>
        </div>

        {/* Live Support Interface */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
            <div className="p-3 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-semibold text-zinc-900">AI Assistant Live Feed</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Processing</span>
            </div>
            
            {/* Chat Interface */}
            <div className="h-64 overflow-hidden p-4">
              <div className="space-y-3">
                {/* Customer Query */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                    <p className="text-sm text-zinc-800">
                      Hi, I'm having trouble with my API integration. Getting a 401 error when trying to authenticate.
                    </p>
                    <div className="text-xs text-zinc-500 mt-2">2:14 PM</div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-indigo-50 rounded-2xl rounded-tl-sm p-3 max-w-[85%] border border-indigo-200">
                    <p className="text-sm text-zinc-800 mb-2">
                      I can help you resolve that 401 authentication error. Let me check your API configuration.
                    </p>
                    <div className="bg-white rounded p-2 border border-zinc-200 text-xs mb-2">
                      <div className="font-semibold text-zinc-700 mb-1">Detected Issues:</div>
                      <ul className="text-zinc-600 space-y-1">
                        <li>• API key format appears incorrect</li>
                        <li>• Missing Bearer token prefix</li>
                        <li>• Headers not properly set</li>
                      </ul>
                    </div>
                    <p className="text-sm text-zinc-800 mb-2">
                      Try updating your request headers like this:
                    </p>
                    <div className="bg-zinc-900 rounded p-2 text-xs">
                      <code className="text-green-400">
                        headers: {"{"}
                        <br />
                        &nbsp;&nbsp;"Authorization": "Bearer YOUR_API_KEY",
                        <br />
                        &nbsp;&nbsp;"Content-Type": "application/json"
                        <br />
                        {"}"}
                      </code>
                    </div>
                    <div className="text-xs text-zinc-500 mt-2">2:14 PM • Auto-generated solution</div>
                  </div>
                </div>

                {/* Customer Feedback */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                    <p className="text-sm">Perfect! That fixed it immediately. Thank you!</p>
                    <div className="text-xs text-green-100 mt-2">2:16 PM</div>
                  </div>
                </div>

                {/* Auto-Resolution */}
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div className="bg-green-50 rounded-2xl rounded-tl-sm p-3 border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      Ticket auto-resolved • Satisfaction: 5/5 ⭐
                    </p>
                    <div className="text-xs text-green-600 mt-1">Resolution time: 2 minutes</div>
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
          Powered by deployAI • Intelligent Support Platform
        </div>
      </div>
    </div>
  );
};