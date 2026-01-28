"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import type { MenuItem } from "@/lib/types";

const Menu = () => {
    const [items, setItems] = React.useState<MenuItem[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Fallback data matching DiscoverSection
    const fallbackItems: MenuItem[] = [
        { id: "1", name: "CHAII", description: "Authentic brewed chai", price: 0, category: "Drinks", imageUrl: "/images/hero/chai.png", order: 1, slug: "chaii" },
        { id: "2", name: "MINI DUTCH\nPANCAKES", description: "Fluffy bites", price: 0, category: "Dessert", imageUrl: "/images/hero/pancakes.png", order: 2, slug: "pancakes" },
        { id: "3", name: "ICED\nCOFFEE", description: "Chilled perfection", price: 0, category: "Drinks", imageUrl: "/images/hero/wedding.png", order: 3, slug: "iced-coffee" },
        { id: "4", name: "MOCKTAILS", description: "Refreshing blends", price: 0, category: "Drinks", imageUrl: "/images/hero/chai.png", order: 4, slug: "mocktails" },
        { id: "5", name: "MATCHA", description: "Premium grade", price: 0, category: "Drinks", imageUrl: "/images/hero/wedding.png", order: 5, slug: "matcha" },
        { id: "6", name: "CHOCOLATE\nSTRAWBERRIES", description: "Sweet indulgence", price: 0, category: "Dessert", imageUrl: "/images/hero/pancakes.png", order: 6, slug: "strawberries" },
    ];

    React.useEffect(() => {
        const q = query(collection(db, "menuItems"), orderBy("order", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
            setItems(fetchedItems);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const displayItems = items.length > 0 ? items : fallbackItems;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 md:pt-40 pb-8 md:pb-12">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground">
                        <span className="font-script text-primary text-4xl md:text-5xl">The</span>{" "}
                        <span className="uppercase">MENU</span>
                    </h1>
                </div>
            </section>

            {/* Signatures Section */}
            <section className="pb-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <h2 className="text-center font-display text-lg md:text-xl tracking-[0.2em] text-primary uppercase mb-12">
                        OUR SIGNATURES
                    </h2>

                    {/* Dynamic Grid - Matching Discover Section Premium Style */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {displayItems.map((item) => (
                            <a
                                href={`/menu/${item.slug}`}
                                key={item.id}
                                className="relative aspect-[4/5] overflow-hidden group cursor-pointer rounded-2xl shadow-xl block"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    unoptimized
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Product Name */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="product-label whitespace-nowrap overflow-hidden text-ellipsis leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {item.name}
                                    </span>
                                    <div className="h-1 w-0 bg-primary mt-2 group-hover:w-full transition-all duration-500" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* View Packages Button */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <a href="/packages" className="btn-primary inline-block text-xs tracking-[0.15em] px-8 py-3">
                        VIEW PACKAGES
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Menu;
