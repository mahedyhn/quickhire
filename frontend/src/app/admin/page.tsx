'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Job, JobFormData } from '@/types';
import { jobsApi } from '@/lib/api';

const CATEGORIES = ['Engineering', 'Design', 'Marketing', 'Product', 'Data Science', 'DevOps', 'Mobile', 'Other'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];

const EMPTY_FORM: JobFormData = {
  title: '',
  company: '',
  location: '',
  category: '',
  type: 'Full-time',
  salary: '',
  description: '',
  requirements: '',
  logo: '',
};

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<JobFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const loadJobs = async () => {
    try {
      const res = await jobsApi.getAll();
      setJobs(res.data);
    } catch {
      setErrorMsg('Failed to load jobs. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = 'Job title is required.';
    if (!form.company.trim()) errors.company = 'Company name is required.';
    if (!form.location.trim()) errors.location = 'Location is required.';
    if (!form.category) errors.category = 'Category is required.';
    if (!form.type) errors.type = 'Job type is required.';
    if (!form.description.trim()) errors.description = 'Description is required.';
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitting(true);
    try {
      await jobsApi.create(form);
      setSuccessMsg('Job created successfully!');
      setShowForm(false);
      setForm(EMPTY_FORM);
      loadJobs();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      if (err?.errors) {
        const apiErrors: Record<string, string> = {};
        Object.entries(err.errors).forEach(([key, val]) => {
          apiErrors[key] = (val as string[])[0];
        });
        setFormErrors(apiErrors);
      } else {
        setFormErrors({ general: err?.message || 'Failed to create job.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;
    setDeletingId(id);
    try {
      await jobsApi.delete(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      setSuccessMsg('Job deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch {
      setErrorMsg('Failed to delete job.');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setDeletingId(null);
    }
  };

  const updateForm = (key: keyof JobFormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors(prev => { const e = {...prev}; delete e[key]; return e; });
  };

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage job listings</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setFormErrors({}); }}
          className="btn-primary"
        >
          {showForm ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </>
          )}
        </button>
      </div>

      {/* Success/Error messages */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
          {errorMsg}
        </div>
      )}

      {/* Create Job Form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Create New Job Listing</h2>
          <form onSubmit={handleSubmit}>
            {formErrors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                {formErrors.general}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  className={`form-input ${formErrors.title ? 'border-red-400' : ''}`}
                  placeholder="e.g. Senior Frontend Developer"
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div>
                <label className="form-label">Company *</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateForm('company', e.target.value)}
                  className={`form-input ${formErrors.company ? 'border-red-400' : ''}`}
                  placeholder="e.g. TechCorp Solutions"
                />
                {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
              </div>

              <div>
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateForm('location', e.target.value)}
                  className={`form-input ${formErrors.location ? 'border-red-400' : ''}`}
                  placeholder="e.g. Dhaka, Bangladesh or Remote"
                />
                {formErrors.location && <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>}
              </div>

              <div>
                <label className="form-label">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => updateForm('category', e.target.value)}
                  className={`form-input ${formErrors.category ? 'border-red-400' : ''}`}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
              </div>

              <div>
                <label className="form-label">Job Type *</label>
                <select
                  value={form.type}
                  onChange={(e) => updateForm('type', e.target.value)}
                  className={`form-input ${formErrors.type ? 'border-red-400' : ''}`}
                >
                  {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
              </div>

              <div>
                <label className="form-label">Salary Range</label>
                <input
                  type="text"
                  value={form.salary}
                  onChange={(e) => updateForm('salary', e.target.value)}
                  className="form-input"
                  placeholder="e.g. $60,000 - $80,000"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Job Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm('description', e.target.value)}
                className={`form-input min-h-[120px] resize-none ${formErrors.description ? 'border-red-400' : ''}`}
                placeholder="Describe the role, responsibilities, and company..."
                rows={5}
              />
              {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
            </div>

            <div className="mt-4">
              <label className="form-label">Requirements</label>
              <textarea
                value={form.requirements}
                onChange={(e) => updateForm('requirements', e.target.value)}
                className="form-input min-h-[100px] resize-none"
                placeholder="List the qualifications and skills required..."
                rows={4}
              />
            </div>

            <div className="mt-4">
              <label className="form-label">Company Logo URL</label>
              <input
                type="url"
                value={form.logo}
                onChange={(e) => updateForm('logo', e.target.value)}
                className="form-input"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Job Listing'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setFormErrors({}); }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            All Job Listings ({jobs.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">No jobs listed yet. Create your first listing!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Applications</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{job.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{job.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{job.location}</span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="badge bg-green-50 text-green-700 text-xs">{job.type}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">{job.applications_count || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/jobs/${job.id}`} className="text-xs text-green-600 hover:text-green-700 font-medium">
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          disabled={deletingId === job.id}
                          className="text-xs text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
                        >
                          {deletingId === job.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
