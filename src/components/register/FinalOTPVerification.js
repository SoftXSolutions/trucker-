import React, { useState, useEffect } from 'react';

// Collects email & phone from previous steps; verifies both with static OTP 000000 then calls onVerified.
const FinalOTPVerification = ({ data, onVerified, onBack }) => {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [sent, setSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const STATIC_CODE = '000000';

  const sendCodes = () => {
    if (!data.email || !data.phone) return;
    setSent(true);
    console.log('Dev static OTP is 000000 for both email and phone');
  };

  // auto-send codes when component mounts if email & phone are present so the Verify button is usable
  useEffect(() => {
    if (data.email && data.phone) {
      sendCodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // allow verification once both codes are entered; auto-send will usually set `sent` true on mount
  const canVerify = emailCode.length === 6 && phoneCode.length === 6;

  const handleVerify = () => {
    if (!canVerify) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (emailCode === STATIC_CODE && phoneCode === STATIC_CODE) {
        onVerified();
      } else {
        alert('Invalid codes. Use 000000 for both during development.');
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-sm text-gray-600">Enter the 6-digit codes sent to your email and phone. (Dev code is 000000.)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Email</h3>
            <div className="text-xs text-gray-500 break-all">{data.email || 'No email'}</div>
            <input
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-center tracking-widest font-semibold"
            />
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-gray-800">Phone</h3>
            <div className="text-xs text-gray-500 break-all">{data.phone || 'No phone'}</div>
            <input
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-center tracking-widest font-semibold"
            />
        </div>
      </div>

      {!sent && (
        <button
          onClick={sendCodes}
          disabled={!data.email || !data.phone}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Send Codes
        </button>
      )}
      {sent && (
        <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">Codes sent. Use 000000 for both fields.</div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">← Back</button>
        <button
          onClick={handleVerify}
          disabled={!canVerify || verifying}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {verifying ? 'Verifying…' : 'Verify & Submit'}
        </button>
      </div>
    </div>
  );
};

export default FinalOTPVerification;
