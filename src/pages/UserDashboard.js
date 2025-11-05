import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const getStoredRequests = () => {
  try {
    const arr = JSON.parse(localStorage.getItem('myRequests') || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const mockTruckers = [
  { 
    id: 'elite-moving', 
    name: 'Elite Moving Services', 
    rating: 4.8, 
    reviews: 5487, 
    location: 'San Francisco, CA', 
    distance: '1.2 miles away',
    plan: 'Premium',
    verified: true,
    responseTime: '< 30 min',
    yearsInBusiness: 18,
    totalMoves: 2430,
    estimatedPrice: '$750 - $1150'
  },
  { 
    id: 'swift-movers', 
    name: 'Swift Movers LLC', 
    rating: 4.6, 
    reviews: 3245, 
    location: 'Oakland, CA', 
    distance: '3.5 miles away',
    plan: 'Professional',
    verified: true,
    responseTime: '< 45 min',
    yearsInBusiness: 12,
    totalMoves: 1850,
    estimatedPrice: '$450 - $850'
  },
  { 
    id: 'family-first', 
    name: 'Family First Movers', 
    rating: 4.7, 
    reviews: 2156, 
    location: 'San Jose, CA', 
    distance: '8.3 miles away',
    plan: 'Professional',
    verified: true,
    responseTime: '< 1 hour',
    yearsInBusiness: 15,
    totalMoves: 1420,
    estimatedPrice: '$550 - $950'
  },
];

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('requests');
  const [requests, setRequests] = useState(getStoredRequests());

  useEffect(() => {
    setRequests(getStoredRequests());
    const onStorage = (e) => { if (e.key === 'myRequests') setRequests(getStoredRequests()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('tab');
    if (t === 'truckers' || t === 'requests') setTab(t);
  }, [location.search]);

  const setTabAndUrl = (t) => {
    setTab(t);
    const params = new URLSearchParams(location.search);
    params.set('tab', t);
    navigate({ pathname: '/user', search: params.toString() }, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-gray-800">User Dashboard</div>
              <div className="text-sm text-gray-500">Manage your quote requests and explore truckers</div>
            </div>
          </div>
          <div className="px-5 border-b">
            <div className="flex gap-6 overflow-x-auto">
              <button onClick={()=>setTabAndUrl('requests')} className={`py-3 border-b-2 -mb-px font-medium ${tab==='requests'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>My Requests</button>
              <button onClick={()=>setTabAndUrl('truckers')} className={`py-3 border-b-2 -mb-px font-medium ${tab==='truckers'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>Truckers</button>
            </div>
          </div>

          <div className="p-5">
            {tab==='requests' && (
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm"><div className="text-sm text-gray-600">Total Requests</div><div className="text-2xl font-bold">{requests.length}</div></div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"><div className="text-sm text-gray-600">Pending</div><div className="text-2xl font-bold">{requests.filter(r=>r.status!=='Completed').length}</div></div>
                  <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm"><div className="text-sm text-gray-600">Completed</div><div className="text-2xl font-bold">{requests.filter(r=>r.status==='Completed').length}</div></div>
                </div>

                {requests.length === 0 ? (
                  <div className="bg-white rounded-xl p-6 border text-center text-gray-600">No requests yet. Start by creating a <Link className="text-blue-600 hover:underline" to="/quote">new quote</Link>.</div>
                ) : (
                  <div className="space-y-3">
                    {requests.map(r => (
                      <div key={r.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="font-semibold text-gray-800">{r.id}</div>
                          <div className="text-sm text-gray-600">{r.date}</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {(r.from?.city || r.from?.zip || r.from?.address) ? `${[r.from?.address, r.from?.city, r.from?.zip].filter(Boolean).join(', ')}` : r.from}
                          {" → "}
                          {(r.to?.city || r.to?.zip || r.to?.address) ? `${[r.to?.address, r.to?.city, r.to?.zip].filter(Boolean).join(', ')}` : r.to}
                        </div>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          {r.category && <span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700 border border-purple-200">{r.category}</span>}
                          {r.moveType && <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">{r.moveType}</span>}
                          {r.property && <span className="px-2 py-0.5 rounded text-xs bg-gray-50 text-gray-700 border">{r.property}</span>}
                          <span className="ml-auto px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-700">{r.status || 'Submitted'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab==='truckers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTruckers.map(t => (
                  <Link to={`/truckers/${t.id}`} key={t.id} className="block bg-white rounded-xl p-5 border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1">
                    {/* Header with name and badges */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">{t.name}</h3>
                          {t.verified && (
                            <span className="text-green-500 text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{t.distance}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        t.plan === 'Premium' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {t.plan}
                      </span>
                    </div>

                    {/* Rating and reviews */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="font-semibold text-gray-900 text-sm">{t.rating}</span>
                      <span className="text-gray-500 text-xs">({t.reviews.toLocaleString()} reviews)</span>
                    </div>

                    {/* Quick stats */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-medium text-gray-900">{t.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-medium text-gray-900">{t.yearsInBusiness} years</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Total Moves</span>
                        <span className="font-medium text-gray-900">{t.totalMoves.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Estimated price */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Estimated</span>
                        <span className="font-bold text-gray-900 text-sm">{t.estimatedPrice}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
