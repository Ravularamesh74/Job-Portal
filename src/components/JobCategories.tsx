import {
  Code2, Stethoscope, TrendingUp, Palette, ShieldCheck,
  FlaskConical, Building2, GraduationCap, Wrench, Truck,
  Megaphone, BarChart3,
} from "lucide-react";

const CATEGORIES = [
  { icon: Code2,        label: "Technology",       count: "124K+" },
  { icon: Stethoscope,  label: "Healthcare",        count: "89K+" },
  { icon: TrendingUp,   label: "Finance",           count: "67K+" },
  { icon: Palette,      label: "Design & Creative", count: "45K+" },
  { icon: ShieldCheck,  label: "Legal",             count: "32K+" },
  { icon: FlaskConical, label: "Science",           count: "28K+" },
  { icon: Building2,    label: "Real Estate",       count: "21K+" },
  { icon: GraduationCap,label: "Education",         count: "58K+" },
  { icon: Wrench,       label: "Engineering",       count: "73K+" },
  { icon: Truck,        label: "Logistics",         count: "39K+" },
  { icon: Megaphone,    label: "Marketing",         count: "52K+" },
  { icon: BarChart3,    label: "Analytics",         count: "41K+" },
];

const JobCategories = () => (
  <section className="section">
    <div className="container mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Browse by Category</p>
        <h2 className="font-display text-3xl font-800 text-foreground md:text-4xl">
          Explore Top Industries
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          From tech to healthcare, find open positions across every sector of the economy.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {CATEGORIES.map(({ icon: Icon, label, count }) => (
          <div key={label} className="category-card group">
            <div className="cat-icon">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{count} jobs</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default JobCategories;
