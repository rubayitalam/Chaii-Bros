"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Slide {
    title: string;
    subtitle: string;
    imageUrl: string;
    cta1Text: string;
    cta1Link: string;
}

const HeroSection = ({ slides }: { slides: Slide[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    const mainSlide = slides[currentSlide];
    const prevSlide = slides[(currentSlide - 1 + slides.length) % slides.length];
    const nextSlide = slides[(currentSlide + 1) % slides.length];

    return (
        <section className="hero-gradient min-h-screen relative overflow-hidden pt-20">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-16 md:pb-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[75vh]">
                    {/* Left Content */}
                    <div 
                        key={currentSlide} 
                        className="space-y-8 lg:space-y-10 order-2 lg:order-1 relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-left-10"
                    >
                        <div className="space-y-4">
                            {mainSlide.subtitle && (
                                <p className="font-script text-primary text-3xl md:text-4xl font-normal leading-none">
                                    {mainSlide.subtitle}
                                </p>
                            )}
                            <h1 className="font-serif uppercase tracking-widest text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] text-foreground font-light">
                                {mainSlide.title}
                            </h1>
                        </div>

                        <div>
                            <Link 
                                href={mainSlide.cta1Link || "/packages"} 
                                className="btn-outline inline-block font-[family-name:var(--font-jost)]"
                            >
                                {mainSlide.cta1Text || "EXPLORE PACKAGES"}
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Stacked Images */}
                    <div className="relative h-[350px] md:h-[450px] lg:h-[550px] order-1 lg:order-2 mt-8 lg:mt-0">
                        <div className="absolute inset-0 flex items-center justify-center lg:justify-end">
                            {/* Background image (Duplicate/Previous) */}
                            <div className="absolute top-0 left-1/2 -translate-x-[110%] lg:left-auto lg:right-[35%] lg:translate-x-0 w-44 md:w-52 lg:w-56 aspect-square overflow-hidden shadow-lg transition-all duration-700">
                                <Image
                                    src={prevSlide.imageUrl}
                                    alt="Event venue"
                                    fill
                                    className="object-cover opacity-80"
                                    unoptimized
                                />
                            </div>

                            {/* Middle image (Next) */}
                            <div className="absolute top-8 left-1/2 -translate-x-[55%] lg:left-auto lg:right-[18%] lg:translate-x-0 w-48 md:w-56 lg:w-64 aspect-square overflow-hidden shadow-xl transition-all duration-700">
                                <Image
                                    src={nextSlide.imageUrl}
                                    alt="Elegant catering"
                                    fill
                                    className="object-cover opacity-90"
                                    unoptimized
                                />
                            </div>

                            {/* Front image (Current) - main focus */}
                            <div className="absolute top-16 left-1/2 -translate-x-[0%] lg:left-auto lg:right-[0%] lg:translate-x-0 w-52 md:w-64 lg:w-72 aspect-square overflow-hidden shadow-2xl z-10 transition-all duration-700 hover:scale-105">
                                <Image
                                    src={mainSlide.imageUrl}
                                    alt="Chaii Bros service"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                                {mainSlide.imageUrl.includes("chai") && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                                        <span className="font-script text-white text-3xl md:text-4xl text-center leading-normal">
                                            Chaii + Hot Beverages
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={cn(
                            "w-12 h-[2px] transition-all duration-500",
                            currentSlide === i ? "bg-primary" : "bg-primary/20"
                        )}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
