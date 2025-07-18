"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

type Tip = {
  title: string;
  description: string;
  category: string;
  link?: string;
};

const maintenanceTips: Tip[] = [
  { title: "🛢️ Oil Change", category: "Engine", description: "Change engine oil every 5,000–7,500 km to keep it running smoothly.", link: "https://www.consumerreports.org/cars/car-maintenance/oil-change-intervals-a1068897194/" },
  { title: "🔋 Battery Check", category: "Electrical", description: "Inspect the battery for corrosion and secure connections." },
  { title: "💨 Tire Pressure", category: "Tires", description: "Check tire pressure monthly and before long trips." },
  { title: "🧼 Air Filter", category: "Engine", description: "Replace air filters every 12,000–15,000 km or yearly." },
  { title: "🧯 Brake Inspection", category: "Brakes", description: "Inspect brakes annually or when you hear squeaking." },
  { title: "💡 Lights Check", category: "Electrical", description: "Test all vehicle lights monthly." },
  { title: "🧊 Coolant Level", category: "Fluids", description: "Check coolant level to avoid overheating." },
  { title: "⚙️ Transmission Fluid", category: "Fluids", description: "Replace fluid every 50,000–100,000 km." },
  { title: "🪫 Alternator Health", category: "Electrical", description: "Ensure the alternator is charging the battery properly." },
  { title: "🧽 Windshield Wipers", category: "Visibility", description: "Replace every 6–12 months." },
  { title: "🛠️ Spark Plugs", category: "Engine", description: "Replace spark plugs every 30,000–50,000 km." },
  { title: "🔧 Timing Belt", category: "Engine", description: "Replace between 96,000–160,000 km." },
  { title: "🧼 Cabin Air Filter", category: "Comfort", description: "Replace yearly for clean interior air." },
  { title: "🛞 Wheel Alignment", category: "Tires", description: "Check yearly to reduce tire wear." },
  { title: "🛠️ Fuel System", category: "Engine", description: "Clean fuel system to improve performance." },
  { title: "🧰 Power Steering Fluid", category: "Fluids", description: "Top off or change around 80,000 km." },
  { title: "🧯 Emergency Kit", category: "Safety", description: "Include jumper cables, flashlight, and first aid." },
  { title: "📆 Scheduled Service", category: "General", description: "Follow your car’s factory service schedule." },
  { title: "🧊 AC System Check", category: "Comfort", description: "Inspect AC system yearly for cooling." },
  { title: "🪞 Mirrors & Windows", category: "Visibility", description: "Keep mirrors and glass clean." },
  { title: "🪛 Lug Nuts Torque", category: "Tires", description: "Check torque after wheel service." },
  { title: "🛢️ Differential Fluid", category: "Fluids", description: "Change for AWD/4WD per schedule." },
  { title: "🔌 Battery Terminals", category: "Electrical", description: "Clean to prevent corrosion." },
  { title: "🛠️ Underbody Wash", category: "General", description: "Wash undercarriage after winter or off-roading." },
  { title: "🔒 Lock Lubrication", category: "General", description: "Lubricate door locks and hinges regularly." },
];

const categories = ["All", ...new Set(maintenanceTips.map(t => t.category))];

export default function MaintenancePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [checkedTips, setCheckedTips] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("checkedTips");
    if (saved) setCheckedTips(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("checkedTips", JSON.stringify(checkedTips));
  }, [checkedTips]);

  const toggleChecked = (title: string) => {
    setCheckedTips(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const filteredTips = maintenanceTips.filter(
    tip =>
      (selectedCategory === "All" || tip.category === selectedCategory) &&
      tip.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-900 py-10 px-4 md:px-12">

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

      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-yellow-600">
        🧰 Maintenance Tips
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-full border text-sm font-medium transition",
              selectedCategory === cat
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search maintenance tips..."
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredTips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className={clsx(
              "rounded-xl border-l-4 shadow-md px-5 py-4 relative bg-white hover:shadow-lg transition cursor-pointer",
              {
                "border-yellow-500": tip.category === "General",
                "border-green-500": tip.category === "Engine",
                "border-blue-500": tip.category === "Fluids",
                "border-purple-500": tip.category === "Comfort",
                "border-red-500": tip.category === "Brakes",
                "border-pink-500": tip.category === "Electrical",
                "border-gray-500": tip.category === "Tires",
                "border-cyan-500": tip.category === "Visibility",
                "border-black": tip.category === "Safety",
              }
            )}
            onClick={() => toggleChecked(tip.title)}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className={clsx("font-semibold text-lg", checkedTips.includes(tip.title) && "line-through text-gray-400")}>
                {tip.title}
              </h2>
              <input
                type="checkbox"
                checked={checkedTips.includes(tip.title)}
                onChange={() => toggleChecked(tip.title)}
                className="w-5 h-5 text-yellow-500 accent-yellow-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <p className="mt-2 text-sm text-gray-700">{tip.description}</p>
            {tip.link && (
              <a
                href={tip.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-600 mt-2 inline-block hover:underline"
                onClick={e => e.stopPropagation()}
              >
                Learn more →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
