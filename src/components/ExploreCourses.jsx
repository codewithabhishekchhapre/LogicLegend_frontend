import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { coursesApi } from "../services/api";

const CATEGORY_STYLES = [
  { curve: "bg-[#C9DBFF]", badgeColor: "text-blue-600" },
  { curve: "bg-[#E6DFFF]", badgeColor: "text-purple-600" },
  { curve: "bg-[#FFE9B5]", badgeColor: "text-blue-600" },
];

const DEFAULT_CATEGORIES = [
  { id: "competitive", name: "Competitive Exams", badge: "Class 3 - 13", pills: ["JEE", "NEET", "Olympiad"] },
  { id: "school", name: "School Tuition", badge: "Class 3 - 12", pills: ["CBSE Board", "ICSE Board", "All Boards"] },
  { id: "kids", name: "Courses for kids", badge: "Class LKG - 8", pills: ["Learn English", "Learn Math", "Coding", "Spoken English"] },
];

export default function ExploreCourses() {
  const [categories, setCategories] = useState([]);
  const [coursesByCategory, setCoursesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([coursesApi.categories(), coursesApi.list({ status: "PUBLISHED" })])
      .then(([catRes, coursesRes]) => {
        const cats = catRes.data?.results || catRes.data || [];
        const catList = Array.isArray(cats) ? cats : [];
        const courses = coursesRes.data?.results || coursesRes.data || [];
        const courseList = Array.isArray(courses) ? courses : [];

        const byCat = {};
        courseList.forEach((c) => {
          const cid = c.category || "other";
          if (!byCat[cid]) byCat[cid] = [];
          byCat[cid].push(c);
        });

        setCategories(catList.length >= 3 ? catList.slice(0, 3) : catList);
        setCoursesByCategory(byCat);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayCategories =
    categories.length >= 3
      ? categories.map((c, i) => ({
          id: c.id,
          name: c.name,
          badge: c.name,
          pills: (coursesByCategory[c.id] || []).slice(0, 6).map((co) => co.title),
          ...CATEGORY_STYLES[i % 3],
        }))
      : DEFAULT_CATEGORIES.map((c, i) => ({
          id: c.id,
          name: c.name,
          badge: c.badge,
          pills: c.pills,
          ...CATEGORY_STYLES[i % 3],
        }));

  if (loading && displayCategories.length === 0) {
    return (
      <section className="w-full py-20">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-14" />
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-[32px] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">
        Explore <span className="text-[#ff7a00]">courses</span>{" "}
        <span className="text-lg font-medium text-[#ff7a00]">(LKG – 13)</span>
      </h2>

      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayCategories.map((cat, i) => (
            <ExploreCard
              key={cat.id}
              categoryId={cat.id}
              badge={cat.badge}
              title={cat.name}
              pills={cat.pills?.length ? cat.pills : ["Explore all"]}
              curve={cat.curve}
              badgeColor={cat.badgeColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExploreCard({ categoryId, badge, title, pills, curve, badgeColor }) {
  const to = typeof categoryId === "number" ? `/courses?category=${categoryId}` : "/courses";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="relative rounded-[32px] border p-8 overflow-hidden"
    >
      <div
        className={`absolute right-0 top-0 h-full w-[58%] rounded-l-[220px] ${curve}`}
      />
      <div className="relative z-10">
        <p className={`font-semibold mb-3 ${badgeColor}`}>{badge}</p>
        <h3 className="text-xl font-bold mb-6">{title}</h3>
        <div className="flex flex-wrap gap-3 mb-8 max-w-[260px]">
          {pills.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-orange-600"
            >
              {item.length > 20 ? item.slice(0, 18) + "…" : item}
            </span>
          ))}
        </div>
        <Link to={to}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-yellow-500 rounded-full hover:bg-yellow-600 transition text-white px-6 py-3 font-semibold"
          >
            Explore Courses
          </motion.span>
        </Link>
      </div>
      <img
        src="/ff06ac5b-081a-4a50-a494-16beb717d5b1-1682592787084-4102418410874681.png"
        alt=""
        className="absolute bottom-0 right-4 h-[300px] object-contain z-10"
      />
    </motion.div>
  );
}
