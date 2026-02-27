'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Job } from '@/types';
import { jobsApi, applicationsApi } from '@/lib/api';
import { JobDetailSkeleton } from '@/components/ui/Skeleton';

const TYPE_COLORS: Record<string, string> = {
  'Full-time':  'bg-green-100 text-green-700',
  'Part-time':  'bg-blue-100 text-blue-700',
  'Remote':     'bg-purple-100 text-purple-700',
  'Contract':   'bg-orange-100 text-orange-700',
  'Internship': 'bg-pink-100 text-pink-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Engineering':  '⚙️',
  'Design':       '🎨',
  'Marketing':    '📢',
  'Product':      '📦',
  'Data Science': '📊',
  'DevOps':       '🚀',
  'Mobile':       '📱',
  'default':      '💼',
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = Number(params.id);

  const [job, setJob]         = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const [form, setForm]             = useState({ name: '', email: '', resume_link: '', cover_note: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    jobsApi.getById(jobId)
      .then((res) => setJob(res.data))
      .catch(() => setError('Job not found or the server is unavailable.'))
      .finally(() => setLoading(false));
  }, [jobId]);

  const updateField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors(prev => { const e = { ...prev }; delete e[key]; return e; });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Full name is required.';
    if (!form.email.trim()) errors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
    if (!form.resume_link.trim()) errors.resume_link = 'Resume link is required.';
    else { try { new URL(form.resume_link); } catch { errors.resume_link = 'Resume link must be a valid URL.'; } }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setSubmitting(true);
    try {
      await applicationsApi.submit({ ...form, job_id: jobId });
      setSubmitted(true);
      setForm({ name: '', email: '', resume_link: '', cover_note: '' });
    } catch (err: any) {
      if (err?.errors) {
        const apiErrors: Record<string, string> = {};
        Object.entries(err.errors).forEach(([key, val]) => { apiErrors[key] = (val as string[])[0]; });
        setFormErrors(apiErrors);
      } else {
        setFormErrors({ general: err?.message || 'Submission failed. Please try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container py-8 max-w-4xl mx-auto">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="card p-8"><JobDetailSkeleton /></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="page-container py-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{error || 'Job not found'}</h2>
        <Link href="/jobs" className="btn-primary">Back to Jobs</Link>
      </div>
    );
  }

  const icon = CATEGORY_ICONS[job.category] ?? CATEGORY_ICONS['default'];
  const typeColor = TYPE_COLORS[job.type] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="page-container py-8">
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors mb-6 group">
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Job detail card */}
          <div className="card p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                {job.logo ? <img src={job.logo} alt={job.company} className="w-14 h-14 object-contain" /> : <span>{icon}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{job.title}</h1>
                <p className="text-gray-600 mt-1 text-lg">{job.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`badge ${typeColor}`}>{job.type}</span>
                  <span className="badge bg-gray-100 text-gray-600">{job.category}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-medium text-gray-700">{job.location}</p>
              </div>
              {job.salary && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Salary</p>
                  <p className="text-sm font-semibold text-green-600">{job.salary}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Applicants</p>
                <p className="text-sm font-medium text-gray-700">{job.applications_count ?? 0} applied</p>
              </div>
            </div>

            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
                Job Description
              </h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</div>
            </section>

            {job.requirements && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-500 rounded-full inline-block"></span>
                  Requirements
                </h2>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{job.requirements}</div>
              </section>
            )}
          </div>

          {/* Apply Now Form — always visible per spec */}
          <div className="card p-6 md:p-8" id="apply">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Apply Now</h2>
            <p className="text-sm text-gray-500 mb-6">
              Applying for <span className="font-medium text-gray-700">{job.title}</span> at <span className="font-medium text-gray-700">{job.company}</span>
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted! 🎉</h3>
                <p className="text-gray-500 text-sm">The hiring team will review your application and reach out if you're a match.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {formErrors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                    {formErrors.general}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="app-name">Full Name <span className="text-red-500">*</span></label>
                    <input id="app-name" type="text" value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`form-input ${formErrors.name ? 'border-red-400' : ''}`}
                      placeholder="John Doe" />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="app-email">Email Address <span className="text-red-500">*</span></label>
                    <input id="app-email" type="email" value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`form-input ${formErrors.email ? 'border-red-400' : ''}`}
                      placeholder="john@example.com" />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="app-resume">Resume Link (URL) <span className="text-red-500">*</span></label>
                  <input id="app-resume" type="url" value={form.resume_link}
                    onChange={(e) => updateField('resume_link', e.target.value)}
                    className={`form-input ${formErrors.resume_link ? 'border-red-400' : ''}`}
                    placeholder="https://drive.google.com/file/your-resume" />
                  {formErrors.resume_link
                    ? <p className="text-red-500 text-xs mt-1">{formErrors.resume_link}</p>
                    : <p className="text-gray-400 text-xs mt-1">Google Drive, Dropbox, LinkedIn, or any public link.</p>}
                </div>

                <div>
                  <label className="form-label" htmlFor="app-cover">Cover Note</label>
                  <textarea id="app-cover" value={form.cover_note}
                    onChange={(e) => updateField('cover_note', e.target.value)}
                    className="form-input resize-none"
                    placeholder="Tell the hiring team why you're a great fit for this role…"
                    rows={5} />
                  <p className="text-gray-400 text-xs mt-1">Optional — but strongly recommended.</p>
                </div>

                <button type="submit" disabled={submitting}
                  className="btn-primary w-full sm:w-auto justify-center px-10 py-3 text-base">
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Submitting…
                    </>
                  ) : 'Submit Application'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="card p-5 sticky top-24 space-y-4">
            <h3 className="font-semibold text-gray-900">Job Summary</h3>
            <a href="#apply" className="btn-primary w-full justify-center">Apply Now</a>

            <div className="pt-4 border-t border-gray-100 space-y-3 text-sm">
              {[
                { label: 'Company', value: job.company },
                { label: 'Location', value: job.location },
                { label: 'Job Type', value: job.type },
                ...(job.salary ? [{ label: 'Salary', value: job.salary }] : []),
                { label: 'Applicants', value: `${job.applications_count ?? 0} applied` },
                { label: 'Posted', value: new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={`font-medium ${label === 'Salary' ? 'text-green-600' : 'text-gray-700'}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
