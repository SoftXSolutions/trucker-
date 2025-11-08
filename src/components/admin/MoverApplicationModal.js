import React from 'react';

const Field = ({ label, children }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800 break-words">{children || '—'}</p>
  </div>
);

const MoverApplicationModal = ({ application, onClose, onApprove, onReject }) => {
  if (!application) return null;

  const statusStyles = {
    pending: 'bg-blue-50 text-blue-700',
    approved: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-[fadeIn_.25s_ease]">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-inner">
                {application.companyName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{application.companyName}</h2>
                <p className="text-xs text-gray-500">Submitted {application.submittedAt}</p>
              </div>
            </div>
            <span className={`inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[application.status]}`}> 
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Company Type">{application.type}</Field>
            <Field label="Documents Submitted">{application.documents} docs</Field>
            <Field label="Email">{application.email}</Field>
            <Field label="Phone">{application.phone}</Field>
            <Field label="Business License">{application.businessLicense}</Field>
            <Field label="Insurance">{application.insurance}</Field>
            <Field label="Service Areas">{application.serviceAreas?.join(', ')}</Field>
            {application.rejectionReason && (
              <Field label="Rejection Reason">{application.rejectionReason}</Field>
            )}
          </div>

          {application.status === 'pending' && (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onReject(application)}
                className="flex-1 px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm active:shadow-inner active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject
              </button>
              <button
                onClick={() => onApprove(application)}
                className="flex-1 px-5 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm active:shadow-inner active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoverApplicationModal;
