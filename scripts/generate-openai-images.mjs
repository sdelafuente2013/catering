import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { CATEGORIAS, SERVICIOS, EMPRESA } = require("../src/config/data.ts");

const args = new Set(process.argv.slice(2));
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const LIMIT = limitArg ? Number(limitArg.split("=")[1]) : null;

const PRESET = args.has("--all")
  ? "all"
  : args.has("--featured")
    ? "featured"
    : "featured";

const QUALITY = args.has("--high")
  ? "high"
  : args.has("--low")
    ? "low"
    : "medium";

const OUTPUT_FORMAT = "png";
const OUTPUT_COMPRESSION = 100;

const FEATURED_IDS = new Set([
  "pack-grande-vasijas",
  "fuente-chocolate",
  "robot-led",
]);

const CATEGORY_DIRECTION = {
  decoracion:
    "Curated decorative event styling, grouped ceramic vasijas, premium reception setup, refined materials, warm editorial light.",
  fuentes:
    "Celebration centerpiece, abundant but elegant presentation, premium dessert and beverage styling, polished catering atmosphere.",
  animacion:
    "High-impact robot LED show for events, premium party atmosphere, dynamic pose, colorful glow and believable live entertainment staging.",
};

const SERVICE_PROMPT_OVERRIDES = {
  "pack-grande-vasijas": {
    direction:
      "This is a rental decor set for events, not a single home-decor vase. Show a coordinated pack of 8 to 15 ceramic vasijas with varied heights, sculptural silhouettes and premium neutral finishes, arranged on a welcome table, sweet table or decorative event corner.",
    extra:
      "Do not generate a single vase. Do not generate a living-room or retail decor scene. The grouped vasijas must be the hero, with flowers used only minimally if needed.",
  },
};

function punctuate(value) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function slugFromImagePath(imagePath) {
  return imagePath.replace(/^\/+/, "");
}

function buildCategoryPrompt(categoria) {
  return [
    `Create a premium commercial hero image for the catering rental brand ${EMPRESA.nombre}.`,
    `Category: ${categoria.nombre}.`,
    `Description: ${punctuate(categoria.descripcion)}`,
    `Scene direction: ${CATEGORY_DIRECTION[categoria.id] ?? CATEGORY_DIRECTION.animacion}`,
    "Photorealistic catalog image, elegant event styling, no visible logos, no text overlay, no watermark, no clutter, no distorted objects.",
    "Use a warm neutral palette with ivory, champagne, soft gold and deep navy accents.",
    "Framing: landscape 3:2 composition for a website category banner.",
  ].join(" ");
}

function buildProductPrompt(servicio) {
  const categoria = CATEGORIAS.find((item) => item.id === servicio.categoriaId);
  const override = SERVICE_PROMPT_OVERRIDES[servicio.id];
  const detailLine = servicio.detalles.length
    ? `Preserve these details: ${servicio.detalles.join(", ")}.`
    : "";

  return [
    `Create a premium commercial product photograph for the catering rental brand ${EMPRESA.nombre}.`,
    `Product: ${servicio.nombre}.`,
    `Category: ${categoria?.nombre ?? "Producto"}.`,
    `Description: ${punctuate(servicio.descripcion)}`,
    detailLine,
    `Scene direction: ${override?.direction ?? CATEGORY_DIRECTION[servicio.categoriaId] ?? CATEGORY_DIRECTION.animacion}`,
    "Photorealistic catalog image, premium event styling, realistic materials, soft editorial lighting, clean composition, shallow depth of field.",
    override?.extra,
    "No visible logos, no text overlay, no watermark, no duplicated objects, no distorted geometry, no clutter.",
    "Framing: vertical 2:3 composition for a website product card.",
  ]
    .filter(Boolean)
    .join(" ");
}

function getTargets() {
  if (PRESET === "all") {
    const targets = [
      ...CATEGORIAS.map((categoria) => ({
        type: "category",
        id: categoria.id,
        name: categoria.nombre,
        imagePath: categoria.imagen,
        size: "1536x1024",
        prompt: buildCategoryPrompt(categoria),
      })),
      ...SERVICIOS.filter((servicio) => servicio.disponible).map((servicio) => ({
        type: "product",
        id: servicio.id,
        name: servicio.nombre,
        imagePath: servicio.imagen,
        size: "1024x1536",
        prompt: buildProductPrompt(servicio),
      })),
    ];

    return LIMIT ? targets.slice(0, LIMIT) : targets;
  }

  const featuredProducts = SERVICIOS.filter((servicio) =>
    FEATURED_IDS.has(servicio.id)
  );

  const targets = [
    ...CATEGORIAS.map((categoria) => ({
      type: "category",
      id: categoria.id,
      name: categoria.nombre,
      imagePath: categoria.imagen,
      size: "1536x1024",
      prompt: buildCategoryPrompt(categoria),
    })),
    ...featuredProducts.map((servicio) => ({
      type: "product",
      id: servicio.id,
      name: servicio.nombre,
      imagePath: servicio.imagen,
      size: "1024x1536",
      prompt: buildProductPrompt(servicio),
    })),
  ];

  return LIMIT ? targets.slice(0, LIMIT) : targets;
}

async function readApiKey() {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY.trim();
  }

  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
  }

  return chunks.join("").trim();
}

async function generateImage(apiKey, target) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1.5",
      prompt: target.prompt,
      size: target.size,
      quality: QUALITY,
      output_format: OUTPUT_FORMAT,
      output_compression: OUTPUT_COMPRESSION,
      moderation: "auto",
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    const message =
      json?.error?.message || `OpenAI request failed with status ${response.status}`;
    throw new Error(`${target.id}: ${message}`);
  }

  const base64Image = json?.data?.[0]?.b64_json;

  if (!base64Image) {
    throw new Error(`${target.id}: missing image payload in API response`);
  }

  return Buffer.from(base64Image, "base64");
}

async function main() {
  const apiKey = await readApiKey();

  if (!apiKey) {
    throw new Error("No API key provided via stdin or OPENAI_API_KEY");
  }

  const targets = getTargets();
  const results = [];

  for (const target of targets) {
    const outputPath = path.join(process.cwd(), "public", slugFromImagePath(target.imagePath));
    await mkdir(path.dirname(outputPath), { recursive: true });

    console.log(`Generating ${target.type} ${target.id} -> ${target.imagePath}`);
    const imageBuffer = await generateImage(apiKey, target);
    await writeFile(outputPath, imageBuffer);

    results.push({
      ...target,
      outputPath,
    });
  }

  const reportPath = path.join(
    process.cwd(),
    "docs",
    `openai-image-run-${PRESET}-${QUALITY}.json`
  );

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(results, null, 2), "utf8");

  console.log(`Saved ${results.length} images`);
  console.log(`Report: ${reportPath}`);
}

main().catch(async (error) => {
  const logPath = path.join(process.cwd(), "docs", "openai-image-run-error.log");
  await mkdir(path.dirname(logPath), { recursive: true });
  await writeFile(logPath, `${String(error.stack || error)}\n`, "utf8");
  console.error(String(error.message || error));
  process.exit(1);
});
