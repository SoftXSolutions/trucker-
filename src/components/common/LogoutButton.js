import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = ({ className = '', size = 'md', label = 'Logout' }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const base = 'inline-flex items-center gap-2 rounded-lg border transition shadow-sm hover:shadow-md';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  };
  const styles = 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';

  const onClick = () => {
    logout();
    navigate('/');
  };

  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${styles} ${className}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m4-8V7a2 2 0 10-4 0v1" />
      </svg>
      {label}
    </button>
  );
};

export default LogoutButton;
