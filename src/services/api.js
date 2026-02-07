/**
 * Learnova LMS - API Service
 * Centralized axios instance with auth interceptors
 */
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://learnova-production.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Response interceptor: handle 401, refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post(`${API_BASE.replace("/api/v1", "")}/api/v1/auth/token/refresh/`, {
            refresh,
          });
          localStorage.setItem("access_token", data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch (_) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(err);
  }
);

// ============ Auth ============
export const authApi = {
  users: (params) => api.get("/auth/users/", { params }), // Admin only
  login: (username, password) =>
    api.post("/auth/token/", { username, password }),
  refresh: (refresh) =>
    api.post("/auth/token/refresh/", { refresh }),
  register: (data) =>
    api.post("/auth/users/", data),
  me: () => api.get("/auth/users/me/"),
  updateMe: (data) => api.patch("/auth/users/me/", data),
};

// ============ Courses ============
export const coursesApi = {
  list: (params) => api.get("/courses/", { params }),
  get: (id) => api.get(`/courses/${id}/`),
  create: (data) => api.post("/courses/", data),
  update: (id, data) => api.patch(`/courses/${id}/`, data),
  delete: (id) => api.delete(`/courses/${id}/`),
  categories: () => api.get("/courses/categories/"),
  categoryCreate: (data) => api.post("/courses/categories/", data),
  categoryUpdate: (id, data) => api.patch(`/courses/categories/${id}/`, data),
  categoryDelete: (id) => api.delete(`/courses/categories/${id}/`),
};

// ============ Enrollments ============
export const enrollmentsApi = {
  list: (params) => api.get("/enrollments/", { params }),
  enroll: (courseId) => api.post("/enrollments/enroll/", { course_id: courseId }),
  myCourses: () => api.get("/enrollments/my-courses/"),
  certificates: () => api.get("/enrollments/certificates/"),
};

// ============ Assessments ============
export const assessmentsApi = {
  quizzes: (params) => api.get("/assessments/quizzes/", { params }),
  quizAttempts: () => api.get("/assessments/quiz-attempts/"),
  assignments: (params) => api.get("/assessments/assignments/", { params }),
  submissions: () => api.get("/assessments/submissions/"),
};

// ============ Analytics ============
export const analyticsApi = {
  overview: () => api.get("/analytics/dashboard/overview/"),
  instructorStudents: (courseId) =>
    api.get("/analytics/dashboard/instructor/students/", {
      params: courseId ? { course_id: courseId } : {},
    }),
};

// ============ Communications ============
export const communicationsApi = {
  list: (params) => api.get("/communications/announcements/", { params }),
  create: (data) => api.post("/communications/announcements/", data),
  update: (id, data) => api.patch(`/communications/announcements/${id}/`, data),
  delete: (id) => api.delete(`/communications/announcements/${id}/`),
};

// ============ Attendance ============
export const attendanceApi = {
  liveSessions: (params) => api.get("/attendance/sessions/", { params }),
  attendance: (params) => api.get("/attendance/", { params }),
};
