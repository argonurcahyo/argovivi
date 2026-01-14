'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Fix untuk icon Leaflet yang sering hilang di Next.js
const icon = L.divIcon({
  className: 'custom-icon',
  html: `<div class="size-4 bg-(--accent) rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
  iconSize: [16, 16],
})

export default function Map() {
  const bogor: [number, number] = [-6.5971, 106.8060]
  const brisbane: [number, number] = [-27.5528, 153.0519]
  
  // Titik tengah untuk garis lengkung sederhana (Opsional)
  const polyline: [number, number][] = [bogor, brisbane]

  return (
    <div className="h-87.5 w-full rounded-2xl overflow-hidden border border-(--border) z-0">
      <MapContainer 
        center={[-17.0, 130.0]} 
        zoom={3} 
        scrollWheelZoom={false} 
        className="h-full w-full grayscale-[0.5] contrast-[1.1]"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={bogor} icon={icon}>
          <Popup>Bogor (Home)</Popup>
        </Marker>

        <Marker position={brisbane} icon={icon}>
          <Popup>Brisbane (Griffith University)</Popup>
        </Marker>

        <Polyline 
          positions={polyline} 
          pathOptions={{ 
            color: 'var(--accent)', 
            weight: 2, 
            dashArray: '10, 10',
            opacity: 0.6 
          }} 
        />
      </MapContainer>
    </div>
  )
}