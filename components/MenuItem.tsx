/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface MenuItemProps {
    name: string;
    description?: string;
    tags?: string[];
    image?: any; // Accepting any type for image to support Next.js Image import or string
}

const MenuItem = ({ name, description, tags, image }: MenuItemProps) => {
    return (
        <div className="group flex gap-4 items-start py-4 border-b border-border/50 last:border-0">
            {image && (
                <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0">
                    <img
                        src={typeof image === 'string' ? image : image.src}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="flex-grow">
                <h4 className="font-display text-lg md:text-xl tracking-wide text-foreground uppercase">
                    {name}
                </h4>
                {description && (
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {description}
                    </p>
                )}
                {tags && tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs tracking-wider text-primary uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItem;
