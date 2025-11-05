const OptionCard = ({ icon, title, subtitle, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border rounded-lg px-4 py-3 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 ${
        selected ? 'border-primary ring-2 ring-primary/40' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="font-medium text-gray-800">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
    </button>
  );
};

export default OptionCard;
