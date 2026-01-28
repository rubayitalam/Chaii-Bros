import React from 'react';
import MenuItem from "./MenuItem";

interface MenuItemData {
    name: string;
    description?: string;
    tags?: string[];
    image?: any;
}

interface MenuCategoryProps {
    title: string;
    scriptTitle?: string;
    items: MenuItemData[];
}

const MenuCategory = ({ title, scriptTitle, items }: MenuCategoryProps) => {
    return (
        <div className="mb-12 md:mb-16">
            <div className="mb-6 md:mb-8">
                {scriptTitle && (
                    <span className="font-script text-primary text-2xl md:text-3xl block mb-1">
                        {scriptTitle}
                    </span>
                )}
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-wide text-foreground uppercase">
                    {title}
                </h3>
            </div>
            <div className="space-y-0">
                {items.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default MenuCategory;
