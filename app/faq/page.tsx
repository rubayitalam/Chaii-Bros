"use client";

const faqs = [
    {
        question: "How do I book Chaii Bros for my event?",
        answer: "You can book our services through the 'Enquiries' page on our website, or by contacting us directly via email or telephone. A 20% non-refundable deposit is required to secure your date."
    },
    {
        question: "Do you offer dairy-free or sugar-free options?",
        answer: "Yes, we provide oat, almond, and soya milk alternatives, as well as sugar-free options upon request. Please inform us of any dietary requirements at the time of booking."
    },
    {
        question: "What areas do you cover?",
        answer: "We are based in Wednesbury and cover the surrounding areas. Travel fees are included in our service packages based on the location details provided during booking."
    },
    {
        question: "How much space do you need for setup?",
        answer: "Our Chaii Table and Mini Bar setups require a standard event space. We typically need approximately 1 hour for setup and 1 hour for breakdown, which are not included in your service hours."
    },
    {
        question: "What is your cancellation policy?",
        answer: "The 20% deposit is non-refundable. Cancellations in exceptional circumstances are considered on a case-by-case basis at our sole discretion."
    },
    {
        question: "Are you insured and certified?",
        answer: "Yes, Chaii Bros Ltd maintains comprehensive public liability insurance and adheres to strict food hygiene and safety standards in accordance with UK regulations."
    }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Header Section - Pure White */}
            <header className="w-full pt-24 md:pt-40 pb-12 md:pb-20 border-b border-brown/10 flex justify-center items-center">
                <div className="container-custom max-w-5xl px-6">
                    <h1 className="text-3xl md:text-6xl font-sans text-brown text-center uppercase tracking-[0.15em] leading-tight">
                        FREQUENTLY ASKED<br />QUESTIONS
                    </h1>
                </div>
            </header>

            {/* Content Section - Light Cream */}
            <main className="flex-grow bg-[#F7F3EF] py-12 md:py-20">
                <div className="container-custom max-w-4xl px-6 md:px-0">
                    <div className="space-y-12">
                        {faqs.map((faq, index) => (
                            <section key={index} className="border-b border-brown/10 pb-8 last:border-0">
                                <h2 className="text-sm tracking-[0.1em] font-sans font-bold text-brown uppercase mb-4">
                                    <span className="italic underline">{faq.question}</span>
                                </h2>
                                <p className="font-serif text-brown/80 text-lg leading-relaxed">
                                    {faq.answer}
                                </p>
                            </section>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="font-serif italic text-brown/60 mb-6">Still have questions?</p>
                        <a href="/contact" className="btn-outline inline-block">
                            GET IN TOUCH
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
