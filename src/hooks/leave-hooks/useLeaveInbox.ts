"use client";
import { useState, useEffect, useCallback } from "react";
import { leaveService } from "@/services/leaveService";

// This is the shape we expect your NestJS controller to return after a $lookup
export interface PendingLeaveItem {
    leaveId: string;
    employeeName: string;
    employeeCode: string;
    department: string;
    avatar?: string;
    leaveCategory: string; // 'Paid', 'Casual', 'Sick', 'CompOff', etc.
    startDate: string;
    endDate: string;
    totalDays: number;
    isHalfDay: boolean;
    halfDayPeriod?: string;
    reason: string;
    appliedOn: string;
}

export function useLeaveInbox() {
    const [requests, setRequests] = useState<PendingLeaveItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Modal state for Rejections
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        try {
            const data = await leaveService.getPendingLeaves();
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch pending leaves:", error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleApprove = async (leaveId: string) => {
        const previousRequests = [...requests];
        // Optimistic UI update
        setRequests((prev) => prev.filter((req) => req.leaveId !== leaveId));
        
        try {
            await leaveService.approveLeave(leaveId);
            // Optional: Dispatch event to update a badge count elsewhere
            window.dispatchEvent(new Event('leaveProcessed'));
        } catch (error) {
            console.error("Failed to approve leave:", error);
            setRequests(previousRequests); // Rollback on failure
        }
    };

    const initiateReject = (leaveId: string) => {
        setSelectedLeaveId(leaveId);
        setRejectReason("");
        setRejectModalOpen(true);
    };

    const confirmReject = async () => {
        if (!selectedLeaveId) return;

        const leaveIdToReject = selectedLeaveId;
        const previousRequests = [...requests];
        
        // Optimistic UI update
        setRequests((prev) => prev.filter((req) => req.leaveId !== leaveIdToReject));
        setRejectModalOpen(false);

        try {
            await leaveService.rejectLeave(leaveIdToReject, rejectReason);
            window.dispatchEvent(new Event('leaveProcessed'));
        } catch (error) {
            console.error("Failed to reject leave:", error);
            setRequests(previousRequests); // Rollback on failure
        }
    };

    return {
        requests,
        loading,
        handleApprove,
        rejectContext: {
            isOpen: rejectModalOpen,
            close: () => setRejectModalOpen(false),
            initiate: initiateReject,
            confirm: confirmReject,
            reason: rejectReason,
            setReason: setRejectReason
        },
        refresh: fetchRequests,
    };
}