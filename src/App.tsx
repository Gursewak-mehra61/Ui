import React, { useState, useMemo } from "react";
import { InputField } from "./components/inputField";
import { DataTable, Column } from "./components/DataTable";

interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  department: string;
}

const users: User[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "Jan 15, 2024",
    department: "IT"
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Lisa Davis",
    email: "lisa@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "Jan 17, 2024",
    department: "HR"
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "Jan 14, 2024",
    department: "Marketing"
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Editor",
    status: "inactive",
    lastLogin: "Jan 16, 2024",
    department: "Design"
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Viewer",
    status: "active",
    lastLogin: "Jan 18, 2024",
    department: "Sales"
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Emily Brown",
    email: "emily@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "Jan 19, 2024",
    department: "Marketing"
  }
];

const columns: Column<User>[] = [
  { key: "user", title: "User", dataIndex: "name", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
  { key: "department", title: "Department", dataIndex: "department", sortable: true },
  { key: "status", title: "Status", dataIndex: "status", sortable: true },
  { key: "lastLogin", title: "Last Login", dataIndex: "lastLogin", sortable: true }
];

export default function Demo() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [userList, setUserList] = useState<User[]>(users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const itemsPerPage = 4;

  // Filter and search functionality
  const filteredUsers = useMemo(() => {
    return userList.filter(user => {
      const matchesSearch = search === '' || 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = role === '' || user.role === role;
      const matchesStatus = status === '' || user.status === status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  // Sorting functionality
  const sortedUsers = useMemo(() => {
    if (!sortField) return filteredUsers;
    
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedUsers, currentPage]);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setRole('');
    setStatus('');
    setCurrentPage(1);
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  const handleEdit = (user: User) => {
  setEditingUser(user);
  setShowEditModal(true);
};

const handleDelete = (user: User) => {
  setUserToDelete(user);
  setShowDeleteModal(true);
};


  const confirmDelete = () => {
    if (userToDelete) {
      setUserList(prev => prev.filter(u => u.id !== userToDelete.id));
      setSelectedRows(prev => prev.filter(u => u.id !== userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const saveUser = (updatedUser: User) => {
    setUserList(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Modern UI Component Library
            </h1>
            <p className="text-gray-600 text-lg">Interactive demonstration with full functionality</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800"> Search & Filter Controls</h2>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <InputField 
              label="Search Users" 
              placeholder="Search by name, email, or department..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              clearable
              leftIcon={<span className="text-gray-400"></span>}
            />
            
            <div>
              <label className="font-medium mb-1 block">Filter by Role</label>
              <select 
                value={role} 
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            
            <div>
              <label className="font-medium mb-1 block">Filter by Status</label>
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users found
              </div>
            </div>
          </div>
        </div>

        {/* InputField Showcase */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6"> InputField Component Showcase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-700 mb-4">Variants</h3>
              <InputField label="Default Variant" placeholder="Default style" />
              <InputField label="Filled Variant" variant="filled" placeholder="Filled style" />
              <InputField label="Ghost Variant" variant="ghost" placeholder="Ghost style" />
            </div>
            
            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-700 mb-4">Sizes</h3>
              <InputField label="Small Size" size="sm" placeholder="Small input" />
              <InputField label="Medium Size" size="md" placeholder="Medium input" />
              <InputField label="Large Size" size="lg" placeholder="Large input" />
            </div>
            
            {/* States */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-700 mb-4">States</h3>
              <InputField label="With Icon" placeholder="Search..." leftIcon={<span></span>} />
              <InputField label="Clearable" placeholder="Type something..." clearable value="Sample text" />
              <InputField label="Error State" placeholder="Invalid input" invalid errorMessage="This field is required" />
            </div>
          </div>
        </div>

        {/* DataTable Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800"> Advanced DataTable</h2>
            <div className="flex gap-3">
              {selectedRows.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                  <button 
                    onClick={clearSelection}
                    className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <DataTable
            columns={columns}
            data={paginatedUsers}
            rowSelection
            onRowSelect={setSelectedRows}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
            renderCell={(row, col) => {
              if (col.key === "user") {
                return (
                  <div className="flex items-center gap-3">
                    <img src={row.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-gray-200" />
                    <div>
                      <div className="font-semibold text-gray-900">{row.name}</div>
                      <div className="text-sm text-gray-500">{row.email}</div>
                    </div>
                  </div>
                );
              }
              if (col.key === "role") {
                const roleColors = {
                  Admin: "bg-purple-100 text-purple-800 border-purple-200",
                  Editor: "bg-blue-100 text-blue-800 border-blue-200",
                  Viewer: "bg-green-100 text-green-800 border-green-200"
                };
                return (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[row.role as keyof typeof roleColors]}`}>
                    {row.role}
                  </span>
                );
              }
              if (col.key === "department") {
                return (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {row.department}
                  </span>
                );
              }
              if (col.key === "status") {
                return (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'active' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {row.status === 'active' ? ' Active' : ' Inactive'}
                  </span>
                );
              }
              return row[col.dataIndex];
            }}
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of {sortedUsers.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features & Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Edit User Form Component Features */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6"> Component Features</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">InputField Capabilities</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Multiple variants & sizes</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Icon support & clearable</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Validation & error states</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> TypeScript support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">DataTable Capabilities</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Sorting & pagination</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Row selection</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Custom cell rendering</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Live Statistics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6"> Live Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{userList.length}</div>
                <div className="text-sm text-blue-600">Total Users</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{userList.filter(u => u.status === 'active').length}</div>
                <div className="text-sm text-green-600">Active Users</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{userList.filter(u => u.role === 'Admin').length}</div>
                <div className="text-sm text-purple-600">Admins</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{selectedRows.length}</div>
                <div className="text-sm text-orange-600">Selected</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-700 mb-3">Current Filters</h4>
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Search: {search}
                  </span>
                )}
                {role && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                    Role: {role}
                  </span>
                )}
                {status && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Status: {status}
                  </span>
                )}
                {!search && !role && !status && (
                  <span className="text-gray-500 text-sm">No filters applied</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h3>
            <EditUserForm 
              user={editingUser} 
              onSave={saveUser} 
              onCancel={() => {
                setShowEditModal(false);
                setEditingUser(null);
              }} 
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 2v2M10 2v2m-7 2h14"/>
                  <path d="M4 6v8c0 1 1 2 2 2h4c1 0 2-1 2-2V6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete User</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">{userToDelete.name}</span>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit User Form Component
interface EditUserFormProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);
  const [errors, setErrors] = useState<Partial<User>>({});

  const validateForm = () => {
    const newErrors: Partial<User> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Full Name"
        value={formData.name}
        onChange={e => handleChange('name', e.target.value)}
        invalid={!!errors.name}
        errorMessage={errors.name}
        placeholder="Enter full name"
      />
      
      <InputField
        label="Email Address"
        value={formData.email}
        onChange={e => handleChange('email', e.target.value)}
        invalid={!!errors.email}
        errorMessage={errors.email}
        placeholder="Enter email address"
      />
      
      <div>
        <label className="font-medium mb-1 block">Role</label>
        <select 
          value={formData.role} 
          onChange={e => handleChange('role', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
      
      <InputField
        label="Department"
        value={formData.department}
        onChange={e => handleChange('department', e.target.value)}
        invalid={!!errors.department}
        errorMessage={errors.department}
        placeholder="Enter department"
      />
      
      <div>
        <label className="font-medium mb-1 block">Status</label>
        <select 
          value={formData.status} 
          onChange={e => handleChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
