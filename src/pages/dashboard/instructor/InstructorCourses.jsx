import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, BookOpen, Clock, Pencil, ExternalLink, Trash2 } from "lucide-react";
import { coursesApi } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const statusStyles = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-amber-100 text-amber-800",
  PUBLISHED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-slate-100 text-slate-600",
};

export default function InstructorCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi.list(user?.id ? { instructor: user.id } : {}).then(({ data }) => {
      const list = data?.results || data || [];
      setCourses(Array.isArray(list) ? list : []);
    }).catch(() => setCourses([])).finally(() => setLoading(false));
  }, [user?.id]);

  const handleDelete = async (e, id, title) => {
    e.preventDefault();
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await coursesApi.delete(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed");
    }
  };

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
          <p className="text-gray-500 mt-1">Create and manage your courses</p>
        </div>
        <Link
          to="/dashboard/instructor/courses/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          <Plus size={20} /> Create Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No courses yet</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">Create your first course to start teaching and reaching students.</p>
          <Link
            to="/dashboard/instructor/courses/new"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
          >
            <Plus size={18} /> Create Course
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-yellow-200 transition group"
            >
              <div className="aspect-video bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center relative overflow-hidden">
                {c.thumbnail ? (
                  <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl opacity-80">📚</span>
                )}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[c.status] || "bg-gray-100"}`}>
                  {c.status}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-yellow-600">{c.category_name || "Uncategorized"}</span>
                <h3 className="font-bold text-slate-800 mt-1 line-clamp-2">{c.title}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={14} /> {c.duration_hours}h</span>
                  <span>{c.level}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={`/courses/${c.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 transition"
                  >
                    <ExternalLink size={14} /> View
                  </Link>
                  <Link
                    to={`/dashboard/instructor/courses/${c.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-yellow-600 hover:bg-yellow-50 transition"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(e, c.id, c.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
