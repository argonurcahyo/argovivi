'use client'

import { useEffect, useState } from 'react'
import { Cloud, CloudRain, Sun, Wind, LucideIcon } from 'lucide-react'

type WeatherData = {
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  weatherLabel: string
  weatherIcon: LucideIcon
}

const getWeatherInfo = (code: number) => {
  if (code === 0) return { label: 'Clear', icon: Sun }
  if (code <= 3) return { label: 'Cloudy', icon: Cloud }
  if (code <= 67) return { label: 'Rainy', icon: CloudRain }
  if (code <= 82) return { label: 'Heavy Rain', icon: CloudRain }
  return { label: 'Stormy', icon: Wind }
}

export function useWeather(latitude: number, longitude: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        )
        const data = await res.json()
        const info = getWeatherInfo(data.current.weather_code)
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          weatherLabel: info.label,
          weatherIcon: info.icon
        })
      } catch (error) {
        console.error('Weather fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) // 10 minutes
    return () => clearInterval(interval)
  }, [latitude, longitude])

  return { weather, loading }
}
