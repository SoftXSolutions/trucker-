import React from 'react';

const ServiceAreas = ({ data, updateData, onNext, onPrev }) => {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const specialtyOptions = [
    { id: 'residential', label: 'Residential Moving', icon: '🏠' },
    { id: 'commercial', label: 'Commercial Moving', icon: '🏢' },
    { id: 'long-distance', label: 'Long Distance', icon: '🛣️' },
    { id: 'local', label: 'Local Moving', icon: '🚚' },
    { id: 'packing', label: 'Packing Services', icon: '📦' },
    { id: 'storage', label: 'Storage Solutions', icon: '🏪' },
    { id: 'piano', label: 'Piano Moving', icon: '🎹' },
    { id: 'vehicle', label: 'Vehicle Transport', icon: '🚗' },
    { id: 'international', label: 'International', icon: '✈️' },
    { id: 'senior', label: 'Senior Moving', icon: '👴' }
  ];

  const toggleState = (state) => {
    const current = data.serviceStates || [];
    if (current.includes(state)) {
      updateData({ serviceStates: current.filter(s => s !== state) });
    } else {
      updateData({ serviceStates: [...current, state] });
    }
  };

  const toggleSpecialty = (specialty) => {
    const current = data.specialties || [];
    if (current.includes(specialty)) {
      updateData({ specialties: current.filter(s => s !== specialty) });
    } else {
      updateData({ specialties: [...current, specialty] });
    }
  };

  const isFormValid = 
    (data.serviceStates && data.serviceStates.length > 0) &&
    data.serviceRadius &&
    (data.specialties && data.specialties.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Service Areas</h2>
        <p className="text-sm text-gray-600">
          Define where you provide moving services
        </p>
      </div>

      <div className="space-y-6">
        {/* Service States */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Service States <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {states.map(state => (
                <label
                  key={state}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                >
                  <input
                    type="checkbox"
                    checked={(data.serviceStates || []).includes(state)}
                    onChange={() => toggleState(state)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-300"
                  />
                  <span className="text-sm text-gray-700">{state}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {(data.serviceStates || []).length} state(s) selected
          </div>
        </div>

        {/* Service Radius */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Radius <span className="text-red-500">*</span>
          </label>
          <select
            value={data.serviceRadius}
            onChange={(e) => updateData({ serviceRadius: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition bg-white"
          >
            <option value="">Select radius</option>
            <option value="25">Within 25 miles</option>
            <option value="50">Within 50 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="200">Within 200 miles</option>
            <option value="statewide">Statewide</option>
            <option value="nationwide">Nationwide</option>
          </select>
        </div>

        {/* Specialties */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Service Specialties <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specialtyOptions.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSpecialty(option.id)}
                className={`flex items-center p-4 border-2 rounded-lg transition ${
                  (data.specialties || []).includes(option.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl mr-3">{option.icon}</span>
                <span className={`text-sm font-medium ${
                  (data.specialties || []).includes(option.id)
                    ? 'text-orange-700'
                    : 'text-gray-700'
                }`}>
                  {option.label}
                </span>
                {(data.specialties || []).includes(option.id) && (
                  <svg className="w-5 h-5 ml-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {(data.specialties || []).length} specialt{(data.specialties || []).length === 1 ? 'y' : 'ies'} selected
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

export default ServiceAreas;
