// Hero image generator. Reads every TopicPack.heroPrompt and writes a JPEG
// to public/topics/hero-<id>.jpg using Google Imagen via @google/genai.
//
// Run: `GEMINI_API_KEY=... npx tsx scripts/generate-heroes.ts`
// Re-runs are idempotent — skips any pack whose image already exists on disk.
// If the model is unavailable, writes a themed SVG placeholder instead so
// the UI never breaks.

import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { TOPIC_PACKS } from '../content';
import type { TopicPack } from '../content/schema';

const OUT_DIR = path.resolve(__dirname, '../public/topics');
const MODEL = 'imagen-4.0-generate-001';
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.error('GEMINI_API_KEY or API_KEY required in env.');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const themeColors: Record<TopicPack['themeGroup'], [string, string]> = {
  Identity: ['#ea580c', '#fde68a'],
  ModernSociety: ['#059669', '#a7f3d0'],
  HumanIngenuity: ['#4f46e5', '#c7d2fe'],
};

function writePlaceholder(pack: TopicPack, outPath: string) {
  const [c1, c2] = themeColors[pack.themeGroup];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="600" fill="url(#g)"/>
  <text x="80" y="480" font-family="Noto Sans Devanagari, serif" font-size="96" font-weight="700" fill="white" opacity="0.9">${escapeXml(pack.titleHindi)}</text>
  <text x="80" y="540" font-family="system-ui, sans-serif" font-size="28" font-weight="600" fill="white" opacity="0.8">${escapeXml(pack.titleEnglish)}</text>
</svg>`;
  const svgPath = outPath.replace(/\.jpg$/, '.svg');
  fs.writeFileSync(svgPath, svg);
  console.log(`  · placeholder SVG written: ${path.basename(svgPath)}`);
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}

async function generateOne(pack: TopicPack): Promise<void> {
  const out = path.join(OUT_DIR, `hero-${pack.id}.jpg`);
  const svgFallback = path.join(OUT_DIR, `hero-${pack.id}.svg`);
  if (fs.existsSync(out) || fs.existsSync(svgFallback)) {
    console.log(`skip (exists): ${pack.id}`);
    return;
  }

  console.log(`gen: ${pack.id}`);
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const result: any = await (ai as any).models.generateImages({
      model: MODEL,
      prompt: pack.heroPrompt,
      config: { aspectRatio: '16:9', numberOfImages: 1 },
    });
    const b64 = result?.generatedImages?.[0]?.image?.imageBytes;
    if (!b64) throw new Error('no image bytes returned');
    fs.writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`  · JPEG written: ${path.basename(out)}`);
  } catch (e) {
    console.warn(`  · generation failed (${(e as Error).message}) — writing SVG placeholder`);
    writePlaceholder(pack, out);
  }
}

(async () => {
  for (const pack of TOPIC_PACKS) {
    await generateOne(pack);
    // throttle
    await new Promise((r) => setTimeout(r, 1200));
  }
  console.log('\nDone. Hero assets live in public/topics/');
})();
