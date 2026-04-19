import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Vínculo Consciente — Sexología y bienestar sexual",
    template: "%s | Vínculo Consciente",
  },
  description:
    "Artículos de sexología, salud sexual y relaciones de pareja. Información basada en evidencia, honesta y sin tabúes.",
  keywords: ["sexología", "vínculo consciente", "salud sexual", "educación sexual", "relaciones de pareja", "bienestar"],
  openGraph: {
    siteName: "SexologíaBlog",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-900">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
