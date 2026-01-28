import { db } from "./firebase";
import { doc, setDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

export const INITIAL_DATA = {
    siteSettings: {
        heroSection: {
            slides: [
                {
                    title: "BREWING MEMORIES FOR YOUR EVENT.",
                    subtitle: "The first mobile chai bar in the UK, bringing authentic, premium chai to your special occasions.",
                    imageUrl: "/images/hero/wedding.png",
                    cta1Text: "EXPLORE PACKAGES",
                    cta1Link: "/packages",
                    cta2Text: "GET IN TOUCH",
                    cta2Link: "/contact"
                },
                {
                    title: "THE PERFECT BLEND OF TRADITION & STYLE.",
                    subtitle: "Crafting unforgettable experiences with every cup.",
                    imageUrl: "/images/hero/chai.png",
                    cta1Text: "VIEW MENU",
                    cta1Link: "/menu",
                    cta2Text: "BOOK NOW",
                    cta2Link: "/contact"
                },
                {
                    title: "ELEVATE YOUR CELEBRATION WITH CHAI BROS.",
                    subtitle: "Five-star quality catering for events big and small.",
                    imageUrl: "/images/hero/pancakes.png",
                    cta1Text: "OUR STORY",
                    cta1Link: "/about",
                    cta2Text: "CONTACT US",
                    cta2Link: "/contact"
                }
            ]
        },
        contactInfo: {
            email: "CHAII@95BROTHERS.CO.UK",
            phone: "07496456969",
            socialLinks: {
                instagram: "https://instagram.com/chaiibros",
                linkedin: "https://linkedin.com",
                facebook: "https://facebook.com"
            }
        }
    },
    menuItems: [
        {
            name: "CHAII",
            slug: "chaii",
            description: "Our signature blend of premium tea and spices.",
            imageUrl: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1000",
            flavors: ["Original", "Cardamom", "Ginger"],
            order: 0
        },
        {
            name: "ICED COFFEE",
            slug: "iced-coffee",
            description: "Smooth, rich, and perfectly chilled. Our premium iced coffee is crafted with quality beans.",
            imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000",
            flavors: ["Caramel", "French Vanilla", "Pistachio", "Original"],
            order: 1
        },
        {
            name: "MATCHA",
            slug: "matcha",
            description: "Premium ceremonial grade matcha latte.",
            imageUrl: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1000",
            flavors: ["Original", "Vanilla", "Honey"],
            order: 2
        },
        {
            name: "MOCKTAILS",
            slug: "mocktails",
            description: "Refreshing alcohol-free blends for your celebration.",
            imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000",
            flavors: ["Mojito", "Pina Colada", "Strawberry Daiquiri"],
            order: 3
        },
        {
            name: "MINI DUTCH PANCAKES",
            slug: "pancakes",
            description: "Fluffy bite-sized delights with gourmet toppings.",
            imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=1000",
            flavors: ["Nutella", "Lotus Biscoff", "Maple Syrup"],
            order: 4
        },
        {
            name: "CHOCOLATE STRAWBERRIES",
            slug: "strawberries",
            description: "Fresh strawberries dipped in premium Belgian chocolate.",
            imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=1000",
            flavors: ["Milk Chocolate", "White Chocolate", "Dark Chocolate"],
            order: 5
        }
    ],
    packages: [
        {
            name: "CHAII TABLE",
            slug: "chaii-table",
            description: "Our elegant mobile chai station.",
            imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000",
            guestCount: "Upto 150 Guests",
            inclusions: ["Branded Cups", "Complimentary Biscuits", "Premium Service"],
            order: 0
        },
        {
            name: "FLORAL MINI BAR",
            slug: "floral-mini-bar",
            description: "A beautiful floral-themed tea and dessert bar.",
            imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000",
            guestCount: "Upto 150 Guests",
            inclusions: ["Branded Cups", "Complimentary Biscuits", "Matching Florals"],
            order: 1
        },
        {
            name: "THE CHAII BROS EXPERIENCE",
            slug: "full-experience",
            description: "The complete luxury mobile catering service.",
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
            guestCount: "Upto 150 Guests",
            inclusions: ["All signatures", "Full team", "Unlimited service"],
            order: 2
        }
    ],
    testimonials: [
        {
            quote: "Brilliant service and definitely will be booking again for future events. I booked Chai Bros for my wedding and ordered the Mocktails and pancakes. They were very thoughtful and ensured both immediate families had drinks and sweets during our busy day.",
            author: "SADIA P - GOOGLE",
            order: 0
        },
        {
            quote: "Brothers, Thank you so much for the amazing mocktails and hot tea during the recent event we had, those guys honestly delivered excellent service, we had drinks throughout the evening! Night and everyone loved it.",
            author: "ADNAN M - GOOGLE",
            order: 1
        },
        {
            quote: "I have had a lot of mocktails in my time, but the mix served by the chai bros are the best i've had! I had them for two functions for my wedding, they were extremely accommodating, professional and so friendly.",
            author: "OMAR D - GOOGLE",
            order: 2
        }
    ],
    aboutUs: {
        mainHeading: "THE FIRST MOBILE CHAI BAR IN THE UK",
        paragraph1: "Established in 2019 in Birmingham, Chai Bros began with two friends, Razi and Abid, sharing their love, travel and a vision to bring authentic, premium chai to the events industry as the UK's first mobile chai bar.",
        paragraph2: "Through meticulous testing in our kitchen, we perfected our signature chai recipe, blending traditional South Asian flavours with contemporary sophistication. Since our first booking in November 2019, that recipe remains untouched because quality truly comes before quantity.",
        paragraph3: "Today, Chai Bros is a trusted name in UK events and catering. We've expanded to include urban iced coffee, premium matcha, gourmet pancakes, and chocolate dipped strawberries, delivering five-star quality to every event big or small.",
        images: [
            "https://images.unsplash.com/photo-1544787210-2211d6e9dc67?q=80&w=1000",
            "https://images.unsplash.com/photo-1594631252845-29fc458639a8?q=80&w=1000",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000"
        ]
    },
    brandPartners: [
        { name: "Partner 1", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", order: 0 },
        { name: "Partner 2", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", order: 1 },
        { name: "Partner 3", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", order: 2 }
    ],
    gallery: [
        { imageUrl: "https://images.unsplash.com/photo-1544787210-2211d6e9dc67?q=80&w=1000", category: "event", order: 0 },
        { imageUrl: "https://images.unsplash.com/photo-1594631252845-29fc458639a8?q=80&w=1000", category: "event", order: 1 },
        { imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000", category: "event", order: 2 },
        { imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000", category: "event", order: 3 },
        { imageUrl: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=1000", category: "event", order: 4 },
        { imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000", category: "event", order: 5 },
        { imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000", category: "event", order: 6 },
        { imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=1000", category: "event", order: 7 }
    ]
};

export async function restoreDefaults() {
    // Clear and reset collections
    const collections = ["menuItems", "packages", "testimonials", "gallery", "brandPartners"];

    for (const col of collections) {
        const q = await getDocs(collection(db, col));
        for (const d of q.docs) {
            await deleteDoc(doc(db, col, d.id));
        }
    }

    // Set site settings
    await setDoc(doc(db, "siteSettings", "heroSection"), INITIAL_DATA.siteSettings.heroSection);
    await setDoc(doc(db, "siteSettings", "contactInfo"), INITIAL_DATA.siteSettings.contactInfo);
    await setDoc(doc(db, "siteSettings", "aboutUs"), INITIAL_DATA.aboutUs);
    await setDoc(doc(db, "siteSettings", "packages"), { list: INITIAL_DATA.packages });

    // Add back items
    for (const item of INITIAL_DATA.menuItems) {
        await addDoc(collection(db, "menuItems"), item);
    }
    for (const pkg of INITIAL_DATA.packages) {
        await addDoc(collection(db, "packages"), pkg);
    }
    for (const t of INITIAL_DATA.testimonials) {
        await addDoc(collection(db, "testimonials"), t);
    }
    for (const g of INITIAL_DATA.gallery) {
        await addDoc(collection(db, "gallery"), g);
    }
    for (const b of INITIAL_DATA.brandPartners) {
        await addDoc(collection(db, "brandPartners"), b);
    }

    return true;
}
