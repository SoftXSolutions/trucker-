import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignInMover = () => {
  const { loginMover } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginMover(email);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-yellow-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)] p-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">Sign in as Mover</h1>
          <p className="text-sm text-gray-500 mb-6">Access your mover dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInMover;
