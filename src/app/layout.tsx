import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speedie — Know Your Vehicle",
  description:
    "Speedie helps drivers understand dashboard warning lights, plan vehicle maintenance, track mileage, and find trusted mechanics — all for free. Built for every driver by Ryan Yee.",
  keywords: [
    "warning lights",
    "dashboard lights",
    "car maintenance",
    "vehicle diagnostics",
    "mileage tracker",
    "find a mechanic",
  ],
  authors: [{ name: "Ryan Yee" }],
  openGraph: {
    title: "Speedie — Know Your Vehicle",
    description:
      "Instant clarity on dashboard warning lights. Free, clear, and built for every driver.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
