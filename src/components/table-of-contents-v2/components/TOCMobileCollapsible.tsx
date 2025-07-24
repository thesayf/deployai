import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TOCMobileCollapsibleProps {
  children: React.ReactNode;
  isExpanded?: boolean;
  accentColor: string;
}

// Chevron icon
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }}
  >
    <path strokeLinecap="square" d="M5 7l5 5 5-5" />
  </svg>
);

export const TOCMobileCollapsible: React.FC<TOCMobileCollapsibleProps> = ({ 
  children, 
  isExpanded: initialExpanded = false,
  accentColor 
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  return (
    <div 
      style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        marginBottom: '24px',
      }}
    >
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '16px 20px',
          background: isExpanded ? accentColor : '#FFFFFF',
          color: isExpanded ? '#FFFFFF' : '#000000',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '16px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.background = '#F5F5F5';
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.currentTarget.style.background = '#FFFFFF';
          }
        }}
      >
        <span>Table of Contents</span>
        <ChevronIcon isOpen={isExpanded} />
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              borderTop: '3px solid #000000',
            }}
          >
            <div style={{ padding: '20px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};