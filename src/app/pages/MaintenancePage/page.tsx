"use client";

import { useState } from "react";
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
  { title: "🛢️ Oil Change", category: "Engine", description: "Change your engine oil every 5,000–7,500 km (or as recommended by your manufacturer). Use the correct oil type and viscosity. Warm up the engine, drain the old oil, replace the oil filter, and fill with new oil to the proper level. Check for leaks after starting the engine.", link: "https://www.consumerreports.org/cars/car-maintenance/oil-change-intervals-a1068897194/" },
  { title: "🔋 Battery Check", category: "Electrical", description: "Inspect the battery terminals for corrosion and ensure connections are tight. Clean terminals with a wire brush and baking soda solution if needed. Test battery voltage regularly and replace if it struggles to start your car." },
  { title: "💨 Tire Pressure", category: "Tires", description: "Check tire pressure monthly and before long trips using a reliable gauge. Inflate tires to the recommended PSI (found on the driver’s door jamb or manual). Don’t forget the spare! Under- or over-inflated tires wear unevenly and reduce safety." },
  { title: "🧼 Air Filter", category: "Engine", description: "Replace the engine air filter every 12,000–15,000 km or yearly. Remove the old filter and install a new one in the airbox. A clean filter improves fuel economy and engine life." },
  { title: "🧯 Brake Inspection", category: "Brakes", description: "Inspect brake pads, rotors, and fluid annually or if you hear squeaking/grinding. Replace pads if worn below 3mm. Check fluid level and top up with the correct type if low. Have a mechanic inspect for leaks or uneven wear." },
  { title: "💡 Lights Check", category: "Electrical", description: "Test all exterior and interior lights monthly. Replace burnt-out bulbs promptly. Clean lenses for maximum visibility. Check brake, turn, and hazard lights with a helper or by reflection." },
  { title: "🧊 Coolant Level", category: "Fluids", description: "Check coolant level in the reservoir when the engine is cold. Top up with the correct coolant mix if low. Inspect hoses for leaks or cracks. Flush and replace coolant as per your manual (usually every 2–5 years)." },
  { title: "⚙️ Transmission Fluid", category: "Fluids", description: "Check automatic transmission fluid with the engine running and warm (if your car has a dipstick). Fluid should be pinkish and not smell burnt. Change fluid and filter every 50,000–100,000 km or as recommended." },
  { title: "🪫 Alternator Health", category: "Electrical", description: "If you notice dimming lights or slow cranking, have your alternator tested. Listen for whining noises. Replace the alternator if it fails to charge the battery properly." },
  { title: "🧽 Windshield Wipers", category: "Visibility", description: "Replace wiper blades every 6–12 months or if they streak/chatter. Clean the windshield and blades regularly. Top up washer fluid with a proper solution, not just water." },
  { title: "🛠️ Spark Plugs", category: "Engine", description: "Replace spark plugs every 30,000–50,000 km (copper) or up to 160,000 km (iridium/platinum). Use the correct gap and torque. Bad plugs cause misfires, poor fuel economy, and hard starts." },
  { title: "🔧 Timing Belt", category: "Engine", description: "Replace the timing belt between 96,000–160,000 km or as specified. A failed belt can destroy your engine. Have a mechanic inspect for cracks or wear if unsure." },
  { title: "🧼 Cabin Air Filter", category: "Comfort", description: "Replace the cabin air filter yearly or if airflow is weak. Usually located behind the glove box. A clean filter improves air quality and HVAC performance." },
  { title: "🛞 Wheel Alignment", category: "Tires", description: "Check alignment yearly or if the car pulls to one side. Misalignment causes uneven tire wear and poor handling. Have a shop adjust toe, camber, and caster as needed." },
  { title: "🛠️ Fuel System", category: "Engine", description: "Use quality fuel and add a fuel system cleaner every 10,000–20,000 km. Replace the fuel filter as recommended. Clean injectors if you notice rough idling or hesitation." },
  { title: "🧰 Power Steering Fluid", category: "Fluids", description: "Check power steering fluid level monthly. Top up with the correct fluid if low. If you hear whining or feel heavy steering, have the system checked for leaks." },
  { title: "🧯 Emergency Kit", category: "Safety", description: "Keep a kit with jumper cables, flashlight, first aid, water, and basic tools in your car. Check and refresh supplies every 6 months. Store in an accessible location." },
  { title: "📆 Scheduled Service", category: "General", description: "Follow your car’s factory service schedule for oil, filters, fluids, and inspections. Log all maintenance in a notebook or app. Regular service prevents breakdowns and preserves value." },
  { title: "🧊 AC System Check", category: "Comfort", description: "Test your AC before hot weather. If cooling is weak, check refrigerant level and inspect for leaks. Run the AC for 10 minutes monthly, even in winter, to keep seals lubricated." },
  { title: "🪞 Mirrors & Windows", category: "Visibility", description: "Clean mirrors and windows inside and out with glass cleaner. Repair chips or cracks promptly. Adjust mirrors for maximum rear and side visibility before driving." },
  { title: "🪛 Lug Nuts Torque", category: "Tires", description: "After wheel service, re-torque lug nuts to the correct spec after 50–100 km. Use a torque wrench, not an impact gun. Prevents wheel loss and uneven brake rotor wear." },
  { title: "🛢️ Differential Fluid", category: "Fluids", description: "Change differential fluid for AWD/4WD vehicles as per the manual (often every 50,000–100,000 km). Use the correct type and check for leaks at the seals." },
  { title: "🔌 Battery Terminals", category: "Electrical", description: "Clean battery terminals with a wire brush and baking soda solution. Apply dielectric grease to prevent corrosion. Check for tight, secure connections." },
  { title: "🛠️ Underbody Wash", category: "General", description: "Wash the undercarriage after winter or off-roading to remove salt, mud, and debris. Prevents rust and corrosion. Use a hose or drive-through car wash with underbody spray." },
  { title: "🔒 Lock Lubrication", category: "General", description: "Lubricate door locks, hinges, and latches with silicone spray or graphite powder every 6 months. Prevents sticking and wear." },
];

const categories = ["All", ...new Set(maintenanceTips.map(t => t.category))];

export default function MaintenancePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTips = maintenanceTips.filter(
    tip =>
      (selectedCategory === "All" || tip.category === selectedCategory) &&
      tip.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-10 px-6 text-gray-900 relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition bg-white/80 px-2 py-1 rounded shadow" aria-label="Go back to home">
          ← Back
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
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className={"font-semibold text-lg"}>{tip.title}</h2>
            </div>
            <p className="mt-2 text-sm text-gray-700">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
