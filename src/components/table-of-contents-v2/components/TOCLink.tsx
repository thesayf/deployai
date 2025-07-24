import React from 'react';

interface TOCLinkProps {
  id: string;
  title: string;
  level: number;
  isActive: boolean;
  isParentActive?: boolean;
  accentColor: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const TOCLink: React.FC<TOCLinkProps> = ({ 
  id, 
  title, 
  level, 
  isActive, 
  isParentActive = false,
  accentColor,
  onClick 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Calculate padding for text content
  const paddingLeft = 24;
  
  // Calculate left margin for the entire box (only for subsections)
  const marginLeft = level > 0 ? 24 : 0;

  return (
    <li className="relative" style={{ marginLeft: `${marginLeft}px` }}>
      <a
        href={`#${id}`}
        onClick={(e) => onClick(e, id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block relative overflow-hidden"
        style={{
          // Full width layout
          width: '100%',
          
          // Padding for content
          paddingLeft: `${paddingLeft}px`,
          paddingRight: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          
          // Text styling
          fontSize: '14px',
          fontWeight: isActive || isParentActive ? 600 : 400,
          color: isActive ? '#FFFFFF' : isParentActive ? '#000000' : '#424242',
          textDecoration: 'none',
          
          // Background and border
          background: isActive ? accentColor : isParentActive ? `${accentColor}20` : isHovered ? '#F5F5F5' : '#FFFFFF',
          border: '2px solid #000000',
          borderRadius: '0',
          
          // Shadow effect
          boxShadow: isActive ? '3px 3px 0px #000000' : isParentActive ? '2px 2px 0px #000000' : isHovered ? '2px 2px 0px #000000' : 'none',
          
          // Smooth transitions
          transition: 'all 0.15s ease',
          
          // Ensure text doesn't wrap
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {/* Active indicator */}
        {isActive && (
          <span 
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '0',
              height: '0',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '6px solid #FFFFFF',
            }}
          />
        )}
        
        {/* Link text with arrow for any subsection */}
        <span className="relative z-10">
          {level > 0 && (
            <span style={{ marginRight: '8px', fontSize: '16px', display: 'inline-block' }}>↳</span>
          )}
          {title}
        </span>
      </a>
    </li>
  );
};