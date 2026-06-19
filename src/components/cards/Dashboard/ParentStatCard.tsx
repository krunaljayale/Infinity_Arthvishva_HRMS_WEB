"use client";

import { useDashboardStats } from "@/hooks/dashboard-hooks/useDashboardStats";
import StatCard from "./StatCard";

// 1. Helper function (Kept outside the component to avoid recreation on re-renders)
const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();

  if (t.includes("student") || t.includes("employee")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  } else if (t.includes("present")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    );
  } else if (t.includes("absent")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    );
  } else if (t.includes("leave")) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }

  return null;
};


export default function ParentStatCard() {
  // 2. Consume the custom hook
  const { stats, loading, error } = useDashboardStats();

  // 3. Render Loading State (4 skeleton cards to match the grid)
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 grid-rows-2 gap-4 w-full h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-primary rounded-3xl p-6 h-[140px] animate-pulse border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-between">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="mt-4 w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // 4. Render Error State (if API fails entirely)
  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-50 dark:bg-red-500/10 text-red-500 rounded-3xl border border-red-100 p-6 text-center text-sm font-medium">
        {error}
      </div>
    );
  }

  // 5. Render Data State
  return (
    <div className="grid md:grid-cols-2 grid-rows-2 gap-4 w-full h-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={getIconForTitle(stat.title)}
        />
      ))}
    </div>
  );
}