"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { allWarningLights, WarningLight } from "./allWarningLights";
import { clsx } from "clsx";


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
  { id: "warning-lights", label: "Warning Lights", icon: "warning", href: "/pages/WarningLightsPage", active: true },
  { id: "maintenance", label: "Maintenance", icon: "wrench", href: "/pages/MaintenancePage", active: false },
  { id: "mileage", label: "Mileage", icon: "chart", href: "/pages/MileagePage", active: false },
  { id: "mechanic", label: "Find Mechanic", icon: "search", href: "/pages/FindAMechanicPage", active: false },
];
  
export default function WarningLightsPage() {
  const [selectedLight, setSelectedLight] = useState<WarningLight | null>(null);
  const [activeTab, setActiveTab] = useState("Meaning");
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter lights by search and severity
  const filteredLights = allWarningLights.filter((light) => {
    const matchesSearch =
      light.name.toLowerCase().includes(search.toLowerCase()) ||
      light.description.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter ? light.severity === severityFilter : true;
    return matchesSearch && matchesSeverity;
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
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Warning Lights</h2>
                <p className="text-sm lg:text-base text-gray-600">Identify dashboard alerts and understand their urgency</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["info", "warning", "critical"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(severityFilter === sev ? null : sev)}
                className={clsx(
                  "px-4 py-2 rounded-lg border text-sm font-medium transition",
                  severityFilter === sev
                    ? "bg-slate-600 text-white border-slate-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-slate-50"
                )}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="🔍 Search warning lights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 placeholder-gray-400 text-black"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredLights.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg">No warning lights found.</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredLights.map((light) => (
                <button
                  key={light.id}
                  onClick={() => setSelectedLight(light)}
                  className="flex flex-col items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white hover:bg-gray-50 group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-200 transition">
                    <Image
                      src={light.image}
                      alt={light.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold text-center text-gray-800 mb-1">{light.name}</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full ${
                    light.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    light.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {light.severity.toUpperCase()}
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Modal */}
          {selectedLight && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full max-w-md rounded-xl shadow-xl relative"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setSelectedLight(null)}
                >
                  ×
                </button>

                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <Image
                        src={selectedLight.image}
                        alt={selectedLight.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedLight.name}</h2>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      selectedLight.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      selectedLight.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {selectedLight.severity.toUpperCase()}
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                    {["Meaning", "Urgency", "Fix Info"].map((tab) => (
                      <button
                        key={tab}
                        className={`text-sm px-4 py-2 rounded-md font-medium transition ${
                          activeTab === tab
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {activeTab === "Meaning" && <p>{selectedLight.description}</p>}
                    {activeTab === "Urgency" && <p>{selectedLight.urgency}</p>}
                    {activeTab === "Fix Info" && <p>{selectedLight.fixInfo}</p>}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}