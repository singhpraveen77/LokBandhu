// src/pages/Analysis.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";

// Priority colors
const priorityColors = {
  critical: "#ef4444", // red
  high: "#f97316", // orange
  medium: "#facc15", // yellow
  low: "#22c55e", // green
};

// Example problem data
const problemData = [
  { id: 1, title: "Potholes on Main Road", priority: "critical", lat: 28.6139, lng: 77.209, year: 2023 },
  { id: 2, title: "Overflowing Garbage Bins", priority: "high", lat: 19.076, lng: 72.8777, year: 2022 },
  { id: 3, title: "Street Light Not Working", priority: "medium", lat: 12.9716, lng: 77.5946, year: 2023 },
  { id: 4, title: "Drainage Blockage", priority: "low", lat: 13.0827, lng: 80.2707, year: 2021 },
  { id: 5, title: "Water Leakage", priority: "high", lat: 22.5726, lng: 88.3639, year: 2022 },
  { id: 6, title: "Garbage Dumping", priority: "critical", lat: 17.385, lng: 78.4867, year: 2023 },
  { id: 7, title: "Broken Traffic Signal", priority: "medium", lat: 23.0225, lng: 72.5714, year: 2024 },
  { id: 8, title: "School Building Damage", priority: "critical", lat: 26.9124, lng: 75.7873, year: 2021 },
  { id: 9, title: "Illegal Construction", priority: "high", lat: 18.5204, lng: 73.8567, year: 2023 },
  { id: 10, title: "Park Encroachment", priority: "low", lat: 15.2993, lng: 74.124, year: 2022 },
  { id: 11, title: "Sewage Overflow", priority: "critical", lat: 21.1702, lng: 72.8311, year: 2024 },
  { id: 12, title: "Garbage Burning", priority: "high", lat: 25.5941, lng: 85.1376, year: 2022 },
  { id: 13, title: "Damaged Footpath", priority: "medium", lat: 30.7333, lng: 76.7794, year: 2023 },
  { id: 14, title: "Tree Cutting Issue", priority: "low", lat: 11.0168, lng: 76.9558, year: 2021 },
];

// Chart Data
const chartData = [
  { year: 2020, problems: 8 },
  { year: 2021, problems: 15 },
  { year: 2022, problems: 28 },
  { year: 2023, problems: 40 },
  { year: 2024, problems: 22 },
];

// ✅ Function to create SVG-based pin markers
const createPinIcon = (color) =>
  L.divIcon({
    className: "",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });

export default function Analysis() {
  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Analysis Dashboard</h1>

      {/* Map Section */}
      <div className="rounded-2xl shadow-lg overflow-hidden mb-8" style={{ height: "450px" }}>
        <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {problemData.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={createPinIcon(priorityColors[p.priority])}
            >
              <Popup>
                <b>{p.title}</b> <br />
                Priority:{" "}
                <span style={{ color: priorityColors[p.priority], fontWeight: "bold" }}>
                  {p.priority}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Line Chart Section */}
      <div className="rounded-2xl shadow-lg bg-[#1e293b] p-6">
        <h2 className="text-xl font-semibold mb-4">Problems Reported Over the Years</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
            <Line type="monotone" dataKey="problems" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
