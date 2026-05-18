"use client";

{/* Chaii Bros - v1.1 */}

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

// Components
import HeroSection from "@/components/ui/HeroSection";
import TrustedBySection from "@/components/ui/TrustedBySection";
import DiscoverSection from "@/components/ui/DiscoverSection";
import AboutSection from "@/components/ui/AboutSection";
import FollowSection from "@/components/ui/FollowSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import HappyClientsGallery from "@/components/HappyClientsGallery";

// Types
import type { HeroSection as HeroType, MenuItem, Testimonial, GalleryImage } from "@/lib/types";

// Fallbacks
const DEFAULT_HERO: HeroType = {
    slides: [
        {
            title: "BREWING MEMORIES FOR YOUR EVENT.",
            subtitle: "The first mobile chai bar in the UK.",
            imageUrl: "/images/hero/wedding.png",
            cta1Text: "EXPLORE PACKAGES",
            cta1Link: "/packages",
            cta2Text: "",
            cta2Link: ""
        },
        {
            title: "THE PERFECT BLEND.",
            subtitle: "Tradition meets sophisticated style.",
            imageUrl: "/images/hero/chai.png",
            cta1Text: "VIEW MENU",
            cta1Link: "/menu",
            cta2Text: "",
            cta2Link: ""
        }
    ]
};

export default function HomePage() {
    const [hero, setHero] = useState<HeroType>(DEFAULT_HERO);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);

    useEffect(() => {
        // Hero Section
        const heroUnsub = onSnapshot(doc(db, "siteSettings", "heroSection"), (doc) => {
            if (doc.exists()) {
                const data = doc.data() as HeroType;
                if (data.slides && data.slides.length > 0) {
                    setHero(data);
                } else {
                    setHero(DEFAULT_HERO);
                }
            } else {
                setHero(DEFAULT_HERO);
            }
        });

        // Menu Items
        const menuQuery = query(collection(db, "menuItems"), orderBy("order", "asc"));
        const menuUnsub = onSnapshot(menuQuery, (snapshot) => {
            if (!snapshot.empty) {
                setMenuItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MenuItem)));
            }
        });

        // Testimonials
        const testimonialsQuery = query(collection(db, "testimonials"), orderBy("order", "asc"));
        const testimonialsUnsub = onSnapshot(testimonialsQuery, (snapshot) => {
            if (!snapshot.empty) {
                setTestimonials(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial)));
            }
        });

        // Gallery
        const galleryQuery = query(collection(db, "gallery"), orderBy("order", "asc"));
        const galleryUnsub = onSnapshot(galleryQuery, (snapshot) => {
            if (!snapshot.empty) {
                setGallery(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GalleryImage)));
            }
        });

        return () => {
            heroUnsub();
            menuUnsub();
            testimonialsUnsub();
            galleryUnsub();
        };
    }, []);

    return (
        <div className="bg-background min-h-screen">
            {/* 1. Hero Section */}
            <HeroSection slides={hero.slides} />

            {/* 2. Trusted By Section */}
            <TrustedBySection />

            {/* 3. Discover Section */}
            <DiscoverSection items={menuItems} />

            {/* 6. Follow Section */}
            <TestimonialsSection testimonials={testimonials} />
            <FollowSection />

            {/* 7. Happy Clients Section (Synced with admin gallery) */}
            <HappyClientsGallery items={gallery} />

            {/* 7. About Section */}
            <AboutSection />
        </div>
    );
}
