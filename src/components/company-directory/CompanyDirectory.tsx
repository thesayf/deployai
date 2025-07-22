import React, { useState } from 'react';
import { FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';

// Fallback if icons don't load
const StarIcon = FiStar || (() => <span>★</span>);
const MapPinIcon = FiMapPin || (() => <span>📍</span>);
const DollarSignIcon = FiDollarSign || (() => <span>$</span>);

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

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  title = "Top Web Development Companies in Dubai",
  subtitle,
  showTypeFilter = true,
  showBudgetFilter = true,
  showTimelineFilter = true,
}) => {
  const [selectedType, setSelectedType] = useState<CompanyType | 'all'>('all');
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | 'all'>('all');
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | 'all'>('all');

  // Filter companies based on selections
  const filteredCompanies = companies.filter(company => {
    if (selectedType !== 'all' && company.type !== selectedType) return false;
    if (selectedBudget !== 'all' && company.budgetRange !== selectedBudget) return false;
    if (selectedTimeline !== 'all' && company.timeline !== selectedTimeline) return false;
    return true;
  });

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
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="mb-4 text-5xl font-black uppercase text-zinc-900 md:text-6xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-xl text-zinc-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Type Filter */}
          {showTypeFilter && (
            <div className="flex gap-2">
              <FilterButton
                active={selectedType === 'all'}
                onClick={() => setSelectedType('all')}
              >
                All Types
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
          )}

          {/* Budget Filter */}
          {showBudgetFilter && (
            <div className="flex gap-2">
              <span className="py-2 text-sm font-medium text-zinc-500">Budget:</span>
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
                Under $5K
              </FilterButton>
              <FilterButton
                active={selectedBudget === '5k-15k'}
                onClick={() => setSelectedBudget('5k-15k')}
              >
                $5K-$15K
              </FilterButton>
              <FilterButton
                active={selectedBudget === '15k-50k'}
                onClick={() => setSelectedBudget('15k-50k')}
              >
                $15K-$50K
              </FilterButton>
              <FilterButton
                active={selectedBudget === '50k-plus'}
                onClick={() => setSelectedBudget('50k-plus')}
              >
                $50K+
              </FilterButton>
            </div>
          )}

          {/* Timeline Filter */}
          {showTimelineFilter && (
            <div className="flex gap-2">
              <span className="py-2 text-sm font-medium text-zinc-500">Timeline:</span>
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
                &lt; 1 month
              </FilterButton>
              <FilterButton
                active={selectedTimeline === '1-3-months'}
                onClick={() => setSelectedTimeline('1-3-months')}
              >
                1-3 months
              </FilterButton>
              <FilterButton
                active={selectedTimeline === '3-6-months'}
                onClick={() => setSelectedTimeline('3-6-months')}
              >
                3-6 months
              </FilterButton>
              <FilterButton
                active={selectedTimeline === '6-plus-months'}
                onClick={() => setSelectedTimeline('6-plus-months')}
              >
                6+ months
              </FilterButton>
            </div>
          )}
        </div>

        {/* Active filters indicator */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
            </span>
            <button
              onClick={clearFilters}
              className="text-sm font-bold uppercase text-orange-600 hover:text-orange-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Company Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border-4 border-zinc-900 bg-gradient-to-br from-zinc-50 to-orange-50 p-12 text-center shadow-[6px_6px_0px_#18181b]">
          <p className="text-xl font-bold text-zinc-900">
            No companies match your current filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 font-bold uppercase text-white shadow-[4px_4px_0px_#18181b] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#18181b]"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
};

// Filter Button Component
interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      rounded-lg border-2 px-4 py-2 text-sm font-bold uppercase transition-all
      ${active
        ? 'border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[4px_4px_0px_#18181b] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#18181b]'
        : 'border-zinc-900 bg-white text-zinc-900 shadow-[2px_2px_0px_#18181b] hover:bg-zinc-100 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#18181b]'
      }
    `}
  >
    {children}
  </button>
);

// Company Card Component
interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const typeLabels = {
    'agency': 'Agency',
    'freelancer': 'Freelancer',
    'ai-first': 'AI-First Company'
  };

  const typeColors = {
    'agency': 'bg-blue-500 text-white',
    'freelancer': 'bg-purple-500 text-white',
    'ai-first': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
  };

  return (
    <div className="group relative flex h-full flex-col rounded-lg border-4 border-zinc-900 bg-white p-6 shadow-[6px_6px_0px_#18181b] transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#18181b]">
      {/* Type Badge */}
      <div className="mb-4 flex items-start justify-between">
        <span className={`rounded-md border-2 border-zinc-900 px-3 py-1 text-xs font-bold uppercase shadow-[2px_2px_0px_#18181b] ${typeColors[company.type]}`}>
          {typeLabels[company.type]}
        </span>
        {company.featured && (
          <span className="rounded-md border-2 border-zinc-900 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-xs font-bold uppercase text-zinc-900 shadow-[2px_2px_0px_#18181b]">
            Featured
          </span>
        )}
      </div>

      {/* Company Info */}
      <h3 className="mb-2 text-xl font-black uppercase text-zinc-900">
        {company.name}
      </h3>

      {/* Rating */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(company.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-zinc-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-zinc-600">
          {company.rating} ({company.reviewCount} reviews)
        </span>
      </div>

      {/* Location & Price */}
      <div className="mb-4 flex items-center gap-4 text-sm text-zinc-600">
        <div className="flex items-center gap-1">
          <MapPinIcon className="h-4 w-4" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center">
          {company.priceRange && [...Array(company.priceRange)].map((_, i) => (
            <DollarSignIcon key={`filled-${i}`} className="h-4 w-4 text-zinc-600" />
          ))}
          {company.priceRange && [...Array(4 - company.priceRange)].map((_, i) => (
            <DollarSignIcon key={`empty-${i}`} className="h-4 w-4 text-zinc-300" />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-sm text-zinc-600">
        {company.description}
      </p>

      {/* Specialties */}
      <div className="mb-6 flex flex-wrap gap-2">
        {company.specialties.slice(0, 3).map((specialty, index) => (
          <span
            key={index}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
          >
            {specialty}
          </span>
        ))}
        {company.specialties.length > 3 && (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
            +{company.specialties.length - 3} more
          </span>
        )}
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-grow"></div>

      {/* CTA Button */}
      <button className="w-full rounded-lg border-2 border-zinc-900 bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-bold uppercase text-white shadow-[4px_4px_0px_#18181b] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#18181b]">
        View Details
      </button>
    </div>
  );
};