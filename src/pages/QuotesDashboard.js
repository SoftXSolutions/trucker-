import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RequestStatCard from '../components/choose/RequestStatCard';
import QuoteRequestItem from '../components/choose/QuoteRequestItem';

const STORAGE_KEY = 'mma_quote_requests_v1';

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};
const save = (items) => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); };

const QuotesDashboard = () => {
  const { state } = useLocation();
  const incoming = state?.newRequests || [];
  const [items, setItems] = useState(() => load());

  useEffect(() => {
    if (incoming.length) {
      const next = [...incoming, ...items];
      setItems(next);
      save(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incoming.length]);

  const stats = useMemo(() => ({
    total: items.length,
    pending: items.filter((i) => i.status === 'New').length,
    completed: items.filter((i) => i.status === 'Completed').length,
  }), [items]);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-orange-500 text-white rounded-lg w-8 h-8 flex items-center justify-center">📄</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Quote Requests</h1>
              <p className="text-sm text-gray-600 -mt-0.5">Track your moving quotes and mover responses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
            <RequestStatCard title="Total Requests" value={stats.total} icon={<span>✉️</span>} highlight />
            <RequestStatCard title="Pending" value={stats.pending} icon={<span>⏳</span>} />
            <RequestStatCard title="Completed" value={stats.completed} icon={<span>✅</span>} />
          </div>

          <div className="space-y-4">
            {items.map((req, idx) => (
              <QuoteRequestItem key={idx} request={req} />
            ))}
            {items.length === 0 && (
              <div className="bg-white border border-yellow-200 rounded-xl p-6 text-center text-gray-600">
                No requests yet. Go to Get a Quote to start a new request.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesDashboard;
