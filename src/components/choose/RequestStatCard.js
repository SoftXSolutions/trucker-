const RequestStatCard = ({ title, value, icon, highlight = false }) => {
  return (
    <div className={`rounded-xl border px-4 py-3 md:px-5 md:py-4 ${highlight ? 'border-yellow-300 bg-yellow-50/70' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${highlight ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{icon}</div>
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="text-lg font-bold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatCard;
