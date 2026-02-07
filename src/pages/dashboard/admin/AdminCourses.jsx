import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { coursesApi } from "../../../services/api";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi.list().then(({ data }) => {
      const list = data?.results || data || [];
      setCourses(Array.isArray(list) ? list : []);
    }).catch(() => setCourses([])).finally(() => setLoading(false));
  }, []);

  const statusBadge = (s) => {
    const colors = { DRAFT: "bg-gray-100", PENDING: "bg-yellow-100 text-yellow-700", PUBLISHED: "bg-green-100 text-green-700", ARCHIVED: "bg-red-100 text-red-700" };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[s] || "bg-gray-100"}`}>{s}</span>;
  };

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Course Moderation</h1>
          <p className="text-gray-500 mt-1">Review and manage all courses</p>
        </div>
        <Link to="/dashboard/admin/courses/new" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
          <Plus size={20} /> Create Course
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Instructor</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <Link to={`/courses/${c.id}`} className="font-medium text-slate-800 hover:text-yellow-600">{c.title}</Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{c.instructor_name}</td>
                  <td className="px-6 py-4">{statusBadge(c.status)}</td>
                  <td className="px-6 py-4">
                    <Link to={`/dashboard/admin/courses/${c.id}/edit`} className="text-sm text-yellow-600 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {courses.length === 0 && <div className="p-12 text-center text-gray-500">No courses yet</div>}
      </div>
    </div>
  );
}
