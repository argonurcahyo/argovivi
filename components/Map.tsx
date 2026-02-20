'use client'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 1. Custom Glow Marker with Tailwind
const createIcon = (color: string) => L.divIcon({
  className: 'relative',
  html: `
    <div class="flex items-center justify-center">
      <div class="absolute size-4 bg-${color}-500/30 rounded-full animate-ping"></div>
      <div class="size-3 bg-${color}-500 rounded-full border-2 border-white shadow-md relative z-10"></div>
    </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

// 2. Utility for simple Curved Paths
const getCurvePoints = (start: [number, number], end: [number, number], segments = 50) => {
  const points: [number, number][] = []
  // Midpoint calculation with a slight "bow" effect
  const midLat = (start[0] + end[0]) / 2 + 5 // Lift the curve north
  const midLng = (start[1] + end[1]) / 2

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const lat = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * midLat + t ** 2 * end[0]
    const lng = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * midLng + t ** 2 * end[1]
    points.push([lat, lng])
  }
  return points
}

export default function ModernMap() {
  const bogor: [number, number] = [-6.5971, 106.8060]
  const brisbane: [number, number] = [-27.5528, 153.0519]
  const flightPath = getCurvePoints(bogor, brisbane)

  return (
    <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xl shadow-indigo-500/10">
      <MapContainer
        center={[-18.0, 130.0]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full grayscale-[0.2] contrast-[1.05]"
      >
        {/* CartoDB Voyager is often considered more "modern" than Light All */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Bogor Marker */}
        <Marker position={bogor} icon={createIcon('emerald')}>
          <Popup className="custom-popup">
            <div className="p-1">
              <h3 className="font-bold text-slate-800">Bogor, Indonesia</h3>
              <p className="text-xs text-slate-500">Home Base 🏠</p>
            </div>
          </Popup>
        </Marker>

        {/* Brisbane Marker */}
        <Marker position={brisbane} icon={createIcon('indigo')}>
          <Popup className="custom-popup">
            <div className="p-1">
              <h3 className="font-bold text-slate-800">Brisbane, Australia</h3>
              <p className="text-xs text-slate-500 font-medium text-indigo-600">Griffith University 🎓</p>
            </div>
          </Popup>
        </Marker>

        {/* Curved Flight Path */}
        <Polyline
          positions={flightPath}
          pathOptions={{
            color: '#6366f1', // Indigo-500
            weight: 2,
            dashArray: '5, 10',
            opacity: 0.8,
            lineCap: 'round'
          }}
        />
      </MapContainer>

    </div>
  )
}