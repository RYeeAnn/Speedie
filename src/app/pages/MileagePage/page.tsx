"use client";

import Link from "next/link";
import { useState } from "react";
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
  { id: "mileage", label: "Mileage", icon: "chart", href: "/pages/MileagePage", active: true },
  { id: "mechanic", label: "Find Mechanic", icon: "search", href: "/pages/FindAMechanicPage", active: false },
];

type MaintenanceItem = {
  id: string;
  title: string;
  description: string;
  frequency: number; // in km
};

const maintenanceItems: MaintenanceItem[] = [
  {
    id: "oil",
    title: "🛢️ Oil Change",
    description: "Change your oil every 10,000 km to keep the engine healthy.",
    frequency: 10000,
  },
  {
    id: "brakes",
    title: "🔧 Brake Inspection",
    description: "Inspect your brakes every 20,000 km.",
    frequency: 20000,
  },
  {
    id: "air",
    title: "🧼 Air Filter Replacement",
    description: "Replace your air filter every 15,000 km.",
    frequency: 15000,
  },
  {
    id: "trans",
    title: "⚙️ Transmission Fluid",
    description: "Flush and replace every 50,000 km.",
    frequency: 50000,
  },
  {
    id: "plugs",
    title: "🔩 Spark Plugs",
    description: "Replace every 40,000 km to maintain performance.",
    frequency: 40000,
  },
];


export default function MileagePage() {
  const [carType, setCarType] = useState<"new" | "used" | null>(null);
  const [currentMileage, setCurrentMileage] = useState<number | null>(null);
  const [lastService, setLastService] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState<MaintenanceItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = () => {
    if (currentMileage === null || currentMileage < 0) return;

    const upcomingTasks = maintenanceItems.filter((item) => {
      const last = lastService[item.id] ?? 0;
      const nextDue = last + item.frequency;

      return currentMileage >= nextDue - 1500;
    });

    setRecommendations(upcomingTasks);
    setSubmitted(true);
  };

  const handleCarTypeSelect = (type: "new" | "used") => {
    setCarType(type);

    // Reset everything else when switching
    setCurrentMileage(null);
    setSubmitted(false);
    setRecommendations([]);
    setLastService({});

    if (type === "new") {
      const defaultServices: Record<string, number> = {};
      maintenanceItems.forEach((item) => {
        defaultServices[item.id] = 0;
      });
      setLastService(defaultServices);
    }
  };

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
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Mileage Tracker</h2>
                <p className="text-sm lg:text-base text-gray-600">Track your vehicle&apos;s maintenance schedule based on mileage</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {!carType ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Let&apos;s get started</h3>
                <p className="text-gray-600 mb-8">Is your car brand new or used? This helps us provide accurate maintenance recommendations.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => handleCarTypeSelect("new")}
                    className="px-8 py-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">🆕</span>
                    Brand New
                  </button>
                  <button
                    onClick={() => handleCarTypeSelect("used")}
                    className="px-8 py-4 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">🔁</span>
                    Used Car
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
                    <button
                      onClick={() => setCarType(null)}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Change Vehicle Type
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">Current Odometer (km)</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-slate-500 focus:border-slate-500 focus:outline-none text-gray-900 placeholder-gray-400"
                        placeholder="e.g. 150000"
                        value={currentMileage ?? ""}
                        onChange={(e) => setCurrentMileage(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-slate-600 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition"
                      >
                        Get Recommendations
                      </button>
                    </div>
                  </div>

                  {carType === "used" && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Maintenance History</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {maintenanceItems.map((item) => (
                          <div key={item.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{item.title}</label>
                            <input
                              type="number"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-slate-500 focus:border-slate-500 focus:outline-none text-gray-900 placeholder-gray-400"
                              placeholder={`e.g. ${currentMileage ? currentMileage - item.frequency + 1000 : "120000"}`}
                              value={lastService[item.id] ?? ""}
                              onChange={(e) =>
                                setLastService({
                                  ...lastService,
                                  [item.id]: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {submitted && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-lg">🔔</span>
                        Maintenance Recommendations
                      </h2>
                    </div>
                    <div className="p-6">
                      {recommendations.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎉</span>
                          </div>
                          <p className="text-gray-600 text-lg">Everything looks good!</p>
                          <p className="text-gray-500 text-sm">No immediate maintenance actions needed.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {recommendations.map((item) => {
                            const last = lastService[item.id] ?? 0;
                            const dueAt = last + item.frequency;
                            const overdue = currentMileage && currentMileage > dueAt;

                            return (
                              <div key={item.id} className={`p-4 rounded-lg border ${
                                overdue ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                              }`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                                    <p className={`text-xs mt-2 font-medium ${
                                      overdue ? 'text-red-600' : 'text-amber-600'
                                    }`}>
                                      🔧 Due at ~{dueAt.toLocaleString()} km
                                      {overdue && ' (Overdue!)'}
                                    </p>
                                  </div>
                                  <div className={`w-3 h-3 rounded-full ${
                                    overdue ? 'bg-red-500' : 'bg-amber-500'
                                  }`}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}