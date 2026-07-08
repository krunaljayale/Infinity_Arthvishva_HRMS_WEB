"use client";

import React, { useState } from "react";
import {
  Download,
  Eye,
  FilePlay,
  X,
  Calendar,
  ChevronRight,
} from "lucide-react";

// ─── FULL MOCK DATA (Aligned perfectly with your Mongoose Schema) ───
const MOCK_PAYROLLS = [
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1",
    employeeCode: "IA10001",
    employeeName: "Rahul Sharma",
    month: 5,
    year: 2026,
    totalCycleDays: 31,
    presentDays: 19,
    halfDays: 0,
    absentDays: 1,
    paidLeaves: 2,
    holidays: 1,
    weekOffs: 8,
    compOffDays: 0,
    leavesTaken: 3,
    paidDays: 30,
    paidDaysBreakdown: [
      { date: "2026-05-01", type: "Present", value: 1 },
      { date: "2026-05-02", type: "WeekOff", value: 1 },
      { date: "2026-05-03", type: "WeekOff", value: 1 },
      { date: "2026-05-04", type: "Absent", value: 0 },
      { date: "2026-05-05", type: "PaidLeave", value: 1 },
      { date: "2026-05-06", type: "Present", value: 1 },
    ],
    earnings: { basic: 25000, allowances: 20000, totalGross: 43548.39 },
    deductions: {
      professionalTax: 200,
      taxDeductedAtSource: 0,
      other: 0,
      totalDeductions: 200,
    },
    netSalary: 43348.39,
    status: "Paid",
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b9c0d2",
    employeeCode: "IA10045",
    employeeName: "Priya Desai",
    month: 5,
    year: 2026,
    totalCycleDays: 31,
    presentDays: 23,
    halfDays: 0,
    absentDays: 0,
    paidLeaves: 0,
    holidays: 1,
    weekOffs: 7,
    compOffDays: 0,
    leavesTaken: 0,
    paidDays: 31,
    paidDaysBreakdown: [
      { date: "2026-05-01", type: "Present", value: 1 },
      { date: "2026-05-02", type: "Present", value: 1 },
    ],
    earnings: { basic: 40000, allowances: 15000, totalGross: 55000.0 },
    deductions: {
      professionalTax: 200,
      taxDeductedAtSource: 0,
      other: 0,
      totalDeductions: 200,
    },
    netSalary: 54800.0,
    status: "Processed",
  },
];

