const UserTable = ({ users, onEdit, onDelete, selectedUsers, onSelectUser, onSelectAll }) => {
  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="bg-white rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_34px_rgba(0,0,0,0.10)] transition-all border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={allSelected}
                  ref={input => {
                    if (input) {
                      input.indeterminate = someSelected;
                    }
                  }}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Verification
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Leads
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{user.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-black text-white' :
                    user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      user.emailVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {user.emailVerified ? '✓' : '✗'}
                    </span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      user.phoneVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {user.phoneVerified ? '✓' : '✗'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.leads}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.lastActive}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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

export default UserTable;
