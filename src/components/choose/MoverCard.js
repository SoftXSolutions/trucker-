const Badge = ({ children, color = 'gray' }) => (
  <span className={`text-xs px-2 py-0.5 rounded-full border ${
    color === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
    color === 'orange' ? 'bg-orange-50 text-orange-700 border-orange-200' :
    'bg-gray-50 text-gray-700 border-gray-200'
  }`}>{children}</span>
);

const Pill = ({ children }) => (
  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{children}</span>
);

const MoverCard = ({ mover, selected, onToggle }) => {
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 md:p-5 transition ${selected ? 'border-orange-300 ring-2 ring-orange-200' : 'border-yellow-200'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <input type="checkbox" checked={selected} onChange={onToggle} className="mt-1.5 w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-400" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold text-gray-900">{mover.name}</div>
              {mover.premium && <Badge color="orange">Premium</Badge>}
              <Badge color="green">Verified</Badge>
            </div>
            <div className="text-sm text-gray-600 mt-1 flex items-center gap-2 flex-wrap">
              <span>⭐ {mover.rating} ({mover.reviews} reviews)</span>
              <span>•</span>
              <span>📍 {mover.distance} miles away</span>
              <span>•</span>
              <span>📦 {mover.moves} moves</span>
            </div>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {mover.tags.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-4 flex-wrap">
              <span>⚡ Response: {mover.response}</span>
              <span>🏆 {mover.experience} in business</span>
              <span>📍 {mover.city}</span>
            </div>
          </div>
        </div>
        <div className="text-right min-w-[120px]">
          <div className="text-xs text-gray-500">Estimated</div>
          <div className="text-lg font-bold text-gray-900">${mover.min} - ${mover.max}</div>
        </div>
      </div>
    </div>
  );
};

export default MoverCard;
