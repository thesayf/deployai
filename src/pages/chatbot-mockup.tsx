import React from "react";
import { ChatbotMockup } from "@/components/case-studies/ChatbotMockup";

export default function ChatbotMockupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center p-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            JB Luxury Detailing - Custom CRM + Chatbot
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            AI-powered customer service chatbot integrated with custom CRM for seamless booking and customer management
          </p>
        </div>
        <ChatbotMockup />
      </div>
    </div>
  );
}