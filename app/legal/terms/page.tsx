"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function TermsPage() {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "siteSettings", "legalContent"), (doc) => {
            if (doc.exists()) {
                setContent(doc.data().termsAndConditions || "");
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
                        TERMS & CONDITIONS
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
                                    <p className="text-lg leading-relaxed">
                                        These Terms and Conditions (&quot;Terms&quot;) govern the provision of event catering services by Chaii Bros Ltd. By making a booking with us, you agree to be bound by these Terms.
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
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">2. BOOKING AND CONFIRMATION</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>2.1 All bookings are subject to availability and must be confirmed in writing via our website, email, telephone, or WhatsApp.</p>
                                        <p>2.2 A booking is only confirmed once the deposit payment has been received and written confirmation has been provided by Chaii Bros Ltd.</p>
                                        <p>2.3 We reserve the right to decline any booking at our discretion.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">3. PAYMENT TERMS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>3.1 A non-refundable deposit of 20% of the total booking fee is required at the time of booking to secure your event date.</p>
                                        <p>3.2 The remaining balance must be paid in full before or on the day of the event, prior to service commencement.</p>
                                        <p>3.3 Failure to provide payment in full may result in delays to service setup or cancellation of the booking.</p>
                                        <p>3.4 Payment can be made via bank transfer, card payment, or other methods as agreed.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">4. CANCELLATIONS AND REFUNDS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>4.1 The 20% deposit is non-refundable under normal circumstances.</p>
                                        <p>4.2 In exceptional circumstances, cancellations may be considered on a case-by-case basis at the sole discretion of Chaii Bros Ltd.</p>
                                        <p>4.3 Chaii Bros Ltd reserves the right to cancel bookings due to unforeseen circumstances, including but not limited to staff illness, equipment failure, or force majeure events. In such cases, a full refund will be provided.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">5. SERVICE DURATION AND ADDITIONAL CHARGES</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>5.1 Standard service packages include up to 4 hours of service time.</p>
                                        <p>5.2 Setup and breakdown require approximately 1 hour each and are not included in the serviceable hours.</p>
                                        <p>5.3 Requests for service periods exceeding 4 hours may incur additional charges, which will be communicated and agreed upon prior to the event.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">6. VENUE REQUIREMENTS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>6.1 The client must ensure that the event venue provides adequate access to electricity and water supply for our equipment and services.</p>
                                        <p>6.2 The client is responsible for confirming these requirements with the venue prior to the event date.</p>
                                        <p>6.3 Failure to provide adequate facilities may affect service delivery, and Chaii Bros Ltd cannot be held responsible for any resulting limitations.</p>
                                        <p>6.4 The client must ensure safe and accessible access for our team and equipment during setup and breakdown.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">7. TRAVEL AND DISTANCE</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>7.1 Travel and distance fees are included in the service package pricing based on the event location details provided by the client at the time of booking.</p>
                                        <p>7.2 Any changes to the event location after booking confirmation may result in additional charges.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">8. EQUIPMENT AND LIABILITY</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>8.1 Chaii Bros Ltd maintains comprehensive liability insurance for all events.</p>
                                        <p>8.2 The client is responsible for any damage to our equipment, setups, or property caused by the client, their guests, or third parties during the event.</p>
                                        <p>8.3 Any costs incurred from equipment damage will be charged to the client.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">9. FOOD ALLERGIES AND DIETARY REQUIREMENTS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>9.1 Clients are encouraged to inform us of any food allergies or dietary requirements at the time of booking.</p>
                                        <p>9.2 While we make every effort to accommodate dietary needs, we cannot guarantee that all products are completely free from allergens due to the nature of our ingredients and preparation methods.</p>
                                        <p>9.3 It is the responsibility of the client and their guests to inform us of any allergies or dietary restrictions.</p>
                                        <p>9.4 Chaii Bros Ltd cannot accept liability for allergic reactions where we have not been informed of specific allergies, or where cross-contamination may occur despite our best efforts.</p>
                                        <p>9.5 Guests with severe allergies should exercise caution and inform our staff on-site.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">10. CLIENT RESPONSIBILITIES</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>10.1 The client must provide accurate event details, including date, time, location, guest numbers, and any special requirements.</p>
                                        <p>10.2 Any changes to the booking must be communicated to Chaii Bros Ltd as soon as possible.</p>
                                        <p>10.3 The client is responsible for ensuring guest behaviour does not interfere with our service or damage our equipment.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">11. OUR RESPONSIBILITIES</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>11.1 Chaii Bros Ltd will arrive at the agreed time to set up and provide services as outlined in the booking confirmation.</p>
                                        <p>11.2 We will provide professional, high-quality service throughout the event duration.</p>
                                        <p>11.3 We will maintain food hygiene and safety standards in accordance with UK regulations.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">12. FORCE MAJEURE</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>12.1 Chaii Bros Ltd shall not be liable for any failure to perform our obligations where such failure is due to circumstances beyond our reasonable control, including but not limited to acts of God, war, flood, fire, labour disputes, or government restrictions.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">13. LIMITATION OF LIABILITY</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>13.1 Our total liability for any claims arising from our services shall not exceed the total amount paid for the booking.</p>
                                        <p>13.2 We shall not be liable for any indirect, consequential, or special losses.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">14. COMPLAINTS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>14.1 Any complaints regarding our service should be raised with us as soon as possible, preferably during the event.</p>
                                        <p>14.2 Formal complaints should be submitted in writing within 7 days of the event to allow us to investigate and respond appropriately.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">15. DATA PROTECTION</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>15.1 We collect and process personal data in accordance with UK GDPR and our Privacy Policy.</p>
                                        <p>15.2 Client information will only be used for the purposes of fulfilling the booking and will not be shared with third parties without consent.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">16. PHOTOGRAPHY AND MARKETING</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>16.1 Chaii Bros Ltd may take photographs and videos at events for marketing and promotional purposes, including use on our website, social media channels, and other marketing materials.</p>
                                        <p>16.2 By confirming your booking, you acknowledge and consent to photography and videography taking place at your event.</p>
                                        <p>16.3 If you or your guests do not wish to be photographed or filmed, please inform us in writing prior to the event, and we will make reasonable efforts to accommodate your request.</p>
                                        <p>16.4 You have the right to request the removal of any images featuring you or your guests from our marketing materials at any time by contacting us.</p>
                                        <p>16.5 Any images or videos taken remain the property of Chaii Bros Ltd unless otherwise agreed in writing.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">17. AMENDMENTS TO TERMS</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>17.1 Chaii Bros Ltd reserves the right to update these Terms and Conditions at any time.</p>
                                        <p>17.2 Any changes will be posted on our website, and continued use of our services constitutes acceptance of updated terms.</p>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">18. GOVERNING LAW</span>
                                    </h2>
                                    <div className="space-y-4">
                                        <p>18.1 These Terms and Conditions are governed by the laws of England and Wales.</p>
                                        <p>18.2 Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
                                    </div>
                                </section>

                                <section className="pt-8">
                                    <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-8">
                                        <span className="italic underline">19. CONTACT INFORMATION</span>
                                    </h2>
                                    <div className="space-y-4 mb-12">
                                        <p>For any questions regarding these Terms and Conditions, please contact us:</p>
                                        <div className="space-y-1">
                                            <p className="font-bold">Chaii Bros Ltd</p>
                                            <p>Email: CHAII@95BROTHERS.CO.UK</p>
                                            <p>Phone: 07496456969</p>
                                            <p>Website: www.chaiibros.co.uk</p>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}
                        <p className="text-sm text-brown/60 italic border-t border-brown/10 pt-12">
                            By confirming your booking, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
