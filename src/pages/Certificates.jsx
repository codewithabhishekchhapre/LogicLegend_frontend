import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { enrollmentsApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Award } from "lucide-react";

export default function Certificates() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await enrollmentsApi.certificates();
        const list = data?.results || data || [];
        setCertificates(Array.isArray(list) ? list : []);
      } catch {
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) load();
    else setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500">Please log in to view your certificates.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-slate-800 mb-2"
      >
        My Certificates
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-gray-500 mb-8"
      >
        Certificates earned from completed courses
      </motion.p>

      {certificates.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No certificates yet. Complete courses to earn them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{cert.course_title}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {cert.certificate_id}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Issued: {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "-"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
