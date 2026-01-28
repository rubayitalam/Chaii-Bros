"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import type { AboutContent, Testimonial } from "@/lib/types";

import TestimonialsSection from "@/components/ui/TestimonialsSection";

export default function AboutPage() {
    const [about, setAbout] = useState<AboutContent | null>(null);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        // About content
        const aboutUnsub = onSnapshot(doc(db, "pages", "aboutUs"), (doc) => {
            if (doc.exists()) {
                setAbout(doc.data() as AboutContent);
            }
        });

        // Testimonials
        const testimonialsQuery = query(collection(db, "testimonials"), orderBy("order", "asc"));
        const testimonialsUnsub = onSnapshot(testimonialsQuery, (snapshot) => {
            setTestimonials(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial)));
        });

        return () => {
            aboutUnsub();
            testimonialsUnsub();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Hero */}
            <section className="pt-40 pb-20 hero-gradient">
                <div className="container-custom text-center">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-script text-brown italic lowercase leading-[0.8] mb-4">
                        Our <span className="text-copper normal-case drop-shadow-sm">Story</span>
                    </h1>
                    <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-copper font-bold mt-6">
                        SINCE 2019
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-white relative">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto space-y-24">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brown text-center leading-tight">
                            {about?.mainHeading || "THE FIRST MOBILE CHAI BAR IN THE UK"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <p className="font-serif text-xl text-brown/70 italic leading-relaxed">
                                    {about?.paragraph1 || "Established in 2019 in Birmingham, Chai Bros began with two friends, Razi and Abid, sharing their love, travel and a vision to bring authentic, premium chai to the events industry as the UK's first mobile chai bar."}
                                </p>
                            </div>
                            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                                <Image
                                    src={about?.images?.[0] || "/images/hero/wedding.png"}
                                    alt="Story Image"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl order-2 md:order-1">
                                <Image
                                    src={about?.images?.[1] || "/images/hero/chai.png"}
                                    alt="Process Image"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="space-y-8 order-1 md:order-2">
                                <p className="font-serif text-xl text-brown/70 italic leading-relaxed">
                                    {about?.paragraph2 || "Through meticulous testing in our kitchen, we perfected our signature chai recipe, blending traditional South Asian flavours with contemporary sophistication. Since our first booking in November 2019, that recipe remains untouched because quality truly comes before quantity."}
                                </p>
                            </div>
                        </div>

                        <div className="text-center space-y-12">
                            <p className="font-serif text-2xl text-brown italic leading-relaxed max-w-3xl mx-auto">
                                {about?.paragraph3 || "Today, Chai Bros is a trusted name in UK events and catering. We've expanded to include urban iced coffee, premium matcha, gourmet pancakes, and chocolate dipped strawberries, delivering five-star quality to every event big or small."}
                            </p>
                            <div className="relative h-[400px] w-full max-w-3xl mx-auto overflow-hidden shadow-3xl">
                                <Image
                                    src={about?.images?.[2] || "/images/hero/pancakes.png"}
                                    alt="Experience Image"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Banner - Using Shared Component */}
            <TestimonialsSection testimonials={testimonials} />

            {/* Final CTA */}
            <section className="py-32 bg-cream text-center">
                <div className="container-custom">
                    <h2 className="text-5xl md:text-7xl font-sans text-brown uppercase mb-12">
                        READY TO ELEVATE YOUR <span className="font-script text-copper lowercase italic">Celebration?</span>
                    </h2>
                    <Link href="/contact" className="btn-primary inline-flex px-16">
                        LET&apos;S DISCUSS
                    </Link>
                </div>
            </section>
        </div>
    );
}
