import { Star, Users, Briefcase, Globe } from "lucide-react";

const COMPANIES = [
  { name: "Google",    letter: "G", color: "#4285F4", openRoles: 342, employees: "100K+", industry: "Technology",    rating: 4.8 },
  { name: "Microsoft", letter: "M", color: "#00A4EF", openRoles: 218, employees: "220K+", industry: "Technology",    rating: 4.6 },
  { name: "Amazon",    letter: "A", color: "#FF9900", openRoles: 587, employees: "1.5M+", industry: "E-Commerce",    rating: 4.3 },
  { name: "Apple",     letter: "A", color: "#555555", openRoles: 195, employees: "160K+", industry: "Consumer Tech", rating: 4.7 },
  { name: "Meta",      letter: "M", color: "#0866FF", openRoles: 264, employees: "70K+",  industry: "Social Media",  rating: 4.4 },
  { name: "Netflix",   letter: "N", color: "#E50914", openRoles: 89,  employees: "12K+",  industry: "Streaming",    rating: 4.5 },
  { name: "Salesforce",letter: "S", color: "#00A1E0", openRoles: 176, employees: "80K+",  industry: "SaaS",         rating: 4.4 },
  { name: "Spotify",   letter: "S", color: "#1DB954", openRoles: 143, employees: "9K+",   industry: "Music Tech",   rating: 4.6 },
];

const FeaturedCompanies = () => (
  <section className="section">
    <div className="container mx-auto">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Top Employers</p>
        <h2 className="font-display text-3xl font-800 text-foreground md:text-4xl">
          Featured Companies
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Thousands of world-class employers trust JobConnect to find their next great hire.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COMPANIES.map((c) => (
          <div
            key={c.name}
            className="group cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-card)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "var(--shadow-card-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "var(--shadow-card)")
            }
          >
            {/* Logo + Rating */}
            <div className="mb-4 flex items-center justify-between">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white shadow-sm"
                style={{ backgroundColor: c.color }}
              >
                {c.letter}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {c.rating}
              </div>
            </div>

            <h3 className="font-display text-lg font-700 text-foreground">{c.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{c.industry}</p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" /> {c.openRoles} open roles
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> {c.employees}
              </span>
            </div>

            <button className="btn-outline mt-4 w-full justify-center border-border text-sm group-hover:border-accent group-hover:text-accent">
              View Jobs
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="#" className="btn-primary inline-flex gap-2">
          <Globe className="h-4 w-4" /> Explore All Companies
        </a>
      </div>
    </div>
  </section>
);

export default FeaturedCompanies;
