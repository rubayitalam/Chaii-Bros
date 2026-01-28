import React from "react";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    centered = false,
    className = "",
}: SectionHeadingProps) {
    return (
        <div className={`${centered ? "text-center" : ""} ${className}`}>
            <h2 className="section-heading">{title}</h2>
            {subtitle && <p className="section-subheading">{subtitle}</p>}
        </div>
    );
}
