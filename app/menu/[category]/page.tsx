"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import type { CategoryPage } from "@/lib/types";

export default function DynamicCategoryPage() {
    const params = useParams();
    const categorySlug = params.category as string;

    const [pageData, setPageData] = useState<CategoryPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categorySlug) return;
        setLoading(true);
        const pageRef = doc(db, "categoryPages", categorySlug);
        const unsubscribePage = onSnapshot(pageRef, (docSnap) => {
            if (docSnap.exists()) {
                setPageData({ slug: docSnap.id, ...docSnap.data() } as CategoryPage);
            } else {
                setPageData(null);
            }
            setLoading(false);
        });
        return () => unsubscribePage();
    }, [categorySlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <div className="w-12 h-12 border-4 border-[#A47E5B] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!pageData) {
        return (
                <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] flex-col gap-4">
                <p className="text-xl font-serif text-[#4A3B32]">Page not found.</p>
                <Link href="/menu" className="text-[#A47E5B] underline underline-offset-4">Return to Menu</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32]">
            {/* Header Title Section - Centered Top */}
            <div className="pt-32 pb-12 md:pb-20 text-center">
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.05em] font-light text-[#4A3B32]">
                    {pageData.title}
                </h1>
            </div>

            {/* Split Content Section */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl pb-24 md:pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start md:items-center">

                    {/* Left: Image (Square) */}
                    <div className="relative w-full aspect-square bg-[#EBE5DF] overflow-hidden shadow-none rounded-none mx-auto max-w-[500px] md:max-w-none">
                        <Image
                            src={pageData.heroImage || "/images/placeholder.png"}
                            alt={pageData.title}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-12 max-w-md mx-auto md:mx-0">
                        {/* Description Text */}
                        <div>
                            <p className="font-sans text-xs md:text-sm tracking-[0.15em] leading-[2] uppercase text-[#4A3B32]">
                                {pageData.description}
                            </p>
                        </div>

                        {/* Flavours List */}
                        {pageData.flavours && pageData.flavours.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="font-sans text-lg md:text-xl uppercase tracking-[0.05em] text-[#4A3B32] font-normal">
                                    FLAVOURS
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {pageData.flavours.map((flavour, index) => (
                                        <div
                                            key={index}
                                            className={`w-full py-3 px-6 text-center uppercase tracking-[0.1em] text-xs md:text-sm font-medium transition-colors border border-[#D4C5B5] ${index === 0 ? 'bg-[#C8B29E] text-[#4A3B32]' : 'bg-[#EBE5DF] text-[#4A3B32]/80'}`}
                                        >
                                            {flavour}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
