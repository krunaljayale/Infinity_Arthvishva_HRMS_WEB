"use client";
import { useCorrectionHistory } from "@/hooks/attendance-hooks/useCorrectionHistory";
import CorrectionCard from "@/components/cards/Attendance/CorrectionCard";

export default function HistoryTab() {
    const { history, loading, searchQuery, setSearchQuery } = useCorrectionHistory();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                <p>Loading history...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full">

            {/* Action Bar: Search Input */}
            <div className="mb-6 flex">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by name, code, or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow dark:text-white"
                    />
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Empty State vs Data Grid */}
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                    <p className="font-medium text-lg text-gray-600 dark:text-gray-300">No History Found</p>
                    <p className="text-sm mt-1">
                        {searchQuery
                            ? `No resolved requests match "${searchQuery}"`
                            : "You haven't resolved any requests yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {history.map((req) => (
                        <CorrectionCard
                            key={req.attendanceId}
                            req={req}
                            isHistory={true}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}