import { Search, X, List, Map as MapIcon, SlidersHorizontal, Lightbulb } from 'lucide-react';
import { Category, Island } from '../types';

interface CategoryFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  selectedIsland: Island;
  onSelectIsland: (island: Island) => void;
  viewMode: 'list' | 'map' | 'tips';
  onToggleViewMode: (mode: 'list' | 'map' | 'tips') => void;
  totalSpotsCount: number;
}

const CATEGORIES: Category[] = [
  'All',
  'Beaches',
  'Food & Drink',
  'Activities',
  'Practical Tips',
];

const ISLANDS: Island[] = ['All', 'Big Corn', 'Little Corn'];

export function CategoryFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedIsland,
  onSelectIsland,
  viewMode,
  onToggleViewMode,
  totalSpotsCount,
}: CategoryFilterProps) {
  return (
    <div className="w-full space-y-4">
      {/* Top Search Bar & View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#738290]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search beaches, lobster, snorkeling, ferry, Google Maps..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#E7E2D6] focus:border-[#0E4B68] focus:ring-2 focus:ring-[#0E4B68]/15 rounded-xl shadow-2xs text-[#1E293B] placeholder-[#94A3B8] transition-all outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#1E293B] transition-colors cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Mode Switcher (List vs Map vs Tips) */}
        <div className="inline-flex items-center p-1 bg-[#EFECE4] rounded-xl border border-[#E7E2D6] shrink-0 self-start sm:self-auto w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => onToggleViewMode('list')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-[#0E4B68] shadow-xs'
                : 'text-[#64748B] hover:text-[#0E4B68]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode('map')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-white text-[#0E4B68] shadow-xs'
                : 'text-[#64748B] hover:text-[#0E4B68]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode('tips')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMode === 'tips'
                ? 'bg-white text-[#0E4B68] shadow-xs'
                : 'text-[#64748B] hover:text-[#0E4B68]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Tips</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Island Segmented Filter & Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0E4B68] text-white border-[#0E4B68] shadow-xs'
                    : 'bg-white text-[#54687A] border-[#E7E2D6] hover:border-[#CBD5E1] hover:text-[#0E4B68]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Island filter */}
        <div className="flex items-center gap-2 text-xs text-[#54687A] shrink-0 self-start md:self-center">
          <span className="flex items-center gap-1 text-[#738290] font-medium hidden sm:flex">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Island:
          </span>
          <div className="inline-flex items-center p-0.5 bg-[#EFECE4] rounded-lg border border-[#E7E2D6]">
            {ISLANDS.map((island) => {
              const active = selectedIsland === island;
              return (
                <button
                  key={island}
                  type="button"
                  onClick={() => onSelectIsland(island)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    active
                      ? 'bg-white text-[#0E4B68] font-semibold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0E4B68]'
                  }`}
                >
                  {island === 'All' ? 'All Islands' : island}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results status bar */}
      <div className="flex items-center justify-between text-xs text-[#738290] border-t border-[#E7E2D6]/80 pt-2.5">
        <span>
          Showing <strong className="text-[#0E4B68] font-semibold">{totalSpotsCount}</strong> spot
          {totalSpotsCount === 1 ? '' : 's'} in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
          {selectedIsland !== 'All' ? ` on ${selectedIsland}` : ''}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-amber-700 hover:underline font-medium cursor-pointer"
          >
            Reset query
          </button>
        )}
      </div>
    </div>
  );
}
