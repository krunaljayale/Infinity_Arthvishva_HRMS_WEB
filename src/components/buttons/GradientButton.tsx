

import React, { ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    /** First color (hex or CSS variable) */
    from?: string;
    /** Second color (hex or CSS variable) */
    to?: string;
    /** Gradient direction */
    direction?: "to right" | "to left" | "to top" | "to bottom" | "to bottom right" | "to top right";
    /** Any extra Tailwind utility classes */
    className?: string;
}

export default function GradientButton({
    children,
    from = "var(--color-brand-blue)", // Defaults to your adaptive brand colors
    to = "var(--color-brand-green)",
    direction = "to right",
    className = "",
    disabled = false,
    ...props
}: GradientButtonProps) {
    return (
        <button
            disabled={disabled}
            className={`relative overflow-hidden cursor-pointer rounded-xl px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 ${className}`}
            style={{
                backgroundImage: `linear-gradient(${direction}, ${from}, ${to})`,
            }}
            {...props}
        >
            {/* This absolute div creates a subtle darken/lighten effect on hover 
                without breaking the underlying dynamic gradient. */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10" />

            {/* The text needs to be relative with a z-index so it sits above the hover overlay */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}