import React from "react";

interface GradientTextProps {
    children: React.ReactNode;
    from: string;
    to: string;
    direction?: "to right" | "to left" | "to top" | "to bottom" | "to bottom right" | "to top right";
    className?: string;
}

export default function GradientText({
    children,
    from,
    to,
    direction = "to right",
    className = "",
}: GradientTextProps) {
    return (
        <span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: `linear-gradient(${direction}, ${from}, ${to})`,
            }}
        >
            {children}
        </span>
    );
}