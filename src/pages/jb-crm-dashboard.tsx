import React from "react";
import { JBCRMDashboard } from "@/components/case-studies/JBCRMDashboard";

export default function JBCRMDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center p-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            JB Luxury Detailing - CRM Dashboard
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Comprehensive customer relationship management system for tracking bookings, revenue, and customer satisfaction
          </p>
        </div>
        <JBCRMDashboard />
      </div>
    </div>
  );
}