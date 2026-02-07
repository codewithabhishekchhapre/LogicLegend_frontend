import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { enrollmentsApi } from "../../../services/api";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  DROPPED: "bg-gray-100 text-gray-600",
};

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollmentsApi
      .list()
      .then(({ data }) => {
        const list = data?.results || data || [];
        setEnrollments(Array.isArray(list) ? list : []);
      })
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <GraduationCap className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Enrollments</h1>
          <p className="text-gray-500 mt-0.5">All course enrollments across the platform</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {enrollments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No enrollments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Progress</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-50 hover:bg-amber-50/30 transition"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{e.student_name || "—"}</span>
                      <span className="block text-xs text-gray-500">{e.student_email}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{e.course_title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition"
                            style={{ width: `${e.progress_percent || 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{e.progress_percent || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[e.status] || "bg-gray-100"}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString() : "—"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
