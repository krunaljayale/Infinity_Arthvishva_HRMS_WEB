"use client";

import Image from "next/image";
import { Gift, CalendarX } from "lucide-react";
import { useUpcomingBirthdays } from "@/hooks/dashboard-hooks/useUpcomingBirthdays";

export default function UpcomingBirthdays() {
    // 1. Consume business logic from the hook
    const { birthdays, loading } = useUpcomingBirthdays();

    return (
        <div className="w-full bg-white dark:bg-primary p-5 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full transition-colors duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-lg font-bold text-primary dark:text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-fuchsia-500" />
                    Birthdays
                </h3>
                <span className="bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-bold px-2 py-1 rounded-md">
                    This Month
                </span>
            </div>

            {/* Content Area */}
            <div className="flex flex-col gap-3 flex-1 pr-1">
                {loading ? (
                    // 1. LOADING STATE (Skeleton)
                    Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3 animate-pulse"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                <div className="flex flex-col gap-1">
                                    <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    ))
                ) : birthdays.length === 0 ? (
                    // 2. EMPTY STATE
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center opacity-70">
                        <div className="bg-fuchsia-50 dark:bg-fuchsia-500/10 p-4 rounded-full mb-3 text-fuchsia-500">
                            <CalendarX className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-primary dark:text-white">
                            No Upcoming Birthdays
                        </p>
                        <p className="text-xs text-secondary dark:text-gray-400 mt-1">
                            There are no birthdays for the rest of this month.
                        </p>
                    </div>
                ) : (
                    // 3. DATA STATE
                    birthdays.map((person) => (
                        <div
                            key={person.id}
                            className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${person.isToday
                                ? "bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-500/10 dark:to-purple-500/10 border border-fuchsia-100 dark:border-fuchsia-500/20 shadow-sm"
                                : "hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm shrink-0">
                                    <Image
                                        src={
                                            person.avatar ||
                                            `https://ui-avatars.com/api/?name=${person.name}&background=random`
                                        }
                                        alt={person.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col min-w-0">
                                    <span
                                        className={`text-sm font-bold truncate ${person.isToday
                                            ? "text-fuchsia-600 dark:text-fuchsia-400"
                                            : "text-primary dark:text-white group-hover:text-brand-blue"
                                            }`}
                                    >
                                        {person.name}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-secondary dark:text-gray-400 font-medium truncate">
                                        {person.role}
                                    </span>
                                </div>
                            </div>

                            {/* Date / Action Button */}
                            <div className="flex items-end shrink-0 ml-2">
                                {person.isToday ? (
                                    <button className="text-[10px] font-bold text-white bg-fuchsia-500 hover:bg-fuchsia-600 px-3 py-1.5 rounded-full transition-colors shadow-sm shadow-fuchsia-500/30">
                                        Send Wishes
                                    </button>
                                ) : (
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md">
                                        {person.date}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}