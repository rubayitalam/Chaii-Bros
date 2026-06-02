"use client";

import { usePathname } from "next/navigation";
import { Cormorant_Garamond, Dancing_Script, Jost } from "next/font/google";
import localFont from "next/font/local";
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

const brandFont = localFont({
  src: [
    {
      path: "../public/fonts/Brand.otf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-brand",
  display: "swap",
});

const amalfiFont = localFont({
  src: [
    {
      path: "../public/fonts/AmalfiCoast.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-amalfi",
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
        <html lang="en-GB">
            <body
                className={`${cormorant.variable} ${dancing.variable} ${jost.variable} ${brandFont.variable} ${amalfiFont.variable}`}
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
