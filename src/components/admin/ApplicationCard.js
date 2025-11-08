const statusClasses = {
    pending: 'bg-blue-50 text-blue-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700'
};

const ApplicationCard = ({ application, onApprove, onReject, onOpen }) => {
    return (
        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <button
                        type="button"
                        onClick={() => onOpen && onOpen(application)}
                        className="text-left w-full group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-inner">
                                {application.companyName?.charAt(0) || '?'}
                            </div>
                            <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{application.companyName}</h4>
                            {application.verified && (
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812.75.75 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                {application.type}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                </svg>
                                {application.documents} docs
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeWidth="1" d="M2 2h16v16H2z" />
                                </svg>
                                {application.email}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">{application.submittedAt}</p>
                    </button>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[application.status] || 'bg-gray-50 text-gray-700'}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
            </div>
            {application.status === 'pending' && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onReject(application)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                    </button>
                    <button
                        onClick={() => onApprove(application)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                    </button>
                </div>
            )}
        </div>
    );
};

export default ApplicationCard;
