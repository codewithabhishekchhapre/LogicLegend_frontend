import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { coursesApi, enrollmentsApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const canEdit = user && (user.role === "ADMIN" || (user.role === "INSTRUCTOR" && course?.instructor === user.id));

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await coursesApi.get(id);
        setCourse(data);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!user.is_student) {
      alert("Only students can enroll in courses.");
      return;
    }
    setEnrolling(true);
    try {
      await enrollmentsApi.enroll(parseInt(id));
      setEnrolled(true);
    } catch (err) {
      alert(err.response?.data?.error || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Course not found</p>
        <Link to="/courses" className="text-yellow-600 mt-4 inline-block">Back to courses</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/courses" className="text-yellow-600 hover:underline mb-6 inline-block">← Back to courses</Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="h-64 sm:h-80 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">📚</span>
          )}
        </div>
        <div className="p-8">
          <span className="text-sm font-medium text-yellow-600">{course.category_name}</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">{course.title}</h1>
          <p className="text-gray-500 mt-2">By {course.instructor_name}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span>{course.duration_hours} hours</span>
            <span>{course.level}</span>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">{course.description}</p>

          {canEdit && (
            <div className="mt-6 flex gap-3">
              <Link
                to={`/courses/${id}/edit`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-medium transition"
              >
                <Pencil size={18} />
                Edit Course
              </Link>
              <button
                onClick={async () => {
                  if (!confirm("Delete this course?")) return;
                  try {
                    await coursesApi.delete(id);
                    navigate("/courses");
                  } catch (e) {
                    alert(e.response?.data?.detail || "Delete failed");
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium transition"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          )}

          {user?.is_student && (
            <div className="mt-8">
              {enrolled ? (
                <p className="text-green-600 font-medium">You are enrolled! View in My Courses.</p>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition disabled:opacity-70"
                >
                  {enrolling ? "Enrolling..." : "Enroll now"}
                </button>
              )}
            </div>
          )}

          {course.modules?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Course content</h2>
              <div className="space-y-3">
                {course.modules.map((mod, i) => (
                  <div key={mod.id} className="p-4 rounded-xl bg-gray-50">
                    <h3 className="font-semibold text-slate-800">Module {i + 1}: {mod.title}</h3>
                    {mod.lessons?.length > 0 && (
                      <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                        {mod.lessons.map((l) => (
                          <li key={l.id}>• {l.title} ({l.duration_minutes} min)</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
