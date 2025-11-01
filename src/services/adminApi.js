// Admin API Service
// This file centralizes all API calls for the admin dashboard
// Replace BASE_URL with your actual API endpoint

const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourdomain.com';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};

// Dashboard Stats
export const getDashboardStats = async () => {
    // return await apiCall('/admin/stats');
    
    // Mock data for development
    return {
        totalRevenue: 67430,
        revenueTrend: { value: '+2.5%', isPositive: true, period: 'from last month' },
        activeMovers: 487,
        moversTrend: { value: '+23', isPositive: true, period: 'this week' },
        totalLeads: 350,
        leadsPeriod: 'This month',
        pendingActions: 12,
        actionsNote: 'Requires attention'
    };
};

// Revenue & Leads Trend Data
export const getRevenueTrend = async () => {
    // return await apiCall('/admin/revenue-trend');
    
    // Mock data
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        leads: [120, 150, 140, 180, 160, 200],
        revenue: [45000, 52000, 48000, 58000, 55000, 65000]
    };
};

// Lead Status Distribution
export const getLeadDistribution = async () => {
    // return await apiCall('/admin/lead-distribution');
    
    // Mock data
    return [
        { status: 'Claimed', value: 45, color: '#10b981' },
        { status: 'New', value: 33, color: '#3b82f6' },
        { status: 'Lost', value: 7, color: '#ef4444' },
        { status: 'Quoted', value: 15, color: '#f59e0b' }
    ];
};

// Critical Alerts
export const getCriticalAlerts = async () => {
    // return await apiCall('/admin/alerts');
    
    // Mock data
    return [
        {
            id: 1,
            type: 'critical',
            title: 'Premier Moving Co',
            description: 'Insurance expires in 5 days',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Swift Movers LLC',
            description: 'Pending document verification',
            time: '6 hours ago'
        },
        {
            id: 3,
            type: 'info',
            title: 'Reliable Transport',
            description: 'Registration expires in 15 days',
            time: '1 day ago'
        }
    ];
};

// Recent Mover Applications
export const getMoverApplications = async () => {
    // return await apiCall('/admin/applications');
    
    // Mock data
    return [
        {
            id: 1,
            companyName: 'Elite Moving Services',
            type: 'Professional',
            services: '3 docs',
            time: '2 hours ago',
            verified: true
        },
        {
            id: 2,
            companyName: 'Metro Movers Inc',
            type: 'Starter',
            services: '5 docs',
            time: '5 hours ago',
            verified: false
        },
        {
            id: 3,
            companyName: 'Family First Movers',
            type: 'Enterprise',
            services: '2 docs',
            time: '1 day ago',
            verified: true
        }
    ];
};

// Users Management
export const getUsers = async (page = 1, limit = 10) => {
    // return await apiCall(`/admin/users?page=${page}&limit=${limit}`);
    return { users: [], total: 0 };
};

// Movers Management
export const getMovers = async (page = 1, limit = 10) => {
    // return await apiCall(`/admin/movers?page=${page}&limit=${limit}`);
    return { movers: [], total: 0 };
};

// Leads Management
export const getLeads = async (page = 1, limit = 10) => {
    // return await apiCall(`/admin/leads?page=${page}&limit=${limit}`);
    return { leads: [], total: 0 };
};

// Approve Mover Application
export const approveMoverApplication = async (applicationId) => {
    // return await apiCall(`/admin/applications/${applicationId}/approve`, {
    //     method: 'POST'
    // });
    console.log('Approving application:', applicationId);
    return { success: true };
};

// Reject Mover Application
export const rejectMoverApplication = async (applicationId, reason) => {
    // return await apiCall(`/admin/applications/${applicationId}/reject`, {
    //     method: 'POST',
    //     body: JSON.stringify({ reason })
    // });
    console.log('Rejecting application:', applicationId, reason);
    return { success: true };
};

// Review Alert
export const reviewAlert = async (alertId) => {
    // return await apiCall(`/admin/alerts/${alertId}/review`, {
    //     method: 'POST'
    // });
    console.log('Reviewing alert:', alertId);
    return { success: true };
};

export default {
    getDashboardStats,
    getRevenueTrend,
    getLeadDistribution,
    getCriticalAlerts,
    getMoverApplications,
    getUsers,
    getMovers,
    getLeads,
    approveMoverApplication,
    rejectMoverApplication,
    reviewAlert
};
