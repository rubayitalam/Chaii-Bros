"use client";

import Link from "next/link";

const AboutSection = () => {
    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="mb-8">
                        <span className="font-display text-2xl md:text-3xl tracking-[0.15em] uppercase text-primary font-light">
                            SPILLING THE TEA
                        </span>
                        <span className="inline-flex items-baseline gap-3 ml-4">
                            <span className="font-[family-name:var(--font-amalfi)] text-4xl md:text-5xl lg:text-6xl text-foreground">since</span>
                            <span className="font-[family-name:var(--font-amalfi)] text-2xl md:text-3xl lg:text-4xl text-foreground">2019</span>
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="font-display text-xl md:text-2xl italic text-muted-foreground leading-relaxed mb-10">
                        At Chaii Bros, we don&apos;t just serve drinks and desserts; we create an experience
                        that leaves a lasting impression on your guests.
                    </p>

                    {/* CTA Button */}
                    <Link href="/about" className="btn-solid inline-block">
                        READ OUR STORY
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
