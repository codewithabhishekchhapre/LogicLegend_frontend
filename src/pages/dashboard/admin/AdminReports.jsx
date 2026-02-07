import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, GraduationCap, Users, FolderOpen, TrendingUp } from "lucide-react";
import { analyticsApi } from "../../../services/api";

const cards = [
  { key: "total_courses", label: "Total Courses", icon: BookOpen, color: "bg-amber-100 text-amber-600", link: "courses" },
  { key: "total_students", label: "Students", icon: GraduationCap, color: "bg-green-100 text-green-600" },
  { key: "total_instructors", label: "Instructors", icon: Users, color: "bg-purple-100 text-purple-600" },
  { key: "total_enrollments", label: "Enrollments", icon: TrendingUp, color: "bg-blue-100 text-blue-600", link: "enrollments" },
  { key: "total_categories", label: "Categories", icon: FolderOpen, color: "bg-slate-100 text-slate-600", link: "categories" },
];

export default function AdminReports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.overview().then(({ data }) => setStats(data)).catch(() => setStats({})).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <BarChart3 className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-gray-500 mt-0.5">System-wide insights and metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${c.color}`}>
                <c.icon className="w-6 h-6" />
              </div>
              {c.link && (
                <Link
                  to={`/dashboard/admin/${c.link}`}
                  className="text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  View
                </Link>
              )}
            </div>
            <p className="text-sm text-gray-600">{c.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stats?.[c.key] ?? 0}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
