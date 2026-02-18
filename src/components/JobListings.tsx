import { useState } from "react";
import { MapPin, Clock, DollarSign, Bookmark, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { JOBS } from "@/data/jobs";

const FILTERS = ["All Jobs", "Full-time", "Part-time", "Remote", "Contract", "Internship"];

const typeColor: Record<string, string> = {
  "Full-time": "job-tag-navy",
  "Remote":    "job-tag",
  "Part-time": "job-tag-orange",
  "Contract":  "job-tag-orange",
};

const JobListings = () => {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [saved, setSaved] = useState<number[]>([]);

  const toggleSave = (id: number) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filtered = JOBS.filter(
    (j) => activeFilter === "All Jobs" || j.type === activeFilter
  );

  return (
    <section className="section-alt">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-accent">Latest Openings</p>
            <h2 className="font-display text-3xl font-800 text-foreground md:text-4xl">
              Featured Jobs
            </h2>
          </div>
          <a href="#" className="btn-outline text-sm">View All Jobs →</a>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? "text-accent-foreground shadow-glow"
                  : "border border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-accent"
              }`}
              style={activeFilter === f ? { background: "var(--gradient-cta)" } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <div
              key={job.id}
              className={`job-card relative flex flex-col gap-4 ${job.featured ? "ring-1 ring-accent/30" : ""}`}
            >
              {/* Featured badge */}
              {job.featured && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                  Featured
                </span>
              )}

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
                    style={{ backgroundColor: job.logoColor }}
                  >
                    {job.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{job.company}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {job.rating}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSave(job.id)}
                  className={`rounded-lg p-2 transition-all ${
                    saved.includes(job.id) ? "text-accent" : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${saved.includes(job.id) ? "fill-accent" : ""}`} />
                </button>
              </div>

              {/* Title */}
              <Link to={`/jobs/${job.id}`} className="group">
                <h3 className="font-display text-lg font-700 text-foreground leading-snug group-hover:text-accent transition-colors">
                  {job.title}
                </h3>
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" /> {job.salary}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className={typeColor[job.type] || "job-tag"}>{job.type}</span>
                {job.tags.map((t) => (
                  <span key={t} className="job-tag-navy">{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {job.posted}
                </span>
                <Link to={`/jobs/${job.id}`} className="btn-cta px-4 py-2 text-xs">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
