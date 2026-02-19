'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Zap, Calendar as CalendarIcon, ChevronDown, Moon, Sun, Clock } from 'lucide-react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import { ImsakiyahSchedule, DailySchedule } from '@/data/imsakiyah'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)

type ImsakiyahCardProps = {
  schedule: ImsakiyahSchedule
}

export default function ImsakiyahCard({ schedule }: ImsakiyahCardProps) {
  const [selectedDate, setSelectedDate] = useState(schedule.times[0]?.date || '')
  const [currentTime, setCurrentTime] = useState(dayjs())
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentDayData = schedule.times.find(t => t.date === selectedDate) as DailySchedule | undefined

  const timeSlots = useMemo(() => {
    if (!currentDayData) return []
    return [
      { label: 'Imsak', value: currentDayData.imsak, icon: <Moon className="size-3.5" /> },
      { label: 'Subuh', value: currentDayData.subuh, icon: <Sun className="size-3.5" /> },
      { label: 'Dhuhr', value: currentDayData.dhuhr, icon: <Sun className="size-3.5" /> },
      { label: 'Ashar', value: currentDayData.ashar, icon: <Sun className="size-3.5" /> },
      { label: 'Maghrib', value: currentDayData.maghrib, icon: <Moon className="size-3.5" /> },
      { label: 'Isha', value: currentDayData.isha, icon: <Moon className="size-3.5" /> },
    ]
  }, [currentDayData])

  const nextEvent = useMemo(() => {
    if (!mounted || !currentDayData) return null
    const now = dayjs().tz(schedule.timezone)
    if (selectedDate !== now.format('YYYY-MM-DD')) return null

    const imsakTime = dayjs.tz(`${selectedDate} ${currentDayData.imsak}`, 'YYYY-MM-DD HH:mm', schedule.timezone)
    const maghribTime = dayjs.tz(`${selectedDate} ${currentDayData.maghrib}`, 'YYYY-MM-DD HH:mm', schedule.timezone)

    let nextEventTime = null
    let eventLabel = ''

    if (now.isBefore(imsakTime)) {
      nextEventTime = imsakTime
      eventLabel = 'Imsak'
    } else if (now.isBefore(maghribTime)) {
      nextEventTime = maghribTime
      eventLabel = 'Buka Puasa'
    } else {
      const tomorrowDate = dayjs(selectedDate).add(1, 'day').format('YYYY-MM-DD')
      const nextImsakData = schedule.times.find(t => t.date === tomorrowDate)
      if (nextImsakData) {
        nextEventTime = dayjs.tz(`${tomorrowDate} ${nextImsakData.imsak}`, 'YYYY-MM-DD HH:mm', schedule.timezone)
        eventLabel = 'Imsak (Besok)'
      }
    }

    if (nextEventTime) {
      const diff = nextEventTime.diff(now)
      return {
        label: eventLabel,
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      }
    }
    return null
  }, [mounted, currentDayData, schedule.timezone, selectedDate, currentTime])

  // Calculate day progress (Imsak to Maghrib)
  const dayProgress = useMemo(() => {
    if (!currentDayData) return null
    const now = dayjs().tz(schedule.timezone)
    
    const imsakTime = dayjs.tz(`${selectedDate} ${currentDayData.imsak}`, 'YYYY-MM-DD HH:mm', schedule.timezone)
    const maghribTime = dayjs.tz(`${selectedDate} ${currentDayData.maghrib}`, 'YYYY-MM-DD HH:mm', schedule.timezone)

    const totalDuration = maghribTime.diff(imsakTime, 'millisecond')
    const elapsed = now.diff(imsakTime, 'millisecond')
    
    if (elapsed < 0) {
      return { percent: 0, status: 'pending' }
    } else if (elapsed >= totalDuration) {
      return { percent: 100, status: 'completed' }
    } else {
      return { percent: Math.round((elapsed / totalDuration) * 100), status: 'active' }
    }
  }, [currentDayData, selectedDate, schedule.timezone, currentTime])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-(--border) bg-(--card) transition-shadow hover:shadow-xl"
    >
      {/* Puasa Progress Bar */}
      {dayProgress && selectedDate === dayjs().tz(schedule.timezone).format('YYYY-MM-DD') && (
        <div className="relative h-1.5 bg-(--border) overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dayProgress.percent}%` }}
            transition={{ duration: 0.3 }}
            className={`h-full transition-all ${
              dayProgress.status === 'active' 
                ? 'bg-gradient-to-r from-(--accent) via-(--accent) to-(--accent)/60' 
                : dayProgress.status === 'completed'
                ? 'bg-(--border)'
                : 'bg-(--border)'
            }`}
          />
          
          {/* Status Indicator Dot */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full flex items-center pointer-events-none">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: `${dayProgress.percent}%` }}
              transition={{ duration: 0.3 }}
              className={`w-1.5 h-1.5 rounded-full -ml-1 transition-colors ${
                dayProgress.status === 'active' 
                  ? 'bg-(--accent) shadow-lg shadow-(--accent)/50' 
                  : 'bg-(--border)'
              }`}
            />
          </div>
        </div>
      )}

      <div className="p-5 sm:p-7 flex flex-col gap-6">
        {/* Header: Location & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-(--accent)/10 text-(--accent)">
              <MapPin className="size-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-(--text)">{schedule.region}</span>
          </div>

          <div className="relative">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="appearance-none w-full sm:w-auto pl-4 pr-10 py-2 rounded-xl bg-(--bg) border border-(--border) text-xs font-bold text-(--text) focus:ring-2 focus:ring-(--accent)/20 outline-none cursor-pointer"
            >
              {schedule.times.map((day) => (
                <option key={day.date} value={day.date}>
                  {dayjs(day.date).format('ddd, D MMM')}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-(--text) opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* Countdown Section */}
        <AnimatePresence mode="wait">
          {nextEvent ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-(--accent) to-(--accent)/90 text-white shadow-lg shadow-(--accent)/20 overflow-hidden"
            >
              <Zap className="absolute -bottom-2 -right-2 size-20 opacity-10 rotate-12" />
              
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">{nextEvent.label}</span>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  {[
                    { val: nextEvent.hours, unit: 'h' },
                    { val: nextEvent.minutes, unit: 'm' },
                    { val: nextEvent.seconds, unit: 's' }
                  ].map((t, i) => (
                    <div key={i} className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-mono font-bold tracking-tighter">
                        {String(t.val).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-bold opacity-60 uppercase">{t.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-8 text-center border-2 border-dashed border-(--border) rounded-2xl">
              <Clock className="mx-auto size-6 opacity-20 mb-2" />
              <p className="text-xs font-bold opacity-40">Schedule details for {dayjs(selectedDate).format('D MMMM')}</p>
            </div>
          )}
        </AnimatePresence>

        {/* Prayer Times Grid - Optimized for 2-column parent container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {timeSlots.map((slot) => {
            const isHighlighted = nextEvent?.label === slot.label || (nextEvent?.label === 'Buka Puasa' && slot.label === 'Maghrib')
            
            return (
              <div
                key={slot.label}
                className={`flex flex-col p-3.5 rounded-2xl border transition-all ${
                  isHighlighted 
                  ? 'bg-(--accent)/5 border-(--accent) ring-1 ring-(--accent)/10' 
                  : 'bg-(--bg)/50 border-(--border) hover:border-(--text)/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${isHighlighted ? 'text-(--accent)' : 'opacity-30'}`}>
                    {slot.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isHighlighted ? 'text-(--accent)' : 'opacity-40'}`}>
                    {slot.label}
                  </span>
                </div>
                <span className={`text-base font-mono font-bold ${isHighlighted ? 'text-(--accent)' : 'text-(--text)'}`}>
                  {slot.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}