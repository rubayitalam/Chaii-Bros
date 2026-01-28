/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface PackageCardProps {
    name: string;
    image: any;
    features: string[];
}

const PackageCard = ({ name, image, features }: PackageCardProps) => {
    return (
        <div className="flex flex-col">
            {/* Image Card with Overlay */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg group">
                <img
                    src={image && (typeof image === 'string' ? image : image.src) || "https://images.unsplash.com/photo-1544787210-2211d44bca12?q=80&w=1000"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Package Name Overlay */}
                <div className="absolute top-6 left-6 pr-6">
                    <h3 className="font-display text-xl md:text-2xl text-white uppercase tracking-wide leading-tight">
                        {name.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h3>
                </div>
            </div>

            {/* Features List */}
            <div className="mt-4 space-y-1 text-center">
                {features.map((feature, index) => (
                    <p key={index} className="text-sm text-foreground font-display tracking-wide">
                        {feature}
                    </p>
                ))}
            </div>

            {/* Enquire Button */}
            <div className="mt-6 flex justify-center">
                <a
                    href="/book"
                    className="btn-outline text-xs tracking-[0.15em] px-8 py-2 block hover:bg-foreground hover:text-white transition-colors"
                >
                    ENQUIRE
                </a>
            </div>
        </div>
    );
};

export default PackageCard;
