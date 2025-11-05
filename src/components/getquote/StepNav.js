const StepNav = ({ onBack, onNext, nextLabel = 'Next', disableNext }) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onBack}
        className="w-full border border-gray-300 text-gray-700 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50"
      >
        <span>←</span>
        <span>Back</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disableNext}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg py-2.5 shadow hover:from-orange-500 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default StepNav;
