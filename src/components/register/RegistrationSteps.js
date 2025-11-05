import React from 'react';

const RegistrationSteps = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-medium ${
                  index <= currentStep ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  Step {index + 1}
                </div>
                <div className={`text-xs mt-1 max-w-20 ${
                  index <= currentStep ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">
          {steps[currentStep].percent}% Complete
        </div>
        <div className="text-lg font-semibold text-gray-800">
          {steps[currentStep].title}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSteps;