"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot, setDoc, addDoc, deleteDoc, query } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { FiEdit2, FiX, FiCheck, FiSave, FiUsers, FiImage, FiTrash2, FiPlus, FiPackage } from "react-icons/fi";
import type { CateringPackage } from "@/lib/types";

export default function AdminPackagesManager() {
    const [packages, setPackages] = useState<CateringPackage[]>([]);
    const [editingPackage, setEditingPackage] = useState<CateringPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Fetch from packages collection
        const q = query(collection(db, "packages"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                features: doc.data().features || doc.data().inclusions || [],
                guests: doc.data().guests || doc.data().guestCount || ""
            } as CateringPackage));
            setPackages(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPackage) return;
        setSaving(true);
        try {
            const { id, ...data } = editingPackage;
            // Check if it's an existing package (has ID and exists in our list)
            // Note: The "New Package" button gives an empty ID string for new items
            if (id && packages.some(p => p.id === id)) {
                // Update existing
                await setDoc(doc(db, "packages", id), data);
            } else {
                // Create new
                await addDoc(collection(db, "packages"), data);
            }
            setEditingPackage(null);
        } catch (error) {
            console.error("Error saving package:", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        try {
            await deleteDoc(doc(db, "packages", id));
        } catch (error) {
            console.error("Error deleting package:", error);
            alert("Failed to delete package.");
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Catering <span className="text-copper">Package Management</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Configure guest counts, features, and imagery for your service tiers</p>
                </div>
                <button
                    onClick={() => setEditingPackage({ id: "", name: "New Package", description: "Package description", guests: "Upto 100 Guests", features: ["Feature 1"], imageUrl: "" })}
                    className="flex items-center gap-2 px-6 py-3 bg-brown text-cream rounded-xl hover:bg-brown/90 transition-all font-sans text-sm font-bold shadow-lg"
                >
                    <FiPlus /> Create Tier
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-[2rem] shadow-xl border border-copper/5 overflow-hidden flex flex-col group">
                        <div className="relative h-48 bg-copper/5">
                            {pkg.imageUrl ? (
                                <Image
                                    src={pkg.imageUrl}
                                    alt={pkg.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-copper/20"><FiImage size={40} /></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-brown via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-2xl font-script text-white">{pkg.name}</h3>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingPackage(pkg)}
                                    className="p-3 bg-white/90 backdrop-blur-md text-copper rounded-2xl hover:bg-copper hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    <FiEdit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(pkg.id)}
                                    className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-8 flex-grow space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-copper/10 rounded-lg text-copper"><FiUsers size={16} /></div>
                                <span className="font-bold text-brown text-sm uppercase tracking-widest">{pkg.guests}</span>
                            </div>
                            <ul className="space-y-3">
                                {pkg.features.slice(0, 4).map((f: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-xs text-brown/60 italic leading-snug">
                                        <FiCheck className="text-copper mt-0.5 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                                {pkg.features.length > 4 && (
                                    <li className="text-[10px] text-copper uppercase font-bold tracking-widest pl-7">+{pkg.features.length - 4} More features</li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}

                {packages.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-copper/5 rounded-3xl border-2 border-dashed border-copper/20">
                        <FiPackage size={40} className="mx-auto text-copper/20 mb-4" />
                        <p className="text-brown/40 font-serif italic">No catering tiers found. Create your first one to get started.</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingPackage && (
                <div className="fixed inset-0 bg-brown/80 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
                    <div className="bg-[#FDFBF9] w-full max-w-3xl rounded-t-3xl md:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[95vh]">
                        <div className="px-8 py-6 md:py-8 bg-brown text-cream flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-2xl font-script">Configure Package: <span className="text-copper">{editingPackage.name}</span></h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-copper font-bold mt-1">Tier Specification</p>
                            </div>
                            <button onClick={() => setEditingPackage(null)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-90"><FiX size={20} /></button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-copper border-b border-copper/10 pb-2 mb-4">
                                        <FiUsers size={14} />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Basics</span>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brown/40 tracking-widest mb-2">Package Name</label>
                                        <input
                                            type="text"
                                            value={editingPackage.name}
                                            onChange={e => setEditingPackage({ ...editingPackage, name: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none transition-all font-serif text-lg"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brown/40 tracking-widest mb-2">Guest Allowance (Text)</label>
                                        <input
                                            type="text"
                                            value={editingPackage.guests}
                                            onChange={e => setEditingPackage({ ...editingPackage, guests: e.target.value })}
                                            className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none transition-all font-serif text-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brown/40 tracking-widest mb-2">Hero Image URL</label>
                                        <div className="flex gap-4 items-center">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-copper/10 shrink-0 bg-copper/5">
                                                {editingPackage.imageUrl ? (
                                                    <Image src={editingPackage.imageUrl} alt="T" fill className="object-cover" unoptimized />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-copper/20"><FiImage /></div>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={editingPackage.imageUrl}
                                                onChange={e => setEditingPackage({ ...editingPackage, imageUrl: e.target.value })}
                                                className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-sans text-xs"
                                                placeholder="Paste URL..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-copper border-b border-copper/10 pb-2 mb-4">
                                        <FiCheck size={14} />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Features & Inclusions</span>
                                    </div>
                                    <div className="space-y-3">
                                        {editingPackage.features.map((feature: string, idx: number) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={e => {
                                                        const newFeatures = [...editingPackage.features];
                                                        newFeatures[idx] = e.target.value;
                                                        setEditingPackage({ ...editingPackage, features: newFeatures });
                                                    }}
                                                    className="flex-1 px-4 py-2.5 bg-white border border-copper/10 rounded-lg outline-none text-sm font-serif italic"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newFeatures = editingPackage.features.filter((_: any, i: number) => i !== idx);
                                                        setEditingPackage({ ...editingPackage, features: newFeatures });
                                                    }}
                                                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    <FiX />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setEditingPackage({ ...editingPackage, features: [...editingPackage.features, ""] })}
                                            className="w-full py-2 border-2 border-dashed border-copper/20 text-copper text-[10px] font-bold rounded-lg hover:bg-copper/5 transition-all uppercase tracking-widest mt-2"
                                        >
                                            + Add Inclusion
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-4 bg-brown text-cream rounded-xl font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-brown/95 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {saving ? (
                                    <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave />
                                        <span>Save Package Policy</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
}
