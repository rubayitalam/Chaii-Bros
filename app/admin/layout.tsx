"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import {
    FiHome, FiMenu, FiPackage, FiImage, FiMail,
    FiSettings, FiLogOut, FiX, FiActivity,
    FiStar, FiBookOpen, FiCoffee, FiSmile, FiExternalLink, FiTag
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
            }
        });

        // Close sidebar on route change
        setIsSidebarOpen(false);

        return () => unsubscribe();
    }, [router, pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/admin/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F3EF]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-copper border-t-transparent rounded-full animate-spin" />
                    <p className="font-serif text-brown tracking-widest text-sm uppercase">Securing Session...</p>
                </div>
            </div>
        );
    }

    if (!user && pathname !== "/admin/login") {
        return null;
    }

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const navItems = [
        { name: "Overview", href: "/admin", icon: FiActivity },
        { name: "Home Slides", href: "/admin/homepage", icon: FiStar },
        { name: "About Story", href: "/admin/about", icon: FiBookOpen },
        { name: "Menu Manager", href: "/admin/menu", icon: FiCoffee },
        { name: "Menu Categories", href: "/admin/menu-categories", icon: FiTag },
        { name: "Package Manager", href: "/admin/packages", icon: FiPackage },
        { name: "Gallery", href: "/admin/gallery", icon: FiImage },
        { name: "Testimonials", href: "/admin/testimonials", icon: FiSmile },
        { name: "Bookings", href: "/admin/enquiries", icon: FiMail },
        { name: "Settings", href: "/admin/settings", icon: FiSettings },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF9] text-brown font-sans selection:bg-copper/20">
            {/* Mobile Navigation Header */}
            <header className="lg:hidden h-16 bg-brown text-cream px-6 flex justify-between items-center sticky top-0 z-[60] border-b border-copper/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-copper rounded-lg flex items-center justify-center font-bold text-white shadow-lg">CB</div>
                    <h1 className="text-lg font-script tracking-wide">
                        <span className="text-copper">Admin</span> Hub
                    </h1>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-copper bg-white/5 rounded-full hover:bg-white/10 transition-all active:scale-95"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </header>

            <div className="flex relative">
                {/* Sidebar Overlay (Mobile) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-brown/40 backdrop-blur-sm z-[50] lg:hidden transition-all duration-300"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={cn(
                    "w-[280px] bg-brown text-cream h-screen fixed inset-y-0 left-0 z-[55] transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:sticky lg:translate-x-0 overflow-y-auto flex flex-col border-r border-copper/10 shadow-2xl lg:shadow-none",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}>
                    {/* Branding */}
                    <div className="p-8 pb-10">
                        <Link href="/admin" className="block group">
                            <span className="text-xs uppercase tracking-[0.3em] text-copper/60 mb-1 block font-bold transition-colors group-hover:text-copper">Premium Dashboard</span>
                            <h1 className="text-3xl font-script group-hover:scale-[1.02] transition-transform origin-left">
                                Chaii <span className="text-copper">Bros</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4 space-y-1">
                        <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-copper/40 font-bold mb-4">Management</p>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative",
                                        isActive
                                            ? "bg-copper/10 text-copper font-bold"
                                            : "hover:bg-white/5 text-cream/70 hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 w-1 h-6 bg-copper rounded-r-full shadow-[0_0_12px_rgba(210,105,30,0.8)]" />
                                    )}
                                    <item.icon size={18} className={cn("transition-colors", isActive ? "text-copper" : "group-hover:text-copper")} />
                                    <span className="text-sm tracking-wide">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Utils & Footer */}
                    <div className="p-6 mt-auto space-y-4">
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-xs text-cream/60 group"
                        >
                            <span>Live Website</span>
                            <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 w-full transition-all text-cream/50 group"
                        >
                            <FiLogOut size={18} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-medium">Log out</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Scroll Area */}
                <main className="flex-1 min-h-screen relative overflow-hidden flex flex-col">
                    {/* Header bar (Desktop) */}
                    <header className="hidden lg:flex h-20 items-center justify-between px-10 border-b border-copper/5 bg-white/50 backdrop-blur-md sticky top-0 z-40">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brown/40">
                            <span className="hover:text-copper transition-colors cursor-default">Admin</span>
                            <span>/</span>
                            <span className="text-brown font-bold tracking-normal normal-case text-base">
                                {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xs font-bold text-brown uppercase tracking-tighter">Authorized Admin</p>
                                <p className="text-[10px] text-copper tracking-widest uppercase">System Control</p>
                            </div>
                            <div className="w-10 h-10 bg-brown rounded-full border-2 border-copper/20 flex items-center justify-center text-copper font-script text-xl shadow-inner">
                                {user?.email?.[0].toUpperCase() || "A"}
                            </div>
                        </div>
                    </header>

                    {/* Content Container */}
                    <div className="flex-1 p-6 md:p-10 lg:p-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <div className="max-w-6xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
