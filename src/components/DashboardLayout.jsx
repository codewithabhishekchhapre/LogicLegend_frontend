import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  GraduationCap,
  FileText,
  MessageSquare,
  Award,
  ClipboardList,
  Calendar,
  User,
} from "lucide-react";

const ADMIN_MENU = [
  { path: "overview", label: "Overview", icon: LayoutDashboard },
  { path: "users", label: "User Management", icon: Users },
  { path: "courses", label: "Course Moderation", icon: BookOpen },
  { path: "enrollments", label: "Enrollments", icon: GraduationCap },
  { path: "categories", label: "Categories", icon: FolderOpen },
  { path: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { path: "settings", label: "System Settings", icon: Settings },
  { path: "profile", label: "Profile", icon: User },
];

const INSTRUCTOR_MENU = [
  { path: "overview", label: "Overview", icon: LayoutDashboard },
  { path: "courses", label: "My Courses", icon: BookOpen },
  { path: "assignments", label: "Assignments", icon: FileText },
  { path: "students", label: "Student Performance", icon: GraduationCap },
  { path: "attendance", label: "Attendance", icon: Calendar },
  { path: "announcements", label: "Announcements", icon: MessageSquare },
  { path: "profile", label: "Profile", icon: User },
];

const STUDENT_MENU = [
  { path: "overview", label: "Overview", icon: LayoutDashboard },
  { path: "courses", label: "My Courses", icon: BookOpen },
  { path: "assignments", label: "Assignments", icon: FileText },
  { path: "quizzes", label: "Quizzes", icon: ClipboardList },
  { path: "certificates", label: "Certificates", icon: Award },
  { path: "profile", label: "Profile", icon: User },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenu = () => {
    if (user?.role === "ADMIN") return ADMIN_MENU;
    if (user?.role === "INSTRUCTOR") return INSTRUCTOR_MENU;
    return STUDENT_MENU;
  };

  const basePath = `/dashboard/${user?.role?.toLowerCase()}`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800 text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-700">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">Learnova</span>
              <span className="text-yellow-400 text-sm">LMS</span>
            </Link>
            <p className="text-slate-400 text-xs mt-1 capitalize">{user?.role?.toLowerCase()} Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {getMenu().map((item) => (
              <NavLink
                key={item.path}
                to={`${basePath}/${item.path}`}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive ? "bg-yellow-500 text-slate-900" : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-700">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <LayoutDashboard size={20} />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.first_name} {user?.last_name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
