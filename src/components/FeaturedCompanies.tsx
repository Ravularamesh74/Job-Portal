import { Star, Users, Briefcase, Globe, Bookmark, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const COMPANIES = [
  {
    name: "Google",
    color: "#4285F4",
    industry: "AI & Cloud",
    rating: 4.8,
    openRoles: 342,
    employees: "100K+",
    skills: ["React", "AI", "Cloud", "Go"],
    hot: true,
  },
  {
    name: "Microsoft",
    color: "#00A4EF",
    industry: "Enterprise Tech",
    rating: 4.6,
    openRoles: 218,
    employees: "220K+",
    skills: ["Azure", "Node", "C#", "AI"],
  },
  {
    name: "Amazon",
    color: "#FF9900",
    industry: "E-Commerce",
    rating: 4.3,
    openRoles: 587,
    employees: "1.5M+",
    skills: ["AWS", "Java", "React"],
    hot: true,
  },
  {
    name: "Netflix",
    color: "#E50914",
    industry: "Streaming",
    rating: 4.5,
    openRoles: 89,
    employees: "12K+",
    skills: ["Backend", "Data", "Scala"],
  },
];

export default function FeaturedCompanies() {
  const [saved, setSaved] = useState([]);

  const toggleSave = (name) => {
    setSaved((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm uppercase tracking-widest font-semibold">
            Top Employers
          </p>
          <h2 className="text-4xl font-bold mt-2">Work With The Best</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Join companies shaping the future of technology and innovation.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border bg-white/70 backdrop-blur-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition rounded-2xl blur-xl"
                style={{ background: `${c.color}30` }}
              />

              {/* Top */}
              <div className="flex justify-between items-start relative z-10">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: c.color }}
                >
                  {c.name[0]}
                </div>

                <button
                  onClick={() => toggleSave(c.name)}
                  className={`transition ${
                    saved.includes(c.name)
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Bookmark size={18} />
                </button>
              </div>

              {/* HOT BADGE */}
              {c.hot && (
                <span className="absolute top-4 left-4 flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  <TrendingUp size={12} /> Hiring Fast
                </span>
              )}

              {/* NAME */}
              <h3 className="text-lg font-bold mt-4">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.industry}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="font-medium">{c.rating}</span>

                {/* Progress bar */}
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${c.rating * 20}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mt-3">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-md"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {c.openRoles} jobs
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {c.employees}
                </span>
              </div>

              {/* CTA */}
              <button className="mt-5 w-full rounded-lg bg-black text-white py-2 text-sm hover:bg-accent transition">
                View Open Roles
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            <Globe size={16} /> Explore All Companies
          </button>
        </div>
      </div>
    </section>
  );
}
