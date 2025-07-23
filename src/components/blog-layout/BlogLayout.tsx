import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TableOfContentsV2 } from '../table-of-contents-v2/TableOfContentsV2';

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

interface Section {
  id: string;
  title: string;
  level?: number;
}

interface BlogLayoutProps {
  children: ReactNode;
  sections: Section[];
  showProgress?: boolean;
  tocTitle?: string;
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  className?: string;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  sections,
  showProgress = true,
  tocTitle = "TABLE OF CONTENTS",
  accentColor = 'orange',
  className = ''
}) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Desktop Layout - Two columns */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8 py-12">
            {/* Sidebar - Table of Contents */}
            <aside className="col-span-3">
              <TableOfContentsV2
                sections={sections}
                title={tocTitle}
                showProgress={showProgress}
                variant="sidebar"
                accentColor={accentColor}
                mobileBreakpoint="lg"
              />
            </aside>

            {/* Main Content */}
            <main className="col-span-9">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-lg max-w-none"
                style={{
                  background: colors.white,
                  border: `3px solid ${colors.black}`,
                  boxShadow: `6px 6px 0px ${colors.black}`,
                  padding: '48px',
                }}
              >
                {children}
              </motion.article>
            </main>
          </div>
        </div>
      </div>

      {/* Tablet Layout - Collapsible sidebar */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          {/* Floating TOC Button/Drawer */}
          <TableOfContentsV2
            sections={sections}
            title={tocTitle}
            showProgress={showProgress}
            variant="mobile"
            accentColor={accentColor}
          />

          {/* Main Content */}
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
              style={{
                background: colors.white,
                border: `3px solid ${colors.black}`,
                boxShadow: `6px 6px 0px ${colors.black}`,
                padding: '32px',
              }}
            >
              {children}
            </motion.article>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Collapsible TOC at top */}
      <div className="block md:hidden">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Collapsible TOC */}
          <TableOfContentsV2
            sections={sections}
            title={tocTitle}
            showProgress={false}
            variant="sidebar" // This will auto-convert to collapsible on mobile
            accentColor={accentColor}
            mobileBreakpoint="md"
          />

          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none"
            style={{
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `4px 4px 0px ${colors.black}`,
              padding: '24px',
            }}
          >
            {children}
          </motion.article>
        </div>
      </div>
    </div>
  );
};

// Export a minimal variant for embedding in existing layouts
export const BlogLayoutMinimal: React.FC<BlogLayoutProps> = ({
  children,
  sections,
  showProgress = true,
  tocTitle = "TABLE OF CONTENTS",
  accentColor = 'orange',
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${className}`}>
      {/* Sidebar - Table of Contents */}
      <aside className="hidden lg:block lg:col-span-3">
        <TableOfContentsV2
          sections={sections}
          title={tocTitle}
          showProgress={showProgress}
          variant="sidebar"
          accentColor={accentColor}
          mobileBreakpoint="lg"
        />
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-9">
        {children}
      </main>

      {/* Mobile TOC */}
      <div className="lg:hidden">
        <TableOfContentsV2
          sections={sections}
          title={tocTitle}
          showProgress={showProgress}
          variant="mobile"
          accentColor={accentColor}
        />
      </div>
    </div>
  );
};