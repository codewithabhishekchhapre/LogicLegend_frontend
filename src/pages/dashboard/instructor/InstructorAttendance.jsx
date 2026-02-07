import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { attendanceApi } from "../../../services/api";

export default function InstructorAttendance() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const sessionsRes = await attendanceApi.liveSessions().catch(() => ({ data: [] }));
        const list = sessionsRes.data?.results || sessionsRes.data || [];
        setSessions(Array.isArray(list) ? list : []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Attendance</h1>
      <p className="text-gray-500 mb-8">Track attendance for live sessions</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {sessions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No live sessions yet. Schedule sessions from your course pages.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sessions.map((s) => (
              <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 hover:bg-gray-50">
                <h3 className="font-semibold text-slate-800">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {s.session_date ? new Date(s.session_date).toLocaleString() : ""} · {s.duration_minutes || 60} min
                </p>
                {s.meeting_url && (
                  <a href={s.meeting_url} target="_blank" rel="noreferrer" className="text-sm text-yellow-600 hover:underline mt-2 inline-block">
                    Join session →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
