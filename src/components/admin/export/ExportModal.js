import { useState } from 'react';
import FormatSelector from './FormatSelector';
import FieldSelector from './FieldSelector';

const ExportModal = ({ isOpen, onClose, onExport, totalRecords, availableFields }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState(() => {
    const initial = {};
    availableFields.forEach(field => {
      initial[field.key] = true;
    });
    return initial;
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

  const hasSelectedFields = Object.values(selectedFields).some(v => v);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Export Data</h3>
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
          <FormatSelector
            selectedFormat={exportFormat}
            onFormatChange={setExportFormat}
          />

          <FieldSelector
            fields={availableFields}
            selectedFields={selectedFields}
            onFieldToggle={handleFieldToggle}
            onSelectAll={handleSelectAll}
          />
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
            disabled={!hasSelectedFields}
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
