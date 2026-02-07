import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authApi } from "../../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.users().then(({ data }) => {
      const list = data?.results || data || [];
      setUsers(Array.isArray(list) ? list : []);
    }).catch(() => setUsers([])).finally(() => setLoading(false));
  }, []);

  const roleBadge = (role) => {
    const colors = { ADMIN: "bg-purple-100 text-purple-700", INSTRUCTOR: "bg-blue-100 text-blue-700", STUDENT: "bg-green-100 text-green-700" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role] || "bg-gray-100"}`}>{role}</span>;
  };

  if (loading) {
    return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">User Management</h1>
      <p className="text-gray-500 mb-8">Manage admin, instructors, and students</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {u.first_name} {u.last_name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">{roleBadge(u.role)}</td>
                  <td className="px-6 py-4">
                    <span className={u.is_active ? "text-green-600" : "text-gray-400"}>{u.is_active ? "Active" : "Inactive"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && <div className="p-12 text-center text-gray-500">No users found</div>}
      </div>
    </div>
  );
}
