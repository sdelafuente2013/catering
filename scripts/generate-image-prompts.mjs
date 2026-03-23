import { readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { EMPRESA, CATEGORIAS, SERVICIOS } = require("../src/config/data.ts");

const OUTPUT_PATH = path.join(
  process.cwd(),
  "docs",
  "prompts-imagenes-productos.md"
);

const GLOBAL_DIRECTION = [
  "Use a premium event-rental visual language for a Buenos Aires catering brand.",
  "Keep the result hyper-realistic and commercially usable for a website catalog.",
  "Prefer a warm neutral palette with ivory, champagne, soft gold and deep navy accents that match Elegance Catering.",
  "Avoid visible logos, watermarks, over-stylized AI artifacts, distorted geometry, duplicated objects and cluttered backgrounds.",
].join(" ");

const NEGATIVE_PROMPT = [
  "logos",
  "watermarks",
  "text overlay",
  "deformed objects",
  "duplicated items",
  "warped glass",
  "cheap plastic finish",
  "messy background",
  "harsh direct flash",
  "low resolution",
  "oversaturated colors",
  "extra hands",
  "people looking at camera",
].join(", ");

const SERVICE_PROMPT_OVERRIDES = {
  "barra-movil": {
    context:
      "Style it as a premium staffed mobile bar service for events, with a luminous bar front, assorted cocktail glassware, personalized jars and elegant reception styling.",
    composition:
      "Show the full bar service clearly as one complete setup, with the illuminated bar as hero and enough supporting glassware and service context to communicate that this is a complete event service, not just furniture.",
    extraLines: [
      "Important: this is not rented as a standalone bar counter. It must look like a complete bar service with staff-ready setup, cocktail presentation and optional beverage service.",
    ],
  },
  "mantel-redondo": {
    composition:
      "Show the round 3-meter tablecloth as the main hero with a clear fall, visible drape and elegant event styling. Avoid making chair covers, runners or centerpieces the main focus.",
    extraLines: [
      "Important: the round tablecloth itself must be the hero. Keep chair covers, bows and table runners secondary so the product reads clearly as Mantel Redondo 3 m.",
    ],
  },
  "servicio-mozo": {
    context:
      "Style it as a premium waiter service for events, with elegant hospitality posture, polished uniform styling and refined reception or table-service atmosphere.",
    composition:
      "Show the waiter service clearly with professional presentation, service tray or table-support context and enough event styling to read as an active hospitality service, not a fashion portrait.",
    extraLines: [
      "Important: this is a hospitality service for events. The image must communicate attentive event service, not restaurant advertising or a studio portrait.",
    ],
  },
};

const RECOMMENDED_REFRESHES = [
  {
    id: "mantel-redondo",
    reason:
      "La imagen actual funciona y ya esta publicada, pero comunica tambien camino, cubre sillas y lazos. Una version mas enfocada en el mantel redondo ayudaria a diferenciar mejor cada producto de manteleria.",
  },
  {
    id: "servicio-mozo",
    reason:
      "La imagen actual se ve bien, pero esta en formato horizontal mientras este servicio tambien se usa como tarjeta de producto. Una nueva version vertical 4:5 quedaria mas consistente con el resto del catalogo.",
  },
];

const CATEGORY_GUIDES = {
  "vajilla-cristaleria": {
    composition:
      "Show the product with clear scale, refined composition and enough table context to understand its use within an event setup.",
    context:
      "Style it on a premium table, reception setup, buffet or coffee station with realistic event staging and refined materials.",
    categoryPrompt:
      "Elegant table setting with plates, glasses, cutlery and service pieces for events, premium styling, soft editorial lighting and upscale catering mood.",
  },
  "barra-bebidas": {
    composition:
      "Show the product with clear scale, clean staging and enough beverage or service context to understand how it works at an event.",
    context:
      "Style it in a premium cocktail bar setup, beverage station or reception area with realistic event styling, polished materials and event-ready glassware.",
    categoryPrompt:
      "Premium staffed mobile bar service for events, elegant cocktail setup, luminous bar front, polished hospitality atmosphere and realistic glassware styling.",
  },
  manteleria: {
    composition:
      "Show the textile with clear drape, texture and enough table or chair context to understand how it dresses the event setup.",
    context:
      "Style it in a premium event table setting with realistic folds, elegant staging and refined color harmony.",
    categoryPrompt:
      "Premium event linen styling with dressed tables, elegant folds, refined textures and polished wedding-catering atmosphere.",
  },
  "personal-servicio": {
    composition:
      "Show the service with a clear hospitality focal point, polished uniform styling, elegant posture and enough event context to communicate attentive staff support.",
    context:
      "Style it in a premium reception or table-service environment with believable staff-ready staging, refined event atmosphere and discreet guest context.",
    categoryPrompt:
      "Premium waiter service for events, polished hospitality atmosphere, elegant reception styling and believable service presence.",
  },
  fuentes: {
    composition:
      "Hero shot with the station fully assembled, appetizing presentation, layered depth and a clear focal point on the service centerpiece.",
    context:
      "Show abundance, celebration and polished catering presentation without making the frame feel crowded.",
    categoryPrompt:
      "Celebration centerpiece for catered events, abundant but elegant styling, polished dessert and beverage service, luxury party atmosphere.",
  },
  animacion: {
    composition:
      "Show the full character with readable silhouette, strong vertical framing, dynamic pose and enough event context to communicate live entertainment.",
    context:
      "Place the performer in a premium party or event environment with guests blurred in the background, energetic lighting and believable staging.",
    categoryPrompt:
      "High-impact robot LED entertainment for events, cinematic party atmosphere, premium production feel, colorful glow and celebratory energy.",
  },
  default: {
    composition:
      "Show the product with clear scale, balanced framing and enough event context to understand how it is used.",
    context:
      "Place it in a premium event environment with realistic styling, clean composition and believable materials.",
    categoryPrompt:
      "Premium event rental product, polished staging, warm editorial lighting and commercially usable realism.",
  },
};

function collectAvailableImages(dirPath, baseUrl, collected) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(dirPath, entry.name);
    const publicPath = path.posix.join(baseUrl, entry.name);

    if (entry.isDirectory()) {
      collectAvailableImages(absolutePath, publicPath, collected);
      continue;
    }

    collected.push(publicPath);
  }
}

