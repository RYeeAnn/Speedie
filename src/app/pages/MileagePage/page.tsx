"use client";

import Link from "next/link";
import { useState } from "react";

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
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-6 text-gray-900 relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition bg-white/80 px-2 py-1 rounded shadow" aria-label="Go back to home">
          ← Back
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">
          📊 Mileage Tracker
        </h1>

        {!carType ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200 text-center">
            <p className="mb-4 font-semibold">Is your car brand new or used?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleCarTypeSelect("new")}
                className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition"
              >
                🆕 Brand New
              </button>
              <button
                onClick={() => handleCarTypeSelect("used")}
                className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                🔁 Used Car
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200 mb-8">
              <label className="block mb-2 font-semibold">Current Odometer (km):</label>
              <input
                type="number"
                className="w-full border rounded-md px-4 py-2 mb-4 focus:ring-pink-300 focus:outline-none"
                placeholder="e.g. 150000"
                value={currentMileage ?? ""}
                onChange={(e) => setCurrentMileage(parseInt(e.target.value))}
              />

              {carType === "used" && (
                <>
                  <h2 className="text-lg font-semibold mb-3">Recent Maintenance</h2>
                  {maintenanceItems.map((item) => (
                    <div key={item.id} className="mb-4">
                      <label className="block text-sm">{item.title} - Last done at (km):</label>
                      <input
                        type="number"
                        className="w-full border rounded-md px-4 py-2 mt-1 focus:ring-pink-300 focus:outline-none"
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
                </>
              )}

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition"
              >
                Get Recommendations
              </button>

              <button
                onClick={() => setCarType(null)}
                className="w-full mt-4 text-sm text-gray-500 underline hover:text-gray-700"
              >
                ← Go Back
              </button>
            </div>

            {submitted && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-pink-300">
                <h2 className="text-xl font-bold text-pink-500 mb-4">🔔 Maintenance Suggestions</h2>

                {recommendations.length === 0 ? (
                  <p className="text-gray-600">🎉 Everything looks good! No immediate actions needed.</p>
                ) : (
                  <ul className="space-y-4">
                    {recommendations.map((item) => {
                      const last = lastService[item.id] ?? 0;
                      const dueAt = last + item.frequency;

                      return (
                        <li key={item.id} className="p-4 bg-pink-50 border border-pink-200 rounded-md">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-700">{item.description}</p>
                          <p className="text-xs mt-1 text-gray-500">🔧 Due at ~{dueAt.toLocaleString()} km</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
