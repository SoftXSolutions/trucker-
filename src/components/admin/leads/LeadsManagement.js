import { useMemo, useState } from 'react';
import PageHeader from '../PageHeader';
import SearchBar from '../SearchBar';
import BulkActions from '../BulkActions';

const STATUS_OPTIONS = ['All Status', 'Pending', 'On Hold', 'Distributed', 'Claimed', 'Quoted'];

const sampleLeads = [
  {
    id: 4523,
    customer: { name: 'Sarah Johnson', email: 'sarah.j@email.com' },
    details: { move: '2-BR Apartment → House', distance: '382 mi', date: '2025-11-03' },
    status: 'Pending',
    tier: 'premium',
    score: 82,
    distribution: null,
    created: '2 hours ago'
  },
  {
    id: 4524,
    customer: { name: 'Mike Chen', email: 'mike.c@email.com' },
    details: { move: '1-BR Apartment → Apartment', distance: '12 mi', date: '2025-11-05' },
    status: 'Distributed',
    tier: 'standard',
    score: 68,
    distribution: '2 movers',
    created: '5 hours ago'
  },
  {
    id: 4525,
    customer: { name: 'Emily Rodriguez', email: 'emily.r@email.com' },
    details: { move: '3-BR House → House', distance: '355 mi', date: '2025-11-08' },
    status: 'Claimed',
    tier: 'standard',
    score: 75,
    distribution: 'Claimed by Elite Moving Services',
    created: '1 day ago'
  }
];

const Card = ({ title, value, border }) => (
  <div className={`bg-white rounded-xl p-4 md:p-5 border ${border} shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_34px_rgba(0,0,0,0.10)] transition-all`}> 
    <div className="text-sm text-gray-600 mb-1">{title}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
  </div>
);

const StatusCards = ({ counts }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
    <Card title="Pending" value={counts.Pending} border="border-yellow-200" />
    <Card title="On Hold" value={counts['On Hold']} border="border-gray-200" />
    <Card title="Distributed" value={counts.Distributed} border="border-purple-200" />
    <Card title="Claimed" value={counts.Claimed} border="border-green-200" />
    <Card title="Quoted" value={counts.Quoted} border="border-blue-200" />
  </div>
);

