"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function PrivacyPage() {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "legalContent"), (doc) => {
            if (doc.exists()) {
                setContent(doc.data().privacyPolicy || "");
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
                        PRIVACY POLICY
                    </h1>
                </div>
            </header>

            {/* Content Section - Light Cream */}
            <main className="flex-grow bg-[#F7F3EF] py-12 md:py-20">
                <div className="container-custom max-w-4xl px-6 md:px-0">
                    <div className="prose prose-sm md:prose-base max-w-none font-serif text-brown/80 space-y-12">
                        {content ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    <p className="font-bold">Effective Date: January 2026</p>
                                    <p className="font-bold">Last Updated: January 2026</p>
                                    <p className="text-lg leading-relaxed italic">
                                        Chaii Bros Ltd (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website or services.
                                    </p>
                                </div>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">1. COMPANY INFORMATION</span>
                                    </h2>
                                    <div className="space-y-2">
                                        <p>Chaii Bros Ltd</p>
                                        <p>Registered Company Number: 16608478</p>
                                        <p>Registered Address: 84 Walsall Street, Wednesbury, England, WS10 9EN</p>
                                        <p>Email: CHAII@95BROTHERS.CO.UK</p>
                                        <p>Phone: 07496456969</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">2. INFORMATION WE COLLECT</span>
                                    </h2>
                                    <div className="space-y-6">
                                        <p>We collect and process the following types of personal information:</p>

                                        <div>
                                            <h3 className="font-bold text-brown uppercase text-xs tracking-wider mb-2">2.1 INFORMATION YOU PROVIDE TO US</h3>
                                            <ul className="space-y-2 pl-4">
                                                <li>Contact Information: Name, email address, telephone number</li>
                                                <li>Event Details: Event date, location, guest numbers, and special requirements</li>
                                                <li>Payment Information: Payment card details or bank account information (when processing payments)</li>
                                                <li>Communication Records: Records of correspondence when you contact us</li>
                                                <li>Photos and Videos: Images and footage captured at events for marketing purposes</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-brown uppercase text-xs tracking-wider mb-2">2.2 INFORMATION WE COLLECT AUTOMATICALLY</h3>
                                            <ul className="space-y-2 pl-4">
                                                <li>Website Usage Data: IP address, browser type, device information, pages visited</li>
                                                <li>Cookies: We use cookies to improve your experience (see Section 6)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">3. HOW WE USE YOUR INFORMATION</span>
                                    </h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-bold text-brown uppercase text-xs tracking-wider mb-2">3.1 SERVICE DELIVERY</h3>
                                            <ul className="space-y-2 pl-4">
                                                <li>Processing and managing your event bookings</li>
                                                <li>Communicating with you about your booking</li>
                                                <li>Providing customer service and support</li>
                                                <li>Delivering our catering services at your event</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brown uppercase text-xs tracking-wider mb-2">3.2 BUSINESS OPERATIONS</h3>
                                            <ul className="space-y-2 pl-4">
                                                <li>Processing payments and maintaining financial records</li>
                                                <li>Improving our services and website functionality</li>
                                                <li>Complying with legal and regulatory obligations</li>
                                                <li>Preventing fraud and maintaining security</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brown uppercase text-xs tracking-wider mb-2">3.3 MARKETING (WITH YOUR CONSENT)</h3>
                                            <ul className="space-y-2 pl-4">
                                                <li>Sending promotional emails about our services, offers, and updates</li>
                                                <li>Social media marketing and engagement</li>
                                                <li>Using event photos and videos on our platforms</li>
                                                <li>Analysing customer preferences</li>
                                            </ul>
                                            <p className="mt-4 text-sm italic">You can opt out of marketing communications at any time.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">4. LEGAL BASIS FOR PROCESSING</span>
                                    </h2>
                                    <ul className="space-y-4">
                                        <li><span className="font-bold">Contract Performance:</span> Necessary to fulfil our service agreement</li>
                                        <li><span className="font-bold">Legitimate Interests:</span> Operating our business and preventing fraud</li>
                                        <li><span className="font-bold">Legal Obligation:</span> Complying with tax and legal requirements</li>
                                        <li><span className="font-bold">Consent:</span> Marketing and certain cookie usage</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">5. HOW WE SHARE YOUR INFORMATION</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>We do not sell, rent, or trade your personal information. We may share it with:</p>
                                        <ul className="space-y-2 pl-4">
                                            <li><span className="font-bold">Service Providers:</span> Payment processors, email platforms, web analytics</li>
                                            <li><span className="font-bold">Legal Requirements:</span> If required by law or to protect our rights</li>
                                            <li><span className="font-bold">Business Transfers:</span> In the event of a merger or sale</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">6. COOKIES</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>We use essential, analytics, and marketing cookies to enhance your experience. You can manage these through your browser settings.</p>
                                        <p className="text-sm">For more info, visit <a href="https://www.allaboutcookies.org" target="_blank" className="underline">www.allaboutcookies.org</a>.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">7. DATA RETENTION</span>
                                    </h2>
                                    <ul className="space-y-2">
                                        <li>Booking Info: Up to 7 years for tax/accounting</li>
                                        <li>Marketing Data: Until consent is withdrawn</li>
                                        <li>Website Analytics: Typically 26 months</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">8. DATA SECURITY</span>
                                    </h2>
                                    <p>We use secure server infrastructure, encryption, and access controls. However, no internet transmission is 100% secure.</p>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">9. YOUR RIGHTS</span>
                                    </h2>
                                    <p className="mb-6">Under UK GDPR, you have the right to:</p>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <span className="font-bold italic min-w-[30px]">9.1</span>
                                            <span>Right of Access: Request a copy of your data</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-bold italic min-w-[30px]">9.2</span>
                                            <span>Right to Rectification: Correct inaccurate data</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-bold italic min-w-[30px]">9.3</span>
                                            <span>Right to Erasure: Request deletion</span>
                                        </li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">13. CONTACT US</span>
                                    </h2>
                                    <div className="space-y-2">
                                        <p className="font-bold">Chaii Bros Ltd</p>
                                        <p>Email: CHAII@95BROTHERS.CO.UK</p>
                                        <p>Address: 84 Walsall Street, Wednesbury, England, WS10 9EN</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">14. COMPLAINTS</span>
                                    </h2>
                                    <p>You can lodge a complaint with the ICO: <a href="https://www.ico.org.uk" target="_blank" className="underline">www.ico.org.uk</a></p>
                                </section>
                            </>
                        )}
                        <p className="mt-20 text-sm text-brown/60 italic border-t border-brown/10 pt-12">
                            By using our website or services, you acknowledge that you have read and understood this Privacy Policy.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
