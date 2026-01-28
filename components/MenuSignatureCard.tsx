/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface MenuSignatureCardProps {
    name: string;
    image: any;
    showDiscover?: boolean;
}

const MenuSignatureCard = ({ name, image, showDiscover }: MenuSignatureCardProps) => {
    return (
        <div className="group relative flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
                <img
                    src={typeof image === 'string' ? image : image.src}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Optional Overlay or Discover Button logic could go here if showDiscover is true */}
                {showDiscover && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="btn-outline bg-white/10 text-white border-white backdrop-blur-sm text-xs px-4 py-2">
                            DISCOVER
                        </span>
                    </div>
                )}
            </div>
            <h3 className="font-display text-sm md:text-base tracking-widest text-foreground uppercase text-center">
                {name}
            </h3>
        </div>
    );
};

export default MenuSignatureCard;
