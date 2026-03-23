import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import { EMPRESA } from "@/config/data";
import {
  absoluteUrl,
  getLocalBusinessSchema,
  getServiceSchemas,
  getSiteUrl,
  getWebsiteSchema,
  serializeJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${EMPRESA.nombre} | Vajilla, barra, mozos, manteleria, cascada de chocolate y robot LED`,
    template: `%s | ${EMPRESA.nombre}`,
  },
  description: EMPRESA.descripcion,
  applicationName: EMPRESA.nombre,
  keywords: [
    "alquiler de vajilla zona norte",
    "alquiler de cristaleria zona norte",
    "alquiler de barra zona norte",
    "servicio de mozo zona norte",
    "mozos para eventos zona norte",
    "alquiler de manteleria zona norte",
    "copas para eventos zona norte",
    "platos para eventos zona norte",
    "cascada de chocolate zona norte",
    "fuente de chocolate zona norte",
    "robot led eventos zona norte",
    "eventos don torcuato",
    "alquiler eventos zona norte",
    "animacion eventos zona norte",
  ],
  openGraph: {
    title: `${EMPRESA.nombre} | Alquiler para eventos en Zona Norte`,
    description: EMPRESA.descripcion,
    siteName: EMPRESA.nombre,
    locale: "es_AR",
    type: "website",
    url: absoluteUrl("/"),
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${EMPRESA.nombre} | Servicios para eventos en Zona Norte`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EMPRESA.nombre} | Servicios para eventos en Zona Norte`,
    description: EMPRESA.descripcion,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#171827",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    getWebsiteSchema(),
    getLocalBusinessSchema(),
    ...getServiceSchemas(),
  ];

  return (
    <html
      lang="es-AR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {structuredData.map((item, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
          />
        ))}
        <Header />
        <main className="flex-1 pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsappButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
