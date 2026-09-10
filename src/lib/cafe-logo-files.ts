import fs from "node:fs";
import path from "node:path";
import { CAFES, slugify } from "./cafes";

/**
 * Finds the logo files sitting in /public/cafes/ and matches them to cafés
 * by name, so adding a logo is one step: drop "mug-coffee-roastery.png" in
 * that folder and the card shows it on the next build.
 *
 * This runs on the server while the page is being built, never in the
 * browser — so cards never request a file that is not there, and no config
 * file has to be kept in sync by hand.
 */

const LOGO_DIR = path.join(process.cwd(), "public", "cafes");
const IMAGE_EXTENSIONS = new Set([".png", ".svg", ".jpg", ".jpeg", ".webp", ".avif"]);

export function readLogoFiles(): Record<string, string> {
  let entries: string[];
  try {
    entries = fs.readdirSync(LOGO_DIR);
  } catch {
    // No folder yet. Every card simply falls back to the next source.
    return {};
  }

  const byStem = new Map<string, string>();
  for (const entry of entries) {
    const extension = path.extname(entry).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) continue;
    const stem = path.basename(entry, extension).toLowerCase();
    // An explicit "-logo" suffix reads naturally, so accept it too.
    byStem.set(stem.replace(/-logo$/, ""), `/cafes/${entry}`);
  }

  const found: Record<string, string> = {};
  for (const cafe of CAFES) {
    const slug = slugify(cafe.name);
    const file = byStem.get(slug);
    if (file) found[slug] = file;
  }
  return found;
}
