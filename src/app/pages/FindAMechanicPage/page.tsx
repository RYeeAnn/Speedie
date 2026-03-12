"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";

type Mechanic = {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  city: string;
  distance: string;
  specialties: string[];
  open: boolean;
};

const mechanics: Mechanic[] = [
  { id: "1", name: "AutoCare Plus",          address: "123 Main Street, Downtown",  phone: "(555) 123-4567", rating: 4.8, reviewCount: 124, city: "Downtown",  distance: "0.5 km", specialties: ["General Service", "Diagnostics", "Brakes"],       open: true  },
  { id: "2", name: "Quick Fix Garage",       address: "456 Oak Avenue, Midtown",    phone: "(555) 234-5678", rating: 4.5, reviewCount: 89,  city: "Midtown",   distance: "1.2 km", specialties: ["Oil Changes", "Tires", "General Service"],        open: true  },
  { id: "3", name: "Precision Auto Service", address: "789 Pine Street, Uptown",    phone: "(555) 345-6789", rating: 4.9, reviewCount: 207, city: "Uptown",    distance: "2.1 km", specialties: ["European Cars", "Diagnostics", "Engine Repair"], open: false },
  { id: "4", name: "Reliable Motors",        address: "321 Elm Street, Eastside",   phone: "(555) 456-7890", rating: 4.6, reviewCount: 143, city: "Eastside",  distance: "3.5 km", specialties: ["Transmission", "Suspension", "Brakes"],          open: true  },
  { id: "5", name: "Express Auto Repair",    address: "654 Maple Drive, Westside",  phone: "(555) 567-8901", rating: 4.4, reviewCount: 67,  city: "Westside",  distance: "4.2 km", specialties: ["Tires", "Oil Changes", "AC Service"],           open: true  },
  { id: "6", name: "Pro Auto Solutions",     address: "987 Cedar Lane, Northside",  phone: "(555) 678-9012", rating: 4.7, reviewCount: 182, city: "Northside", distance: "5.8 km", specialties: ["Full Service", "Electrical", "Engine Repair"],  open: false },
];

export default function FindAMechanicPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const cities = ["All", ...new Set(mechanics.map((m) => m.city))];

  const filteredMechanics = mechanics.filter((mechanic) => {
    const matchesSearch =
      mechanic.name.toLowerCase().includes(search.toLowerCase()) ||
      mechanic.address.toLowerCase().includes(search.toLowerCase()) ||
      mechanic.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCity = selectedCity === "All" || mechanic.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="pl-12 lg:pl-0">
            <span className="text-sm font-medium text-gray-500">Find a Mechanic</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-5xl mx-auto">

            {/* Search + filters */}
            <div className="mb-5">
              <div className="relative mb-3">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, specialty, or location..."
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-400 transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      selectedCity === city
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Demo notice */}
            <div className="flex items-start gap-2.5 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-500">Demo data.</span> These are sample listings. In production these would be sourced from a live database with real location data.
              </p>
            </div>

            {/* Grid */}
            {filteredMechanics.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-7 h-7 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm font-semibold text-gray-500">No mechanics found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredMechanics.map((mechanic) => (
                  <div
                    key={mechanic.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col"
                  >
                    {/* Header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">{mechanic.name}</h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${
                          mechanic.open
                            ? "bg-gray-100 border-gray-200 text-gray-600"
                            : "bg-white border-gray-200 text-gray-400"
                        }`}>
                          {mechanic.open ? "Open" : "Closed"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{mechanic.rating}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= Math.round(mechanic.rating) ? "bg-gray-500" : "bg-gray-200"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({mechanic.reviewCount})</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 mb-4 flex-1">
                      <div className="flex items-start gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs text-gray-500 leading-tight">{mechanic.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-xs text-gray-500">{mechanic.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs text-gray-400">{mechanic.distance} away</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {mechanic.specialties.map((spec) => (
                          <span key={spec} className="text-[10px] font-medium bg-gray-100 border border-gray-200 text-gray-500 px-2 py-0.5 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={`tel:${mechanic.phone}`}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(mechanic.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-600 text-xs font-semibold py-2.5 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
