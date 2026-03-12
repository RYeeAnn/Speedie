"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "../../components/Sidebar";

type Task = { task: string; interval: string; diy: boolean; tip: string };
type Category = { id: string; title: string; description: string; tasks: Task[]; icon: ReactNode };

const categories: Category[] = [
  {
    id: "oil",
    title: "Engine Oil & Fluids",
    description: "Regular oil changes are the single most impactful thing you can do for your engine.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    tasks: [
      { task: "Engine Oil Change",    interval: "Every 5,000–10,000 km (synthetic)",  diy: true,  tip: "Check monthly with the dipstick. Fresh oil is amber; very dark or gritty oil means it is overdue." },
      { task: "Coolant Flush",        interval: "Every 2 years or 40,000 km",          diy: false, tip: "Check the reservoir when cold. Low coolant or the wrong mix causes overheating." },
      { task: "Brake Fluid",          interval: "Every 2 years or 40,000 km",          diy: false, tip: "Brake fluid absorbs moisture over time, which lowers its boiling point and causes brake fade." },
      { task: "Power Steering Fluid", interval: "Check every 12 months",               diy: true,  tip: "Whining or stiff steering is usually the first sign of low power steering fluid." },
      { task: "Transmission Fluid",   interval: "Every 60,000–100,000 km",             diy: false, tip: "Neglected transmission fluid is one of the most common causes of expensive transmission failure." },
    ],
  },
  {
    id: "brakes",
    title: "Brakes",
    description: "Your brakes are your most critical safety system. Never delay brake maintenance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    tasks: [
      { task: "Brake Pad Inspection",     interval: "Every 20,000 km or at any squeal or grinding sound", diy: true,  tip: "You can often see pad thickness through the wheel spokes. Less than 3 mm means replace immediately." },
      { task: "Brake Rotor Check",        interval: "At every pad change",                                diy: false, tip: "Warped or grooved rotors extend stopping distances and cause steering wheel vibration under braking." },
      { task: "Caliper Service",          interval: "Every 60,000 km",                                    diy: false, tip: "A stuck caliper causes uneven wear and can make the car pull to one side under braking." },
      { task: "Parking Brake Adjustment", interval: "Every 2 years",                                      diy: false, tip: "If the handbrake engages at the very top of its travel, it likely needs adjustment." },
    ],
  },
  {
    id: "tires",
    title: "Tires & Wheels",
    description: "Four contact patches connect you to the road. Tyre condition affects safety, grip, and fuel economy.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.75} />
        <circle cx="12" cy="12" r="3" strokeWidth={1.75} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
    tasks: [
      { task: "Tire Pressure Check",  interval: "Monthly and before long trips",                       diy: true,  tip: "Under-inflated tires reduce fuel economy by up to 3% and wear faster. Check when tires are cold." },
      { task: "Tire Rotation",        interval: "Every 10,000–12,000 km",                              diy: false, tip: "Front tires wear faster due to steering. Rotating extends the life of the full set." },
      { task: "Wheel Alignment",     interval: "Annually or after hitting a kerb or pothole",         diy: false, tip: "Misalignment causes uneven tread wear and makes the car pull to one side." },
      { task: "Tread Depth Check",   interval: "Every 3 months",                                      diy: true,  tip: "Legal minimum is 1.6 mm, but replace at 3 mm for safe wet-weather braking. A coin works as a gauge." },
      { task: "Wheel Balance",       interval: "At every tyre rotation or at highway speed vibration", diy: false, tip: "Unbalanced wheels cause vibration at speed and accelerate tyre wear." },
    ],
  },
  {
    id: "engine-air",
    title: "Engine & Air",
    description: "Clean air and a well-timed ignition keep your engine running efficiently.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tasks: [
      { task: "Engine Air Filter", interval: "Every 15,000–25,000 km",                    diy: true,  tip: "A clogged filter reduces power and fuel economy. In dusty environments, replace more often." },
      { task: "Cabin Air Filter",  interval: "Every 12,000–20,000 km",                    diy: true,  tip: "Affects air quality and HVAC efficiency. Musty air from the vents is usually the first sign." },
      { task: "Spark Plugs",       interval: "Every 30,000–100,000 km depending on type",  diy: true,  tip: "Worn plugs cause rough idle, poor fuel economy, and hard starts. Iridium plugs last much longer." },
      { task: "Fuel Filter",       interval: "Every 30,000–50,000 km",                    diy: false, tip: "A clogged fuel filter starves the engine, causing hesitation, stalling, or hard starting." },
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    description: "Modern vehicles depend on a healthy electrical system for starting, safety, and everything in between.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tasks: [
      { task: "Battery Test",      interval: "Every 2 years or at slow cranking",               diy: false, tip: "Most batteries last 3–5 years. Cold weather accelerates discharge. Test before winter." },
      { task: "Terminal Cleaning", interval: "Every 12 months",                                 diy: true,  tip: "White or blue corrosion on terminals increases resistance and can prevent starting." },
      { task: "Alternator Check",  interval: "At battery replacement or at flickering lights",  diy: false, tip: "A failing alternator will drain the battery even while the engine is running." },
      { task: "Fuse Inspection",   interval: "When an accessory stops working",                 diy: true,  tip: "If something electrical suddenly stops, check the fuse box first. It is free to fix." },
    ],
  },
  {
    id: "cooling",
    title: "Cooling System",
    description: "Your engine generates enormous heat. A healthy cooling system prevents overheating damage.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3a2 2 0 002 2h2a2 2 0 002-2M9 3a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    tasks: [
      { task: "Coolant Level",  interval: "Check monthly",               diy: true,  tip: "Only check the reservoir when the engine is cold. Opening a hot radiator cap is dangerous." },
      { task: "Radiator Flush", interval: "Every 2 years or 40,000 km", diy: false, tip: "Old coolant turns acidic and corrodes cooling system components from the inside." },
      { task: "Thermostat",     interval: "Every 50,000–100,000 km",    diy: false, tip: "A stuck thermostat causes overheating or prevents the engine reaching operating temperature." },
      { task: "Radiator Hoses", interval: "Every 2 years",              diy: true,  tip: "Squeeze the hoses when cold. Firm is good. Soft, spongy, or cracked hoses need replacing." },
    ],
  },
];

export default function MaintenancePage() {
  const [open, setOpen] = useState<string | null>("oil");

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="pl-12 lg:pl-0">
            <span className="text-sm font-medium text-gray-500">Maintenance Guide</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto">

            <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-6">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-500 leading-relaxed">
                These are general guidelines. Check your owner manual for manufacturer-recommended intervals specific to your vehicle.
              </p>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => {
                const isOpen = open === cat.id;
                return (
                  <div key={cat.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(isOpen ? null : cat.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-400 flex-shrink-0">{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{cat.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{cat.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[11px] text-gray-300">{cat.tasks.length} checks</span>
                        <svg
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-200 divide-y divide-gray-100">
                            {cat.tasks.map((task, i) => (
                              <div key={i} className="flex items-start gap-4 px-5 py-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                                    <p className="text-sm font-semibold text-gray-800">{task.task}</p>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${
                                      task.diy
                                        ? "bg-gray-100 border-gray-200 text-gray-600"
                                        : "bg-white border-gray-200 text-gray-400"
                                    }`}>
                                      {task.diy ? "DIY OK" : "See a pro"}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mb-2">{task.interval}</p>
                                  <p className="text-xs text-gray-400 leading-relaxed">{task.tip}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="pb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
