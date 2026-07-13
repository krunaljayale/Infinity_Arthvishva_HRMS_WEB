// src/hooks/useAdminReimbursementHistory.ts

import { useState, useEffect, useCallback } from "react";
import { reimbursementService } from "@/services/reimbursementService";

export interface EmployeeInfo {
    name: string;
    code: string;
}

export interface ReimbursementHistoryItem {
    _id: string;
    employee: EmployeeInfo;
    amount: number;
    reason: string;
    expenseDate: string;
    hrStatus: "Approved" | "Rejected";
    rejectionReason?: string;
    paymentStatus: "Unpaid" | "Paid";
    createdAt: string;
    imageProofUrl?: string;
}

export const useReimbursementHistory = () => {
    const [ledgerData, setLedgerData] = useState<ReimbursementHistoryItem[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<ReimbursementHistoryItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHistoryLedger = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reimbursementService.getHistoricalClaims();
            const records = response.data || response;
            setLedgerData(records);
        } catch (err: any) {
            console.error("Failed to load HR audit ledger historical items:", err);
            setError(err.response?.data?.message || "Failed to fetch historical claims ledger.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistoryLedger();
    }, [fetchHistoryLedger]);

    const viewDetails = (record: ReimbursementHistoryItem) => {
        setSelectedRecord(record);
    };

    const closeSummary = () => {
        setSelectedRecord(null);
    };

    return {
        ledgerData,
        selectedRecord,
        isLoading,
        error,
        viewDetails,
        closeSummary,
        refetch: fetchHistoryLedger,
    };
};