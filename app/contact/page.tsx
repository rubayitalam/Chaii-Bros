"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import type { ContactInfo } from "@/lib/types";

export default function ContactPage() {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        eventType: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "contactInfo"), (doc) => {
            if (doc.exists()) {
                setContactInfo(doc.data() as ContactInfo);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await addDoc(collection(db, "enquiries"), {
                ...formData,
                timestamp: new Date(),
                status: "new",
            });

            setSubmitted(true);
            setFormData({ name: "", email: "", eventType: "", message: "" });
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <section className="pt-40 lg:pt-0 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Side: Contact Brand Info */}
                    <div className="bg-brown text-cream p-12 md:p-24 lg:min-h-screen flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
                            <span className="text-[30vw] font-serif font-bold uppercase rotate-90">CHAT</span>
                        </div>

                        <div className="relative z-10 space-y-12">
                            <h1 className="text-6xl md:text-8xl font-script italic lowercase leading-[0.8] mb-12">
                                Contact <span className="text-copper normal-case">Us</span>
                            </h1>

                            <p className="font-serif text-xl md:text-2xl text-cream/70 italic leading-relaxed max-w-md">
                                Whether it&apos;s a grand wedding or an intimate gathering, let&apos;s make it unforgettable.
                            </p>

                            <div className="space-y-8 pt-12">
                                <div className="space-y-2">
                                    <h3 className="text-[10px] tracking-[0.5em] text-copper font-bold uppercase">EMAIL</h3>
                                    <p className="text-xl md:text-2xl font-serif italic text-cream">
                                        {contactInfo?.email || 'CHAII@95BROTHERS.CO.UK'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[10px] tracking-[0.5em] text-copper font-bold uppercase">PHONE</h3>
                                    <p className="text-xl md:text-2xl font-serif italic text-cream">
                                        {contactInfo?.phone || '07496456969'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[10px] tracking-[0.5em] text-copper font-bold uppercase">SOCIAL</h3>
                                    <Link href="https://instagram.com/chaiibros" target="_blank" className="text-xl md:text-2xl font-serif italic text-cream hover:text-copper transition-colors block">
                                        @chaiibros
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Enquiry Form */}
                    <div className="bg-white p-8 md:p-24 lg:min-h-screen flex flex-col justify-center">
                        <div className="max-w-xl w-full mx-auto">
                            <h2 className="text-4xl md:text-5xl font-sans text-brown uppercase mb-12 leading-tight">
                                LET&apos;S <span className="font-script text-copper normal-case italic">Discuss</span> YOUR NEXT EVENT!
                            </h2>

                            {submitted ? (
                                <div className="silk-gradient border border-copper/10 p-12 text-center rounded-sm">
                                    <h3 className="text-3xl font-script text-brown italic mb-6">Thank you!</h3>
                                    <p className="text-lg font-serif text-brown/60 mb-8 italic">
                                        Your enquiry has been received. We&apos;ll get back to you with a bespoke quote soon.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn-outline px-12"
                                    >
                                        SUBMIT ANOTHER
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2 border-b border-copper/20 pb-2 focus-within:border-copper transition-colors">
                                        <label className="text-[10px] tracking-[0.3em] text-copper font-bold uppercase">NAME</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent text-xl font-serif italic text-brown placeholder:text-brown/20 focus:outline-none"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className="space-y-2 border-b border-copper/20 pb-2 focus-within:border-copper transition-colors">
                                        <label className="text-[10px] tracking-[0.3em] text-copper font-bold uppercase">EMAIL</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent text-xl font-serif italic text-brown placeholder:text-brown/20 focus:outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="space-y-2 border-b border-copper/20 pb-2 focus-within:border-copper transition-colors font-serif">
                                        <label className="text-[10px] tracking-[0.3em] text-copper font-bold uppercase">EVENT TYPE</label>
                                        <select
                                            required
                                            value={formData.eventType}
                                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                            className="w-full bg-transparent text-xl font-serif italic text-brown focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">Select event type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="birthday">Birthday Party</option>
                                            <option value="private">Private Party</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 border-b border-copper/20 pb-2 focus-within:border-copper transition-colors">
                                        <label className="text-[10px] tracking-[0.3em] text-copper font-bold uppercase">MESSAGE</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-transparent text-xl font-serif italic text-brown placeholder:text-brown/20 focus:outline-none resize-none"
                                            placeholder="Tell us about the vibes..."
                                        />
                                    </div>

                                    <div className="pt-8 text-left">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="btn-primary px-16 w-full md:w-auto"
                                        >
                                            {submitting ? "SENDING..." : "SUBMIT ENQUIRY"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
