import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/eduvion-logo.jpg";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    if (!role) return "";
    const labels = { ADMIN: "Admin", INSTRUCTOR: "Instructor", STUDENT: "Student" };
    return labels[role] || role;
  };

  const menuItems = [
    { title: "Courses", options: [
      { label: "All Courses", path: "/courses" },
      ...(user?.role === "STUDENT" ? [{ label: "My Courses", path: "/my-courses" }] : []),
    ]},
    ...(user ? [{ title: "Dashboard", options: [
      { label: `${getRoleLabel(user.role)} Dashboard`, path: "/dashboard" },
    ]}] : []),
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo + Desktop Menu */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="Eduvion" className="h-12 w-auto" />
            <span className="text-2xl font-semibold text-slate-900">
              Edu<span className="text-yellow-500">vion</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setActiveMenu(index)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-500 transition-colors duration-200">
                  {item.title}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${activeMenu === index ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeMenu === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-3 w-56 rounded-xl bg-white shadow-2xl border border-gray-100"
                    >
                      <ul className="py-2">
                        {item.options.map((opt, i) => (
                          <motion.li
                            key={opt.label || opt.path || i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
                            whileHover={{ x: 6, scale: 1.02 }}
                            className="px-4 py-2 text-sm text-slate-700 hover:bg-yellow-50 hover:text-yellow-600 cursor-pointer rounded-lg transition"
                          >
                            {opt.path ? <Link to={opt.path}>{opt.label}</Link> : opt.label}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-yellow-500 transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <span className="text-sm text-gray-500">({getRoleLabel(user.role)})</span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-red-500 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-yellow-500 transition">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2 text-sm text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition">
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden z-50" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between items-center text-sm font-medium text-slate-700 cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-50 transition"
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                  >
                    {item.title}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${activeMenu === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeMenu === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-4 flex flex-col gap-2 overflow-hidden"
                      >
                        {item.options.map((opt, i) => (
                          opt.path ? (
                            <Link
                              key={opt.path}
                              to={opt.path}
                              onClick={() => setOpen(false)}
                              className="text-sm text-gray-600 hover:text-yellow-500 transition py-1 px-2 rounded-lg block"
                            >
                              {opt.label}
                            </Link>
                          ) : (
                            <div key={i} className="text-sm text-gray-600 py-1 px-2">{opt.label}</div>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="w-full text-center py-2 text-sm font-medium text-slate-700">
                      Dashboard ({getRoleLabel(user.role)})
                    </Link>
                    <button
                      onClick={() => { logout(); setOpen(false); navigate("/"); }}
                      className="w-full py-2 text-sm text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="w-full text-center py-2 text-sm font-medium text-slate-700">
                      Login
                    </Link>
                    <Link to="/register" className="w-full text-center px-5 py-2 text-sm text-white bg-yellow-500 rounded-full">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
