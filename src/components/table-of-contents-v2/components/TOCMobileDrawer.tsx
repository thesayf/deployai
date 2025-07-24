import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TOCMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Menu icon
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="square" d="M6 6l12 12M18 6l-12 12" />
  </svg>
);

export const TOCMobileDrawer: React.FC<TOCMobileDrawerProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  return (
    <>
      {/* Toggle Button - Fixed position */}
      <button
        onClick={onClose}
        className="fixed left-4 bottom-4 z-50"
        style={{
          width: '56px',
          height: '56px',
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
          e.currentTarget.style.transform = 'translate(2px, 2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
          e.currentTarget.style.transform = 'translate(0, 0)';
        }}
        aria-label={isOpen ? 'Close table of contents' : 'Open table of contents'}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Drawer and Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className="fixed left-0 top-0 z-40 h-full"
              style={{
                width: '320px',
                maxWidth: '85vw',
                background: '#FFFFFF',
                borderRight: '3px solid #000000',
                boxShadow: '4px 0px 0px #000000',
              }}
            >
              {/* Drawer content */}
              <div 
                className="h-full overflow-y-auto"
                style={{
                  padding: '24px',
                  paddingBottom: '100px', // Space for the toggle button
                }}
              >
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};