"use client";
import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "@/services/attendanceService";

export interface PendingCorrectionItem {
    attendanceId: string;
    employeeName: string;
    employeeCode: string;
    department: string;
    avatar?: string;
    date: string;
    originalInTime?: string;
    originalOutTime?: string;
    originalStatus: string;
    requestedInTime?: string;
    requestedOutTime?: string;
    requestedStatus?: string;
    reason: string;
    proofUrl?: string;
    requestedOn: string;
    resolutionStatus?: string;
}

export function usePendingCorrections() {
    const [requests, setRequests] = useState<PendingCorrectionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRequests = useCallback(async () => {
        setLoading(true);
        try {
            const data = await attendanceService.getCorrections('Pending');
            setRequests(data);
        } catch (error) {
            console.error("Failed to fetch pending corrections:", error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRequests(); }, [fetchRequests]);

    const handleApprove = async (attendanceId: string) => {
        const previousRequests = [...requests];
        setRequests((prev) => prev.filter((req) => req.attendanceId !== attendanceId));

        try {
            await attendanceService.approveCorrection(attendanceId);

            window.dispatchEvent(new Event('correctionProcessed'));

        } catch (error) {
            console.error("Failed to approve correction:", error);
            setRequests(previousRequests);
        }
    };

    const handleReject = async (attendanceId: string) => {
        const previousRequests = [...requests];
        setRequests((prev) => prev.filter((req) => req.attendanceId !== attendanceId));

        try {
            await attendanceService.rejectCorrection(attendanceId);

            window.dispatchEvent(new Event('correctionProcessed'));

        } catch (error) {
            console.error("Failed to reject correction:", error);
            setRequests(previousRequests);
        }
    };

    return { requests, loading, handleApprove, handleReject, refresh: fetchRequests };
}