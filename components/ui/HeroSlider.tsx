"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSlide } from "@/lib/types";

interface HeroSliderProps {
    slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!slides || slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-[radial-gradient(circle_at_top_right,_#B5967733_0%,_#FDFBF9_100%)]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <div className="container-custom h-full flex flex-col md:flex-row items-center justify-between gap-12 pt-12">
                        {/* Left Content */}
                        <div className="flex-1 space-y-8 z-20 text-center md:text-left">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="space-y-1"
                            >
                                <h1 className="text-6xl md:text-[80px] lg:text-[100px] font-sans font-light leading-[0.9] text-brown uppercase tracking-tighter">
                                    BREWING<br />
                                    <span className="font-script text-copper capitalize italic text-7xl md:text-[100px] lg:text-[110px] tracking-normal inline-block my-2">
                                        Memories
                                    </span><br />
                                    FOR YOUR<br />
                                    EVENT.
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="pt-4"
                            >
                                <Link
                                    href="/packages"
                                    className="px-10 py-3 bg-cream/50 border border-copper/30 text-copper font-sans text-sm tracking-[0.2em] hover:bg-copper hover:text-white transition-all inline-block"
                                >
                                    EXPLORE PACKAGES
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right: Overlapping Images Stack */}
                        <div className="flex-1 relative w-full h-[400px] md:h-[600px] z-10 pr-12">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, x: 50 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="relative h-full w-full"
                            >
                                {/* Back Image */}
                                <div className="absolute top-[5%] right-[25%] w-[55%] aspect-[3.5/5] z-0 shadow-2xl transition-transform hover:scale-105 duration-700">
                                    <Image src={slides[current]?.imageUrl || ""} alt="Event 1" fill className="object-cover" />
                                </div>
                                {/* Middle Image */}
                                <div className="absolute top-[15%] right-[12.5%] w-[55%] aspect-[3.5/5] z-10 shadow-2xl transition-transform hover:scale-105 duration-700">
                                    <Image src={slides[(current + 1) % slides.length]?.imageUrl || ""} alt="Event 2" fill className="object-cover" />
                                </div>
                                {/* Front Image */}
                                <div className="absolute top-[25%] right-[0%] w-[55%] aspect-[3.5/5] z-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-700">
                                    <Image src={slides[(current + 2) % slides.length]?.imageUrl || slides[current]?.imageUrl || ""} alt="Event 3" fill className="object-cover" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-500 ${current === i ? "w-16 h-[2px] bg-copper" : "w-8 h-[2px] bg-brown/20"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
