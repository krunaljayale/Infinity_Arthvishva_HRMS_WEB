"use client";

import { dashboardService } from "@/services/dashboard.service";
import { useState, useEffect } from "react";

export interface DepartmentData {
    label: string;
    value: number;
    color: string;
    percentage: number;
}

export interface RawDepartmentStat {
    label: string;
    value: number;
}

// 1. Color Palette for Departments
const COLORS: Record<string, string> = {
    // Original Core
    director: "#1E3A8A",
    engineering: "#3B82F6",       // Blue
    sales: "#10B981",             // Emerald
    marketing: "#F59E0B",         // Amber
    hr: "#EF4444",                // Red
    design: "#8B5CF6",            // Violet
    finance: "#14B8A6",           // Teal
    operations: "#F97316",        // Orange
    it: "#06B6D4",                // Cyan
    accountant: "#6366F1",        // Indigo
    "area manager": "#EC4899",    // Pink
    driver: "#EAB308",            // Yellow
    helper: "#A8A29E",            // Warm Gray
    "office boy": "#78716C",      // Stone
    "wealth advisor": "#059669",  // Dark Emerald
    bdm: "#BE123C",               // Dark Rose
    unassigned: "#9CA3AF",        // Light Gray
    other: "#6B7280",             // Gray
};

export function useDepartmentStats() {
    const [chartData, setChartData] = useState<DepartmentData[]>([]);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                // Fetch REAL data from your NestJS backend
                const rawData: RawDepartmentStat[] = await dashboardService.getDepartmentStats();

                // Calculate total workforce
                const total = rawData.reduce((acc, item) => acc + item.value, 0);
                setTotalEmployees(total);

                // Process data for the Donut Chart (assign colors and percentages)
                const processedData = rawData.map((item) => {
                    const normalizedLabel = item.label.toLowerCase();

                    return {
                        label: item.label,
                        value: item.value,
                        color: COLORS[normalizedLabel] || COLORS.other,
                        percentage: total > 0 ? (item.value / total) * 100 : 0,
                    };
                });

                setChartData(processedData);
            } catch (error) {
                console.error("Failed to fetch department stats:", error);
                setChartData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { chartData, totalEmployees, loading };
}