import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assessmentsApi } from "../../../services/api";

export default function StudentAssignments() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assessmentsApi.submissions().then(({ data }) => {
      const list = data?.results || data || [];
      setSubmissions(Array.isArray(list) ? list : []);
    }).catch(() => setSubmissions([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">My Assignments</h1>
      <p className="text-gray-500 mb-8">Assignment submissions and grades</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No assignment submissions yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.map((s) => (
              <div key={s.id} className="p-6 hover:bg-gray-50">
                <h3 className="font-semibold text-slate-800">Assignment #{s.assignment}</h3>
                <p className="text-sm text-gray-500 mt-1">Grade: {s.grade ?? "Pending"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
