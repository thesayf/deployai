import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
};

// Design System Typography
const typography = {
  caption: 'text-xs font-medium leading-tight tracking-wide',
  bodyS: 'text-sm font-normal leading-normal',
  bodyM: 'text-base font-normal leading-relaxed',
  headingS: 'text-lg font-semibold leading-snug',
};

// Icons
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="square" strokeLinejoin="miter" d="M6 6l12 12M18 6l-12 12" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="square" strokeLinejoin="miter" d="m9 18 6-6-6-6" />
  </svg>
);

interface Section {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  sections: Section[];
  title?: string;
  className?: string;
  showProgress?: boolean;
  variant?: 'sidebar' | 'mobile' | 'minimal';
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  fullWidthLinks?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  sections, 
  title = "TABLE OF CONTENTS",
  className = "",
  showProgress = true,
  variant = 'sidebar',
  accentColor = 'orange',
  fullWidthLinks = false
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed,
  };

  const currentAccent = accentColors[accentColor];

  useEffect(() => {
    // Calculate scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    // Set up Intersection Observer for section tracking
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

    // Observe all sections
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      setIsMobileOpen(false);
    }
  };

  // Minimal variant - just the content, no wrapper
  if (variant === 'minimal') {
    return (
      <nav className={className}>
        <TOCContent 
          sections={sections}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          showProgress={showProgress}
          title={title}
          handleClick={handleClick}
          currentAccent={currentAccent}
          variant="minimal"
          fullWidthLinks={fullWidthLinks}
        />
      </nav>
    );
  }

  // Mobile variant - with toggle button
  if (variant === 'mobile') {
    return (
      <>
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed left-4 bottom-4 z-50 lg:hidden"
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '12px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
            e.currentTarget.style.transform = 'translate(2px, 2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
            e.currentTarget.style.transform = 'translate(0, 0)';
          }}
          aria-label="Toggle table of contents"
        >
          {isMobileOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Drawer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: isMobileOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 z-40 h-full w-72 lg:hidden"
          style={{
            background: colors.white,
            borderRight: `3px solid ${colors.black}`,
            boxShadow: `4px 0px 0px ${colors.black}`,
          }}
        >
          <div className="h-full overflow-y-auto p-6">
            <TOCContent 
              sections={sections}
              activeSection={activeSection}
              scrollProgress={scrollProgress}
              showProgress={showProgress}
              title={title}
              handleClick={handleClick}
              currentAccent={currentAccent}
              variant="mobile"
              fullWidthLinks={fullWidthLinks}
            />
          </div>
        </motion.div>

        {/* Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </>
    );
  }

  // Sidebar variant (default) - for desktop blog layout
  return (
    <div className={`sticky top-24 ${className}`}>
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto"
        style={{
          background: colors.white,
          border: `3px solid ${colors.black}`,
          boxShadow: `6px 6px 0px ${colors.black}`,
        }}
      >
        <div className="p-6">
          <TOCContent 
            sections={sections}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            showProgress={showProgress}
            title={title}
            handleClick={handleClick}
            currentAccent={currentAccent}
            variant="sidebar"
            fullWidthLinks={fullWidthLinks}
          />
        </div>
      </motion.nav>
    </div>
  );
};

// Internal component for TOC content
interface TOCContentProps {
  sections: Section[];
  activeSection: string;
  scrollProgress: number;
  showProgress: boolean;
  title: string;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
  currentAccent: string;
  variant: 'sidebar' | 'mobile' | 'minimal';
  fullWidthLinks: boolean;
}

const TOCContent: React.FC<TOCContentProps> = ({
  sections,
  activeSection,
  scrollProgress,
  showProgress,
  title,
  handleClick,
  currentAccent,
  variant,
  fullWidthLinks
}) => {
  return (
    <>
      {/* Header with Side Accent Bar */}
      <div 
        className="flex items-center mb-6"
      >
        <div 
          style={{
            width: '4px',
            height: '24px',
            background: currentAccent,
            marginRight: '12px',
          }}
        />
        <h3 
          className={`${typography.headingS} uppercase`}
          style={{ color: colors.obsidian }}
        >
          {title}
        </h3>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span 
              className={`${typography.caption} uppercase`}
              style={{ color: colors.graphite }}
            >
              Reading Progress
            </span>
            <span 
              className={`${typography.caption}`}
              style={{ color: colors.obsidian }}
            >
              {Math.round(scrollProgress)}%
            </span>
          </div>
          <div 
            className="h-2 relative overflow-hidden"
            style={{
              background: colors.concrete,
              border: `2px solid ${colors.black}`,
            }}
          >
            <motion.div
              className="h-full"
              style={{ 
                background: currentAccent,
                width: `${scrollProgress}%` 
              }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      )}

      {/* Section Links */}
      <ul className="space-y-2 -mx-6">
        {sections.map(({ id, title, level = 0 }) => {
          const isActive = activeSection === id;
          const paddingLeft = fullWidthLinks ? 24 : 24 + (level * 16);
          
          return (
            <li key={id} className="w-full">
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block w-full ${typography.bodyS} transition-all`}
                style={{
                  paddingLeft: `${paddingLeft}px`,
                  paddingRight: '24px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  background: isActive ? currentAccent : colors.white,
                  color: isActive ? colors.white : colors.charcoal,
                  border: `2px solid ${colors.black}`,
                  boxShadow: isActive ? `3px 3px 0px ${colors.black}` : 'none',
                  position: isActive ? 'relative' : 'static',
                  top: isActive ? '-2px' : '0',
                  left: isActive ? '-2px' : '0',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = colors.concrete;
                    e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
                    e.currentTarget.style.position = 'relative';
                    e.currentTarget.style.top = '-1px';
                    e.currentTarget.style.left = '-1px';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = colors.white;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.position = 'static';
                    e.currentTarget.style.top = '0';
                    e.currentTarget.style.left = '0';
                  }
                }}
              >
                <div className="flex items-center">
                  {isActive && (
                    <ChevronIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  )}
                  <span className="line-clamp-2">
                    {fullWidthLinks && level > 0 && (
                      <span style={{ paddingLeft: `${level * 16}px` }} />
                    )}
                    {title}
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};