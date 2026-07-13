// src/hooks/useAdminReimbursementInbox.ts

import { reimbursementService } from "@/services/reimbursementService";
import { useState, useEffect, useCallback } from "react";

export interface EmployeeInfo {
    name: string;
    code: string;
}

export interface ReimbursementInboxItem {
    _id: string;
    employee: EmployeeInfo;
    amount: number;
    reason: string;
    expenseDate: string;
    imageProofUrl?: string;
    hrStatus: "Pending";
    paymentStatus: "Unpaid";
    createdAt: string;
}

export const useAdminReimbursementInbox = () => {
    const [claims, setClaims] = useState<ReimbursementInboxItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [rejectingId, setRejectingId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    // Fetch pending claims from server
    const fetchPendingClaims = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reimbursementService.getPendingClaims();
            // Adjust assignment matching your API payload wrapper configuration (e.g., response.data)
            const records = response.data || response;
            setClaims(records);
        } catch (err: any) {
            console.error("Failed to load HR pending inbox items:", err);
            setError(err.response?.data?.message || "Failed to fetch pending claims inbox.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPendingClaims();
    }, [fetchPendingClaims]);

    // Handle transaction approval
    const handleApprove = async (id: string) => {
        try {
            await reimbursementService.approveClaim(id);
            setClaims((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error(`Approval failed for transaction ${id}:`, err);
            alert("Could not process approval execution. Please try again.");
        }
    };

    // Handle transaction rejection execution
    const handleRejectSubmit = async (id: string) => {
        if (!rejectionReason.trim()) return;
        try {
            await reimbursementService.rejectClaim(id, rejectionReason.trim());
            setClaims((prev) => prev.filter((item) => item._id !== id));
            setRejectingId(null);
            setRejectionReason("");
        } catch (err) {
            console.error(`Rejection failed for transaction ${id}:`, err);
            alert("Could not process rejection execution. Please try again.");
        }
    };

    const initiateReject = (id: string) => {
        setRejectingId(id);
    };

    const cancelReject = () => {
        setRejectingId(null);
        setRejectionReason("");
    };

    return {
        claims,
        isLoading,
        error,
        rejectingId,
        rejectionReason,
        setRejectionReason,
        handleApprove,
        handleRejectSubmit,
        initiateReject,
        cancelReject,
        refetch: fetchPendingClaims,
    };
};