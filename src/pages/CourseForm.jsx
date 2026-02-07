import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { coursesApi, authApi } from "../services/api";
import { useAuth } from "../context/AuthContext";

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING", label: "Pending Approval" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const AUDIENCE_OPTIONS = [
  { value: "STUDENT", label: "Student" },
  { value: "KIDS", label: "Kids" },
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function CourseForm({ dashboardRole }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;
  const inDashboard = !!dashboardRole;
  const listPath = inDashboard ? `/dashboard/${dashboardRole}/courses` : "/courses";
  const backPath = inDashboard ? listPath : (isEdit ? `/courses/${id}` : "/courses");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    instructor: "",
    status: "DRAFT",
    audience: "STUDENT",
    class_range: "",
    duration_hours: 0,
    level: "Beginner",
    max_students: "",
  });
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canManage = user && (user.role === "ADMIN" || user.role === "INSTRUCTOR");

  useEffect(() => {
    if (!canManage) return;
    const load = async () => {
      try {
        const [catRes, courseRes, usersRes] = await Promise.all([
          coursesApi.categories(),
          isEdit ? coursesApi.get(id) : Promise.resolve({ data: null }),
          user.role === "ADMIN" ? authApi.users().catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
        ]);
        const cats = catRes.data?.results || catRes.data || [];
        setCategories(Array.isArray(cats) ? cats : []);

        if (user.role === "ADMIN") {
          const list = usersRes.data?.results || usersRes.data || [];
          const inst = (Array.isArray(list) ? list : []).filter((u) => (u.role || "").toUpperCase() === "INSTRUCTOR");
          setInstructors(inst.length > 0 ? inst : [user]);
        }

        if (isEdit && courseRes.data) {
          const data = courseRes.data;
          setForm({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            category: data.category || "",
            instructor: data.instructor || "",
            status: data.status || "DRAFT",
            audience: data.audience || "STUDENT",
            class_range: data.class_range || "",
            duration_hours: data.duration_hours || 0,
            level: data.level || "Beginner",
            max_students: data.max_students ?? "",
          });
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit, canManage, user?.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && !isEdit) {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        status: form.status,
        audience: form.audience || "STUDENT",
        class_range: form.class_range || "",
        duration_hours: parseInt(form.duration_hours) || 0,
        level: form.level,
        max_students: form.max_students ? parseInt(form.max_students) : null,
      };
      if (form.category) payload.category = parseInt(form.category);
      if (user.role === "ADMIN" && form.instructor) payload.instructor = parseInt(form.instructor);
      if (user.role === "INSTRUCTOR") payload.instructor = user.id;

      if (isEdit) {
        await coursesApi.update(id, payload);
        navigate(inDashboard ? listPath : `/courses/${id}`);
      } else {
        const { data } = await coursesApi.create(payload);
        navigate(inDashboard ? listPath : `/courses/${data.id}`);
      }
    } catch (err) {
      const msg = err.response?.data;
      setError(
        typeof msg === "object"
          ? Object.entries(msg)
              .flatMap(([k, v]) => (Array.isArray(v) ? v : [v]))
              .join(" ")
          : "Failed to save course"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!canManage) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Only Instructors and Admins can create or edit courses.</p>
        <Link to="/courses" className="text-yellow-600 mt-4 inline-block">Back to courses</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link to={backPath} className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium mb-6 transition">
        ← Back to courses
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-yellow-100 text-sm mt-1">
            Fill in all fields to {isEdit ? "update" : "publish"} your course
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-start gap-2">
              <span className="shrink-0">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Basic info */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Advanced Web Development"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>URL Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="advance-web-development-course"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Used in course URL. Auto-generated from title.</p>
              </div>
              <div>
                <label className={labelClass}>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className={inputClass}
                  placeholder="Describe what students will learn..."
                  required
                />
              </div>
            </div>
          </section>

          {/* Course details */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-gray-100">Course Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Audience</label>
                <select name="audience" value={form.audience} onChange={handleChange} className={inputClass}>
                  {AUDIENCE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Student or Kids course</p>
              </div>
              <div>
                <label className={labelClass}>Class Range</label>
                <input
                  type="text"
                  name="class_range"
                  value={form.class_range}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. LKG - 8, Class 3 - 12"
                />
              </div>
              {user.role === "ADMIN" && (
                <div>
                  <label className={labelClass}>Instructor</label>
                  <select name="instructor" value={form.instructor} onChange={handleChange} className={inputClass}>
                    <option value="">Assign to me (Admin)</option>
                    {instructors.map((u) => (
                      <option key={u.id} value={u.id}>{u.first_name} {u.last_name}{u.role === "INSTRUCTOR" ? "" : " (Admin)"}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className={labelClass}>Duration (hours)</label>
                <input type="number" name="duration_hours" value={form.duration_hours} onChange={handleChange} min={0} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Level</label>
                <select name="level" value={form.level} onChange={handleChange} className={inputClass}>
                  {LEVEL_OPTIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Max Students</label>
                <input type="number" name="max_students" value={form.max_students} onChange={handleChange} min={1} className={inputClass} placeholder="Optional" />
              </div>
            </div>
          </section>

          {/* Publishing */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-gray-100">Publishing</h2>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </section>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-70 transition shadow-md hover:shadow-lg"
            >
              {submitting ? "Saving..." : isEdit ? "Update Course" : "Create Course"}
            </button>
            <Link to={backPath} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
