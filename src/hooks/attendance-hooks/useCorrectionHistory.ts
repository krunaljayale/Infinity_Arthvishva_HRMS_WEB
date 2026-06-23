"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { attendanceService } from "@/services/attendanceService";
import { PendingCorrectionItem } from "./usePendingCorrections";

export function useCorrectionHistory() {
    // Keep the full raw data from the server hidden in this state
    const [allHistory, setAllHistory] = useState<PendingCorrectionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getCorrections('Resolved');
            setAllHistory(data);
        } catch (error) {
            console.error("Failed to fetch correction history:", error);
            setAllHistory([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchHistory(); }, [fetchHistory]);

    // ⚡ Frontend Filtering Magic
    // This runs instantly whenever the user types or the data loads
    const filteredHistory = useMemo(() => {
        if (!searchQuery.trim()) return allHistory;

        const lowerQuery = searchQuery.toLowerCase();
        return allHistory.filter((req) =>
            req.employeeName.toLowerCase().includes(lowerQuery) ||
            req.employeeCode.toLowerCase().includes(lowerQuery) ||
            (req.department && req.department.toLowerCase().includes(lowerQuery))
        );
    }, [allHistory, searchQuery]);

    return {
        history: filteredHistory, // The UI only gets the filtered list
        loading,
        searchQuery,
        setSearchQuery,
        refresh: fetchHistory
    };
}