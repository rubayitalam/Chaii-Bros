"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { FiSave, FiArrowLeft, FiImage, FiLayout, FiTag } from "react-icons/fi";
import type { CategoryPage } from "@/lib/types";

export default function AdminCategoryEditor() {
    const router = useRouter();
    const params = useParams();
    // In Next.js App Router, params are typically objects. Let's safely access the ID.
    // However, for dynamic routes like [id], params might be accessed differently in client components occasionally,
    // but usually calling it directly works.
    // It seems typescript might complain if I assume `id` exists on `params`.
    // I will cast it safely.
    const slug = params.id === 'new' ? null : (params.id as string);

    const [loading, setLoading] = useState(!!slug);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<CategoryPage>({
        slug: "",
        title: "",
        subtitle: "",
        description: "",
        heroImage: "",
        filterTag: "",
        flavours: [],
    });

    useEffect(() => {
        if (!slug) return;

        const fetchPage = async () => {
            try {
                const docRef = doc(db, "categoryPages", slug);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // We don't overwrite the slug from the doc data if we want to allow editing URL?
                    // Usually ID is the slug. Let's keep it consistent.
                    setFormData({ ...docSnap.data(), slug: docSnap.id } as CategoryPage);
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Slug is the document ID
            const targetSlug = formData.slug.toLowerCase().replace(/ /g, "-");
            if (!targetSlug) {
                alert("Slug is required");
                setSaving(false);
                return;
            }

            const dataToSave = {
                title: formData.title,
                subtitle: formData.subtitle,
                description: formData.description,
                heroImage: formData.heroImage,
                filterTag: formData.filterTag,
                flavours: formData.flavours,
            };

            await setDoc(doc(db, "categoryPages", targetSlug), dataToSave);
            router.push("/admin/menu-categories");
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Failed to save category.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto pb-20 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/menu-categories" className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <FiArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-display text-foreground">{slug ? "Edit Category" : "New Category"}</h1>
                    <p className="text-muted-foreground text-sm">Define the content for this menu section</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Main Settings Card */}
                <div className="bg-card rounded-3xl shadow-sm border border-border p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2 pb-4 border-b border-border/50">
                        <FiLayout className="text-primary" />
                        <h3 className="font-bold text-lg">Page Structure</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Display Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                placeholder="e.g. CHAII"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">URL Slug (ID)</label>
                            <input
                                type="text"
                                required
                                disabled={!!slug} // Disable editing slug once created to keep ID consistent, or allow logic to delete and recreate if needed (complex)
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono text-sm"
                                placeholder="e.g. chaii"
                            />
                            {!!slug && <p className="text-[10px] text-muted-foreground mt-1">Slug cannot be changed after creation.</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Hero Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                placeholder="e.g. AUTHENTIC BREWED CHAII"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Page Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none h-32 resize-none uppercase"
                                placeholder="RIGHT SIDE TEXT (e.g. SMOOTH, RICH, AND PERFECTLY CHILLED...)"
                            />
                        </div>
                    </div>
                </div>

                {/* Flavours Configuration */}
                <div className="bg-card rounded-3xl shadow-sm border border-border p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2 pb-4 border-b border-border/50">
                        <FiTag className="text-primary" />
                        <h3 className="font-bold text-lg">Flavours List</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Flavours (Comma separated)</label>
                            <p className="text-xs text-muted-foreground mb-2">These will appear as the list buttons on the right side.</p>
                            <textarea
                                value={formData.flavours?.join(', ')}
                                onChange={e => setFormData({ ...formData, flavours: e.target.value.split(',').map(s => s.trim()) })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none h-24 font-serif"
                                placeholder="e.g. CARAMEL, FRENCH VANILLA, PISTACHIO, ORIGINAL"
                            />
                        </div>
                    </div>
                </div>

                {/* Configuration Card */}
                <div className="bg-card rounded-3xl shadow-sm border border-border p-8 space-y-6">
                    <div className="flex items-center gap-2 mb-2 pb-4 border-b border-border/50">
                        <FiLayout className="text-primary" />
                        <h3 className="font-bold text-lg">Configuration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                <FiTag /> Filter Tag
                            </label>
                            <p className="text-xs text-muted-foreground mb-2">Items with this tag will appear on this page.</p>
                            <input
                                type="text"
                                required
                                value={formData.filterTag}
                                onChange={e => setFormData({ ...formData, filterTag: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono"
                                placeholder="e.g. chaii"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                <FiImage /> Hero Image URL
                            </label>
                            <input
                                type="text"
                                value={formData.heroImage}
                                onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                placeholder="https://..."
                            />
                            {formData.heroImage && (
                                <div className="mt-4 relative h-48 w-full rounded-xl overflow-hidden border border-border">
                                    <Image src={formData.heroImage} alt="Preview" fill className="object-cover" unoptimized />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest shadow-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? "Saving..." : <><FiSave /> Save Category</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
