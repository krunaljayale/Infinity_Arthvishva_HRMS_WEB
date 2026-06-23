"use client";
import React from "react";
import { usePendingCorrections } from "@/hooks/attendance-hooks/usePendingCorrections";
import CorrectionCard from "@/components/cards/Attendance/CorrectionCard";

export default function PendingTab() {
    const { requests, loading, handleApprove, handleReject } = usePendingCorrections();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p>Loading pending requests...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <div className="p-4 bg-green-50 text-green-500 rounded-full mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="font-medium text-lg text-gray-600 dark:text-gray-300">Inbox Zero!</p>
                <p className="text-sm mt-1">There are no pending regularization requests.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {requests.map((req) => (
                <CorrectionCard 
                    key={req.attendanceId} 
                    req={req} 
                    onApprove={handleApprove} 
                    onReject={handleReject} 
                    isHistory={false} 
                />
            ))}
        </div>
    );
}