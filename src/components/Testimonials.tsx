import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    avatar: "SC",
    color: "#4285F4",
    rating: 5,
    quote: "JobConnect matched me with my dream job in under two weeks. The AI-powered recommendations were incredibly accurate to my skill set.",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager @ Microsoft",
    avatar: "MJ",
    color: "#00A4EF",
    rating: 5,
    quote: "I went from unemployed to a $200K offer in 30 days. The one-click apply feature saved me hours of repetitive form-filling.",
  },
  {
    name: "Priya Patel",
    role: "UX Designer @ Apple",
    avatar: "PP",
    color: "#555",
    rating: 5,
    quote: "The company insights and salary data helped me negotiate 20% above the initial offer. An absolute game changer.",
  },
];

const Testimonials = () => (
  <section className="section-alt">
    <div className="container mx-auto">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Success Stories</p>
        <h2 className="font-display text-3xl font-800 text-foreground md:text-4xl">
          People Love JobConnect
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="job-card flex flex-col gap-4">
            <Quote className="h-8 w-8 text-accent/30" />
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
