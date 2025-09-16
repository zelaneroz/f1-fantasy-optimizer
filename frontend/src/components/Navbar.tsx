import { Link, useLocation } from 'react-router-dom';
import { Flag } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/optimizer', label: 'Optimizer' },
    { path: '/stats', label: 'Stats' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-f1-dark border-b border-f1-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Flag className="text-f1-red" size={24} />
            <span className="text-white font-bold text-xl">F1 Fantasy Optimizer</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-f1-red text-white'
                    : 'text-gray-300 hover:text-white hover:bg-f1-gray'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}