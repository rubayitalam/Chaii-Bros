"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiMaximize2, FiImage, FiCamera } from "react-icons/fi";
import type { GalleryImage } from "@/lib/types";

export default function AdminGalleryManager() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [newUrl, setNewUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "gallery"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage)));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl) return;
        setSaving(true);

        try {
            await addDoc(collection(db, "gallery"), {
                imageUrl: newUrl,
                category: "event",
                order: images.length,
            });
            setNewUrl("");
        } catch (err) {
            console.error("Error adding gallery image:", err);
            alert("Failed to add image.");
        } finally {
            setSaving(false);
        }
    };

    const deleteImage = async (id: string) => {
        if (!window.confirm("Remove this masterpiece from your gallery?")) return;
        try {
            await deleteDoc(doc(db, "gallery", id));
        } catch (err) {
            console.error("Error deleting image:", err);
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
                    <h2 className="text-3xl font-script text-brown mb-1">Follow <span className="text-copper">the Brew</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Curate the visual experience of your events and craft.</p>
                </div>
            </div>

            {/* Quick Add Section */}
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-copper/5">
                <h3 className="flex items-center gap-2 text-[10px] font-bold text-copper uppercase tracking-[0.2em] mb-6">
                    <FiCamera /> New Visual Submission
                </h3>
                <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        required
                        value={newUrl}
                        onChange={e => setNewUrl(e.target.value)}
                        placeholder="Paste image link from unsplash or high-quality source..."
                        className="flex-1 px-6 py-4 bg-[#FDFBF9] border border-copper/20 rounded-2xl outline-none font-sans text-sm"
                    />
                    <Button type="submit" disabled={saving || !newUrl} className="whitespace-nowrap rounded-2xl px-10">
                        {saving ? "Processing..." : "Enshrine Image"}
                    </Button>
                </form>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
                {images.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-lg border border-copper/5">
                        <Image
                            src={img.imageUrl}
                            alt="Gallery Moment"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-brown/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 gap-4">
                            <FiMaximize2 className="text-cream/40 mb-2" size={24} />
                            <button
                                onClick={() => deleteImage(img.id)}
                                className="w-12 h-12 bg-white text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-90"
                                title="Remove Image"
                            >
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                        {/* Mobile Delete */}
                        <button
                            onClick={() => deleteImage(img.id)}
                            className="md:hidden absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-red-600 rounded-xl shadow-lg border border-red-100"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                ))}

                {images.length === 0 && (
                    <div className="col-span-full py-40 text-center bg-copper/5 rounded-[3rem] border-2 border-dashed border-copper/20">
                        <FiImage size={64} className="mx-auto text-copper/20 mb-6" />
                        <h4 className="text-xl font-serif text-brown/40 italic">The gallery is currently waiting for your vision</h4>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-copper/30 mt-4">Add your first event photo above</p>
                    </div>
                )}
            </div>
        </div>
    );
}
