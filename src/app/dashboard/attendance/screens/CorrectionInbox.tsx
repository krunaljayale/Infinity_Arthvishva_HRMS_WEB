"use client";
import React, { useState } from "react";
import PendingTab from "./PendingTab";
import HistoryTab from "./HistoryTab";

export default function CorrectionInbox() {
    const [view, setView] = useState<'pending' | 'history'>('pending');

    return (
        <div className="flex flex-col h-full w-full">
            {/* Sub-Navigation Toggle */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-gray-100/80 dark:bg-gray-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setView('pending')}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${view === 'pending'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        Pending Inbox
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${view === 'history'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                    >
                        Resolved History
                    </button>
                </div>
            </div>

            {/* Render the selected child component */}
            {view === 'pending' ? <PendingTab /> : <HistoryTab />}
        </div>
    );
}