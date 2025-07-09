"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  {
    label: "🚨 Warning Lights",
    href: "/pages/WarningLightsPage",
    active: true,
    color: "bg-red-400",
  },
  {
    label: "🧠 Ask Speedy AI (Soon)",
    href: "#",
    active: false,
    color: "bg-purple-400",
  },
  {
    label: "🔧 Maintenance Tips (Soon)",
    href: "#",
    active: false,
    color: "bg-green-400",
  },
  {
    label: "📅 Service Scheduler (Soon)",
    href: "#",
    active: false,
    color: "bg-blue-400",
  },
  {
    label: "📊 Mileage Tracker (Soon)",
    href: "#",
    active: false,
    color: "bg-pink-400",
  },
  {
    label: "🔍 Find a Mechanic (Soon)",
    href: "#",
    active: false,
    color: "bg-yellow-400",
  },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-yellow-50 to-white text-center px-4 relative pt-12 pb-16 overflow-hidden">
      {/* Mobile Layout */}
      {isMobile ? (
        <>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-32 h-32 md:w-40 md:h-40 mb-8"
          >
            <div className="relative w-full h-full">
              <img
                src="/subie.jpg"
                alt="Speedie Logo"
                className="w-full h-full rounded-full object-cover border-4 border-yellow-300 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-yellow-200 animate-pulse pointer-events-none" />
            </div>
          </motion.div>

          {/* Stack Buttons */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            {features.map((feature, i) =>
              feature.active ? (
                <Link href={feature.href} key={i}>
                  <button className={`w-full px-6 py-3 ${feature.color} text-white text-sm font-semibold rounded-full shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300`}>
                    {feature.label}
                  </button>
                </Link>
              ) : (
                <button
                  key={i}
                  className={`w-full px-6 py-3 ${feature.color} text-white text-sm font-semibold rounded-full shadow-md cursor-not-allowed opacity-60`}
                >
                  {feature.label}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        // Desktop & Tablet Layout
        <div className="relative w-full max-w-[600px] h-[600px] flex items-center justify-center">
          {/* Center Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute z-10 w-40 h-40"
          >
            <div className="relative w-full h-full">
              <img
                src="/subie.jpg"
                alt="Speedy Logo"
                className="w-full h-full rounded-full object-cover border-4 border-yellow-300 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-yellow-200 animate-pulse pointer-events-none" />
            </div>
          </motion.div>

          {/* Lines and Radial Buttons */}
          {features.map((feature, i) => {
            const angle = (2 * Math.PI * i) / features.length;
            const radius = 200;
            const centerX = 300; // half of container width (600px)
            const centerY = 300; // half of container height (600px)
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            // Line Styles
            const lineStyle = {
              left: `${centerX}px`,
              top: `${centerY}px`,
              width: `${radius}px`,
              transform: `rotate(${(angle * 180) / Math.PI}deg)`,
              transformOrigin: "0 50%",
            };

            const buttonStyle = {
              left: `calc(50% + ${x}px - 90px)`,
              top: `calc(50% + ${y}px - 20px)`,
              width: "180px",
            };

            const base =
              "absolute px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300";

            return (
              <div key={i}>
                {/* Line from center to button */}
                <div
                  className="absolute h-1 bg-gray-300 z-0"
                  style={lineStyle}
                />

                {/* Button */}
                {feature.active ? (
                  <Link href={feature.href}>
                    <button
                      className={`${base} ${feature.color} text-white hover:brightness-110 z-10`}
                      style={buttonStyle}
                    >
                      {feature.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`${base} ${feature.color} text-white opacity-60 cursor-not-allowed z-10`}
                    style={buttonStyle}
                  >
                    {feature.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-400 italic">
        Developed by Ryan Yee
      </div>
    </main>
  );
}
