import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, MapPin, DollarSign, Clock, Briefcase, Users, Calendar,
  Star, Bookmark, Share2, CheckCircle2, Upload, X, FileText,
  ChevronRight, ExternalLink, AlertCircle,
} from "lucide-react";
import { JOBS } from "@/data/jobs";

/* ── tiny validation helpers ── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone  = (v: string) => /^[\d\s+\-()\s]{7,20}$/.test(v.trim());

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

const typeColor: Record<string, string> = {
  "Full-time": "job-tag-navy",
  "Remote":    "job-tag",
  "Part-time": "job-tag-orange",
  "Contract":  "job-tag-orange",
};

/* ══════════════════════════════════════════════════════════════════════════ */
export default function JobDetail() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const formRef    = useRef<HTMLDivElement>(null);

  const job = JOBS.find((j) => j.id === Number(id));

  /* form state */
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    linkedin: "", portfolio: "", coverLetter: "",
    experienceYears: "",
  });
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const [saved, setSaved]         = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── 404 guard ── */
  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h1 className="font-display text-2xl font-800 text-foreground">Job not found</h1>
        <Link to="/" className="btn-cta">← Back to Jobs</Link>
      </div>
    );
  }

  /* ── handlers ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      setResumeError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setResumeError("File size must be under 5 MB.");
      return;
    }
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(fakeEvent);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required.";
    else if (form.firstName.trim().length > 60) errs.firstName = "Max 60 characters.";

    if (!form.lastName.trim()) errs.lastName = "Last name is required.";
    else if (form.lastName.trim().length > 60) errs.lastName = "Max 60 characters.";

    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(form.email)) errs.email = "Enter a valid email address.";

    if (form.phone && !isValidPhone(form.phone)) errs.phone = "Enter a valid phone number.";

    if (form.coverLetter.trim().length < 50)
      errs.coverLetter = "Cover letter must be at least 50 characters.";
    else if (form.coverLetter.trim().length > 3000)
      errs.coverLetter = "Cover letter must be under 3,000 characters.";

    if (!resumeFile) errs.resume = "Please attach your resume.";

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1400);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  /* ── success screen ── */
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full animate-pulse-glow"
          style={{ background: "var(--gradient-cta)" }}>
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="font-display text-3xl font-800 text-foreground">Application Submitted!</h1>
        <p className="max-w-sm text-muted-foreground">
          Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has
          been received. We'll be in touch within 5–7 business days.
        </p>
        <div className="flex gap-3">
          <Link to="/" className="btn-outline">← Browse More Jobs</Link>
          <button onClick={() => { setSubmitted(false); setForm({ firstName:"",lastName:"",email:"",phone:"",linkedin:"",portfolio:"",coverLetter:"",experienceYears:"" }); setResumeFile(null); }}
            className="btn-cta">Apply to Another</button>
        </div>
      </div>
    );
  }

  /* ── main page ── */
  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky top bar ── */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Jobs
          </button>

          {/* Breadcrumb */}
          <nav className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="hover:text-accent cursor-pointer">Jobs</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{job.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved((s) => !s)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-all hover:border-accent ${saved ? "text-accent" : "text-muted-foreground"}`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-accent" : ""}`} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-accent hover:text-accent">
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn-cta py-2 px-5 text-sm"
            >
              Apply Now
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* ════════════ LEFT COLUMN ════════════ */}
          <div className="space-y-8 min-w-0">

            {/* ── Company / Title hero ── */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-start gap-4">
                {/* Logo */}
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-sm"
                  style={{ backgroundColor: job.logoColor }}
                >
                  {job.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    {job.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                        Featured
                      </span>
                    )}
                    <span className={typeColor[job.type] || "job-tag"}>{job.type}</span>
                  </div>
                  <h1 className="font-display text-2xl font-800 text-foreground md:text-3xl">{job.title}</h1>
                  <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                    <span className="font-semibold text-foreground">{job.company}</span>
                    <span>·</span>
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{job.rating}</span>
                    <span>·</span>
                    <a href="#" className="flex items-center gap-1 text-sm text-accent hover:underline">
                      View company <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick meta chips */}
              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { icon: MapPin,     label: job.location },
                  { icon: DollarSign, label: job.salary },
                  { icon: Briefcase,  label: job.experience },
                  { icon: Users,      label: `${job.applicants} applicants` },
                  { icon: Clock,      label: `Posted ${job.posted}` },
                  { icon: Calendar,   label: `Apply by ${job.deadline}` },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
                    <Icon className="h-3.5 w-3.5 text-accent" /> {label}
                  </span>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t) => <span key={t} className="job-tag-navy">{t}</span>)}
              </div>
            </div>

            {/* ── About the role ── */}
            <Section title="About the Role">
              {job.description.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </Section>

            {/* ── Responsibilities ── */}
            <Section title="Key Responsibilities">
              <ul className="space-y-2.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* ── Requirements ── */}
            <Section title="Requirements">
              <ul className="space-y-2.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
              {job.niceToHave.length > 0 && (
                <div className="mt-4 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-4">
                  <p className="mb-2 text-sm font-semibold text-accent">Nice to Have</p>
                  <ul className="space-y-1.5">
                    {job.niceToHave.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>

            {/* ── Benefits ── */}
            <Section title="Benefits & Perks">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {job.benefits.map((b) => (
                  <div key={b.label} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-3">
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{b.label}</p>
                      <p className="text-xs text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ════ APPLICATION FORM ════ */}
            <div ref={formRef} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="mb-6">
                <h2 className="font-display text-xl font-800 text-foreground">Apply for this Position</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete the form below — it takes less than 5 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First Name *" error={errors.firstName}>
                    <input {...field("firstName")} placeholder="Jane" maxLength={60} className={inputCls(errors.firstName)} />
                  </FormField>
                  <FormField label="Last Name *" error={errors.lastName}>
                    <input {...field("lastName")} placeholder="Smith" maxLength={60} className={inputCls(errors.lastName)} />
                  </FormField>
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Email Address *" error={errors.email}>
                    <input type="email" {...field("email")} placeholder="jane@example.com" className={inputCls(errors.email)} />
                  </FormField>
                  <FormField label="Phone Number" error={errors.phone}>
                    <input type="tel" {...field("phone")} placeholder="+1 (555) 000-0000" maxLength={20} className={inputCls(errors.phone)} />
                  </FormField>
                </div>

                {/* Links + experience */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="LinkedIn Profile">
                    <input {...field("linkedin")} placeholder="https://linkedin.com/in/..." maxLength={200} className={inputCls("")} />
                  </FormField>
                  <FormField label="Portfolio / Website">
                    <input {...field("portfolio")} placeholder="https://yoursite.com" maxLength={200} className={inputCls("")} />
                  </FormField>
                </div>

                <FormField label="Years of Experience">
                  <select {...field("experienceYears")} className={inputCls("")}>
                    <option value="">Select…</option>
                    {["0–1 years","1–3 years","3–5 years","5–8 years","8–12 years","12+ years"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </FormField>

                {/* Resume upload */}
                <FormField label="Resume / CV *" error={errors.resume || resumeError}>
                  {resumeFile ? (
                    <div className="flex items-center justify-between rounded-xl border border-accent/40 bg-accent/5 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-accent" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{resumeFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-all hover:border-accent hover:bg-accent/5 ${errors.resume || resumeError ? "border-destructive/50" : "border-border"}`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Drop your resume here, or <span className="text-accent">browse</span></p>
                        <p className="mt-0.5 text-xs text-muted-foreground">PDF, DOC or DOCX — max 5 MB</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>
                  )}
                </FormField>

                {/* Cover letter */}
                <FormField label="Cover Letter *" error={errors.coverLetter}
                  hint={`${form.coverLetter.length}/3000 characters`}>
                  <textarea
                    {...field("coverLetter")}
                    rows={6}
                    maxLength={3000}
                    placeholder={`Tell ${job.company} why you're a great fit for this role…`}
                    className={`${inputCls(errors.coverLetter)} resize-none`}
                  />
                </FormField>

                {/* Submit */}
                <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground">
                    By applying you agree to our{" "}
                    <a href="#" className="text-accent hover:underline">Privacy Policy</a>.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-cta min-w-[160px] justify-center disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting…
                      </span>
                    ) : "Submit Application →"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ════════════ RIGHT SIDEBAR ════════════ */}
          <aside className="hidden lg:block space-y-5">

            {/* Quick apply CTA */}
            <div className="sticky top-20 space-y-5">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Ready to apply?</p>
                <h3 className="font-display text-lg font-700 text-foreground">{job.title}</h3>
                <p className="mb-4 mt-0.5 text-sm text-muted-foreground">{job.company} · {job.location}</p>
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-cta w-full justify-center"
                >
                  Fill Application ↓
                </button>
                <button
                  onClick={() => setSaved((s) => !s)}
                  className={`btn-outline mt-2 w-full justify-center ${saved ? "border-accent text-accent" : ""}`}
                >
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-accent" : ""}`} />
                  {saved ? "Saved" : "Save Job"}
                </button>
              </div>

              {/* Job snapshot */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="mb-4 text-sm font-semibold text-foreground">Job Snapshot</p>
                <dl className="space-y-3">
                  {[
                    { label: "Salary",      value: job.salary },
                    { label: "Job Type",    value: job.type },
                    { label: "Location",    value: job.location },
                    { label: "Experience",  value: job.experience },
                    { label: "Applicants",  value: `${job.applicants}` },
                    { label: "Deadline",    value: job.deadline },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="text-xs font-semibold text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Similar jobs */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <p className="mb-4 text-sm font-semibold text-foreground">Similar Jobs</p>
                <div className="space-y-3">
                  {JOBS.filter((j) => j.id !== job.id).slice(0, 3).map((j) => (
                    <Link
                      key={j.id}
                      to={`/jobs/${j.id}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ backgroundColor: j.logoColor }}
                      >
                        {j.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">{j.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{j.company} · {j.salary}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── tiny sub-components ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display mb-4 text-xl font-800 text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FormField({
  label, error, hint, children,
}: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

function inputCls(error: string | undefined) {
  return [
    "w-full rounded-xl border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
    "bg-background outline-none transition-colors",
    "focus:border-accent focus:ring-2 focus:ring-accent/20",
    error ? "border-destructive/60 bg-destructive/5" : "border-border",
  ].join(" ");
}
