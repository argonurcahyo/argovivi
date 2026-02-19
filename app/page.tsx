'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image' // Import Image Next.js
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Heart, GraduationCap, CloudRain, ArrowRight, Compass, Plane } from 'lucide-react'
import Head from 'next/head'
import ImsakiyahCard from '@/components/ImsakiyahCard'
import { bogorImsakiyah, brisbaneImsakiyah } from '@/data/imsakiyah'


const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-87.5 w-full bg-(--card) animate-pulse rounded-2xl flex items-center justify-center border border-(--border)">Loading Map...</div>
})

export default function Home() {
  const [times, setTimes] = useState({ bogor: '--:--', brisbane: '--:--' })

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }
      setTimes({
        bogor: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Jakarta' }).format(new Date()),
        brisbane: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Australia/Brisbane' }).format(new Date()),
      })
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-16 py-8">
      {/* HERO HEADER */}
      <section className="text-center space-y-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--accent)/10 border border-(--accent)/20"
        >
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-(--text) opacity-70 flex items-center gap-2">
            Argo <Heart className="size-3 text-(--accent) fill-(--accent) animate-pulse" /> Vivi
          </span>
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight italic leading-tight text-(--text)">
            Long Distance <br />
            <span className="text-(--accent)">Memories</span>
          </h1>
        </div>

        <p className="max-w-xl mx-auto text-(--text) opacity-70 text-lg leading-relaxed italic">
          &quot;Jarak hanyalah jeda untuk rindu yang lebih bermakna.&quot;
        </p>
      </section>

      {/* DUAL WORLD CARDS WITH CARICATURES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative px-2">

        {/* Connection Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 size-12 items-center justify-center rounded-full bg-(--bg) border-2 border-(--accent) shadow-lg shadow-(--accent)/20">
          <Heart className="size-5 text-(--accent) fill-(--accent)" />
        </div>

        {/* Argo's Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="card relative overflow-visible group flex flex-col justify-between min-h-65 transition-all hover:shadow-2xl"
        >
          {/* Caricature Placeholder - Argo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-4 md:-right-8 z-10 w-32 h-32 md:w-40 md:h-40"
          >
            <div className="relative w-full h-full drop-shadow-2xl">
              <Image
                src="/photos/5b7fb179-0932-4122-97a9-7651e11eac28.webp" // Pastikan ada di /public/argo.png
                alt="Karikatur Argo"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="space-y-1">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">Bogor Base</span>
            <h3 className="text-3xl font-black tracking-tighter text-(--text)">ARGO</h3>
            <div className="flex items-center gap-1.5 text-blue-600/60 font-medium text-xs">
              <CloudRain className="size-3" /> Kota Hujan
            </div>
          </div>

          <div className="mt-12">
            <p className="text-5xl font-mono font-black tracking-tighter text-(--text)">
              {times.bogor}
            </p>
            <div className="flex items-center gap-2 mt-2 opacity-40">
              <MapPin className="size-3.5 text-(--accent)" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Western Indonesia Time</span>
            </div>
          </div>
        </motion.div>

        {/* Vivi's Card */}
        <motion.div
          whileHover={{ y: -5 }}
          className="card relative overflow-visible group flex flex-col justify-between min-h-65 transition-all hover:shadow-2xl"
        >
          {/* Caricature Placeholder - Vivi */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-12 -right-4 md:-right-8 z-10 w-32 h-32 md:w-40 md:h-40"
          >
            <div className="relative w-full h-full drop-shadow-2xl">
              <Image
                src="/photos/291ec3d5-be69-4e1b-8575-754a1545dc3e.webp" // Pastikan ada di /public/vivi.png
                alt="Karikatur Vivi"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-0.5 rounded-md">Brisbane Journey</span>
            <h3 className="text-3xl font-black tracking-tighter text-(--text)">VIVI</h3>
            <div className="flex items-center gap-1.5 text-orange-600/60 font-medium text-xs">
              <GraduationCap className="size-3" /> Griffith University
            </div>
          </div>

          <div className="mt-12">
            <p className="text-5xl font-mono font-black tracking-tighter text-(--text)">
              {times.brisbane}
            </p>
            <div className="flex items-center gap-2 mt-2 opacity-40">
              <MapPin className="size-3.5 text-(--accent)" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Australian Eastern Standard</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* IMSAKIYAH SECTION */}
      <section className="space-y-6 pt-4 px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-(--accent)/20">
            <CloudRain className="size-5 text-(--accent)" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-(--text)">Jadwal Imsakiyah</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ImsakiyahCard schedule={bogorImsakiyah} />
          <ImsakiyahCard schedule={brisbaneImsakiyah} />
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="space-y-6 pt-4 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-(--text) text-(--bg)">
              <Compass className="size-5" />
            </div>
            <h2 className="text-xl font-black tracking-tight text-(--text)">The Bridge of Distance</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest leading-none">Total Distance</p>
            <p className="text-2xl font-black text-(--accent) font-mono">4,415 KM</p>
          </div>
        </div>

        <div className="card p-1.5! relative overflow-hidden group">
          <DynamicMap />
        </div>
      </section>




    </div>
  )
}