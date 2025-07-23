import React from 'react';

interface TOCProgressProps {
  progress: number;
  accentColor: string;
}

export const TOCProgress: React.FC<TOCProgressProps> = ({ progress, accentColor }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span 
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            color: '#757575',
            letterSpacing: '0.05em',
          }}
        >
          Reading Progress
        </span>
        <span 
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#212121',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
      
      {/* Progress bar container */}
      <div 
        style={{
          width: '100%',
          height: '8px',
          background: '#F5F5F5',
          border: '2px solid #000000',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Progress bar fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            background: accentColor,
            transition: 'width 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};