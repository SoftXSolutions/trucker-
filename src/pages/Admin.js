import { useState, useEffect } from 'react';
import StatCard from '../components/admin/StatCard';
import AlertCard from '../components/admin/AlertCard';
import ApplicationCard from '../components/admin/ApplicationCard';
import adminApi from '../services/adminApi';
import RevenueLeadsChart from '../components/admin/charts/RevenueLeadsChart';
import LeadStatusPie from '../components/admin/charts/LeadStatusPie';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, alertsData, appsData] = await Promise.all([
                adminApi.getDashboardStats(),
                adminApi.getCriticalAlerts(),
                adminApi.getMoverApplications()
            ]);
            
            setStats(statsData);
            setAlerts(alertsData);
            setApplications(appsData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (application) => {
        try {
            await adminApi.approveMoverApplication(application.id);
            // Reload applications
            const appsData = await adminApi.getMoverApplications();
            setApplications(appsData);
        } catch (error) {
            console.error('Error approving application:', error);
        }
    };

    const handleReject = async (application) => {
        try {
            await adminApi.rejectMoverApplication(application.id, 'Rejected by admin');
            // Reload applications
            const appsData = await adminApi.getMoverApplications();
            setApplications(appsData);
        } catch (error) {
            console.error('Error rejecting application:', error);
        }
    };

    const handleReviewAlert = async (alert) => {
        try {
            await adminApi.reviewAlert(alert.id);
            // Reload alerts
            const alertsData = await adminApi.getCriticalAlerts();
            setAlerts(alertsData);
        } catch (error) {
            console.error('Error reviewing alert:', error);
        }
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const leadsSeries = [240, 280, 260, 310, 295, 330];
    const revenueSeries = [48000, 52000, 50000, 62000, 60000, 70000];
    const pieLabels = ['New', 'Won', 'Quoted', 'Lost', 'Claimed'];
    const pieValues = [13, 18, 25, 7, 36];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">Monitor platform performance and manage operations</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex gap-4 md:gap-8 overflow-x-auto">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                            { id: 'users', label: 'Users', icon: '👥' },
                            { id: 'movers', label: 'Movers', icon: '🚚' },
                            { id: 'leads', label: 'Leads', icon: '📋' },
                            { id: 'billing', label: 'Billing', icon: '💳' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{tab.icon}</span>
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 md:py-8">
                {activeTab === 'dashboard' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            <StatCard
                                title="Total Revenue"
                                value={`$${stats?.totalRevenue?.toLocaleString()}`}
                                subtitle={stats?.revenueTrend?.period}
                                trend={stats?.revenueTrend}
                                icon={
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                iconBg="bg-green-100"
                            />
                            <StatCard
                                title="Active Movers"
                                value={stats?.activeMovers}
                                subtitle={stats?.moversTrend?.period}
                                trend={stats?.moversTrend}
                                icon={
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                }
                                iconBg="bg-blue-100"
                            />
                            <StatCard
                                title="Total Leads"
                                value={stats?.totalLeads}
                                subtitle={stats?.leadsPeriod}
                                icon={
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                }
                                iconBg="bg-purple-100"
                            />
                            <StatCard
                                title="Pending Actions"
                                value={stats?.pendingActions}
                                subtitle={stats?.actionsNote}
                                icon={
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                iconBg="bg-orange-100"
                            />
                        </div>

                        {/* Charts and Alerts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Revenue & Leads Trend */}
                            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue & Leads Trend</h3>
                                <RevenueLeadsChart labels={labels} leads={leadsSeries} revenue={revenueSeries} />
                            </div>

                            {/* Lead Status Distribution */}
                            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Lead Status Distribution</h3>
                                <LeadStatusPie labels={pieLabels} values={pieValues} />
                            </div>
                        </div>

                        {/* Alerts and Applications Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Critical Alerts */}
                            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Critical Alerts</h3>
                                    {alerts.length > 0 && (
                                        <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                            {alerts.length}
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {alerts.map((alert) => (
                                        <AlertCard 
                                            key={alert.id} 
                                            alert={alert} 
                                            onReview={handleReviewAlert}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Recent Mover Applications */}
                            <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Recent Mover Applications</h3>
                                    <p className="bg-black rounded-lg p-1.5  text-white text-sm text-gray-600">2 Pending</p>
                                </div>
                                <div className="space-y-3">
                                    {applications.map((app) => (
                                        <ApplicationCard
                                            key={app.id}
                                            application={app}
                                            onApprove={handleApprove}
                                            onReject={handleReject}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab !== 'dashboard' && (
                    <div className="bg-white rounded-xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 text-center">
                        <div className="text-6xl mb-4">🚧</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h3>
                        <p className="text-gray-600">This section is under development. Add your content here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
