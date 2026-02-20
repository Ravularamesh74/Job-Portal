import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, MapPin, DollarSign, Clock, Zap, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function SavedJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const response = await fetch("/api/users/saved", {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setJobs(data);
                }
            } catch (error) {
                toast.error("Failed to fetch saved jobs");
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchSaved();
    }, [user]);

    const removeJob = async (id: string) => {
        try {
            const response = await fetch(`/api/users/save/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            if (response.ok) {
                setJobs(jobs.filter((j: any) => j._id !== id));
                toast.success("Job removed from saved");
            }
        } catch (error) {
            toast.error("Failed to remove job");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Saved Jobs</h1>
                    <p className="text-white/50 mt-2">Manage all the opportunities you've bookmarked</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                        <Bookmark size={48} className="mx-auto text-white/20 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">No saved jobs yet</h2>
                        <p className="text-white/40 mb-8 px-4">Browse our job board and bookmark the ones that interest you.</p>
                        <Link to="/" className="px-6 py-3 bg-accent text-black font-bold rounded-xl hover:scale-105 transition">
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job: any, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition group"
                            >
                                {job.featured && (
                                    <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] bg-accent text-black px-2 py-1 rounded-full">
                                        <Zap size={10} /> Featured
                                    </span>
                                )}

                                <div className="flex gap-3 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                                        style={{ background: job.logoColor || "#333" }}
                                    >
                                        {job.logo || job.company.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{job.company}</p>
                                        <p className="text-xs text-white/50">{job.location}</p>
                                    </div>
                                </div>

                                <Link to={`/jobs/${job._id}`}>
                                    <h3 className="font-semibold text-lg group-hover:text-accent transition">
                                        {job.title}
                                    </h3>
                                </Link>

                                <div className="flex flex-wrap gap-4 text-xs text-white/50 mt-3">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={14} /> {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={14} /> {job.salary}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/10">
                                    <span className="flex items-center gap-1 text-xs text-white/40">
                                        <Clock size={14} /> {job.posted}
                                    </span>
                                    <button
                                        onClick={() => removeJob(job._id)}
                                        className="p-2 text-white/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
