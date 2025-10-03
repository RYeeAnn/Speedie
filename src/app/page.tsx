"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  {
    id: "warning-lights",
    title: "Warning Lights",
    description: "Identify dashboard alerts and understand their urgency",
    href: "/pages/WarningLightsPage",
    icon: "warning",
    priority: true,
  },
  {
    id: "maintenance-tips",
    title: "Maintenance Tips",
    description: "Keep your vehicle in top condition",
    href: "/pages/MaintenancePage",
    icon: "wrench",
    priority: false,
  },
  {
    id: "mileage-tracker",
    title: "Mileage Tracker",
    description: "Track your driving patterns and fuel efficiency",
    href: "/pages/MileagePage",
    icon: "chart",
    priority: false,
  },
  {
    id: "find-mechanic",
    title: "Find a Mechanic",
    description: "Locate trusted service providers nearby",
    href: "/pages/FindAMechanicPage",
    icon: "search",
    priority: false,
  },
];

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/", active: true },
  { id: "warning-lights", label: "Warning Lights", icon: "warning", href: "/pages/WarningLightsPage", active: false },
  { id: "maintenance", label: "Maintenance", icon: "wrench", href: "/pages/MaintenancePage", active: false },
  { id: "mileage", label: "Mileage", icon: "chart", href: "/pages/MileagePage", active: false },
  { id: "mechanic", label: "Find Mechanic", icon: "search", href: "/pages/FindAMechanicPage", active: false },
];

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

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

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
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</h2>
                <p className="text-sm lg:text-base text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your vehicle.</p>
              </div>
            </div>
            <div className="text-xs lg:text-sm text-gray-500 hidden sm:block">
              Developed by Ryan Yee
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Priority Feature - Warning Lights */}
          <div className="mb-8">
            <div className="bg-white rounded border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Icon name="warning" className="w-5 h-5 text-gray-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Warning Lights</h3>
                    <p className="text-gray-600 text-sm">Identify dashboard alerts and understand their urgency</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Don&apos;t ignore those dashboard lights! Our comprehensive database helps you understand what each warning means and how urgent it is.
                </p>
                <Link href="/pages/WarningLightsPage">
                  <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors">
                    Check Warning Lights
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {features.filter(f => !f.priority).map((feature, index) => (
            <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Icon name={feature.icon} className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
              </div>
                </Link>
            </motion.div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-white rounded border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">How Speedie Works</h3>
              <p className="text-gray-600 text-sm">Get instant help with your vehicle concerns</p>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Identify the Problem</h4>
                  <p className="text-sm text-gray-600">See a warning light? Not sure what it means? Use our comprehensive database to identify the issue.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Get Expert Guidance</h4>
                  <p className="text-sm text-gray-600">Learn what the warning means, how urgent it is, and what steps you should take next.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-gray-600">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Take Action</h4>
                  <p className="text-sm text-gray-600">Follow our maintenance tips or find a trusted mechanic nearby to resolve the issue.</p>
                </div>
              </div>
            </div>
        </div>
        </main>
      </div>
    </div>
  );
}