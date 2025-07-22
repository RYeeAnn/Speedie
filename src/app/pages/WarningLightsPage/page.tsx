"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { allWarningLights, WarningLight } from "./allWarningLights";

const severityColor = {
    info: "text-blue-500",
    warning: "text-yellow-600",
    critical: "text-red-600",
};
  
export default function WarningLightsPage() {
  const [selectedLight, setSelectedLight] = useState<WarningLight | null>(null);
    const [activeTab, setActiveTab] = useState("Meaning");
    const [search, setSearch] = useState("");
    const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  // Filter lights by search and severity
  const filteredLights = allWarningLights.filter((light) => {
    const matchesSearch =
      light.name.toLowerCase().includes(search.toLowerCase()) ||
      light.description.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity = severityFilter ? light.severity === severityFilter : true;
    return matchesSearch && matchesSeverity;
  });

  return (
    <main className="min-h-screen px-4 py-6 bg-gradient-to-b from-yellow-50 to-white relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition bg-white/80 px-2 py-1 rounded shadow" aria-label="Go back to home">
          ← Back
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">🚨 Warning Lights</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Tap a light to learn what it means and how urgent it is.
      </p>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search warning lights..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm w-full sm:w-64 bg-white placeholder-black text-black text-sm placeholder:text-sm"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          {["info", "warning", "critical"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(severityFilter === sev ? null : sev)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                severityFilter === sev
                  ? `${severityColor[sev as keyof typeof severityColor]} bg-yellow-100 border-yellow-400`
                  : "border-gray-300 text-gray-600 bg-white"
              }`}
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredLights.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">No warning lights found.</p>
        ) : (
          filteredLights.map((light) => (
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
          ))
        )}
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