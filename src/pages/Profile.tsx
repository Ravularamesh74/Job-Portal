import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, Calendar, Edit2 } from "lucide-react";

export default function Profile() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                >
                    {/* Cover Header */}
                    <div className="h-32 bg-gradient-to-r from-accent/20 to-purple-500/20" />

                    <div className="px-8 pb-8">
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 mb-8">
                            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-1">
                                <div className="w-full h-full rounded-xl bg-accent text-black flex items-center justify-center text-3xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <p className="text-white/50">{user.email}</p>
                            </div>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl text-sm font-semibold">
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Left Column - Info */}
                            <div className="md:col-span-1 space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Contact Info</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail size={16} className="text-accent" />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <Phone size={16} className="text-accent" />
                                            <span>{user.phone || "Not provided"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <MapPin size={16} className="text-accent" />
                                            <span>{user.location || "Earth"}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-white/50">
                                            <Calendar size={16} className="text-accent" />
                                            <span>Member since 2026</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - About */}
                            <div className="md:col-span-2 space-y-8">
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                    <h2 className="text-xl font-bold mb-4">About Me</h2>
                                    <p className="text-white/60 leading-relaxed">
                                        {user.bio || "No biography provided yet. Tell us about yourself to help recruiters find you!"}
                                    </p>
                                </div>

                                <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                    <h2 className="text-xl font-bold mb-4">Experience</h2>
                                    <div className="flex flex-col items-center justify-center py-8 text-white/40 border-2 border-dashed border-white/10 rounded-xl">
                                        <Briefcase size={32} className="mb-2 opacity-50" />
                                        <p className="text-sm">No experience added yet</p>
                                        <button className="mt-4 text-accent text-sm hover:underline font-semibold">+ Add Experience</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

import { Briefcase } from "lucide-react"; // Re-importing for the conditional render
