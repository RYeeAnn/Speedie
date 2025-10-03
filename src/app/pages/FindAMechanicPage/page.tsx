"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Icon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const icons = {
    dashboard: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    warning: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    wrench: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  };
  return icons[name as keyof typeof icons] || null;
};

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/", active: false },
  { id: "warning-lights", label: "Warning Lights", icon: "warning", href: "/pages/WarningLightsPage", active: false },
  { id: "maintenance", label: "Maintenance", icon: "wrench", href: "/pages/MaintenancePage", active: false },
  { id: "mileage", label: "Mileage", icon: "chart", href: "/pages/MileagePage", active: false },
  { id: "mechanic", label: "Find Mechanic", icon: "search", href: "/pages/FindAMechanicPage", active: true },
];

type Mechanic = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  city?: string;
  distance?: string;
};

const mechanics: Mechanic[] = [
  {
    id: "1",
    name: "AutoCare Plus",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    rating: 4.8,
    city: "Downtown",
    distance: "0.5 miles"
  },
  {
    id: "2", 
    name: "Quick Fix Garage",
    address: "456 Oak Avenue, Midtown",
    phone: "(555) 234-5678",
    rating: 4.5,
    city: "Midtown",
    distance: "1.2 miles"
  },
  {
    id: "3",
    name: "Precision Auto Service",
    address: "789 Pine Street, Uptown",
    phone: "(555) 345-6789",
    rating: 4.9,
    city: "Uptown", 
    distance: "2.1 miles"
  },
  {
    id: "4",
    name: "Reliable Motors",
    address: "321 Elm Street, Eastside",
    phone: "(555) 456-7890",
    rating: 4.6,
    city: "Eastside",
    distance: "3.5 miles"
  },
  {
    id: "5",
    name: "Express Auto Repair",
    address: "654 Maple Drive, Westside",
    phone: "(555) 567-8901",
    rating: 4.4,
    city: "Westside",
    distance: "4.2 miles"
  },
  {
    id: "6",
    name: "Pro Auto Solutions",
    address: "987 Cedar Lane, Northside",
    phone: "(555) 678-9012",
    rating: 4.7,
    city: "Northside",
    distance: "5.8 miles"
  }
];

export default function FindAMechanicPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cities = ["All", ...new Set(mechanics.map(m => m.city).filter(Boolean))] as string[];

  const filteredMechanics = mechanics.filter(mechanic => {
    const matchesSearch = mechanic.name.toLowerCase().includes(search.toLowerCase()) ||
                         mechanic.address.toLowerCase().includes(search.toLowerCase());
    const matchesCity = !selectedCity || selectedCity === "All" || mechanic.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setMobileMenuOpen(false)}
          ></motion.div>
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-2xl"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">S</span>
                </div>
                <div>
                  <h1 className="text-white text-xl font-bold">Speedie</h1>
                  <p className="text-gray-400 text-sm">Vehicle Dashboard</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                      item.active
                        ? 'bg-gray-700 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-md'
                    }`}
                  >
                    <Icon name={item.icon} className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 transition-all duration-300 flex-shrink-0 hidden lg:block`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-white text-lg font-semibold">Speedie</h1>
                <p className="text-gray-400 text-xs">Vehicle Dashboard</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded text-sm transition-colors ${
                  item.active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Toggle */}
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Find a Mechanic</h2>
                <p className="text-sm lg:text-base text-gray-600">Locate trusted service providers near you</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Search and Filter Section */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 lg:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Search mechanics or location..."
                  className="w-full border border-gray-300 rounded px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              
              {/* City Filter */}
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city || null)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition whitespace-nowrap ${
                      selectedCity === city
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mechanics List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredMechanics.map((mechanic, index) => (
              <motion.div
                key={mechanic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded border border-gray-200 shadow-sm p-4 lg:p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{mechanic.name}</h3>
                  {mechanic.rating && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">{mechanic.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {mechanic.address}
                  </div>
                  
                  {mechanic.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {mechanic.phone}
                    </div>
                  )}
                  
                  {mechanic.distance && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {mechanic.distance}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors">
                    Call Now
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                    Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}