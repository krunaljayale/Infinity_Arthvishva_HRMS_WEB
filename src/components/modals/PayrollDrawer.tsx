"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, Calendar, Filter } from "lucide-react";

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
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50";
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
            case "HALFDAY":
            case "HALF":
                return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/50";
            case "AUTO":
            case "HOLIDAY":
                return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/50";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
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
    // This reconstructs the full timeline. If a date is missing from the backend array,
    // it automatically generates an "Absent" record for the UI.
    const completeBreakdown = useMemo(() => {
        if (!slip?.fromDate || !slip?.toDate) {
            return slip?.paidDaysBreakdown || [];
        }

        const backendDays = slip.paidDaysBreakdown || [];
        // Map existing days by date string for O(1) lookup
        const backendMap = new Map(backendDays.map((day: any) => [day.date, day]));

        const start = new Date(slip.fromDate);
        const end = new Date(slip.toDate);
        const fullTimeline = [];

        let current = new Date(start);

        while (current <= end) {
            // Safely format date to YYYY-MM-DD strictly matching the backend format
            const year = current.getFullYear();
            const month = String(current.getMonth() + 1).padStart(2, '0');
            const day = String(current.getDate()).padStart(2, '0');
            const dStr = `${year}-${month}-${day}`;

            if (backendMap.has(dStr)) {
                // If backend provided this day (Present, WeekOff, etc), use it
                fullTimeline.push(backendMap.get(dStr));
            } else {
                // If it's completely missing, inject it as Absent
                fullTimeline.push({
                    date: dStr,
                    type: "Absent",
                    value: 0
                });
            }
            // Increment by 1 day
            current.setDate(current.getDate() + 1);
        }

        return fullTimeline;
    }, [slip]);

    // Apply filtering against the newly completed timeline
    const filteredDays = completeBreakdown.filter((day: any) => {
        if (activeFilter === "All") return true;

        const type = String(day?.type || "").trim().toUpperCase();

        if (activeFilter === "P") return type === "P" || type === "PRESENT";
        if (activeFilter === "A") return type === "A" || type === "ABSENT" || type === "SANDWICHED";
        if (activeFilter === "WO") return type === "WO" || type === "WEEKOFF";
        if (activeFilter === "L") return type === "L" || type === "PAIDLEAVE" || type === "LEAVE";
        if (activeFilter === "CompOff") return type === "COMPOFF" || type === "HALFCOMPOFF";
        if (activeFilter === "Half") return type === "HALF" || type === "H";

        return type === activeFilter.toUpperCase();
    });

    return (
        <>
            {/* ─── SLIDE-OUT OVERLAY ─── */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
                onClick={onClose}
            />

            {/* ─── SLIDE-OUT PANEL ─── */}
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

                    {/* ─── FILTER CONTROLS ─── */}
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

                    {/* ─── FILTERED LIST ─── */}
                    <div className="flex flex-col gap-2">
                        {filteredDays.length > 0 ? (
                            filteredDays.map((day: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-secondary/30 hover:bg-white dark:hover:bg-white/5 transition-colors">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {new Date(day.date).toDateString()}
                                    </span>
                                    <span className={`px-3 py-1 rounded text-xs font-bold shadow-sm border ${getTypeStyles(day.type)}`}>
                                        {day.type} {day.value === 0.5 ? '(Half)' : ''}
                                    </span>
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