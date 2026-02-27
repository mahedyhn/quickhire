import { Job, Application, ApiResponse, JobFilters, JobFormData, ApplicationFormData } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

// Jobs API
export const jobsApi = {
  getAll: (filters?: JobFilters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.category) params.set('category', filters.category);
    if (filters?.location) params.set('location', filters.location);
    if (filters?.type) params.set('type', filters.type);

    const query = params.toString();
    return fetchApi<ApiResponse<Job[]>>(`/jobs${query ? `?${query}` : ''}`);
  },

  getById: (id: number) =>
    fetchApi<ApiResponse<Job>>(`/jobs/${id}`),

  create: (data: JobFormData) =>
    fetchApi<ApiResponse<Job>>('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    fetchApi<ApiResponse<null>>(`/jobs/${id}`, {
      method: 'DELETE',
    }),

  getCategories: () =>
    fetchApi<ApiResponse<string[]>>('/jobs/meta/categories'),

  getLocations: () =>
    fetchApi<ApiResponse<string[]>>('/jobs/meta/locations'),
};

// Applications API
export const applicationsApi = {
  submit: (data: ApplicationFormData) =>
    fetchApi<ApiResponse<Application>>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getByJob: (jobId: number) =>
    fetchApi<ApiResponse<Application[]>>(`/jobs/${jobId}/applications`),
};
