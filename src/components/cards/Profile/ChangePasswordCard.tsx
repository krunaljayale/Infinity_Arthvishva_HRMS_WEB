"use client";

import React from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { useChangePassword } from "@/hooks/profile-hooks/useChangePassword";

export default function ChangePasswordCard() {
    // Consume decoupled state operational hook layer
    const {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        showOld,
        setShowOld,
        showNew,
        setShowNew,
        showConfirm,
        setShowConfirm,
        error,
        success,
        isSubmitting,
        handleSubmit,
    } = useChangePassword();

    return (
        <div className="w-full bg-white dark:bg-primary border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock size={18} className="text-brand-blue" /> Authentication Security
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Update your system master control password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
                {/* Error Banner Container */}
                {error && (
                    <div className="flex items-start gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Banner Container */}
                {success && (
                    <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-medium">
                        <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Field: Current Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Current Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={showOld ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-10 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 text-primary dark:text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Field: New Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">New Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-10 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 text-primary dark:text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                            placeholder="Minimum 6 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Field: Confirm Password */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Confirm New Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-10 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 text-primary dark:text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                            placeholder="Re-enter new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Submit Trigger Actions */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-2.5 font-semibold text-sm rounded-xl text-white bg-gradient-to-r from-brand-blue to-brand-green disabled:opacity-50 transition-all shadow-md shadow-brand-blue/10 active:scale-[0.98]"
                    >
                        {isSubmitting ? "Updating Configuration..." : "Update Security Matrix"}
                    </button>
                </div>
            </form>
        </div>
    );
}