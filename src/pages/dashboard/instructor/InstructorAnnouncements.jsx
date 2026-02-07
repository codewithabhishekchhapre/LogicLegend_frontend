import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { communicationsApi } from "../../../services/api";

export default function InstructorAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    communicationsApi.list().then(({ data }) => {
      const list = data?.results || data || [];
      setAnnouncements(Array.isArray(list) ? list : []);
    }).catch(() => setAnnouncements([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Announcements</h1>
      <p className="text-gray-500 mb-8">Course and system announcements</p>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">No announcements</div>
        ) : (
          announcements.map((a) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800">{a.title}</h3>
              <p className="text-sm text-gray-500 mt-1">By {a.author_name}</p>
              <p className="text-slate-600 mt-3">{a.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
