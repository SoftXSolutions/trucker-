import React from 'react';
import Button from './Button';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Request a Quote',
      description: 'Fill out our simple form with your moving details in just 2 minutes.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      number: 2,
      title: 'Compare Movers',
      description: 'Receive quotes from verified movers and compare ratings, prices, and reviews.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
    },
    {
      number: 3,
      title: 'Book & Move',
      description: 'Select your preferred mover and schedule your move with confidence.',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">Get started with your move in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-500 h-full transform hover:-translate-y-3 hover:scale-105 group cursor-pointer">
                <div className="relative mb-6">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg group-hover:animate-bounce">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="text-lg">
            Start Your Move Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
