"use client";

import { Search, Eye, Download, ChevronRight } from "lucide-react";
import GradientButton from "@/components/buttons/GradientButton";
import PageTitleHeader from "@/components/elements/PageTitleHeader";
import { usePayrollDashboard } from "@/hooks/payroll-hooks/usePayrollDashboard";
import PayrollDrawer from "@/components/modals/PayrollDrawer";

interface PayrollDashboardProps {
    currentUserId: string;
}

export default function PayrollDashboard({ currentUserId }: PayrollDashboardProps) {
    // ─── CONSUME CUSTOM CORE HOOK ───
    const {
        payrolls,
        isLoading,
        isProcessing,
        search,
        setSearch,
        status,
        setStatus,
        handleProcessAll,
        selectedSlip,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        // Destructure pagination dependencies out of your hook engine matrix
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

    // ─── HELPER: Render dynamic, zero-filtered attendance pills ───
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
                <div className="bg-white dark:bg-primary p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">

                    {/* Search Input */}
                    <div className="lg:col-span-2 relative flex items-center h-full">
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

                    {/* The Year Selector */}
                    <div className="lg:col-span-1 h-full flex items-center">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer font-medium leading-5"
                        >
                            {yearOptions.map((y) => (
                                <option key={y} value={y} className="dark:bg-primary">{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* The Month Cycle Selector */}
                    <div className="lg:col-span-2 h-full flex items-center">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm bg-gray-50 dark:bg-white/5 text-primary dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green cursor-pointer font-medium leading-5"
                        >
                            {monthOptions.map((m) => (
                                <option key={m.value} value={m.value} className="dark:bg-primary">
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Batch Action Button */}
                    <div className="lg:col-span-1 flex lg:justify-end items-center h-full">
                        <GradientButton onClick={handleProcessAll} className="w-full lg:w-auto py-2 text-sm" disabled={isProcessing}>
                            {isProcessing ? "Processing..." : "Process all"}
                        </GradientButton>
                    </div>
                </div>

                {/* ─── DATA TABLE ─── */}
                <div className="bg-white dark:bg-primary border border-transparent dark:border-gray-800 shadow-sm rounded-b-xl overflow-x-auto transition-colors duration-300 mb-6">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-secondary border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold transition-colors duration-300">
                                <th className="p-4">Employee</th>
                                <th className="p-4">Payable Days</th>
                                <th className="p-4">Attendance Breakdown</th>
                                <th className="p-4">Leaves Taken</th>
                                <th className="p-4">Basic Salary</th>
                                <th className="p-4">Gross Salary</th>
                                <th className="p-4">Allowances</th>
                                <th className="p-4">Deductions</th>
                                <th className="p-4">Net Salary</th>
                                {/* <th className="p-4">Status</th> */}
                                {/* <th className="p-4 text-center">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-primary dark:text-white transition-colors duration-300">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="p-8 text-center text-sm text-gray-400">Loading payroll entries...</td>
                                </tr>
                            ) : payrolls.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="p-8 text-center text-sm text-gray-400">No records found matching filters.</td>
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
                                            {slip.leavesTaken}
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
                                        <td className="p-4 text-sm text-[#FF0069] font-medium">
                                            -₹{slip.deductions?.totalDeductions?.toLocaleString() || 0}
                                        </td>
                                        <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 text-base">
                                            ₹{slip.netSalary?.toLocaleString() || 0}
                                        </td>
                                        {/* <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold
                                                ${slip.status === "Paid" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : ""}
                                                ${slip.status === "Processed" ? "bg-[#573CFF]/10 text-[#573CFF]" : ""}
                                                ${slip.status === "Draft" ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" : ""}
                                            `}>
                                                {slip.status}
                                            </span>
                                        </td> */}
                                        {/* <td className="p-4 flex justify-center gap-3 text-gray-400 dark:text-gray-500">
                                            <button className="hover:text-[#573CFF] p-2 hover:bg-[#573CFF]/10 rounded transition-colors">
                                                <Download size={18} />
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ─── INTEGRATED PAGINATION MODULE ─── */}
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

            {/* ─── Side Drawer COMPONENT ─── */}
            <PayrollDrawer
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                slip={selectedSlip}
            />

        </div>
    );
}