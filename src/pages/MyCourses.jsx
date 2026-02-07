import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { enrollmentsApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function MyCourses() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await enrollmentsApi.myCourses();
        setEnrollments(data);
      } catch {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) load();
    else setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Please log in to view your courses.</p>
        <Link to="/login" className="text-yellow-600 mt-4 inline-block">Sign in</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 mb-2"
      >
        My Courses
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-gray-500 mb-8"
      >
        Your enrolled courses and progress
      </motion.p>

      {enrollments.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="mt-4 inline-block px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrollments.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{e.course_title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Status: {e.status}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${e.progress_percent}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{e.progress_percent}%</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${e.course}`}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium"
                >
                  Continue
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
