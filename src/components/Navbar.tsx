import { useState } from "react";
import { Search, MapPin, Briefcase, Menu, X, Bell, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-primary/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Briefcase className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-800 text-white">
            Job<span className="text-accent">Connect</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {["Find Jobs", "Companies", "Salaries", "Career Advice"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <a href="#" className="btn-outline border-white/20 text-sm text-white hover:border-accent hover:text-accent">
            Sign In
          </a>
          <a href="#" className="btn-cta text-sm">
            Post a Job
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-primary/98 px-4 pb-4 md:hidden">
          {["Find Jobs", "Companies", "Salaries", "Career Advice"].map((item) => (
            <a key={item} href="#" className="block py-3 text-sm font-medium text-white/70 hover:text-white">
              {item}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <a href="#" className="btn-outline w-full justify-center border-white/20 text-white">Sign In</a>
            <a href="#" className="btn-cta w-full justify-center">Post a Job</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
