const FormatSelector = ({ selectedFormat, onFormatChange }) => {
  const formats = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Comma-separated',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'excel',
      name: 'Excel',
      description: 'Spreadsheet',
      icon: (
        <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Data format',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Print format',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Export Format
      </label>
      <div className="grid grid-cols-2 gap-3">
        {formats.map(format => (
          <button
            key={format.id}
            onClick={() => onFormatChange(format.id)}
            className={`p-4 border-2 rounded-lg transition ${
              selectedFormat === format.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {format.icon}
              <div className="text-left">
                <div className="font-semibold text-gray-900">{format.name}</div>
                <div className="text-xs text-gray-500">{format.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;
