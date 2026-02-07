import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EduvionLogo from "./components/EduvionLogo";
import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/DashboardLayout";
import DashboardGuard from "./components/DashboardGuard";
import DashboardIndex from "./components/DashboardIndex";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseForm from "./pages/CourseForm";
import MyCourses from "./pages/MyCourses";
import Certificates from "./pages/Certificates";

// Dashboard - Admin
import AdminOverview from "./pages/dashboard/admin/AdminOverview";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminCourses from "./pages/dashboard/admin/AdminCourses";
import AdminReports from "./pages/dashboard/admin/AdminReports";
import AdminCategories from "./pages/dashboard/admin/AdminCategories";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";
import AdminEnrollments from "./pages/dashboard/admin/AdminEnrollments";
import ProfilePage from "./pages/dashboard/ProfilePage";

// Dashboard - Instructor
import InstructorOverview from "./pages/dashboard/instructor/InstructorOverview";
import InstructorCourses from "./pages/dashboard/instructor/InstructorCourses";
import InstructorAssignments from "./pages/dashboard/instructor/InstructorAssignments";
import InstructorStudents from "./pages/dashboard/instructor/InstructorStudents";
import InstructorAttendance from "./pages/dashboard/instructor/InstructorAttendance";
import InstructorAnnouncements from "./pages/dashboard/instructor/InstructorAnnouncements";

// Dashboard - Student
import StudentOverview from "./pages/dashboard/student/StudentOverview";
import StudentCourses from "./pages/dashboard/student/StudentCourses";
import StudentAssignments from "./pages/dashboard/student/StudentAssignments";
import StudentQuizzes from "./pages/dashboard/student/StudentQuizzes";
import StudentCertificates from "./pages/dashboard/student/StudentCertificates";

export default function App() {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowApp(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!showApp) return <EduvionLogo />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main site with Navbar + Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/new" element={<CourseForm />} />
            <Route path="/courses/:id/edit" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/certificates" element={<Certificates />} />
          </Route>

          {/* Dashboard panel - separate layout, no Navbar */}
          <Route path="/dashboard" element={<DashboardGuard><DashboardLayout /></DashboardGuard>}>
            <Route index element={<DashboardIndex />} />
            <Route path="admin/overview" element={<AdminOverview />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/courses" element={<AdminCourses />} />
            <Route path="admin/categories" element={<AdminCategories />} />
            <Route path="admin/enrollments" element={<AdminEnrollments />} />
            <Route path="admin/profile" element={<ProfilePage />} />
            <Route path="admin/courses/new" element={<CourseForm dashboardRole="admin" />} />
            <Route path="admin/courses/:id/edit" element={<CourseForm dashboardRole="admin" />} />
            <Route path="admin/reports" element={<AdminReports />} />
            <Route path="admin/settings" element={<AdminSettings />} />
            <Route path="instructor/overview" element={<InstructorOverview />} />
            <Route path="instructor/courses" element={<InstructorCourses />} />
            <Route path="instructor/courses/new" element={<CourseForm dashboardRole="instructor" />} />
            <Route path="instructor/courses/:id/edit" element={<CourseForm dashboardRole="instructor" />} />
            <Route path="instructor/assignments" element={<InstructorAssignments />} />
            <Route path="instructor/students" element={<InstructorStudents />} />
            <Route path="instructor/attendance" element={<InstructorAttendance />} />
            <Route path="instructor/announcements" element={<InstructorAnnouncements />} />
            <Route path="instructor/profile" element={<ProfilePage />} />
            <Route path="student/overview" element={<StudentOverview />} />
            <Route path="student/courses" element={<StudentCourses />} />
            <Route path="student/assignments" element={<StudentAssignments />} />
            <Route path="student/quizzes" element={<StudentQuizzes />} />
            <Route path="student/certificates" element={<StudentCertificates />} />
            <Route path="student/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
