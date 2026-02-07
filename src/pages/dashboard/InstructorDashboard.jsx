import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, FileText, MessageSquare } from "lucide-react";
import { coursesApi, analyticsApi, assessmentsApi, communicationsApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [coursesRes, studentsRes, assignmentsRes, announcementsRes] = await Promise.all([
          coursesApi.list({ instructor: "me" }).catch(() => ({ data: { results: [] } })),
          analyticsApi.instructorStudents().catch(() => ({ data: [] })),
          assessmentsApi.assignments().catch(() => ({ data: { results: [] } })),
          communicationsApi.list().catch(() => ({ data: { results: [] } })),
        ]);
        setMyCourses(coursesRes.data?.results || coursesRes.data || []);
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
        const a = assignmentsRes.data?.results || assignmentsRes.data || [];
        setAssignments(Array.isArray(a) ? a : []);
        const ann = announcementsRes.data?.results || announcementsRes.data || [];
        setAnnouncements(Array.isArray(ann) ? ann : []);
      } catch {
        setMyCourses([]);
        setStudents([]);
        setAssignments([]);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const cards = [
    {
      title: "My Courses",
      value: myCourses.length,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      link: "/courses",
    },
    {
      title: "Students",
      value: students.length,
      icon: Users,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      link: "/dashboard/instructor/students",
    },
    {
      title: "Assignments",
      value: assignments.length,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Announcements",
      value: announcements.length,
      icon: MessageSquare,
      color: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50",
    },
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
        <h1 className="text-3xl font-bold text-slate-800">Instructor Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage courses, students, and content</p>
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
              <Link to={c.link} className="mt-3 text-sm font-medium text-yellow-600 hover:underline">
                View →
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4">Student Performance</h2>
          {students.length === 0 ? (
            <p className="text-gray-500 text-sm">No students yet</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {students.slice(0, 5).map((s) => (
                <div
                  key={s.student?.id || Math.random()}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50"
                >
                  <span className="font-medium text-slate-700">
                    {s.student?.first_name} {s.student?.last_name}
                  </span>
                  <span className="text-sm text-gray-500">{s.progress_percent}%</span>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/dashboard/instructor/students"
            className="mt-4 text-sm font-medium text-yellow-600 hover:underline"
          >
            View all students →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Courses</h2>
          {myCourses.length === 0 ? (
            <p className="text-gray-500 text-sm">No courses yet</p>
          ) : (
            <div className="space-y-3">
              {myCourses.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-yellow-50 transition"
                >
                  <span className="font-medium text-slate-700">{c.title}</span>
                  <span className="text-xs text-gray-500 ml-2">({c.status})</span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
