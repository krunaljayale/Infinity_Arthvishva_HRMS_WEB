import Link from 'next/link'
import ThemeToggle from '../buttons/ThemeToggle'
import Image from 'next/image'
import GradientText from '../elements/GradientText'

function HomeNavbar() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-white/5 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 md:px-8 py-4 max-w-7xl mx-auto w-full">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-xl tracking-tight group"
                >
                    <div className="w-8 h-8 rounded-lg bg-dark dark:bg-primary text-white dark:text-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <Image src="/images/icon.png" alt="IA HRMS" width={32} height={32} />
                    </div>
                    <GradientText
                        from="var(--color-brand-blue)"
                        to="var(--color-brand-green)"
                        direction="to bottom right"
                        className="font-extrabold  uppercase tracking-widest"
                    >
                        HRMS
                    </GradientText>
                </Link>


                {/* <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary dark:text-gray-400">
                    <Link
                        href="#features"
                        className="hover:text-primary dark:hover:text-white transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="hover:text-primary dark:hover:text-white transition-colors"
                    >
                        How it Works
                    </Link>
                </nav> */}

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {/* <Link
                        href="/auth"
                        className="hidden sm:block text-sm font-medium text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        Sign In
                    </Link> */}
                    <Link
                        href="/dashboard"
                        className="px-5 py-2 rounded-full bg-primary text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 dark:shadow-white/10"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default HomeNavbar