import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Quick<span className="text-green-400">Hire</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Connect talented professionals with great companies. Find your dream job or hire the perfect candidate on QuickHire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link href="/jobs" className="hover:text-green-400 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/admin" className="hover:text-green-400 transition-colors">Post a Job</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs?category=Engineering" className="hover:text-green-400 transition-colors">Engineering</Link></li>
              <li><Link href="/jobs?category=Design" className="hover:text-green-400 transition-colors">Design</Link></li>
              <li><Link href="/jobs?category=Marketing" className="hover:text-green-400 transition-colors">Marketing</Link></li>
              <li><Link href="/jobs?category=Product" className="hover:text-green-400 transition-colors">Product</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} QuickHire. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built for Qtec Solution Limited Technical Assessment
          </p>
        </div>
      </div>
    </footer>
  );
}
