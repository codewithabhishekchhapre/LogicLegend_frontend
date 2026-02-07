import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protects dashboard. Redirects to login if not authenticated.
 * Redirects to correct role path if accessing wrong role's dashboard.
 */
export default function DashboardGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = user.role?.toLowerCase();
  const rolePath = `/dashboard/${role}`;

  // If path doesn't match user's role, redirect to their overview
  if (!path.startsWith(rolePath)) {
    return <Navigate to={`${rolePath}/overview`} replace />;
  }

  return children;
}
