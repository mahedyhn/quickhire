import Link from 'next/link';
import { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

const TYPE_COLORS: Record<string, string> = {
  'Full-time': 'bg-green-100 text-green-700',
  'Part-time': 'bg-blue-100 text-blue-700',
  'Remote': 'bg-purple-100 text-purple-700',
  'Contract': 'bg-orange-100 text-orange-700',
  'Internship': 'bg-pink-100 text-pink-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Engineering': '⚙️',
  'Design': '🎨',
  'Marketing': '📢',
  'Product': '📦',
  'Data Science': '📊',
  'DevOps': '🚀',
  'Mobile': '📱',
  'default': '💼',
};

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

export default function JobCard({ job }: JobCardProps) {
  const icon = CATEGORY_ICONS[job.category] || CATEGORY_ICONS['default'];
  const typeColor = TYPE_COLORS[job.type] || 'bg-gray-100 text-gray-700';

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="card p-5 group cursor-pointer animate-fade-in">
        <div className="flex items-start gap-4">
          {/* Company Logo / Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain" />
            ) : (
              <span>{icon}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors text-base leading-tight">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
              </div>
              <span className={`badge ${typeColor} flex-shrink-0`}>
                {job.type}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>

              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 10V5a2 2 0 012-2z" />
                </svg>
                {job.category}
              </span>

              {job.salary && (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.salary}
                </span>
              )}

              <span className="ml-auto text-xs text-gray-400">
                {timeAgo(job.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
