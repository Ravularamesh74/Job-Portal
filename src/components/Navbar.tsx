import { useState, useEffect } from "react";
import {
  Briefcase,
  Bell,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled
        ? "bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/10"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg">
            <Briefcase className="text-black" size={18} />
          </div>
          <span className="text-xl font-bold text-white">
            Job<span className="text-accent">Connect</span>
          </span>
        </Link>

        {/* Search (Desktop) */}
        <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-80 backdrop-blur-xl">
          <Search size={16} className="text-white/40 mr-2" />
          <input
            placeholder="Search jobs..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {["Jobs", "Companies", "Salaries", "Resources"].map((item) => (
            <a
              key={item}
              className="text-white/70 hover:text-white relative group"
              href="#"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
            <Bell size={18} className="text-white/70" />
          </button>

          {/* Profile / Auth */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-accent text-black flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown size={14} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 backdrop-blur-xl rounded-xl p-2 shadow-xl">
                  {[
                    { label: "Profile", path: "/profile" },
                    { label: "Saved Jobs", path: "/saved-jobs" },
                    { label: "Settings", path: "/settings" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-semibold transition"
            >
              Sign In
            </Link>
          )}

          {/* CTA */}
          <Link
            to="/post-job"
            className="hidden md:block px-4 py-2 rounded-lg bg-accent text-black font-semibold hover:scale-105 transition text-center"
          >
            Post Job
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 backdrop-blur-xl">
          <div className="p-4 space-y-3">
            {["Jobs", "Companies", "Salaries", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-white/70 hover:text-white"
              >
                {item}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="w-full py-2.5 rounded-lg bg-white/10 text-center text-sm"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-lg bg-red-400/10 text-red-400 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-white/10 text-center text-sm"
                >
                  Sign In
                </Link>
              )}
              <Link
                to="/post-job"
                onClick={() => setOpen(false)}
                className="w-full py-2 rounded-lg bg-accent text-black font-semibold text-center"
              >
                Post Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
