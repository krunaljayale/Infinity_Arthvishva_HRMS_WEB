"use client";

import { dashboardService } from "@/services/dashboard.service";
import { useState, useEffect } from "react";

export interface Stats {
    title: string;
    value: string;
}

export function useDashboardStats() {
    const [stats, setStats] = useState<Stats[]>([
        { title: "Total Employees", value: "0" },
        { title: "Today Present", value: "0" },
        { title: "Today Absent", value: "0" },
        { title: "Today Leave", value: "0" },
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            setError(null);
            try {
                const data = await dashboardService.getDashboardStats();
                if (data && Array.isArray(data)) {
                    setStats(data);
                }
            } catch (err: any) {
                console.error("Hook fetch error: ", err);
                setError(err.message || "Failed to load statistics.");
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading, error };
}