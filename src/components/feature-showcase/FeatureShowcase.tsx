import React from 'react';
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
  
  // Semantic
  emerald: '#00C851',
  amber: '#FFB300',
  sapphire: '#2196F3'
};

// Design System Typography
const typography = {
  displayL: 'text-5xl sm:text-6xl font-black leading-none tracking-tight',
  displayM: 'text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight',
  displayS: 'text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight',
  headingL: 'text-2xl font-bold leading-snug',
  headingM: 'text-xl font-semibold leading-snug',
  headingS: 'text-lg font-semibold leading-snug',
  bodyL: 'text-lg font-normal leading-relaxed',
  bodyM: 'text-base font-normal leading-relaxed',
  bodyS: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-medium leading-tight tracking-wide'
};

// Default Icons
const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M14.5 4l-5 16" />
  </svg>
);

const ServerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
  href?: string;
  badge?: string;
  highlight?: boolean;
}

interface FeatureShowcaseProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  variant?: 'grid' | 'cards' | 'minimal' | 'detailed' | 'bento';
  columns?: 2 | 3 | 4;
  showFeatureList?: boolean;
  showBadge?: boolean;
  accentColor?: 'orange' | 'blue' | 'magenta' | 'red';
  onFeatureClick?: (feature: Feature) => void;
  className?: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  subtitle,
  features,
  variant = 'grid',
  columns = 3,
  showFeatureList = true,
  showBadge = true,
  accentColor = 'orange',
  onFeatureClick,
  className = ''
}) => {
  const accentColors = {
    orange: colors.electricOrange,
    blue: colors.cyberBlue,
    magenta: colors.deepMagenta,
    red: colors.crimsonRed
  };

  const currentAccent = accentColors[accentColor];

  const getDefaultIcon = (index: number) => {
    const icons = [
      <CodeIcon key="code" className="w-full h-full" />,
      <ServerIcon key="server" className="w-full h-full" />,
      <ShieldIcon key="shield" className="w-full h-full" />,
      <ZapIcon key="zap" className="w-full h-full" />
    ];
    return icons[index % icons.length];
  };

  const handleFeatureClick = (feature: Feature) => {
    if (onFeatureClick) {
      onFeatureClick(feature);
    }
  };

  // Grid columns configuration
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Grid variant - icon-focused
  const renderGridItem = (feature: Feature, index: number) => {
    const content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <div
          className="h-full cursor-pointer group text-center"
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '32px 24px',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
          }}
          onClick={() => handleFeatureClick(feature)}
        >
          {/* Badge */}
          {showBadge && feature.badge && (
            <div
              className={`${typography.caption} uppercase px-2 py-1`}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: currentAccent,
                color: colors.white,
                border: `2px solid ${colors.black}`,
                boxShadow: `2px 2px 0px ${colors.black}`,
                fontWeight: 700
              }}
            >
              {feature.badge}
            </div>
          )}

          {/* Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: feature.highlight ? currentAccent : colors.concrete,
              border: `3px solid ${colors.black}`,
              boxShadow: `3px 3px 0px ${colors.black}`,
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-3deg)',
              transition: 'all 0.2s ease'
            }}
            className="group-hover:scale-110 group-hover:rotate-0"
          >
            <div style={{ 
              color: feature.highlight ? colors.white : colors.black,
              transform: 'rotate(3deg)'
            }}>
              {feature.icon || getDefaultIcon(index)}
            </div>
          </div>

          {/* Title */}
          <h3 
            className={`${typography.headingM} mb-3`}
            style={{ color: colors.black }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p 
            className={`${typography.bodyS}`}
            style={{ color: colors.charcoal }}
          >
            {feature.description}
          </p>

          {/* Arrow for link */}
          {feature.href && (
            <div className="mt-4 flex justify-center" style={{ color: currentAccent }}>
              <ArrowIcon 
                className="w-5 h-5 transition-transform group-hover:translate-x-2" 
              />
            </div>
          )}
        </div>
      </motion.div>
    );

    return feature.href ? (
      <a key={feature.id} href={feature.href} className="block h-full">
        {content}
      </a>
    ) : (
      <div key={feature.id}>
        {content}
      </div>
    );
  };

  // Cards variant - more detailed
  const renderCardItem = (feature: Feature, index: number) => {
    const content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <div
          className="h-full cursor-pointer group"
          style={{
            background: colors.white,
            border: `4px solid ${colors.black}`,
            boxShadow: `6px 6px 0px ${colors.black}`,
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-3px, -3px)';
            e.currentTarget.style.boxShadow = `9px 9px 0px ${colors.black}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
          }}
          onClick={() => handleFeatureClick(feature)}
        >
          {/* Header */}
          <div
            style={{
              background: feature.highlight ? currentAccent : colors.concrete,
              borderBottom: `4px solid ${colors.black}`,
              padding: '24px'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: colors.white,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ color: colors.black }}>
                    {feature.icon || getDefaultIcon(index)}
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className={`${typography.headingL}`}
                  style={{ color: feature.highlight ? colors.white : colors.black }}
                >
                  {feature.title}
                </h3>
              </div>

              {/* Badge */}
              {showBadge && feature.badge && (
                <div
                  className={`${typography.caption} uppercase px-3 py-1`}
                  style={{
                    background: colors.white,
                    color: colors.black,
                    border: `2px solid ${colors.black}`,
                    boxShadow: `2px 2px 0px ${colors.black}`,
                    fontWeight: 700
                  }}
                >
                  {feature.badge}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <p 
              className={`${typography.bodyM} mb-4`}
              style={{ color: colors.charcoal }}
            >
              {feature.description}
            </p>

            {/* Feature List */}
            {showFeatureList && feature.features && feature.features.length > 0 && (
              <div className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        background: colors.emerald,
                        border: `2px solid ${colors.black}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <CheckIcon className="w-3 h-3" />
                    </div>
                    <span 
                      className={typography.bodyS}
                      style={{ color: colors.charcoal }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {feature.href && (
              <div className="mt-6">
                <span 
                  className={`${typography.bodyM} font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all`}
                  style={{ color: currentAccent }}
                >
                  Learn More
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );

    return feature.href ? (
      <a key={feature.id} href={feature.href} className="block h-full">
        {content}
      </a>
    ) : (
      <div key={feature.id}>
        {content}
      </div>
    );
  };

  // Minimal variant - text-focused
  const renderMinimalItem = (feature: Feature, index: number) => {
    const content = (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div
          className="cursor-pointer group"
          style={{
            padding: '24px 0',
            borderBottom: index < features.length - 1 ? `2px solid ${colors.black}` : 'none'
          }}
          onClick={() => handleFeatureClick(feature)}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                background: colors.concrete,
                border: `2px solid ${colors.black}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <div style={{ color: colors.black }}>
                {feature.icon || getDefaultIcon(index)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 
                  className={`${typography.headingM} group-hover:underline`}
                  style={{ 
                    color: colors.black,
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '2px'
                  }}
                >
                  {feature.title}
                </h3>
                {feature.badge && (
                  <span
                    className={`${typography.caption} uppercase px-2 py-1`}
                    style={{
                      background: currentAccent,
                      color: colors.white,
                      fontWeight: 700
                    }}
                  >
                    {feature.badge}
                  </span>
                )}
              </div>
              <p 
                className={typography.bodyS}
                style={{ color: colors.charcoal }}
              >
                {feature.description}
              </p>
              {feature.href && (
                <div style={{ color: currentAccent }}>
                  <ArrowIcon 
                    className="w-4 h-4 mt-2 transition-transform group-hover:translate-x-2" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );

    return feature.href ? (
      <a key={feature.id} href={feature.href} className="block">
        {content}
      </a>
    ) : (
      <div key={feature.id}>
        {content}
      </div>
    );
  };

  // Bento variant - asymmetric grid
  const renderBentoGrid = () => {
    if (features.length === 0) return null;

    // Ensure we have at least 5 features for a proper bento layout
    const bentoFeatures = features.slice(0, 6);
    
    return (
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* Large feature - spans 8 columns on desktop */}
        {bentoFeatures[0] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8"
          >
            <div
              className="h-full cursor-pointer group"
              style={{
                background: bentoFeatures[0].highlight ? currentAccent : colors.white,
                border: `4px solid ${colors.black}`,
                boxShadow: `8px 8px 0px ${colors.black}`,
                minHeight: '400px',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = `12px 12px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `8px 8px 0px ${colors.black}`;
              }}
              onClick={() => handleFeatureClick(bentoFeatures[0])}
            >
              {/* Badge */}
              {showBadge && bentoFeatures[0].badge && (
                <div
                  className={`${typography.bodyS} uppercase px-3 py-1`}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    background: colors.white,
                    color: colors.black,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                    fontWeight: 700,
                    zIndex: 10
                  }}
                >
                  {bentoFeatures[0].badge}
                </div>
              )}

              <div className="p-8 lg:p-12 h-full flex flex-col">
                {/* Icon */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    background: bentoFeatures[0].highlight ? colors.white : colors.concrete,
                    border: `4px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-6deg)',
                    marginBottom: '32px'
                  }}
                  className="group-hover:rotate-0 transition-transform"
                >
                  <div style={{ 
                    color: bentoFeatures[0].highlight ? colors.black : colors.black,
                    transform: 'rotate(6deg)'
                  }}>
                    {bentoFeatures[0].icon || getDefaultIcon(0)}
                  </div>
                </div>

                {/* Content */}
                <h3 
                  className={`${typography.displayS} mb-4`}
                  style={{ color: bentoFeatures[0].highlight ? colors.white : colors.black }}
                >
                  {bentoFeatures[0].title}
                </h3>
                <p 
                  className={`${typography.bodyL} flex-1`}
                  style={{ color: bentoFeatures[0].highlight ? colors.white : colors.charcoal }}
                >
                  {bentoFeatures[0].description}
                </p>

                {/* Arrow */}
                {bentoFeatures[0].href && (
                  <div className="mt-6" style={{ color: bentoFeatures[0].highlight ? colors.white : colors.black }}>
                    <ArrowIcon 
                      className="w-6 h-6 transition-transform group-hover:translate-x-2" 
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Medium feature - spans 4 columns */}
        {bentoFeatures[1] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-12 lg:col-span-4"
          >
            <div
              className="h-full cursor-pointer group"
              style={{
                background: colors.white,
                border: `3px solid ${colors.black}`,
                boxShadow: `6px 6px 0px ${colors.black}`,
                minHeight: '400px',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = `9px 9px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
              }}
              onClick={() => handleFeatureClick(bentoFeatures[1])}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: colors.cyberBlue,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ color: colors.white }}>
                    {bentoFeatures[1].icon || getDefaultIcon(1)}
                  </div>
                </div>

                <h3 
                  className={`${typography.headingL} mb-3`}
                  style={{ color: colors.black }}
                >
                  {bentoFeatures[1].title}
                </h3>
                <p 
                  className={`${typography.bodyM} flex-1`}
                  style={{ color: colors.charcoal }}
                >
                  {bentoFeatures[1].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Row of 3 small features */}
        {bentoFeatures.slice(2, 5).map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <div
              className="h-full cursor-pointer group"
              style={{
                background: colors.white,
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
                minHeight: '250px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
              }}
              onClick={() => handleFeatureClick(feature)}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: colors.concrete,
                    border: `2px solid ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ color: colors.black }}>
                    {feature.icon || getDefaultIcon(index + 2)}
                  </div>
                </div>

                <h3 
                  className={`${typography.headingM} mb-2`}
                  style={{ color: colors.black }}
                >
                  {feature.title}
                </h3>
                <p 
                  className={`${typography.bodyS} flex-1`}
                  style={{ color: colors.charcoal }}
                >
                  {feature.description}
                </p>

                {feature.badge && (
                  <div className="mt-3">
                    <span
                      className={`${typography.caption} uppercase px-2 py-1`}
                      style={{
                        background: currentAccent,
                        color: colors.white,
                        fontWeight: 700
                      }}
                    >
                      {feature.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Wide bottom feature */}
        {bentoFeatures[5] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-12"
          >
            <div
              className="cursor-pointer group"
              style={{
                background: colors.deepMagenta,
                border: `4px solid ${colors.black}`,
                boxShadow: `6px 6px 0px ${colors.black}`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = `9px 9px 0px ${colors.black}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
              }}
              onClick={() => handleFeatureClick(bentoFeatures[5])}
            >
              <div className="p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
                {/* Icon */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: colors.white,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: 'rotate(3deg)'
                  }}
                  className="group-hover:rotate-0 transition-transform"
                >
                  <div style={{ 
                    color: colors.black,
                    transform: 'rotate(-3deg)'
                  }}>
                    {bentoFeatures[5].icon || getDefaultIcon(5)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 
                    className={`${typography.headingL} mb-2`}
                    style={{ color: colors.white }}
                  >
                    {bentoFeatures[5].title}
                  </h3>
                  <p 
                    className={`${typography.bodyM}`}
                    style={{ color: colors.white }}
                  >
                    {bentoFeatures[5].description}
                  </p>
                </div>

                {/* CTA */}
                {bentoFeatures[5].href && (
                  <div className="flex items-center gap-2" style={{ color: colors.white }}>
                    <span 
                      className={`${typography.bodyM} font-bold uppercase`}
                    >
                      Learn More
                    </span>
                    <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Detailed variant - alternating layout
  const renderDetailedItem = (feature: Feature, index: number) => {
    const isEven = index % 2 === 0;

    return (
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="mb-12"
      >
        <div className={`flex flex-col lg:flex-row gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          {/* Visual */}
          <div className="flex-1">
            <div
              style={{
                background: feature.highlight ? currentAccent : colors.concrete,
                border: `4px solid ${colors.black}`,
                boxShadow: `8px 8px 0px ${colors.black}`,
                padding: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-2deg)'
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  color: feature.highlight ? colors.white : colors.black,
                  transform: 'rotate(2deg)'
                }}
              >
                {feature.icon || getDefaultIcon(index)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h3 
                className={typography.displayS}
                style={{ color: colors.black }}
              >
                {feature.title}
              </h3>
              {feature.badge && (
                <span
                  className={`${typography.bodyS} uppercase px-3 py-1`}
                  style={{
                    background: currentAccent,
                    color: colors.white,
                    border: `2px solid ${colors.black}`,
                    boxShadow: `2px 2px 0px ${colors.black}`,
                    fontWeight: 700
                  }}
                >
                  {feature.badge}
                </span>
              )}
            </div>

            <p 
              className={`${typography.bodyL} mb-6`}
              style={{ color: colors.charcoal }}
            >
              {feature.description}
            </p>

            {/* Feature List */}
            {showFeatureList && feature.features && feature.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        background: colors.emerald,
                        border: `2px solid ${colors.black}`,
                        boxShadow: `2px 2px 0px ${colors.black}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <span 
                      className={typography.bodyM}
                      style={{ color: colors.charcoal }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {feature.href && (
              <a
                href={feature.href}
                className="inline-flex items-center gap-3 group"
                style={{
                  background: colors.black,
                  color: colors.white,
                  padding: '12px 24px',
                  border: `3px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${currentAccent}`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = `6px 6px 0px ${currentAccent}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `4px 4px 0px ${currentAccent}`;
                }}
              >
                Explore Feature
                <ArrowIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${className}`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 
              className={typography.displayM}
              style={{ color: colors.black }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p 
              className={`${typography.bodyL} mt-4`}
              style={{ color: colors.charcoal }}
            >
              {subtitle}
            </p>
          )}
          <div
            style={{
              width: '100px',
              height: '6px',
              background: currentAccent,
              margin: '24px auto 0',
              border: `2px solid ${colors.black}`,
              boxShadow: `2px 2px 0px ${colors.black}`
            }}
          />
        </div>
      )}

      {/* Features */}
      {variant === 'grid' && (
        <div className={`grid ${getGridCols()} gap-8`}>
          {features.map((feature, index) => renderGridItem(feature, index))}
        </div>
      )}

      {variant === 'cards' && (
        <div className={`grid ${getGridCols()} gap-8`}>
          {features.map((feature, index) => renderCardItem(feature, index))}
        </div>
      )}

      {variant === 'minimal' && (
        <div
          style={{
            background: colors.white,
            border: `3px solid ${colors.black}`,
            boxShadow: `4px 4px 0px ${colors.black}`,
            padding: '0 32px'
          }}
        >
          {features.map((feature, index) => renderMinimalItem(feature, index))}
        </div>
      )}

      {variant === 'detailed' && (
        <div>
          {features.map((feature, index) => renderDetailedItem(feature, index))}
        </div>
      )}

      {variant === 'bento' && renderBentoGrid()}
    </motion.section>
  );
};