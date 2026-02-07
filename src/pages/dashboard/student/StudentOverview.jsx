import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Award, FileText, ClipboardList } from "lucide-react";
import { enrollmentsApi, assessmentsApi } from "../../../services/api";

export default function StudentOverview() {
  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [myRes, certRes, assignRes, quizRes] = await Promise.all([
          enrollmentsApi.myCourses().catch(() => ({ data: [] })),
          enrollmentsApi.certificates().catch(() => ({ data: [] })),
          assessmentsApi.submissions().catch(() => ({ data: [] })),
          assessmentsApi.quizAttempts().catch(() => ({ data: [] })),
        ]);
        setEnrollments(Array.isArray(myRes.data) ? myRes.data : []);
        const c = certRes.data?.results || certRes.data || [];
        setCertificates(Array.isArray(c) ? c : []);
        const a = assignRes.data?.results || assignRes.data || [];
        setAssignments(Array.isArray(a) ? a : []);
        const q = quizRes.data?.results || quizRes.data || [];
        setQuizzes(Array.isArray(q) ? q : []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { title: "My Courses", value: enrollments.length, icon: BookOpen, link: "courses" },
    { title: "Assignments", value: assignments.length, icon: FileText, link: "assignments" },
    { title: "Quiz Attempts", value: quizzes.length, icon: ClipboardList, link: "quizzes" },
    { title: "Certificates", value: certificates.length, icon: Award, link: "certificates" },
  ];

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <BookOpen className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Overview</h1>
          <p className="text-gray-500 mt-0.5">Your learning progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{c.title}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{c.value}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-100">
                <c.icon className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            {c.link && <Link to={`/dashboard/student/${c.link}`} className="mt-3 text-sm font-medium text-amber-600 hover:underline">View →</Link>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Continue Learning</h2>
          {enrollments.length === 0 ? <p className="text-gray-500 text-sm">No courses yet</p> : (
            <div className="space-y-2">
              {enrollments.slice(0, 5).map((e) => (
                <Link key={e.id} to={`/courses/${e.course}`} className="flex justify-between p-2 rounded-lg bg-gray-50 hover:bg-yellow-50">
                  <span className="font-medium text-slate-700">{e.course_title}</span>
                  <span className="text-sm font-medium text-yellow-600">{e.progress_percent}%</span>
                </Link>
              ))}
            </div>
          )}
          <Link to="/courses" className="mt-4 text-sm font-medium text-yellow-600 hover:underline">Browse courses →</Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Certificates</h2>
          {certificates.length === 0 ? <p className="text-gray-500 text-sm">Complete courses to earn certificates</p> : (
            <div className="space-y-2">
              {certificates.slice(0, 5).map((cert) => (
                <div key={cert.id} className="p-2 rounded-lg bg-gray-50">
                  <span className="font-medium text-slate-700">{cert.course_title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
