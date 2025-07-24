import React from 'react';

interface TOCHeaderProps {
  title: string;
  accentColor: string;
}

export const TOCHeader: React.FC<TOCHeaderProps> = ({ title, accentColor }) => {
  return (
    <h3 
      style={{
        fontSize: '16px',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#000000',
        letterSpacing: '0.1em',
        marginBottom: '24px',
        paddingBottom: '12px',
        borderBottom: `4px solid ${accentColor}`,
      }}
    >
      {title}
    </h3>
  );
};