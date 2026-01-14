'use client'

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LOGO SECTION */}
                <Link href="/" className="group flex items-center gap-2 font-black text-xl tracking-tighter transition-transform active:scale-95">
                    <div className="relative flex items-center justify-center size-8 bg-[var(--accent)] rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <span className="text-[var(--bg)] transform -rotate-3 group-hover:rotate-0 transition-transform">L</span>
                    </div>
                    <span className="text-[var(--text)] tracking-tight">DM</span>

                    {/* Heart Beat Indicator */}
                    <div className="ml-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--text)]/5 border border-[var(--border)]">
                        <span className="relative flex size-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-1.5 rounded-full bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-[var(--text)] uppercase opacity-60">Live</span>
                    </div>
                </Link>

                {/* NAV LINKS & ACTIONS */}
                <div className="flex items-center gap-2 md:gap-6">
                    {/* Theme Toggle & Mobile Menu */}
                    <div className="pl-2">
                        <ThemeToggle />
                    </div>
                </div>

            </div>

            {/* Decorative Bottom Line (Very subtle) */}
            <div className="h-[1px] w-full bg-linear-to-r from-transparent via-[var(--accent)]/30 to-transparent opacity-50" />
        </nav>
    );
}