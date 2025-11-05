const FieldSelector = ({ fields, selectedFields, onFieldToggle, onSelectAll }) => {
  const allSelected = Object.values(selectedFields).every(v => v);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Select Fields
        </label>
        <button
          onClick={onSelectAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-lg">
        {fields.map(field => (
          <label key={field.key} className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={selectedFields[field.key]}
              onChange={() => onFieldToggle(field.key)}
              className="mr-2 rounded"
            />
            {field.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FieldSelector;
