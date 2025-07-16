

'use client';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './dashboard.css';

export default function Dashboard() {
  const { session } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const email = session?.user?.email ?? 'Unknown';
  const role = session?.user?.user_metadata?.role ?? 'user';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin-users');
    const result = await res.json();

    if (res.ok) setUsers(result.users);
    else console.error('Error fetching users:', result.error);

    setLoading(false);
  };

  useEffect(() => {
    if (role === 'admin') fetchUsers();
  }, [role]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/delete-user?id=${userId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('User deleted successfully!');
      await fetchUsers(); // Refresh
    } else {
      alert('Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedData({ email: user.email, role: user.user_metadata?.role || 'user' });
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedData({});
  };

  const handleSave = async (userId) => {
    const res = await fetch('/api/update-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, ...editedData }),
    });

    if (res.ok) {
      alert('User updated successfully!');
      fetchUsers();
      handleCancel();
    } else {
      alert('Failed to update user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-title">Dashboard</div>
        <div className="nav-info">
          <span>Email: {email}</span>
          <span>Role: {role}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Welcome, {email}!</h2>
        <p>You are logged in as <strong>{role}</strong>.</p>

        {role === 'admin' && (
          <>
            <h3 style={{ marginTop: '20px' }}>All Registered Users</h3>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <table border="1" cellPadding="10" style={{ marginTop: '10px', width: '100%' }}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>User ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isEditing = editingUserId === user.id;

                    return (
                      <tr key={user.id}>
                        <td>
                          {isEditing ? (
                            <input
                              type="text"
                              name="email"
                              value={editedData.email}
                              onChange={handleChange}
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <select
                              name="role"
                              value={editedData.role}
                              onChange={handleChange}
                            >
                              <option value="admin">admin</option>
                              <option value="user">user</option>
                            </select>
                          ) : (
                            user.user_metadata?.role || 'N/A'
                          )}
                        </td>
                        <td>{user.id}</td>
                        <td>
                          {isEditing ? (
                            <>
                              <button onClick={() => handleSave(user.id)}>Save</button>
                              <button onClick={handleCancel}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(user)}>Edit</button>
                              <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
