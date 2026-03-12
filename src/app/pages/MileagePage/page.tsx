"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../../components/Sidebar";

type MaintenanceItem = {
  id: string;
  title: string;
  description: string;
  frequency: number;
};

const maintenanceItems: MaintenanceItem[] = [
  { id: "oil",    title: "Oil Change",         description: "Change your oil to keep the engine healthy and lubricated.",              frequency: 10000 },
  { id: "brakes", title: "Brake Inspection",   description: "Inspect brake pads, rotors, and fluid levels for safe stopping.",        frequency: 20000 },
  { id: "air",    title: "Air Filter",         description: "Replace the engine air filter for optimal airflow and performance.",      frequency: 15000 },
  { id: "trans",  title: "Transmission Fluid", description: "Flush and replace transmission fluid to protect the gearbox.",           frequency: 50000 },
  { id: "plugs",  title: "Spark Plugs",        description: "Replace spark plugs to maintain ignition performance and fuel economy.", frequency: 40000 },
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
      return currentMileage >= last + item.frequency - 1500;
    });
    setRecommendations(upcomingTasks);
    setSubmitted(true);
  };

  const handleCarTypeSelect = (type: "new" | "used") => {
    setCarType(type);
    setCurrentMileage(null);
    setSubmitted(false);
    setRecommendations([]);
    if (type === "new") {
      const defaults: Record<string, number> = {};
      maintenanceItems.forEach((item) => { defaults[item.id] = 0; });
      setLastService(defaults);
    } else {
      setLastService({});
    }
  };

  const handleReset = () => {
    setCarType(null);
    setCurrentMileage(null);
    setSubmitted(false);
    setRecommendations([]);
    setLastService({});
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex-1 pl-12 lg:pl-0">
            <span className="text-sm font-medium text-gray-500">Mileage Tracker</span>
          </div>
          {carType && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Start over
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-2xl mx-auto">

            <AnimatePresence mode="wait">
              {!carType ? (
                <motion.div
                  key="select-type"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of vehicle?</h2>
                    <p className="text-sm text-gray-500">This determines how we calculate your maintenance schedule.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleCarTypeSelect("new")}
                      className="group flex flex-col items-start gap-2 p-5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm rounded-xl transition-all text-left"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Brand New</p>
                        <p className="text-xs text-gray-400 mt-0.5">0 km, fresh off the lot</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCarTypeSelect("used")}
                      className="group flex flex-col items-start gap-2 p-5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm rounded-xl transition-all text-left"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1 1h1m8-1h6l1-1v-5a1 1 0 00-1-1h-6m-2 7H7" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Used / Existing</p>
                        <p className="text-xs text-gray-400 mt-0.5">Has some mileage on it</p>
                      </div>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Odometer input */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Current odometer reading
                    </label>
                    <p className="text-xs text-gray-400 mb-4">Enter your current odometer reading in kilometres.</p>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 text-base placeholder-gray-400 focus:border-gray-400 transition-colors"
                        placeholder="e.g. 75000"
                        value={currentMileage ?? ""}
                        onChange={(e) => {
                          setCurrentMileage(e.target.value ? parseInt(e.target.value) : null);
                          setSubmitted(false);
                        }}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">km</span>
                    </div>
                  </div>

                  {/* Service history for used cars */}
                  {carType === "used" && (
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <p className="text-sm font-semibold text-gray-800 mb-1">Service history</p>
                      <p className="text-xs text-gray-400 mb-4">Enter the mileage when each service was last done. Leave blank if unknown.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {maintenanceItems.map((item) => (
                          <div key={item.id}>
                            <label className="block text-xs font-medium text-gray-500 mb-1.5">{item.title}</label>
                            <div className="relative">
                              <input
                                type="number"
                                min={0}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-400 transition-colors"
                                placeholder="km"
                                value={lastService[item.id] ?? ""}
                                onChange={(e) =>
                                  setLastService({ ...lastService, [item.id]: parseInt(e.target.value) || 0 })
                                }
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">km</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={currentMileage === null || currentMileage < 0}
                    className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-colors"
                  >
                    Get recommendations
                  </button>

                  {/* Results */}
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                          <div className="px-5 py-4 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-800">Maintenance recommendations</p>
                            <p className="text-xs text-gray-400 mt-0.5">Based on {currentMileage?.toLocaleString()} km</p>
                          </div>

                          <div className="p-5">
                            {recommendations.length === 0 ? (
                              <div className="text-center py-6">
                                <svg className="w-8 h-8 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-semibold text-gray-700">All good</p>
                                <p className="text-xs text-gray-400 mt-1">No immediate maintenance needed at this mileage.</p>
                              </div>
                            ) : (
                              <div className="divide-y divide-gray-100">
                                {recommendations.map((item) => {
                                  const last = lastService[item.id] ?? 0;
                                  const dueAt = last + item.frequency;
                                  const overdue = currentMileage !== null && currentMileage > dueAt;
                                  return (
                                    <div key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${overdue ? "bg-red-500" : "bg-gray-400"}`} />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 flex-wrap mb-0.5">
                                          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border flex-shrink-0 ${
                                            overdue
                                              ? "bg-red-50 border-red-200 text-red-600"
                                              : "bg-gray-100 border-gray-200 text-gray-500"
                                          }`}>
                                            {overdue ? "Overdue" : "Due soon"}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-400">{item.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          Due at ~{dueAt.toLocaleString()} km
                                          {overdue && ` · ${(currentMileage! - dueAt).toLocaleString()} km past due`}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
