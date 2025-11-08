import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dedicated User Sign-In page (frontend only OTP simulation)
// Flow: Phone -> Send OTP -> OTP -> Verify -> navigate /user
// Static OTP for testing: 000000

const STATIC_OTP = '000000';

const SignInUser = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = (e) => {
    e?.preventDefault();
    setError('');
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const verifyOtp = (e) => {
    e?.preventDefault();
    setError('');
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (otp.trim() === STATIC_OTP) {
        navigate('/user');
      } else {
        setError('Invalid OTP. Try again.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-yellow-50/40 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.08)] border border-gray-200 p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mb-4">U</div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Sign in as User</h1>
          <p className="text-sm text-gray-500">Enter your phone number to receive an OTP</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={sendOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 555 123 4567"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Enter OTP</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition disabled:opacity-60"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                className="px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
              >
                Back
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">Use OTP <span className="font-mono">{STATIC_OTP}</span> for testing.</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInUser;
