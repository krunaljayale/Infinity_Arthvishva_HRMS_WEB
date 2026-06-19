"use client";

import { useState } from "react";
import { PieChart } from "lucide-react"; 
import { useDepartmentStats } from "@/hooks/dashboard-hooks/useDepartmentStats";

export default function DepartmentChart() {
  // 1. Consume business logic from hook
  const { chartData, totalEmployees, loading } = useDepartmentStats();

  // 2. Keep purely visual state inside component
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Donut Chart Math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const activeItem = hoveredIndex !== null ? chartData[hoveredIndex] : null;

  return (
    <div className="w-full bg-white dark:bg-primary p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center h-full relative overflow-hidden transition-colors duration-300">

      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 z-10 shrink-0">
        <h3 className="text-lg font-bold text-primary dark:text-white">
          Workforce by Department
        </h3>
      </div>

      {/* Triple Check Content Area */}
      {loading ? (
        // STATE 1: LOADING
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 animate-pulse pb-8">
          <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-800 border-t-blue-500 animate-spin"></div>
          <span className="text-xs text-gray-400">Loading departments...</span>
        </div>
      ) : chartData.length === 0 ? (
        // STATE 2: EMPTY (No Data)
        <div className="flex flex-col items-center justify-center h-full w-full py-8 text-center opacity-70 pb-12">
          <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-full mb-3 text-blue-500">
            <PieChart className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-primary dark:text-white">
            No Department Data
          </p>
          <p className="text-xs text-secondary dark:text-gray-400 mt-1 max-w-[180px]">
            Employee department allocations are currently unavailable.
          </p>
        </div>
      ) : (
        // STATE 3: DATA RENDER
        <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-8 z-10 overflow-y-auto no-scrollbar pb-2">

          {/* Legend / List Area */}
          <div className="w-full md:w-1/2 flex flex-col gap-3 order-2 md:order-1">
            {chartData.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && !isHovered;

              return (
                <div
                  key={item.label}
                  className={`
                    group flex items-center justify-between p-3 rounded-2xl cursor-pointer border transition-all duration-300
                    ${isHovered
                      ? "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 scale-[1.02] shadow-sm"
                      : "bg-transparent border-transparent"
                    }
                    ${isDimmed ? "opacity-40 blur-[0.5px]" : "opacity-100"}
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setHoveredIndex(isHovered ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full transition-all duration-300 shadow-sm shrink-0"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: isHovered
                          ? `0 0 10px ${item.color}`
                          : "none",
                      }}
                    ></span>
                    <span
                      className={`text-xs xl:text-sm font-medium transition-colors truncate ${isHovered
                          ? "text-primary dark:text-white font-bold"
                          : "text-secondary dark:text-gray-400"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className={`text-sm xl:text-lg font-bold transition-colors shrink-0 ${isHovered
                        ? "text-primary dark:text-white"
                        : "text-gray-400 dark:text-gray-600"
                      }`}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SVG Chart Area */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2 shrink-0">
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span
                className={`font-bold text-primary dark:text-white transition-all duration-300 ${activeItem ? "text-4xl scale-110" : "text-3xl"
                  }`}
              >
                {activeItem ? activeItem.value : totalEmployees}
              </span>
              <span className="text-[10px] md:text-xs text-secondary dark:text-gray-400 font-bold uppercase tracking-wider mt-1 max-w-[80px] leading-tight">
                {activeItem ? activeItem.label : "Total Staff"}
              </span>
            </div>

            <svg
              className="w-48 h-48 md:w-52 md:h-52 transform -rotate-90 overflow-visible"
              viewBox="0 0 200 200"
            >
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="currentColor"
                className="text-gray-100 dark:text-gray-800"
                strokeWidth="14"
              />

              {/* Data Segments */}
              {chartData.map((item, index) => {
                const strokeDashoffset =
                  circumference - (item.percentage / 100) * circumference;
                const rotation = currentOffset;
                currentOffset += (item.percentage / 100) * 360;

                const isHovered = hoveredIndex === index;
                const isDimmed = hoveredIndex !== null && !isHovered;

                return (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={isHovered ? 22 : 14}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className={`transition-all duration-500 ease-out cursor-pointer ${isDimmed ? "opacity-20" : "opacity-100"
                      }`}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform: `rotate(${rotation}deg) scale(${isHovered ? 1.05 : 1
                        })`,
                      filter: isHovered
                        ? `drop-shadow(0 0 6px ${item.color}80)`
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setHoveredIndex(isHovered ? null : index)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}