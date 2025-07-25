import React from 'react';
import { motion } from 'framer-motion';

export const CompleteAnimation: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-24 h-24 mx-auto mb-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="#457B9D"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M7 12l3 3 7-7"
          stroke="#457B9D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
      </svg>
    </motion.div>
  );
};