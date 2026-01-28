"use client";

import Image from "next/image";
import Link from "next/link";

const GatheringsSection = () => {
    return (
        <section className="bg-[#F7F3EF] py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="max-w-xl">
                            <h2 className="mb-6 flex flex-col gap-2">
                                <span className="font-script text-4xl md:text-5xl lg:text-6xl text-foreground">Chai for</span>
                                <span className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase text-primary font-light leading-tight">
                                    SMALL GATHERINGS
                                </span>
                            </h2>
                            <p className="font-display text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                                Whether it&apos;s a birthday, an anniversary, or an intimate get-together,
                                we bring the warmth of authentic chai to your home or private venue.
                                Our mobile chai bar setup is designed to fit perfectly into smaller spaces
                                while maintaining the premium experience we&apos;re known for.
                            </p>
                            <Link href="/packages" className="btn-solid inline-block">
                                PLAN YOUR EVENT
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-lg shadow-2xl">
                            <Image
                                src="/images/sections/chai_gathering.png"
                                alt="Small Gatherings Chai Setup"
                                fill
                                className="object-cover"
                            />
                            {/* Decorative framing element if needed */}
                            <div className="absolute inset-0 border-[12px] border-white/10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GatheringsSection;
