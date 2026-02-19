import { useState, useEffect } from "react";
import { Search, MapPin, Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  "Software Engineer",
  "AI Developer",
  "MERN Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    const role = ROLES[roleIndex];
    let i = 0;

    const typing = setInterval(() => {
      setTypedRole(role.slice(0, i));
      i++;
      if (i > role.length) {
        clearInterval(typing);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 1200);
      }
    }, 70);

    return () => clearInterval(typing);
  }, [roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#00ffc3_0%,transparent_25%),radial-gradient(circle_at_80%_70%,#7c3aed_0%,transparent_25%)] opacity-20" />

      {/* Floating glow blobs */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-96 h-96 bg-accent/20 blur-[120px] rounded-full top-10 left-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full bottom-10 right-10"
      />

      <div className="relative z-10 text-center px-4 max-w-6xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
        >
          <Sparkles size={16} className="text-accent" />
          <span className="text-sm">AI-Powered Job Discovery</span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Find Your Dream Job as a{" "}
          <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
            {typedRole}
          </span>
        </h1>

        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg">
          Discover opportunities from top global companies and startups. Smart
          recommendations powered by AI.
        </p>

        {/* Glass Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl"
        >
          {/* Input */}
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search className="text-accent" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="bg-transparent outline-none w-full placeholder:text-white/40"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 px-3 border-t md:border-t-0 md:border-l border-white/20">
            <MapPin size={18} className="text-white/60" />
            <input
              placeholder="Remote or City"
              className="bg-transparent outline-none placeholder:text-white/40"
            />
          </div>

          {/* Voice */}
          <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
            <Mic size={18} />
          </button>

          {/* CTA */}
          <button className="px-6 py-3 rounded-xl bg-accent text-black font-semibold hover:scale-105 transition">
            Search Jobs
          </button>
        </motion.div>

        {/* Trending tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Remote", "Fresher Jobs", "MERN", "AI Jobs", "Startup"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full hover:bg-accent hover:text-black cursor-pointer transition"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-8 mt-14 text-center">
          {[
            { num: "2M+", label: "Jobs" },
            { num: "180K+", label: "Companies" },
            { num: "6M+", label: "Developers" },
          ].map((s) => (
            <motion.div key={s.label} whileHover={{ scale: 1.1 }}>
              <p className="text-3xl font-bold text-accent">{s.num}</p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
