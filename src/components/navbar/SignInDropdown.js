import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignInDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const { loginUserWithGoogle } = useAuth();

  // User flow now navigates to dedicated page instead of immediate login

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.15)] z-40">
      <div className="py-2">
        <button
          onClick={() => { onClose?.(); navigate('/signin-user'); }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <span className="inline-flex w-5 h-5 items-center justify-center">🟢</span>
          Sign in as User
        </button>
        <button
          onClick={() => { onClose?.(); navigate('/signin-mover'); }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <span className="inline-flex w-5 h-5 items-center justify-center">🛠️</span>
          Sign in as Mover
        </button>
        <button
          onClick={() => { onClose?.(); navigate('/register'); }}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <span className="inline-flex w-5 h-5 items-center justify-center">📝</span>
          Register as Mover
        </button>
      </div>
      {/* No inline modal; dedicated page handles sign-in */}
    </div>
  );
};

export default SignInDropdown;
