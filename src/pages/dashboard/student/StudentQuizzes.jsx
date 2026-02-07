import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assessmentsApi } from "../../../services/api";

export default function StudentQuizzes() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    assessmentsApi.quizAttempts().then(({ data }) => {
      const list = data?.results || data || [];
      setAttempts(Array.isArray(list) ? list : []);
    }).catch(() => setAttempts([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Quiz Attempts</h1>
      <p className="text-gray-500 mb-8">Your quiz and exam attempts</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {attempts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No quiz attempts yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {attempts.map((a) => (
              <div key={a.id} className="p-6 hover:bg-gray-50">
                <h3 className="font-semibold text-slate-800">Quiz #{a.quiz}</h3>
                <p className="text-sm text-gray-500 mt-1">Score: {a.score ?? "—"} | {a.passed ? "Passed" : "Not passed"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
