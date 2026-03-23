import { FAQS, EMPRESA, SERVICIOS, type FAQ } from "@/config/data";

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function getSiteUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

  return normalizeSiteUrl(siteUrl);
}

export function absoluteUrl(path = "/"): string {
  const siteUrl = getSiteUrl();
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: EMPRESA.nombre,
    url: absoluteUrl("/"),
    inLanguage: "es-AR",
    description: EMPRESA.descripcion,
  };
}

export function getLocalBusinessSchema() {
  const telephone = onlyDigits(EMPRESA.telefonoWhatsapp)
    ? `+${onlyDigits(EMPRESA.telefonoWhatsapp)}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: EMPRESA.nombre,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    description: EMPRESA.descripcion,
    telephone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Don Torcuato",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    areaServed: EMPRESA.zonasCobertura.map((zona) => ({
      "@type": "City",
      name: zona,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
          "https://schema.org/Saturday",
          "https://schema.org/Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: EMPRESA.redesSociales.instagram
      ? [EMPRESA.redesSociales.instagram]
      : [],
  };
}

export function getServiceSchemas() {
  return SERVICIOS.filter((servicio) => servicio.disponible).map((servicio) => {
    const offer =
      servicio.precioUnitario > 0
        ? {
            "@type": "Offer",
            url: absoluteUrl(`/presupuesto?producto=${servicio.id}`),
            priceCurrency: "ARS",
            availability: "https://schema.org/InStock",
            price: servicio.precioUnitario.toString(),
          }
        : undefined;

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${servicio.nombre} | ${EMPRESA.nombre}`,
      description: servicio.descripcion,
      image: servicio.imagen ? absoluteUrl(servicio.imagen) : undefined,
      provider: {
        "@type": "LocalBusiness",
        name: EMPRESA.nombre,
        url: absoluteUrl("/"),
      },
      areaServed: EMPRESA.zonasCobertura.map((zona) => ({
        "@type": "City",
        name: zona,
      })),
      url: absoluteUrl(`/presupuesto?producto=${servicio.id}`),
      ...(offer ? { offers: offer } : {}),
    };
  });
}

export function getFaqSchema(faqs: FAQ[] = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.respuesta,
      },
    })),
  };
}
