"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function NutritionPage() {
    const [content, setContent] = useState({ allergenAdvice: "", nutritionalInfo: "" });

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "legalContent"), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setContent({
                    allergenAdvice: data.allergenAdvice || "",
                    nutritionalInfo: data.nutritionalInfo || ""
                });
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header Section - Pure White */}
            <header className="w-full pt-24 md:pt-40 pb-12 md:pb-20 border-b border-brown/10 flex justify-center items-center">
                <div className="container-custom max-w-5xl px-6">
                    <h1 className="text-3xl md:text-6xl font-sans text-brown text-center uppercase tracking-[0.15em] leading-tight">
                        ALLERGEN & NUTRITIONAL<br />INFORMATION
                    </h1>
                </div>
            </header>

            {/* Content Section - Light Cream */}
            <main className="flex-grow bg-[#F7F3EF] py-12 md:py-20">
                <div className="container-custom max-w-4xl px-6 md:px-0">
                    <div className="prose prose-sm md:prose-base max-w-none font-serif text-brown/80 space-y-12">

                        <section>
                            <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                <span className="italic underline">ALLERGY ADVICE</span>
                            </h2>
                            {content.allergenAdvice ? (
                                <div className="whitespace-pre-wrap text-lg leading-relaxed">{content.allergenAdvice}</div>
                            ) : (
                                <>
                                    <p className="text-lg leading-relaxed mb-6">
                                        We take allergies seriously and are happy to accommodate dietary requirements wherever possible. Our products may contain the following allergens:
                                    </p>
                                    <p className="text-lg leading-relaxed font-sans mb-8">
                                        Common allergens present: <span className="underline decoration-1 underline-offset-4">Milk, Nuts, Gluten, Eggs</span>
                                    </p>
                                    <p className="leading-relaxed mb-8">
                                        Please note that all our products are prepared in a kitchen where these allergens are handled. Despite our best efforts to prevent cross-contamination, we cannot guarantee that any item is 100% free from traces of allergens.
                                    </p>
                                    <div className="space-y-4">
                                        <p className="leading-relaxed">
                                            <span className="font-bold">Alternative options available:</span> We offer dairy-free milk alternatives (oat, almond, soya) and sugar-free options upon request. Please inform us of your preferences when booking or speak with our team on-site.
                                        </p>
                                        <p className="leading-relaxed">
                                            If you have a severe allergy, it is your responsibility to inform us of any allergies or dietary restrictions.
                                        </p>
                                    </div>
                                </>
                            )}
                        </section>

                        <section className="pt-8">
                            <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                <span className="italic underline">NUTRITIONAL INFORMATION</span>
                            </h2>
                            {content.nutritionalInfo ? (
                                <div className="whitespace-pre-wrap text-lg leading-relaxed">{content.nutritionalInfo}</div>
                            ) : (
                                <>
                                    <p className="leading-relaxed mb-8 italic">
                                        Nutritional values are provided as a guide only and may vary depending on portion size and customisation options. All figures are approximate and based on standard recipes using typical ingredients.
                                    </p>

                                    <ul className="space-y-4 pl-4 list-none">
                                        <li className="flex gap-4">
                                            <span className="text-brown/40">·</span>
                                            <span>Values may vary due to natural variations in ingredients and preparation methods</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="text-brown/40">·</span>
                                            <span>Optional additions (extra sugar, toppings, alternative milks) will alter the nutritional content</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="text-brown/40">·</span>
                                            <span>For specific dietary advice or precise nutritional requirements, please consult a healthcare professional</span>
                                        </li>
                                    </ul>
                                </>
                            )}

                            <p className="mt-12 text-sm text-brown/60 pt-8 border-t border-brown/10">
                                If you have any questions about our products or require further information, please contact our team.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
