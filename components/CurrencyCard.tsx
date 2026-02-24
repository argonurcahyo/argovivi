'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartOptions
} from 'chart.js'
import { TrendingDown, TrendingUp, CircleDollarSign } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

type RatePoint = {
  date: string
  rate: number
}

const formatDate = (date: Date) => date.toISOString().slice(0, 10)

const formatNumber = (value: number) =>
  new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value)

const formatLabelDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function CurrencyCard() {
  const [series, setSeries] = useState<RatePoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadRates = async () => {
      setLoading(true)
      setError(null)

      const end = new Date()
      const start = new Date()
      start.setDate(end.getDate() - 13)

      const url = `https://api.frankfurter.app/${formatDate(start)}..${formatDate(end)}?from=AUD&to=IDR`

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error('Failed to load exchange rates')
        const data = await response.json()
        const rates = data?.rates ?? {}

        const points = Object.keys(rates)
          .sort()
          .map((date) => ({ date, rate: rates[date]?.IDR }))
          .filter((point) => typeof point.rate === 'number') as RatePoint[]

        setSeries(points)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Exchange rate unavailable')
        }
      } finally {
        setLoading(false)
      }
    }

    loadRates()
    const interval = setInterval(loadRates, 1000 * 60 * 60)

    return () => {
      controller.abort()
      clearInterval(interval)
    }
  }, [])

  const summary = useMemo(() => {
    const latest = series[series.length - 1]
    const previous = series[series.length - 2]

    if (!latest || !previous) {
      return { latest: null, delta: 0, percent: 0, up: true }
    }

    const delta = latest.rate - previous.rate
    const percent = (delta / previous.rate) * 100
    return { latest, delta, percent, up: delta >= 0 }
  }, [series])

  if (loading) {
    return <div className="h-80 w-full animate-pulse bg-(--card) border border-(--border) rounded-4xl" />
  }

  if (error || !summary.latest) {
    return (
      <div className="h-80 w-full bg-(--card) border border-(--border) rounded-4xl flex items-center justify-center text-sm opacity-60">
        {error ?? 'Data unavailable'}
      </div>
    )
  }

  const labels = series.map((point) => formatLabelDate(point.date))
  const dataPoints = series.map((point) => point.rate)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'IDR per 1 AUD',
        data: dataPoints,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `IDR ${formatNumber(context.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7 },
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
        ticks: {
          callback: (value: number | string) => formatNumber(Number(value)),
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col h-full overflow-hidden rounded-4xl border border-(--border) bg-(--card)"
    >
      <div className="absolute -right-10 -top-10 size-28 bg-orange-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="size-5 text-orange-500" />
              <h3 className="text-lg font-black tracking-tight text-(--text)">Rupiah vs AUD</h3>
            </div>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Daily exchange rate</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {summary.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {summary.up ? 'Up' : 'Down'}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-black tracking-tighter text-(--text)">
              {formatNumber(summary.latest.rate)}
            </p>
            <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">IDR per 1 AUD</p>
          </div>
          <div className="text-right text-xs font-bold">
            <p className={summary.up ? 'text-emerald-500' : 'text-rose-500'}>
              {summary.up ? '+' : ''}{formatNumber(summary.delta)} IDR
            </p>
            <p className="opacity-50">
              {summary.up ? '+' : ''}{summary.percent.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="h-40">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </motion.div>
  )
}
