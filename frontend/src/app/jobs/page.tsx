'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Job, JobFilters } from '@/types';
import { jobsApi } from '@/lib/api';
import JobCard from '@/components/jobs/JobCard';
import JobFiltersPanel from '@/components/jobs/JobFilters';
import SearchBar from '@/components/ui/SearchBar';
import { JobCardSkeleton } from '@/components/ui/Skeleton';

// Inner component uses useSearchParams – must be wrapped in <Suspense>
function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Load meta data
  useEffect(() => {
    Promise.all([
      jobsApi.getCategories(),
      jobsApi.getLocations(),
    ]).then(([cats, locs]) => {
      setCategories(cats.data);
      setLocations(locs.data);
    }).catch(console.error);
  }, []);

  // Load jobs
  const loadJobs = useCallback(async (currentFilters: JobFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await jobsApi.getAll(currentFilters);
      setJobs(response.data);
    } catch (err) {
      setError('Failed to load jobs. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs(filters);
  }, [filters, loadJobs]);

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value || undefined }));
  };

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
        <p className="text-gray-500">
          {loading ? 'Loading...' : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={filters.search || ''}
          onChange={handleSearch}
          placeholder="Search by title, company, or keyword..."
        />
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-2.5 w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </span>
          <svg className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileFiltersOpen && (
          <div className="mt-2">
            <JobFiltersPanel
              filters={filters}
              categories={categories}
              locations={locations}
              onChange={handleFilterChange}
            />
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters - desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <JobFiltersPanel
            filters={filters}
            categories={categories}
            locations={locations}
            onChange={handleFilterChange}
          />
        </aside>

        {/* Jobs list */}
        <div className="flex-1 min-w-0">
          {error ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Connection Error</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">{error}</p>
              <button onClick={() => loadJobs(filters)} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No jobs found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Fallback while search params are being read
function JobsPageFallback() {
  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <div className="h-9 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
      <div className="flex gap-6">
        <div className="hidden md:block w-64 h-96 bg-gray-200 rounded-xl animate-pulse flex-shrink-0"></div>
        <div className="flex-1 flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsPageFallback />}>
      <JobsContent />
    </Suspense>
  );
}
