import { useState, useMemo, useEffect } from "react";
import { MapPin, Clock, DollarSign, Bookmark, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { JOBS } from "@/data/jobs";

const FILTERS = ["All Jobs", "Full-time", "Remote", "Part-time", "Contract"];

export default function JobListings() {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [saved, setSaved] = useState([]);

  // Load saved jobs
  useEffect(() => {
    const stored = localStorage.getItem("savedJobs");
    if (stored) setSaved(JSON.parse(stored));
  }, []);

  // Persist saved jobs
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filteredJobs = useMemo(() => {
    return JOBS.filter(
      (j) => activeFilter === "All Jobs" || j.type === activeFilter
    );
  }, [activeFilter]);

  return (
    <section className="relative py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <p className="text-accent text-sm uppercase font-semibold tracking-widest">
              Latest Openings
            </p>
            <h2 className="text-4xl font-bold mt-2">Featured Jobs</h2>
          </div>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            View All →
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeFilter === f
                  ? "bg-accent text-black font-semibold"
                  : "bg-white/5 border border-white/10 hover:border-white/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition group"
            >
              {/* Featured badge */}
              {job.featured && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] bg-accent text-black px-2 py-1 rounded-full">
                  <Zap size={10} /> Featured
                </span>
              )}

              {/* Top */}
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                    style={{ background: job.logoColor }}
                  >
                    {job.logo}
                  </div>
                  <div>
                    <p className="font-semibold">{job.company}</p>
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      {job.rating}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleSave(job.id)}
                  className="text-white/50 hover:text-accent transition"
                >
                  <Bookmark
                    size={18}
                    className={saved.includes(job.id) ? "fill-accent text-accent" : ""}
                  />
                </button>
              </div>

              {/* Title */}
              <Link to={`/jobs/${job.id}`}>
                <h3 className="mt-4 font-semibold text-lg group-hover:text-accent transition">
                  {job.title}
                </h3>
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-white/50 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> {job.salary}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-md">
                  {job.type}
                </span>
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-white/10 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/10">
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Clock size={14} /> {job.posted}
                </span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="px-4 py-2 text-xs rounded-lg bg-accent text-black font-semibold hover:scale-105 transition"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
