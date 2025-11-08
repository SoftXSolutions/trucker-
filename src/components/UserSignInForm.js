import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignInForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = (e) => {
    e?.preventDefault();
    setError('');
    const normalized = phone.trim();
    if (!normalized) {
      setError('Please enter your phone number');
      return;
    }
    // Simulate sending OTP
    setLoading(true);
    setTimeout(() => {
      const code = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
      setGeneratedOtp(code);
      setStep('otp');
      setLoading(false);
      // For development convenience, we console.log the code. In prod this would not be shown.
      console.log('Simulated OTP for', normalized, 'is', code);
    }, 700);
  };

  const verifyOtp = (e) => {
    e?.preventDefault();
    setError('');
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (generatedOtp && otp === generatedOtp) {
        // success: navigate to user dashboard
        navigate('/user');
      } else {
        setError('Invalid OTP. Try again.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mb-3">U</div>
          <h3 className="text-lg font-bold text-gray-800">Sign in as User</h3>
          <p className="text-sm text-gray-500">Enter your phone number to receive an OTP</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={sendOtp} className="space-y-4">
            <label className="block text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 555 123 4567"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="flex-1 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <label className="block text-sm text-gray-600">Enter OTP</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-orange-300"
            />

            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Back
              </button>
            </div>

            <p className="text-xs text-gray-400">Didn't receive the code? Try again to resend.</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSignInForm;
