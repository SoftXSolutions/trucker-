import React, { useState } from 'react';

const AccountVerification = ({ data, updateData, onNext }) => {
  const [codeSent, setCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = () => {
    if (data.email && data.phone) {
      setCodeSent(true);
      // Simulate sending code
      console.log('Verification code sent to:', data.email, data.phone);
    }
  };

  const handleVerify = () => {
    if (data.verificationCode) {
      setIsVerifying(true);
      // Simulate verification
      setTimeout(() => {
        updateData({ isVerified: true });
        setIsVerifying(false);
        onNext();
      }, 1000);
    }
  };

  const isFormValid = data.email && data.phone;
  const canVerify = codeSent && data.verificationCode && data.verificationCode.length === 6;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Verification</h2>
        <p className="text-sm text-gray-600">
          Enter your email and phone number to receive a verification code
        </p>
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <span className="text-orange-500 mr-2">📧</span>
            Email Address
          </label>
          <input
            type="email"
            placeholder="company@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
            disabled={codeSent}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <span className="text-orange-500 mr-2">📞</span>
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
            disabled={codeSent}
          />
        </div>

        {/* Send Code Button */}
        {!codeSent && (
          <button
            onClick={handleSendCode}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Send Verification Code
          </button>
        )}

        {/* Verification Code Input */}
        {codeSent && (
          <div className="pt-4 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <span className="text-blue-500 text-xl mr-3">ℹ️</span>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Verification code sent!</p>
                  <p>Check your email and phone for the 6-digit code.</p>
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
            </label>
            <input
              type="text"
              placeholder="000000"
              maxLength="6"
              value={data.verificationCode}
              onChange={(e) => updateData({ verificationCode: e.target.value.replace(/\D/g, '') })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-center text-2xl tracking-widest font-semibold"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setCodeSent(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Change Info
              </button>
              <button
                onClick={handleVerify}
                disabled={!canVerify || isVerifying}
                className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountVerification;
