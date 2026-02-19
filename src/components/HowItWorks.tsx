import { CheckCircle, FileText, Send, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: FileText,
    title: "Create Your Profile",
    desc: "Build a powerful profile with skills, experience, and portfolio in under 2 minutes.",
  },
  {
    icon: Send,
    title: "Discover Smart Matches",
    desc: "Our AI matches you with jobs based on your skills, goals, and preferences.",
  },
  {
    icon: CheckCircle,
    title: "Apply Instantly",
    desc: "One-click apply with saved resumes and smart autofill applications.",
  },
  {
    icon: ThumbsUp,
    title: "Get Hired Faster",
    desc: "Receive interview calls, negotiate offers, and land your dream job.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#00ffc320,transparent_30%),radial-gradient(circle_at_80%_80%,#7c3aed20,transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent uppercase text-sm tracking-widest font-semibold">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Get Hired in 4 Simple Steps
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            A seamless journey from profile creation to landing your dream job.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 hidden md:block" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`mb-12 flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="md:w-1/2 px-6">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Icon center */}
                <div className="relative flex items-center justify-center md:w-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg z-10">
                    <Icon className="text-white" size={22} />
                  </div>

                  {/* Step number */}
                  <span className="absolute -bottom-6 text-xs text-white/40">
                    Step {i + 1}
                  </span>
                </div>

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-accent text-black font-semibold shadow-xl"
          >
            Start Your Journey →
          </motion.button>
          <p className="text-white/40 text-sm mt-3">
            No signup fees • 100% free for job seekers
          </p>
        </div>
      </div>
    </section>
  );
}
