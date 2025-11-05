const Chip = ({ children }) => (
  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{children}</span>
);

const QuoteRequestItem = ({ request }) => {
  return (
    <div className="bg-white rounded-xl border border-yellow-200 p-4 md:p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-gray-900">{request.moverName}</div>
          <div className="text-sm text-gray-600">{request.moveType}</div>
        </div>
        <Chip>New</Chip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <div className="text-gray-400">📍 From</div>
          <div className="text-gray-800">{request.from || '-'}</div>
        </div>
        <div>
          <div className="text-gray-400">📍 To</div>
          <div className="text-gray-800">{request.to || '-'}</div>
        </div>
        <div className="text-gray-400">📅 Requested: {request.date}</div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-200 text-sm font-semibold">View Details</button>
        <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold">Contact Mover</button>
      </div>
    </div>
  );
};

export default QuoteRequestItem;
