import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { User, Shield, Bell, Key, Save } from "lucide-react";

export default function Settings() {
    const { user, login } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({ name, email, bio }),
            });

            const data = await response.json();
            if (response.ok) {
                login({ ...user!, ...data });
                toast.success("Settings updated successfully");
            } else {
                toast.error(data.message || "Failed to update settings");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-white/50 mt-2">Manage your account preferences and profile</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="md:col-span-1 space-y-2">
                        {[
                            { label: "Profile", icon: User },
                            { label: "Security", icon: Shield },
                            { label: "Notifications", icon: Bell },
                            { label: "Account", icon: Key },
                        ].map((item, i) => (
                            <button
                                key={i}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition ${i === 0 ? "bg-accent text-black font-bold" : "text-white/50 hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={16} />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Settings Form */}
                    <div className="md:col-span-3">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleSubmit}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6"
                        >
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold mb-6">Personal Information</h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/50">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/50">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-white/50">Bio</label>
                                    <textarea
                                        rows={4}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-accent outline-none transition resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-accent text-black font-bold px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </div>
        </div>
    );
}
