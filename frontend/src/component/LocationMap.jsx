import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function LocationMap({ onSelect = () => {} }) {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([28.6139, 77.209]); // Delhi default
  const [address, setAddress] = useState("Select on map");

  
  const fetchAddress = async (lat, lng) => {
    try {
      // CORS proxy for frontend-only testing
      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )}`
      );
      const text = await res.json();
      const data = JSON.parse(text.contents);
      setAddress(data.display_name || "Unknown location");
    } catch (err) {
      console.error(err);
      setAddress("Unknown location");
    }
  };

  const handleDragEnd = (e) => {
    const marker = e.target;
    const newPos = marker.getLatLng();
    setPosition([newPos.lat, newPos.lng]);
    fetchAddress(newPos.lat, newPos.lng);
  };

  const handleConfirm = () => {
    setAddress(address);
    setShowMap(false);
    onSelect({ lat: position[0], lng: position[1], address });
  };

  return (
    <div className="flex flex-col border-amber-300">
      <label className="text-sm text-gray-300 mb-1">Location</label>

      {/* Responsive input + button layout */}
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        <input
          readOnly
          value={address}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="
            w-full sm:w-auto md:w-fit
            px-4 py-3 md:py-2
            text-base md:text-sm
            rounded-lg bg-green-400 text-gray-900 font-semibold
            hover:bg-opacity-90 transition
          "
        >
          Pick
        </button>
      </div>

      {showMap && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          ></div>

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-3xl mx-4 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Pick a Location</h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <MapContainer
              center={position}
              zoom={12}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker
                position={position}
                draggable={true}
                eventHandlers={{ dragend: handleDragEnd }}
              />
            </MapContainer>

            <div className="flex flex-wrap md:flex-nowrap justify-end gap-3 p-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2 rounded-full bg-green-400 text-gray-900 font-bold hover:bg-opacity-90 w-full sm:w-auto"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
