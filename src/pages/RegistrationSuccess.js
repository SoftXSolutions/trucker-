import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-yellow-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)] p-8 md:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-4xl shadow-lg">
                ✓
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Application Received!
            </h1>

            {/* Description */}
            <p className="text-center text-gray-600 mb-8">
              Your account registration has been submitted and is currently under review.
            </p>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start">
                <span className="text-blue-500 text-2xl mr-4">📋</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-800 text-lg mb-2">What happens next?</h3>
                  <p className="text-sm text-blue-700">
                    Our team will review your application within 24-48 hours. You'll receive a confirmation email with instructions to access your account.
                  </p>
                </div>
              </div>
            </div>
            {/* We intentionally do not display detailed registration fields on this page. */}

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition shadow-md"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
