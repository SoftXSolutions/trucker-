const ExportButton = ({ onClick, className = "" }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 text-sm ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Export
    </button>
  );
};

export default ExportButton;
