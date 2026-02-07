import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Award, FileText, ClipboardList } from "lucide-react";
import { enrollmentsApi, assessmentsApi } from "../../services/api";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [myCoursesRes, certsRes, assignmentsRes, quizzesRes] = await Promise.all([
          enrollmentsApi.myCourses().catch(() => ({ data: [] })),
          enrollmentsApi.certificates().catch(() => ({ data: { results: [] } })),
          assessmentsApi.submissions().catch(() => ({ data: { results: [] } })),
          assessmentsApi.quizAttempts().catch(() => ({ data: { results: [] } })),
        ]);
        setEnrollments(Array.isArray(myCoursesRes.data) ? myCoursesRes.data : []);
        const c = certsRes.data?.results || certsRes.data || [];
        setCertificates(Array.isArray(c) ? c : []);
        const a = assignmentsRes.data?.results || assignmentsRes.data || [];
        setAssignments(Array.isArray(a) ? a : []);
        const q = quizzesRes.data?.results || quizzesRes.data || [];
        setQuizzes(Array.isArray(q) ? q : []);
      } catch {
        setEnrollments([]);
        setCertificates([]);
        setAssignments([]);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    {
      title: "My Courses",
      value: enrollments.length,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      link: "/my-courses",
    },
    {
      title: "Certificates",
      value: certificates.length,
      icon: Award,
      color: "from-green-500 to-green-600",
      bg: "bg-green-50",
      link: "/certificates",
    },
    {
      title: "Assignments",
      value: assignments.length,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Quiz Attempts",
      value: quizzes.length,
      icon: ClipboardList,
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
        <h1 className="text-3xl font-bold text-slate-800">Student Dashboard</h1>
        <p className="text-gray-500 mt-1">Your learning progress and courses</p>
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
          <h2 className="text-lg font-bold text-slate-800 mb-4">Continue Learning</h2>
          {enrollments.length === 0 ? (
            <p className="text-gray-500 text-sm">No courses yet. Browse and enroll.</p>
          ) : (
            <div className="space-y-3">
              {enrollments.slice(0, 4).map((e) => (
                <Link
                  key={e.id}
                  to={`/courses/${e.course}`}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-yellow-50 transition"
                >
                  <span className="font-medium text-slate-700">{e.course_title}</span>
                  <span className="text-sm font-medium text-yellow-600">{e.progress_percent}%</span>
                </Link>
              ))}
            </div>
          )}
          <Link
            to="/courses"
            className="mt-4 text-sm font-medium text-yellow-600 hover:underline"
          >
            Browse more courses →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-800 mb-4">Certificates</h2>
          {certificates.length === 0 ? (
            <p className="text-gray-500 text-sm">Complete courses to earn certificates</p>
          ) : (
            <div className="space-y-3">
              {certificates.slice(0, 4).map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 rounded-lg bg-gray-50 flex justify-between items-center"
                >
                  <span className="font-medium text-slate-700">{cert.course_title}</span>
                  <span className="text-xs text-gray-500">{cert.certificate_id}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
