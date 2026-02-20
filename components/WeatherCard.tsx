'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudSnow, CloudDrizzle, MapPin, Thermometer } from 'lucide-react'

type WeatherData = {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  weatherCode: number
  isDay: boolean
}

const getWeatherInfo = (code: number) => {
  if (code === 0) return { label: 'Clear', icon: Sun }
  if (code <= 3) return { label: 'Cloudy', icon: Cloud }
  if (code <= 67) return { label: 'Rainy', icon: CloudRain }
  if (code <= 82) return { label: 'Heavy Rain', icon: CloudRain }
  return { label: 'Stormy', icon: Wind }
}

export default function WeatherCard({ city, region, latitude, longitude, color }: { city: string, region: string, latitude: number, longitude: number, color?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  const accentColor = color === 'blue' ? 'text-blue-600' : color === 'orange' ? 'text-orange-600' : 'text-(--accent)'

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`)
        const data = await res.json()
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1
        })
      } finally { setLoading(false) }
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) // Refresh every 10 minutes
    return () => clearInterval(interval)
  }, [latitude, longitude])

  if (loading || !weather) {
    return (
      <div className="h-[280px] w-full animate-pulse bg-(--card) border border-(--border) rounded-4xl" />
    )
  }

  const weatherInfo = getWeatherInfo(weather.weatherCode)
  const Icon = weatherInfo.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-4xl border border-(--border) bg-(--card) transition-shadow hover:shadow-xl"
    >
      {/* Decorative Background */}
      <div className={`absolute -right-12 -top-12 size-32 ${accentColor} opacity-5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="relative z-10 p-6 flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className={`size-4 ${accentColor}`} />
              <h3 className="text-lg font-black tracking-tight text-(--text)">{city}</h3>
            </div>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{region}</p>
          </div>
          <div className={`p-3 rounded-xl ${accentColor} bg-current/10`}>
            <Icon className={`size-6 ${accentColor}`} strokeWidth={2} />
          </div>
        </div>

        {/* Temperature Display */}
        <div className="flex-1 flex flex-col justify-center py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter text-(--text) leading-none">{weather.temperature}°</span>
            <div className="space-y-0.5">
              <p className="text-xs font-black uppercase tracking-tight text-(--text)">{weatherInfo.label}</p>
              <p className="text-[10px] opacity-40 font-medium">Feels {weather.feelsLike}°</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3 pt-4 border-t border-(--border)">
          {/* Humidity Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase opacity-60">
              <span className="flex items-center gap-1.5">
                <Droplets className="size-3" /> Humidity
              </span>
              <span className="font-mono">{weather.humidity}%</span>
            </div>
            <div className="h-1.5 w-full bg-(--border) rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${weather.humidity}%` }} 
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${accentColor} bg-current rounded-full`}
              />
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center justify-between bg-(--bg) rounded-xl p-3 border border-(--border)">
            <div className="flex items-center gap-2">
              <Wind className={`size-4 ${accentColor}`} />
              <span className="text-sm font-black text-(--text)">{weather.windSpeed} <span className="text-[10px] opacity-40 font-medium">km/h</span></span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Wind</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}