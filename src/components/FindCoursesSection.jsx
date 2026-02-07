import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, User, BookOpen } from "lucide-react";
import { coursesApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function FindCoursesSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi
      .list({ status: "PUBLISHED" })
      .then(({ data }) => {
        const list = data?.results || data || [];
        setCourses(Array.isArray(list) ? list : []);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = (courseId, e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: `/courses/${courseId}` } });
      return;
    }
    if (user.role !== "STUDENT") {
      navigate(`/courses/${courseId}`);
      return;
    }
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <section className="w-full py-20 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-12 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) return null;

  return (
    <section className="w-full py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Find the <span className="text-yellow-600">Course</span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Explore our published courses and start your learning journey today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:border-yellow-200 transition-all group"
            >
              <Link to={`/courses/${course.id}`} className="block">
                <div className="aspect-video bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-6xl opacity-70">📚</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-yellow-600">
                    {course.category_name || "Course"}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {course.instructor_name || "Instructor"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration_hours}h
                    </span>
                    <span>{course.level}</span>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <button
                  onClick={(e) => handleEnroll(course.id, e)}
                  className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} />
                  {user ? (user.role === "STUDENT" ? "Enroll Now" : "View Course") : "Enroll Now"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold transition"
          >
            View All Courses →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
