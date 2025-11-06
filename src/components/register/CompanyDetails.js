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
    data.employeeCount &&
    data.googleMapsProfile &&
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
            <select
              value={data.state}
              onChange={(e) => updateData({ state: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
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

        {/* Google Maps Profile URL */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
            <span className="text-orange-500 mr-2">🗺️</span>
            Google Profile (Maps link)
          </label>
          <input
            type="url"
            placeholder="https://maps.google.com/?cid=..."
            value={data.googleMapsProfile}
            onChange={(e) => updateData({ googleMapsProfile: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Employee Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g., 12"
            value={data.employeeCount || ''}
            onChange={(e) => updateData({ employeeCount: e.target.value })}
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
