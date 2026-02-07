import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { enrollmentsApi } from "../../../services/api";

export default function StudentCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollmentsApi.myCourses().then(({ data }) => setEnrollments(Array.isArray(data) ? data : [])).catch(() => setEnrollments([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">My Courses</h1>
      <p className="text-gray-500 mb-8">Your enrolled courses and progress</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800">{e.course_title}</h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${e.progress_percent}%` }} />
              </div>
              <span className="text-sm font-medium">{e.progress_percent}%</span>
            </div>
            <Link to={`/courses/${e.course}`} className="mt-4 inline-block text-sm font-medium text-yellow-600 hover:underline">Continue →</Link>
          </motion.div>
        ))}
      </div>
      {enrollments.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-4">No courses yet</p>
          <Link to="/courses" className="text-yellow-600 font-medium hover:underline">Browse and enroll in courses</Link>
        </div>
      )}
    </div>
  );
}
