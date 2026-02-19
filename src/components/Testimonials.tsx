import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rohit Sharma",
    role: "Software Engineer @ Google India",
    avatar: "RS",
    color: "#4285F4",
    rating: 5,
    quote:
      "I switched from a service company to Google in just 3 weeks using JobConnect. The AI recommendations matched my MERN stack profile perfectly.",
  },
  {
    name: "Ananya Reddy",
    role: "UI/UX Designer @ Infosys",
    avatar: "AR",
    color: "#0F6CBD",
    rating: 5,
    quote:
      "As a fresher, I struggled to get interviews. JobConnect helped me land multiple offers within a month. The resume insights were super helpful.",
  },
  {
    name: "Vikram Singh",
    role: "Product Manager @ Microsoft India",
    avatar: "VS",
    color: "#00A4EF",
    rating: 5,
    quote:
      "The salary insights helped me negotiate from 18 LPA to 24 LPA. I finally feel confident during job switches thanks to JobConnect.",
  },
  {
    name: "Priya Nair",
    role: "Data Analyst @ TCS",
    avatar: "PN",
    color: "#E50914",
    rating: 5,
    quote:
      "The job alerts feature is amazing. I received relevant openings daily and secured a role within 20 days of applying.",
  },
  {
    name: "Karthik Varma",
    role: "Frontend Developer @ Flipkart",
    avatar: "KV",
    color: "#FF9900",
    rating: 5,
    quote:
      "Switching from a startup to Flipkart was my goal. JobConnect made it possible with curated listings and company insights.",
  },
  {
    name: "Sneha Patel",
    role: "HR Specialist @ Deloitte India",
    avatar: "SP",
    color: "#86BC25",
    rating: 5,
    quote:
      "Even as a non-tech professional, I found great opportunities. The platform is not just for developers — it's for everyone.",
  },
];

const Testimonials = () => (
  <section className="section-alt">
    <div className="container mx-auto">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          Success Stories
        </p>
        <h2 className="font-display text-3xl font-800 text-foreground md:text-4xl">
          Loved by Professionals Across India 🇮🇳
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="job-card flex flex-col gap-4">
            <Quote className="h-8 w-8 text-accent/30" />

            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              "{t.quote}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                  />
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
