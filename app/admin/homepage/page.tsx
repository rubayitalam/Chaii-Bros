"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroSection, HeroSlide } from "@/lib/types";
import {
    FiPlus, FiTrash2, FiChevronUp, FiChevronDown,
    FiImage, FiType, FiLink, FiSave, FiAlertCircle, FiStar
} from "react-icons/fi";

export default function AdminHomepageEditor() {
    const [hero, setHero] = useState<HeroSection>({
        slides: [
            {
                title: "BREWING MEMORIES FOR YOUR EVENT.",
                subtitle: "The first mobile chai bar in the UK.",
                imageUrl: "/images/hero/wedding.png",
                cta1Text: "EXPLORE PACKAGES",
                cta1Link: "/packages",
                cta2Text: "GET IN TOUCH",
                cta2Link: "/contact"
            },
            {
                title: "THE PERFECT BLEND.",
                subtitle: "Tradition meets sophisticated style.",
                imageUrl: "/images/hero/chai.png",
                cta1Text: "VIEW MENU",
                cta1Link: "/menu",
                cta2Text: "BOOK NOW",
                cta2Link: "/contact"
            }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "heroSection"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.slides && data.slides.length > 0) {
                    setHero(data as HeroSection);
                } else if (!data.slides) {
                    // Migrate old single slide format if found
                    setHero({
                        slides: [{
                            title: data.title || "",
                            subtitle: data.subtitle || "",
                            imageUrl: data.images ? data.images[0] : (data.imageUrl || ""),
                            cta1Text: data.cta1Text || "EXPLORE",
                            cta1Link: data.cta1Link || "/packages",
                            cta2Text: data.cta2Text || "CONTACT",
                            cta2Link: data.cta2Link || "/contact"
                        }]
                    });
                }
            }
            setLoading(false);
        }, (err) => {
            console.error("Hero listener failed:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "siteSettings", "heroSection"), hero);
            alert("Success! Homepage hero slides updated.");
        } catch (error) {
            console.error("Error updating hero section:", error);
            alert("Failed to update hero section.");
        } finally {
            setSaving(false);
        }
    };

    const addSlide = () => {
        const newSlide: HeroSlide = {
            title: "",
            subtitle: "",
            imageUrl: "",
            cta1Text: "EXPLORE",
            cta1Link: "/packages",
            cta2Text: "CONTACT",
            cta2Link: "/contact"
        };
        setHero({ ...hero, slides: [...hero.slides, newSlide] });
    };

    const removeSlide = (index: number) => {
        if (!window.confirm("Remove this slide?")) return;
        const newSlides = hero.slides.filter((_, i) => i !== index);
        setHero({ ...hero, slides: newSlides });
    };

    const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
        const newSlides = [...hero.slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setHero({ ...hero, slides: newSlides });
    };

    const moveSlide = (index: number, direction: 'up' | 'down') => {
        const newSlides = [...hero.slides];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newSlides.length) return;

        [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
        setHero({ ...hero, slides: newSlides });
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Page Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-copper/10 pb-8">
                <div>
                    <h2 className="text-3xl font-script text-brown mb-1">Homepage <span className="text-copper">Hero Slider</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Manage the high-impact slides on your home screen</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={addSlide}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brown text-cream rounded-xl hover:bg-brown/90 transition-all font-sans text-sm font-bold shadow-lg"
                    >
                        <FiPlus /> Add New Slide
                    </button>
                </div>
            </div>

            {/* Slides List */}
            <div className="space-y-10">
                {hero.slides.map((slide, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-copper/5 group relative">
                        {/* Slide Header / Badge */}
                        <div className="bg-[#F7F3EF] px-8 py-4 flex justify-between items-center border-b border-copper/5">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-brown text-white flex items-center justify-center font-bold text-xs">
                                    {index + 1}
                                </span>
                                <h3 className="font-bold text-brown uppercase tracking-widest text-xs">Slide Configuration</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => moveSlide(index, 'up')}
                                    disabled={index === 0}
                                    className="p-2 hover:bg-copper/10 rounded-lg text-copper disabled:opacity-20 transition-colors"
                                    title="Move Up"
                                >
                                    <FiChevronUp size={20} />
                                </button>
                                <button
                                    onClick={() => moveSlide(index, 'down')}
                                    disabled={index === hero.slides.length - 1}
                                    className="p-2 hover:bg-copper/10 rounded-lg text-copper disabled:opacity-20 transition-colors"
                                    title="Move Down"
                                >
                                    <FiChevronDown size={20} />
                                </button>
                                <div className="w-px h-6 bg-copper/20 mx-1" />
                                <button
                                    onClick={() => removeSlide(index)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                    title="Delete Slide"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                {/* Form Section */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-copper border-b border-copper/10 pb-2 mb-4">
                                            <FiType size={14} />
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Text Content</span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brown/60 uppercase tracking-tighter mb-2">Main Heading</label>
                                            <input
                                                type="text"
                                                value={slide.title}
                                                onChange={(e) => updateSlide(index, 'title', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-[#FDFBF9] border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none transition-all font-serif text-lg"
                                                placeholder="Enter a powerful headline..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brown/60 uppercase tracking-tighter mb-2">Subheadline / Description</label>
                                            <textarea
                                                value={slide.subtitle}
                                                onChange={(e) => updateSlide(index, 'subtitle', e.target.value)}
                                                className="w-full px-5 py-3.5 bg-[#FDFBF9] border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none h-28 font-serif leading-relaxed text-base resize-none"
                                                placeholder="Enter a brief supporting description..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-copper border-b border-copper/10 pb-2 mb-4">
                                            <FiLink size={14} />
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Call to Action Buttons</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-4 p-5 bg-[#F7F3EF] rounded-2xl border border-copper/5">
                                                <h4 className="text-[10px] font-bold text-copper uppercase tracking-widest">Primary Button</h4>
                                                <div>
                                                    <label className="block text-[8px] uppercase font-bold text-brown/40 mb-1.5">Label</label>
                                                    <input
                                                        type="text"
                                                        value={slide.cta1Text}
                                                        onChange={(e) => updateSlide(index, 'cta1Text', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white border border-copper/10 rounded-lg outline-none text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[8px] uppercase font-bold text-brown/40 mb-1.5">Link</label>
                                                    <input
                                                        type="text"
                                                        value={slide.cta1Link}
                                                        onChange={(e) => updateSlide(index, 'cta1Link', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white border border-copper/10 rounded-lg outline-none text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4 p-5 bg-[#F7F3EF] rounded-2xl border border-copper/5">
                                                <h4 className="text-[10px] font-bold text-copper uppercase tracking-widest">Secondary Button</h4>
                                                <div>
                                                    <label className="block text-[8px] uppercase font-bold text-brown/40 mb-1.5">Label</label>
                                                    <input
                                                        type="text"
                                                        value={slide.cta2Text}
                                                        onChange={(e) => updateSlide(index, 'cta2Text', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white border border-copper/10 rounded-lg outline-none text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[8px] uppercase font-bold text-brown/40 mb-1.5">Link</label>
                                                    <input
                                                        type="text"
                                                        value={slide.cta2Link}
                                                        onChange={(e) => updateSlide(index, 'cta2Link', e.target.value)}
                                                        className="w-full px-4 py-2 bg-white border border-copper/10 rounded-lg outline-none text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Section */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="flex items-center gap-2 text-copper border-b border-copper/10 pb-2 mb-4">
                                        <FiImage size={14} />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Background Media</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brown/60 uppercase tracking-tighter mb-2">Direct Image URL</label>
                                        <input
                                            type="text"
                                            value={slide.imageUrl}
                                            onChange={(e) => updateSlide(index, 'imageUrl', e.target.value)}
                                            className="w-full px-5 py-3.5 bg-[#FDFBF9] border border-copper/20 rounded-xl focus:ring-2 focus:ring-copper outline-none transition-all text-sm mb-4"
                                            placeholder="Paste URL from unsplash or other source..."
                                        />
                                    </div>

                                    {slide.imageUrl ? (
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-copper/10 shadow-2xl group/preview">
                                            <Image
                                                src={slide.imageUrl}
                                                alt="Slide Preview"
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/preview:scale-105"
                                                unoptimized
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                                <p className="text-white font-serif text-lg leading-tight mb-2 opacity-90">{slide.title || "Headline Preview"}</p>
                                                <div className="flex gap-2">
                                                    <div className="px-3 py-1 bg-copper rounded text-[10px] font-bold text-white uppercase">{slide.cta1Text}</div>
                                                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-[10px] font-bold text-white uppercase border border-white/20">{slide.cta2Text}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="aspect-[4/3] rounded-2xl bg-copper/5 border-2 border-dashed border-copper/20 flex flex-col items-center justify-center text-brown/30 space-y-2">
                                            <FiImage size={40} />
                                            <p className="text-xs uppercase font-bold tracking-widest">Image Preview Area</p>
                                        </div>
                                    )}

                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 text-orange-800">
                                        <FiAlertCircle className="shrink-0 mt-0.5" />
                                        <p className="text-[10px] leading-relaxed">
                                            <strong>Tip:</strong> Use high-resolution images (at least 1920x1080) for the best appearance on large screens.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {hero.slides.length === 0 && (
                    <div className="text-center py-32 bg-copper/5 rounded-3xl border-2 border-dashed border-copper/20">
                        <FiStar size={48} className="mx-auto text-copper/20 mb-4" />
                        <h3 className="text-xl font-serif text-brown/60 italic">No slides exist on your homepage yet</h3>
                        <p className="text-xs uppercase tracking-widest text-copper/40 mt-2">Click &quot;Add New Slide&quot; to begin building your hero section</p>
                    </div>
                )}
            </div>

            {/* Sticky Save Bar */}
            <div className="sticky bottom-0 left-0 right-0 z-[50] mt-12 pb-6 pt-4 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9] to-transparent">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full max-w-md mx-auto py-4 rounded-xl shadow-2xl bg-brown hover:bg-brown/95 text-cream border border-copper/20 flex items-center justify-center gap-3 group text-base"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <FiSave size={18} className="group-hover:scale-110 transition-transform" />
                            <span>Save Hero Changes</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
