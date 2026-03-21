import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

function walkPublicImages(
  dirPath: string,
  baseUrl: string,
  collected: string[]
): void {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const absolutePath = path.join(dirPath, entry.name);
    const publicPath = path.posix.join(baseUrl, entry.name);

    if (entry.isDirectory()) {
      walkPublicImages(absolutePath, publicPath, collected);
      continue;
    }

    collected.push(publicPath);
  }
}

export const getAvailablePublicImages = cache(function getAvailablePublicImages(): string[] {
  const publicImagesPath = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(publicImagesPath)) {
    return [];
  }

  const collected: string[] = [];
  walkPublicImages(publicImagesPath, "/images", collected);

  return collected.sort((left, right) => left.localeCompare(right));
});

export function hasAvailablePublicImage(
  src: string,
  availableImages: readonly string[]
): boolean {
  return availableImages.includes(src);
}
