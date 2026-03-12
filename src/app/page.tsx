"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "./components/Sidebar";
import { allWarningLights } from "./pages/WarningLightsPage/allWarningLights";

const tools = [
  {
    href: "/pages/WarningLightsPage",
    title: "Warning Lights",
    description:
      "Identify any dashboard warning symbol. Understand what it means, how urgent it is, and what action to take.",
    features: [
      "Critical, warning, and info severity levels",
      "Fix guidance for each symbol",
      "Search by name or symptom",
    ],
    stat: `${allWarningLights.length} symbols`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
  {
    href: "/pages/MaintenancePage",
    title: "Maintenance Guide",
    description:
      "A structured guide to routine vehicle maintenance covering oil, brakes, tires, cooling, and more.",
    features: [
      "When to service each system",
      "DIY vs. professional guidance",
      "What happens if you skip it",
    ],
    stat: "6 service categories",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/pages/MileagePage",
    title: "Mileage Tracker",
    description:
      "Enter your odometer reading to get a personalised list of services that are overdue or coming up soon.",
    features: [
      "Works for new and used vehicles",
      "Enter last service mileage per item",
      "See exactly what is due and when",
    ],
    stat: "5 service checks",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/pages/FindAMechanicPage",
    title: "Find a Mechanic",
    description:
      "Browse local mechanics by specialty, rating, and distance. View contact details and get directions.",
    features: [
      "Filter by city and specialty",
      "Ratings and review counts",
      "Call or get directions in one tap",
    ],
    stat: "6 listings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="pl-12 lg:pl-0">
            <span className="text-sm font-medium text-gray-500">Dashboard</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">

            {/* Intro */}
            <div className="mb-8">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Vehicle Assistant</h1>
              <p className="text-sm text-gray-400">Tools to help you understand, maintain, and service your vehicle.</p>
            </div>

            {/* Tool cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group block">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all h-full flex flex-col">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600 transition-all flex-shrink-0">
                      {tool.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1.5">{tool.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[11px] text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[11px] text-gray-300">{tool.stat}</span>
                      <span className="text-xs font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
                        Open →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
