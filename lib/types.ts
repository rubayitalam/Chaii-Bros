// TypeScript interfaces for Firestore data models

export interface HeroSlide {
    title: string;
    subtitle: string;
    imageUrl: string;
    cta1Text: string;
    cta1Link: string;
    cta2Text: string;
    cta2Link: string;
}

export interface HeroSection {
    slides: HeroSlide[];
}

export interface BrandPartner {
    id: string;
    name: string;
    logoUrl: string;
    order: number;
}

export interface MenuItem {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    category: string;
    flavors?: string[];
    price?: number;
    order: number;
    tags?: string[];
}

export interface CateringPackage {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    guests: string;
    features: string[];
}

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    rating?: number;
    order: number;
}

export interface GalleryImage {
    id: string;
    imageUrl: string;
    caption?: string;
    category: string;
    order: number;
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    eventType: string;
    message: string;
    timestamp: Date;
    status: "new" | "read" | "responded";
}

export interface ContactInfo {
    email: string;
    phone: string;
    address?: string;
    socialLinks: {
        instagram?: string;
        linkedin?: string;
        facebook?: string;
    };
}

export interface AboutContent {
    mainHeading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    images: string[]; // Array of 3 story images
}

export interface LegalContent {
    termsAndConditions: string;
    privacyPolicy: string;
    nutritionInfo: string;
}

export interface CategoryPage {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    filterTag: string;
    flavours?: string[]; // List of flavours to display on the page
}
