import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SignInDropdown from './SignInDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [showDropdown]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-800">MyMoveAdvisor</div>
              <div className="text-xs text-gray-500">Professional Moving Solutions</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6 relative">
            <Link to="/quote" className="text-gray-700 hover:text-primary">Get a Quote</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary">Pricing</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary">Dashboard</Link>
            <Link to="/user" className="text-gray-700 hover:text-primary">User</Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary">Admin</Link>

            {!isAuthenticated && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown((v)=>!v)} className="text-gray-700 hover:text-primary">Sign In</button>
                {showDropdown && (
                  <SignInDropdown onClose={() => setShowDropdown(false)} />
                )}
              </div>
            )}

            {isAuthenticated && (
              <button
                onClick={() => { logout(); setShowDropdown(false); navigate('/'); }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/quote" className="block py-2 text-gray-700">Get a Quote</Link>
            <Link to="/pricing" className="block py-2 text-gray-700">Pricing</Link>
            <Link to="/dashboard" className="block py-2 text-gray-700">Dashboard</Link>
            <Link to="/user" className="block py-2 text-gray-700">User</Link>
            <Link to="/admin" className="block py-2 text-gray-700">Admin</Link>

            {!isAuthenticated && (
              <div className="mt-2 border-t pt-2">
                <button onClick={() => setShowDropdown((v)=>!v)} className="block w-full text-left py-2 text-gray-700">Sign In</button>
                {showDropdown && (
                  <div className="relative" ref={dropdownRef}>
                    <SignInDropdown onClose={() => setShowDropdown(false)} />
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && (
              <button
                onClick={() => { logout(); setShowDropdown(false); navigate('/'); }}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white w-full px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
