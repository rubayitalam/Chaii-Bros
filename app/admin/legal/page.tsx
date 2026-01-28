"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { FiSave, FiShield, FiFileText, FiAlertOctagon, FiActivity, FiBook } from "react-icons/fi";

interface LegalContent {
    privacyPolicy: string;
    termsAndConditions: string;
    allergenAdvice: string;
    nutritionalInfo: string;
}

export default function AdminLegalEditor() {
    const [content, setContent] = useState<LegalContent>({
        privacyPolicy: "",
        termsAndConditions: "",
        allergenAdvice: "",
        nutritionalInfo: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "legalContent"), (doc) => {
            if (doc.exists()) {
                setContent(doc.data() as LegalContent);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await setDoc(doc(db, "siteSettings", "legalContent"), content);
            alert("Legal Disclosures & Policies published successfully!");
        } catch (error) {
            console.error("Error updating legal content:", error);
            alert("Failed to publish content.");
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
                    <h2 className="text-3xl font-script text-brown mb-1">Policies & <span className="text-copper">Nutrition Disclosures</span></h2>
                    <p className="text-sm text-brown/50 font-sans tracking-wide">Maintain regulatory compliance and customer safety information.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-12 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Privacy Policy */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiShield className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Data Privacy Protocol</h3>
                        </div>
                        <div className="p-8">
                            <textarea
                                value={content.privacyPolicy}
                                onChange={(e) => setContent({ ...content, privacyPolicy: e.target.value })}
                                className="w-full px-6 py-5 bg-[#FDFBF9] border border-copper/10 rounded-2xl focus:ring-2 focus:ring-copper outline-none h-[400px] font-serif leading-relaxed text-sm text-brown resize-none"
                                placeholder="Enter full privacy legalities..."
                            />
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiBook className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Contractual Service Terms</h3>
                        </div>
                        <div className="p-8">
                            <textarea
                                value={content.termsAndConditions}
                                onChange={(e) => setContent({ ...content, termsAndConditions: e.target.value })}
                                className="w-full px-6 py-5 bg-[#FDFBF9] border border-copper/10 rounded-2xl focus:ring-2 focus:ring-copper outline-none h-[400px] font-serif leading-relaxed text-sm text-brown resize-none"
                                placeholder="Enter full operational terms..."
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Allergen Advice */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiAlertOctagon className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Public Allergy Advice</h3>
                        </div>
                        <div className="p-8">
                            <textarea
                                value={content.allergenAdvice}
                                onChange={(e) => setContent({ ...content, allergenAdvice: e.target.value })}
                                className="w-full px-6 py-5 bg-[#FDFBF9] border border-copper/10 rounded-2xl focus:ring-2 focus:ring-copper outline-none h-[250px] font-serif leading-relaxed text-sm text-brown resize-none"
                                placeholder="Disclose common allergens (Milk, Nuts, Soya)..."
                            />
                        </div>
                    </div>

                    {/* Nutritional Info */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-copper/5 overflow-hidden flex flex-col">
                        <div className="bg-[#F7F3EF] px-10 py-6 border-b border-copper/5 flex items-center gap-3">
                            <FiActivity className="text-copper" />
                            <h3 className="text-xs font-bold text-brown uppercase tracking-[0.2em]">Dietary & Nutritional Data</h3>
                        </div>
                        <div className="p-8">
                            <textarea
                                value={content.nutritionalInfo}
                                onChange={(e) => setContent({ ...content, nutritionalInfo: e.target.value })}
                                className="w-full px-6 py-5 bg-[#FDFBF9] border border-copper/10 rounded-2xl focus:ring-2 focus:ring-copper outline-none h-[250px] font-serif leading-relaxed text-sm text-brown resize-none"
                                placeholder="Detail calorie counts or standard nutritional values..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sticky Save Bar */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 lg:left-[calc(50%+140px)] z-[100] w-full max-w-sm px-6">
                    <Button
                        type="submit"
                        disabled={saving}
                        className="w-full py-5 rounded-2xl shadow-[0_20px_50px_rgba(61,43,31,0.3)] bg-brown hover:bg-brown/95 text-cream border-2 border-copper/20 flex items-center justify-center gap-3 group text-lg"
                    >
                        {saving ? (
                            <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <FiSave size={20} className="group-hover:scale-110 transition-transform" />
                                <span>Publish Disclosures</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
