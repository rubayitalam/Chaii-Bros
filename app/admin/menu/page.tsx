"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiInfo, FiTag, FiImage, FiSave, FiChevronUp, FiChevronDown } from "react-icons/fi";
import type { MenuItem } from "@/lib/types";

export default function AdminMenuManager() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "menuItems"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setItems(snapshot.docs.map((docSnap: any) => ({ id: docSnap.id, ...docSnap.data() } as MenuItem)));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;
        setSaving(true);

        try {
            const data = {
                name: editingItem.name || "",
                description: editingItem.description || "",
                imageUrl: editingItem.imageUrl || "",
                category: editingItem.category || "Drinks",
                price: Number(editingItem.price) || 0,
                flavors: editingItem.flavors || [],
                tags: editingItem.tags || [],
                slug: editingItem.name?.toLowerCase().replace(/ /g, "-") || "",
                order: editingItem.order || items.length + 1,
            };

            if (editingItem.id) {
                await updateDoc(doc(db, "menuItems", editingItem.id), data);
            } else {
                await addDoc(collection(db, "menuItems"), data);
            }
            setEditingItem(null);
        } catch (err) {
            console.error("Error saving menu item:", err);
            alert("Failed to save item.");
        } finally {
            setSaving(false);
        }
    };

    const deleteItem = async (id: string) => {
        if (!window.confirm("Permanently delete this item?")) return;
        try {
            await deleteDoc(doc(db, "menuItems", id));
        } catch (err) {
            console.error("Error deleting menu item:", err);
        }
    };

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newItems = [...items];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newItems.length) return;

        // Swap locally
        const currentItem = { ...newItems[index] };
        const otherItem = { ...newItems[newIndex] };

        const currentOrder = currentItem.order || (index + 1);
        const otherOrder = otherItem.order || (newIndex + 1);

        // Update in Firestore
        try {
            await updateDoc(doc(db, "menuItems", currentItem.id), { order: otherOrder });
            await updateDoc(doc(db, "menuItems", otherItem.id), { order: currentOrder });
        } catch (err) {
            console.error("Error moving item:", err);
            alert("Failed to reorder items.");
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Discover <span className="text-copper">The Chaii Bros Experience</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Manage the masterpiece grid items on your homepage and menu</p>
                </div>
                <button
                    onClick={() => setEditingItem({ name: "", description: "", imageUrl: "", flavors: [], tags: [], category: "Drinks", price: 0, order: items.length + 1 })}
                    className="flex items-center gap-2 px-6 py-3 bg-brown text-cream rounded-xl hover:bg-brown/90 transition-all font-sans text-sm font-bold shadow-lg"
                >
                    <FiPlus /> Add New Item
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-white rounded-3xl shadow-xl border border-copper/5 overflow-hidden group">
                        <div className="relative aspect-[4/5]">
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                            />
                            {/* Reorder/Action Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => moveItem(index, 'up')}
                                        disabled={index === 0}
                                        className="p-3 bg-white text-brown rounded-xl hover:bg-copper hover:text-white transition-all disabled:opacity-20"
                                    >
                                        <FiChevronUp size={20} />
                                    </button>
                                    <button
                                        onClick={() => moveItem(index, 'down')}
                                        disabled={index === items.length - 1}
                                        className="p-3 bg-white text-brown rounded-xl hover:bg-copper hover:text-white transition-all disabled:opacity-20"
                                    >
                                        <FiChevronDown size={20} />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white text-brown rounded-xl hover:bg-copper hover:text-white transition-all font-bold text-sm"
                                    >
                                        <FiEdit2 size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-2 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-script text-brown">{item.name}</h3>
                                <span className="px-2 py-0.5 bg-copper/10 text-copper text-[10px] font-bold rounded uppercase tracking-widest leading-none">{item.category}</span>
                            </div>
                            <p className="text-sm font-serif text-brown/60 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-copper/5 rounded-3xl border-2 border-dashed border-copper/20">
                        <FiTag size={40} className="mx-auto text-copper/20 mb-4" />
                        <p className="text-brown/40 font-serif italic">Your menu is currently empty. Start by adding an item.</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-brown/80 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
                    <div className="bg-[#FDFBF9] w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[92vh]">
                        <div className="p-6 md:p-8 bg-brown text-cream flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-2xl font-script">{editingItem.id ? "Edit Item" : "New Creation"}</h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-copper font-bold mt-1">Culinary Standards</p>
                            </div>
                            <button onClick={() => setEditingItem(null)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-90"><FiX size={20} /></button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 md:p-10 space-y-8 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2"><FiTag size={12} /> Item Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingItem.name}
                                        onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-serif text-lg text-brown"
                                        placeholder="e.g., Signature Karak Chaii"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2">Category</label>
                                    <select
                                        value={editingItem.category}
                                        onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-serif text-brown"
                                    >
                                        <option value="Drinks">Drinks</option>
                                        <option value="Dessert">Dessert</option>
                                        <option value="Food">Food</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2">Order Priority</label>
                                    <input
                                        type="number"
                                        value={editingItem.order}
                                        onChange={e => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })}
                                        className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-serif text-brown"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2"><FiInfo size={12} /> Sensory Description</label>
                                    <textarea
                                        required
                                        value={editingItem.description}
                                        onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none h-32 font-serif leading-relaxed text-brown resize-none"
                                        placeholder="Describe the flavors, aroma, and presentation..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2">Flavors (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={editingItem.flavors?.join(', ')}
                                        onChange={e => setEditingItem({ ...editingItem, flavors: e.target.value.split(',').map(s => s.trim()) })}
                                        className="w-full px-5 py-3.5 bg-white border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-serif text-brown"
                                        placeholder="e.g., Cinnamon, Cardamom, Saffron"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-xs font-bold text-brown/40 uppercase tracking-widest mb-2"><FiImage size={12} /> External Image URL</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingItem.imageUrl}
                                        onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                                        className="w-full px-5 py-3 border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none font-sans text-sm text-brown"
                                        placeholder="Paste a link from your gallery or high-quality source..."
                                    />
                                    {editingItem.imageUrl && (
                                        <div className="mt-4 relative h-40 rounded-2xl overflow-hidden border border-copper/10">
                                            <Image src={editingItem.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="sticky bottom-0 left-0 right-0 z-[50] mt-8 pb-4 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9] to-transparent">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full max-w-sm mx-auto py-4 bg-brown text-cream rounded-xl font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-brown/95 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FiSave />
                                            <span>Update Menu Item</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
