import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920)',
          filter: 'blur(3px)',
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Trusted by 10,000+ Happy Customers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Move Anything,<br />
              <span className="text-primary">Anywhere,</span><br />
              <span className="text-primary">Anytime</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-100">
              Connect with professional, verified movers in your area. Get instant quotes from top-rated moving companies and make your relocation stress-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/quote">
                <Button className="text-lg">
                  Get Free Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Button variant="secondary" className="text-lg">
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <div className="text-gray-700 text-sm">Successful Moves</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-700 text-sm">Verified Movers</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">4.9★</div>
              <div className="text-gray-700 text-sm">Average Rating</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-700 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-gray-800">100% Verified</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          <span className="text-sm font-semibold text-gray-800">Fast Response</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-gray-800">Best Prices</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
