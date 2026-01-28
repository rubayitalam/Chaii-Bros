"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { FiSave, FiSettings, FiBriefcase, FiGlobe, FiShield, FiAlertTriangle, FiBook, FiCheckCircle } from "react-icons/fi";
import type { ContactInfo } from "@/lib/types";

export default function AdminSettings() {
    const [settings, setSettings] = useState<ContactInfo>({
        email: "",
        phone: "",
        socialLinks: {
            instagram: "",
            linkedin: "",
            facebook: "",
        },
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "contactInfo"), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setSettings(prev => ({
                    ...prev,
                    ...data,
                    socialLinks: {
                        ...prev.socialLinks,
                        ...(data.socialLinks || {})
                    }
                }));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, "siteSettings", "contactInfo"), settings);
            alert("Global settings updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Global <span className="text-copper">Site Settings</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Manage your brand&apos;s digital presence and communication channels.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Business Contact Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiBriefcase className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Business Identity</h3>
                        </div>
                        <div className="p-10 space-y-8 flex-grow">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Public Correspondence Email</label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full px-6 py-4 bg-[#FDFBF9] border border-copper/20 rounded-2xl focus:ring-2 focus:ring-copper outline-none font-serif text-lg text-brown"
                                    placeholder="chaii@95brothers.co.uk"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Customer Service Hot-line</label>
                                <input
                                    type="text"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full px-6 py-4 bg-[#FDFBF9] border border-copper/20 rounded-2xl focus:ring-2 focus:ring-copper outline-none font-serif text-lg text-brown"
                                    placeholder="+44 7496 456969"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Ecosystem Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiGlobe className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Social Ecosystem</h3>
                        </div>
                        <div className="p-10 space-y-8 flex-grow">
                            {["instagram", "facebook", "linkedin"].map((platform) => (
                                <div key={platform} className="space-y-4">
                                    <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest capitalize">{platform} URI</label>
                                    <input
                                        type="text"
                                        value={(settings.socialLinks as any)[platform]}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            socialLinks: { ...settings.socialLinks, [platform]: e.target.value }
                                        })}
                                        className="w-full px-6 py-4 bg-[#FDFBF9] border border-copper/20 rounded-2xl focus:ring-2 focus:ring-copper outline-none font-sans text-sm text-brown"
                                        placeholder={`https://${platform}.com/chaiibros...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Maintenance */}
                <div className="bg-red-50/50 rounded-[2.5rem] border border-red-100 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shadow-inner">
                            <FiAlertTriangle size={32} />
                        </div>
                        <div>
                            <h4 className="text-red-900 font-bold uppercase tracking-[0.1em] text-sm">System Recovery Mode</h4>
                            <p className="text-red-700/60 text-xs font-serif italic mt-1">Reset all website content to factory defaults. This action is irreversible.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={async () => {
                            if (window.confirm("CRITICAL ACTION: This will erase all current website content and restore factory defaults. Are you absolutely certain?")) {
                                try {
                                    const { restoreDefaults } = await import("@/lib/initData");
                                    await restoreDefaults();
                                    alert("System reset completed. Please refresh once.");
                                } catch (err) {
                                    console.error(err);
                                    alert("Reset procedure failed.");
                                }
                            }
                        }}
                        className="px-8 py-4 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl active:scale-95"
                    >
                        Initiate Factory Reset
                    </button>
                </div>

                {/* Save Action */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 lg:left-[calc(50%+140px)] z-[100] w-full max-w-sm px-6">
                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full py-5 rounded-2xl shadow-[0_20px_50px_rgba(61,43,31,0.3)] bg-brown hover:bg-brown/95 text-cream border-2 border-copper/20 flex items-center justify-center gap-3 group text-lg"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FiCheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                                <span>Save System Config</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
