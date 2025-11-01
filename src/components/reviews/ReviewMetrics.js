const ReviewMetrics = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 border-2 border-green-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-800">98%</p>
            </div>

            <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Customer Satisfaction</p>
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-800">96%</p>
            </div>

            <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Repeat Customers</p>
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <p className="text-3xl font-bold text-gray-800">34%</p>
            </div>
        </div>
    );
};

export default ReviewMetrics;
