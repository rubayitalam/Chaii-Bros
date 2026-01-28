"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@/lib/types";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fallback testimonials matching the user's request
    const fallbackTestimonials: Testimonial[] = [
        {
            id: "1",
            quote: "Brilliant service and definitely will be booking again for future events. I booked Chaiibros for my wedding and ordered the Mocktails and pancakes. They were very thoughtful and ensured both immediate families had drinks and desserts during our busy day. Our guests loved this element to our wedding. Once again, thank you to the team for your exceptional service!",
            author: "SADIKA R - GOOGLE",
            rating: 5,
            order: 1
        },
        {
            id: "2",
            quote: "Brothers, Thank you so much for the amazing mocktails and hot tea during the recent event we had, these guys honestly delivered excellent service, we had drinks throughout the evening/night and everyone loved it, we really appreciate your hard work and effort which was given during the event it was noticed, your drinks came through tasted amazing from hot to cold drinks it sure was a wonderful day, it was your business that added a great atmosphere for everyone to enjoy and have a lovely drink , I'm very happy I would definitely use your service again at any occasion/event your humble guys and it's been a pleasure having you for my family event. We had a wonderful experience with your service and I highly recommend you guys!",
            author: "SONIYAH R - GOOGLE",
            rating: 5,
            order: 2
        },
        {
            id: "3",
            quote: "I have tried a lot of mocktails in my time, but the ones served by chaii bros are the best I've had. I had them for two functions for my wedding- they were extremely accommodating, professional and no hassle. They are very well priced for the service they offer. They also have a very talented camera man who documents your events in a short video, which was so lovely to watch back. I would recommend chaii bros to anyone who is looking for entertainment for an event, they were amazing! Thank you",
            author: "EMAN B - GOOGLE",
            rating: 5,
            order: 3
        }
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
    };

    return (
        <section className="bg-[#D4E0D7] py-20 md:py-28 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-widest uppercase text-[#3D342B] opacity-90 italic">
                        DON&apos;T JUST TAKE OUR WORD FOR IT
                    </h2>
                </div>

                <div className="relative">
                    {/* Desktop View: Grid of 3 */}
                    <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
                        {displayTestimonials.slice(0, 3).map((testimonial) => (
                            <div key={testimonial.id} className="text-center space-y-4 px-2">
                                <p className="font-sans text-[11px] md:text-[12px] leading-relaxed text-[#5A524A] tracking-wide text-justify">
                                    {testimonial.quote}
                                </p>
                                <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-[#3D342B] pt-4">
                                    {testimonial.author}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Mobile/Tablet View: Carousel */}
                    <div className="lg:hidden relative min-h-[300px] flex items-center justify-center">
                        <div className="text-center px-12 transition-all duration-500">
                            <p className="font-sans text-xs leading-relaxed text-[#5A524A] tracking-wide mb-6">
                                {displayTestimonials[currentIndex].quote}
                            </p>
                            <p className="font-display text-xs font-bold tracking-[0.1em] uppercase text-[#3D342B]">
                                {displayTestimonials[currentIndex].author}
                            </p>
                        </div>

                        <button
                            onClick={prev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-[#3D342B]/40 hover:text-[#3D342B] transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#3D342B]/40 hover:text-[#3D342B] transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Navigation Arrows for Desktop (Visual only if specified, but usually grids don't have arrows unless paginated. The image shows arrows at edges. I'll add them visually to match) */}
                    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-12">
                        <ChevronLeft size={24} className="text-[#3D342B]/40" />
                    </div>
                    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-12">
                        <ChevronRight size={24} className="text-[#3D342B]/40" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
