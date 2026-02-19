import {
  Briefcase,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const LINKS = {
  "For Job Seekers": [
    "Browse Jobs",
    "Career Resources",
    "Resume Builder",
    "Salary Calculator",
    "Job Alerts",
  ],
  "For Employers": [
    "Post a Job",
    "Talent Search",
    "Employer Branding",
    "Pricing",
    "ATS Integration",
  ],
  Company: ["About Us", "Careers", "Press", "Blog", "Contact"],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Accessibility",
  ],
};

export default function SiteFooter() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Gradient divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg">
                <Briefcase size={18} className="text-black" />
              </div>
              <span className="text-xl font-bold">
                Job<span className="text-accent">Connect</span>
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              The world’s most trusted job platform. Connecting millions of
              professionals with top companies globally.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:border-accent hover:text-accent transition"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-white/70 mb-2">
                Get job alerts
              </p>
              <div className="flex gap-2">
                <input
                  placeholder="you@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                />
                <button className="px-4 rounded-lg bg-accent text-black font-semibold hover:scale-105 transition">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm">
                {title}
              </h4>
              <ul className="space-y-2 text-sm">
                {links.map((l) => (
                  <li key={l}>
                    <a className="text-white/50 hover:text-accent transition flex items-center gap-1 group cursor-pointer">
                      {l}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 JobConnect. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">English</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-6 right-6 bg-accent text-black w-10 h-10 rounded-full shadow-lg"
      >
        ↑
      </motion.button>
    </footer>
  );
}
