"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { FiPlus, FiEdit2, FiTrash2, FiTag } from "react-icons/fi";
import type { CategoryPage } from "@/lib/types";

export default function AdminCategoriesList() {
    const [categories, setCategories] = useState<CategoryPage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "categoryPages"), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as CategoryPage)));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this category page? This might break links on the home page.")) return;
        try {
            await deleteDoc(doc(db, "categoryPages", slug));
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category.");
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-8">
                <div>
                    <h2 className="text-3xl font-display text-foreground mb-1">Menu Categories</h2>
                    <p className="text-sm text-muted-foreground font-sans tracking-wide">Manage the dynamic content pages for your menu sections</p>
                </div>
                <Link
                    href="/admin/menu-categories/new"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-sans text-sm font-bold shadow-lg"
                >
                    <FiPlus /> New Category Page
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div key={category.slug} className="bg-card rounded-3xl shadow-lg border border-border/50 overflow-hidden group flex flex-col">
                        <div className="relative h-48 w-full">
                            <Image
                                src={category.heroImage || "/images/placeholder.png"}
                                alt={category.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-display uppercase tracking-wider text-center px-4">
                                    {category.title}
                                </h3>
                            </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase tracking-wider">
                                    Slug: {category.slug}
                                </span>
                                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded uppercase tracking-wider">
                                    Tag: {category.filterTag}
                                </span>
                            </div>

                            <p className="text-muted-foreground text-sm font-serif line-clamp-3 mb-6 flex-grow">
                                {category.description}
                            </p>

                            <div className="flex gap-4 pt-4 border-t border-border/50">
                                <Link
                                    href={`/admin/menu-categories/${category.slug}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all text-sm font-medium"
                                >
                                    <FiEdit2 size={16} /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.slug)}
                                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                        <FiTag size={40} className="mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground font-serif italic">No category pages created yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
