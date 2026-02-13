import { useEffect, useState } from "react";
import axios from "../api/axios";




      function SuperAdminUsers() {
        const [users, setUsers] = useState([]);

            async function fetchUsers() {
           const res = await axios.get("/api/superadmin", { withCredentials: true });
       setUsers(res.data);
                }

            async function changeRole(id, role) {
             await axios.patch(`/api/superadmin/${id}/role`, { role }, { withCredentials: true });
             fetchUsers();
                   }

         async function toggleBlock(id, isBlocked) {
           await axios.patch(`/api/superadmin/${id}/block`, { isBlocked }, { withCredentials: true });
             fetchUsers();
                   }

          async function deleteUser(id) {
           if (!confirm("Delete this user?")) return;
             await axios.delete(`/api/superadmin/${id}`, { withCredentials: true });
              fetchUsers();
                }

          useEffect(() => {
              fetchUsers();
                }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Username</th>
             <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            <th className="border p-2">Blocked</th>
              <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.username}</td>
              <td className="border p-2">{u.emailId}</td>
              <td className="border p-2">
                <select
                  className="border p-1"
                  value={u.role}
                  onChange={(e) => changeRole(u._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </td>
              <td className="border p-2">{u.isBlocked ? "Yes" : "No"}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => toggleBlock(u._id, !u.isBlocked)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SuperAdminUsers;
