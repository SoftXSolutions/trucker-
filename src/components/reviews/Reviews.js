import ReviewStats from './ReviewStats';
import ReviewMetrics from './ReviewMetrics';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviews }) => {
    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Reviews & Ratings</h1>
                <p className="text-sm text-gray-600">Customer feedback and testimonials</p>
            </div>

            {/* Stats Section */}
            <ReviewStats />

            {/* Metrics Cards */}
            <ReviewMetrics />

            {/* Customer Reviews Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        All
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        5★
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        4★
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        3★
                    </button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
        </div>
    );
};

export default Reviews;
