"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
    X,
    Calendar,
    Filter,
    Bed,
    Circle,
    CheckCircle2,
    CloudSun,
    Plane
} from "lucide-react";

interface AttendanceDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    slip: any;
}

export default function PayrollDrawer({ isOpen, onClose, slip }: AttendanceDrawerProps) {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    useEffect(() => {
        if (isOpen) {
            setActiveFilter("All");
        }
    }, [isOpen, slip]);

    // Mapping enum values to standard UI colors
    const getTypeStyles = (type: string) => {
        const normalizedType = String(type || "").trim().toUpperCase();

        switch (normalizedType) {
            case "P":
            case "PRESENT":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50";
            case "A":
            case "ABSENT":
            case "SANDWICHED":
                return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700"; // Matched to screenshot (grey for absent)
            case "WO":
            case "WEEKOFF":
                return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
            case "L":
            case "PAIDLEAVE":
            case "LEAVE":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
            case "COMPOFF":
            case "HALFCOMPOFF":
                return "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800/50";
            case "H":
            case "HalfDay":
            case "HALF":
                return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
            case "AUTO":
            case "HOLIDAY":
                return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/50";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
        }
    };

    // Mapping enum values to icons like the screenshot
    const getTypeIcon = (type: string) => {
        const normalizedType = String(type || "").trim().toUpperCase();

        switch (normalizedType) {
            case "P":
            case "PRESENT":
                return <CheckCircle2 size={16} className="text-green-500 fill-green-100" />;
            case "A":
            case "ABSENT":
            case "SANDWICHED":
                return <Circle size={16} className="text-slate-600 fill-slate-500" />;
            case "WO":
            case "WEEKOFF":
                return <Bed size={16} className="text-slate-500" />;
            case "L":
            case "PAIDLEAVE":
            case "LEAVE":
                return <Plane size={16} className="text-blue-500 fill-blue-100" />;
            case "H":
            case "HALFDAY":
            case "HALF":
                return <CloudSun size={16} className="text-amber-600 fill-amber-100" />;
            default:
                return <Circle size={16} className="text-gray-400" />;
        }
    };

    const filters = [
        { label: "All", value: "All" },
        { label: "Present (P)", value: "P" },
        { label: "Absent (A)", value: "A" },
        { label: "Week Off (WO)", value: "WO" },
        { label: "Leave (L)", value: "L" },
        { label: "Comp Off", value: "CompOff" },
        { label: "Half Day", value: "Half" },
        { label: "Sandwich", value: "Sandwiched" },
    ];

    // ─── FRONTEND INJECTION LOGIC ───
    const completeBreakdown = useMemo(() => {
        if (!slip?.fromDate || !slip?.toDate) {
            return slip?.paidDaysBreakdown || [];
        }

        const backendDays = slip.paidDaysBreakdown || [];

        // Group entries by date to handle multiple records for a single day (e.g. HalfDay + PaidLeave)
        const backendMap = new Map();
        backendDays.forEach((day: any) => {
            if (!backendMap.has(day.date)) {
                backendMap.set(day.date, []);
            }
            backendMap.get(day.date).push(day);
        });

        const start = new Date(slip.fromDate);
        const end = new Date(slip.toDate);
        const fullTimeline = [];

        let current = new Date(start);

        while (current <= end) {
            const year = current.getFullYear();
            const month = String(current.getMonth() + 1).padStart(2, '0');
            const day = String(current.getDate()).padStart(2, '0');
            const dStr = `${year}-${month}-${day}`;

            if (backendMap.has(dStr)) {
                // Spread ALL events for this day into the timeline
                fullTimeline.push(...backendMap.get(dStr));
            } else {
                // If completely missing, inject as Absent
                fullTimeline.push({
                    date: dStr,
                    type: "Absent",
                    value: 0
                });
            }
            current.setDate(current.getDate() + 1);
        }

        return fullTimeline;
    }, [slip]);

    const filteredDays = completeBreakdown.filter((day: any) => {
        if (activeFilter === "All") return true;

        const type = String(day?.type || "").trim().toUpperCase();

        if (activeFilter === "P") return type === "P" || type === "PRESENT";
        if (activeFilter === "A") return type === "A" || type === "ABSENT" || type === "SANDWICHED";
        if (activeFilter === "WO") return type === "WO" || type === "WEEKOFF";
        if (activeFilter === "L") return type === "L" || type === "PAIDLEAVE" || type === "LEAVE";
        if (activeFilter === "CompOff") return type === "COMPOFF" || type === "HALFCOMPOFF";

        // Updated: Added "HALFDAY" to match the string in your data
        if (activeFilter === "Half") return type === "HALF" || type === "H" || type === "HALFDAY";

        return type === activeFilter.toUpperCase();
    });

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
                onClick={onClose}
            />

            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-transparent dark:border-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-secondary transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{slip?.employeeName}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                            <Calendar size={14} /> Month {slip?.month} / {slip?.year}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white dark:bg-primary border border-gray-100 dark:border-gray-800 rounded-full text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 transition-all shadow-sm">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-primary transition-colors duration-300">

                    {/* FILTER CONTROLS */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter size={16} className="text-gray-400" />
                            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-300 uppercase tracking-wider">Filter Log</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((f) => (
                                <button
                                    key={f.value}
                                    type="button"
                                    onClick={() => setActiveFilter(f.value)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${activeFilter === f.value
                                        ? "bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white"
                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-300 uppercase tracking-wider">
                            Daily Attendance Log
                        </h3>
                    </div>

                    {/* FILTERED LIST */}
                    <div className="flex flex-col gap-3">
                        {filteredDays.length > 0 ? (
                            filteredDays.map((day: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors px-2 -mx-2 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        {/* Icon Wrapper */}
                                        <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                                            {getTypeIcon(day.type)}
                                        </div>

                                        {/* Date Text Formatting (e.g. "26 Jun 2026") */}
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {new Date(day.date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getTypeStyles(day.type)}`}>
                                            {day.type}
                                        </span>
                                        <span className="text-sm font-bold w-8 text-right text-gray-900 dark:text-white">
                                            +{day.value}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-sm text-gray-400">
                                No records found for "{filters.find(f => f.value === activeFilter)?.label}"
                            </div>
                        )}
                    </div>
                    <div className="h-10"></div>
                </div>
            </div>
        </>
    );
}