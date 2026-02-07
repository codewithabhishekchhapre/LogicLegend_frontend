import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, BarChart3, Settings } from "lucide-react";
import { analyticsApi } from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_courses: 0,
    total_students: 0,
    total_instructors: 0,
    total_enrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await analyticsApi.overview();
        setStats(data);
      } catch {
        setStats({ total_courses: 0, total_students: 0, total_instructors: 0, total_enrollments: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    {
      title: "Total Courses",
      value: stats.total_courses,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      link: "/courses",
    },
    {
      title: "Students",
      value: stats.total_students,
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Instructors",
      value: stats.total_instructors,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Enrollments",
      value: stats.total_enrollments,
      icon: BarChart3,
      color: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
    },
  ];

  const quickLinks = [
    { label: "Course Management", path: "/courses", icon: BookOpen },
    { label: "Reports & Analytics", path: "/dashboard", icon: BarChart3 },
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
    <div className="max-w-6xl mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">System overview and management</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`${c.bg} rounded-2xl p-6 border border-gray-100`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{c.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{c.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${c.color}`}>
                <c.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {c.link && (
              <Link
                to={c.link}
                className="mt-3 text-sm font-medium text-yellow-600 hover:underline"
              >
                View →
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map((q) => (
            <Link
              key={q.label}
              to={q.path}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-gray-100 hover:border-yellow-200 transition"
            >
              <q.icon className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-slate-700">{q.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
