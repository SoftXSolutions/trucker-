import { useState } from 'react';

const SectionCard = ({ title, subtitle, icon, color, children, onEdit }) => (
  <div className={`rounded-xl border shadow-[0_10px_35px_rgba(0,0,0,0.10)] overflow-hidden`}
    style={{ borderColor: color }}>
    <div className="flex items-center justify-between px-6 py-4 text-white" style={{ background: color }}>
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <div className="font-semibold text-lg">{title}</div>
          {subtitle && <div className="text-sm text-white/90 mt-0.5">{subtitle}</div>}
        </div>
      </div>
      {onEdit && (
        <button onClick={onEdit} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30 transition-colors">
          <span>✏️</span> Edit
        </button>
      )}
    </div>
    <div className="p-6 bg-white">
      {children}
    </div>
  </div>
);

const EditModal = ({ isOpen, onClose, title, description, children, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.35)] max-h-[90vh] flex flex-col">
        <div className="px-4 py-3 border-b flex items-start justify-between flex-shrink-0">
          <div>
            <div className="font-semibold text-gray-800 text-base">{title}</div>
            {description && <div className="text-xs text-gray-600 mt-0.5">{description}</div>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-100 text-gray-500">✕</button>
        </div>
        <div className="px-4 py-3 space-y-2.5 overflow-y-auto flex-1">{children}</div>
        <div className="px-4 py-2.5 border-t bg-gray-50 flex justify-end gap-2 flex-shrink-0">
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg border text-sm">Cancel</button>
          <button onClick={onSave} className="px-3 py-1.5 rounded-lg bg-black text-white text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const MoverProfileModal = ({ isOpen, onClose, profile, setProfile }) => {
  const [editBusiness, setEditBusiness] = useState(false);
  const [editInsurance, setEditInsurance] = useState(false);
  const [tmp, setTmp] = useState(profile);

  if (!isOpen) return null;

  const saveBusiness = () => {
    setProfile(p => ({ ...p, business: tmp.business }));
    setEditBusiness(false);
  };

  const saveInsurance = () => {
    setProfile(p => ({ ...p, insurance: tmp.insurance }));
    setEditInsurance(false);
  };

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-w-5xl mx-auto my-6 md:my-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_30px_120px_rgba(0,0,0,0.35)] overflow-hidden max-h-[85vh] flex flex-col">
          <div className="px-5 md:px-6 py-4 border-b flex items-start justify-between">
            <div>
              <div className="text-lg md:text-xl font-bold text-gray-800">Company Profile</div>
              <div className="text-sm text-gray-600">Manage your business information and settings</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">Verified</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-28 h-16 rounded-xl border border-blue-200 bg-blue-50 text-center">
                <div>
                  <div className="text-blue-700 text-xl font-bold">100%</div>
                  <div className="text-[11px] text-blue-700">Profile Complete</div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">✕</button>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-6 overflow-y-auto">
            <SectionCard
              title="Business Information"
              subtitle="Your company details and contact information"
              icon="🏢"
              color="#3b82f6"
              onEdit={() => { setTmp(profile); setEditBusiness(true); }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoWithIcon label="COMPANY NAME" value={profile.business.company} />
                <InfoWithIcon label="EMAIL" value={profile.business.email} icon="📧" />
                <InfoWithIcon label="PHONE" value={profile.business.phone} icon="📞" />
                <InfoWithIcon label="WEBSITE" value={profile.business.website} icon="🌐" />
                <InfoWithIcon label="BUSINESS LICENSE" value={profile.business.license} full />
                <InfoWithIcon label="ADDRESS" value={`${profile.business.address}, ${profile.business.city}, ${profile.business.state} ${profile.business.zip}`} icon="📍" full />
                <InfoWithIcon label="EMPLOYEE COUNT" value={profile.business.employees} icon="👥" />
                <InfoWithIcon label="YEARS IN BUSINESS" value={profile.business.years} icon="�" />
              </div>
              <div className="mt-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Company Description</div>
                <div className="text-sm text-gray-700 leading-relaxed">{profile.business.description}</div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TagPanel title="Service Areas" tags={profile.business.serviceAreas} color="blue" />
                <TagPanel title="Specialties" tags={profile.business.specialties} color="yellow" subtle />
              </div>
            </SectionCard>

            <SectionCard title="Insurance & Credentials" color="#10b981" onEdit={() => { setTmp(profile); setEditInsurance(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Info label="DOT Number" value={profile.insurance.dot} />
                <Info label="MC Number" value={profile.insurance.mc} />
                <Info label="Insurance Provider" value={profile.insurance.provider} />
                <Info label="Policy Number" value={profile.insurance.policy} />
                <Info label="Liability Coverage" value={profile.insurance.liability} />
                <Info label="Cargo Coverage" value={profile.insurance.cargo} />
                <Info label="Insurance Expiry Date" value={profile.insurance.expiry} />
              </div>
            </SectionCard>

            <div className="rounded-xl border shadow-[0_10px_35px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className="px-5 py-3 text-white" style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}>
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Subscription Details</div>
                  <button className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30">Upgrade</button>
                </div>
                <div className="text-xs text-white/90">Manage your plan and billing information</div>
              </div>
              <div className="p-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <Info label="Current Plan" value="Professional (Active)" />
                  <Info label="Billing Cycle" value="Monthly" />
                  <Info label="Plan Price" value="$199.00/month" />
                  <Info label="Next Billing Date" value="2025-11-21" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Lead Usage</div>
                    <div className="text-sm font-medium text-gray-800 mb-2">32 / 50</div>
                    <div className="h-2 w-full bg-gray-200 rounded">
                      <div className="h-2 bg-indigo-500 rounded" style={{ width: '64%' }} />
                    </div>
                  </div>
                  <TagPanel title="Plan Features" tags={["Priority lead distribution", "Advanced analytics", "Verified badge", "Custom service area", "24/7 Support"]} color="green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal isOpen={editBusiness} onClose={() => setEditBusiness(false)} title="Edit Business Information" description="Update your company details and business information" onSave={saveBusiness}>
        <div className="grid grid-cols-2 gap-2.5">
          <TwoCol label="Company Name"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.company} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, company: e.target.value } })} /></TwoCol>
          <TwoCol label="Email"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.email} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, email: e.target.value } })} /></TwoCol>
          <TwoCol label="Phone"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.phone} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, phone: e.target.value } })} /></TwoCol>
          <TwoCol label="Website"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.website} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, website: e.target.value } })} /></TwoCol>
          <div className="col-span-2">
            <TwoCol label="Business License"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.license} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, license: e.target.value } })} /></TwoCol>
          </div>
          <div className="col-span-2">
            <TwoCol label="Address"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.address} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, address: e.target.value } })} /></TwoCol>
          </div>
          <TwoCol label="City"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.city} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, city: e.target.value } })} /></TwoCol>
          <TwoCol label="State"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.state} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, state: e.target.value } })} /></TwoCol>
          <div className="col-span-2">
            <TwoCol label="ZIP Code"><input className="w-full border rounded-md px-2.5 py-1.5 text-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.zip} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, zip: e.target.value } })} /></TwoCol>
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 mb-1 font-medium">Company Description</label>
            <textarea className="w-full border rounded-md px-2.5 py-1.5 text-sm h-20 focus:ring-1 focus:ring-blue-300 focus:border-blue-300" value={tmp.business.description} onChange={e => setTmp({ ...tmp, business: { ...tmp.business, description: e.target.value } })} />
          </div>
        </div>
      </EditModal>

      <EditModal isOpen={editInsurance} onClose={() => setEditInsurance(false)} title="Edit Insurance & Credentials" description="Update your insurance and DOT/MC credentials" onSave={saveInsurance}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TwoCol label="DOT Number"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.dot} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, dot: e.target.value } })} /></TwoCol>
          <TwoCol label="MC Number"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.mc} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, mc: e.target.value } })} /></TwoCol>
          <TwoCol label="Insurance Provider"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.provider} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, provider: e.target.value } })} /></TwoCol>
          <TwoCol label="Policy Number"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.policy} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, policy: e.target.value } })} /></TwoCol>
          <TwoCol label="Liability Coverage"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.liability} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, liability: e.target.value } })} /></TwoCol>
          <TwoCol label="Cargo Coverage"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.cargo} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, cargo: e.target.value } })} /></TwoCol>
          <TwoCol label="Insurance Expiry Date"><input className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300" value={tmp.insurance.expiry} onChange={e => setTmp({ ...tmp, insurance: { ...tmp.insurance, expiry: e.target.value } })} /></TwoCol>
        </div>
      </EditModal>
    </div>
  );
};

