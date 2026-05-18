"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "HOME", href: "/" },
        { label: "ABOUT", href: "/about" },
        { label: "PACKAGES", href: "/packages" },
        { label: "MENU", href: "/menu" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-[999] px-6 md:px-12 lg:px-20 transition-[padding,background-color,box-shadow] duration-500",
                "h-auto min-h-[5rem] flex items-center pt-[env(safe-area-inset-top)]",
                // Mobile: Always py-5 to ensure safe space. Desktop: varied.
                isScrolled
                    ? "bg-[#F7F3EF]/95 backdrop-blur-md shadow-md py-5 md:py-4 border-b border-copper/10"
                    : "bg-transparent py-5 md:py-8 focus-within:bg-[#F7F3EF]"
            )}
        >
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/images/logo-header.png"
                        alt="Chaii Bros"
                        width={160}
                        height={48}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "nav-link",
                                pathname === link.href && "text-primary"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn-primary"
                    >
                        BOOK
                    </Link>
                </nav>

                <button
                    type="button"
                    aria-label="Toggle Menu"
                    className="md:hidden text-[#392318] h-12 w-12 flex items-center justify-center relative z-[1001] cursor-pointer active:scale-95 transition-transform"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[1000] h-[100dvh] w-screen bg-[#FDFBF9] flex flex-col items-center justify-start pt-32 pb-10 space-y-6 md:hidden animate-in fade-in slide-in-from-top-5 duration-300 overflow-y-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-2xl font-display tracking-widest text-[#392318] hover:text-[#C17A3A] transition-colors shrink-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="btn-primary w-2/3 text-center shrink-0"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            BOOK NOW
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
