import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { enrollmentsApi } from "../../../services/api";

export default function StudentCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrollmentsApi.certificates().then(({ data }) => {
      const list = data?.results || data || [];
      setCertificates(Array.isArray(list) ? list : []);
    }).catch(() => setCertificates([])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">My Certificates</h1>
      <p className="text-gray-500 mb-8">Certificates earned from completed courses</p>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Complete courses to earn certificates</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{cert.course_title}</h3>
                <p className="text-sm text-gray-500 mt-1">ID: {cert.certificate_id}</p>
                <p className="text-sm text-gray-500 mt-1">Issued: {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "—"}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
