import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'gradient' | 'minimal';
  size?: 'small' | 'medium' | 'large';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
  showLabel = true,
  variant = 'default',
  size = 'medium',
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const barColors = {
    default: 'bg-black',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    minimal: 'bg-gray-600',
  };

  const backgroundColors = {
    default: 'bg-gray-200',
    gradient: 'bg-gray-200',
    minimal: 'bg-gray-100',
  };

  const borderStyles = {
    default: 'border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    gradient: 'border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    minimal: '',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">
            Progress: {current} of {total}
          </span>
          <span className="text-sm font-bold">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div 
        className={`
          relative overflow-hidden
          ${sizeClasses[size]}
          ${backgroundColors[variant]}
          ${borderStyles[variant]}
          ${variant === 'minimal' ? 'rounded-full' : ''}
        `}
      >
        <motion.div
          className={`
            h-full
            ${barColors[variant]}
            ${variant === 'minimal' ? 'rounded-full' : ''}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        
        {/* Optional animated highlight for gradient variant */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: ['0%', '500%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </div>
    </div>
  );
};