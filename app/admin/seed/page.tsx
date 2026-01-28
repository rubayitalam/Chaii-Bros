"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const categories = [
    {
        title: "CHAII",
        slug: "chaii",
        subtitle: "AUTHENTIC BREWED",
        description: "OUR SIGNATURE CHAI IS BREWED FRESHLY ON SITE, USING THE FINEST TEA LEAVES AND SPICES. A WARM, COMFORTING HUG IN A CUP THAT BRINGS TRADITION TO YOUR EVENT.",
        heroImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2574&auto=format&fit=crop",
        filterTag: "chaii",
        flavours: ["KARAK CHAI", "PINK TEA", "SAFFRON CHAI", "MASALA CHAI"]
    },
    {
        title: "ICED COFFEE",
        slug: "iced-coffee",
        subtitle: "PREMIUM CHILLED",
        description: "SMOOTH, RICH, AND PERFECTLY CHILLED. OUR PREMIUM ICED COFFEE IS CRAFTED WITH QUALITY BEANS AND SERVED OVER ICE FOR A REFRESHING EXPERIENCE. AVAILABLE IN CLASSIC OR FLAVOURED VARIETIES TO SUIT EVERY TASTE.",
        heroImage: "https://images.unsplash.com/photo-1517701604599-bb29b5c73312?q=80&w=2670&auto=format&fit=crop",
        filterTag: "iced-coffee",
        flavours: ["CARAMEL", "FRENCH VANILLA", "PISTACHIO", "ORIGINAL"]
    },
    {
        title: "MATCHA",
        slug: "matcha",
        subtitle: "CEREMONIAL GRADE",
        description: "EXPERIENCE THE EARTHY, VIBRANT TASTE OF PREMIUM CEREMONIAL GRADE MATCHA. WHISKED TO PERFECTION AND SERVED AS A LATTE OR TEA, PACKED WITH ANTIOXIDANTS AND MINDFUL ENERGY.",
        heroImage: "https://images.unsplash.com/photo-1582793988958-3309656a8124?q=80&w=2670&auto=format&fit=crop",
        filterTag: "matcha",
        flavours: ["VANILLA MATCHA", "STRAWBERRY MATCHA", "ROSE MATCHA"]
    },
    {
        title: "MOCKTAILS",
        slug: "mocktails",
        subtitle: "REFRESHING BLENDS",
        description: "HANDCRAFTED MOCKTAILS THAT LOOK AS GOOD AS THEY TASTE. REFRESHING, FRUITY, AND SOPHISTICATED BLENDS PERFECT FOR CELEBRATIONS WITHOUT THE ALCOHOL.",
        heroImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2514&auto=format&fit=crop",
        filterTag: "mocktails",
        flavours: ["MOJITO", "BLUE LAGOON", "STRAWBERRY DAIQUIRI", "PASSION FRUIT MARTINI"]
    },
    {
        title: "MINI DUTCH PANCAKES",
        slug: "pancakes",
        subtitle: "FLUFFY BITES",
        description: "GOLDEN, FLUFFY BITE-SIZED PANCAKES DRENCHED IN LUXURY CHOCOLATE SAUCES AND TOPPINGS. A CROWD-PLEASING TREAT FRESHLY MADE BEFORE YOUR EYES.",
        heroImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2580&auto=format&fit=crop",
        filterTag: "pancakes",
        flavours: ["MILK CHOCOLATE", "WHITE CHOCOLATE", "LOTUS BISCOFF", "NUTELLA"]
    },
    {
        title: "CHOCOLATE STRAWBERRIES",
        slug: "strawberries",
        subtitle: "SWEET INDULGENCE",
        description: "FRESH, JUICY STRAWBERRIES HAND-DIPPED IN PREMIUM BELGIAN CHOCOLATE. AN ELEGANT AND DECADENT TREAT PERFECT FOR DESSERT TABLES OR WEDDING FAVOURS.",
        heroImage: "https://images.unsplash.com/photo-1606312619070-d48b7065d1b8?q=80&w=2574&auto=format&fit=crop",
        filterTag: "strawberries",
        flavours: ["MILK CHOCOLATE", "WHITE CHOCOLATE", "DARK CHOCOLATE", "PISTACHIO CRUMB"]
    }
];

export default function SeedPage() {
    const [status, setStatus] = useState("Idle");

    const runSeed = async () => {
        setStatus("Seeding...");
        try {
            for (const cat of categories) {
                await setDoc(doc(db, "categoryPages", cat.slug), cat);
            }
            setStatus("Success! All pages created.");
        } catch (e) {
            console.error(e);
            setStatus("Error: " + e);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Seed Categories</h1>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
                <p className="mb-6 text-gray-600 font-medium">{status}</p>
                <button
                    onClick={runSeed}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold uppercase tracking-wide"
                >
                    Run Seed
                </button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
                <p>Ensure you have updated your Firestore Rules first!</p>
            </div>
        </div>
    );
}
