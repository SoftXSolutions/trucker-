import React from 'react';

const CompanyDetails = ({ data, updateData, onNext, onPrev }) => {
  const isFormValid = 
    data.companyName &&
    data.website &&
    data.businessAddress &&
    data.city &&
    data.state &&
    data.zipCode &&
    data.yearsInBusiness &&
    data.insurancePolicy &&
    data.businessLicense &&
    data.description;

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">🏢</span>
            Company Name
          </label>
          <input
            type="text"
            placeholder="ABC Moving Company"
            value={data.companyName}
            onChange={(e) => updateData({ companyName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Website */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">🌐</span>
            Website
          </label>
          <input
            type="url"
            placeholder="https://www.yourcompany.com"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Business Address */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">📍</span>
            Business Address
          </label>
          <input
            type="text"
            placeholder="123 Main Street"
            value={data.businessAddress}
            onChange={(e) => updateData({ businessAddress: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="New York"
              value={data.city}
              onChange={(e) => updateData({ city: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              State
            </label>
            <input
              type="text"
              placeholder="NY"
              value={data.state}
              onChange={(e) => updateData({ state: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* ZIP Code & Years in Business */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              placeholder="10001"
              value={data.zipCode}
              onChange={(e) => updateData({ zipCode: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Years in Business
            </label>
            <input
              type="number"
              placeholder="5"
              min="0"
              value={data.yearsInBusiness}
              onChange={(e) => updateData({ yearsInBusiness: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Insurance Policy Number */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">🛡️</span>
            Insurance Policy Number
          </label>
          <input
            type="text"
            placeholder="INS-123456789"
            value={data.insurancePolicy}
            onChange={(e) => updateData({ insurancePolicy: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Business License Number */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">📋</span>
            Business License Number
          </label>
          <input
            type="text"
            placeholder="BL-987654321"
            value={data.businessLicense}
            onChange={(e) => updateData({ businessLicense: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Company Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Description
          </label>
          <textarea
            placeholder="Tell us about your moving services, specialties, and what makes your company unique..."
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition resize-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <button
          onClick={onPrev}
          className="w-full bg-white text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Complete Registration
        </button>
      </div>
    </div>
  );
};

export default CompanyDetails;
