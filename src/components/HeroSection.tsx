import { useState } from "react";
import { Search, MapPin, ChevronDown, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const POPULAR_SEARCHES = ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "Marketing Manager"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background image overlay */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute right-10 top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "hsl(168 76% 42% / 0.15)" }} />
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "hsl(222 70% 30% / 0.3)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent animate-fade-in-up opacity-0 animate-delay-100">
          <TrendingUp className="h-4 w-4" />
          Over 2 Million Jobs Available
        </div>

        {/* Heading */}
        <h1 className="font-display mb-4 text-4xl font-900 leading-tight tracking-tight text-white md:text-6xl lg:text-7xl animate-fade-in-up opacity-0 animate-delay-200">
          Find Your Dream<br />
          <span style={{ color: "hsl(var(--accent))" }}>Career</span> Today
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-white/60 animate-fade-in-up opacity-0 animate-delay-300">
          Connect with top employers. Discover thousands of opportunities across every industry and level.
        </p>

        {/* Search Bar */}
        <div className="search-bar mx-auto max-w-3xl animate-fade-in-up opacity-0 animate-delay-400">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search className="h-5 w-5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skills, or company"
              className="flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          <div className="hidden h-10 w-px bg-border sm:block" />

          <div className="hidden items-center gap-2 px-3 sm:flex">
            <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="w-36 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          <button className="btn-cta shrink-0 rounded-xl px-8">
            Search Jobs
          </button>
        </div>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up opacity-0 animate-delay-400">
          <span className="text-sm text-white/40">Popular:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-white/60 transition-all hover:border-accent/50 hover:text-accent"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 animate-fade-in-up opacity-0 animate-delay-400">
          {[
            { num: "2M+", label: "Active Jobs" },
            { num: "150K+", label: "Companies" },
            { num: "5M+", label: "Job Seekers" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-800 text-white md:text-4xl">{s.num}</p>
              <p className="mt-1 text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80H1440V40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="hsl(210 20% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
