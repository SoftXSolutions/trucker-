const SearchBar = ({ value, onChange, placeholder = "Search...", onFilter, showFilter = true }) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm"
        />
      </div>
      {onFilter && showFilter && (
        <button 
          onClick={onFilter}
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      )}
    </div>
  );
};

export default SearchBar;
