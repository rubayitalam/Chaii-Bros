"use client";

import { usePathname } from "next/navigation";
import { Dancing_Script, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    variable: "--font-script",
    weight: ["400", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <html lang="en">
            <body
                className={`${dancingScript.variable} ${cormorantGaramond.variable} ${inter.variable} font-sans`}
            >
                {!isAdmin && <Navbar />}
                <main className="min-h-screen">
                    {children}
                </main>
                {!isAdmin && <Footer />}
            </body>
        </html>
    );
}
