import React from 'react';

const Documentation = ({ data, updateData, onNext, onPrev }) => {
  const handleFileChange = (field, file) => {
    if (file) {
      updateData({ [field]: file });
    }
  };

  const isFormValid = data.businessLicense && data.insurance;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Documentation</h2>
        <p className="text-sm text-gray-600">
          Upload required documents to verify your business
        </p>
      </div>

      <div className="space-y-5">
        {/* Business License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business License <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition">
            <input
              type="file"
              id="businessLicense"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('businessLicense', e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="businessLicense"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {data.businessLicense ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 mb-1">
                    ✓ {data.businessLicense.name}
                  </p>
                  <p className="text-xs text-gray-500">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload business license
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Insurance Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Certificate <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition">
            <input
              type="file"
              id="insurance"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('insurance', e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="insurance"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {data.insurance ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 mb-1">
                    ✓ {data.insurance.name}
                  </p>
                  <p className="text-xs text-gray-500">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload insurance certificate
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Bonding Certificate (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bonding Certificate (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition">
            <input
              type="file"
              id="bonding"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange('bonding', e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="bonding"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {data.bonding ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600 mb-1">
                    ✓ {data.bonding.name}
                  </p>
                  <p className="text-xs text-gray-500">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload bonding certificate
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG, or PNG (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <span className="text-blue-500 text-xl mr-3">ℹ️</span>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Document Requirements</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>All documents must be current and valid</li>
                <li>Files should be clear and readable</li>
                <li>Accepted formats: PDF, JPG, PNG</li>
                <li>Maximum file size: 10MB per document</li>
              </ul>
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
          onClick={onNext}
          disabled={!isFormValid}
          className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Documentation;
