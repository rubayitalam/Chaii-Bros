"use client";

import { usePathname } from "next/navigation";
import { Cormorant_Garamond, Dancing_Script, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
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
                className={`${cormorant.variable} ${dancing.variable} ${jost.variable}`}
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
