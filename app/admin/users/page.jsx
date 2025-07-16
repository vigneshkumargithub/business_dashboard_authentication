
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function AdminUsersPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);

  const role = session?.user?.user_metadata?.role;

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/login');
    } else {
      fetchUsers();

      const interval = setInterval(fetchUsers, 10000);
      return () => clearInterval(interval);
    }
  }, [role]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin-users', { cache: 'no-store' });
      const result = await res.json();
      if (res.ok) setUsers(result.users);
      else console.error('Error fetching users:', result.error);
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/delete-user?id=${userId}`, { method: 'DELETE' });
      if (res.ok) {
        alert('User deleted successfully!');
        await fetchUsers();
      } else {
        alert('Failed to delete user.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
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
    try {
      const res = await fetch('/api/update-user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, ...editedData }),
      });

      if (res.ok) {
        alert('User updated successfully!');
        await fetchUsers();
        handleCancel();
      } else {
        alert('Failed to update user.');
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>All Registered Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
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
    </div>
  );
}
