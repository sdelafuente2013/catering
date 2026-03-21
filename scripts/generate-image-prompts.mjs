import { existsSync } from "node:fs";
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
  "pack-grande-vasijas": {
    context:
      "This is a rental catering service set for events, not home decor and not flower vases. Style a coordinated pack of 8 to 15 food-safe ceramic serving pieces: vasijas, bowls, compoteras, ensaladeras and fuentes with varied sizes and silhouettes, arranged on a premium buffet table, sweet table or catering service station prepared for an event.",
    composition:
      "Show the full grouped set clearly, with many serving vessels visible at once, balanced spacing, different heights and enough catering context to read as one rental pack for food presentation and service. The pieces must be the hero, not flowers, furniture or room decor.",
    extraLines: [
      "Important: do not generate decorative vases, flower vases or a retail-style single-item photo.",
      "The objects should read as catering serviceware and food presentation pieces, not decoration-only items.",
      "Show subtle food cues to make the use case obvious: some bowls may contain salads, bread, fruit, finger food, snacks or sweets, but the serving pieces must remain fully visible.",
      "Materials and finishes should feel premium and event-ready: matte ceramic, stoneware, sand, ivory, beige, nude, off-white and warm taupe tones.",
      "The result should look like a curated catering/event rental service for weddings, birthdays, receptions and corporate events in Buenos Aires, not a living-room decor catalog.",
    ],
    retryPrompt:
      "Regenerate the image as a catering rental pack for food service: show a coordinated group of many ceramic serving vessels together, such as bowls, compoteras, ensaladeras and fuentes, styled on a buffet table or catering station for an event. Do not show decorative flower vases, do not show a living room, and make the use for serving food immediately obvious.",
    negativeAdditions: [
      "single vase",
      "single centerpiece",
      "decorative vase",
      "flower vase",
      "florero",
      "jarron decorativo",
      "living room decor",
      "sofa",
      "retail shelf",
      "store display",
      "packaging",
      "price tag",
      "boho home decor catalog",
      "large flower bouquet",
      "empty decorative centerpiece",
    ],
  },
};

const CATEGORY_GUIDES = {
  decoracion: {
    composition:
      "Show a curated grouped arrangement with multiple serving vessels clearly visible, balanced spacing and enough buffet context to read as event food serviceware.",
    context:
      "Style the set on a premium buffet table, sweet table or catering service station with realistic staging and refined materials.",
    categoryPrompt:
      "Elegant grouped ceramic serving vessels for events, premium food presentation, refined buffet styling, soft editorial lighting and upscale catering mood.",
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

function getPublicAssetPath(imagePath) {
  return path.join(process.cwd(), "public", imagePath.replace(/^\/+/, ""));
}

function isPendingImage(imagePath) {
  return !existsSync(getPublicAssetPath(imagePath));
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
} else {
  lines.push("## Negative Prompt Comun");
  lines.push("");
  lines.push("```text");
  lines.push(pendingNegativePrompt);
  lines.push("```");
  lines.push("");
}

await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${lines.join("\n")}\n`, "utf8");

console.log(`Generated ${OUTPUT_PATH}`);
