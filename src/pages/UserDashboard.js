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

// Lightweight lookup for mover details used in the View Movers modal and profile
const MOVERS_INFO = {
  'Premier Moving Co.': { rating: 4.8, reviews: 2100, location: 'San Francisco, CA', plan: 'Premium', phone: '+1 (415) 555-1020', email: 'hello@premiermoving.com', website: 'https://premiermoving.com' },
  'Swift Movers LLC': { rating: 4.6, reviews: 1800, location: 'Oakland, CA', plan: 'Professional', phone: '+1 (510) 555-2211', email: 'contact@swiftmovers.com', website: 'https://swiftmovers.com' },
  'Elite Moving Services': { rating: 4.9, reviews: 3200, location: 'San Jose, CA', plan: 'Premium', phone: '+1 (408) 555-8744', email: 'team@elitemoving.com', website: 'https://elitemoving.com' },
  'Family First Movers': { rating: 4.7, reviews: 1400, location: 'San Mateo, CA', plan: 'Professional', phone: '+1 (650) 555-9900', email: 'support@familyfirstmovers.com', website: 'https://familyfirstmovers.com' },
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
  const [showMovers, setShowMovers] = useState(false);
  const [moversFor, setMoversFor] = useState(null);

  useEffect(() => {
    setRequests(getStoredRequests());
    const onStorage = (e) => { if (e.key === 'myRequests') setRequests(getStoredRequests()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get('tab');
    if (t === 'requests') setTab(t);
  }, [location.search]);

  const setTabAndUrl = (t) => {
    setTab(t);
    const params = new URLSearchParams(location.search);
    params.set('tab', t);
    navigate({ pathname: '/user', search: params.toString() }, { replace: true });
  };

  return (
    <>
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-gray-800">User Dashboard</div>
              <div className="text-sm text-gray-500">Manage your quote requests and explore movers</div>
            </div>
          </div>
          <div className="px-5 border-b">
            <div className="flex gap-6 overflow-x-auto">
              <button onClick={()=>setTabAndUrl('requests')} className={`py-3 border-b-2 -mb-px font-medium ${tab==='requests'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>My Requests</button>
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
                          {/* Removed status badge per requirements */}
                          <span className="ml-auto" />
                          {Array.isArray(r.assignedMovers) && r.assignedMovers.length>0 && (
                            <button onClick={()=>{setMoversFor(r); setShowMovers(true);}} className="px-3 py-1 text-xs rounded-md border border-gray-300 hover:bg-gray-50">View Movers</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {showMovers && moversFor && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => { setShowMovers(false); }} />
        <div className="relative bg-white rounded-xl w-[92%] max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200" onClick={(e)=>e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="text-lg font-bold text-gray-800">Selected Movers for {moversFor.id}</h3>
            <button onClick={() => setShowMovers(false)} className="p-2 rounded hover:bg-gray-100">✕</button>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {moversFor.assignedMovers.map((m,i)=> {
                const info = MOVERS_INFO[m] || {};
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); setShowMovers(false); navigate(`/movers/${encodeURIComponent(m)}`); }}
                    className="w-full text-left cursor-pointer"
                  >
                    <div className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="font-medium text-gray-800">{m}</div>
                      <div className="mt-1 text-xs text-gray-600 flex items-center gap-2 flex-wrap">
                        <span className="text-yellow-500">★</span>
                        <span>{info.rating ?? '—'}</span>
                        {info.reviews ? (<><span className="text-gray-400">•</span><span>{info.reviews.toLocaleString()} reviews</span></>) : null}
                        {info.location ? (<><span className="text-gray-400">•</span><span>{info.location}</span></>) : null}
                        {info.plan ? (
                          <span className={`ml-auto px-2 py-0.5 rounded text-[10px] border ${info.plan==='Premium'?'bg-purple-50 text-purple-700 border-purple-200':'bg-blue-50 text-blue-700 border-blue-200'}`}>{info.plan}</span>
                        ) : null}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Assigned by admin</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {(!moversFor.assignedMovers || moversFor.assignedMovers.length===0) && (
              <div className="text-sm text-gray-600">No movers assigned yet.</div>
            )}
          </div>
          <div className="px-5 py-4 border-t bg-gray-50 flex justify-end">
            <button onClick={() => setShowMovers(false)} className="px-4 py-2 rounded-lg border">Close</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default UserDashboard;
