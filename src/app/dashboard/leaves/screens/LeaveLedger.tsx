"use client";
import React from "react";
import { useLeaveLedger } from "@/hooks/leave-hooks/useLeaveLedger";

export default function LeaveLedger() {
    const { data, loading, pagination, filters, modal } = useLeaveLedger();

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "--/--/----";
        return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
            case 'Cancelled': return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400';
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* 1. Filter Bar */}
            <div className="bg-white dark:bg-primary p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
                <div className="lg:col-span-2 relative">
                    <input
                        type="text"
                        placeholder="Search employee name or code..."
                        value={filters.searchQuery}
                        onChange={(e) => filters.setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-gray-50 dark:bg-white/5 text-primary dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary dark:text-gray-400">🔍</div>
                </div>

                <input type="date" value={filters.startDate} onChange={(e) => filters.setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors" />
                <input type="date" value={filters.endDate} onChange={(e) => filters.setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors" />

                <select value={filters.status} onChange={(e) => filters.setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors">
                    <option value="" className="dark:bg-primary">All Statuses</option>
                    <option value="Approved" className="dark:bg-primary">Approved</option>
                    <option value="Rejected" className="dark:bg-primary">Rejected</option>
                    <option value="Cancelled" className="dark:bg-primary">Cancelled</option>
                </select>

                <select value={filters.department} onChange={(e) => filters.setDepartment(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors">
                    <option value="" className="dark:bg-primary">All Departments</option>
                    <option value="IT" className="dark:bg-primary">IT</option>
                    <option value="HR" className="dark:bg-primary">HR</option>
                    <option value="Sales" className="dark:bg-primary">Sales</option>
                    <option value="Accountant" className="dark:bg-primary">Accountant</option>
                </select>
            </div>

            {/* 2. Data Table */}
            <div className="bg-white dark:bg-primary overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 mb-6 flex-1 shadow-sm transition-colors duration-300">
                <table className="w-full text-left text-sm text-secondary dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-white/5 text-secondary dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 transition-colors whitespace-nowrap">
                        <tr>
                            <th className="px-6 py-4 font-medium">Applied On</th>
                            <th className="px-6 py-4 font-medium">Employee</th>
                            <th className="px-6 py-4 font-medium">Leave Type & Dates</th>
                            <th className="px-6 py-4 font-medium">Overall Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-transparent transition-colors">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-secondary dark:text-gray-500">Loading ledger...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-secondary dark:text-gray-500">No records found for these filters.</td></tr>
                        ) : (
                            data.map((row) => (
                                <tr key={row.leaveId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary dark:text-white whitespace-nowrap">{formatDate(row.appliedOn)}</td>
                                    <td className="px-6 py-4 min-w-[200px]">
                                        <div className="font-medium text-primary dark:text-white">{row.employeeName}</div>
                                        <div className="text-xs text-secondary dark:text-gray-400">{row.employeeCode} • {row.department}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs whitespace-nowrap">
                                        <div className="font-semibold text-primary dark:text-white mb-0.5">{row.leaveCategory} <span className="text-secondary dark:text-gray-500 font-normal">({row.totalDays} Days)</span></div>
                                        <div>{formatDate(row.startDate)} <span className="text-secondary dark:text-gray-500 mx-1">to</span> {formatDate(row.endDate)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.overallStatus)}`}>
                                            {row.overallStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => modal.setSelectedRecord(row)} className="text-primary dark:text-white hover:text-primary/80 dark:hover:text-gray-300 font-medium text-sm transition-colors whitespace-nowrap">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 3. Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-secondary dark:text-gray-400 gap-4">
                <div>Showing {data.length} of {pagination.totalRecords} records</div>
                <div className="flex items-center gap-4">
                    <select value={pagination.limit} onChange={(e) => pagination.setLimit(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-primary text-primary dark:text-white focus:outline-none transition-colors">
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                    </select>

                    <div className="flex gap-2">
                        <button disabled={pagination.page === 1} onClick={() => pagination.setPage(p => p - 1)} className="px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-md disabled:opacity-50 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">Prev</button>
                        <span className="px-3 py-1 font-medium text-primary dark:text-white">{pagination.page} / {pagination.totalPages || 1}</span>
                        <button disabled={pagination.page === pagination.totalPages || pagination.totalPages === 0} onClick={() => pagination.setPage(p => p + 1)} className="px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-md disabled:opacity-50 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">Next</button>
                    </div>
                </div>
            </div>

            {/* 4. Details Modal */}
            {modal.selectedRecord && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-md">
                    <div className="bg-white dark:bg-primary rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-primary dark:text-white">Leave Application Details</h3>
                            <button onClick={() => modal.setSelectedRecord(null)} className="text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">✕</button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 border-dashed">
                                <div>
                                    <p className="font-semibold text-primary dark:text-white">{modal.selectedRecord.employeeName}</p>
                                    <p className="text-xs text-secondary dark:text-gray-400">{modal.selectedRecord.employeeCode} • {modal.selectedRecord.department}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full font-medium text-sm ${getStatusBadge(modal.selectedRecord.overallStatus)}`}>
                                        {modal.selectedRecord.overallStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <div>
                                        <p className="text-xs font-semibold text-secondary dark:text-gray-500 uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-primary dark:text-white font-medium">{modal.selectedRecord.leaveCategory}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-secondary dark:text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-primary dark:text-white font-medium">{modal.selectedRecord.totalDays} Days {modal.selectedRecord.isHalfDay && `(${modal.selectedRecord.halfDayPeriod})`}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-secondary dark:text-gray-500 uppercase tracking-wider mb-1">Reason</p>
                                    <p className="text-sm text-secondary dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                        {modal.selectedRecord.reason}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-gray-800 text-right transition-colors">
                            <button onClick={() => modal.setSelectedRecord(null)} className="px-4 py-2 bg-white dark:bg-primary border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}