"use client";

import { Search, Download, ChevronRight } from "lucide-react";
import GradientButton from "@/components/buttons/GradientButton";
import PageTitleHeader from "@/components/elements/PageTitleHeader";
import { usePayrollDashboard } from "@/hooks/payroll-hooks/usePayrollDashboard";
import PayrollDrawer from "@/components/modals/PayrollDrawer";
import ReimbursementDrawer from "@/components/modals/ReimbursementDrawer";

interface PayrollDashboardProps {
    currentUserId: string;
}

export default function PayrollDashboard({ currentUserId }: PayrollDashboardProps) {
    const {
        payrolls,
        isLoading,
        isProcessing,
        search,
        setSearch,
        handleProcessAll,
        isExporting,
        handleExportExcel,
        isDownloadingSlip,
        handleDownloadSlip,

        selectedSlip,
        isDrawerOpen,
        openDrawer,
        closeDrawer,

        selectedReimbursements,
        isReimbursementDrawerOpen,
        openReimbursementDrawer,
        closeReimbursementDrawer,

        page,
        setPage,
        limit,
        setLimit,
        pagination,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        yearOptions,
        monthOptions
    } = usePayrollDashboard(currentUserId);

    const renderAttendancePills = (slip: any) => {
        const pills = [];

        if (slip.presentDays > 0) pills.push({ label: `${slip.presentDays} P`, color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" });
        if (slip.weekOffs > 0) pills.push({ label: `${slip.weekOffs} WO`, color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" });
        if (slip.paidLeaves > 0) pills.push({ label: `${slip.paidLeaves} L`, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" });
        if (slip.holidays > 0) pills.push({ label: `${slip.holidays} Holiday`, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" });
        if (slip.compOffDays > 0) pills.push({ label: `${slip.compOffDays} CO`, color: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400" });
        if (slip.halfDays > 0) pills.push({ label: `${slip.halfDays} H`, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" });
        if (slip.absentDays > 0) pills.push({ label: `${slip.absentDays} A`, color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold" });

        return pills.map((p, i) => (
            <span key={i} className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${p.color}`}>
                {p.label}
            </span>
        ));
    };

    return (
        <div className="w-full mx-auto p-6 md:p-8 space-y-8 font-sans relative overflow-hidden">


            <PageTitleHeader
                title="Payroll Dashboard"
                description="Manage payroll, view reports, and handle employee payments efficiently."
            />

            <div className="flex-1 w-full bg-white dark:bg-primary rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none border border-gray-100 dark:border-gray-800 p-6 transition-colors duration-300">

                {/* ─── FILTERS CONTAINER ─── */}
                <div className="bg-white dark:bg-primary p-4 rounded-xl mb-6 flex flex-col lg:flex-row gap-4 items-center border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">

                    <div className="relative flex items-center h-full flex-1 w-full">
                        <div className="absolute left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name or code..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 text-primary dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors leading-5"
                        />
                    </div>

                    <div className="h-full flex items-center w-full lg:w-auto">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="w-full lg:w-auto px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer font-medium leading-5"
                        >
                            {yearOptions.map((y) => (
                                <option key={y} value={y} className="dark:bg-primary">{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="h-full flex items-center w-full lg:w-auto">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="w-full lg:w-auto min-w-[240px] px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer font-medium leading-5"
                        >
                            {monthOptions.map((m) => (
                                <option key={m.value} value={m.value} className="dark:bg-primary">
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end items-center gap-3 w-full lg:w-auto shrink-0">
                        <button
                            onClick={handleExportExcel}
                            disabled={isExporting}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap h-[40px] flex items-center justify-center"
                        >
                            {isExporting ? 'Exporting...' : 'Export to Excel'}
                        </button>
                        <GradientButton
                            onClick={handleProcessAll}
                            className="w-full lg:w-auto px-6 py-2 text-sm whitespace-nowrap h-[40px] flex items-center justify-center"
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Process all"}
                        </GradientButton>
                    </div>
                </div>

                {/* ─── DATA TABLE (with horizontal scrollbar tailwind classes) ─── */}
                <div className="bg-white dark:bg-primary border border-transparent dark:border-gray-800 shadow-sm rounded-b-xl overflow-x-auto transition-colors duration-300 mb-6 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gradient-to-r [&::-webkit-scrollbar-thumb]:from-brand-blue [&::-webkit-scrollbar-thumb]:to-brand-green [&::-webkit-scrollbar-thumb]:rounded-full">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-secondary border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold transition-colors duration-300">
                                <th className="p-4">Employee</th>
                                <th className="p-4">Payable Days</th>
                                <th className="p-4">Attendance Breakdown</th>
                                <th className="p-4">Unpaid Days</th>
                                <th className="p-4">Basic Salary</th>
                                <th className="p-4">Gross Salary</th>
                                <th className="p-4">Allowances</th>
                                <th className="p-4">Reimbursements</th>
                                <th className="p-4">Deductions</th>
                                <th className="p-4">Net Salary</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-primary dark:text-white transition-colors duration-300">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={11} className="p-8 text-center text-sm text-gray-400">Loading payroll entries...</td>
                                </tr>
                            ) : payrolls.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="p-8 text-center text-sm text-gray-400">No records found matching filters.</td>
                                </tr>
                            ) : (
                                payrolls.map((slip: any) => (
                                    <tr key={slip._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-900 dark:text-white">{slip.employeeName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{slip.employeeCode}</p>
                                        </td>
                                        <td className="p-4 text-sm font-semibold">
                                            {slip.paidDays} <span className="text-gray-400 font-normal">/ {slip.totalCycleDays}</span>
                                        </td>
                                        <td
                                            className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors rounded-lg group/cell"
                                            onClick={() => openDrawer(slip)}
                                        >
                                            <div className="flex flex-wrap gap-1 items-center max-w-[200px]">
                                                {renderAttendancePills(slip)}
                                                <ChevronRight size={14} className="text-gray-400 opacity-0 group-hover/cell:opacity-100 transition-opacity ml-1" />
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-bold text-gray-700 dark:text-gray-300">
                                            {slip.unpaidLeaves}
                                        </td>
                                        <td className="p-4 text-sm">
                                            ₹{slip.earnings?.basic?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 text-sm">
                                            ₹{slip.earnings?.totalGross?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 text-sm">
                                            ₹{slip.earnings?.allowances?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {slip.reimbursementsList?.length > 0 ? (
                                                <div
                                                    onClick={() => openReimbursementDrawer(slip.reimbursementsList)}
                                                    className="flex items-center gap-2 cursor-pointer group/reimb w-fit"
                                                >
                                                    <span className="font-semibold text-gray-900 dark:text-white border-b border-dashed border-gray-300 dark:border-gray-600 group-hover/reimb:border-blue-500 group-hover/reimb:text-blue-600 dark:group-hover/reimb:text-blue-400 transition-colors">
                                                        ₹{slip.earnings?.reimbursements?.toLocaleString() || 0}
                                                    </span>

                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 group-hover/reimb:bg-blue-50 dark:group-hover/reimb:bg-blue-900/20 group-hover/reimb:text-blue-600 dark:group-hover/reimb:text-blue-400 group-hover/reimb:border-blue-100 dark:group-hover/reimb:border-blue-900/30 transition-all">
                                                        {slip.reimbursementsList.length}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-500">₹0</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-[#FF0069] font-medium">
                                            -₹{slip.deductions?.totalDeductions?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                            ₹{slip.netSalary?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownloadSlip(slip._id, slip.employeeName, slip.employeeId._id);
                                                }}
                                                disabled={isDownloadingSlip === slip._id}
                                                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm font-medium text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-md transition-colors disabled:opacity-50"
                                            >
                                                {isDownloadingSlip === slip._id ? (
                                                    <span className="animate-spin">⏳</span>
                                                ) : (
                                                    <Download size={16} />
                                                )}
                                                {isDownloadingSlip === slip._id ? 'Downloading...' : 'PDF'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ─── PAGINATION ─── */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-4 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div>Showing {payrolls.length} of {pagination.total || 0} records</div>
                    <div className="flex items-center gap-4">
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="px-2 py-1 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-primary text-primary dark:text-white focus:outline-none cursor-pointer transition-colors"
                        >
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                disabled={page === 1 || isLoading}
                                onClick={() => setPage(p => p - 1)}
                                className="px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-md disabled:opacity-50 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                            >
                                Prev
                            </button>
                            <span className="px-3 py-1 font-medium text-primary dark:text-white">
                                {page} / {pagination.totalPages || 1}
                            </span>
                            <button
                                disabled={page === pagination.totalPages || pagination.totalPages === 0 || isLoading}
                                onClick={() => setPage(p => p + 1)}
                                className="px-3 py-1 border border-gray-200 dark:border-gray-800 rounded-md disabled:opacity-50 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <PayrollDrawer
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                slip={selectedSlip}
            />

            <ReimbursementDrawer
                isOpen={isReimbursementDrawerOpen}
                onClose={closeReimbursementDrawer}
                reimbursements={selectedReimbursements}
            />

        </div>
    );
}