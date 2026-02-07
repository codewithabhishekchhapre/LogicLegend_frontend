import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { coursesApi } from "../services/api";

const KIDS_ICONS = ["📢", "📚", "🔢", "💻"];

export default function CoursesForKidsSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi
      .list({ status: "PUBLISHED", audience: "KIDS" })
      .then(({ data }) => {
        const list = data?.results || data || [];
        const all = Array.isArray(list) ? list : [];
        const kids = all.filter(
          (c) =>
            c.audience === "KIDS" ||
            (c.category_name || "").toLowerCase().includes("kids") ||
            (c.title || "").toLowerCase().includes("kids")
        );
        setCourses(kids.length >= 4 ? kids.slice(0, 4) : (kids.length > 0 ? kids : all.slice(0, 4)));
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-[80%] mx-auto py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[80%] mx-auto py-8">
      <div className="mx-auto w-[92%] sm:w-[1200px] py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Courses for <span className="relative text-amber-600">kids
              <span className="absolute left-0 -bottom-[4px] h-[3px] w-full bg-amber-500" />
            </span>
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Fun, interactive & skill-building programs for young learners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                <p>No kids courses yet. Check back soon!</p>
                <Link to="/courses" className="mt-4 inline-block text-amber-600 hover:underline font-medium">Browse all courses →</Link>
              </div>
            ) : courses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.012 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 p-5 transition-all"
              >
                <div className="mb-3 h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                  {KIDS_ICONS[i % KIDS_ICONS.length]}
                </div>
                <p className="text-[13px] font-semibold text-amber-600">
                  {c.class_range || c.level || "All levels"}
                </p>
                <h3 className="mt-1 text-[17px] font-bold text-slate-800 line-clamp-2">
                  {c.title}
                </h3>
                <p className="mt-1 text-[13px] text-gray-600 leading-[18px] line-clamp-2">
                  {c.description}
                </p>
                <Link to={`/courses/${c.id}`}>
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 inline-block rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2.5 text-white text-[13px] font-semibold transition-colors"
                  >
                    Explore
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute h-[380px] w-[380px] rounded-full bg-amber-50" />
            {[
              { text: "EN", top: "18px", right: "-8px" },
              { text: "</>", top: "140px", right: "-26px" },
              { text: "🚀", bottom: "105px", left: "-26px" },
              { text: "√±", bottom: "26px", right: "36px" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20 rounded-xl bg-white px-2 py-1 text-[13px] font-bold shadow-lg"
                style={item}
              >
                {item.text}
              </motion.div>
            ))}
            <img
              src="/WhatsApp Image 2026-02-03 at 4.41.15 PM.jpeg"
              alt="kid"
              className="relative z-10 h-[380px] object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
