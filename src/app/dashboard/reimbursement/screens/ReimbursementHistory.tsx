// src/screens/ReimbursementHistory.tsx

"use client";

import { useReimbursementHistory } from "@/hooks/reimbursement-hooks/useReimbursementHistory";

export default function ReimbursementHistory() {
    const {
        ledgerData,
        selectedRecord,
        isLoading,
        error,
        viewDetails,
        closeSummary,
    } = useReimbursementHistory();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16 text-sm text-gray-400 dark:text-gray-500 font-medium">
                Loading historical ledger...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-16 text-sm text-red-500 font-medium">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            {ledgerData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        No historical processed records found.
                    </p>
                </div>
            ) : (
                <div className="w-full h-full overflow-x-auto animate-fadeIn">
                    <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                <th className="py-3.5 px-4">Employee</th>
                                <th className="py-3.5 px-4">Description</th>
                                <th className="py-3.5 px-4">Amount</th>
                                <th className="py-3.5 px-4 text-center">HR Verdict</th>
                                <th className="py-3.5 px-4 text-center">Disbursement</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/60 dark:divide-gray-800/60 font-medium">
                            {ledgerData.map((record) => {
                                const expDate = new Date(record.expenseDate).toLocaleDateString("en-IN", {
                                    day: "2-digit", month: "short", year: "numeric"
                                });

                                return (
                                    <tr key={record._id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-900 dark:text-gray-200">{record.employee.name}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{record.employee.code}</div>
                                        </td>

                                        <td className="py-4 px-4 max-w-xs">
                                            <div className="text-gray-700 dark:text-gray-300 line-clamp-1">{record.reason}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Expensed: {expDate}</div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap font-bold text-gray-900 dark:text-gray-100">
                                            ₹{record.amount.toLocaleString("en-IN")}
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${record.hrStatus === "Approved"
                                                    ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400"
                                                    : "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                                                    }`}
                                            >
                                                {record.hrStatus}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${record.paymentStatus === "Paid"
                                                    ? "bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400"
                                                    : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                                                    }`}
                                            >
                                                {record.paymentStatus === "Paid" ? "Disbursed" : "Unpaid"}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => viewDetails(record)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-blue hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors cursor-pointer"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- DETAIL MODAL SYSTEM --- */}
            {selectedRecord && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fadeIn"
                    onClick={closeSummary}
                >
                    <div
                        className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden animate-scaleUp max-h-[90vh] flex flex-col transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reimbursement Audit Summary</h3>
                            <button
                                onClick={closeSummary}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body Container */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-black/20 border border-gray-100/70 dark:border-gray-800/60 rounded-xl">
                                <div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">{selectedRecord.employee.name}</h4>
                                    <p className="text-xs font-mono text-gray-400 mt-0.5">{selectedRecord.employee.code}</p>
                                </div>
                                <div>
                                    <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                                        ₹{selectedRecord.amount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-gray-800/80 rounded-xl">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">HR Status</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedRecord.hrStatus === "Approved"
                                        ? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                                        }`}>
                                        {selectedRecord.hrStatus}
                                    </span>
                                </div>
                                <div className="p-3 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-gray-800/80 rounded-xl">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Payroll Disbursement</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${selectedRecord.paymentStatus === "Paid"
                                        ? "bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400"
                                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400"
                                        }`}>
                                        {selectedRecord.paymentStatus === "Paid" ? "Disbursed" : "Unpaid"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-b border-gray-100 dark:border-gray-800 py-4">
                                <div>
                                    <span className="text-xs font-medium text-gray-400 block mb-0.5">Expense Date</span>
                                    <strong className="text-gray-700 dark:text-gray-300">
                                        {new Date(selectedRecord.expenseDate).toLocaleDateString("en-IN", {
                                            day: "2-digit", month: "long", year: "numeric"
                                        })}
                                    </strong>
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-gray-400 block mb-0.5">Submission Date</span>
                                    <strong className="text-gray-700 dark:text-gray-300">
                                        {new Date(selectedRecord.createdAt).toLocaleDateString("en-IN", {
                                            day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                                        })}
                                    </strong>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Claim Description</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50/30 dark:bg-black/10 p-4 border border-gray-100 dark:border-gray-800/60 rounded-xl leading-relaxed whitespace-pre-wrap">
                                    {selectedRecord.reason}
                                </p>
                            </div>

                            {selectedRecord.hrStatus === "Rejected" && selectedRecord.rejectionReason && (
                                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/20 text-red-800 dark:text-red-400 rounded-xl">
                                    <span className="text-xs font-bold block mb-1">Rejection Reason Narrative</span>
                                    <p className="text-sm leading-relaxed">{selectedRecord.rejectionReason}</p>
                                </div>
                            )}

                            {selectedRecord.imageProofUrl && (
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Attached Receipt Proof</span>
                                    <div className="relative w-full h-44 bg-gray-100 dark:bg-black/30 border border-gray-200/50 dark:border-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
                                        <img
                                            src={selectedRecord.imageProofUrl}
                                            alt="Receipt Attachment"
                                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                        />
                                        <a
                                            href={selectedRecord.imageProofUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-3 right-3 px-3 py-1.5 text-xs font-bold bg-zinc-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-zinc-900 transition-colors shadow-sm"
                                        >
                                            Open Full Image ↗
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer Controls */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-black/10 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                            <button
                                onClick={closeSummary}
                                className="px-5 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Close Summary
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}