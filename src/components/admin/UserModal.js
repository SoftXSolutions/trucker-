const UserModal = ({ isOpen, onClose, user, formData, setFormData, onSave, isEdit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit User' : 'Add New User'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {isEdit ? 'Update user information and status' : 'Create a new user account'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name={isEdit ? 'editStatus' : 'status'}
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name={isEdit ? 'editStatus' : 'status'}
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mr-2"
                />
                Inactive
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name={isEdit ? 'editStatus' : 'status'}
                  value="suspended"
                  checked={formData.status === 'suspended'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mr-2"
                />
                Suspended
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={formData.emailVerified}
                onChange={(e) => setFormData({ ...formData, emailVerified: e.target.checked })}
                className="mr-2 rounded"
              />
              Email Verified
            </label>
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={formData.phoneVerified}
                onChange={(e) => setFormData({ ...formData, phoneVerified: e.target.checked })}
                className="mr-2 rounded"
              />
              Phone Verified
            </label>
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
            onClick={onSave}
            className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
