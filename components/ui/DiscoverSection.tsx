"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/lib/types";

interface DiscoverSectionProps {
    items: MenuItem[];
}

const DiscoverSection = ({ items }: DiscoverSectionProps) => {
    // Fallback data if no dynamic items exist
    const fallbackItems: MenuItem[] = [
        { id: "1", name: "CHAII", description: "Authentic brewed chai", price: 0, category: "Drinks", imageUrl: "/images/hero/chai.png", order: 1, slug: "chaii" },
        { id: "2", name: "MINI DUTCH\nPANCAKES", description: "Fluffy bites", price: 0, category: "Dessert", imageUrl: "/images/hero/pancakes.png", order: 2, slug: "pancakes" },
        { id: "3", name: "ICED\nCOFFEE", description: "Chilled perfection", price: 0, category: "Drinks", imageUrl: "/images/hero/wedding.png", order: 3, slug: "iced-coffee" },
        { id: "4", name: "MOCKTAILS", description: "Refreshing blends", price: 0, category: "Drinks", imageUrl: "/images/hero/chai.png", order: 4, slug: "mocktails" },
        { id: "5", name: "MATCHA", description: "Premium grade", price: 0, category: "Drinks", imageUrl: "/images/hero/wedding.png", order: 5, slug: "matcha" },
        { id: "6", name: "CHOCOLATE\nSTRAWBERRIES", description: "Sweet indulgence", price: 0, category: "Dessert", imageUrl: "/images/hero/pancakes.png", order: 6, slug: "strawberries" },
    ];

    const displayItems = items.length > 0 ? items : fallbackItems;

    return (
        <section id="menu" className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Section Title */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="inline-flex flex-wrap items-baseline justify-center gap-4">
                        <span className="font-script text-4xl md:text-5xl lg:text-6xl text-foreground">Discover</span>
                        <span className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase text-primary font-light">
                            THE CHAII BROS EXPERIENCE
                        </span>
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {displayItems.map((product) => (
                        <Link
                            href={`/menu/${product.slug}`}
                            key={product.id || product.name}
                            className="relative aspect-[4/5] overflow-hidden group cursor-pointer rounded-2xl shadow-xl block"
                        >
                            <Image
                                src={product.imageUrl}
                                alt={product.name.replace('\n', ' ')}
                                fill
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Product Name */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <span className="product-label whitespace-nowrap overflow-hidden text-ellipsis leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {product.name}
                                </span>
                                <div className="h-1 w-0 bg-primary mt-2 group-hover:w-full transition-all duration-500" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiscoverSection;
