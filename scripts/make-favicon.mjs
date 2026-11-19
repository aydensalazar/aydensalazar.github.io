/**
 * make-favicon.mjs
 *
 * Builds the site icon: a solid black rounded square with a bold white
 * "A" set in Inter Tight 700 (the site's heading font). The "A" is an
 * outline (not live text), so it renders identically everywhere, with no
 * font needed.
 *
 * Output:
 *   public/favicon.svg         vector, rounded square (modern browsers)
 *   public/favicon.ico         16/32/48 px, rounded (legacy browsers)
 *   public/apple-touch-icon.png 180x180, full-bleed square (iOS rounds it)
 *
 * Glyph outline: Inter Tight variable font @ wght 700, glyph "A"
 * (2048 units/em, bounds 14.8..1448.4 x 0..1490).
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const A_PATH =
  "M352.394 0H14.8L529.201 1490H934.792L1448.393 0H1111.599L737.596 1149.604H725.596ZM332.397 585.6H1129.196V340.403H332.397Z";
const GLYPH = { xMin: 14.8, xMax: 1448.393, height: 1490 };

const BG = "#000000";
const FG = "#ffffff";
const SIZE = 512;
// Height of the "A" as a share of the icon. Big, so it survives 16px.
const A_SHARE = 0.62;

function svg({ rounded }) {
  const s = (SIZE * A_SHARE) / GLYPH.height;
  const glyphW = (GLYPH.xMax - GLYPH.xMin) * s;
  const tx = (SIZE - glyphW) / 2 - GLYPH.xMin * s;
  const baseline = (SIZE + GLYPH.height * s) / 2;
  const r = rounded ? 112 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${r}" fill="${BG}"/>
  <path transform="translate(${tx.toFixed(2)} ${baseline.toFixed(2)}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})" fill="${FG}" d="${A_PATH}"/>
</svg>
`;
}

const PUBLIC = resolve("public");
const rounded = svg({ rounded: true });
writeFileSync(`${PUBLIC}/favicon.svg`, rounded);

const png = (markup, px) =>
  sharp(Buffer.from(markup), { density: 384 })
    .resize(px, px)
    .png({ compressionLevel: 9 })
    .toBuffer();

// Apple touch icon: iOS applies its own corner mask, so ship a square.
await sharp(await png(svg({ rounded: false }), 180)).toFile(
  `${PUBLIC}/apple-touch-icon.png`,
);

// Real multi-size .ico (PNG-compressed entries).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((px) => png(rounded, px)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((px, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(px, 0); // width
  e.writeUInt8(px, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bpp
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
writeFileSync(`${PUBLIC}/favicon.ico`, Buffer.concat([header, ...entries, ...images]));

console.log("wrote public/favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png");
