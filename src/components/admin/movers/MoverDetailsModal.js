const MoverDetailsModal = ({ isOpen, onClose, mover, onApprove, onReject }) => {
  if (!isOpen || !mover) return null;

  const InfoRow = ({ label, value, icon }) => (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-sm text-gray-900 flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        {value || 'N/A'}
      </div>
    </div>
  );

  const DocumentItem = ({ name, status }) => (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
      {status === 'valid' ? (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : status === 'pending' ? (
        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{mover.name}</h3>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {mover.location}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              mover.status === 'active' ? 'bg-black text-white' :
              mover.status === 'pending' ? 'bg-gray-100 text-gray-800' :
              'bg-red-100 text-red-800'
            }`}>
              {mover.status}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Business Performance */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Business Performance
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Total Revenue</div>
                    <div className="text-lg font-bold text-gray-900">${mover.revenue.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Conversion Rate</div>
                    <div className="text-lg font-bold text-gray-900">{mover.conversionRate}%</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Total Leads</div>
                    <div className="text-lg font-bold text-gray-900">{mover.leads}</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Rating</div>
                    <div className="text-lg font-bold text-gray-900 flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      {mover.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Registration Details
                </h4>
                <InfoRow label="Email" value={mover.email} />
                <InfoRow label="Phone" value={mover.phone} />
                <InfoRow label="Website" value={mover.website} />
              </div>

              {/* Business Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Information
                </h4>
                <InfoRow label="Address" value={mover.address} />
                <InfoRow label="Business License" value={mover.businessLicense} />
                <InfoRow label="Insurance Number" value={mover.insuranceNumber} />
                <InfoRow label="Years in Business" value={mover.yearsInBusiness} />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Documents */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documents
                </h4>
                <div className="space-y-2">
                  <DocumentItem name="DOT Certificate" status={mover.documents?.dot || 'missing'} />
                  <DocumentItem name="MC Number" status={mover.documents?.mc || 'missing'} />
                  <DocumentItem name="Insurance" status={mover.documents?.insurance || 'pending'} />
                  <DocumentItem name="W9 Form" status={mover.documents?.w9 || 'missing'} />
                </div>
              </div>

              {/* Insurance Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Insurance
                </h4>
                <InfoRow label="Status" value={
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    mover.insuranceStatus === 'valid' ? 'bg-green-100 text-green-800' :
                    mover.insuranceStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {mover.insuranceStatus === 'valid' ? 'Valid' : 
                     mover.insuranceStatus === 'pending' ? 'Pending verification' : 'Expired'}
                  </span>
                } />
                <InfoRow label="Expiry Date" value={mover.insuranceExpiry} />
              </div>

              {/* Company Description */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Description
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {mover.description || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {mover.status === 'pending' && (
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => onReject(mover)}
              className="flex-1 px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reject
            </button>
            <button
              onClick={() => onApprove(mover)}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoverDetailsModal;
