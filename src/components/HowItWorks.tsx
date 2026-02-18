import { CheckCircle, FileText, Send, ThumbsUp } from "lucide-react";

const STEPS = [
  { icon: FileText,    step: "01", title: "Create Profile",        desc: "Build your professional profile with skills, experience, and portfolio in minutes." },
  { icon: Send,        step: "02", title: "Discover Jobs",         desc: "Browse thousands of curated roles matched to your skills and preferences." },
  { icon: CheckCircle, step: "03", title: "Apply with One Click",  desc: "Apply instantly to multiple positions with your saved profile and resume." },
  { icon: ThumbsUp,    step: "04", title: "Get Hired",             desc: "Receive offers, negotiate salary, and land your dream role." },
];

const HowItWorks = () => (
  <section className="section overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
    <div className="container mx-auto">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Simple Process</p>
        <h2 className="font-display text-3xl font-800 text-white md:text-4xl">
          How JobConnect Works
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-white/60">
          Land your next opportunity in four easy steps. From profile to paycheck.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, step, title, desc }, i) => (
          <div key={step} className="relative flex flex-col items-center text-center">
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute left-[calc(50%+3rem)] top-8 hidden h-px w-[calc(100%-3rem)] border-t-2 border-dashed border-accent/30 lg:block" />
            )}

            {/* Icon circle */}
            <div
              className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl animate-pulse-glow"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Icon className="h-7 w-7 text-white" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-accent ring-2 ring-accent/40">
                {i + 1}
              </span>
            </div>

            <h3 className="font-display mb-2 text-lg font-700 text-white">{title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <a href="#" className="btn-cta px-10 py-4 text-base">
          Get Started Free →
        </a>
        <p className="mt-3 text-sm text-white/40">No credit card required</p>
      </div>
    </div>
  </section>
);

export default HowItWorks;
