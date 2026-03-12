"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { allWarningLights, WarningLight } from "./allWarningLights";
import { Sidebar } from "../../components/Sidebar";

const SEV = {
  critical: {
    label: "Critical",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 border border-red-200",
    iconBg: "bg-red-50",
    filterOn: "bg-red-50 text-red-700 border-red-200",
    filterOff: "text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
  },
  warning: {
    label: "Warning",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    iconBg: "bg-amber-50",
    filterOn: "bg-amber-50 text-amber-700 border-amber-200",
    filterOff: "text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
  },
  info: {
    label: "Info",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    iconBg: "bg-blue-50",
    filterOn: "bg-blue-50 text-blue-700 border-blue-200",
    filterOff: "text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700",
  },
} as const;

const tabs = ["Meaning", "Urgency", "Fix Info"] as const;

export default function WarningLightsPage() {
  const [selected, setSelected] = useState<WarningLight | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Meaning");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);

  const visible = allWarningLights.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
    const matchFilter = !filter || l.severity === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    critical: allWarningLights.filter((l) => l.severity === "critical").length,
    warning:  allWarningLights.filter((l) => l.severity === "warning").length,
    info:     allWarningLights.filter((l) => l.severity === "info").length,
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center gap-4 px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex-1 pl-12 lg:pl-0">
            <span className="text-sm font-medium text-gray-500">Warning Lights</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[12px] text-gray-400">
            {(["critical", "warning", "info"] as const).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${SEV[s].dot}`} />
                {counts[s]} {SEV[s].label}
              </span>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">

          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search warning lights..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-400 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {(["critical", "warning", "info"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(filter === s ? null : s)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-semibold transition-colors ${
                    filter === s ? SEV[s].filterOn : SEV[s].filterOff
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${SEV[s].dot}`} />
                  {SEV[s].label}
                </button>
              ))}
            </div>
          </div>

          {(search || filter) && (
            <p className="text-[12px] text-gray-400 mb-4">
              {visible.length} result{visible.length !== 1 ? "s" : ""}
              {search && ` matching "${search}"`}
              {filter && ` · ${SEV[filter as keyof typeof SEV].label} only`}
              <button
                onClick={() => { setSearch(""); setFilter(null); }}
                className="ml-2 text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors"
              >
                Clear
              </button>
            </p>
          )}

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 font-medium">No results</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search or clearing the filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {visible.map((light) => {
                const s = SEV[light.severity];
                return (
                  <button
                    key={light.id}
                    onClick={() => { setSelected(light); setActiveTab("Meaning"); }}
                    className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-150 group text-left cursor-pointer"
                  >
                    <div className={`w-12 h-12 ${s.iconBg} rounded-lg flex items-center justify-center mb-2.5`}>
                      <Image src={light.image} alt={light.name} width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-[11px] font-semibold text-gray-700 text-center leading-tight mb-1.5 line-clamp-2">{light.name}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${s.badge}`}>
                      {light.severity}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="pb-8" />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-white border border-gray-200 w-full max-w-sm rounded-xl overflow-hidden shadow-xl"
            >
              {/* Modal header */}
              <div className="flex items-center gap-4 p-5 border-b border-gray-200">
                <div className={`w-16 h-16 ${SEV[selected.severity].iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Image src={selected.image} alt={selected.name} width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 leading-tight">{selected.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${SEV[selected.severity].badge}`}>
                    {selected.severity}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 px-5">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2.5 text-[12px] font-semibold border-b-2 transition-colors -mb-px ${
                      activeTab === tab
                        ? "text-gray-900 border-gray-900"
                        : "text-gray-400 border-transparent hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    {activeTab === "Meaning" && selected.description}
                    {activeTab === "Urgency" && selected.urgency}
                    {activeTab === "Fix Info" && selected.fixInfo}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
