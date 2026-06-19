"use client";

import { dashboardService } from "@/services/dashboard.service";
import { useState, useEffect } from "react";

export interface Employee {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  joinDate: string;
}

export function useRecentEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentEmployees = async () => {
            setLoading(true);
            try {
                // Fetch REAL data from your NestJS backend
                const data = await dashboardService.getRecentEmployees();
                setEmployees(data || []);
            } catch (error) {
                console.error("Failed to fetch recent employees:", error);
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentEmployees();
    }, []);

    return { employees, loading };
}