'use client';

import { JobFilters } from '@/types';

interface JobFiltersProps {
  filters: JobFilters;
  categories: string[];
  locations: string[];
  onChange: (filters: JobFilters) => void;
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];

export default function JobFiltersPanel({ filters, categories, locations, onChange }: JobFiltersProps) {
  const update = (key: keyof JobFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const clearAll = () => {
    onChange({});
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-green-600 hover:text-green-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="form-label">Category</label>
        <select
          value={filters.category || ''}
          onChange={(e) => update('category', e.target.value)}
          className="form-input"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="form-label">Location</label>
        <select
          value={filters.location || ''}
          onChange={(e) => update('location', e.target.value)}
          className="form-input"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-4">
        <label className="form-label">Job Type</label>
        <div className="flex flex-col gap-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={(e) => update('type', e.target.value)}
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {type}
              </span>
            </label>
          ))}
          {filters.type && (
            <button
              onClick={() => update('type', '')}
              className="text-xs text-green-600 hover:underline text-left mt-1"
            >
              Clear type
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
