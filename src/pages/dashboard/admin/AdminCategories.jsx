import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { coursesApi } from "../../../services/api";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", class_range: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    coursesApi.categories().then(({ data }) => {
      const list = data?.results || data || [];
      setCategories(Array.isArray(list) ? list : []);
    }).catch(() => setCategories([])).finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleCreate = () => {
    setEditing("new");
    setForm({ name: "", slug: "", description: "" });
    setError("");
  };

  const handleEdit = (c) => {
    setEditing(c.id);
    setForm({ name: c.name, slug: c.slug || slugify(c.name), description: c.description || "", class_range: c.class_range || "" });
    setError("");
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "", class_range: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && editing === "new") {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = { name: form.name.trim(), slug: form.slug.trim(), description: form.description.trim(), class_range: (form.class_range || "").trim() };
      if (editing === "new") {
        await coursesApi.categoryCreate(payload);
      } else {
        await coursesApi.categoryUpdate(editing, payload);
      }
      handleCancel();
      load();
    } catch (err) {
      const msg = err.response?.data;
      setError(
        typeof msg === "object"
          ? Object.entries(msg)
              .flatMap(([k, v]) => (Array.isArray(v) ? v : [v]))
              .filter(Boolean)
              .join(" ")
          : "Failed to save category"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category? Courses using it will have the category unset.")) return;
    try {
      await coursesApi.categoryDelete(id);
      load();
      if (editing === id) handleCancel();
    } catch (err) {
      setError(err.response?.data?.detail || "Cannot delete category (may have courses)");
    }
  };

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Course Categories</h1>
          <p className="text-gray-500 mt-1">Manage categories used when creating courses</p>
        </div>
        {editing !== "new" && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            <Plus size={20} /> Add Category
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {editing === "new" ? "New Category" : "Edit Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="category-url-slug"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Range</label>
              <input
                type="text"
                name="class_range"
                value={form.class_range}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"
                placeholder="e.g. Class LKG - 8, Class 3 - 13"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold disabled:opacity-70"
              >
                {submitting ? "Saving..." : editing === "new" ? "Create" : "Update"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No categories yet. Add one to organize courses.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">{c.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{c.slug}{c.class_range ? ` · ${c.class_range}` : ""}</p>
                  {c.description && <p className="text-sm text-slate-600 mt-2">{c.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    disabled={!!editing && editing !== c.id}
                    className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-50 disabled:opacity-50"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
