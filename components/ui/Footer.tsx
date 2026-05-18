"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
    const leftLinks = [
        { label: "ABOUT", href: "/about" },
        { label: "PACKAGES", href: "/packages" },
        { label: "MENU", href: "/menu" },
        { label: "NUTRITION", href: "/legal/nutrition" },
    ];

    const rightLinks = [
        { label: "TERMS & CONDITIONS", href: "/legal/terms" },
        { label: "PRIVACY POLICY", href: "/legal/privacy" },
        { label: "FAQ'S", href: "/faq" },
        { label: "ENQUIRIES", href: "/contact" },
    ];

    return (
        <footer className="footer-bg py-16 md:py-20">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                    {/* Left Links */}
                    <nav className="space-y-3">
                        {leftLinks.map((link) => (
                            <a key={link.label} href={link.href} className="footer-link block">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Links */}
                    <nav className="space-y-3">
                        {rightLinks.map((link) => (
                            <a key={link.label} href={link.href} className="footer-link block">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Logo and Social */}
                    <div className="flex flex-col items-start lg:items-center gap-4">
                        <Image
                            src="/images/logo-footer.png"
                            alt="Chaii Bros"
                            width={120}
                            height={100}
                            className="w-28 h-auto object-contain opacity-90"
                        />
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(30_33%_85%)] hover:text-white transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(30_33%_85%)] hover:text-white transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[hsl(30_33%_85%)] hover:text-white transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-right">
                        <p className="text-[hsl(30_33%_85%)] font-display tracking-[0.1em] text-sm">
                            ALL RIGHTS<br />RESERVED
                        </p>
                        <p className="text-[hsl(30_33%_85%)] font-display tracking-[0.1em] text-sm mt-2">
                            2026 CHAII BROS
                        </p>
                        <div className="mt-4">
                            <Link href="/admin" className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white/60 transition-colors">
                                ADMIN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
