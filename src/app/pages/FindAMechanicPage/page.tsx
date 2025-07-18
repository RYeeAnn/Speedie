"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "400px",
};

type Mechanic = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  rating?: number;
  city?: string;
  services: string[]; // local mapping for dummy filter tags
};

export default function FindMechanicPage() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [cities, setCities] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        fetchMechanics(latitude, longitude);
      },
      (err) => {
        console.warn("Geolocation failed:", err);
        const fallbackLat = 49.2827;
        const fallbackLng = -123.1207;
        setUserLocation({ lat: fallbackLat, lng: fallbackLng });
        fetchMechanics(fallbackLat, fallbackLng);
      }
    );
  }, [isLoaded]);

  const fetchMechanics = async (lat: number, lng: number) => {
    if (!window.google || !google.maps) return;

    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 10000,
      keyword: "mechanic",
    };

    service.nearbySearch(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) return;

      const mechanicsData: Mechanic[] = results.map((place) => {
        const cityComponent = place.vicinity?.split(", ").slice(-1)[0] || "Unknown";
        return {
          id: place.place_id ?? "unknown-id",
          name: place.name ?? "Unknown Name",
          lat: place.geometry?.location?.lat() ?? 0,
          lng: place.geometry?.location?.lng() ?? 0,
          address: place.vicinity ?? "No address",
          phone: "",
          rating: place.rating ?? 0,
          city: cityComponent,
          services: assignRandomServices(),
        };
      });      

      const uniqueCities = Array.from(
        new Set(mechanicsData.map((m) => m.city || "Unknown"))
      );      
      setCities(["All", ...uniqueCities]);
      setMechanics(mechanicsData);
    });
  };

  const assignRandomServices = (): string[] => {
    const all = ["oil", "brakes", "tires"];
    return all.filter(() => Math.random() > 0.4); // randomly assign
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const filteredMechanics = mechanics.filter((m) => {
    const matchesServices =
      selectedServices.length === 0 || selectedServices.every((s) => m.services.includes(s));
    const matchesCity = selectedCity === "All" || m.city === selectedCity;
    return matchesServices && matchesCity;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-6 text-gray-900">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mb-8">🔍 Find a Mechanic</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {["oil", "brakes", "tires"].map((s) => (
          <button
            key={s}
            onClick={() => toggleService(s)}
            className={`px-4 py-2 rounded-full font-medium border ${
              selectedServices.includes(s)
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white border-gray-300 text-gray-800"
            } transition`}
          >
            {s === "oil" && "🛢️ Oil Change"}
            {s === "brakes" && "🧯 Brakes"}
            {s === "tires" && "🛞 Tires"}
          </button>
        ))}
      </div>

      {cities.length > 0 && (
        <div className="flex justify-center mb-6">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border px-4 py-2 rounded shadow-sm"
          >
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
      )}

      {isLoaded && userLocation ? (
        <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={13}>
          {filteredMechanics.map((m) => (
            <Marker key={m.id} position={{ lat: m.lat, lng: m.lng }} />
          ))}
        </GoogleMap>
      ) : (
        <p className="text-center">Loading map...</p>
      )}

      <div className="mt-8 grid gap-4">
        {filteredMechanics.map((m) => (
          <div
            key={m.id}
            className="p-4 border rounded-lg shadow-sm bg-white flex flex-col gap-1"
          >
            <h2 className="font-bold text-lg">{m.name}</h2>
            <p className="text-sm">{m.address}</p>
            <p className="text-sm text-gray-500">
              Services: {m.services.join(", ")}
            </p>
            {m.rating && (
              <p className="text-sm text-yellow-600">⭐ Rating: {m.rating.toFixed(1)}</p>
            )}
            <div className="mt-2 flex gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  m.name + " " + m.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                🗺️ Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
