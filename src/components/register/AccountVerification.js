import React, { useState } from 'react';

// This component now only collects email & phone.
// It provides two buttons: Continue (go to next step) and Send Verification Code (prepares user for OTP step).
// Actual OTP entry will occur on the later OTP step using static code 000000.
const AccountVerification = ({ data, updateData, onNext }) => {
  const isFormValid = data.email && data.phone;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Verification</h2>
        <p className="text-sm text-gray-600">
          Enter your email and phone number. You can continue now; we will verify both with OTP at the end.
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
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
