import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { coursesApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Courses() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const canCreate = user && (user.role === "ADMIN" || user.role === "INSTRUCTOR");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "PUBLISHED",
    ...(categoryFromUrl && { category: parseInt(categoryFromUrl) || categoryFromUrl }),
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [coursesRes, catRes] = await Promise.all([
          coursesApi.list(filter),
          coursesApi.categories(),
        ]);
        setCourses(coursesRes.data.results || coursesRes.data);
        setCategories(catRes.data.results || catRes.data);
      } catch (err) {
        setCourses([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [JSON.stringify(filter)]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 mb-2"
      >
        Course Library
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <p className="text-gray-500">Browse and enroll in courses</p>
        {canCreate && (
          <Link
            to={user.role === "ADMIN" ? "/dashboard/admin/courses/new" : "/dashboard/instructor/courses/new"}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition"
          >
            <Plus size={20} />
            Create Course
          </Link>
        )}
      </motion.div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter({})}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !filter.status ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter({ category: c.id })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter.category === c.id ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500">
            No courses found. Check back later.
          </div>
        ) : (
          courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">📚</span>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-yellow-600">{course.category_name || "Course"}</span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{course.duration_hours}h · {course.level}</span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
