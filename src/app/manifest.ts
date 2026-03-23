import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elegance Catering",
    short_name: "Elegance",
    description:
      "Vajilla, barra, servicio de mozo, manteleria y servicios para eventos en Zona Norte: cascada de chocolate y robot LED.",
    start_url: "/",
    display: "standalone",
    background_color: "#171827",
    theme_color: "#171827",
    lang: "es-AR",
  };
}
