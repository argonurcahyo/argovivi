'use client'

import { Heart, MapPin, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* LEFT: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
              <span className="text-[var(--accent)]">L</span>
              <span className="text-[var(--text)]">DM</span>
            </div>
            <p className="text-sm text-[var(--text)] opacity-60 leading-relaxed max-w-[200px]">
              Digital space for two hearts navigating different timezones.
            </p>
          </div>

          {/* CENTER: Symbolic Heart */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="size-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center"
              >
                <Heart className="size-5 text-[var(--accent)] fill-[var(--accent)]" />
              </motion.div>
              {/* Wireless connection line effect */}
              <div className="absolute top-1/2 left-full w-12 h-px bg-linear-to-r from-[var(--accent)]/50 to-transparent hidden md:block" />
              <div className="absolute top-1/2 right-full w-12 h-px bg-linear-to-l from-[var(--accent)]/50 to-transparent hidden md:block" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Synchronized</span>
          </div>

          {/* RIGHT: Locations info */}
          <div className="flex flex-col md:items-end space-y-4">
            <div className="space-y-2">
              <div className="flex items-center md:justify-end gap-2 text-sm font-medium">
                <span className="opacity-60">Base:</span>
                <span className="font-bold">Bogor, ID</span>
                <MapPin className="size-3.5 text-blue-500" />
              </div>
              <div className="flex items-center md:justify-end gap-2 text-sm font-medium">
                <span className="opacity-60">Study:</span>
                <span className="font-bold">Brisbane, AU</span>
                <Globe2 className="size-3.5 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}

      </div>

      {/* Very bottom decorative gradient */}
      <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-[var(--accent)] to-amber-500 opacity-20" />
    </footer>
  );
}