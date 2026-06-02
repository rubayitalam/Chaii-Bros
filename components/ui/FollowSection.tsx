"use client";

import Link from "next/link";
import { GalleryImage } from "@/lib/types";

const FollowSection = () => {

    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Section Title */}
                <div className="text-center mb-8">
                    <h2 className="inline-flex flex-wrap items-baseline justify-center gap-4">
                        <span className="font-[family-name:var(--font-amalfi)] text-4xl md:text-5xl lg:text-6xl text-foreground">Follow</span>
                        <span className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase text-primary font-light">
                            THE BREW CLUB
                        </span>
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="text-center font-display text-lg md:text-xl italic text-muted-foreground mb-8">
                    Keep up to date with all the latest news, events, and product releases.
                </p>

                {/* Follow Button */}
                <div className="text-center">
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-block"
                    >
                        FOLLOW
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FollowSection;
