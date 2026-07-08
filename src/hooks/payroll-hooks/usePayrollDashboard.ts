"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { payrollService, GetPayrollParams } from "@/services/payroll.service";

// ─── STATIC CYCLE DEFINITIONS ───
export const MONTH_CYCLES = [
    { value: 1, label: "Dec 21 - Jan 20 (Jan Cycle)" },
    { value: 2, label: "Jan 21 - Feb 20 (Feb Cycle)" },
    { value: 3, label: "Feb 21 - Mar 20 (Mar Cycle)" },
    { value: 4, label: "Mar 21 - Apr 20 (Apr Cycle)" },
    { value: 5, label: "Apr 21 - May 20 (May Cycle)" },
    { value: 6, label: "May 21 - Jun 20 (Jun Cycle)" },
    { value: 7, label: "Jun 21 - Jul 20 (Jul Cycle)" },
    { value: 8, label: "Jul 21 - Aug 20 (Aug Cycle)" },
    { value: 9, label: "Aug 21 - Sep 20 (Sep Cycle)" },
    { value: 10, label: "Sep 21 - Oct 20 (Oct Cycle)" },
    { value: 11, label: "Oct 21 - Nov 20 (Nov Cycle)" },
    { value: 12, label: "Nov 21 - Dec 20 (Dec Cycle)" }
];

// Generate last 5 years + next 1 year
export const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);
};

export function usePayrollDashboard(initialUserId: string) {
    // ─── INITIALIZE DEFAULT CYCLE TO "CURRENT ACTIVE" ───
    const initialCycle = useMemo(() => {
        const now = new Date();
        const d = now.getDate();
        const m = now.getMonth(); // 0-11
        let y = now.getFullYear();

        // If past the 20th, we are officially building next month's cycle
        let targetMonth = d > 20 ? m + 2 : m + 1;

        if (targetMonth > 12) {
            targetMonth = 1;
            y++;
        }
        return { targetMonth, targetYear: y };
    }, []);

    // ─── FILTER & PAGINATION STATES ───
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [selectedYear, setSelectedYear] = useState<number>(initialCycle.targetYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(initialCycle.targetMonth); // 1-12
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // ─── DATA ENGINE STATES ───
    const [payrolls, setPayrolls] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // ─── INTERACTION STATES ───
    const [selectedSlip, setSelectedSlip] = useState<any | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // ─── DEBOUNCE EFFECT ───
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // ─── DYNAMIC DATE CALCULATION ───
    const cycleData = useMemo(() => {
        // JS Date trick: Month - 2 automatically wraps to Nov/Dec of previous year if needed!
        const fromD = new Date(selectedYear, selectedMonth - 2, 21, 0, 0, 0);
        const toD = new Date(selectedYear, selectedMonth - 1, 20, 23, 59, 59);

        const formatYMD = (d: Date) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        return {
            startDate: formatYMD(fromD),
            endDate: formatYMD(toD),
            targetMonth: selectedMonth,
            targetYear: selectedYear
        };
    }, [selectedYear, selectedMonth]);

    // ─── CORE FETCHING LOGIC ───
    const fetchPayrolls = useCallback(async () => {
        // .trim() safely converts "   " into ""
        const trimmedSearch = debouncedSearch.trim();

        setIsLoading(true);
        try {
            const params: GetPayrollParams = {
                page,
                limit,
                status: status || undefined,
                startDate: cycleData.startDate,
                endDate: cycleData.endDate,
                // If trimmedSearch is "", it falls back to undefined and resets the list
                search: trimmedSearch || undefined,
            };

            const response = await payrollService.getPayrollList(params);
            setPayrolls(response.payrolls || []);
            setPagination(response.pagination || { total: 0, totalPages: 1 });

        } catch (error) {
            console.error("Failed to load payroll table records:", error);
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, status, cycleData.startDate, cycleData.endDate, debouncedSearch]);

    // Reset to page 1 only when filters (or the debounced search) actually change
    useEffect(() => {
        setPage(1);
    }, [status, selectedYear, selectedMonth, debouncedSearch]);

    useEffect(() => {
        fetchPayrolls();
    }, [fetchPayrolls]);

    // ─── BATCH ENGINE CALLS ───
    const handleProcessAll = async () => {
        const confirmRun = window.confirm(
            `Are you sure you want to run batch payroll for the ${cycleData.startDate} to ${cycleData.endDate} cycle?`
        );
        if (!confirmRun) return;

        setIsProcessing(true);
        try {
            const summary = await payrollService.processAllActive(
                cycleData.startDate,
                cycleData.endDate,
                cycleData.targetMonth,
                cycleData.targetYear,
                initialUserId
            );

            alert(`Batch completed! Successful: ${summary.successful}, Failed: ${summary.failed}`);
            fetchPayrolls();
        } catch (error: any) {
            alert(`Processing halted: ${error.message || "Unknown error occurred"}`);
        } finally {
            setIsProcessing(false);
        }
    };

    // ─── INTERACTION ACTIONS ───
    const openDrawer = (slip: any) => {
        setSelectedSlip(slip);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedSlip(null), 300);
    };

    return {
        payrolls,
        pagination,
        isLoading,
        isProcessing,

        // Expose raw search string so the UI input updates instantly without lag
        search,
        setSearch,

        status,
        setStatus,
        page,
        setPage,
        limit,
        setLimit,
        handleProcessAll,
        selectedSlip,
        isDrawerOpen,
        openDrawer,
        closeDrawer,

        // Exported state for the Split UI
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        yearOptions: getYearOptions(),
        monthOptions: MONTH_CYCLES
    };
}