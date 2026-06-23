"use client";
import { useState, useEffect, useCallback } from "react";
import { leaveService } from "@/services/leaveService";

export interface HistoricalLeaveItem {
    leaveId: string;
    employeeName: string;
    employeeCode: string;
    department: string;
    avatar?: string;
    leaveCategory: string;
    startDate: string;
    endDate: string;
    totalDays: number;
    isHalfDay: boolean;
    halfDayPeriod?: string;
    overallStatus: string;
    reason: string;
    appliedOn: string;
    workflowSteps: any[];
}

// Helper to get default date range (Current Calendar Year)
const getDefaultDateRange = () => {
    const today = new Date();
    const year = today.getFullYear();

    const start = `${year}-01-01`; // January 1st of current year
    const end = `${year}-12-31`;   // December 31st of current year

    return { start, end };
};

export function useLeaveLedger() {
    const [data, setData] = useState<HistoricalLeaveItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const defaultDates = getDefaultDateRange();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [startDate, setStartDate] = useState(defaultDates.start);
    const [endDate, setEndDate] = useState(defaultDates.end);
    const [status, setStatus] = useState("");
    const [department, setDepartment] = useState("");

    const [selectedRecord, setSelectedRecord] = useState<HistoricalLeaveItem | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, startDate, endDate, status, department, limit]);

    const fetchLedger = useCallback(async () => {
        setLoading(true);
        try {
            const result = await leaveService.getHistoricalLeaves({
                page, limit, search: debouncedSearch, startDate, endDate, status, department
            });
            setData(result.data);
            setTotalPages(result.meta.totalPages);
            setTotalRecords(result.meta.totalRecords);
        } catch (error) {
            console.error("Failed to fetch leave ledger:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [page, limit, debouncedSearch, startDate, endDate, status, department]);

    useEffect(() => {
        fetchLedger();
    }, [fetchLedger]);

    return {
        data, loading,
        pagination: { page, setPage, limit, setLimit, totalPages, totalRecords },
        filters: { searchQuery, setSearchQuery, startDate, setStartDate, endDate, setEndDate, status, setStatus, department, setDepartment },
        modal: { selectedRecord, setSelectedRecord },
        refresh: fetchLedger
    };
}