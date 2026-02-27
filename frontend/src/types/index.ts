// Job type
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship';
  salary?: string;
  description: string;
  requirements?: string;
  logo?: string;
  applications_count?: number;
  created_at: string;
  updated_at: string;
}

// Application type
export interface Application {
  id: number;
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at: string;
  updated_at: string;
  job?: Job;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Filter types
export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
}

// Form types
export interface JobFormData {
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  logo: string;
}

export interface ApplicationFormData {
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
}
