import React, { useEffect, useState, useRef } from 'react';
import { TOCHeader } from './components/TOCHeader';
import { TOCProgress } from './components/TOCProgress';
import { TOCLink } from './components/TOCLink';
import { TOCMobileDrawer } from './components/TOCMobileDrawer';
import { TOCMobileCollapsible } from './components/TOCMobileCollapsible';

// Design System Colors
const colors = {
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
};

interface Section {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsV2Props {
  sections: Section[];
  title?: string;
  showProgress?: boolean;
  variant?: 'sidebar' | 'mobile' | 'minimal';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  className?: string;
  stickyOffset?: number;
  mobileBreakpoint?: 'sm' | 'md' | 'lg';
}

export const TableOfContentsV2: React.FC<TableOfContentsV2Props> = ({
  sections,
  title = "TABLE OF CONTENTS",
  showProgress = true,
  variant = 'sidebar',
  accentColor = 'orange',
  className = '',
  stickyOffset = 96,
  mobileBreakpoint = 'lg',
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Map accent color to hex value
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed,
  };
  const currentAccent = accentColors[accentColor];

  // Handle scroll progress and section detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  // Handle link clicks with smooth scroll
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMobileOpen(false);
    }
  };

  // Find parent section for active subsection
  const getParentSection = (activeId: string): string | null => {
    const activeIndex = sections.findIndex(s => s.id === activeId);
    if (activeIndex === -1) return null;
    
    const activeLevel = sections[activeIndex].level || 0;
    if (activeLevel === 0) return null; // Top level, no parent
    
    // Look backwards for the first section with lower level
    for (let i = activeIndex - 1; i >= 0; i--) {
      const currentLevel = sections[i].level || 0;
      if (currentLevel < activeLevel) {
        return sections[i].id;
      }
    }
    return null;
  };

  const parentSection = getParentSection(activeSection);

  // TOC Content Component (without header for mobile)
  const TOCContent = ({ showHeader = true }: { showHeader?: boolean }) => (
    <>
      {showHeader && <TOCHeader title={title} accentColor={currentAccent} />}
      
      {showProgress && showHeader && (
        <TOCProgress progress={scrollProgress} accentColor={currentAccent} />
      )}
      
      <nav>
        <ul className="space-y-2">
          {sections.map(({ id, title, level = 0 }) => {
            const isDirectlyActive = activeSection === id;
            const isParentActive = parentSection === id;
            
            return (
              <TOCLink
                key={id}
                id={id}
                title={title}
                level={level}
                isActive={isDirectlyActive}
                isParentActive={isParentActive}
                accentColor={currentAccent}
                onClick={handleClick}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );

  // Minimal variant - inline without wrapper
  if (variant === 'minimal') {
    return (
      <div 
        className={`${className}`}
        style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          padding: '24px',
        }}
      >
        <TOCContent />
      </div>
    );
  }

  // Mobile variant - drawer
  if (variant === 'mobile') {
    return (
      <TOCMobileDrawer 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(!isMobileOpen)}
      >
        <TOCContent />
      </TOCMobileDrawer>
    );
  }

  // Sidebar variant (default) - responsive behavior
  return (
    <>
      {/* Desktop sidebar - sticky */}
      <div 
        className={`
          ${className}
          ${mobileBreakpoint === 'sm' ? 'hidden sm:block' : ''}
          ${mobileBreakpoint === 'md' ? 'hidden md:block' : ''}
          ${mobileBreakpoint === 'lg' ? 'hidden lg:block' : ''}
        `}
        style={{
          position: 'sticky',
          top: `${stickyOffset}px`,
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            padding: '24px',
            maxHeight: `calc(100vh - ${stickyOffset + 32}px)`,
            overflowY: 'auto',
          }}
        >
          <TOCContent />
        </div>
      </div>

      {/* Mobile - collapsible or drawer based on preference */}
      <div 
        className={`
          ${mobileBreakpoint === 'sm' ? 'block sm:hidden' : ''}
          ${mobileBreakpoint === 'md' ? 'block md:hidden' : ''}
          ${mobileBreakpoint === 'lg' ? 'block lg:hidden' : ''}
        `}
      >
        <TOCMobileCollapsible accentColor={currentAccent}>
          <TOCContent showHeader={false} />
        </TOCMobileCollapsible>
      </div>
    </>
  );
};