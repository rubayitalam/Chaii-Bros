import React from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types";

interface HappyClientsGalleryProps {
    items: GalleryImage[];
}

const HappyClientsGallery = ({ items }: HappyClientsGalleryProps) => {
    // Fallback data if no dynamic items exist
    const fallbackImages: GalleryImage[] = [
        { id: "1", imageUrl: "/images/hero/wedding.png", caption: "Wedding Setup", order: 1, category: "Event" },
        { id: "2", imageUrl: "/images/hero/chai.png", caption: "Signature Chai", order: 2, category: "Drinks" },
        { id: "3", imageUrl: "/images/hero/pancakes.png", caption: "Dessert Station", order: 3, category: "Food" },
        { id: "4", imageUrl: "/images/hero/wedding.png", caption: "Elegant Venue", order: 4, category: "Event" },
        { id: "5", imageUrl: "/images/hero/chai.png", caption: "Hot Drinks", order: 5, category: "Drinks" },
        { id: "6", imageUrl: "/images/hero/pancakes.png", caption: "Sweet Treats", order: 6, category: "Food" },
        { id: "7", imageUrl: "/images/hero/wedding.png", caption: "Guests Enjoying", order: 7, category: "Event" },
        { id: "8", imageUrl: "/images/hero/chai.png", caption: "Brewing Fresh", order: 8, category: "Drinks" },
    ];

    const displayImages = (items && items.length > 0) ? items : fallbackImages;

    return (
        <section className="pb-16 md:pb-24 pt-4 bg-background">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-center font-display text-xl md:text-2xl tracking-wide text-foreground mb-8">
                    Happy clients <span className="font-script text-primary text-2xl md:text-3xl">(Gallery)</span>
                </h2>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {displayImages.map((img, index) => (
                        <div
                            key={img.id || index}
                            className="relative aspect-square overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={img.imageUrl}
                                alt={img.caption || `Happy client ${index + 1}`}
                                fill
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                unoptimized
                            />
                            {/* Video indicator (Simulated logic based on index for variety, or data if available) */}
                            {index % 3 === 0 && (
                                <div className="absolute top-3 right-3 text-white/80">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HappyClientsGallery;
