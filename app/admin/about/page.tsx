"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiSave, FiMap, FiType, FiImage, FiCompass, FiStar } from "react-icons/fi";

interface AboutContent {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    image1: string;
    image2: string;
    image3: string;
}

export default function AdminAboutEditor() {
    const [about, setAbout] = useState<AboutContent>({
        heading: "THE FIRST MOBILE CHAI BAR IN THE UK",
        paragraph1: "Established in 2019 in Birmingham, Chai Bros began with two friends, Razi and Abid, sharing their love, travel and a vision to bring authentic, premium chai to the events industry as the UK's first mobile chai bar.",
        paragraph2: "Through meticulous testing in our kitchen, we perfected our signature chai recipe, blending traditional South Asian flavours with contemporary sophistication. Since our first booking in November 2019, that recipe remains untouched because quality truly comes before quantity.",
        paragraph3: "Today, Chai Bros is a trusted name in UK events and catering. We've expanded to include urban iced coffee, premium matcha, gourmet pancakes, and chocolate dipped strawberries, delivering five-star quality to every event big or small.",
        image1: "/images/hero/wedding.png",
        image2: "/images/hero/chai.png",
        image3: "/images/hero/pancakes.png",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "pages", "aboutUs"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setAbout({
                    heading: data.heading || data.mainHeading || "",
                    paragraph1: data.paragraph1 || "",
                    paragraph2: data.paragraph2 || "",
                    paragraph3: data.paragraph3 || "",
                    image1: data.image1 || (data.images ? data.images[0] : ""),
                    image2: data.image2 || (data.images ? data.images[1] : ""),
                    image3: data.image3 || (data.images ? data.images[2] : ""),
                });
            }
            setLoading(false);
        }, (err) => {
            console.error("About listener failed:", err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const dataToSave = {
                mainHeading: about.heading,
                paragraph1: about.paragraph1,
                paragraph2: about.paragraph2,
                paragraph3: about.paragraph3,
                images: [about.image1, about.image2, about.image3]
            };
            await setDoc(doc(db, "pages", "aboutUs"), dataToSave);
            alert("About story updated successfully!");
        } catch (error) {
            console.error("Error updating about page:", error);
            alert("Failed to update about page.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Our <span className="text-copper">Chaii Story</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Craft the narrative of Chaii Bros—tradition, passion, and heritage.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-10 pb-20">
                {/* Main Content Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden">
                    <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                        <FiCompass className="text-copper" />
                        <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Story Progression</h3>
                    </div>

                    <div className="p-10 space-y-10">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-bold text-copper uppercase tracking-widest"><FiType size={12} /> Primary Heading</label>
                            <input
                                type="text"
                                value={about.heading}
                                onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                                className="w-full px-8 py-5 bg-[#FDFBF9] border-2 border-copper/10 rounded-2xl focus:border-copper focus:ring-0 outline-none transition-all font-serif text-2xl text-brown"
                                placeholder="The Heart of Chaii Bros..."
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="space-y-4">
                                    <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Paragraph {num}</label>
                                    <textarea
                                        value={(about as any)[`paragraph${num}`]}
                                        onChange={(e) => setAbout({ ...about, [`paragraph${num}`]: e.target.value })}
                                        className="w-full px-6 py-5 bg-[#FDFBF9] border border-copper/10 rounded-2xl focus:ring-2 focus:ring-copper outline-none h-60 font-serif leading-relaxed text-brown text-base resize-none"
                                        placeholder={`Enter story segment ${num}...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Visuals Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden">
                    <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                        <FiImage className="text-copper" />
                        <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Story Boards (Images)</h3>
                    </div>

                    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="group flex flex-col gap-4">
                                <label className="block text-[10px] font-bold text-brown/40 uppercase tracking-widest">Visual {num} URL</label>
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-2 border-copper/10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                    {(about as any)[`image${num}`] ? (
                                        <Image
                                            src={(about as any)[`image${num}`]}
                                            alt={`Story Image ${num}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-copper/5 flex items-center justify-center text-copper/20">
                                            <FiImage size={48} />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={(about as any)[`image${num}`]}
                                    onChange={(e) => setAbout({ ...about, [`image${num}`]: e.target.value })}
                                    className="w-full px-5 py-3 bg-[#FDFBF9] border border-copper/10 rounded-xl focus:ring-2 focus:ring-copper outline-none font-sans text-[10px] tracking-wide"
                                    placeholder="External Image URL..."
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Save Action */}
                <div className="sticky bottom-0 left-0 right-0 z-[50] mt-12 pb-6 pt-4 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9] to-transparent">
                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full max-w-md mx-auto py-4 rounded-xl shadow-2xl bg-brown hover:bg-brown/95 text-cream border border-copper/20 flex items-center justify-center gap-3 group text-base"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FiSave size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Publish Updated Story</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
