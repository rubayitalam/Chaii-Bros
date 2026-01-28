import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Custom Chaii Bros aliases to maintain backward compatibility if needed, 
                // but matching the new palette
                cream: {
                    DEFAULT: "hsl(var(--chaii-cream))",
                    dark: "hsl(var(--chaii-cream-dark))",
                },
                brown: {
                    DEFAULT: "hsl(var(--chaii-brown))",
                    dark: "hsl(var(--chaii-brown-dark))",
                },
                copper: {
                    DEFAULT: "hsl(var(--chaii-copper))",
                    light: "hsl(var(--chaii-copper))", // using base copper as light specific wasn't defining in new root
                    dark: "hsl(28 65% 40%)", // slightly darker generated
                },
            },
            fontFamily: {
                script: ["var(--font-script)", "cursive"],
                serif: ["var(--font-serif)", "serif"],
                sans: ["var(--font-sans)", "sans-serif"],
                display: ["var(--font-serif)", "serif"], // Added 'display' mapping
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                card: "0px",
                "20": "20px",
            },
            boxShadow: {
                premium: "0 10px 20px -10px rgba(193, 122, 58, 0.5)",
                "premium-light": "0 10px 20px -10px rgba(193, 122, 58, 0.3)",
            },
            dropShadow: {
                premium: "0 2px 4px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
};

export default config;