const LeadsTable = ({ leads, selected, onToggle, onToggleAll, onEdit, onDistribute }) => {
  const all = leads.length > 0 && selected.length === leads.length;
  const some = selected.length > 0 && selected.length < leads.length;

  return (
    <div className="bg-white rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={all}
                  ref={el => { if (el) el.indeterminate = some; }}
                  onChange={onToggleAll}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Lead ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Move Details</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tier/Score</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Distribution</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map(l => (
              <tr key={l.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" checked={selected.includes(l.id)} onChange={() => onToggle(l.id)} />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">#{l.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{l.customer.name}</div>
                  <div className="text-gray-500">{l.customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{l.details.move}</div>
                  <div className="text-gray-500 text-xs">{l.details.distance} • {l.details.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    l.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    l.status === 'Distributed' ? 'bg-purple-100 text-purple-800' :
                    l.status === 'Claimed' ? 'bg-green-100 text-green-800' :
                    l.status === 'On Hold' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                  }`}>{l.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs border ${l.tier === 'premium' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>{l.tier}</span>
                    <span className={`px-2 py-0.5 rounded text-xs border ${
                      l.score >= 80 ? 'bg-green-50 text-green-700 border-green-200' :
                      l.score >= 60 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-red-50 text-red-700 border-red-200'}`}>Score: {l.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{l.distribution || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{l.created}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(l)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onClick={() => onDistribute(l)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Distribute">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl w-[92%] max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">✕</button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-4 border-t bg-gray-50">{footer}</div>}
      </div>
    </div>
  );
};

const LeadsManagement = () => {
  const [leads, setLeads] = useState(sampleLeads);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All Status');
  const [selected, setSelected] = useState([]);
  const [editLead, setEditLead] = useState(null);
  const [showDistribute, setShowDistribute] = useState(false);
  const [distributeFor, setDistributeFor] = useState(null);
  const [selectedMovers, setSelectedMovers] = useState([]);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const q = query.toLowerCase();
      const matchQ = !q || l.customer.name.toLowerCase().includes(q) || l.customer.email.toLowerCase().includes(q) || String(l.id).includes(q);
      const matchS = status === 'All Status' || l.status === status;
      return matchQ && matchS;
    });
  }, [leads, query, status]);

  const counts = useMemo(() => {
    const base = { Pending: 0, 'On Hold': 0, Distributed: 0, Claimed: 0, Quoted: 0 };
    leads.forEach(l => { base[l.status] = (base[l.status] || 0) + 1; });
    return base;
  }, [leads]);

  const onToggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const onToggleAll = () => setSelected(prev => (prev.length === filtered.length ? [] : filtered.map(l => l.id)));

  const onSaveEdit = () => {
    setLeads(prev => prev.map(l => l.id === editLead.id ? editLead : l));
    setEditLead(null);
  };

  const closeDistribute = () => {
    setShowDistribute(false);
    setDistributeFor(null);
    setSelectedMovers([]);
  };

  const confirmDistribute = () => {
    if (!distributeFor || selectedMovers.length === 0) return;
    setLeads(prev => prev.map(l => l.id === distributeFor.id ? {
      ...l,
      status: 'Distributed',
      distribution: `${selectedMovers.length} mover${selectedMovers.length>1?'s':''}`
    } : l));
    closeDistribute();
  };

  return (
    <div>
      <PageHeader title="Lead Management" subtitle="Control lead workflow and distribution" />

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <SearchBar value={query} onChange={e => setQuery(e.target.value)} placeholder="Search leads by customer, location, or ID..." />
        <div className="min-w-[160px]">
          <div className="relative">
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-300">
              {STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <BulkActions
          selectedCount={selected.length}
          onActivate={() => alert('Hold action')}
          onSuspend={() => alert('Route action')}
          onDelete={() => alert('Distribute action')}
        />
      </div>

      <div className="mb-6">
        <StatusCards counts={counts} />
      </div>

      <LeadsTable
        leads={filtered}
        selected={selected}
        onToggle={onToggle}
        onToggleAll={onToggleAll}
        onEdit={(l) => setEditLead({ ...l })}
        onDistribute={(l) => { setDistributeFor(l); setShowDistribute(true); }}
      />

      <Modal
        isOpen={!!editLead}
        onClose={() => setEditLead(null)}
        title={editLead ? `Edit Lead #${editLead.id}` : ''}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditLead(null)} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button onClick={onSaveEdit} className="px-4 py-2 rounded-lg bg-black text-white">Save Changes</button>
          </div>
        }
      >
        {editLead && (
          <div className="grid gap-3">
            <div>
              <label className="text-sm text-gray-600">Customer Name</label>
              <input value={editLead.customer.name} onChange={e => setEditLead({ ...editLead, customer: { ...editLead.customer, name: e.target.value } })} className="mt-1 w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input value={editLead.customer.email} onChange={e => setEditLead({ ...editLead, customer: { ...editLead.customer, email: e.target.value } })} className="mt-1 w-full border rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-600">Move Type</label>
                <input value={editLead.details.move} onChange={e => setEditLead({ ...editLead, details: { ...editLead.details, move: e.target.value } })} className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select value={editLead.status} onChange={e => setEditLead({ ...editLead, status: e.target.value })} className="mt-1 w-full border rounded-lg px-3 py-2">
                  {['Pending','On Hold','Distributed','Claimed','Quoted'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showDistribute}
        onClose={closeDistribute}
        title={distributeFor ? `Distribute Lead #${distributeFor.id}` : 'Distribute Lead'}
        footer={
          <div className="flex justify-between items-center">
            <button onClick={closeDistribute} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button onClick={confirmDistribute} disabled={selectedMovers.length===0} className={`px-4 py-2 rounded-lg text-white ${selectedMovers.length===0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'}`}>
              Distribute to {selectedMovers.length} Mover{selectedMovers.length===1?'':'s'}
            </button>
          </div>
        }
      >
        <div className="space-y-2">
          {['Premier Moving Co.','Swift Movers LLC','Elite Moving Services','Family First Movers'].map((m,i)=> {
            const checked = selectedMovers.includes(m);
            return (
              <label key={i} className={`flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 ${checked?'border-black':''}`}>
                <input type="checkbox" checked={checked} onChange={() => setSelectedMovers(prev => checked ? prev.filter(x=>x!==m) : [...prev, m])} className="rounded" />
                <div>
                  <div className="font-medium text-gray-800">{m}</div>
                  <div className="text-xs text-gray-500">Professional Plan • 4.8★</div>
                </div>
              </label>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default LeadsManagement;
