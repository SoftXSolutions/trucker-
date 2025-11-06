import { Link, useParams } from 'react-router-dom';

const DATA = {
  'elite-moving': {
    id: 'elite-moving',
    name: 'Elite Moving Services',
    rating: 4.8,
    reviews: 5487,
    location: 'San Francisco, CA',
    distance: '1.2 miles away',
    totalMoves: 2430,
    yearsInBusiness: 18,
    responseTime: '< 30 min',
    plan: 'Premium',
    verified: true,
    estimatedPrice: '$750 - $1150',
    about: 'Elite Moving Services is a premium full-service moving company with over 18 years of experience. We specialize in residential, commercial, and long-distance moves with a focus on customer satisfaction and care. Our team of professional movers is fully trained, insured, and equipped to handle moves of any size.',
    services: ['Residential', 'Commercial', 'Long Distance', 'Piano Moving', 'Packing Services', 'Storage Solutions', 'Insurance Coverage'],
    specialties: ['White Glove Service', 'Antique Handling', 'Art & Fragile Items', 'Corporate Relocation'],
    contact: {
      phone: '+1 (555) 234-5678',
      email: 'contact@elitemoving.com',
      website: 'https://www.elitemoving.com'
    },
    businessInfo: {
      license: 'BL-CA-2023-45678',
      insurance: 'INS-987654321',
      dot: 'DOT-123456',
      mc: 'MC-789012'
    }
  },
  'swift-movers': {
    id: 'swift-movers',
    name: 'Swift Movers LLC',
    rating: 4.6,
    reviews: 3245,
    location: 'Oakland, CA',
    distance: '3.5 miles away',
    totalMoves: 1850,
    yearsInBusiness: 12,
    responseTime: '< 45 min',
    plan: 'Professional',
    verified: true,
    estimatedPrice: '$450 - $850',
    about: 'Swift Movers LLC provides fast and reliable moving services for local and long-distance relocations. We pride ourselves on transparent pricing, punctuality, and professional service. Our experienced team ensures your belongings are handled with care from start to finish.',
    services: ['Local Moves', 'Long Distance', 'Packing', 'Boxes & Supplies', 'Furniture Assembly', 'Loading/Unloading'],
    specialties: ['Same-Day Service', 'Student Moves', 'Senior Moving', 'Small Moves'],
    contact: {
      phone: '+1 (555) 345-6789',
      email: 'info@swiftmovers.com',
      website: 'https://www.swiftmovers.com'
    },
    businessInfo: {
      license: 'BL-CA-2024-12345',
      insurance: 'INS-123456789',
      dot: 'DOT-234567',
      mc: 'MC-890123'
    }
  },
  'family-first': {
    id: 'family-first',
    name: 'Family First Movers',
    rating: 4.7,
    reviews: 2156,
    location: 'San Jose, CA',
    distance: '8.3 miles away',
    totalMoves: 1420,
    yearsInBusiness: 15,
    responseTime: '< 1 hour',
    plan: 'Professional',
    verified: true,
    estimatedPrice: '$550 - $950',
    about: 'Family First Movers is a family-owned and operated business that has been serving the Bay Area for over 15 years. We treat every move as if it were our own family\'s belongings. Our personalized approach and attention to detail set us apart from larger corporate movers.',
    services: ['Apartment Moves', 'House Moves', 'Packing', 'Storage', 'Local Moving', 'Interstate Moving'],
    specialties: ['Family-Owned', 'Personalized Service', 'Flexible Scheduling', 'Pet-Friendly Moves'],
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'support@familyfirstmovers.com',
      website: 'https://www.familyfirstmovers.com'
    },
    businessInfo: {
      license: 'BL-CA-2023-54321',
      insurance: 'INS-789123456',
      dot: 'DOT-345678',
      mc: 'MC-901234'
    }
  },
};

const TruckerProfile = () => {
  const { id } = useParams();
  const t = DATA[id];

  if (!t) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border p-8 text-center">
          <div className="text-xl font-bold mb-2">Mover not found</div>
          <Link to="/user?tab=truckers" className="text-blue-600">Back to Movers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto mb-4">
          <Link to="/user?tab=truckers" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Movers
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)] overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              {/* Company Name & Badges */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.name}</h1>
                    {t.verified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                        Verified
                      </span>
                    )}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                      t.plan === 'Premium' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      {t.plan}
                    </span>
                  </div>
                  
                  {/* Rating & Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-lg">★</span>
                      <span className="font-semibold text-gray-900">{t.rating}</span>
                      <span className="text-gray-500">({t.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{t.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span>{t.totalMoves.toLocaleString()} moves</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Price */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Estimated</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{t.estimatedPrice}</div>
                </div>
              </div>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {t.services.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                    {s}
                  </span>
                ))}
              </div>

              {/* Quick Info Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⚡</span>
                  <span className="text-gray-600">Response: {t.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🏆</span>
                  <span className="text-gray-600">{t.yearsInBusiness} years in business</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">📍</span>
                  <span className="text-gray-600">{t.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">About This Company</h2>
                <p className="text-gray-700 leading-relaxed">{t.about}</p>
              </div>

              {/* Services Section */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h2>
                <div className="grid grid-cols-2 gap-3">
                  {t.services.map((service, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties Section */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {t.specialties.map((specialty, i) => (
                    <span key={i} className="px-4 py-2 bg-orange-50 text-orange-700 text-sm font-medium rounded-lg border border-orange-200">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Business Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Business License</div>
                    <div className="text-sm font-medium text-gray-900">{t.businessInfo.license}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Insurance Number</div>
                    <div className="text-sm font-medium text-gray-900">{t.businessInfo.insurance}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">DOT Number</div>
                    <div className="text-sm font-medium text-gray-900">{t.businessInfo.dot}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">MC Number</div>
                    <div className="text-sm font-medium text-gray-900">{t.businessInfo.mc}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Actions */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sticky top-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                    <a href={`tel:${t.contact.phone}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      {t.contact.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <a href={`mailto:${t.contact.email}`} className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all">
                      {t.contact.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Website</div>
                    <a href={t.contact.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700 break-all">
                      {t.contact.website.replace('https://', '')}
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/quote" 
                    className="block w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-center transition shadow-md hover:shadow-lg"
                  >
                    Request a Quote
                  </Link>
                  <a 
                    href={`tel:${t.contact.phone}`}
                    className="block w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-center transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </a>
                  <button className="block w-full px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-center transition border border-gray-300">
                    Save to Favorites
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Company Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Moves</span>
                    <span className="text-sm font-bold text-gray-900">{t.totalMoves.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="text-sm font-bold text-gray-900">{t.rating} ★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="text-sm font-bold text-gray-900">{t.reviews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Experience</span>
                    <span className="text-sm font-bold text-gray-900">{t.yearsInBusiness} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-bold text-gray-900">{t.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckerProfile;
