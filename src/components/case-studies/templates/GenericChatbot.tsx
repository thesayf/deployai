import React from "react";

// TEMPLATE VARIABLES TO CUSTOMIZE:
const COMPANY_NAME = "COMPANY_NAME"; // e.g., "TechStart Solutions"
const BRAND_COLOR = "BRAND_COLOR"; // e.g., "indigo-600"
const DOMAIN_URL = "DOMAIN_URL"; // e.g., "chat.techstart.io"
const LOGO_PATH = "LOGO_PATH"; // e.g., "/logos/techstart-logo.png"
const SERVICE_TYPE = "SERVICE_TYPE"; // e.g., "AI Support Assistant"
const BOT_INITIALS = "BOT_INITIALS"; // e.g., "TS"
const GREETING_MESSAGE = "GREETING_MESSAGE"; // e.g., "Welcome to TechStart! How can I help you today?"
const SAMPLE_QUERY = "SAMPLE_QUERY"; // e.g., "I need help with my account billing"
const RESPONSE_TYPE = "RESPONSE_TYPE"; // e.g., "billing", "support", "sales"

export const GenericChatbot = () => {
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
            <span className={`text-${BRAND_COLOR} font-bold text-sm`}>{BOT_INITIALS}</span>
          </div>
          <div>
            <div className="font-semibold text-lg">{COMPANY_NAME} Chat</div>
            <div className="text-xs text-blue-100">{SERVICE_TYPE}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Online</span>
          <span className="text-xs text-blue-100">Response: &lt;30s</span>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="h-[480px] overflow-hidden p-4 space-y-3 bg-zinc-50 pointer-events-none">
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className={`w-6 h-6 bg-${BRAND_COLOR} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-bold">{BOT_INITIALS}</span>
          </div>
          <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-[80%]">
            <p className="text-sm text-zinc-800 mb-2">
              {GREETING_MESSAGE}
            </p>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Get Started
              </button>
              <button className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Pricing Info
              </button>
              <button className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Support
              </button>
            </div>
            <div className="text-xs text-zinc-500 mt-2">Just now</div>
          </div>
        </div>

        {/* Customer Query */}
        <div className="flex gap-3 justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
            <p className="text-sm">{SAMPLE_QUERY}</p>
            <div className="text-xs text-blue-100 mt-2">2:14 PM</div>
          </div>
        </div>

        {/* Bot Response */}
        <div className="flex gap-3">
          <div className={`w-6 h-6 bg-${BRAND_COLOR} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-bold">{BOT_INITIALS}</span>
          </div>
          <div className="space-y-2 max-w-[85%]">
            <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-3 shadow-sm border border-blue-200">
              <p className="text-sm text-zinc-800 mb-2">
                I'd be happy to help you with that! Let me look up your account information and check your recent activity.
              </p>
              <div className="bg-white rounded p-2 border border-zinc-200 text-xs mb-2">
                <div className="font-semibold text-zinc-700 mb-1">Account Summary:</div>
                <ul className="text-zinc-600 space-y-1">
                  <li>• Account Status: Active</li>
                  <li>• Current Plan: Professional</li>
                  <li>• Next Billing: June 25, 2024</li>
                  <li>• Amount Due: $99.00</li>
                </ul>
              </div>
              <p className="text-sm text-zinc-800">
                Everything looks good with your account. Is there something specific you'd like to update or a question about your billing?
              </p>
              <div className="text-xs text-zinc-500 mt-2">2:14 PM • AI-generated response</div>
            </div>
          </div>
        </div>

        {/* Customer Follow-up */}
        <div className="flex gap-3 justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
            <p className="text-sm">Can I upgrade to the Enterprise plan?</p>
            <div className="text-xs text-blue-100 mt-2">2:15 PM</div>
          </div>
        </div>

        {/* Bot Solution */}
        <div className="flex gap-3">
          <div className={`w-6 h-6 bg-${BRAND_COLOR} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-bold">{BOT_INITIALS}</span>
          </div>
          <div className="space-y-2 max-w-[85%]">
            <div className="bg-blue-50 rounded-2xl rounded-tl-sm p-3 shadow-sm border border-blue-200">
              <p className="text-sm text-zinc-800 mb-3">
                Absolutely! I can help you upgrade to Enterprise. Here's what you'll get:
              </p>
              <div className="bg-white rounded p-3 border border-zinc-200 mb-2">
                <h4 className="font-semibold text-sm text-zinc-800 mb-2">Enterprise Plan Benefits:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span>Unlimited API calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span>Priority support (24/7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                    <span>Custom integrations</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Monthly Price:</span>
                    <span className="text-lg font-bold text-green-600">$299</span>
                  </div>
                </div>
              </div>
              <button className={`w-full bg-${BRAND_COLOR} text-white py-2 rounded-lg font-semibold text-sm`}>
                Upgrade to Enterprise Now
              </button>
              <div className="text-xs text-zinc-500 mt-2">2:15 PM • Instant upgrade available</div>
            </div>
          </div>
        </div>

        {/* Success Confirmation */}
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs">✓</span>
          </div>
          <div className="bg-green-50 rounded-2xl rounded-tl-sm p-3 border border-green-200 max-w-[80%]">
            <p className="text-sm text-green-800 font-medium">
              Perfect! I've prepared your upgrade. Would you like me to process this change now?
            </p>
            <div className="text-xs text-green-600 mt-1">Ready to upgrade • No downtime</div>
          </div>
        </div>
      </div>

      {/* App Footer */}
      <div className="border-t border-zinc-200 p-4 bg-white">
        <div className="text-xs text-zinc-500 text-center">
          Powered by deployAI • AI Customer Assistant
        </div>
      </div>
    </div>
  );
};