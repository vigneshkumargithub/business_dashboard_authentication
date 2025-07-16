// // 'use client';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // export default function AdminBusinessList() {
// //   const [businesses, setBusinesses] = useState([]);

// //   useEffect(() => {
// //     axios.get('/api/businesses').then(res => setBusinesses(res.data));
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Business List</h1>
// //       {businesses.map(b => (
// //         <div key={b.id}>{b.name}</div>
// //       ))}
// //     </div>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "@/components/AuthProvider";
// import { useRouter } from "next/navigation";

// export default function AdminBusinessList() {
//   const [businesses, setBusinesses] = useState([]);
//   const { session } = useAuth();
//   const router = useRouter();

//   const isAdmin = session?.user?.user_metadata?.role === "admin";

//   useEffect(() => {
//     if (!isAdmin) {
//       router.push("/dashboard");
//       return;
//     }

//     axios
//       .get("/api/businesses")
//       .then((res) => setBusinesses(res.data))
//       .catch((err) => console.error("Fetch error", err));
//   }, [session]);

//   return (
//     <div>
//       <h1>Business List</h1>
//       {businesses.map((b) => (
//         <div key={b.id} className="border p-2 my-2">
//           <strong>{b.name}</strong>
//           <p>{b.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

///////////// new////

// 'use client';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminUserList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('/api/admin/users').then(res => {
//       setUsers(res.data);
//     });
//   }, []);

//   const deleteUser = async (id) => {
//     const confirmed = confirm("Are you sure you want to delete this user?");
//     if (!confirmed) return;

//     await axios.delete(`/api/admin/users/${id}`);
//     setUsers(users.filter(user => user.id !== id));
//   };

//   return (
//     <div>
//       <h1>All Users (Admin)</h1>
//       {users.map(user => (
//         <div key={user.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
//           <p><strong>Email:</strong> {user.email}</p>
//           <button onClick={() => deleteUser(user.id)}>Delete User</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@/components/AuthProvider"; // 👈 import your custom auth hook

// export default function AdminUserList() {
//   const { session } = useAuth();
//   const router = useRouter();
//   const [users, setUsers] = useState([]);

//   // ✅ Redirect non-admins
//   useEffect(() => {
//     if (session && session.user.user_metadata.role !== "admin") {
//       router.push("/not-authorized"); // Or use '/' or '/login'
//     }
//   }, [session]);

//   // ✅ Fetch user list if admin
//   useEffect(() => {
//     if (session?.user?.user_metadata?.role === "admin") {
//       axios.get("/api/admin/users").then((res) => setUsers(res.data));
//     }
//   }, [session]);

//   const deleteUser = async (id) => {
//     const confirmed = confirm("Are you sure you want to delete this user?");
//     if (!confirmed) return;

//     await axios.delete(`/api/admin/users/${id}`);
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div>
//       <h1>All Users (Admin)</h1>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}
//         >
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <button onClick={() => deleteUser(user.id)}>Delete User</button>
//         </div>
//       ))}
//     </div>
//   );
// }






// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@/components/AuthProvider";

// export default function AdminUserList() {
//   const { session } = useAuth();
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [newEmail, setNewEmail] = useState("");

//   // 🔒 Redirect non-admins
//   useEffect(() => {
//     if (session && session.user.user_metadata.role !== "admin") {
//       router.push("/not-authorized");
//     }
//   }, [session]);

//   // 📦 Fetch users (paginated server)
//   useEffect(() => {
//     if (session?.user?.user_metadata?.role === "admin") {
//       fetchUsers();
//     }
//   }, [session]);

//   const fetchUsers = async () => {
//     const res = await axios.get("/api/admin/users");
//     setUsers(res.data);
//   };

//   const deleteUser = async (id) => {
//     const confirmed = confirm("Are you sure you want to delete this user?");
//     if (!confirmed) return;

//     await axios.delete(`/api/admin/users/${id}`);
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   const startEditing = (user) => {
//     setEditingUser(user.id);
//     setNewEmail(user.email);
//   };

//   const cancelEditing = () => {
//     setEditingUser(null);
//     setNewEmail("");
//   };

//   const updateUser = async (id) => {
//     try {
//       await axios.patch(`/api/admin/users/${id}`, { email: newEmail });
//       setUsers(users.map((u) => (u.id === id ? { ...u, email: newEmail } : u)));
//       setEditingUser(null);
//     } catch (err) {
//       alert("Failed to update user");
//     }
//   };

//   return (
//     <div>
//       <h1>All Users (Admin)</h1>
//       {users.map((user) => (
//         <div
//           key={user.id}
//           style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}
//         >
//           {editingUser === user.id ? (
//             <>
//               <input
//                 type="text"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//               />
//               <button onClick={() => updateUser(user.id)}>Save</button>
//               <button onClick={cancelEditing}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <p>
//                 <strong>Email:</strong> {user.email}
//               </p>
//               <button onClick={() => startEditing(user)}>Edit</button>
//               <button onClick={() => deleteUser(user.id)}>Delete</button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }





// /app/admin/users/page.tsx or /pages/admin/users.js if not using app dir

// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/components/AuthProvider';
// import { supabase } from '@/lib/supabase';

// export default function AdminUsersPage() {
//   const { session } = useAuth();
//   const router = useRouter();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const role = session?.user?.user_metadata?.role;

//     if (role !== 'admin') {
//       router.push('/login'); // or show unauthorized
//       return;
//     }

//     const fetchUsers = async () => {
//       const { data, error } = await supabase.auth.admin.listUsers();
//       if (error) {
//         console.error('Error fetching users:', error.message);
//       } else {
//         setUsers(data.users);
//       }
//     };

//     if (session) fetchUsers();
//   }, [session]);

//   return (
//     <div style={{ padding: '30px' }}>
//       <h1>All Registered Users</h1>
//       <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Role</th>
//             <th>User ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.user_metadata?.role || 'N/A'}</td>
//               <td>{user.id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/components/AuthProvider';

// export default function AdminUsersPage() {
//   const { session } = useAuth();
//   const router = useRouter();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const role = session?.user?.user_metadata?.role;

//     if (role !== 'admin') {
//       router.push('/login');
//       return;
//     }

//     const fetchUsers = async () => {
//       const res = await fetch('/api/admin-users');
//       const result = await res.json();

//       if (res.ok) setUsers(result.users);
//       else console.error('Error:', result.error);
//     };

//     if (session) fetchUsers();
//   }, [session]);

//   return (
//     <div style={{ padding: '30px' }}>
//       <h1>All Registered Users</h1>
//       <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Role</th>
//             <th>User ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.user_metadata?.role || 'N/A'}</td>
//               <td>{user.id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }











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
    }
  }, [role]);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin-users');
    const result = await res.json();
    if (res.ok) setUsers(result.users);
    else console.error('Error fetching users:', result.error);
    setLoading(false);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/delete-user?id=${userId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('User deleted successfully!');
      fetchUsers();
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