const Info = ({ label, value, full }) => (
  <div className={`border rounded-lg p-3 ${full ? 'md:col-span-2' : ''}`}>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-sm font-medium text-gray-800">{value || '—'}</div>
  </div>
);

const InfoWithIcon = ({ label, value, icon, full }) => (
  <div className={`bg-gray-50 border border-gray-200 rounded-xl p-4 ${full ? 'md:col-span-2' : ''}`}>
    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</div>
    <div className="flex items-center gap-2">
      {icon && <span className="text-lg">{icon}</span>}
      <div className="text-base font-medium text-gray-800">{value || '—'}</div>
    </div>
  </div>
);

const TagPanel = ({ title, tags, color = 'blue', subtle }) => (
  <div className={`rounded-lg p-3 border ${subtle ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
    <div className="text-sm font-semibold mb-2 text-gray-800">{title}</div>
    <div className="flex flex-wrap gap-2">
      {tags.map((t, i) => (<span key={i} className={`px-2.5 py-1 rounded-full text-xs border ${subtle ? 'bg-yellow-100 border-yellow-300 text-yellow-900' : 'bg-blue-100 border-blue-300 text-blue-900'}`}>{t}</span>))}
    </div>
  </div>
);

const TwoCol = ({ label, children }) => (
  <div>
    <label className="block text-xs text-gray-600 mb-1 font-medium">{label}</label>
    {children}
  </div>
);

export default MoverProfileModal;

// small utility styles
// tailwind classes used in inputs/labels
// .lbl and .input are utility classnames recreated inline
// they rely on Tailwind base classes.
