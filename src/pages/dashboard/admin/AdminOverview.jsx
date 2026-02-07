import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, BarChart3, FolderOpen } from "lucide-react";
import { analyticsApi } from "../../../services/api";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    total_courses: 0,
    total_students: 0,
    total_instructors: 0,
    total_enrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.overview().then(({ data }) => setStats(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: "Total Courses", value: stats.total_courses, icon: BookOpen, color: "from-blue-500 to-blue-600", link: "courses" },
    { title: "Categories", value: "Manage", icon: FolderOpen, color: "from-slate-500 to-slate-600", link: "categories" },
    { title: "Students", value: stats.total_students, icon: GraduationCap, color: "from-green-500 to-green-600" },
    { title: "Instructors", value: stats.total_instructors, icon: Users, color: "from-purple-500 to-purple-600" },
    { title: "Enrollments", value: stats.total_enrollments, icon: BarChart3, color: "from-yellow-500 to-orange-500", link: "enrollments" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <BarChart3 className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
          <p className="text-gray-500 mt-0.5">System statistics and quick access</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{c.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{c.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${c.color}`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {c.link && (
              <Link to={`/dashboard/admin/${c.link}`} className="mt-3 text-sm font-medium text-amber-600 hover:underline">
                Manage →
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
