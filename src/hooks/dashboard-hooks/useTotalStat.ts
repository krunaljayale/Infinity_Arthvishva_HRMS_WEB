"use client";

import { dashboardService } from "@/services/dashboard.service";
import { useState, useEffect } from "react";

export interface ChartData {
    label: string;
    value: number;
}

export type ViewMode = "monthly" | "yearly";

export function useTotalStat() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>("monthly");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const data = await dashboardService.getAverageAttendance(viewMode);
                setChartData(data);
            } catch (error) {
                console.error("Failed to fetch attendance stats: ", error);
                setChartData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [viewMode]);

    return { chartData, loading, viewMode, setViewMode };
}