const ProgressBar = ({ percent, label }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-sm font-medium text-gray-700">{percent}% Complete</div>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded">
        <div
          className="h-1.5 bg-gray-800 rounded transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
