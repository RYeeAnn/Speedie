"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type WarningLight = {
  id: string;
  name: string;
  description: string;
  severity: "info" | "warning" | "critical";
  image: string;
  urgency: string;
  fixInfo: string;
  videoUrl?: string;
};

const lights: WarningLight[] = [
  {
    id: "abs-light",
    name: "ABS Warning",
    description: "There’s an issue with the Anti-lock Braking System (ABS). Get it inspected soon.",
    severity: "warning",
    image: "/ABS-light.png",
    urgency: "Get it inspected soon, but you can continue driving carefully.",
    fixInfo: "Have a mechanic scan the ABS system. Avoid hard braking.",
    videoUrl: "https://www.youtube.com/watch?v=KT1ax3JuoPo"
  },
  {
    id: "airbag-indicator",
    name: "Airbag Warning",
    description: "There may be an issue with the airbag system. Get it checked immediately.",
    severity: "critical",
    image: "/airbag-indicator.png",
    urgency: "Needs immediate attention. Airbags may not deploy in a crash.",
    fixInfo: "Have a technician run a diagnostic to check airbag sensors and modules.",
    videoUrl: "https://www.youtube.com/watch?v=2olDNq6RYkA"
  },
  {
    id: "battery-alert",
    name: "Battery Alert",
    description: "There may be a problem with your battery or charging system.",
    severity: "warning",
    image: "/battery-alert.png",
    urgency: "Drive to a shop immediately. Your car could stall soon.",
    fixInfo: "Check battery connections and alternator output.",
    videoUrl: "https://www.youtube.com/watch?v=rIgZrF8vW3I"
  },
  {
    id: "brake-warning",
    name: "Brake Warning",
    description: "There’s a brake system problem. Stop the vehicle safely and check.",
    severity: "critical",
    image: "/brake-warning.png",
    urgency: "Stop driving immediately. Brakes could be failing.",
    fixInfo: "Check brake fluid level. Call a tow if the light remains.",
    videoUrl: "https://www.youtube.com/watch?v=Qta5_Kz9f60"
  },
  {
    id: "check-engine-light",
    name: "Check Engine",
    description: "A potential issue with the engine or emissions system. Diagnosis recommended.",
    severity: "warning",
    image: "/check-engine-light.png",
    urgency: "Schedule service soon unless the car drives abnormally.",
    fixInfo: "Use a code reader or visit a mechanic for diagnostics.",
    videoUrl: "https://www.youtube.com/watch?v=2P8N1cKYNhM"
  },
  {
    id: "engine-temperature",
    name: "Engine Temperature",
    description: "The engine is overheating. Stop the vehicle immediately and allow it to cool.",
    severity: "critical",
    image: "/engine-temperature.png",
    urgency: "Pull over immediately to avoid severe engine damage.",
    fixInfo: "Check coolant level. Let engine cool before opening radiator.",
    videoUrl: "https://www.youtube.com/watch?v=WlN50Z5D6JI"
  },
  {
    id: "fog-lamp",
    name: "Fog Lamp Indicator",
    description: "Your front fog lamps are active.",
    severity: "info",
    image: "/fog-lamp.png",
    urgency: "No action needed. This is an informational light.",
    fixInfo: "Turn off fog lights if visibility is clear.",
    videoUrl: "https://www.youtube.com/watch?v=VeGcUCeMO_A"
  },
  {
    id: "lane-departure",
    name: "Lane Departure Warning",
    description: "The car is drifting out of lane without signaling.",
    severity: "warning",
    image: "/lane-departure.png",
    urgency: "Pay attention. System detects unintended lane changes.",
    fixInfo: "Stay alert or recalibrate lane assist system if faulty.",
    videoUrl: "https://www.youtube.com/watch?v=k0n2EeHeTwI"
  },
  {
    id: "low-fuel",
    name: "Low Fuel",
    description: "Fuel is low. You should refuel soon.",
    severity: "info",
    image: "/low-fuel.png",
    urgency: "Fill up your tank as soon as possible.",
    fixInfo: "Drive to the nearest gas station.",
    videoUrl: "https://www.youtube.com/watch?v=DCbyVR4n0zg"
  },
  {
    id: "oil-pressure-light",
    name: "Oil Pressure",
    description: "Low oil pressure. Stop immediately and check the oil level.",
    severity: "critical",
    image: "/oil-pressure-light.png",
    urgency: "Stop driving immediately. Engine damage is likely.",
    fixInfo: "Check oil level. Add oil or call a tow if it persists.",
    videoUrl: "https://www.youtube.com/watch?v=RUu9gLgG8fs"
  },
  {
    id: "seat-belt",
    name: "Seat Belt Reminder",
    description: "A seat belt is unbuckled.",
    severity: "info",
    image: "/seat-belt.png",
    urgency: "Buckle seatbelt immediately.",
    fixInfo: "Ensure all passengers are buckled.",
    videoUrl: "https://www.youtube.com/watch?v=X2UeFJTFxK0"
  },
  {
    id: "security-indicator",
    name: "Security Indicator",
    description: "Car security system is active or there may be an issue with the key.",
    severity: "info",
    image: "/security-indicator.png",
    urgency: "Informational unless the car won’t start.",
    fixInfo: "Try another key or reset the security system.",
    videoUrl: "https://www.youtube.com/watch?v=pbr0uIffYBM"
  },
  {
    id: "shift-lock",
    name: "Shift Lock",
    description: "The brake pedal must be pressed to shift out of Park.",
    severity: "info",
    image: "/shift-lock.png",
    urgency: "Press brake before shifting. No issue if functioning normally.",
    fixInfo: "Check brake light switch if car doesn’t shift.",
    videoUrl: "https://www.youtube.com/watch?v=lUEWzWkk5D8"
  },
  {
    id: "tire-pressure-light",
    name: "Tire Pressure",
    description: "One or more tires may be underinflated.",
    severity: "warning",
    image: "/tire-pressure-light.png",
    urgency: "Check tire pressures soon. Driving on low tires is dangerous.",
    fixInfo: "Inflate tires to the recommended PSI.",
    videoUrl: "https://www.youtube.com/watch?v=gB6k0K9vYd8"
  },
  {
    id: "traction-control-malfunction",
    name: "Traction Control Malfunction",
    description: "There is a malfunction in the traction control system.",
    severity: "warning",
    image: "/traction-control-malfunction.png",
    urgency: "Caution when driving. Reduced traction in poor conditions.",
    fixInfo: "Get the traction control system inspected.",
    videoUrl: "https://www.youtube.com/watch?v=2FZtSEnQf4M"
  },
  {
    id: "traction-control",
    name: "Traction Control Active",
    description: "The traction control system is currently active.",
    severity: "info",
    image: "/traction-control.png",
    urgency: "Informational. System is preventing wheel spin.",
    fixInfo: "Drive normally. No action required.",
    videoUrl: "https://www.youtube.com/watch?v=9MFU5vECoZc"
  },
  {
    id: "transmission-temperature",
    name: "Transmission Temperature",
    description: "Transmission fluid is too hot. Pull over and allow it to cool.",
    severity: "critical",
    image: "/transmission-temperature.png",
    urgency: "Stop driving to cool transmission. Severe damage risk.",
    fixInfo: "Pull over, idle car. Let it cool before continuing.",
    videoUrl: "https://www.youtube.com/watch?v=gcLZd-cj5mQ"
  },
  {
    id: "washer-fluid",
    name: "Low Washer Fluid",
    description: "Windshield washer fluid is low. Refill when convenient.",
    severity: "info",
    image: "/washer-fluid.png",
    urgency: "Not urgent. Refill at your convenience.",
    fixInfo: "Add washer fluid to reservoir under the hood.",
    videoUrl: "https://www.youtube.com/watch?v=HbOBbEjgK70"
  }
];
  
