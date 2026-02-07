import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import InstructorDashboard from "./InstructorDashboard";
import StudentDashboard from "./StudentDashboard";

/**
 * Role-based Dashboard Router
 * Redirects to the correct dashboard based on user role
 */
export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "INSTRUCTOR":
      return <InstructorDashboard />;
    case "STUDENT":
    default:
      return <StudentDashboard />;
  }
}
