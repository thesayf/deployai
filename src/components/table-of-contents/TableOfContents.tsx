import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
  mobileStatic?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  sections, 
  title = "Table of Contents",
  className = "",
  showProgress = true,
  mobileStatic = true
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Calculate scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
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
      // Don't close on mobile if static
      if (!mobileStatic) {
        setIsOpen(false);
      }
    }
  };

  // Mobile static version
  if (mobileStatic) {
    return (
      <>
        {/* Desktop sticky sidebar */}
        <div className={`hidden lg:block ${className}`}>
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64"
          >
            <div className="h-full overflow-y-auto rounded-r-lg bg-white p-6 shadow-lg">
              <TOCContent 
                sections={sections}
                activeSection={activeSection}
                scrollProgress={scrollProgress}
                showProgress={showProgress}
                title={title}
                handleClick={handleClick}
              />
            </div>
          </motion.nav>
        </div>

        {/* Mobile static version */}
        <div className={`lg:hidden ${className}`}>
          <div className="rounded-lg bg-gray-50 p-6">
            <TOCContent 
              sections={sections}
              activeSection={activeSection}
              scrollProgress={scrollProgress}
              showProgress={false}
              title={title}
              handleClick={handleClick}
              isMobile={true}
            />
          </div>
        </div>
      </>
    );
  }

  // Original toggle version for backwards compatibility
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-24 z-50 rounded-lg bg-white p-2 shadow-lg lg:hidden"
        aria-label="Toggle table of contents"
      >
        <svg
          className="h-6 w-6 text-zinc-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Table of Contents */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        <div className="h-full overflow-y-auto rounded-r-lg bg-white p-6 shadow-lg">
          <TOCContent 
            sections={sections}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            showProgress={showProgress}
            title={title}
            handleClick={handleClick}
            onClose={() => setIsOpen(false)}
            showCloseButton={true}
          />
        </div>
      </motion.nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
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
  onClose?: () => void;
  showCloseButton?: boolean;
  isMobile?: boolean;
}

const TOCContent: React.FC<TOCContentProps> = ({
  sections,
  activeSection,
  scrollProgress,
  showProgress,
  title,
  handleClick,
  onClose,
  showCloseButton = false,
  isMobile = false
}) => {
  return (
    <>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Reading Progress</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-200">
            <motion.div
              className="h-full bg-emerald-500"
              style={{ width: `${scrollProgress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      )}

      {/* Section Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          {title}
        </h3>
        <ul className={`space-y-2 ${isMobile ? 'grid grid-cols-1 sm:grid-cols-2 gap-2 space-y-0' : ''}`}>
          {sections.map(({ id, title, level = 0 }) => (
            <li key={id} style={{ marginLeft: isMobile ? 0 : `${level * 12}px` }}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block rounded-md px-3 py-2 text-sm transition-all ${
                  activeSection === id
                    ? 'bg-emerald-50 font-medium text-emerald-600'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                <div className="flex items-center">
                  {activeSection === id && !isMobile && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="line-clamp-2">{title}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Close button for mobile */}
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-200 lg:hidden"
        >
          Close
        </button>
      )}
    </>
  );
};