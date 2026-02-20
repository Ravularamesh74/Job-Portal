import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
    Plus,
    Building2,
    MapPin,
    DollarSign,
    Briefcase,
    Clock,
    Tags,
    FileText,
    Calendar,
    Zap,
    Star
} from "lucide-react";
import { toast } from "sonner";

const JOB_TYPES = ["Full-time", "Remote", "Part-time", "Contract", "Freelance"];

export default function PostJob() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        experience: "",
        tags: "",
        deadline: "",
        logo: "",
        logoColor: "#6366f1",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
                    logo: formData.company ? formData.company.charAt(0) : "J",
                }),
            });

            if (response.ok) {
                toast.success("Job posted successfully!");
                navigate("/");
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to post job");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />

            <div className="container mx-auto max-w-4xl relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4 uppercase tracking-wider">
                        <Zap size={14} /> Hire Top Talent
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Post a New Job</h1>
                    <p className="text-white/50 max-w-xl mx-auto">
                        Reach thousands of qualified candidates by providing detailed information about the role and your company.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 ring-1 ring-white/10 bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
                    {/* Job Details Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-white/10 pb-3">
                            <Briefcase size={18} className="text-accent" /> Role Information
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Job Title</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Frontend Engineer"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Job Type</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition appearance-none"
                                    >
                                        {JOB_TYPES.map(type => (
                                            <option key={type} value={type} className="bg-zinc-900">{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70">Salary Range</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        name="salary"
                                        required
                                        value={formData.salary}
                                        onChange={handleChange}
                                        placeholder="e.g. $120k - $150k"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Experience Needed</label>
                            <div className="relative">
                                <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="experience"
                                    required
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="e.g. 3+ years in React"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Application Deadline</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="deadline"
                                    required
                                    type="date"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Details Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-white/10 pb-3">
                            <Building2 size={18} className="text-accent" /> Company Details
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="company"
                                    required
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. TechFlow Inc."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. San Francisco, CA"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Tags (comma separated)</label>
                            <div className="relative">
                                <Tags className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="React, TypeScript, Node.js"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-accent outline-none transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Brand Color</label>
                            <input
                                type="color"
                                name="logoColor"
                                value={formData.logoColor}
                                onChange={handleChange}
                                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl p-1 outline-none cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Full Width Description */}
                    <div className="md:col-span-2 space-y-2 pt-4 border-t border-white/10">
                        <label className="text-sm font-medium text-white/70">Job Description</label>
                        <textarea
                            name="description"
                            required
                            rows={6}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the role, responsibilities, and benefits..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:border-accent outline-none transition resize-none"
                        />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 rounded-xl bg-accent text-black font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
                        >
                            {loading ? "Publishing..." : "Post Job Today"}
                            <Plus size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
