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

const MoverProfileModal = ({ isOpen, onClose, profile }) => {

  if (!isOpen) return null;

  // simplified profile: no edit actions

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-w-md mx-auto my-6 md:my-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_30px_120px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col">
          <div className="px-5 md:px-6 py-4 border-b flex items-center justify-between">
            <div>
              <div className="text-lg md:text-xl font-bold text-gray-800">Profile</div>
            </div>
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">✕</button>
          </div>
          <div className="p-10 flex justify-center items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-5xl md:text-6xl">
              {(profile?.business?.company || 'M').slice(0,1).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
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
