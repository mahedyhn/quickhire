import Link from 'next/link';

const STATS = [
  { label: 'Active Jobs', value: '500+' },
  { label: 'Companies', value: '120+' },
  { label: 'Candidates Hired', value: '2,000+' },
];

const FEATURED_CATEGORIES = [
  { name: 'Engineering', icon: '⚙️', count: '180 jobs' },
  { name: 'Design', icon: '🎨', count: '95 jobs' },
  { name: 'Marketing', icon: '📢', count: '73 jobs' },
  { name: 'Product', icon: '📦', count: '64 jobs' },
  { name: 'Data Science', icon: '📊', count: '58 jobs' },
  { name: 'DevOps', icon: '🚀', count: '42 jobs' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="page-container py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              500+ New Jobs This Week
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Dream Job<br />
              <span className="text-green-200">With QuickHire</span>
            </h1>
            
            <p className="text-green-100 text-lg md:text-xl mb-10 leading-relaxed">
              Browse thousands of job listings from top companies. Apply in minutes and land your next opportunity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="bg-white text-green-700 font-semibold py-3 px-8 rounded-xl hover:bg-green-50 transition-colors duration-200 text-base">
                Browse All Jobs
              </Link>
              <Link href="/admin" className="border-2 border-white/50 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors duration-200 text-base">
                Post a Job
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-green-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-16 overflow-hidden">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 64" fill="none">
            <path d="M0 64L1440 64L1440 0C1440 0 1200 64 720 64C240 64 0 0 0 0L0 64Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Category</h2>
            <p className="text-gray-500">Explore opportunities across different fields</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="card p-5 text-center group hover:border-green-200 hover:bg-green-50 transition-all duration-200"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-green-600 transition-colors">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-400 mt-1">{cat.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Get hired in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse Jobs', desc: 'Search and filter thousands of job listings from top companies.', icon: '🔍' },
              { step: '02', title: 'Apply Easily', desc: 'Submit your application with your resume link and a cover note.', icon: '📝' },
              { step: '03', title: 'Get Hired', desc: 'Hear back from companies and land your dream job.', icon: '🎉' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-green-600 tracking-widest mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-green-600 py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Role?</h2>
          <p className="text-green-100 mb-8 text-lg">Join thousands of professionals who found their dream jobs on QuickHire.</p>
          <Link href="/jobs" className="bg-white text-green-700 font-bold py-3 px-10 rounded-xl hover:bg-green-50 transition-colors text-base">
            Start Browsing Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}
