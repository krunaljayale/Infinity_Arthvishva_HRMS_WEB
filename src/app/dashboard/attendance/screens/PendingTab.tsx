"use client";
import React, { useState } from "react";
import { usePendingCorrections } from "@/hooks/attendance-hooks/usePendingCorrections";
import CorrectionCard from "@/components/cards/Attendance/CorrectionCard";

export default function PendingTab() {
    const { requests, loading, handleApprove, handleReject } = usePendingCorrections();

    // --- Modal State ---
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [activeRejectId, setActiveRejectId] = useState<string | null>(null);
    const [rejectRemark, setRejectRemark] = useState("");

    // --- Modal Handlers ---
    const openRejectModal = (id: string) => {
        setActiveRejectId(id);
        setRejectRemark("");
        setIsRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setIsRejectModalOpen(false);
        setActiveRejectId(null);
        setRejectRemark("");
    };

    const confirmRejection = () => {
        if (activeRejectId && rejectRemark.trim()) {
            handleReject(activeRejectId, rejectRemark.trim());
            closeRejectModal();
        }
    };

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
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p className="font-medium text-lg text-gray-600 dark:text-gray-300">Inbox Zero!</p>
                <p className="text-sm mt-1">There are no pending regularization requests.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {requests.map((req) => (
                    <CorrectionCard 
                        key={req.attendanceId} 
                        req={req} 
                        onApprove={handleApprove} 
                        // Intercept the direct call and open the modal instead
                        onReject={openRejectModal} 
                        isHistory={false} 
                    />
                ))}
            </div>

            {/* --- Rejection Modal --- */}
            {isRejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Reject Request
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Please provide a reason for rejecting this correction request. This remark will be visible to the employee.
                        </p>
                        
                        <textarea
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                            rows={3}
                            placeholder="Enter rejection remark (required)..."
                            value={rejectRemark}
                            onChange={(e) => setRejectRemark(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={closeRejectModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRejection}
                                // Enforce the required remark rule
                                disabled={!rejectRemark.trim()} 
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}