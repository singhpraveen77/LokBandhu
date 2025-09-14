import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "leaflet/dist/leaflet.css";

// Priority colors
const priorityColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
  Critical: "purple",
};

// Category colors
const categoryColors = {
  Infrastructure: "#e63946",
  Cleanliness: "#2a9d8f",
  "Public Safety": "#f4a261",
  Environment: "#457b9d",
  Education: "#8d99ae",
  "Water & Drainage": "#06d6a0",
  Traffic: "#ffb703",
};

// Custom pin icon generator
function createPinIcon(priority) {
  return L.divIcon({
    className: "custom-pin",
    html: `
      <div style="
        background:${priorityColors[priority]};
        width:20px;
        height:20px;
        border-radius:50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
      "></div>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
  });
}

// 20 problem data around New Delhi
const problemData = [
  {
    id: 1,
    title: "Potholes on Ring Road",
    category: "Infrastructure",
    priority: "High",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: 2,
    title: "Overflowing Garbage Bin",
    category: "Cleanliness",
    priority: "Medium",
    lat: 28.62,
    lng: 77.21,
  },
  {
    id: 3,
    title: "Broken Traffic Signal",
    category: "Traffic",
    priority: "Critical",
    lat: 28.61,
    lng: 77.22,
  },
  {
    id: 4,
    title: "Open Drainage",
    category: "Water & Drainage",
    priority: "High",
    lat: 28.63,
    lng: 77.19,
  },
  {
    id: 5,
    title: "Deforestation in Park",
    category: "Environment",
    priority: "Medium",
    lat: 28.615,
    lng: 77.205,
  },
  {
    id: 6,
    title: "School Infrastructure Issue",
    category: "Education",
    priority: "Low",
    lat: 28.617,
    lng: 77.195,
  },
  {
    id: 7,
    title: "Street Crime Reported",
    category: "Public Safety",
    priority: "Critical",
    lat: 28.618,
    lng: 77.225,
  },
  {
    id: 8,
    title: "Water Pipeline Leakage",
    category: "Water & Drainage",
    priority: "High",
    lat: 28.62,
    lng: 77.23,
  },
  {
    id: 9,
    title: "Garbage Dumping in Colony",
    category: "Cleanliness",
    priority: "Medium",
    lat: 28.624,
    lng: 77.24,
  },
  {
    id: 10,
    title: "Air Pollution Complaint",
    category: "Environment",
    priority: "High",
    lat: 28.626,
    lng: 77.21,
  },
  {
    id: 11,
    title: "Broken Street Lights",
    category: "Infrastructure",
    priority: "Low",
    lat: 28.619,
    lng: 77.22,
  },
  {
    id: 12,
    title: "School Safety Violation",
    category: "Education",
    priority: "High",
    lat: 28.621,
    lng: 77.225,
  },
  {
    id: 13,
    title: "Traffic Jam Issue",
    category: "Traffic",
    priority: "Medium",
    lat: 28.627,
    lng: 77.218,
  },
  {
    id: 14,
    title: "Unhygienic Market",
    category: "Cleanliness",
    priority: "Low",
    lat: 28.612,
    lng: 77.228,
  },
  {
    id: 15,
    title: "Open Manhole",
    category: "Infrastructure",
    priority: "Critical",
    lat: 28.625,
    lng: 77.215,
  },
  {
    id: 16,
    title: "Illegal Dumping",
    category: "Environment",
    priority: "High",
    lat: 28.628,
    lng: 77.22,
  },
  {
    id: 17,
    title: "Cyber Crime Complaint",
    category: "Public Safety",
    priority: "Medium",
    lat: 28.629,
    lng: 77.23,
  },
  {
    id: 18,
    title: "Pipeline Burst",
    category: "Water & Drainage",
    priority: "Critical",
    lat: 28.631,
    lng: 77.21,
  },
  {
    id: 19,
    title: "Encroachment near School",
    category: "Education",
    priority: "Medium",
    lat: 28.633,
    lng: 77.225,
  },
  {
    id: 20,
    title: "Accident-Prone Zone",
    category: "Traffic",
    priority: "High",
    lat: 28.635,
    lng: 77.217,
  },
];

// Chart data: problems by year & category
const chartData = [
  { year: 2019, Infrastructure: 5, Cleanliness: 3, "Public Safety": 4, Environment: 2, Education: 1, "Water & Drainage": 2, Traffic: 3 },
  { year: 2020, Infrastructure: 7, Cleanliness: 6, "Public Safety": 5, Environment: 3, Education: 2, "Water & Drainage": 3, Traffic: 4 },
  { year: 2021, Infrastructure: 8, Cleanliness: 7, "Public Safety": 6, Environment: 4, Education: 3, "Water & Drainage": 5, Traffic: 6 },
  { year: 2022, Infrastructure: 6, Cleanliness: 9, "Public Safety": 7, Environment: 6, Education: 4, "Water & Drainage": 7, Traffic: 8 },
  { year: 2023, Infrastructure: 10, Cleanliness: 12, "Public Safety": 8, Environment: 7, Education: 6, "Water & Drainage": 9, Traffic: 11 },
];

export default function Analysis() {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 Analysis Dashboard</h2>

      {/* Map */}
      <div className="h-[500px] rounded-lg overflow-hidden mb-8 shadow-lg border border-gray-700">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {problemData.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={createPinIcon(p.priority)}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-tooltip">
                <div>
                  <b>{p.title}</b> <br />
                  Category:{" "}
                  <span style={{ color: categoryColors[p.category] }}>{p.category}</span>
                  <br />
                  Priority:{" "}
                  <span style={{ color: priorityColors[p.priority], fontWeight: "bold" }}>
                    {p.priority}
                  </span>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">📈 Problems by Category Over Years</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="year" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <RechartsTooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#fff" }} />
            <Legend />
            {Object.keys(categoryColors).map((cat) => (
              <Line
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={categoryColors[cat]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tooltip Styling */}
      <style>{`
        .leaflet-tooltip.custom-tooltip {
          background-color: #1e293b;
          color: white;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
