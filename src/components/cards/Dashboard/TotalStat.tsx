"use client";

import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react"; // Imported for the empty state
import { useTotalStat } from "@/hooks/dashboard-hooks/useTotalStat";

export default function TotalStat() {
  // 1. Consume business logic from the hook
  const { chartData, loading, viewMode, setViewMode } = useTotalStat();

  // 2. Keep purely visual state inside the component
  const [activeLabel, setActiveLabel] = useState<string>("");

  // Auto-select the last item in the array whenever the data changes
  useEffect(() => {
    if (chartData.length > 0) {
      setActiveLabel(chartData[chartData.length - 1].label);
    }
  }, [chartData]);

  return (
    <div className="w-full bg-white dark:bg-primary p-4 md:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col transition-colors duration-300 h-full">

      {/* Header & Controls */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-primary dark:text-white">
            Average Attendance
          </h3>
          <p className="text-xs text-secondary dark:text-gray-400 mt-1">
            {viewMode === "monthly"
              ? "Attendance Rate by Month"
              : "Attendance Rate by Year"}
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full text-xs font-medium shrink-0">
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1.5 rounded-full transition-all ${viewMode === "monthly"
              ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
              : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode("yearly")}
            className={`px-3 py-1.5 rounded-full transition-all ${viewMode === "yearly"
              ? "bg-white dark:bg-primary text-primary dark:text-white shadow-sm"
              : "text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white"
              }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Triple Check Content Area */}
      {loading ? (
        // STATE 1: LOADING
        <div className="w-full h-72 flex flex-col items-center justify-center gap-2 text-secondary dark:text-gray-500 animate-pulse">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs">Loading stats...</span>
        </div>
      ) : chartData.length === 0 ? (
        // STATE 2: EMPTY (No Data)
        <div className="w-full h-72 flex flex-col items-center justify-center text-center opacity-70">
          <div className="bg-fuchsia-50 dark:bg-fuchsia-500/10 p-4 rounded-full mb-3 text-fuchsia-500">
            <BarChart3 className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-primary dark:text-white">
            No Attendance Data
          </p>
          <p className="text-xs text-secondary dark:text-gray-400 mt-1">
            Data for this period is currently unavailable.
          </p>
        </div>
      ) : (
        // STATE 3: DATA RENDER
        <div className="flex gap-2 md:gap-4 h-72 w-full">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-xs font-medium text-secondary dark:text-gray-500 py-6 pt-12 shrink-0">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart Area */}
          <div className="flex-1 overflow-x-auto pb-2 pt-10 no-scrollbar">
            <div className="flex items-end justify-around gap-3 h-full min-w-max md:min-w-0 pl-2 pr-2">
              {chartData.map((item) => {
                const isActive = activeLabel === item.label;
                const percentage = Math.min(item.value, 100);

                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 w-full min-w-[2.5rem] group relative cursor-pointer"
                    onMouseEnter={() => setActiveLabel(item.label)}
                    onClick={() => setActiveLabel(item.label)}
                  >
                    {/* Tooltip */}
                    <div
                      className={`absolute -top-10 left-1/2 -translate-x-1/2 transition-all duration-300 z-20 ${isActive
                        ? "opacity-100 -translate-y-1 scale-100"
                        : "opacity-0 translate-y-2 scale-90 pointer-events-none"
                        }`}
                    >
                      <div className="bg-primary dark:bg-white text-white dark:text-primary text-[10px] font-bold py-1.5 px-3 rounded-full shadow-xl whitespace-nowrap relative">
                        {percentage}%
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary dark:bg-white rotate-45"></div>
                      </div>
                    </div>

                    {/* Bar */}
                    <div className="relative w-full max-w-[2.5rem] h-48 flex items-end rounded-t-xl bg-transparent">
                      <div
                        className={`w-full rounded-t-md md:rounded-t-xl transition-all duration-300 ease-out ${isActive
                          ? "bg-gradient-to-t from-fuchsia-500 to-purple-600 shadow-lg shadow-fuchsia-500/40 dark:shadow-fuchsia-500/60 scale-[1.05]"
                          : "bg-purple-100 hover:bg-purple-200 dark:bg-white/5 dark:hover:bg-white/10"
                          }`}
                        style={{ height: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* X-Axis Label */}
                    <span
                      className={`text-[10px] md:text-xs font-medium text-center transition-colors whitespace-nowrap ${isActive
                        ? "text-primary dark:text-white font-bold"
                        : "text-secondary dark:text-gray-500"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}