"use client";

import { useState } from "react";
import PageTitleHeader from "@/components/elements/PageTitleHeader";
import ReimbursementInbox from "./screens/ReimbursementInbox";
import ReimbursementHistory from "./screens/ReimbursementHistory";

type TabID = "inbox" | "history";

export default function ReimbursementPage() {
    const [activeTab, setActiveTab] = useState<TabID>("inbox");

    const TABS = [
        { id: "inbox", label: "Reimbursement Inbox" },
        { id: "history", label: "Claim History" },
    ];

    return (
        <div className="flex flex-col w-full h-full p-6 md:p-8">
            {/* 1. Page Header */}
            <PageTitleHeader
                title="Reimbursement Management"
                description="Review incoming employee expense claims, upload approvals, and track payroll disbursements."
            />

            {/* 2. Premium Tab Navigation */}
            <div className="mb-6">
                <div className="inline-flex items-center p-1.5 bg-gray-100/80 dark:bg-white/5 rounded-xl gap-1">
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabID)}
                                className={`
                  relative flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out
                  ${isActive
                                        ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
                                        : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white dark:hover:bg-white/5"
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 3. Conditional Rendering Viewport */}
            <div className="flex-1 w-full bg-white dark:bg-primary rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-800 p-6 transition-colors duration-300">
                {activeTab === "inbox" && <ReimbursementInbox />}
                {activeTab === "history" && <ReimbursementHistory />}
            </div>
        </div>
    );
}