import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { useRouter } from 'next/router';

export const MVPBlueprintCTA: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState({ totalCount: 0, weekCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mvp-planner/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="absolute inset-0 rotate-45">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute border-2 border-black bg-white" 
                   style={{
                     width: `${(i + 1) * 40}px`,
                     height: `${(i + 1) * 40}px`,
                     top: `${i * 20}px`,
                     left: `${i * 20}px`,
                   }} />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-bold uppercase text-sm">Free Tool</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
            Not Ready for a Call? Try Our AI-Powered MVP Estimator
          </h2>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Answer 4 simple questions and instantly receive AI-generated cost estimates, timeline projections, and tech recommendations for your app idea.
          </p>

          {/* What You Do / What You Get Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
            {/* What You Do */}
            <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center font-black border-2 border-black">1</div>
                What You Do
              </h3>
              <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Answer 4 quick questions about your app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Takes only 2 minutes to complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>No technical knowledge required</span>
                </li>
              </ul>
            </div>

            {/* What You Get */}
            <div className="bg-white p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-black border-2 border-black">2</div>
                What You Get
              </h3>
              <ul className="text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Fixed-price quote</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Monthly running costs breakdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Complete tech stack recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Smart suggestions to reduce scope & save money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Complete feature list</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-1">✓</span>
                  <span>Week-by-week delivery timeline</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2 minutes to complete</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/mvp-planner')}
              size="large" 
              intent="cta"
              className="!bg-purple-600 !border-black hover:!bg-purple-700"
            >
              Try the MVP Estimator →
            </Button>
            <Button 
              onClick={() => window.open('https://calendly.com/hello-deployai/30min', '_blank')}
              size="large" 
              intent="secondary"
            >
              Prefer to Talk? Book a Call
            </Button>
          </div>

          {/* Urgency/Social Proof */}
          <p className="mt-6 text-sm text-gray-600">
            {loading ? (
              <span className="animate-pulse">Loading stats...</span>
            ) : (
              <>
                {stats.weekCount > 0 && (
                  <><span className="font-semibold">{stats.weekCount} estimates</span> generated this week • </>
                )}
                {stats.totalCount > 0 ? (
                  <span>Join {stats.totalCount}+ founders who've clarity on their MVP costs</span>
                ) : (
                  <span>Be among the first to get clarity on your MVP costs</span>
                )}
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};