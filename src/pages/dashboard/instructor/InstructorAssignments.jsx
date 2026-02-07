import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assessmentsApi } from "../../../services/api";

export default function InstructorAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assessmentsApi.assignments().then(({ data }) => {
      const list = data?.results || data || [];
      setAssignments(Array.isArray(list) ? list : []);
    }).catch(() => setAssignments([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Assignments</h1>
      <p className="text-gray-500 mb-8">Manage assignments and grade submissions</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {assignments.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No assignments yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {assignments.map((a) => (
              <div key={a.id} className="p-6 hover:bg-gray-50 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800">{a.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Max points: {a.max_points}</p>
                  {a.due_date && <p className="text-xs text-gray-400 mt-1">Due: {new Date(a.due_date).toLocaleDateString()}</p>}
                </div>
                {a.course && <Link to={`/courses/${a.course}`} className="text-sm text-yellow-600 hover:underline">View Course</Link>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
