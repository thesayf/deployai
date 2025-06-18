import React from "react";
import { JBBookingSystem } from "@/components/case-studies/JBBookingSystem";

export default function JBBookingSystemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center p-8">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            JB Luxury Detailing - Mobile Booking System
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Streamlined mobile booking interface for customers to schedule luxury detailing services with real-time availability
          </p>
        </div>
        <JBBookingSystem />
      </div>
    </div>
  );
}