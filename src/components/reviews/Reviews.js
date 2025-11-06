import { useState } from 'react';
import ReviewStats from './ReviewStats';
import ReviewMetrics from './ReviewMetrics';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviews }) => {
    const [tab, setTab] = useState('all'); // all | request | feedback
    const [filter, setFilter] = useState('all'); // all | 5 | 4 | 3
    const [confirmName, setConfirmName] = useState(null);
    const [emailForm, setEmailForm] = useState({ to: '', from: 'owner@company.com', message: 'Hello,\n\nWe appreciate the opportunity to work with you and, if you are happy with our service, we invite you to leave a review for us.\n\nThank you!' });
    const [showGoogleModal, setShowGoogleModal] = useState(false);
    const [connectedGoogle, setConnectedGoogle] = useState(false);

    const customers = [
        { name: 'Maria Adasczik', service: 'Find Moving Services - Out of State', leadDate: '10/07/2025' },
        { name: 'Mauricio Carpio', service: 'Find Moving Services - Out of State', leadDate: '09/30/2025' },
        { name: 'Emilie Esders', service: 'Find Moving Services - Out of State', leadDate: '09/10/2025' },
        { name: 'Kevin Huntly', service: 'Find Moving Services - Out of State', leadDate: '09/10/2025' },
        { name: 'Jean Diaz', service: 'Find Moving Services - Out of State', leadDate: '09/09/2025' },
    ];

    const filtered = reviews.filter(r => filter === 'all' || r.rating === Number(filter));

    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Reviews</h1>
                <p className="text-sm text-gray-600">Manage customer reviews and requests</p>
            </div>

            {/* Sub Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex gap-6 overflow-x-auto">
                    <button onClick={()=>setTab('all')} className={`py-2 border-b-2 -mb-px font-medium ${tab==='all'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>All reviews</button>
                    <button onClick={()=>setTab('request')} className={`py-2 border-b-2 -mb-px font-medium ${tab==='request'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>Request reviews</button>
                    <button onClick={()=>setTab('feedback')} className={`py-2 border-b-2 -mb-px font-medium ${tab==='feedback'?'border-orange-500 text-orange-600':'border-transparent text-gray-600 hover:text-gray-800'}`}>Feedback</button>
                </div>
            </div>

            {tab === 'all' && (
                <div>
                    <ReviewStats />
                    <ReviewMetrics />

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Customer reviews</h2>
                        <div className="flex items-center gap-2">
                            {['all','5','4','3'].map(f => (
                                <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 text-sm font-medium rounded-lg ${filter===f?'bg-white border border-gray-300 text-gray-800':'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}>
                                    {f==='all'?'All':`${f}★`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filtered.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))}
                    </div>
                </div>
            )}

            {tab === 'request' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: list of customers */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-gray-800">Request reviews from your customers</h3>
                            <p className="text-sm text-gray-600">Ask customers you've worked with to rate and review you.</p>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="text-left py-2 px-4">Customer</th>
                                        <th className="text-left py-2 px-4">Service</th>
                                        <th className="text-left py-2 px-4">Lead date</th>
                                        <th className="py-2 px-4">Request review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((c, i) => (
                                        <tr key={i} className={`border-t ${i%2?'bg-white':'bg-gray-50/60'}`}>
                                            <td className="py-2 px-4 font-medium text-gray-800">{c.name}</td>
                                            <td className="py-2 px-4 text-gray-700">{c.service}</td>
                                            <td className="py-2 px-4 text-gray-700">{c.leadDate}</td>
                                            <td className="py-2 px-4 text-right">
                                                <button onClick={()=>setConfirmName(c.name)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">Send request</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right: email request form */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit">
                        <h3 className="font-semibold text-gray-800 mb-3">Email a review request</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">To</label>
                                <input value={emailForm.to} onChange={(e)=>setEmailForm(v=>({...v,to:e.target.value}))} className="w-full border rounded-lg px-3 py-2" placeholder="customer@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">From</label>
                                <input value={emailForm.from} onChange={(e)=>setEmailForm(v=>({...v,from:e.target.value}))} className="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Message</label>
                                <textarea value={emailForm.message} onChange={(e)=>setEmailForm(v=>({...v,message:e.target.value}))} className="w-full border rounded-lg px-3 py-2 h-28" />
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Send request</button>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                            <div className="font-semibold text-gray-800 mb-2">Add reviews from Google</div>
                            <p className="text-sm text-gray-600 mb-3">Connect to your Google Business Profile and import your recent reviews.</p>
                            {connectedGoogle ? (
                                <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">Connected to Google. You can now import reviews.</div>
                            ) : (
                                <button onClick={()=>setShowGoogleModal(true)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.443,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.277-7.949l-6.563,5.046C9.554,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.983,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.271,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                                    Import now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'feedback' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border p-4">
                        <div className="font-semibold text-gray-800 mb-1">Why great reviews matter</div>
                        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                            <li>Pros with 3+ reviews are more likely to be hired.</li>
                            <li>Asking early increases your odds of winning jobs.</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-xl border p-4">
                        <div className="font-semibold text-gray-800 mb-2">Recent feedback</div>
                        <div className="text-sm text-gray-600">No feedback yet.</div>
                    </div>
                </div>
            )}

            {/* Confirm modal for send request */}
            {confirmName && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={()=>setConfirmName(null)}>
                    <div className="bg-white rounded-xl w-full max-w-md p-5" onClick={(e)=>e.stopPropagation()}>
                        <div className="text-lg font-semibold text-gray-800 mb-3">Request a review</div>
                        <p className="text-sm text-gray-700 mb-4">Request a review from <span className="font-semibold">{confirmName}</span>?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={()=>setConfirmName(null)} className="px-4 py-2 rounded-lg border">Cancel</button>
                            <button onClick={()=>setConfirmName(null)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Send request</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Google connect modal (mock sign-in) */}
            {showGoogleModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={()=>setShowGoogleModal(false)}>
                    <div className="bg-white rounded-xl w-full max-w-md p-5" onClick={(e)=>e.stopPropagation()}>
                        <div className="text-lg font-semibold text-gray-800 mb-2">Connect Google Business Profile</div>
                        <p className="text-sm text-gray-600 mb-4">Sign in with Google to import feedback and reviews.</p>
                        <button onClick={()=>{setConnectedGoogle(true); setShowGoogleModal(false);}} className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.443,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.277-7.949l-6.563,5.046C9.554,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.983,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.271,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                            Sign in with Google
                        </button>
                        <div className="mt-3 text-xs text-gray-500">Note: This is a placeholder sign-in. Provide your Google login ID later for real integration.</div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={()=>setShowGoogleModal(false)} className="text-sm text-gray-600 hover:text-gray-800">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