function getAvailableImageSet() {
  const publicImagesRoot = path.join(process.cwd(), "public", "images");
  const collected = [];

  collectAvailableImages(publicImagesRoot, "/images", collected);

  return new Set(collected);
}

const availableImages = getAvailableImageSet();

function isPendingImage(imagePath) {
  return !availableImages.has(imagePath);
}

function punctuate(value) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function buildAlt(servicio) {
  return `${servicio.nombre} para alquiler para eventos`;
}

function buildServicePrompt(servicio) {
  const guide = CATEGORY_GUIDES[servicio.categoriaId] ?? CATEGORY_GUIDES.default;
  const override = SERVICE_PROMPT_OVERRIDES[servicio.id];
  const details = servicio.detalles.length
    ? `Key details to preserve: ${servicio.detalles.join(", ")}.`
    : "";

  return [
    `Create a premium commercial product photograph for ${EMPRESA.nombre}.`,
    `Hero product: ${servicio.nombre}.`,
    `Product description: ${punctuate(servicio.descripcion)}`,
    details,
    `Scene direction: ${override?.context ?? guide.context}`,
    `Composition: ${override?.composition ?? guide.composition}`,
    "Lighting: soft natural light mixed with diffused studio fill, realistic shadows, crisp edges, luxury editorial quality.",
    "Style: hyper-realistic event catalog photography, tasteful background blur, realistic materials, polished but believable styling.",
    ...(override?.extraLines ?? []),
    GLOBAL_DIRECTION,
    "Output: vertical 4:5 image, website-ready, sharp, detailed, no text in the frame.",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildCategoryPrompt(categoria) {
  const guide = CATEGORY_GUIDES[categoria.id] ?? CATEGORY_GUIDES.default;

  return [
    `Create a premium hero image that represents the category "${categoria.nombre}" for ${EMPRESA.nombre}.`,
    `Category description: ${punctuate(categoria.descripcion)}`,
    `Scene direction: ${guide.categoryPrompt}`,
    `Composition: ${guide.composition}`,
    "Lighting: soft editorial lighting with warm highlights, realistic textures and premium event atmosphere.",
    GLOBAL_DIRECTION,
    "Output: cinematic horizontal 16:9 image for website section headers, no text in the frame.",
  ].join(" ");
}

const categoriasPendientes = CATEGORIAS.filter((categoria) =>
  isPendingImage(categoria.imagen)
);
const serviciosPendientes = SERVICIOS.filter((servicio) =>
  isPendingImage(servicio.imagen)
);
const refrescosRecomendados = RECOMMENDED_REFRESHES.map((item) => ({
  ...item,
  servicio: SERVICIOS.find((servicio) => servicio.id === item.id),
})).filter((item) => item.servicio);

const pendingNegativePromptParts = [
  NEGATIVE_PROMPT,
  ...serviciosPendientes.flatMap(
    (servicio) => SERVICE_PROMPT_OVERRIDES[servicio.id]?.negativeAdditions ?? []
  ),
];

const pendingNegativePrompt = [...new Set(pendingNegativePromptParts.join(", ").split(", ").filter(Boolean))].join(", ");

const lines = [
  "# Prompts de Imagenes Pendientes",
  "",
  `Generado automaticamente a partir de [src/config/data.ts](/Users/santiago/WebstormProjects/catering/src/config/data.ts).`,
  "",
  "Este documento solo incluye las imagenes que todavia faltan generar para que la web las tome automaticamente.",
  "",
  "## Resumen",
  "",
  `- Categorias pendientes: ${categoriasPendientes.length}`,
  `- Productos pendientes: ${serviciosPendientes.length}`,
  "",
  "## Direccion visual",
  "",
  "- Mantener una linea premium, elegante y realista, coherente con la marca Elegance Catering.",
  "- Para productos individuales usar encuadre vertical 4:5.",
  "- Para categorias usar encuadre horizontal 16:9.",
  "- Subir los archivos finales respetando las rutas ya definidas en el catalogo para que la web los tome automaticamente.",
  "- Si el generador permite un campo separado, usar el negative prompt comun al final de este documento.",
];

if (categoriasPendientes.length > 0) {
  lines.push("");
  lines.push("## Prompts para Categorias");
  lines.push("");

  for (const categoria of categoriasPendientes) {
    lines.push(`### ${categoria.nombre}`);
    lines.push("");
    lines.push(`- Ruta sugerida: \`public${categoria.imagen}\``);
    lines.push("- Formato recomendado: `1600x900` o superior");
    lines.push("");
    lines.push("```text");
    lines.push(buildCategoryPrompt(categoria));
    lines.push("```");
    lines.push("");
  }
}

if (serviciosPendientes.length > 0) {
  lines.push("");
  lines.push("## Prompts para Productos");
  lines.push("");

  for (const categoria of CATEGORIAS) {
    const servicios = serviciosPendientes.filter(
      (servicio) => servicio.categoriaId === categoria.id
    );

    if (servicios.length === 0) {
      continue;
    }

    lines.push(`### ${categoria.nombre}`);
    lines.push("");

    for (const servicio of servicios) {
      lines.push(`#### ${servicio.nombre}`);
      lines.push("");
      lines.push(`- ID: \`${servicio.id}\``);
      lines.push(`- Ruta sugerida: \`public${servicio.imagen}\``);
      lines.push("- Formato recomendado: `1536x1920` o superior");
      lines.push(`- Alt sugerido: \`${buildAlt(servicio)}\``);
      if (SERVICE_PROMPT_OVERRIDES[servicio.id]?.retryPrompt) {
        lines.push(
          `- Prompt de refuerzo: \`${SERVICE_PROMPT_OVERRIDES[servicio.id].retryPrompt}\``
        );
      }
      lines.push("");
      lines.push("```text");
      lines.push(buildServicePrompt(servicio));
      lines.push("```");
      lines.push("");
    }
  }
}

if (categoriasPendientes.length === 0 && serviciosPendientes.length === 0) {
  lines.push("");
  lines.push("## Estado");
  lines.push("");
  lines.push("No hay imagenes pendientes en este momento.");
  lines.push("");
}

if (refrescosRecomendados.length > 0) {
  lines.push("## Regeneracion Recomendada");
  lines.push("");
  lines.push(
    "Estas imagenes ya existen y la web funciona con ellas, pero conviene regenerarlas si quieres dejar el catalogo mas fino y consistente."
  );
  lines.push("");

  for (const item of refrescosRecomendados) {
    const servicio = item.servicio;
    lines.push(`### ${servicio.nombre}`);
    lines.push("");
    lines.push(`- ID: \`${servicio.id}\``);
    lines.push(`- Ruta actual: \`public${servicio.imagen}\``);
    lines.push(`- Motivo: ${item.reason}`);
    lines.push("- Formato recomendado: `1536x1920` o superior");
    lines.push(`- Alt sugerido: \`${buildAlt(servicio)}\``);
    lines.push("");
    lines.push("```text");
    lines.push(buildServicePrompt(servicio));
    lines.push("```");
    lines.push("");
  }
}

if (categoriasPendientes.length > 0 || serviciosPendientes.length > 0) {
  lines.push("## Negative Prompt Comun");
  lines.push("");
  lines.push("```text");
  lines.push(pendingNegativePrompt);
  lines.push("```");
  lines.push("");
} else if (refrescosRecomendados.length > 0) {
  lines.push("## Negative Prompt Comun");
  lines.push("");
  lines.push("```text");
  lines.push(NEGATIVE_PROMPT);
  lines.push("```");
  lines.push("");
}

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${lines.join("\n")}\n`, "utf8");

console.log(`Generated ${OUTPUT_PATH}`);
