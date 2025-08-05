import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { useRouter } from 'next/router';
import { HeadingH2 } from '@/components/heading-h2';

// Design System Colors (matching TimelineProcess)
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

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
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <HeadingH2
          variant="default"
          accent="orange"
          align="center"
          animate={true}
          className="mb-6"
        >
          {title}
        </HeadingH2>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-700 md:text-2xl">
          {subtitle}
        </p>
      </div>

      {/* Main Pricing Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Static Pricing Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative group"
          style={{
            background: colors.white,
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            transition: 'all 0.15s ease',
            transform: 'translate(0, 0)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(-2px, -2px)';
            el.style.boxShadow = `8px 8px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(0, 0)';
            el.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
        >
          <div className="p-8">
            <h3 className={`${typography.headingL} mb-6`} style={{ color: colors.black }}>Our Fixed Pricing</h3>
          
            {/* Standard MVP */}
            <div 
              className="mb-6 p-6"
              style={{
                background: `linear-gradient(135deg, ${colors.cyberBlue}20, ${colors.cyberBlue}10)`,
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className={typography.headingM} style={{ color: colors.black }}>Standard MVP</h4>
                <span className={typography.displayS} style={{ color: colors.black }}>£10,000</span>
              </div>
              <p className={`${typography.bodyS} mb-3`} style={{ color: colors.charcoal }}>4-week sprint</p>
              <ul className={`${typography.bodyS} space-y-2`}>
                <li style={{ color: colors.charcoal }}>• Web OR mobile app</li>
                <li style={{ color: colors.charcoal }}>• 3-4 core features</li>
                <li style={{ color: colors.charcoal }}>• Perfect for validating your idea</li>
              </ul>
            </div>

            {/* Extended MVP */}
            <div 
              className="p-6"
              style={{
                background: `linear-gradient(135deg, ${colors.deepMagenta}20, ${colors.deepMagenta}10)`,
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className={typography.headingM} style={{ color: colors.black }}>Extended MVP</h4>
                <span className={typography.displayS} style={{ color: colors.black }}>£20,000</span>
              </div>
              <p className={`${typography.bodyS} mb-3`} style={{ color: colors.charcoal }}>8-week sprint</p>
              <ul className={`${typography.bodyS} space-y-2`}>
                <li style={{ color: colors.charcoal }}>• Multiple platforms</li>
                <li style={{ color: colors.charcoal }}>• Marketplace or B2B features</li>
                <li style={{ color: colors.charcoal }}>• Real-time functionality</li>
              </ul>
            </div>

            <div 
              className="mt-6 p-4"
              style={{
                background: colors.concrete,
                border: `3px solid ${colors.black}`,
                boxShadow: `3px 3px 0px ${colors.black}`,
              }}
            >
              <p className={`${typography.bodyS} text-center`} style={{ color: colors.charcoal }}>
                <strong>Not sure which one you need?</strong><br />
                Our calculator will tell you in 2 minutes →
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.deepMagenta}, ${colors.cyberBlue})`,
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            color: colors.white,
            transition: 'all 0.15s ease',
            transform: 'translate(0, 0)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(-2px, -2px)';
            el.style.boxShadow = `8px 8px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translate(0, 0)';
            el.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
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

          <div className="relative z-10 p-8">
            <div 
              className="inline-flex items-center gap-2 mb-6"
              style={{
                background: colors.white,
                color: colors.deepMagenta,
                padding: '8px 16px',
                border: `3px solid ${colors.black}`,
                boxShadow: `3px 3px 0px ${colors.black}`,
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className={`${typography.caption} uppercase font-bold`}>MVP Calculator</span>
            </div>

            <h3 className={`${typography.displayS} mb-4`}>Calculate Your MVP Cost</h3>
            
            <p className={`${typography.bodyL} mb-6 opacity-90`}>
              Get instant clarity on your project's scope, timeline, and investment.
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div 
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.white + '33',
                    border: `2px solid ${colors.white}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={typography.bodyM}>Personalized pricing based on YOUR specific needs</span>
              </li>
              <li className="flex items-start gap-3">
                <div 
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.white + '33',
                    border: `2px solid ${colors.white}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={typography.bodyM}>See exactly what features fit your budget</span>
              </li>
              <li className="flex items-start gap-3">
                <div 
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.white + '33',
                    border: `2px solid ${colors.white}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={typography.bodyM}>Get money-saving recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <div 
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: colors.white + '33',
                    border: `2px solid ${colors.white}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={typography.bodyM}>Monthly running costs breakdown</span>
              </li>
            </ul>

            <motion.button
              onClick={() => router.push('/mvp-planner')}
              className="w-full uppercase font-bold transition-all"
              style={{
                background: colors.white,
                color: colors.deepMagenta,
                border: `3px solid ${colors.black}`,
                padding: '16px 32px',
                fontSize: '18px',
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `6px 6px 0px ${colors.black}`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Calculate Your MVP Cost →
            </motion.button>

            <p className={`text-center mt-4 ${typography.bodyS} opacity-80`}>
              Takes 2 minutes • No email required to start
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div 
        className="mt-12 p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: colors.concrete,
          border: `3px solid ${colors.black}`,
          boxShadow: `4px 4px 0px ${colors.black}`,
        }}
      >
        <p className={typography.bodyM} style={{ color: colors.charcoal }}>
          <span style={{ fontWeight: 700 }}>100% Transparent Pricing</span> • No hidden costs • No hourly billing • Fixed scope & timeline
        </p>
      </motion.div>
    </div>
  );
};