const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
            {/* Review Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className={`${review.bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800">{review.author}</h3>
                            <span className="text-xs text-gray-500">{review.id}</span>
                        </div>
                        {review.bedrooms && (
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                {review.bedrooms}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">{review.dateText}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{review.fromLocation}</span>
                        </div>
                        <span>→</span>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{review.toLocation}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">{review.text}</p>

            {/* Response */}
            {review.hasResponse && (
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">Your Response</span>
                        <span className="text-xs text-blue-600">• {review.responseDate}</span>
                    </div>
                    <p className="text-sm text-blue-900">{review.response}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({review.helpful})
                </button>
                {!review.hasResponse && (
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Respond
                    </button>
                )}
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    View Customer Profile
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
