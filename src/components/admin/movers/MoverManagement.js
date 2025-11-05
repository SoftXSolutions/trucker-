import { useState } from 'react';
import PageHeader from '../PageHeader';
import SearchBar from '../SearchBar';
import BulkActions from '../BulkActions';
import MoverTable from './MoverTable';
import MoverDetailsModal from './MoverDetailsModal';
import { ExportButton, ExportModal } from '../export';
import { 
  exportToCSV, 
  exportToJSON, 
  exportToExcel, 
  exportToPDF, 
  prepareExportData,
  generateFilename 
} from '../../../services/exportService';

const MoverManagement = () => {
  const [movers, setMovers] = useState([
    {
      id: 1,
      name: 'S',
      location: 'Islamabad, J',
      status: 'pending',
      plan: 'Not Assigned',
      rating: 0,
      leads: 0,
      conversionRate: 0,
      revenue: 0,
      insuranceStatus: 'pending',
      insuranceExpiry: 'Pending verification',
      email: 'batch22.cs.018@gmail.com',
      phone: '03010512429',
      website: 'https://www.figma.com/make/jmwuOCsiKqYkzCvBj2gCX5/Movers-Directory-Website-Design?node-id=0-1&p=f&t=cKTueJ5d3eQtxUlf-0',
      address: 'C block, House no 139-b, Street no 9 B-17 Islamabad, Islamabad, j',
      businessLicense: '22',
      insuranceNumber: '54',
      yearsInBusiness: '1',
      description: 'a',
      documents: {
        dot: 'missing',
        mc: 'missing',
        insurance: 'pending',
        w9: 'missing'
      }
    },
    {
      id: 2,
      name: 'Premier Moving Co.',
      location: 'San Francisco, CA',
      status: 'active',
      plan: 'Professional',
      rating: 4.8,
      leads: 145,
      conversionRate: 68,
      revenue: 24500,
      insuranceStatus: 'valid',
      insuranceExpiry: '2025-10-25',
      email: 'contact@premiermove.com',
      phone: '+1 (555) 234-5678',
      website: 'https://www.premiermove.com',
      address: '123 Market Street, San Francisco, CA 94102',
      businessLicense: 'BL-2023-45678',
      insuranceNumber: 'INS-987654321',
      yearsInBusiness: '15',
      description: 'Premier Moving Co. is a full-service moving company specializing in residential and commercial relocations. With over 15 years of experience, we provide professional, reliable, and affordable moving services.',
      documents: {
        dot: 'valid',
        mc: 'valid',
        insurance: 'valid',
        w9: 'valid'
      }
    },
    {
      id: 3,
      name: 'Swift Movers LLC',
      location: 'Los Angeles, CA',
      status: 'pending',
      plan: 'Starter',
      rating: 4.5,
      leads: 32,
      conversionRate: 55,
      revenue: 8900,
      insuranceStatus: 'valid',
      insuranceExpiry: '2026-03-12',
      email: 'info@swiftmovers.com',
      phone: '+1 (555) 345-6789',
      website: 'https://www.swiftmovers.com',
      address: '456 Sunset Blvd, Los Angeles, CA 90028',
      businessLicense: 'BL-2024-12345',
      insuranceNumber: 'INS-123456789',
      yearsInBusiness: '8',
      description: 'Swift Movers LLC offers fast and efficient moving services for local and long-distance moves. Our team is dedicated to making your move stress-free.',
      documents: {
        dot: 'valid',
        mc: 'pending',
        insurance: 'valid',
        w9: 'valid'
      }
    },
    {
      id: 4,
      name: 'Elite Moving Services',
      location: 'New York, NY',
      status: 'active',
      plan: 'Enterprise',
      rating: 4.9,
      leads: 289,
      conversionRate: 72,
      revenue: 58700,
      insuranceStatus: 'valid',
      insuranceExpiry: '2026-08-20',
      email: 'contact@elitemoving.com',
      phone: '+1 (555) 456-7890',
      website: 'https://www.elitemoving.com',
      address: '789 Broadway, New York, NY 10003',
      businessLicense: 'BL-2022-98765',
      insuranceNumber: 'INS-456789123',
      yearsInBusiness: '20',
      description: 'Elite Moving Services is New York\'s premier moving company, offering luxury moving experiences with white-glove service. We handle everything from packing to unpacking.',
      documents: {
        dot: 'valid',
        mc: 'valid',
        insurance: 'valid',
        w9: 'valid'
      }
    },
    {
      id: 5,
      name: 'Family First Movers',
      location: 'Chicago, IL',
      status: 'suspended',
      plan: 'Professional',
      rating: 3.8,
      leads: 67,
      conversionRate: 42,
      revenue: 12300,
      insuranceStatus: 'expired',
      insuranceExpiry: '2025-09-15',
      email: 'support@familyfirstmovers.com',
      phone: '+1 (555) 567-8901',
      website: 'https://www.familyfirstmovers.com',
      address: '321 Michigan Ave, Chicago, IL 60601',
      businessLicense: 'BL-2023-54321',
      insuranceNumber: 'INS-789123456',
      yearsInBusiness: '5',
      description: 'Family First Movers is a family-owned business providing personalized moving services. We treat your belongings like our own.',
      documents: {
        dot: 'valid',
        mc: 'valid',
        insurance: 'expired',
        w9: 'valid'
      }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMovers, setSelectedMovers] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedMover, setSelectedMover] = useState(null);

  const filteredMovers = movers.filter(mover => {
    const matchesSearch = 
      mover.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mover.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mover.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || mover.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (mover) => {
    setSelectedMover(mover);
    setShowDetailsModal(true);
  };

  const handleEdit = (mover) => {
    console.log('Edit mover:', mover);
    // Implement edit functionality
  };

  const handleSuspend = (mover) => {
    if (window.confirm(`Suspend ${mover.name}?`)) {
      setMovers(movers.map(m =>
        m.id === mover.id ? { ...m, status: 'suspended' } : m
      ));
    }
  };

  const handleDelete = (moverId) => {
    if (window.confirm('Are you sure you want to delete this mover? This action cannot be undone.')) {
      setMovers(movers.filter(m => m.id !== moverId));
    }
  };

  const handleApprove = (mover) => {
    if (window.confirm(`Approve ${mover.name}?`)) {
      setMovers(movers.map(m =>
        m.id === mover.id ? { ...m, status: 'active' } : m
      ));
      setShowDetailsModal(false);
    }
  };

  const handleReject = (mover) => {
    const reason = window.prompt('Reason for rejection:');
    if (reason) {
      setMovers(movers.filter(m => m.id !== mover.id));
      setShowDetailsModal(false);
      alert(`${mover.name} has been rejected. Reason: ${reason}`);
    }
  };

  const handleSelectMover = (moverId) => {
    setSelectedMovers(prev =>
      prev.includes(moverId)
        ? prev.filter(id => id !== moverId)
        : [...prev, moverId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMovers.length === filteredMovers.length) {
      setSelectedMovers([]);
    } else {
      setSelectedMovers(filteredMovers.map(m => m.id));
    }
  };

  const handleBulkActivate = () => {
    if (window.confirm(`Activate ${selectedMovers.length} selected movers?`)) {
      setMovers(movers.map(m =>
        selectedMovers.includes(m.id) ? { ...m, status: 'active' } : m
      ));
      setSelectedMovers([]);
    }
  };

  const handleBulkSuspend = () => {
    if (window.confirm(`Suspend ${selectedMovers.length} selected movers?`)) {
      setMovers(movers.map(m =>
        selectedMovers.includes(m.id) ? { ...m, status: 'suspended' } : m
      ));
      setSelectedMovers([]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedMovers.length} selected movers? This action cannot be undone.`)) {
      setMovers(movers.filter(m => !selectedMovers.includes(m.id)));
      setSelectedMovers([]);
    }
  };

  const handleExport = (format, fields) => {
    const exportData = prepareExportData(filteredMovers, fields);
    const extensionMap = { csv: 'csv', excel: 'xlsx', json: 'json', pdf: 'pdf' };
    const filename = generateFilename('movers_export', extensionMap[format]);

    switch (format) {
      case 'csv':
        exportToCSV(exportData, filename);
        break;
      case 'excel':
        exportToExcel(exportData, filename);
        break;
      case 'json':
        exportToJSON(exportData, filename);
        break;
      case 'pdf':
        exportToPDF(exportData, filename, 'Mover Management Report');
        break;
      default:
        console.error('Unknown export format:', format);
    }
  };

  const exportFields = [
    { key: 'name', label: 'Company Name' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
    { key: 'plan', label: 'Plan' },
    { key: 'rating', label: 'Rating' },
    { key: 'leads', label: 'Leads' },
    { key: 'conversionRate', label: 'Conversion Rate' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'insuranceStatus', label: 'Insurance Status' }
  ];

  return (
    <div>
      <PageHeader
        title="Mover Management"
        subtitle="Review and manage mover accounts"
        actions={
          <>
            <ExportButton onClick={() => setShowExportModal(true)} />
          </>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movers..."
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2 text-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            More Filters
          </button>
        </div>
      </div>

      {selectedMovers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {selectedMovers.length} selected
            </span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleBulkActivate}
              className="flex-1 sm:flex-none px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              Bulk Approve
            </button>
            <button
              onClick={handleBulkSuspend}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition whitespace-nowrap"
            >
              Bulk Suspend
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition whitespace-nowrap"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      <MoverTable
        movers={filteredMovers}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onSuspend={handleSuspend}
        onDelete={handleDelete}
        selectedMovers={selectedMovers}
        onSelectMover={handleSelectMover}
        onSelectAll={handleSelectAll}
      />

      <MoverDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        mover={selectedMover}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        totalRecords={filteredMovers.length}
        availableFields={exportFields}
      />
    </div>
  );
};

export default MoverManagement;
