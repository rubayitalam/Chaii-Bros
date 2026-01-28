"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import Button from "@/components/ui/Button";
import type { Testimonial } from "@/lib/types";
import { FiPlus, FiTrash2, FiSave, FiUser, FiMessageSquare, FiStar, FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Testimonial));
            setTestimonials(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async (testimonial: Testimonial) => {
        setSaving(true);
        try {
            const docRef = doc(db, "testimonials", testimonial.id);
            await setDoc(docRef, testimonial);
        } catch (error) {
            console.error("Error saving testimonial:", error);
            alert("Failed to save testimonial.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            await deleteDoc(doc(db, "testimonials", id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial.");
        }
    };

    const handleAdd = () => {
        const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            quote: "",
            author: "",
            rating: 5,
            order: testimonials.length + 1
        };
        setTestimonials([...testimonials, newTestimonial]);
    };

    const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = { ...newTestimonials[index], [field]: value };
        setTestimonials(newTestimonials);
    };

    const moveTestimonial = (index: number, direction: 'up' | 'down') => {
        const newTestimonials = [...testimonials];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newTestimonials.length) return;

        // Swap orders
        const tempOrder = newTestimonials[index].order;
        newTestimonials[index].order = newTestimonials[newIndex].order;
        newTestimonials[newIndex].order = tempOrder;

        // Swap positions in array
        [newTestimonials[index], newTestimonials[newIndex]] = [newTestimonials[newIndex], newTestimonials[index]];

        setTestimonials(newTestimonials);
        // We probably want to save all orders here, but for now just local state
    };

    const saveAllOrders = async () => {
        setSaving(true);
        try {
            const batch = testimonials.map(t => setDoc(doc(db, "testimonials", t.id), t));
            await Promise.all(batch);
            alert("All changes saved!");
        } catch (error) {
            console.error("Error saving testimonials:", error);
            alert("Failed to save all changes.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Page Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Client <span className="text-copper">Testimonials</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Manage what your clients are saying about Chaii Bros</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-brown text-cream rounded-xl hover:bg-brown/90 transition-all font-sans text-sm font-bold shadow-lg"
                >
                    <FiPlus /> Add New Testimonial
                </button>
            </div>

            {/* Testimonials List */}
            <div className="grid gap-8">
                {testimonials.map((t, index) => (
                    <div key={t.id} className="bg-white rounded-3xl shadow-xl border border-copper/5 overflow-hidden">
                        <div className="bg-[#F7F3EF] px-8 py-4 flex justify-between items-center border-b border-copper/5">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-brown text-white flex items-center justify-center font-bold text-xs">
                                    {index + 1}
                                </span>
                                <h3 className="font-bold text-brown uppercase tracking-widest text-[10px]">Testimonial Case</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => moveTestimonial(index, 'up')}
                                    disabled={index === 0}
                                    className="p-2 hover:bg-copper/10 rounded-lg text-copper disabled:opacity-20 transition-colors"
                                >
                                    <FiChevronUp size={20} />
                                </button>
                                <button
                                    onClick={() => moveTestimonial(index, 'down')}
                                    disabled={index === testimonials.length - 1}
                                    className="p-2 hover:bg-copper/10 rounded-lg text-copper disabled:opacity-20 transition-colors"
                                >
                                    <FiChevronDown size={20} />
                                </button>
                                <div className="w-px h-6 bg-copper/20 mx-1" />
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Client Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-copper/40" />
                                        <input
                                            type="text"
                                            value={t.author}
                                            onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                                            className="w-full pl-12 pr-5 py-3.5 bg-[#FDFBF9] border border-copper/10 rounded-xl outline-none focus:border-copper/40 transition-all font-display text-brown"
                                            placeholder="e.g. Sarah Johnson"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Rating (1-5)</label>
                                    <div className="relative">
                                        <FiStar className="absolute left-4 top-1/2 -translate-y-1/2 text-copper/40" />
                                        <select
                                            value={t.rating}
                                            onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                                            className="w-full pl-12 pr-5 py-3.5 bg-[#FDFBF9] border border-copper/10 rounded-xl outline-none appearance-none focus:border-copper/40 transition-all font-display text-brown"
                                        >
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <option key={n} value={n}>{n} Stars</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Testimonial Quote</label>
                                <div className="relative">
                                    <FiMessageSquare className="absolute left-4 top-6 text-copper/40" />
                                    <textarea
                                        value={t.quote}
                                        onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                                        className="w-full pl-12 pr-5 py-4 bg-[#FDFBF9] border border-copper/10 rounded-xl outline-none focus:border-copper/40 transition-all font-serif italic text-lg leading-relaxed h-32 resize-none text-brown"
                                        placeholder="Enter the client's experience..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="text-center py-20 bg-copper/5 rounded-3xl border-2 border-dashed border-copper/10">
                    <p className="text-brown/40 font-display italic">No testimonials yet. Add your first one above!</p>
                </div>
            )}

            {/* Save Button */}
            <div className="sticky bottom-8 z-30 flex justify-center">
                <button
                    onClick={saveAllOrders}
                    disabled={saving}
                    className="flex items-center gap-3 px-10 py-4 bg-brown text-cream rounded-2xl hover:bg-brown/95 transition-all font-sans font-bold shadow-2xl disabled:opacity-50"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <FiSave size={20} />
                            <span>Save All Testimonials</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
