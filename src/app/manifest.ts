import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elegance Catering",
    short_name: "Elegance",
    description:
      "Servicios seleccionados para eventos en Zona Norte: pack grande de vasijas, fuente de chocolate y robot LED.",
    start_url: "/",
    display: "standalone",
    background_color: "#171827",
    theme_color: "#171827",
    lang: "es-AR",
  };
}
