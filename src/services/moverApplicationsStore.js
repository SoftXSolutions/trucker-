// Frontend-only mover applications store using localStorage to simulate a backend
// Provides initialization, fetch, approve, and reject helpers.

const STORAGE_KEY = 'moverApplications';

// Seed data used only if the storage key is empty.
const seedApplications = [
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

export function initMoverApplications() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedApplications));
  }
}

export function fetchMoverApplications() {
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        resolve(data);
      } catch (e) {
        console.error('Failed to parse mover applications', e);
        resolve([]);
      }
    }, 400);
  });
}

function write(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function updateApplication(id, changes) {
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const updated = apps.map(a => a.id === id ? { ...a, ...changes } : a);
  write(updated);
  return updated.find(a => a.id === id) || null;
}

export function approveMoverApplication(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const app = updateApplication(id, { status: 'approved', approvedAt: new Date().toISOString() });
      resolve({ success: true, application: app });
    }, 300);
  });
}

export function rejectMoverApplication(id, reason = 'Rejected') {
  return new Promise(resolve => {
    setTimeout(() => {
      const app = updateApplication(id, { status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason: reason });
      resolve({ success: true, application: app });
    }, 300);
  });
}

export function getPendingCount() {
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return apps.filter(a => a.status === 'pending').length;
}

export function addMoverApplication(raw) {
  // Ensure store initialized.
  initMoverApplications();
  const apps = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const nextId = apps.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
  const now = new Date();
  const type = raw.employeeCount ? (raw.employeeCount > 50 ? 'Enterprise' : raw.employeeCount > 10 ? 'Professional' : 'Starter') : 'Starter';
  const submittedAt = 'just now';
  const application = {
    id: nextId,
    companyName: raw.companyName || 'Unnamed Company',
    type,
    documents: raw.documentsCount || 0,
    submittedAt,
    status: 'pending',
    verified: false,
    email: raw.email || '',
    phone: raw.phone || '',
    serviceAreas: raw.city && raw.state ? [raw.city + ', ' + raw.state] : [],
    businessLicense: raw.businessLicense || 'Pending',
    insurance: raw.insurance || 'Pending',
    createdAt: now.toISOString(),
    description: raw.description || ''
  };
  const updated = [application, ...apps];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  // Dispatch a custom event so Admin dashboard can refresh.
  try {
    window.dispatchEvent(new CustomEvent('moverApplicationsUpdated', { detail: { application } }));
  } catch {}
  return application;
}

export default {
  initMoverApplications,
  fetchMoverApplications,
  approveMoverApplication,
  rejectMoverApplication,
  getPendingCount,
  addMoverApplication
};
