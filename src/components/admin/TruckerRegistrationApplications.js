import { useState, useEffect } from 'react';

// Mock API service - replace with actual API calls later
const truckerApplicationsApi = {
    // Simulate fetching applications from backend
    fetchApplications: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const applications = JSON.parse(localStorage.getItem('truckerApplications') || '[]');
                resolve(applications);
            }, 500);
        });
    },
    
    // Simulate approving application
    approveApplication: async (applicationId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const applications = JSON.parse(localStorage.getItem('truckerApplications') || '[]');
                const updatedApplications = applications.map(app => 
                    app.id === applicationId 
                        ? { ...app, status: 'approved', approvedAt: new Date().toISOString() }
                        : app
                );
                localStorage.setItem('truckerApplications', JSON.stringify(updatedApplications));
                resolve({ success: true, message: 'Application approved successfully' });
            }, 300);
        });
    },
    
    // Simulate rejecting application
    rejectApplication: async (applicationId, reason) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const applications = JSON.parse(localStorage.getItem('truckerApplications') || '[]');
                const updatedApplications = applications.map(app => 
                    app.id === applicationId 
                        ? { ...app, status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason }
                        : app
                );
                localStorage.setItem('truckerApplications', JSON.stringify(updatedApplications));
                resolve({ success: true, message: 'Application rejected successfully' });
            }, 300);
        });
    }
};

const TruckerRegistrationApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [processingIds, setProcessingIds] = useState(new Set());
    const [notification, setNotification] = useState(null);

    // Initialize with mock data and fetch applications
    useEffect(() => {
        initializeMockData();
        fetchApplications();
    }, []);

    const initializeMockData = () => {
        // Initialize localStorage with mock data if empty
        const existingApplications = localStorage.getItem('truckerApplications');
        if (!existingApplications) {
            const mockApplications = [
                {
                    id: 1,
                    companyName: 'Elite Moving Services',
                    type: 'Professional',
                    documents: 3,
                    submittedAt: '2 hours ago',
                    status: 'pending',
                    verified: true,
                    email: 'contact@elitemoving.com',
                    phone: '+1 (555) 123-4567',
                    serviceAreas: ['New York', 'New Jersey'],
                    businessLicense: 'BL-2024-001',
                    insurance: 'Valid until Dec 2024',
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    companyName: 'Metro Movers Inc',
                    type: 'Starter',
                    documents: 5,
                    submittedAt: '5 hours ago',
                    status: 'pending',
                    verified: false,
                    email: 'info@metromovers.com',
                    phone: '+1 (555) 987-6543',
                    serviceAreas: ['Los Angeles', 'Orange County'],
                    businessLicense: 'BL-2024-002',
                    insurance: 'Valid until Nov 2024',
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 3,
                    companyName: 'Family First Movers',
                    type: 'Enterprise',
                    documents: 2,
                    submittedAt: '1 day ago',
                    status: 'pending',
                    verified: true,
                    email: 'hello@familyfirst.com',
                    phone: '+1 (555) 456-7890',
                    serviceAreas: ['Chicago', 'Milwaukee'],
                    businessLicense: 'BL-2024-003',
                    insurance: 'Valid until Jan 2025',
                    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                }
            ];
            localStorage.setItem('truckerApplications', JSON.stringify(mockApplications));
        }
    };

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const data = await truckerApplicationsApi.fetchApplications();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            showNotification('Error loading applications', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleApprove = async (applicationId) => {
        try {
            // Frontend handling - update status locally
            setApplications(prev => 
                prev.map(app => 
                    app.id === applicationId 
                        ? { ...app, status: 'approved' }
                        : app
                )
            );
            
            // TODO: Add backend API call when ready
            // await adminApi.approveTruckerApplication(applicationId);
            
            console.log(`Approved application ${applicationId}`);
        } catch (error) {
            console.error('Error approving application:', error);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            // Frontend handling - update status locally
            setApplications(prev => 
                prev.map(app => 
                    app.id === applicationId 
                        ? { ...app, status: 'rejected' }
                        : app
                )
            );
            
            // TODO: Add backend API call when ready
            // await adminApi.rejectTruckerApplication(applicationId, reason);
            
            console.log(`Rejected application ${applicationId}`);
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const pendingCount = applications.filter(app => app.status === 'pending').length;

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-800">Recent Mover Applications</h2>
                        {pendingCount > 0 && (
                            <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-lg">
                                {pendingCount} Pending
                            </span>
                        )}
                    </div>
                    
                    {/* Filter Tabs */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        {[
                            { key: 'all', label: 'All' },
                            { key: 'pending', label: 'Pending' },
                            { key: 'approved', label: 'Approved' },
                            { key: 'rejected', label: 'Rejected' }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                    filter === tab.key
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="p-6">
                {filteredApplications.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500">No applications found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredApplications.map((application) => (
                            <TruckerApplicationCard
                                key={application.id}
                                application={application}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const TruckerApplicationCard = ({ application, onApprove, onReject }) => {
    const [showDetails, setShowDetails] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-blue-50 text-blue-700';
            case 'approved':
                return 'bg-green-50 text-green-700';
            case 'rejected':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300">
            {/* Main Card Content */}
            <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Company Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{application.companyName}</h3>
                            {application.verified && (
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
                        </div>
                        
                        <p className="text-xs text-gray-500">{application.submittedAt}</p>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                            {getStatusText(application.status)}
                        </span>
                        
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {showDetails ? 'Hide Details' : 'View Details'}
                        </button>
                    </div>
                </div>

                {/* Action Buttons - Only show for pending applications */}
                {application.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => onReject(application.id)}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                        </button>
                        <button 
                            onClick={() => onApprove(application.id)}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                        </button>
                    </div>
                )}
            </div>

            {/* Expandable Details */}
            {showDetails && (
                <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600 mb-1">Contact Information</p>
                            <p className="font-medium text-gray-800">{application.email}</p>
                            <p className="text-gray-600">{application.phone}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Service Areas</p>
                            <p className="font-medium text-gray-800">{application.serviceAreas.join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Business License</p>
                            <p className="font-medium text-gray-800">{application.businessLicense}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Insurance</p>
                            <p className="font-medium text-gray-800">{application.insurance}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TruckerRegistrationApplications;