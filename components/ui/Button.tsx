import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    href,
    className = "",
    ...props
}: ButtonProps) {
    const baseClasses =
        variant === "primary"
            ? "btn-primary"
            : "btn-secondary";

    const combinedClasses = `${baseClasses} ${className} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    if (href) {
        return (
            <a href={href} className={combinedClasses}>
                {children}
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
