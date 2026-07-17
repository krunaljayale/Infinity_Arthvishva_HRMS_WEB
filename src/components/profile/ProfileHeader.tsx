"use client";

import {
  ShieldCheck,
  User,
  Mail,
  Building2,
  Briefcase,
  Fingerprint,
  Activity
} from "lucide-react";

interface ProfileHeaderProps {
  idCode: string;
  isActive: boolean;
  employeeAccount?: {
    _id?: string;
    name?: string;
    employeeCode?: string;
    email?: string;
    department?: string;
    position?: string;
    status?: string;
  };
}

export default function ProfileHeader({ idCode, isActive, employeeAccount }: ProfileHeaderProps) {
  // Defensive destructuring with intelligent default fallbacks to satisfy the TS compiler
  const {
    name = "Loading Administrator...",
    employeeCode = "N/A",
    email = "N/A",
    department = "N/A",
    position = "Master HR Administrator",
    status = "Inactive",
    _id = "N/A"
  } = employeeAccount || {};

  // Generate initials for premium avatar fallback graphic block frame
  const initials = name && name !== "Loading Administrator..."
    ? name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "HR";

  return (
    <div className="w-full bg-white dark:bg-primary border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-none transition-all duration-300 space-y-8 relative overflow-hidden">

      {/* ─── TOP BLOCK: IDENTITY SUMMARY ─── */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">

        {/* Profile Avatar Frame with Active System Badge Indicator */}
        <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-green text-white font-bold text-3xl shadow-lg tracking-wider shrink-0 select-none">
          {initials}
          {isActive && (
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-4 border-white dark:border-primary w-6 h-6 rounded-full flex items-center justify-center" title="HR System Active Pointer">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Core Title Stack */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white font-sans">
              {name}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-brand-blue/10 text-brand-blue dark:text-blue-400 border border-brand-blue/20 shadow-sm">
              <ShieldCheck size={12} /> Master HR Admin
            </span>
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue dark:text-gray-400">
            {position}
          </p>
        </div>
      </div>

      {/* ─── BOTTOM BLOCK: METADATA DETAILS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">

        {/* Column Module: System HR Identifier */}
        <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 dark:bg-secondary/20 border border-gray-100 dark:border-gray-800/50">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-brand-green" /> Core System ID
          </span>
          <div className="font-mono font-bold text-brand-blue text-sm bg-white dark:bg-primary px-2.5 py-1 rounded border border-gray-200 dark:border-gray-800 w-fit">
            {idCode || "N/A"}
          </div>
        </div>

        {/* Column Module: Employee Code Reference */}
        <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 dark:bg-secondary/20 border border-gray-100 dark:border-gray-800/50">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <User size={14} className="text-gray-400" /> Employee Code
          </span>
          <div className="font-semibold text-gray-990 dark:text-white text-base pt-0.5 pl-0.5">
            {employeeCode}
          </div>
        </div>

        {/* Column Module: Registered Communication Email */}
        <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 dark:bg-secondary/20 border border-gray-100 dark:border-gray-800/50 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Mail size={14} className="text-gray-400" /> Email Parameter
          </span>
          <div className="font-medium text-gray-700 dark:text-gray-300 truncate pt-0.5 pl-0.5" title={email}>
            {email}
          </div>
        </div>

        {/* Column Module: Corporate Assigned Department */}
        <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 dark:bg-secondary/20 border border-gray-100 dark:border-gray-800/50">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Building2 size={14} className="text-gray-400" /> Operational Department
          </span>
          <div className="font-semibold text-gray-800 dark:text-gray-200 text-base pt-0.5 pl-0.5">
            {department}
          </div>
        </div>

        {/* Column Module: Account Employment Status */}
        <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 dark:bg-secondary/20 border border-gray-100 dark:border-gray-800/50">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Activity size={14} className="text-gray-400" /> Lifecycle Status
          </span>
          <div className="pt-0.5 pl-0.5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold border ${status?.toUpperCase() === "ACTIVE"
                ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
              }`}>
              <div className={`w-1 h-1 rounded-full ${status?.toUpperCase() === "ACTIVE" ? "bg-emerald-500" : "bg-gray-400"}`} />
              {status}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}