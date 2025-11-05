import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MoverCard from '../components/choose/MoverCard';

const sampleMovers = [
  { id: 1, name: 'Kasim Movers', premium: true, rating: 4.8, reviews: '5,487', distance: 1.2, moves: '2,430', tags: ['Residential', 'Commercial', 'Long Distance', 'Piano Moving'], response: '< 30 min', experience: '18 years', city: 'New York, NY', min: 750, max: 1150 },
  { id: 2, name: 'Elite Moving Services', premium: false, rating: 4.7, reviews: '2,189', distance: 2.1, moves: '1,250', tags: ['Residential', 'Long Distance', 'Piano Moving'], response: '< 1 hour', experience: '12 years', city: 'New York, NY', min: 800, max: 1200 },
  { id: 3, name: 'Swift Movers Co.', premium: false, rating: 4.7, reviews: '2,018', distance: 4.1, moves: '870', tags: ['Commercial', 'Storage'], response: '< 2 hours', experience: '8 years', city: 'Brooklyn, NY', min: 750, max: 1100 },
  { id: 4, name: 'Professional Relocation Experts', premium: false, rating: 4.6, reviews: '1,667', distance: 5.7, moves: '1,480', tags: ['Residential', 'Office Move', 'Packing'], response: '< 1 hour', experience: '15 years', city: 'Queens, NY', min: 700, max: 1000 },
  { id: 5, name: 'QuickMove Solutions', premium: false, rating: 4.6, reviews: '1,967', distance: 2.6, moves: '2,532', tags: ['Residential', 'Same Day', 'Small Moves'], response: '< 4 hours', experience: '10 years', city: 'Manhattan, NY', min: 650, max: 950 },
  { id: 6, name: 'Premium Transport & Moving', premium: true, rating: 4.9, reviews: '2,059', distance: 7.8, moves: '4,705', tags: ['Luxury Move', 'Art & Antiques', 'White Glove'], response: '< 2 hours', experience: '9 years', city: 'Bronx, NY', min: 900, max: 1400 },
];

const ChooseMovers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const count = selected.length;
  const btnDisabled = count === 0;
  const form = location.state?.form || {};
  const header = useMemo(() => ({
    moveType: form.moveCategory || 'Residential Move',
    from: form.fromAddress ? `${form.fromCity || ''}, ${form.fromAddress || ''}` : '.',
    to: form.toAddress ? `${form.toCity || ''}, ${form.toAddress || ''}` : '.',
  }), [form]);

  const sortedMovers = useMemo(() => {
    return [...sampleMovers].sort((a, b) => (Number(a.distance) || 0) - (Number(b.distance) || 0));
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-orange-500 text-white rounded-xl w-11 h-11 flex items-center justify-center shadow">🚚</div>
          </div>
          <h1 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-2">Choose Your Movers</h1>
          <p className="text-center text-gray-600 mb-6">We found professional movers in your area. Select the ones you'd like to receive quotes from.</p>

          <div className="bg-white border border-yellow-200 rounded-xl p-4 md:p-5 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-gray-500">Move Type</div>
                <div className="font-semibold text-gray-800">{header.moveType}</div>
              </div>
              <div>
                <div className="text-gray-500">From</div>
                <div className="font-semibold text-gray-800">{header.from}</div>
              </div>
              <div>
                <div className="text-gray-500">To</div>
                <div className="font-semibold text-gray-800">{header.to}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {sortedMovers.map((m) => (
              <MoverCard key={m.id} mover={m} selected={selected.includes(m.id)} onToggle={() => toggle(m.id)} />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="text-sm text-gray-600 flex items-center">{count === 0 ? 'Select at least one mover' : `${count} selected`}</div>
            <button
              disabled={btnDisabled}
              onClick={() => {
                if (btnDisabled) return;
                const selectedMovers = sortedMovers.filter((m) => selected.includes(m.id));
                navigate('/quote-success', { state: { form, selectedCount: count, movers: selectedMovers } });
              }}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request Quotes ({count})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMovers;
