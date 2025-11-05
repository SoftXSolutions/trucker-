import { useState } from 'react';

const ExportModal = ({ isOpen, onClose, onExport, totalRecords }) => {
    const [exportFormat, setExportFormat] = useState('csv');
    const [selectedFields, setSelectedFields] = useState({
        name: true,
        email: true,
        phone: true,
        status: true,
        emailVerified: true,
        phoneVerified: true,
        leads: true,
        joined: true,
        lastActive: true
    });

    if (!isOpen) return null;

    const handleFieldToggle = (field) => {
        setSelectedFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSelectAll = () => {
        const allSelected = Object.values(selectedFields).every(v => v);
        const newState = {};
        Object.keys(selectedFields).forEach(key => {
            newState[key] = !allSelected;
        });
        setSelectedFields(newState);
    };

    const handleExport = () => {
        const fields = Object.keys(selectedFields).filter(key => selectedFields[key]);
        onExport(exportFormat, fields);
        onClose();
    };

    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'status', label: 'Status' },
        { key: 'emailVerified', label: 'Email Verified' },
        { key: 'phoneVerified', label: 'Phone Verified' },
        { key: 'leads', label: 'Leads' },
        { key: 'joined', label: 'Joined Date' },
        { key: 'lastActive', label: 'Last Active' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-200">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Export Users</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Choose format and fields to export ({totalRecords} records)
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Export Format */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Export Format
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setExportFormat('csv')}
                                className={`p-4 border-2 rounded-lg transition ${exportFormat === 'csv'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">CSV</div>
                                        <div className="text-xs text-gray-500">Comma-separated</div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => setExportFormat('excel')}
                                className={`p-4 border-2 rounded-lg transition ${exportFormat === 'excel'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">Excel</div>
                                        <div className="text-xs text-gray-500">Spreadsheet</div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => setExportFormat('json')}
                                className={`p-4 border-2 rounded-lg transition ${exportFormat === 'json'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">JSON</div>
                                        <div className="text-xs text-gray-500">Data format</div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => setExportFormat('pdf')}
                                className={`p-4 border-2 rounded-lg transition ${exportFormat === 'pdf'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">PDF</div>
                                        <div className="text-xs text-gray-500">Print format</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Field Selection */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Select Fields
                            </label>
                            <button
                                onClick={handleSelectAll}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {Object.values(selectedFields).every(v => v) ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-lg">
                            {fields.map(field => (
                                <label key={field.key} className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={selectedFields[field.key]}
                                        onChange={() => handleFieldToggle(field.key)}
                                        className="mr-2 rounded"
                                    />
                                    {field.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={!Object.values(selectedFields).some(v => v)}
                        className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Export {exportFormat.toUpperCase()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
