import { ArrowRightIcon } from "@/components/icons/Icons"
import Link from "next/link"

function HeroSection() {
    return (
        <div className="flex-1 flex flex-col items-center relative">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                </span>
                IA HRMS V3.0 is live
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center tracking-tight mb-6 max-w-5xl leading-[1.1]">
                People Operations <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green bg-300% animate-gradient">
                    Simplified.
                </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-secondary dark:text-gray-400 text-center max-w-2xl mb-10 leading-relaxed">
                Stop juggling spreadsheets. Manage employee directories, automate attendance tracking, streamline leave requests, and oversee your entire workforce from one unified dashboard.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
                <Link
                    href="/dashboard"
                    className="h-12 px-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-green  text-white dark:bg-white dark:text-black font-semibold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-xl shadow-primary/20 dark:shadow-white/5 w-full sm:w-auto"
                >
                    Launch Workspace <ArrowRightIcon className="w-4 h-4" />
                </Link>
                {/* <button className="h-12 px-8 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                    View Interactive Demo
                </button> */}
            </div>

            {/* Dashboard Mockup Graphic */}
            <div className="mt-20 relative w-full max-w-6xl mx-auto perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-blue opacity-20 blur-2xl rounded-[3rem] -z-10"></div>

                <div className="relative bg-white dark:bg-[#0F0F11] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] transform rotate-x-12 transition-transform duration-500 hover:rotate-x-0 group">

                    {/* Mockup Browser Bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gray-50 dark:bg-[#1A1A1E] border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="mx-auto w-1/3 h-6 bg-gray-200 dark:bg-white/5 rounded-md text-[10px] flex items-center justify-center text-gray-400 font-medium tracking-wide">
                            hrmsv3.infinityarthvishva.com
                        </div>
                    </div>

                    {/* Mockup Dashboard Wireframe */}
                    <div className="flex h-full pt-12">
                        {/* Sidebar Wireframe */}
                        <div className="w-16 md:w-64 border-r border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-[#1A1A1E]/50 hidden sm:flex flex-col p-4 gap-3">
                            <div className="h-8 w-3/4 bg-gray-200 dark:bg-white/5 rounded-md"></div>
                            <div className="h-8 w-full bg-primary/10 dark:bg-primary/20 rounded-md"></div>
                            <div className="h-8 w-5/6 bg-gray-200 dark:bg-white/5 rounded-md"></div>
                            <div className="h-8 w-4/5 bg-gray-200 dark:bg-white/5 rounded-md"></div>
                        </div>

                        {/* Main Content Wireframe */}
                        <div className="flex-1 p-6 md:p-8 overflow-hidden bg-white dark:bg-[#0F0F11]">
                            <div className="flex justify-between items-end mb-8">
                                <div className="space-y-2">
                                    <div className="h-8 w-48 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
                                    <div className="h-4 w-32 bg-gray-100 dark:bg-white/5 rounded-lg"></div>
                                </div>
                                <div className="h-10 w-32 bg-primary rounded-lg"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-32 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151518] p-4 flex flex-col justify-between"
                                    >
                                        <div className="flex justify-between">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
                                            <div className="h-4 w-12 bg-gray-200 dark:bg-white/5 rounded"></div>
                                        </div>
                                        <div className="h-8 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-64 w-full rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#151518]"></div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0a0a] pointer-events-none h-full w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection