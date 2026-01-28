"use client";

import React, { useEffect, useState } from "react";
import PackageCard from "@/components/PackageCard";
import HappyClientsGallery from "@/components/HappyClientsGallery";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import type { CateringPackage, GalleryImage } from "@/lib/types";

const Packages = () => {
    const [packages, setPackages] = useState<CateringPackage[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Packages from Collection Only
        const q = query(collection(db, "packages"));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                features: doc.data().features || doc.data().inclusions || [],
                guests: doc.data().guests || doc.data().guestCount || ""
            } as CateringPackage));
            setPackages(data);
        });

        // Fetch Gallery for Happy Clients
        const galleryQuery = query(collection(db, "gallery"), orderBy("order", "asc"));
        const galleryUnsub = onSnapshot(galleryQuery, (snapshot) => {
            if (!snapshot.empty) {
                setGallery(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GalleryImage)));
            }
            setLoading(false);
        });

        return () => {
            unsub();
            galleryUnsub();
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-32 md:pt-40 pb-12 md:pb-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <h1 className="font-display text-4xl md:text-5xl tracking-wide text-foreground">
                        <span className="font-script text-primary text-4xl md:text-5xl">Our</span>{" "}
                        <span className="uppercase">PACKAGES</span>
                    </h1>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="pb-16 md:pb-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
                            {packages.map((pkg, index) => (
                                <PackageCard key={index} name={pkg.name} image={pkg.imageUrl} features={pkg.features} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bespoke Quote Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <h2 className="font-display text-2xl md:text-3xl tracking-wide text-foreground uppercase mb-2">
                        NEED A <span className="font-script text-primary text-3xl md:text-4xl normal-case">Bespoke</span> QUOTE?
                    </h2>
                    <p className="text-muted-foreground font-display tracking-wide mt-4 mb-8">
                        Let&apos;s elevate your next celebration together!
                    </p>
                    <a href="/contact" className="btn-outline inline-block text-xs tracking-[0.15em] px-8 py-3">
                        GET IN TOUCH
                    </a>
                </div>
            </section>

            {/* Happy Clients Gallery */}
            <HappyClientsGallery items={gallery} />
        </div>
    );
};

export default Packages;