export default function PayrollDashboard() {
  const [filters, setFilters] = useState({
    month: 5,
    year: 2026,
    status: "",
    search: "",
  });

  // State for the Slide-Out Drawer
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const payrolls = MOCK_PAYROLLS;

  const openDrawer = (slip:any) => {
    setSelectedSlip(slip);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedSlip(null), 300); // Wait for transition
  };

  // ─── HELPER: Render dynamic, zero-filtered attendance pills ───
  const renderAttendancePills = (slip) => {
    const pills = [];
    // Neutral / Positive (Gray, Green, Blue)
    if (slip.presentDays > 0)
      pills.push({
        label: `${slip.presentDays}P`,
        color: "bg-green-100 text-green-700",
      });
    if (slip.weekOffs > 0)
      pills.push({
        label: `${slip.weekOffs}WO`,
        color: "bg-gray-100 text-gray-600",
      });
    if (slip.paidLeaves > 0)
      pills.push({
        label: `${slip.paidLeaves}PL`,
        color: "bg-blue-100 text-blue-700",
      });
    if (slip.holidays > 0)
      pills.push({
        label: `${slip.holidays}HL`,
        color: "bg-purple-100 text-purple-700",
      });
    if (slip.compOffDays > 0)
      pills.push({
        label: `${slip.compOffDays}CO`,
        color: "bg-teal-100 text-teal-700",
      });

    // Deductions / Warnings (Orange, Red)
    if (slip.halfDays > 0)
      pills.push({
        label: `${slip.halfDays}H`,
        color: "bg-orange-100 text-orange-700",
      });
    if (slip.absentDays > 0)
      pills.push({
        label: `${slip.absentDays}A`,
        color: "bg-red-100 text-red-700 font-bold",
      });

    return pills.map((p, i) => (
      <span
        key={i}
        className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${p.color}`}
      >
        {p.label}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 relative overflow-hidden">
      {/* ─── HEADER & ACTIONS ─── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Engine</h1>
          <p className="text-gray-500 mt-1">
            Manage accurate salary processing for active employees.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#573CFF] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all">
          <FilePlay size={18} />
          Process All Active
        </button>
      </div>

      {/* ─── FILTERS AREA (Clean & Inline) ─── */}
      <div className="bg-white p-4 rounded-t-xl border-b border-gray-200 flex flex-wrap gap-4 items-center shadow-sm">
        <input
          type="text"
          placeholder="Search by name or code..."
          className="px-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#573CFF] text-sm"
        />
        <select className="px-4 py-2 border rounded-md bg-white text-sm">
          <option value="5">May 2026</option>
          <option value="6">June 2026</option>
        </select>
        <select className="px-4 py-2 border rounded-md bg-white text-sm">
          <option value="">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Processed">Processed</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      {/* ─── DATA TABLE ─── */}
      <div className="bg-white shadow-sm rounded-b-xl overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <th className="p-4">Employee</th>
              <th className="p-4">Payable Days</th>
              <th className="p-4">Attendance Breakdown</th>
              <th className="p-4">Leaves Taken</th>
              <th className="p-4">Basic Salary</th>
              <th className="p-4">Gross Salary</th>
              <th className="p-4">Deductions</th>
              <th className="p-4">Net Salary</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payrolls.map((slip) => (
              <tr
                key={slip._id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="p-4">
                  <p className="font-bold text-gray-900">{slip.employeeName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {slip.employeeCode}
                  </p>
                </td>

                <td className="p-4 text-sm font-semibold text-gray-700">
                  {slip.paidDays}{" "}
                  <span className="text-gray-400 font-normal">
                    / {slip.totalCycleDays}
                  </span>
                </td>

                {/* INTERACTIVE ATTENDANCE CELL */}
                <td
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors rounded-lg group/cell relative"
                  onClick={() => openDrawer(slip)}
                  title="Click to view 31-day breakdown"
                >
                  <div className="flex flex-wrap gap-1 items-center max-w-50">
                    {renderAttendancePills(slip)}
                    <ChevronRight
                      size={14}
                      className="text-gray-400 opacity-0 group-hover/cell:opacity-100 transition-opacity ml-1"
                    />
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`text-sm font-bold ${slip.leavesTaken > 0 ? "text-orange-500" : "text-gray-400"}`}
                  >
                    {slip.leavesTaken}
                  </span>
                </td>

                <td className="p-4 text-sm text-gray-600">
                  ₹{slip.earnings.basic.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  ₹{slip.earnings.totalGross.toLocaleString()}
                </td>
                <td className="p-4 text-sm text-[#FF0069] font-medium">
                  -₹{slip.deductions.totalDeductions.toLocaleString()}
                </td>
                <td className="p-4 font-bold text-emerald-600 text-base">
                  ₹{slip.netSalary.toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                    ${slip.status === "Paid" ? "bg-emerald-100 text-emerald-700" : ""}
                    ${slip.status === "Processed" ? "bg-[#573CFF]/10 text-[#573CFF]" : ""}
                    ${slip.status === "Draft" ? "bg-gray-100 text-gray-600" : ""}
                  `}
                  >
                    {slip.status}
                  </span>
                </td>

                <td className="p-4 flex justify-center gap-3 text-gray-400">
                  <button
                    onClick={() => openDrawer(slip)}
                    className="hover:text-[#573CFF] p-2 hover:bg-[#573CFF]/10 rounded transition-colors"
                    title="View Breakdown"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="hover:text-[#573CFF] p-2 hover:bg-[#573CFF]/10 rounded transition-colors"
                    title="Download Slip"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── SLIDE-OUT DRAWER (The Calendar Breakdown) ─── */}
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedSlip?.employeeName}
            </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <Calendar size={14} /> Month {selectedSlip?.month} /{" "}
              {selectedSlip?.year}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-200 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 border-b pb-2">
            Daily Attendance Log
          </h3>

          <div className="flex flex-col gap-2">
            {selectedSlip?.paidDaysBreakdown?.map((day, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white transition-colors"
              >
                <span className="text-sm font-medium text-gray-600">
                  {new Date(day.date).toDateString()}
                </span>

                <span
                  className={`px-3 py-1 rounded text-xs font-bold shadow-sm
                  ${day.type === "Present" ? "bg-green-100 text-green-700 border border-green-200" : ""}
                  ${day.type === "Absent" || day.type === "Sandwiched" ? "bg-red-100 text-red-700 border border-red-200" : ""}
                  ${day.type === "WeekOff" ? "bg-gray-100 text-gray-600 border border-gray-200" : ""}
                  ${day.type === "PaidLeave" ? "bg-blue-100 text-blue-700 border border-blue-200" : ""}
                `}
                >
                  {day.type} {day.value === 0.5 ? "(Half)" : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Spacer so bottom items aren't cut off */}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
