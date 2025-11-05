const BulkActions = ({ selectedCount, onActivate, onSuspend, onDelete }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          {selectedCount} selected
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onActivate}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Activate
        </button>
        <button
          onClick={onSuspend}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition"
        >
          Suspend
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
