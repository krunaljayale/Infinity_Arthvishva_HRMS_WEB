import { ZapIcon } from "@/components/icons/Icons";
import Link from "next/link";

function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 font-bold text-xl mb-4">
                        <ZapIcon className="w-5 h-5 text-primary dark:text-white" />
                        IA HRMS
                    </div>
                    <p className="text-secondary dark:text-gray-500 text-sm">
                        Making people operations effortless, streamlining workforce management for modern enterprises.
                    </p>
                </div>

                {/* <div>
                    <h4 className="font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
                        <li>
                            <Link href="#features" className="hover:text-primary dark:hover:text-white transition-colors">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#solutions" className="hover:text-primary dark:hover:text-white transition-colors">
                                Solutions
                            </Link>
                        </li>
                        <li>
                            <Link href="#pricing" className="hover:text-primary dark:hover:text-white transition-colors">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div> */}

                <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
                        <li>
                            <a href="https://www.infinityarthvishva.com/page/about" className="hover:text-primary dark:hover:text-white transition-colors">
                                About IA
                            </a>
                        </li>
                        <li>
                            <a href="https://www.infinityarthvishva.com/page/careers" className="hover:text-primary dark:hover:text-white transition-colors">
                                Careers
                            </a>
                        </li>
                        <li>
                            <a href="https://www.infinityarthvishva.com/#contact" className="hover:text-primary dark:hover:text-white transition-colors">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-secondary dark:text-gray-400">
                        <li>
                            <a href="https://www.infinityarthvishva.com/page/privacypolicy" className="hover:text-primary dark:hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="https://www.infinityarthvishva.com/page/termsconditions" className="hover:text-primary dark:hover:text-white transition-colors">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-secondary dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-white/5">
                <p>© {new Date().getFullYear()} Infinity Arthvishva. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a
                        href="https://www.linkedin.com/in/infinity-arthvishva-b4aa583aa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary dark:hover:text-white transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCo51iOv3JuNNfBubF-yx2sw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary dark:hover:text-white transition-colors"
                    >
                        YouTube
                    </a>
                    <a
                        href="https://www.instagram.com/infinity_arthvishva/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary dark:hover:text-white transition-colors"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;