const severityColor = {
    info: "text-blue-500",
    warning: "text-yellow-600",
    critical: "text-red-600",
};
  
export default function WarningLightsPage() {
  const [selectedLight, setSelectedLight] = useState<WarningLight | null>(null);
    const [activeTab, setActiveTab] = useState("Meaning");

  return (
    <main className="min-h-screen px-4 py-6 bg-white relative">
      {/* Back button */}
      <div className="mb-4">
        <Link href="/" passHref>
          <button
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
            aria-label="Go back to home"
          >
            ← Back
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">🚨 Warning Lights</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Tap a light to learn what it means and how urgent it is.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {lights.map((light) => (
          <button
            key={light.id}
            onClick={() => setSelectedLight(light)}
            className="flex flex-col items-center p-3 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <img
              src={light.image}
              alt={light.name}
              className="w-12 h-12 object-contain"
            />
            <p className="text-xs font-semibold mt-2 text-center text-gray-800">{light.name}</p>
            <p className={`text-[10px] mt-1 ${severityColor[light.severity]}`}>
              {light.severity.toUpperCase()}
            </p>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedLight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-11/12 max-w-sm rounded-xl p-6 shadow-xl relative"
            >
            <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                onClick={() => setSelectedLight(null)}
            >
                ×
            </button>

            <div className="flex flex-col items-center">
                <img
                src={selectedLight.image}
                alt={selectedLight.name}
                className="w-14 h-14 mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800 mb-1">{selectedLight.name}</h2>
                <p className={`text-sm font-semibold ${severityColor[selectedLight.severity]} mb-2`}>
                {selectedLight.severity.toUpperCase()}
                </p>

                {/* Tabs */}
                <div className="flex space-x-2 mb-4">
                {["Meaning", "Urgency", "Fix Info"].map((tab) => (
                    <button
                    key={tab}
                    className={`text-sm px-3 py-1 rounded-full border ${
                        activeTab === tab
                        ? "bg-yellow-400 text-white border-yellow-400"
                        : "border-gray-300 text-gray-600"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    >
                    {tab}
                    </button>
                ))}
                </div>

                {/* Tab Content */}
                <div className="text-sm text-gray-600 text-center">
                {activeTab === "Meaning" && <p>{selectedLight.description}</p>}
                {activeTab === "Urgency" && <p>{selectedLight.urgency}</p>}
                {activeTab === "Fix Info" && (
                    <>
                    <p>{selectedLight.fixInfo}</p>
                    {selectedLight.videoUrl && (
                        <a
                        href={selectedLight.videoUrl}
                        target="_blank"
                        className="text-blue-600 underline block mt-2"
                        >
                        Watch a Video
                        </a>
                    )}
                    </>
                )}
                </div>
            </div>
            </motion.div>
        </div>
        )}
    </main>
  );
}