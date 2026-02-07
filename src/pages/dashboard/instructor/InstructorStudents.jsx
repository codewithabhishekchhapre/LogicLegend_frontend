import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analyticsApi } from "../../../services/api";

export default function InstructorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.instructorStudents().then(({ data }) => setStudents(Array.isArray(data) ? data : [])).catch(() => setStudents([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Student Performance</h1>
      <p className="text-gray-500 mb-8">Track students across your courses</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {students.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No students yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Progress</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.student?.id + "-" + s.course_id} className="border-b border-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{s.student?.first_name} {s.student?.last_name}</span>
                      <span className="block text-xs text-gray-500">{s.student?.email}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.course_title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${s.progress_percent || 0}%` }} />
                        </div>
                        <span className="text-sm font-medium">{s.progress_percent || 0}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
