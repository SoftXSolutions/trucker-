import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountVerification from '../components/register/AccountVerification';
import CompanyDetails from '../components/register/CompanyDetails';

const RegisterMover = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    verificationCode: '',
    isVerified: false,
    companyName: '',
    website: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',
    yearsInBusiness: '',
    employeeCount: '',
    googleMapsProfile: '',
    description: ''
  });

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(0);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    navigate('/registration-success', { state: { formData } });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-orange-500 text-white rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              🚚
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Register as Moving Company
            </h1>
            <p className="text-gray-600">
              Step {currentStep + 1} of 2: {currentStep === 0 ? 'Account Information' : 'Business Information'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-yellow-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)] p-6 md:p-8">
            {currentStep === 0 ? (
              <AccountVerification
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
              />
            ) : (
              <CompanyDetails
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMover;
