import { ChartIcon, ShieldIcon, CheckIcon, ZapIcon } from "@/components/icons/Icons";

function FeaturesSection() {
    return (
        <section id="features" className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Everything you need to manage your workforce
                </h2>
                <p className="text-secondary dark:text-gray-400 text-lg">
                    Powerful HR capabilities wrapped in a simple, intuitive corporate interface.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Analytics */}
                <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors group">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <ChartIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Workforce Analytics</h3>
                    <p className="text-secondary dark:text-gray-400 mb-6">
                        Get instant insights into employee productivity and attendance. Visual graphs
                        help you identify leave trends and department bottlenecks before they become issues.
                    </p>
                    <div className="h-48 w-full bg-white dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-white/10 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-500/10 to-transparent flex items-end justify-around px-4 pb-0">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <div
                                    key={i}
                                    style={{ height: `${h}%` }}
                                    className="w-8 bg-blue-500 rounded-t-md opacity-80"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 2: Security */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-magenta/50 transition-colors group">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <ShieldIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Enterprise Security</h3>
                    <p className="text-secondary dark:text-gray-400">
                        Bank-grade security for sensitive employee data. Strict role-based access
                        ensures only authorized HR and Directors see payroll and personal info.
                    </p>
                </div>

                {/* Card 3: Automation */}
                <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-green/50 transition-colors group">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
                        <CheckIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Automated Payroll</h3>
                    <p className="text-secondary dark:text-gray-400">
                        Calculate accurate payouts, generate monthly payslips, and process leave requests with a single click.
                    </p>
                </div>

                {/* Card 4: Speed & UX */}
                <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-yellow/50 transition-colors flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-6">
                            <ZapIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Frictionless Operations</h3>
                        <p className="text-secondary dark:text-gray-400">
                            Built on Next.js for maximum speed. No loading spinners, no lag. Finalize
                            attendance and run payroll for entire departments in seconds.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-lg transform rotate-3">
                        HR
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;