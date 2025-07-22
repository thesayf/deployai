import React, { useState } from 'react';

// Safe icon components with fallbacks
const StarIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MapPinIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DollarSignIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const InfoIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const FilterIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const CloseIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Company type definitions
export type CompanyType = 'agency' | 'freelancer' | 'ai-first';
export type BudgetRange = 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus';
export type Timeline = 'under-1-month' | '1-3-months' | '3-6-months' | '6-plus-months';

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4; // $ to $$$$
  location: string;
  specialties: string[];
  description: string;
  budgetRange: BudgetRange;
  timeline: Timeline;
  featured?: boolean;
}

interface CompanyDirectoryProps {
  companies: Company[];
  title?: string;
  subtitle?: string;
  showTypeFilter?: boolean;
  showBudgetFilter?: boolean;
  showTimelineFilter?: boolean;
}

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
  displayXL: 'text-7xl font-black leading-none tracking-tight', // 72px
  displayL: 'text-6xl font-black leading-none tracking-tight',  // 60px
  displayM: 'text-5xl font-extrabold leading-tight tracking-tight', // 48px
  displayS: 'text-4xl font-extrabold leading-tight tracking-tight', // 36px
  headingXL: 'text-3xl font-bold leading-tight', // 30px
  headingL: 'text-2xl font-bold leading-snug',   // 24px
  headingM: 'text-xl font-semibold leading-snug', // 20px
  headingS: 'text-lg font-semibold leading-snug', // 18px
  bodyL: 'text-lg font-normal leading-relaxed',   // 18px
  bodyM: 'text-base font-normal leading-relaxed', // 16px
  bodyS: 'text-sm font-normal leading-normal',    // 14px
  caption: 'text-xs font-medium leading-tight tracking-wide' // 12px
};

// Design System Spacing (8px base unit)
const spacing = {
  xs: '4px',   // 0.5 * 8
  sm: '8px',   // 1 * 8
  md: '16px',  // 2 * 8
  lg: '24px',  // 3 * 8
  xl: '32px',  // 4 * 8
  '2xl': '48px', // 6 * 8
  '3xl': '64px', // 8 * 8
  '4xl': '96px'  // 12 * 8
};

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies = [],
  title = "Top Web Development Companies in Dubai",
  subtitle,
  showTypeFilter = true,
  showBudgetFilter = true,
  showTimelineFilter = true,
}) => {
  const [selectedType, setSelectedType] = useState<CompanyType | 'all'>('all');
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | 'all'>('all');
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | 'all'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter companies based on selections
  const filteredCompanies = Array.isArray(companies) ? companies.filter(company => {
    if (!company) return false;
    if (selectedType !== 'all' && company.type !== selectedType) return false;
    if (selectedBudget !== 'all' && company.budgetRange !== selectedBudget) return false;
    if (selectedTimeline !== 'all' && company.timeline !== selectedTimeline) return false;
    return true;
  }) : [];

  // Count active filters
  const activeFilterCount = [
    selectedType !== 'all' ? 1 : 0,
    selectedBudget !== 'all' ? 1 : 0,
    selectedTimeline !== 'all' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedBudget('all');
    setSelectedTimeline('all');
  };

  return (
    <section className="w-full">
      {/* Hero Section with Title */}
      {(title || subtitle) && (
        <div className="text-center px-4 sm:px-6" style={{ marginBottom: spacing['3xl'] }}>
          {title && (
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight uppercase"
              style={{ 
                color: colors.black,
                textShadow: `2px 2px 0px ${colors.electricOrange}`,
                marginBottom: spacing.lg,
                wordBreak: 'break-word'
              }}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ 
              color: colors.charcoal,
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filter Section */}
      <div className="px-4 sm:px-6" style={{ marginBottom: spacing.xl }}>
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="text-base font-semibold uppercase flex items-center gap-2"
            style={{
              padding: `${spacing.md} ${spacing.lg}`,
              background: colors.white,
              border: `3px solid ${colors.black}`,
              boxShadow: `4px 4px 0px ${colors.black}`,
              color: colors.black,
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <span className="flex items-center gap-2">
              <FilterIcon className="w-5 h-5" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </span>
            {showMobileFilters ? <CloseIcon className="w-5 h-5" /> : null}
          </button>
        </div>

        {/* Desktop Filters / Mobile Dropdown */}
        <div className={`space-y-4 ${showMobileFilters ? 'block' : 'hidden md:block'}`}
             style={{
               ...(showMobileFilters && {
                 background: colors.white,
                 border: `3px solid ${colors.black}`,
                 borderTop: 'none',
                 padding: spacing.lg,
                 marginTop: '-3px'
               })
             }}>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            {/* Type Filter Group */}
            {showTypeFilter && (
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <span className={`${typography.caption} uppercase`} 
                      style={{ 
                        color: colors.graphite,
                        letterSpacing: '0.5px',
                        minWidth: '80px'
                      }}>
                  Company Type
                </span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={selectedType === 'all'}
                    onClick={() => setSelectedType('all')}
                  >
                    All
                  </FilterButton>
                  <FilterButton
                    active={selectedType === 'agency'}
                    onClick={() => setSelectedType('agency')}
                  >
                    Agency
                  </FilterButton>
                  <FilterButton
                    active={selectedType === 'freelancer'}
                    onClick={() => setSelectedType('freelancer')}
                  >
                    Freelancer
                  </FilterButton>
                  <FilterButton
                    active={selectedType === 'ai-first'}
                    onClick={() => setSelectedType('ai-first')}
                  >
                    AI-First
                  </FilterButton>
                </div>
              </div>
            )}

            {/* Budget Filter Group */}
            {showBudgetFilter && (
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <span className={`${typography.caption} uppercase`} 
                      style={{ 
                        color: colors.graphite,
                        letterSpacing: '0.5px',
                        minWidth: '80px'
                      }}>
                  Budget Range
                </span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={selectedBudget === 'all'}
                    onClick={() => setSelectedBudget('all')}
                  >
                    Any
                  </FilterButton>
                  <FilterButton
                    active={selectedBudget === 'under-5k'}
                    onClick={() => setSelectedBudget('under-5k')}
                  >
                    &lt;$5K
                  </FilterButton>
                  <FilterButton
                    active={selectedBudget === '5k-15k'}
                    onClick={() => setSelectedBudget('5k-15k')}
                  >
                    $5-15K
                  </FilterButton>
                  <FilterButton
                    active={selectedBudget === '15k-50k'}
                    onClick={() => setSelectedBudget('15k-50k')}
                  >
                    $15-50K
                  </FilterButton>
                  <FilterButton
                    active={selectedBudget === '50k-plus'}
                    onClick={() => setSelectedBudget('50k-plus')}
                  >
                    $50K+
                  </FilterButton>
                </div>
              </div>
            )}

            {/* Timeline Filter Group */}
            {showTimelineFilter && (
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <span className={`${typography.caption} uppercase`} 
                      style={{ 
                        color: colors.graphite,
                        letterSpacing: '0.5px',
                        minWidth: '80px'
                      }}>
                  Timeline
                </span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={selectedTimeline === 'all'}
                    onClick={() => setSelectedTimeline('all')}
                  >
                    Any
                  </FilterButton>
                  <FilterButton
                    active={selectedTimeline === 'under-1-month'}
                    onClick={() => setSelectedTimeline('under-1-month')}
                  >
                    &lt;1mo
                  </FilterButton>
                  <FilterButton
                    active={selectedTimeline === '1-3-months'}
                    onClick={() => setSelectedTimeline('1-3-months')}
                  >
                    1-3mo
                  </FilterButton>
                  <FilterButton
                    active={selectedTimeline === '3-6-months'}
                    onClick={() => setSelectedTimeline('3-6-months')}
                  >
                    3-6mo
                  </FilterButton>
                  <FilterButton
                    active={selectedTimeline === '6-plus-months'}
                    onClick={() => setSelectedTimeline('6-plus-months')}
                  >
                    6mo+
                  </FilterButton>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between pt-4 border-t-2" 
                 style={{ borderColor: colors.steel }}>
              <span className={typography.bodyS} style={{ color: colors.graphite }}>
                {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
              </span>
              <button
                onClick={clearFilters}
                className={`${typography.caption} uppercase`}
                style={{ 
                  color: colors.crimsonRed,
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-4 sm:px-6">
        {filteredCompanies.length > 0 ? (
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </div>
    </section>
  );
};

// Filter Button Component
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${typography.caption} uppercase transition-all`}
      style={{
        padding: `${spacing.sm} ${spacing.md}`,
        background: active 
          ? `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`
          : colors.white,
        border: `3px solid ${colors.black}`,
        borderRadius: 0,
        boxShadow: active ? `4px 4px 0px ${colors.black}` : `2px 2px 0px ${colors.black}`,
        color: active ? colors.white : colors.black,
        fontWeight: 700,
        letterSpacing: '0.5px',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = active 
          ? `6px 6px 0px ${colors.black}` 
          : `4px 4px 0px ${colors.black}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = active 
          ? `4px 4px 0px ${colors.black}` 
          : `2px 2px 0px ${colors.black}`;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(1px, 1px)';
        e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = active 
          ? `6px 6px 0px ${colors.black}` 
          : `4px 4px 0px ${colors.black}`;
      }}
    >
      {children}
    </button>
  );
};

// Company Card Component
interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const typeConfig = {
    'agency': {
      label: 'Agency',
      gradient: `linear-gradient(135deg, ${colors.cyberBlue} 0%, #1D3557 100%)`,
      shadow: colors.cyberBlue
    },
    'freelancer': {
      label: 'Freelancer',
      gradient: `linear-gradient(135deg, ${colors.deepMagenta} 0%, ${colors.electricOrange} 100%)`,
      shadow: colors.deepMagenta
    },
    'ai-first': {
      label: 'AI-First',
      gradient: `linear-gradient(90deg, ${colors.electricOrange}, ${colors.crimsonRed}, ${colors.deepMagenta})`,
      shadow: colors.electricOrange
    }
  };

  return (
    <article 
      className="card-brutal group h-full flex flex-col"
      style={{
        background: colors.white,
        border: `3px solid ${colors.black}`,
        boxShadow: `6px 6px 0px ${colors.black}`,
        padding: spacing.lg,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.15s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = `9px 9px 0px ${colors.black}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
      }}
    >
      {/* Color Bar */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: typeConfig[company.type].gradient
        }}
      />

      {/* Header with Type & Featured Badge */}
      <div className="flex items-start justify-between" style={{ marginBottom: spacing.md }}>
        <span 
          className={`${typography.caption} uppercase`}
          style={{
            padding: `${spacing.xs} ${spacing.sm}`,
            background: typeConfig[company.type].gradient,
            border: `2px solid ${colors.black}`,
            boxShadow: `2px 2px 0px ${colors.black}`,
            color: colors.white,
            fontWeight: 700,
            letterSpacing: '1px'
          }}
        >
          {typeConfig[company.type].label}
        </span>
        
        {company.featured && (
          <span 
            className={`${typography.caption} uppercase`}
            style={{
              position: 'absolute',
              top: '-12px',
              right: spacing.md,
              padding: `${spacing.sm} ${spacing.md}`,
              background: colors.electricOrange,
              border: `3px solid ${colors.black}`,
              color: colors.white,
              fontWeight: 700,
              letterSpacing: '1px',
              transform: 'rotate(3deg)'
            }}
          >
            Popular
          </span>
        )}
      </div>

      {/* Company Name */}
      <h3 className={`${typography.headingL} uppercase`} 
          style={{ 
            color: colors.obsidian,
            marginBottom: spacing.sm
          }}>
        {company.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2" style={{ marginBottom: spacing.md }}>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className="w-4 h-4"
              style={{
                fill: i < Math.floor(company.rating) ? colors.amber : colors.steel,
                color: i < Math.floor(company.rating) ? colors.amber : colors.steel,
                strokeWidth: '2px'
              }}
            />
          ))}
        </div>
        <span className={typography.bodyS} style={{ color: colors.graphite }}>
          {company.rating} ({company.reviewCount})
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: spacing.md }}>
        <div className="flex items-center gap-1">
          <MapPinIcon className="w-4 h-4" style={{ color: colors.graphite, strokeWidth: '2px' }} />
          <span className={typography.bodyS} style={{ color: colors.graphite }}>
            {company.location}
          </span>
        </div>
        <div className="flex items-center">
          {company.priceRange && [...Array(company.priceRange)].map((_, i) => (
            <DollarSignIcon 
              key={`filled-${i}`} 
              className="w-4 h-4" 
              style={{ color: colors.emerald, strokeWidth: '2px' }} 
            />
          ))}
          {company.priceRange && [...Array(4 - company.priceRange)].map((_, i) => (
            <DollarSignIcon 
              key={`empty-${i}`} 
              className="w-4 h-4" 
              style={{ color: colors.steel, strokeWidth: '2px' }} 
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className={`${typography.bodyM} line-clamp-2`} 
         style={{ 
           color: colors.charcoal,
           marginBottom: spacing.md,
           flexGrow: 1
         }}>
        {company.description}
      </p>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: spacing.lg }}>
        {company.specialties.slice(0, 3).map((specialty, index) => (
          <span
            key={index}
            className={typography.caption}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              background: colors.concrete,
              border: `1px solid ${colors.steel}`,
              color: colors.charcoal,
              fontWeight: 500
            }}
          >
            {specialty}
          </span>
        ))}
        {company.specialties.length > 3 && (
          <span 
            className={typography.caption}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              color: colors.graphite,
              fontWeight: 500
            }}
          >
            +{company.specialties.length - 3}
          </span>
        )}
      </div>

      {/* CTA Button */}
      <button 
        className={`${typography.headingS} uppercase w-full`}
        style={{
          padding: `${spacing.md} ${spacing.xl}`,
          background: `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`,
          border: `3px solid ${colors.black}`,
          borderRadius: 0,
          boxShadow: `4px 4px 0px ${colors.black}`,
          color: colors.white,
          fontWeight: 700,
          letterSpacing: '0.5px',
          transition: 'all 0.1s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translate(1px, 1px)';
          e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
        }}
      >
        View Details
      </button>
    </article>
  );
};

// Empty State Component
interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div 
      className="text-center"
      style={{
        background: colors.white,
        border: `4px solid ${colors.black}`,
        boxShadow: `12px 12px 0px ${colors.black}`,
        padding: spacing['3xl'],
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <div style={{ marginBottom: spacing.lg }}>
        <InfoIcon 
          className="w-16 h-16 mx-auto" 
          style={{ 
            color: colors.sapphire,
            strokeWidth: '2px'
          }} 
        />
      </div>
      
      <h3 className={`${typography.headingL} uppercase`} 
          style={{ 
            color: colors.obsidian,
            marginBottom: spacing.md
          }}>
        No Matches Found
      </h3>
      
      <p className={typography.bodyM} 
         style={{ 
           color: colors.charcoal,
           marginBottom: spacing.xl
         }}>
        Try adjusting your filters to see more companies
      </p>
      
      <button
        onClick={onClearFilters}
        className={`${typography.headingS} uppercase`}
        style={{
          padding: `${spacing.md} ${spacing['2xl']}`,
          background: `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.crimsonRed} 100%)`,
          border: `3px solid ${colors.black}`,
          borderRadius: 0,
          boxShadow: `4px 4px 0px ${colors.black}`,
          color: colors.white,
          fontWeight: 700,
          letterSpacing: '0.5px',
          transition: 'all 0.1s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};