import React from "react";

interface PageTitleHeaderProps {
  title: string;
  description?: string; // Optional, just in case some pages only need a title
}

export default function PageTitleHeader({ title, description }: PageTitleHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}