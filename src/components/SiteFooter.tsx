import { Briefcase, Mail, Twitter, Linkedin, Github, Youtube } from "lucide-react";

const LINKS = {
  "For Job Seekers": ["Browse Jobs", "Career Resources", "Resume Builder", "Salary Calculator", "Job Alerts"],
  "For Employers": ["Post a Job", "Talent Search", "Employer Branding", "Pricing", "ATS Integration"],
  "Company": ["About Us", "Careers", "Press", "Blog", "Contact"],
  "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

const SiteFooter = () => (
  <footer className="border-t border-border bg-primary">
    <div className="container mx-auto px-4 py-14">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Briefcase className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-800 text-white">
              Job<span className="text-accent">Connect</span>
            </span>
          </div>
          <p className="mb-6 text-sm text-white/50 leading-relaxed">
            The world's most trusted job platform. Connecting 5 million professionals with 150,000+ companies globally.
          </p>
          <div className="flex gap-3">
            {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-white/70">Get job alerts</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent"
              />
              <button className="btn-cta rounded-lg px-4 text-sm">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="mb-4 text-sm font-semibold text-white">{heading}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/50 transition-colors hover:text-accent">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <p className="text-xs text-white/30">© 2026 JobConnect. All rights reserved.</p>
        <p className="text-xs text-white/30">Made with ❤️ for job seekers worldwide</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
