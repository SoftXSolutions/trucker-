import { useState } from 'react';
import Reviews from '../components/reviews/Reviews';
import MoverProfileModal from '../components/dashboard/MoverProfileModal';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedLead, setSelectedLead] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [profile, setProfile] = useState({
        business: {
            company: 'Premier Moving Co.',
            email: 'contact@premiermove.com',
            phone: '+1 (555) 123-4567',
            website: 'https://www.premiermove.com',
            license: 'BL-CA-2025-9876',
            address: '123 Business St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94102',
            employees: '15-25 employees',
            years: '12 years',
            description: 'Premier Moving Co. has been serving the Bay Area for over 12 years with professional, reliable moving services. We specialize in both residential and commercial moves with a focus on customer satisfaction.',
            serviceAreas: ['San Francisco Bay Area','Northern California','Interstate (West Coast)'],
            specialties: ['Residential','Commercial','Long Distance','Piano Moving']
        },
        insurance: {
            dot: 'DOT-123456',
            mc: 'MC-789012',
            provider: 'Commercial Insurance Group',
            policy: 'POL-2025-4567',
            liability: '$1,000,000',
            cargo: '$250,000',
            expiry: '2026-12-31'
        }
    });

    const openLeadDetails = (lead) => {
        setSelectedLead(lead);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedLead(null);
    };

    const stats = [
        {
            title: 'Current Plan',
            value: 'Professional',
            subtitle: '$249/month',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            title: 'Leads This Month',
            value: '3/25',
            subtitle: '22 remaining',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            iconColor: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-100'
        },
        {
            title: 'Total Received',
            value: '3',
            subtitle: 'All time',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            iconColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100'
        },
        {
            title: 'Average Rating',
            value: '4.8',
            subtitle: '6 reviews',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ),
            iconColor: 'text-orange-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-100'
        }
    ];

    const leads = [
        {
            id: '#4511',
            customer: 'Sarah Johnson',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@email.com',
            moveDate: '2025-11-01',
            receivedDate: '3 days ago',
            location: 'San Francisco',
            bedrooms: '4+ Bedrooms',
            status: 'Responded',
            statusColor: 'bg-green-500',
            moveType: 'Out of State Move',
            moveService: 'Packaging and Boxing',
            fromAddress: '123 Oak Avenue, San Francisco, CA 94105',
            toAddress: '456 Pine Street, Los Angeles, CA 90001',
            distance: '382 miles',
            items: 'Full 4-bedroom house including furniture, appliances, boxes',
            description: 'Large family home relocation. Need full packing service and special handling for antiques and piano.'
        },
        {
            id: '#4552',
            customer: 'Mike Chen',
            phone: '+1 (555) 234-5678',
            email: 'mike.c@email.com',
            moveDate: '2025-10-28',
            receivedDate: '1 week ago',
            location: 'Oakland',
            bedrooms: '2-3 Bedrooms',
            status: 'Responded',
            statusColor: 'bg-green-500',
            moveType: 'In State Move',
            moveService: 'Just Moving',
            fromAddress: '789 Elm St, Oakland, CA 94601',
            toAddress: '321 Birch Ave, Berkeley, CA 94704',
            distance: '8 miles',
            items: '2 bedrooms, living room, kitchen items, 30 boxes',
            description: 'Moving to nearby city, everything already packed and ready.'
        },
        {
            id: '#4527',
            customer: 'John Smith',
            phone: '+1 (555) 789-0123',
            email: 'john.s@email.com',
            moveDate: '2025-11-08',
            receivedDate: '1 day ago',
            location: 'San Francisco',
            bedrooms: 'Small Office',
            status: 'Responded',
            statusColor: 'bg-green-500',
            moveType: 'Local Move',
            moveService: 'Just Moving',
            fromAddress: '456 Market St, San Francisco, CA 94102',
            toAddress: '789 Main St, Oakland, CA 94601',
            distance: '12 miles',
            items: '2 desks, 4 chairs, 1 filing cabinet, office supplies',
            description: 'Small office relocation with IT equipment'
        }
    ];

    const reviews = [
        {
            id: '#LEAD-4511',
            rating: 5,
            author: 'Sarah Johnson',
            initials: 'SJ',
            bgColor: 'bg-purple-500',
            date: '2025-10-15',
            dateText: '📅 2025-10-15',
            fromLocation: 'San Francisco, CA',
            toLocation: 'Los Angeles, CA',
            bedrooms: '4+ Bedrooms',
            text: 'Exceptional service! The team arrived on time, handled all our belongings with care, and completed the move faster than expected. Highly professional and courteous throughout. Would definitely recommend to anyone looking for reliable movers.',
            helpful: 12,
            hasResponse: true,
            response: 'Thank you so much for the wonderful review, Sarah! It was our pleasure to help with your move.',
            responseDate: '2025-10-16'
        },
        {
            id: '#LEAD-4552',
            rating: 5,
            author: 'Mike Chen',
            initials: 'MC',
            bgColor: 'bg-blue-500',
            date: '2025-10-10',
            dateText: '📅 2025-10-10',
            fromLocation: 'Oakland, CA',
            toLocation: 'Berkeley, CA',
            bedrooms: '2-3 Bedrooms',
            text: 'Great experience moving our 2-bedroom apartment. They were very organized, wrapped everything properly, and nothing was damaged. The quote was accurate and no hidden fees. Thank you!',
            helpful: 8,
            hasResponse: true,
            response: 'We appreciate your business, Mike! Glad everything went smoothly.',
            responseDate: '2025-10-11'
        },
        {
            id: '#LEAD-4485',
            rating: 5,
            author: 'David Thompson',
            initials: 'DT',
            bgColor: 'bg-indigo-500',
            date: '2025-09-28',
            dateText: '📅 2025-09-28',
            fromLocation: 'San Francisco, CA',
            toLocation: 'Los Angeles, CA',
            bedrooms: 'Out of State Move',
            text: 'Moved from SF to LA and everything went smoothly. Communication was excellent throughout the process. Items arrived on time and in perfect condition. Worth every penny!',
            helpful: 15,
            hasResponse: true,
            response: 'Thank you, David! Long distance moves are our specialty. Best wishes in your new location!',
            responseDate: '2025-09-29'
        },
        {
            id: '#LEAD-4472',
            rating: 4,
            author: 'Lisa Anderson',
            initials: 'LA',
            bgColor: 'bg-yellow-500',
            date: '2025-09-20',
            dateText: '📅 2025-09-20',
            fromLocation: 'San Francisco, CA',
            toLocation: 'San Francisco, CA',
            bedrooms: 'Studio',
            text: 'Good service, efficient movers. They were a bit delayed due to traffic but kept me informed. Fair pricing and careful with my furniture.',
            helpful: 3,
            hasResponse: false
        },
        {
            id: '#LEAD-4498',
            rating: 4,
            author: 'Emily Rodriguez',
            initials: 'ER',
            bgColor: 'bg-pink-500',
            date: '2025-10-05',
            dateText: '📅 2025-10-05',
            fromLocation: 'San Jose, CA',
            toLocation: 'Sunnyvale, CA',
            bedrooms: '2-3 Bedrooms',
            text: 'Overall good service. The crew was friendly and worked hard. One item had a minor scratch, but they handled the situation professionally and made it right. Would use again.',
            helpful: 5,
            hasResponse: false
        }
    ];

    return (
        <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mover Dashboard</h1>
                            <p className="text-sm text-gray-600 mt-1">Manage your business, leads, and customer relationships</p>
                        </div>
                        <div className="relative flex items-center gap-3">
                            <button
                                onClick={() => setShowNotif((v)=>!v)}
                                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            {showNotif && (
                                <div className="absolute right-20 top-10 w-72 bg-white rounded-xl border border-gray-200 shadow-[0_10px_35px_rgba(0,0,0,0.15)] z-10">
                                    <div className="px-4 py-3 border-b font-semibold text-gray-800">Notifications</div>
                                    <div className="p-3 space-y-2 text-sm">
                                        <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200">You have 2 new leads.</div>
                                        <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">Your profile is 100% complete.</div>
                                    </div>
                                </div>
                            )}
                            <button onClick={()=>setShowProfile(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    M
                                </div>
                                <span className="hidden sm:inline font-medium text-gray-700 text-sm">Profile</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Modal */}
            <MoverProfileModal isOpen={showProfile} onClose={()=>setShowProfile(false)} profile={profile} setProfile={setProfile} />

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex gap-4 md:gap-8 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'overview'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                Overview
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'leads'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                Leads
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${activeTab === 'reviews'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Reviews
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`${stat.bgColor} rounded-xl md:rounded-2xl p-5 md:p-6 border ${stat.borderColor} shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1`}
                                >
                                    <div className="flex items-start justify-between mb-3 md:mb-4">
                                        <div className="flex-1">
                                            <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                                        </div>
                                        <div className={`${stat.iconColor} w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600">{stat.subtitle}</p>
                                </div>
                            ))}
                        </div>

                        {/* My Leads Section */}
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden mb-6 md:mb-8">
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                            </svg>
                                            My Leads
                                        </h2>
                                        <p className="text-xs md:text-sm text-gray-600 mt-1">Contact your leads directly via phone</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('leads')}
                                        className="px-3 py-2 text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm flex items-center gap-1 self-start sm:self-auto">
                                        View All
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {leads.map((lead, index) => (
                                    <div key={index} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col gap-4">
                                            {/* Lead Header */}
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 mb-2">Lead {lead.id}</p>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className={`inline-block px-2.5 py-1 ${lead.statusColor} text-white text-xs font-medium rounded-full`}>
                                                            {lead.status}
                                                        </span>
                                                        <span className="inline-block px-2.5 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                                            {lead.bedrooms}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="px-4 md:px-6 py-2 md:py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm whitespace-nowrap">
                                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    Call
                                                </button>
                                            </div>

                                            {/* Lead Details Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                        Customer
                                                    </p>
                                                    <p className="font-medium text-gray-800 text-sm">{lead.customer}</p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                        </svg>
                                                        Phone
                                                    </p>
                                                    <p className="font-medium text-gray-800 text-sm">{lead.phone}</p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                        Location
                                                    </p>
                                                    <p className="font-medium text-gray-800 text-sm">{lead.location}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">Move Date: {lead.moveDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Reviews Section */}
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Recent Reviews
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className="px-3 py-2 text-orange-600 hover:text-orange-700 font-medium text-xs md:text-sm flex items-center gap-1 self-start sm:self-auto">
                                        View All Reviews
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 space-y-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="flex items-start gap-3 md:gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                    <span className="ml-1 md:ml-2 text-xs md:text-sm font-bold text-gray-800">{review.rating}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-3">{review.text}</p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-xs md:text-sm font-medium text-gray-800 truncate">{review.author}</p>
                                                    <p className="text-xs text-gray-500 whitespace-nowrap">{review.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Leads Tab */}
                {activeTab === 'leads' && (
                    <div>
                        {/* Header Section */}
                        <div className="mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">My Leads</h1>
                            <p className="text-sm text-gray-600">Manage leads received through your subscription plan</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                            <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-600">Current Plan</p>
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">Professional</p>
                            </div>

                            <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-green-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-600">Leads This Month</p>
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">3/25</p>
                            </div>

                            <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-purple-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-600">Remaining Leads</p>
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">22</p>
                            </div>
                        </div>

                        {/* Lead Cards */}
                        <div className="space-y-4 md:space-y-6">
                            {leads.map((lead, index) => (
                                <div key={index} className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
                                    {/* Lead Header */}
                                    <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-gray-800">Lead {lead.id}</h3>
                                                <span className={`px-3 py-1 ${lead.statusColor} text-white text-xs font-medium rounded-full`}>
                                                    {lead.status}
                                                </span>
                                                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                                    {lead.bedrooms}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">Received {lead.receivedDate}</p>
                                        </div>
                                    </div>

                                    {/* Lead Content */}
                                    <div className="p-4 md:p-6">
                                        {/* Move Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">{lead.moveType}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">{lead.moveService}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">{lead.moveDate}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-700">{lead.description}</p>
                                        </div>

                                        {/* Customer Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <svg className="w-4 h-4 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Customer</p>
                                                        <p className="font-medium text-gray-800">{lead.customer}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <svg className="w-4 h-4 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                                        <p className="font-medium text-gray-800">{lead.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <svg className="w-4 h-4 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Email</p>
                                                        <p className="font-medium text-gray-800">{lead.email}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <svg className="w-4 h-4 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-gray-500 mb-1">{lead.fromAddress}</p>
                                                        <p className="text-xs text-gray-500 mb-1">to</p>
                                                        <p className="text-xs text-gray-500 mb-1">{lead.toAddress}</p>
                                                        <p className="text-xs text-gray-500 mt-2">{lead.distance}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="mb-6 flex items-start gap-3">
                                            <svg className="w-4 h-4 text-gray-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Items</p>
                                                <p className="text-sm text-gray-700">{lead.items}</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={() => openLeadDetails(lead)}
                                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                View Full Details
                                            </button>
                                            <button className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                                Call Customer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && <Reviews reviews={reviews} />}
            </div>

            {/* Modal for Lead Details */}
            {showModal && selectedLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6 flex items-center justify-between rounded-t-2xl">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Lead {selectedLead.id} - Complete Details</h2>
                                <p className="text-sm text-gray-600 mt-1">View all details from the customer's quote request</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 md:p-6 space-y-6">
                            {/* Customer Information */}
                            <div className="bg-gray-50 rounded-xl p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Customer Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Name</p>
                                        <p className="font-medium text-gray-800">{selectedLead.customer}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <p className="text-sm text-gray-700">{selectedLead.phone}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <p className="text-sm text-gray-700">{selectedLead.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Move Details */}
                            <div className="bg-gray-50 rounded-xl p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Move Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Move Type</p>
                                        <p className="text-sm font-medium text-gray-800">Residential Move</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Moving Service</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.moveType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Assistance Type</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.moveService}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Area Size</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.bedrooms}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">State Type</p>
                                        <p className="text-sm font-medium text-gray-800">Out Of-State</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Move Date</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.moveDate}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-2">Project Description</p>
                                    <p className="text-sm text-gray-700">{selectedLead.description}</p>
                                </div>
                            </div>

                            {/* Location Details */}
                            <div className="bg-gray-50 rounded-xl p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Location Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Project Address</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.fromAddress.split(',')[0]}</p>
                                        <p className="text-sm text-gray-600">{selectedLead.fromAddress.split(',').slice(1).join(',')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Moving From</p>
                                        <p className="text-sm text-gray-700">{selectedLead.fromAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Moving To</p>
                                        <p className="text-sm text-gray-700">{selectedLead.toAddress}</p>
                                        <p className="text-xs text-gray-500 mt-1">ZIP: {selectedLead.toAddress.match(/\d{5}/)?.[0]}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Distance</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.distance}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gray-50 rounded-xl p-4 md:p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">Items to Move</p>
                                        <p className="text-sm text-gray-700">{selectedLead.items}</p>
                                    </div>
                                    {selectedLead.id === '#4511' && (
                                        <>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-2">Special Items</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700">Piano</span>
                                                    <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700">Antique furniture</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-2">Additional Notes</p>
                                                <p className="text-sm text-gray-700">Have stairs at both locations. Need insurance for valuable items.</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-2">Customer Notes (In Their Own Words)</p>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                    <li>This is a cross country move for job relocation</li>
                                                    <li>Large home with basement and attic full of items</li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3 rounded-b-2xl">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300">
                                Close
                            </button>
                            <button className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Call Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
