import { useState, useRef } from 'react';

const TabButton = ({ id, active, setActive, icon, label }) => (
  <button
    onClick={() => setActive(id)}
    className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
      active === id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-600 hover:text-gray-800'
    }`}
  >
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
  </button>
);

const Modal = ({ open, onClose, title, children, onPrimary, primaryLabel = 'Save' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="font-semibold text-gray-800">{title}</div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-100">✕</button>
        </div>
        <div className="p-4 space-y-3">{children}</div>
        <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-lg border">Cancel</button>
          <button onClick={onPrimary} className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white">{primaryLabel}</button>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, children, action }) => (
  <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
    <div className="flex items-center justify-between p-4 md:p-5 border-b">
      <h3 className="text-lg md:text-xl font-bold text-gray-800">{title}</h3>
      {action}
    </div>
    <div className="p-4 md:p-6">{children}</div>
  </div>
);

const ToggleField = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between gap-4 p-3 border rounded-lg bg-white">
    <span className="text-sm text-gray-800">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-orange-500' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  </label>
);

const NotifRow = ({ title, subtitle, value, onChange }) => (
  <div className="px-4 py-3 flex items-center justify-between gap-6">
    <div>
      <div className="text-sm font-medium text-gray-800">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-orange-500' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  </div>
);

const EmptyState = ({ title, subtitle, ctaLabel, onCta }) => (
  <div className="text-center py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-white rounded-xl border border-orange-100">
    <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">⚙️</div>
    <div className="text-lg font-semibold text-gray-800 mb-1">{title}</div>
    <div className="text-sm text-gray-600 mb-4">{subtitle}</div>
    {onCta && (
      <button onClick={onCta} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm">
        {ctaLabel}
      </button>
    )}
  </div>
);

const BusinessProfile = () => {
  const [subTab, setSubTab] = useState('profile');
  const [leftSection, setLeftSection] = useState('business');
  const [bizForm, setBizForm] = useState({
    name: 'Atlas Logistics Services, LLC',
    description: 'Atlas Logistics Services, LLC proudly serves our customers with pride, integrity, and attention to the details that matter most to you. This is one of the many things that set us apart from the rest. We are locally owned and operated. Please give us a call today!\n\nWe only specialize in full house moves and no one item or short distance moves.',
    website: 'http://www.atlaslogisticsservices.com',
    location: 'San Francisco, CA',
    features: {
      emergency: false,
      bilingual: true,
      creditCard: true,
      freeEstimates: true,
      tripCharge: true,
      residential: true,
      commercial: true,
      smallJobs: false,
      veteranOwned: false,
      warranty: false
    },
    warrantyDescription: ''
  });
  const [logo, setLogo] = useState(null);
  const logoInputRef = useRef(null);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);
  const triggerLogoUpload = () => logoInputRef.current?.click();
  const onLogoSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|jpg|png|gif)/i.test(file.type)) return;
    const url = URL.createObjectURL(file);
    setLogo(url);
  };
  const [insurances, setInsurances] = useState([
    { description: 'Automotive - NJH Agency LLC', amount: '1500000', expiration: '2026-06-23', contact: '(973) 391-2956', policy: '9819504498' },
  ]);
  const [licenses, setLicenses] = useState([
    { description: 'Household Goods Mover - Out of State', state: 'NJ', expiration: '2026-04-09', licenseNo: '4320223' },
  ]);

  const [newInsurance, setNewInsurance] = useState({ description: '', amount: '', expiration: '', contact: '', policy: '' });
  const insuranceTypes = [
    'General Liability',
    "Worker's Compensation",
    'Bonding',
    'Other',
    'Umbrella Liability',
    'Automotive',
    'Commercial Property',
    'Errors & Omissions',
    'Cargo',
    'Movers Liability'
  ];
  const [showInsModal, setShowInsModal] = useState(false);
  const [insForm, setInsForm] = useState({
    type: 'General Liability',
    agencyName: '',
    agencyContact: '',
    agencyPhone: '',
    policyName: '',
    policyNumber: '',
    expiration: '',
    amount: ''
  });
  const usStates = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const licenseTypes = ['Household Goods Mover - In State','Household Goods Mover - Out of State','US DOT','Local Business License','Other'];
  const [showLicModal, setShowLicModal] = useState(false);
  const [licForm, setLicForm] = useState({ state: 'NJ', type: 'Household Goods Mover - Out of State', licenseNo: '', name: '', expiration: '' });
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Atlas LOGISTICS', email: 'atlaslogisticsservicesllc@gmail.com', type: 'Admin' },
    { name: 'Karim Hassan', email: 'atlaslogisticsservicesllc@gmail.com', type: 'Admin' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', type: 'Admin' });
  const [notifTab, setNotifTab] = useState('email');
  const [emails, setEmails] = useState([
    { name: 'Primary', email: 'atlaslogisticsservicesllc@gmail.com', settings: { leads: true, messages: true, invoices: true } },
    { name: 'Billing', email: 'info@atlaslogisticsservices.com', settings: { leads: false, messages: true, invoices: true } },
  ]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailEditIndex, setEmailEditIndex] = useState(-1);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', settings: { leads: true, messages: true, invoices: true } });
  const [numbers, setNumbers] = useState([
    { name: 'Joseph', phone: '(201) 577-6894' },
    { name: 'Meredith', phone: '(201) 900-3089' },
  ]);
  const [showNumber, setShowNumber] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [numberForm, setNumberForm] = useState({ name: '', phone: '' });

  const addInsurance = () => {
    if (!insForm.type || !insForm.agencyName || !insForm.policyNumber || !insForm.expiration) return;
    const entry = {
      description: `${insForm.type} - ${insForm.agencyName}`,
      amount: insForm.amount,
      expiration: insForm.expiration,
      contact: `${insForm.agencyContact || ''} ${insForm.agencyPhone || ''}`.trim(),
      policy: insForm.policyNumber
    };
    setInsurances([...insurances, entry]);
    setShowInsModal(false);
    setInsForm({ type: 'General Liability', agencyName: '', agencyContact: '', agencyPhone: '', policyName: '', policyNumber: '', expiration: '', amount: '' });
  };

  const addLicense = () => {
    if (!licForm.state || !licForm.type || !licForm.licenseNo || !licForm.name || !licForm.expiration) return;
    const entry = {
      description: `${licForm.type} ${licForm.name ? '- ' + licForm.name : ''}`.trim(),
      state: licForm.state,
      expiration: licForm.expiration,
      licenseNo: licForm.licenseNo
    };
    setLicenses([...licenses, entry]);
    setShowLicModal(false);
    setLicForm({ state: 'NJ', type: 'Household Goods Mover - Out of State', licenseNo: '', name: '', expiration: '' });
  };

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    setTeamMembers([...teamMembers, newMember]);
    setNewMember({ name: '', email: '', type: 'Staff' });
    setShowAdd(false);
  };

  const openAddNumber = () => {
    setEditingIndex(-1);
    setNumberForm({ name: '', phone: '' });
    setShowNumber(true);
  };

  const openEditNumber = (idx) => {
    setEditingIndex(idx);
    setNumberForm(numbers[idx]);
    setShowNumber(true);
  };

  const saveNumber = () => {
    if (!numberForm.name || !numberForm.phone) return;
    if (editingIndex === -1) {
      setNumbers([...numbers, numberForm]);
    } else {
      const copy = [...numbers];
      copy[editingIndex] = numberForm;
      setNumbers(copy);
    }
    setShowNumber(false);
    setEditingIndex(-1);
    setNumberForm({ name: '', phone: '' });
  };

  const openAddEmail = () => {
    setEmailEditIndex(-1);
    setEmailForm({ name: '', email: '', settings: { leads: true, messages: true, invoices: true } });
    setShowEmailModal(true);
  };

  const openEditEmail = (idx) => {
    setEmailEditIndex(idx);
    setEmailForm(emails[idx]);
    setShowEmailModal(true);
  };

  const saveEmail = () => {
    if (!emailForm.email) return;
    if (emailEditIndex === -1) setEmails([...emails, emailForm]);
    else {
      const copy = [...emails];
      copy[emailEditIndex] = emailForm;
      setEmails(copy);
    }
    setShowEmailModal(false);
    setEmailEditIndex(-1);
  };

  return (
    <div>
      {/* Sub Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <div className="flex gap-4 md:gap-6 px-3 md:px-4"> 
          <TabButton
            id="profile"
            active={subTab}
            setActive={setSubTab}
            label="Business profile"
            icon={<svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/><path d="M6 8h8v2H6V8zm0 4h8v2H6v-2z"/></svg>}
          />
          <TabButton
            id="notification"
            active={subTab}
            setActive={setSubTab}
            label="Notification"
            icon={<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>}
          />
          <TabButton
            id="team"
            active={subTab}
            setActive={setSubTab}
            label="Manage team"
            icon={<svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7a3 3 0 11-6 0 3 3 0 016 0z"/><path fillRule="evenodd" d="M2 13.5A4.5 4.5 0 016.5 9h7A4.5 4.5 0 0118 13.5V15a1 1 0 01-1 1H3a1 1 0 01-1-1v-1.5z" clipRule="evenodd"/></svg>}
          />
          <TabButton
            id="numbers"
            active={subTab}
            setActive={setSubTab}
            label="Connected numbers"
            icon={<svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>}
          />
        </div>
      </div>

      <div className="mt-6">
        {subTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left sidebar menu */}
            <div className="md:col-span-3 space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    {logo ? (
                      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm text-gray-500">LOGO</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-800 truncate">{bizForm.name}</div>
                    <button onClick={()=>setShowCompanyProfile(true)} className="text-blue-600 text-sm hover:underline">View my profile</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-800 mb-2">Profile completion</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{width:'50%'}} />
                </div>
                <div className="mt-2 text-xs text-gray-600">Complete your profile</div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-3">
                <div className="text-sm font-semibold text-gray-800 px-2 py-2">Business details</div>
                <div className="flex flex-col text-sm">
                  <button onClick={()=>setLeftSection('business')} className={`text-left px-2 py-2 rounded ${leftSection==='business' ? 'text-orange-600 font-semibold' : 'text-blue-700 hover:underline'}`}>Business details</button>
                  <button onClick={()=>setLeftSection('insurance')} className={`text-left px-2 py-2 rounded ${leftSection==='insurance' ? 'text-orange-600 font-semibold' : 'text-blue-700 hover:underline'}`}>Insurance and licensing</button>
                  <button onClick={()=>setLeftSection('about')} className={`text-left px-2 py-2 rounded ${leftSection==='about' ? 'text-orange-600 font-semibold' : 'text-blue-700 hover:underline'}`}>About</button>
                  <button onClick={()=>setLeftSection('account')} className={`text-left px-2 py-2 rounded ${leftSection==='account' ? 'text-orange-600 font-semibold' : 'text-blue-700 hover:underline'}`}>Account details</button>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="md:col-span-9 space-y-6">
              {leftSection === 'business' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-4 md:p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Business details</h2>
                  </div>
                  <div className="p-4 md:p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Business name</label>
                      <input value={bizForm.name} onChange={(e)=>setBizForm({...bizForm, name:e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Business description</label>
                      <textarea rows={5} value={bizForm.description} onChange={(e)=>setBizForm({...bizForm, description:e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Website</label>
                      <input value={bizForm.website} onChange={(e)=>setBizForm({...bizForm, website:e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-800 mb-1">Check all that apply:</div>
                        {[
                          ['emergency','Emergency service provided'],
                          ['bilingual','Bilingual'],
                          ['creditCard','Credit card accepted'],
                          ['freeEstimates','Free estimates'],
                          ['tripCharge','Trip charge'],
                          ['residential','Residential'],
                          ['commercial','Commercial'],
                          ['smallJobs','Small jobs welcome'],
                          ['veteranOwned','Veteran owned'],
                          ['warranty','Warranty offered']
                        ].map(([key,label])=> (
                          <label key={key} className="flex items-center gap-2 text-sm text-gray-800">
                            <input type="checkbox" checked={bizForm.features[key]} onChange={(e)=>setBizForm({...bizForm, features:{...bizForm.features, [key]: e.target.checked}})} />
                            {label}
                          </label>
                        ))}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 mb-2">Upload company logo</div>
                        <button type="button" onClick={triggerLogoUpload} className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-800 hover:bg-gray-50">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 16a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-3l-2-2H5a2 2 0 00-2 2v10z"/></svg>
                          Upload
                        </button>
                        <div className="mt-2 text-xs text-gray-500">Minimum size: 300 x 300 pixels</div>
                        <div className="text-xs text-gray-500">Accepted file types: JPG/JPEG, PNG, GIF</div>
                        <input ref={logoInputRef} onChange={onLogoSelected} type="file" accept="image/png,image/jpeg,image/jpg,image/gif" className="hidden" />
                        {logo && (
                          <img src={logo} alt="Logo preview" className="mt-3 w-24 h-24 object-contain rounded border" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Warranty description</label>
                      <input value={bizForm.warrantyDescription} onChange={(e)=>setBizForm({...bizForm, warrantyDescription:e.target.value})} className="w-full border rounded-md px-3 py-2" />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">Save</button>
                    </div>
                  </div>
                </div>
              )}

              {leftSection === 'insurance' && (
                <>
                  <SectionCard title="Insurances" action={<button onClick={() => setShowInsModal(true)} className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">Add new insurance</button>}>
                    <div className="overflow-auto -mx-4 md:mx-0">
                      <table className="min-w-[640px] w-full">
                        <thead>
                          <tr className="bg-orange-600 text-white text-sm">
                            <th className="text-left py-3 px-4 rounded-tl-lg">Description</th>
                            <th className="text-left py-3 px-4">Amount</th>
                            <th className="text-left py-3 px-4">Expiration Date</th>
                            <th className="text-right py-3 px-4 rounded-tr-lg">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {insurances.map((ins, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 px-4">
                                <div className="text-gray-800 font-medium">{ins.description}</div>
                                <div className="text-xs text-gray-500">Contact: {ins.contact || '—'}</div>
                                <div className="text-xs text-gray-500">Policy: {ins.policy || '—'}</div>
                              </td>
                              <td className="py-3 px-4 text-gray-800">{ins.amount}</td>
                              <td className="py-3 px-4 text-gray-800">{ins.expiration}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-end">
                                  <button className="text-orange-600 hover:text-orange-700 text-sm">Update</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>

                  {/* Add Insurance Modal */}
                  <Modal open={showInsModal} onClose={() => setShowInsModal(false)} title="Add insurance" onPrimary={addInsurance} primaryLabel="Add">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">Type of insurance (required)</label>
                      <select value={insForm.type} onChange={(e)=>setInsForm({ ...insForm, type: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm">
                        {insuranceTypes.map((t)=> (<option key={t}>{t}</option>))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Agency name (required)</label>
                        <input value={insForm.agencyName} onChange={(e)=>setInsForm({ ...insForm, agencyName: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Agency name" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Agency contact</label>
                        <input value={insForm.agencyContact} onChange={(e)=>setInsForm({ ...insForm, agencyContact: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Contact person" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Agency phone</label>
                        <input value={insForm.agencyPhone} onChange={(e)=>setInsForm({ ...insForm, agencyPhone: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="(201) 555-0123" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Name on policy</label>
                        <input value={insForm.policyName} onChange={(e)=>setInsForm({ ...insForm, policyName: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Company or person" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Policy number (required)</label>
                        <input value={insForm.policyNumber} onChange={(e)=>setInsForm({ ...insForm, policyNumber: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Policy #" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Expiration date (required)</label>
                        <input value={insForm.expiration} onChange={(e)=>setInsForm({ ...insForm, expiration: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="YYYY-MM-DD" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-gray-600 mb-1 font-medium">Coverage amount</label>
                        <input value={insForm.amount} onChange={(e)=>setInsForm({ ...insForm, amount: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="$1,000,000" />
                      </div>
                    </div>
                  </Modal>

                  <SectionCard title="Licensing" action={<button onClick={() => setShowLicModal(true)} className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">Add new license</button>}>
                    <div className="overflow-auto -mx-4 md:mx-0">
                      <table className="min-w-[640px] w-full">
                        <thead>
                          <tr className="bg-orange-600 text-white text-sm">
                            <th className="text-left py-3 px-4 rounded-tl-lg">Description</th>
                            <th className="text-left py-3 px-4">State</th>
                            <th className="text-left py-3 px-4">Expiration Date</th>
                            <th className="text-right py-3 px-4 rounded-tr-lg">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {licenses.map((lic, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3 px-4">
                                <div className="text-gray-800 font-medium">{lic.description}</div>
                                <div className="text-xs text-gray-500">License number: {lic.licenseNo || '—'}</div>
                              </td>
                              <td className="py-3 px-4 text-gray-800">{lic.state}</td>
                              <td className="py-3 px-4 text-gray-800">{lic.expiration}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-end">
                                  <button className="text-orange-600 hover:text-orange-700 text-sm">Update</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>

                  {/* Add License Modal */}
                  <Modal open={showLicModal} onClose={() => setShowLicModal(false)} title="Add license" onPrimary={addLicense} primaryLabel="Add">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">State (required)</label>
                      <select value={licForm.state} onChange={(e)=>setLicForm({ ...licForm, state: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm">
                        {usStates.map((s)=> (<option key={s}>{s}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">License type (required)</label>
                      <select value={licForm.type} onChange={(e)=>setLicForm({ ...licForm, type: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm">
                        {licenseTypes.map((t)=> (<option key={t}>{t}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">License number (required)</label>
                      <input value={licForm.licenseNo} onChange={(e)=>setLicForm({ ...licForm, licenseNo: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="License number" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">Name on license (required)</label>
                      <input value={licForm.name} onChange={(e)=>setLicForm({ ...licForm, name: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Company or person" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">Expiration date (required)</label>
                      <input value={licForm.expiration} onChange={(e)=>setLicForm({ ...licForm, expiration: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="YYYY-MM-DD" />
                    </div>
                  </Modal>
                </>
              )}

              {leftSection === 'about' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-4 md:p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">About</h2>
                  </div>
                  <div className="p-4 md:p-6 space-y-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-gray-800 mb-1">Mover location</div>
                      <div className="text-sm text-gray-700">{bizForm.location}</div>
                    </div>
                    <label className="block text-sm font-medium text-gray-800">About your business</label>
                    <textarea rows={8} className="w-full border rounded-md px-3 py-2" placeholder="Tell customers about your business, experience, and values..." />
                    <div className="pt-2 flex justify-end">
                      <button className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">Save</button>
                    </div>
                  </div>
                </div>
              )}

              {leftSection === 'account' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-4 md:p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Account details</h2>
                  </div>
                  <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="text-xs text-gray-500 mb-1">Company name</div>
                        <div className="text-sm font-medium text-gray-800">{bizForm.name}</div>
                      </div>
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="text-xs text-gray-500 mb-1">Account email</div>
                        <div className="text-sm font-medium text-gray-800">{emails[0]?.email || '—'}</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Account email</label>
                      <input className="w-full border rounded-md px-3 py-2" placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
                      <input className="w-full border rounded-md px-3 py-2" placeholder="(201) 555-0123" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-800 mb-1">Address</label>
                      <input className="w-full border rounded-md px-3 py-2" placeholder="Street, City, State, ZIP" />
                    </div>
                    <div className="md:col-span-2 pt-2 flex justify-end">
                      <button className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <Modal open={showCompanyProfile} onClose={()=>setShowCompanyProfile(false)} title="Company profile" onPrimary={()=>setShowCompanyProfile(false)} primaryLabel="Close">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {logo ? <img src={logo} alt="Logo" className="w-full h-full object-cover"/> : <span className="text-sm text-gray-500">LOGO</span>}
            </div>
            <div className="font-semibold text-gray-800">{bizForm.name}</div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">Website</label>
            <a href={bizForm.website} target="_blank" rel="noreferrer" className="text-blue-600 break-all">{bizForm.website}</a>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">About</label>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{bizForm.description}</div>
          </div>
        </Modal>

        {subTab === 'notification' && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800">Notification preferences</h2>

            {/* Notification sub tabs */}
            <div className="bg-white border rounded-lg overflow-x-auto">
              <div className="flex gap-4 px-3">
                <TabButton id="email" active={notifTab} setActive={setNotifTab} label="Email" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>} />
                <TabButton id="phone" active={notifTab} setActive={setNotifTab} label="Phone call" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>} />
                <TabButton id="sms" active={notifTab} setActive={setNotifTab} label="Text messaging" icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17 8c0 3.866-3.582 7-8 7a8.94 8.94 0 01-4-.938L1 15l.938-4A8.94 8.94 0 011 8c0-3.866 3.582-7 8-7s8 3.134 8 7z"/></svg>} />
              </div>
            </div>

            {notifTab === 'email' && (
              <div className="space-y-4">
                {emails.map((e, idx) => (
                  <div key={idx} className="bg-white rounded-xl border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                      <div className="text-lg font-semibold text-gray-800">{e.email}</div>
                      <div className="flex items-center gap-3 text-sm">
                        <button onClick={() => openEditEmail(idx)} className="text-orange-600 hover:text-orange-700">Edit</button>
                        <button onClick={() => setEmails(emails.filter((_, i) => i !== idx))} className="text-red-600 hover:text-red-700">Delete</button>
                      </div>
                    </div>
                    <div className="divide-y">
                      <NotifRow title="Leads and Opportunities" subtitle="Every time you get a new lead or Opportunity, we'll email you." value={e.settings.leads} onChange={(v)=>{
                        const copy=[...emails]; copy[idx] = { ...copy[idx], settings: { ...copy[idx].settings, leads: v } }; setEmails(copy);
                      }} />
                      <NotifRow title="Messages from customers" subtitle="We'll send you an email when you have new messages from customers." value={e.settings.messages} onChange={(v)=>{
                        const copy=[...emails]; copy[idx] = { ...copy[idx], settings: { ...copy[idx].settings, messages: v } }; setEmails(copy);
                      }} />
                      <NotifRow title="Invoice alerts" subtitle="We'll email you when a payment is due." value={e.settings.invoices} onChange={(v)=>{
                        const copy=[...emails]; copy[idx] = { ...copy[idx], settings: { ...copy[idx].settings, invoices: v } }; setEmails(copy);
                      }} />
                    </div>
                  </div>
                ))}

                <button onClick={openAddEmail} className="w-full border-2 border-dashed border-orange-300 hover:bg-orange-50 text-orange-700 rounded-lg py-3 text-sm">+ Add email address</button>

                <div className="bg-white rounded-xl border p-4">
                  <div className="text-lg font-semibold text-gray-800 mb-1">Newsletter subscriptions</div>
                  <p className="text-sm text-gray-600 mb-3">Stay up to date on industry trends, offers, and product updates.</p>
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">Subscription settings</button>
                </div>

                <Modal open={showEmailModal} onClose={() => setShowEmailModal(false)} title={emailEditIndex === -1 ? 'Add email address' : 'Edit email address'} onPrimary={saveEmail} primaryLabel={emailEditIndex === -1 ? 'Add' : 'Save'}>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1 font-medium">Label</label>
                    <input value={emailForm.name} onChange={(e)=>setEmailForm({ ...emailForm, name: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="e.g. Primary" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1 font-medium">Email</label>
                    <input value={emailForm.email} onChange={(e)=>setEmailForm({ ...emailForm, email: e.target.value })} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="email@example.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <ToggleField label="Leads and Opportunities" checked={emailForm.settings.leads} onChange={(v)=>setEmailForm({ ...emailForm, settings: { ...emailForm.settings, leads: v } })} />
                    <ToggleField label="Messages from customers" checked={emailForm.settings.messages} onChange={(v)=>setEmailForm({ ...emailForm, settings: { ...emailForm.settings, messages: v } })} />
                    <ToggleField label="Invoice alerts" checked={emailForm.settings.invoices} onChange={(v)=>setEmailForm({ ...emailForm, settings: { ...emailForm.settings, invoices: v } })} />
                  </div>
                </Modal>
              </div>
            )}

            {notifTab !== 'email' && (
              <EmptyState title="Coming soon" subtitle="Configure {phone calls / text messaging} notifications here." ctaLabel="Okay" onCta={()=>{}} />
            )}
          </div>
        )}

        {subTab === 'team' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Manage your team</h2>
              <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm">Add team member</button>
            </div>
            <p className="text-sm text-gray-600">Add your team members and set their permissions for your business account.</p>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <div className="overflow-auto">
                <table className="min-w-[600px] w-full">
                  <thead>
                    <tr className="bg-orange-600 text-white text-sm">
                      <th className="text-left py-3 px-4 rounded-tl-lg">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-right py-3 px-4 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {teamMembers.map((m, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-3 px-4 text-gray-800">{m.name}</td>
                        <td className="py-3 px-4 text-gray-800">{m.email}</td>
                        <td className="py-3 px-4 text-gray-800">{m.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <button className="px-2 py-1 text-orange-600 hover:text-orange-700">Edit</button>
                            <button onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== idx))} className="px-2 py-1 text-red-600 hover:text-red-700">Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 text-xs text-gray-500 border-t bg-gray-50">Showing 1-{teamMembers.length} of {teamMembers.length} results</div>
            </div>

            <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add team member" onPrimary={addMember} primaryLabel="Add">
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Name</label>
                <input value={newMember.name} onChange={(e)=>setNewMember({...newMember, name:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Email</label>
                <input value={newMember.email} onChange={(e)=>setNewMember({...newMember, email:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Type</label>
                <select value={newMember.type} onChange={(e)=>setNewMember({...newMember, type:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </Modal>
          </div>
        )}

        {subTab === 'numbers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Connected numbers</h2>
                <p className="text-sm text-gray-600">Manage all of the phone numbers you use to call and text customers.</p>
                <p className="text-sm text-gray-600 mt-1">Looking for your notifications preferences phone number? Go to <span className="text-orange-600 font-medium">notifications</span>.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Manage multiple numbers</button>
                <button onClick={openAddNumber} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm">Add number</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <div className="overflow-auto">
                <table className="min-w-[600px] w-full">
                  <thead>
                    <tr className="bg-orange-600 text-white text-sm">
                      <th className="text-left py-3 px-4 rounded-tl-lg">Name</th>
                      <th className="text-left py-3 px-4">Phone</th>
                      <th className="text-right py-3 px-4 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {numbers.map((n, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-3 px-4 text-gray-800">{n.name}</td>
                        <td className="py-3 px-4 text-gray-800">{n.phone}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => openEditNumber(idx)} className="text-orange-600 hover:text-orange-700">Edit</button>
                            <button onClick={() => setNumbers(numbers.filter((_, i) => i !== idx))} className="text-red-600 hover:text-red-700">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 text-xs text-gray-500 border-t bg-gray-50">Showing 1-{numbers.length} of {numbers.length} results</div>
            </div>

            <Modal open={showNumber} onClose={() => setShowNumber(false)} title={editingIndex === -1 ? 'Add number' : 'Edit number'} onPrimary={saveNumber} primaryLabel={editingIndex === -1 ? 'Add' : 'Save'}>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Name</label>
                <input value={numberForm.name} onChange={(e)=>setNumberForm({...numberForm, name:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Contact name" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Phone</label>
                <input value={numberForm.phone} onChange={(e)=>setNumberForm({...numberForm, phone:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="(201) 555-0123" />
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessProfile;

