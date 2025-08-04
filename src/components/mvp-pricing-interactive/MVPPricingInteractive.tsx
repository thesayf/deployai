import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { useRouter } from 'next/router';

interface MVPPricingInteractiveProps {
  title?: string;
  subtitle?: string;
}

export const MVPPricingInteractive: React.FC<MVPPricingInteractiveProps> = ({
  title = "See Your Exact MVP Price",
  subtitle = "Get a personalized quote, timeline, and feature breakdown in just 2 minutes"
}) => {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-4">{title}</h2>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>

      {/* Main Pricing Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Static Pricing Card */}
        <motion.div 
          className="bg-white p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Our Fixed Pricing</h3>
          
          {/* Standard MVP */}
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg">Standard MVP</h4>
              <span className="text-2xl font-black">£10,000</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">4-week sprint</p>
            <ul className="text-sm space-y-1">
              <li>• Web OR mobile app</li>
              <li>• 3-4 core features</li>
              <li>• Perfect for validating your idea</li>
            </ul>
          </div>

          {/* Extended MVP */}
          <div className="p-4 bg-purple-50 border-2 border-purple-300">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg">Extended MVP</h4>
              <span className="text-2xl font-black">£20,000</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">8-week sprint</p>
            <ul className="text-sm space-y-1">
              <li>• Multiple platforms</li>
              <li>• Marketplace or B2B features</li>
              <li>• Real-time functionality</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gray-100 border-2 border-gray-300">
            <p className="text-sm text-gray-700 text-center">
              <strong>Not sure which one you need?</strong><br />
              Our calculator will tell you in 2 minutes →
            </p>
          </div>
        </motion.div>

        {/* Interactive Calculator Card */}
        <motion.div 
          className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white text-purple-600 px-3 py-1 border-2 border-black mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="font-bold text-xs uppercase">MVP Calculator</span>
            </div>

            <h3 className="text-3xl font-black mb-4">Calculate Your MVP Cost</h3>
            
            <p className="text-lg mb-6 opacity-90">
              Get instant clarity on your project's scope, timeline, and investment.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Personalized pricing based on YOUR specific needs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>See exactly what features fit your budget</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Get money-saving recommendations</span>
              </li>
            </ul>

            <Button 
              onClick={() => router.push('/mvp-planner')}
              size="large"
              className="w-full !bg-white !text-purple-600 !border-black hover:!bg-gray-100"
            >
              Calculate Your MVP Cost →
            </Button>

            <p className="text-center mt-4 text-sm opacity-80">
              Takes 2 minutes • No email required to start
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="mt-8 p-6 bg-gray-50 border-2 border-gray-300 text-center">
        <p className="text-gray-700">
          <span className="font-bold">100% Transparent Pricing</span> • No hidden costs • No hourly billing • Fixed scope & timeline
        </p>
      </div>
    </div>
  );
};