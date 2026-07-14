"use client";

import { X, Calendar, Receipt, IndianRupee, ExternalLink, CheckCircle2, FileText, Clock } from "lucide-react";
import { useEffect } from "react";

interface ReimbursementDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    reimbursements: any[];
}

export default function ReimbursementDrawer({ isOpen, onClose, reimbursements }: ReimbursementDrawerProps) {
    // Prevent background scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const totalReimbursed = reimbursements.reduce((sum, item) => sum + (item.amount || 0), 0);

    // Helper to format date and time cleanly
    const formatDateTime = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Helper for status badge styling
    const getStatusStyles = (status: string) => {
        const normalized = String(status || "").trim().toUpperCase();
        switch (normalized) {
            case "APPROVED":
            case "PAID":
                return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50";
            case "PENDING":
                return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50";
            case "REJECTED":
                return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50";
            default:
                return "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-white dark:bg-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-transparent dark:border-gray-800 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-secondary transition-colors duration-300">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reimbursement Details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Breakdown of approved expense lifecycle</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors shadow-sm bg-white dark:bg-primary border border-gray-100 dark:border-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white dark:bg-primary transition-colors duration-300">

                    {/* Summary Aggregate Card */}
                    <div className="bg-brand-blue/5 dark:bg-blue-900/10 border border-brand-blue/10 rounded-xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Cycle Payout</p>
                            <p className="text-2xl font-bold text-brand-blue dark:text-blue-400 flex items-center">
                                <IndianRupee size={20} className="mr-0.5" />
                                {totalReimbursed.toLocaleString()}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue dark:text-blue-400">
                            <Receipt size={22} />
                        </div>
                    </div>

                    {/* Detailed Itemized List */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Itemized Expense History ({reimbursements.length})
                        </h3>

                        {reimbursements.length === 0 ? (
                            <div className="text-center py-12 text-sm text-gray-400 dark:text-gray-500 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                                No reimbursement data tracked for this window.
                            </div>
                        ) : (
                            reimbursements.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-secondary/20 space-y-4 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                                >
                                    {/* Line Item Header Block */}
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reason / Description</span>
                                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                                                {item.reason || "Unspecified Claim"}
                                            </h4>
                                        </div>
                                        <div className="font-bold text-emerald-600 dark:text-emerald-400 text-lg flex items-center bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                                            <IndianRupee size={15} className="mr-0.5" />
                                            {item.amount?.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Status Indicator Sub-Row */}
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyles(item.hrStatus)}`}>
                                            <CheckCircle2 size={11} />
                                            HR: {item.hrStatus || "Pending"}
                                        </div>
                                    </div>

                                    {/* Lifecycle Audit Log Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-800/60 text-xs">
                                        <div className="space-y-1">
                                            <span className="text-gray-400 dark:text-gray-500 block">Expense Incurred</span>
                                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                                <Calendar size={13} className="mr-1.5 opacity-60" />
                                                {formatDateTime(item.expenseDate)}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-gray-400 dark:text-gray-500 block">Applied Date</span>
                                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                                <Clock size={13} className="mr-1.5 opacity-60" />
                                                {formatDateTime(item.createdAt)}
                                            </div>
                                        </div>
                                        <div className="space-y-1 sm:col-span-2">
                                            <span className="text-gray-400 dark:text-gray-500 block">System Processed / Approved On</span>
                                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                                <CheckCircle2 size={13} className="mr-1.5 opacity-60 text-emerald-500" />
                                                {formatDateTime(item.updatedAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Proof Attachment Link Block */}
                                    {item.imageProofUrl && (
                                        <div className="pt-2">
                                            <a
                                                href={item.imageProofUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-brand-blue dark:hover:text-blue-400 hover:border-brand-blue/30 dark:hover:border-blue-900/50 transition-all duration-150 group"
                                            >
                                                <FileText size={14} className="opacity-70 group-hover:text-brand-blue dark:group-hover:text-blue-400" />
                                                View Attachment Proof
                                                <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}