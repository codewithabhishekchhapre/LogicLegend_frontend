import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Redirects /dashboard to role-specific overview */
export default function DashboardIndex() {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase() || "student";
  return <Navigate to={`/dashboard/${role}/overview`} replace />;
}
