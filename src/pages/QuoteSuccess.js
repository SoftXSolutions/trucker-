import { useLocation, useNavigate } from 'react-router-dom';

const Row = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">{icon}</div>
    <div className="text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-800 break-all">{value || '-'}</div>
    </div>
  </div>
);

const QuoteSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = state?.form || {};
  const selectedCount = state?.selectedCount || 0;

  const from = form.fromAddress ? `${form.fromAddress}${form.fromCity ? ', ' + form.fromCity : ''}` : '';
  const to = form.toAddress ? `${form.toAddress}${form.toCity ? ', ' + form.toCity : ''}` : '';

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-yellow-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] p-6 md:p-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl shadow">✓</div>
          </div>
          <h1 className="text-center text-xl md:text-2xl font-bold text-gray-900">Quote Request Sent Successfully!</h1>
          <p className="text-center text-gray-600 mt-2 mb-6">Your quote request has been sent to {selectedCount || 2} professional movers in your area.</p>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 mt-0.5">ℹ️</div>
              <div>
                <div className="font-semibold text-blue-800 text-sm">What happens next?</div>
                <div className="text-sm text-blue-700">Selected movers will review your request and send you personalized quotes within 24–48 hours. You'll receive notifications via email and SMS.</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4 md:p-5 mb-6">
            <div className="font-semibold text-gray-800 mb-4">Request Summary</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Row icon={<span>📍</span>} label="Moving From" value={from} />
              <Row icon={<span>📍</span>} label="Moving To" value={to} />
              <Row icon={<span>✉️</span>} label="Email" value={form.email} />
              <Row icon={<span>📞</span>} label="Phone" value={form.phone} />
              <Row icon={<span>🚚</span>} label="Move Type" value={form.moveCategory || 'Residential Move'} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg py-2.5 font-semibold"
              onClick={() => {
                const dateStr = new Date().toLocaleDateString();
                const from = form.fromAddress ? `${form.fromAddress}${form.fromCity ? ', ' + form.fromCity : ''}` : '';
                const to = form.toAddress ? `${form.toAddress}${form.toCity ? ', ' + form.toCity : ''}` : '';
                const movers = (state?.movers || []).map((m) => ({
                  moverName: m.name,
                  moveType: form.moveCategory || 'Residential Move',
                  from,
                  to,
                  date: dateStr,
                  status: 'New',
                }));
                navigate('/quotes', { state: { newRequests: movers } });
              }}
            >
              View My Quotes Dashboard
            </button>
            <button
              className="w-full border border-gray-300 text-gray-700 rounded-lg py-2.5 font-semibold"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-5">
            Need help? Contact our support team at <a className="text-orange-600" href="mailto:support@mymoveadvisor.com">support@mymoveadvisor.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSuccess;
