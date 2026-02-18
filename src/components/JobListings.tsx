import { useState } from "react";
import { MapPin, Clock, DollarSign, Bookmark, Star } from "lucide-react";

const FILTERS = ["All Jobs", "Full-time", "Part-time", "Remote", "Contract", "Internship"];

const JOBS = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Google",
    logo: "G",
    logoColor: "#4285F4",
    location: "Mountain View, CA",
    salary: "$180K – $240K",
    type: "Full-time",
    posted: "2h ago",
    tags: ["React", "Node.js", "TypeScript"],
    featured: true,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Microsoft",
    logo: "M",
    logoColor: "#00A4EF",
    location: "Seattle, WA",
    salary: "$150K – $200K",
    type: "Full-time",
    posted: "5h ago",
    tags: ["Agile", "Roadmap", "B2B"],
    featured: false,
    rating: 4.6,
  },
  {
    id: 3,
    title: "UX Design Lead",
    company: "Apple",
    logo: "A",
    logoColor: "#555",
    location: "Cupertino, CA",
    salary: "$160K – $210K",
    type: "Full-time",
    posted: "1d ago",
    tags: ["Figma", "User Research", "Design Systems"],
    featured: true,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Netflix",
    logo: "N",
    logoColor: "#E50914",
    location: "Remote",
    salary: "$140K – $190K",
    type: "Remote",
    posted: "1d ago",
    tags: ["Python", "ML", "SQL"],
    featured: false,
    rating: 4.5,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Amazon",
    logo: "A",
    logoColor: "#FF9900",
    location: "Austin, TX",
    salary: "$130K – $175K",
    type: "Full-time",
    posted: "2d ago",
    tags: ["AWS", "Kubernetes", "Terraform"],
    featured: false,
    rating: 4.3,
  },
  {
    id: 6,
    title: "Marketing Director",
    company: "Salesforce",
    logo: "S",
    logoColor: "#00A1E0",
    location: "San Francisco, CA",
    salary: "$145K – $185K",
    type: "Full-time",
    posted: "3d ago",
    tags: ["B2B", "SaaS", "Demand Gen"],
    featured: false,
    rating: 4.4,
  },
];

const typeColor: Record<string, string> = {
  "Full-time": "job-tag-navy",
  "Remote": "job-tag",
  "Part-time": "job-tag-orange",
  "Contract": "job-tag-orange",
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
            <div key={job.id} className={`job-card relative flex flex-col gap-4 ${job.featured ? "ring-1 ring-accent/30" : ""}`}>
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
                    saved.includes(job.id)
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${saved.includes(job.id) ? "fill-accent" : ""}`} />
                </button>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-lg font-700 text-foreground leading-snug">{job.title}</h3>
              </div>

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
                <button className="btn-cta px-4 py-2 text-xs">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
