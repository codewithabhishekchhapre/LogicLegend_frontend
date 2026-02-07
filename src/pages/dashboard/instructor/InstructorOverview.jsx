import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, FileText, MessageSquare } from "lucide-react";
import { coursesApi, analyticsApi, assessmentsApi, communicationsApi } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

export default function InstructorOverview() {
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
          coursesApi.list(user?.id ? { instructor: user.id } : {}).catch(() => ({ data: [] })),
          analyticsApi.instructorStudents().catch(() => ({ data: [] })),
          assessmentsApi.assignments().catch(() => ({ data: [] })),
          communicationsApi.list().catch(() => ({ data: [] })),
        ]);
        setMyCourses(coursesRes.data?.results || coursesRes.data || []);
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
        const a = assignmentsRes.data?.results || assignmentsRes.data || [];
        setAssignments(Array.isArray(a) ? a : []);
        const ann = announcementsRes.data?.results || announcementsRes.data || [];
        setAnnouncements(Array.isArray(ann) ? ann : []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const cards = [
    { title: "My Courses", value: myCourses.length, icon: BookOpen, link: "courses" },
    { title: "Students", value: students.length, icon: Users, link: "students" },
    { title: "Assignments", value: assignments.length, icon: FileText, link: "assignments" },
    { title: "Announcements", value: announcements.length, icon: MessageSquare, link: "announcements" },
  ];

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-amber-100">
          <BookOpen className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Instructor Overview</h1>
          <p className="text-gray-500 mt-0.5">Manage your courses and students</p>
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
            {c.link && <Link to={`/dashboard/instructor/${c.link}`} className="mt-3 text-sm font-medium text-amber-600 hover:underline">View →</Link>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Students</h2>
          {students.length === 0 ? <p className="text-gray-500 text-sm">No students yet</p> : (
            <div className="space-y-2">
              {students.slice(0, 5).map((s) => (
                <div key={s.student?.id} className="flex justify-between p-2 rounded-lg bg-gray-50">
                  <span className="font-medium text-slate-700">{s.student?.first_name} {s.student?.last_name}</span>
                  <span className="text-sm text-gray-500">{s.progress_percent}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Courses</h2>
          {myCourses.length === 0 ? <p className="text-gray-500 text-sm">No courses yet</p> : (
            <div className="space-y-2">
              {myCourses.slice(0, 5).map((c) => (
                <Link key={c.id} to={`/courses/${c.id}`} className="block p-2 rounded-lg bg-gray-50 hover:bg-yellow-50">
                  <span className="font-medium text-slate-700">{c.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
