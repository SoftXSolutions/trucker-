import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const TopMovers = () => {
  const navigate = useNavigate();
  
  const movers = [
    {
      name: 'Karim Movers',
      rating: 5,
      reviews: 487,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      tags: ['Residential', 'Commercial', 'Long Distance'],
      experience: 18,
      completed: 2340,
      response: '< 30 min',
      featured: true,
    },
    {
      name: 'Elite Moving Services',
      rating: 4.9,
      reviews: 1342,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
      tags: ['Residential', 'Packing', 'Storage'],
      experience: 12,
      completed: 1250,
      response: '< 1 hour',
      featured: true,
    },
    {
      name: 'Swift Movers Co.',
      rating: 4.7,
      reviews: 218,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      tags: ['Residential', 'Commercial', 'Same Day'],
      experience: 8,
      completed: 830,
      response: '< 2 hours',
      featured: true,
    },
    {
      name: 'Professional Relocation',
      rating: 4.8,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      tags: ['Office Moves', 'Packing', 'International'],
      experience: 15,
      completed: 1680,
      response: '< 3 hours',
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Rated Moving Companies</h2>
          <p className="text-gray-600 text-lg">Connect with verified, professional movers trusted by thousands of customers</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {movers.map((mover, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 hover:scale-[1.02] group flex flex-col"
              style={{
                perspective: '1000px',
              }}
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img 
                  src={mover.image} 
                  alt={mover.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {mover.featured && (
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg animate-pulse">
                      Featured
                    </span>
                  )}
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center shadow-lg">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{mover.name}</h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-primary font-bold mr-1">{mover.rating}</span>
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({mover.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
                  {mover.tags.map((tag, i) => (
                    <span key={i} className="bg-orange-100 text-primary text-xs px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 cursor-default h-fit">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600 flex-grow">
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-semibold">{mover.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-semibold">{mover.completed} moves</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span className="font-semibold text-green-600">{mover.response}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-auto"
                  onClick={() => navigate('/quote')}
                >
                  Get Quote
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
        
          <Button variant="outline" className="text-lg"
          onClick={()=>navigate('/quote')}
          >
            View All Movers
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        
        </div>
      </div>
    </section>
  );
};

export default TopMovers;
