import React from 'react';

const ReviewSubmit = ({ data, updateData, onSubmit, onPrev }) => {
  const canSubmit = data.agreedToTerms;

  const specialtyLabels = {
    'residential': 'Residential Moving',
    'commercial': 'Commercial Moving',
    'long-distance': 'Long Distance',
    'local': 'Local Moving',
    'packing': 'Packing Services',
    'storage': 'Storage Solutions',
    'piano': 'Piano Moving',
    'vehicle': 'Vehicle Transport',
    'international': 'International',
    'senior': 'Senior Moving'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Review & Submit</h2>
        <p className="text-sm text-gray-600">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        {/* Account Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-orange-500 mr-2">📧</span>
            Account Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-800">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-800">{data.phone}</span>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-orange-500 mr-2">🏢</span>
            Company Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Company Name:</span>
              <span className="font-medium text-gray-800">{data.companyName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Business Type:</span>
              <span className="font-medium text-gray-800">{data.businessType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Years in Business:</span>
              <span className="font-medium text-gray-800">{data.yearsInBusiness} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employees:</span>
              <span className="font-medium text-gray-800">{data.employeeCount}</span>
            </div>
            {data.website && (
              <div className="flex justify-between">
                <span className="text-gray-600">Website:</span>
                <span className="font-medium text-gray-800 truncate ml-2">{data.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-orange-500 mr-2">📍</span>
            Service Areas
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600 block mb-1">States:</span>
              <div className="flex flex-wrap gap-1">
                {(data.serviceStates || []).slice(0, 5).map(state => (
                  <span key={state} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                    {state}
                  </span>
                ))}
                {(data.serviceStates || []).length > 5 && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                    +{(data.serviceStates || []).length - 5} more
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Radius:</span>
              <span className="font-medium text-gray-800">{data.serviceRadius}</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">Specialties:</span>
              <div className="flex flex-wrap gap-1">
                {(data.specialties || []).map(specialty => (
                  <span key={specialty} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {specialtyLabels[specialty]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-orange-500 mr-2">📄</span>
            Documentation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Business License:</span>
              <span className="flex items-center text-green-600 font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Uploaded
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Insurance Certificate:</span>
              <span className="flex items-center text-green-600 font-medium">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Uploaded
              </span>
            </div>
            {data.bonding && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bonding Certificate:</span>
                <span className="flex items-center text-green-600 font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Uploaded
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={data.agreedToTerms}
              onChange={(e) => updateData({ agreedToTerms: e.target.checked })}
              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-300 mt-0.5"
            />
            <span className="ml-3 text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms" className="text-orange-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
              . I confirm that all information provided is accurate and I have the authority to register this business.
            </span>
          </label>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-green-500 text-xl mr-3">✓</span>
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">What happens next?</p>
              <p className="text-xs">
                Our team will review your application within 24-48 hours. You'll receive an email notification once your account is approved. After approval, you can start receiving quote requests from customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
