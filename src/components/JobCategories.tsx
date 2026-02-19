import {
  Code2, Stethoscope, TrendingUp, Palette, ShieldCheck,
  FlaskConical, Building2, GraduationCap, Wrench, Truck,
  Megaphone, BarChart3, Flame
} from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { icon: Code2, label: "Technology", count: 124, color: "#00FFC3", hot: true },
  { icon: Stethoscope, label: "Healthcare", count: 89, color: "#FF4D6D" },
  { icon: TrendingUp, label: "Finance", count: 67, color: "#FFD166" },
  { icon: Palette, label: "Design", count: 45, color: "#7C3AED" },
  { icon: ShieldCheck, label: "Legal", count: 32, color: "#22C55E" },
  { icon: FlaskConical, label: "Science", count: 28, color: "#38BDF8" },
  { icon: Building2, label: "Real Estate", count: 21, color: "#FB7185" },
  { icon: GraduationCap, label: "Education", count: 58, color: "#F59E0B" },
  { icon: Wrench, label: "Engineering", count: 73, color: "#10B981" },
  { icon: Truck, label: "Logistics", count: 39, color: "#6366F1" },
  { icon: Megaphone, label: "Marketing", count: 52, color: "#EC4899" },
  { icon: BarChart3, label: "Analytics", count: 41, color: "#14B8A6" },
];

export default function JobCategories() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#00ffc320,transparent_30%),radial-gradient(circle_at_80%_80%,#7c3aed20,transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-accent uppercase text-sm tracking-widest font-semibold">
            Job Categories
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Explore by Industry
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Discover opportunities across every major sector and fast-growing industries.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition"
                  style={{ background: `${cat.color}25` }}
                />

                {/* HOT badge */}
                {cat.hot && (
                  <span className="absolute top-2 right-2 text-[10px] flex items-center gap-1 bg-red-500 px-2 py-0.5 rounded-full">
                    <Flame size={10} /> Hot
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl mb-3 shadow-lg"
                  style={{ background: cat.color }}
                >
                  <Icon size={20} className="text-black" />
                </div>

                {/* Title */}
                <p className="font-semibold text-sm group-hover:text-accent transition">
                  {cat.label}
                </p>

                {/* Count */}
                <p className="text-xs text-white/50 mt-1">
                  {cat.count}K+ jobs
                </p>

                {/* Popularity bar */}
                <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(cat.count, 100)}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button className="px-8 py-4 rounded-full bg-accent text-black font-semibold hover:scale-105 transition shadow-lg">
            Browse All Categories →
          </button>
        </div>
      </div>
    </section>
  );
}
