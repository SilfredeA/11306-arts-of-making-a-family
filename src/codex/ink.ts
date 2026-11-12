export const INKS = [
  { file: "/ink/ink-00.jpg", name: "Agave", caption: "a spiky plant" },
  { file: "/ink/ink-01.jpg", name: "Ammonite", caption: "a coiled shell drawn as anatomy" },
  { file: "/ink/ink-02.jpg", name: "Bare feet", caption: "bare feet in a dark room" },
  { file: "/ink/ink-03.jpg", name: "Bear", caption: "a bear at the edge of a thicket" },
  { file: "/ink/ink-04.jpg", name: "Berries", caption: "a cluster of fruit" },
  { file: "/ink/ink-05.jpg", name: "Boat", caption: "a boat on dark water" },
  { file: "/ink/ink-06.jpg", name: "Calligraphy", caption: "columns of brush writing" },
  { file: "/ink/ink-07.jpg", name: "Red frog", caption: "a red frog among leaves" },
  { file: "/ink/ink-08.jpg", name: "Drape", caption: "white cloth over a seated body" },
  { file: "/ink/ink-09.jpg", name: "Elder", caption: "an elder’s face" },
  { file: "/ink/ink-10.jpg", name: "Fashion", caption: "portraits in rose light" },
  { file: "/ink/ink-11.jpg", name: "Forest", caption: "a figure among trees" },
  { file: "/ink/ink-12.jpg", name: "Frog", caption: "a frog on a broad leaf" },
  { file: "/ink/ink-13.jpg", name: "Gathering", caption: "people seated around a book" },
  { file: "/ink/ink-14.jpg", name: "Hands", caption: "two hands holding a broken tablet" },
  { file: "/ink/ink-15.jpg", name: "Hebrew leaf", caption: "an illuminated Hebrew leaf" },
  { file: "/ink/ink-16.jpg", name: "Kin", caption: "a grid of faces" },
  { file: "/ink/ink-17.jpg", name: "Lamp", caption: "a reader beside a lamp" },
  { file: "/ink/ink-18.jpg", name: "Loaf", caption: "a round loaf on linen" },
  { file: "/ink/ink-19.jpg", name: "Overlay", caption: "writing laid across a darker picture" },
  { file: "/ink/ink-20.jpg", name: "Night hand", caption: "a hand held in darkness" },
  { file: "/ink/ink-21.jpg", name: "Raised hand", caption: "a person lifting one hand" },
  { file: "/ink/ink-22.jpg", name: "Roundel", caption: "a framed sequence of small scenes" },
  { file: "/ink/ink-23.jpg", name: "Tale", caption: "an illustrated gathering" },
  { file: "/ink/ink-24.jpg", name: "Tree", caption: "a botanical tree" },
  { file: "/ink/ink-25.jpg", name: "Vertebra", caption: "a drawing of the spine" },
  { file: "/ink/ink-26.jpg", name: "Viscera", caption: "an anatomical plate of the organs" },
  { file: "/ink/ink-27.jpg", name: "Offering", caption: "a figure offering both hands" },
  { file: "/ink/ink-28.jpg", name: "Coat", caption: "a standing figure in a long coat" },
  { file: "/ink/ink-29.jpg", name: "World", caption: "a mosaic of many places" },
] as const;

const PHI = 0.61803398875;
const INK_COUNT = INKS.length;

export const GRAMMARS = [
  "Single Folio",
  "Facing Pages",
  "Three Panels",
  "Strata",
  "Round Window",
  "Torn Deed",
  "Nine Rooms",
  "Brickwork",
  "Scroll Columns",
  "Wide Margin",
  "Family Tree",
  "Night Window",
  "Horizon",
  "Fan",
  "Nested Frames",
  "Scattered Letters",
  "Doorway",
  "Vesica",
  "Staircase",
  "Film of Days",
  "Diamond",
  "Cross",
  "Stack of Sheets",
  "Quilt",
  "Arch and Court",
  "Ledger",
  "Two Seals",
  "Shuffled Hours",
  "Corner Relic",
  "Ring of Kin",
  "Open Book",
  "Banner",
] as const;

export const METHODS = [
  "One page, opened for this household and not used again.",
  "Two pages face each other the way two people do when they have decided to stay.",
  "Three panels, like three generations asked to speak in turn.",
  "The day is stacked in bands: what was said, what was swallowed, what was repaired.",
  "A round window. The house looks out, and then looks back in.",
  "A deed torn along the fold, so the terms have to be read honestly.",
  "Nine rooms. Nobody is exiled to the hallway.",
  "Brick laid over brick. A wall that admits it was built by hands.",
  "Columns of a scroll. The story is long, and the family does not skip the middle.",
  "A wide empty margin, and one small picture that refuses to fill the silence.",
  "A tree of kin. The root is named, and so is every branch.",
  "A window cut into the night. Someone is still awake with the lamp.",
  "A horizon. Above it, weather. Below it, the work of the table.",
  "A fan of hours, opening from the same evening.",
  "Frames inside frames. The apology is kept, not framed away.",
  "Letters that will not line up, because the quarrel was never tidy.",
  "A doorway. Leaving and returning use the same arch.",
  "Two circles overlapping, the shape of a vow that both people inhabit.",
  "A stair. Each step is a smaller truth than the one below it, and still necessary.",
  "A strip of days. The family is not one portrait. It is the sequence.",
  "A diamond set in the ordinary, so attention has a center.",
  "A cross of unequal beams: the vertical is endurance, the horizontal is reach.",
  "Sheets stacked, none of them quite hiding the one beneath.",
  "A quilt of uneven patches. Warmth made from what did not match.",
  "An arch above a court. Shelter, then the open place where people meet.",
  "A ledger. The account is kept in lines, not in accusations.",
  "Two seals, different sizes. Promise and witness are not the same mark.",
  "Hours shuffled out of order, so a later kindness can sit beside an early wound.",
  "A relic in the corner. Most of the page is quiet on purpose.",
  "A ring of kin around an empty middle, which is the place kept for the absent.",
  "An open book with a thick gutter. The binding is part of the picture.",
  "A banner across the quiet field. One sentence, carried by the whole house.",
] as const;

export type Shape = "rect" | "round" | "arch" | "diamond" | "torn" | "fan" | "sheet";

export type Slot = {
  ink: 0 | 1 | 2;
  u: number;
  v: number;
  s: number;
  x: number;
  y: number;
  w: number;
  h: number;
  shape: Shape;
};

export type Recipe = {
  n: number;
  grammar: number;
  name: string;
  method: string;
  inks: [number, number, number];
  slots: Slot[];
  treat: number;
  ground: number;
  a: number;
  b: number;
  c: number;
};

export function phase(n: number, k: number): number {
  const x = n * PHI + k * 0.173;
  return x - Math.floor(x);
}

function inkOf(i: number): 0 | 1 | 2 {
  return (i % 3) as 0 | 1 | 2;
}

function slot(
  n: number,
  k: number,
  ink: 0 | 1 | 2,
  x: number,
  y: number,
  w: number,
  h: number,
  shape: Shape,
): Slot {
  const x2 = Math.min(0.96, Math.max(0, x));
  const y2 = Math.min(0.96, Math.max(0, y));
  const w2 = Math.max(0.05, Math.min(w, 1 - x2));
  const h2 = Math.max(0.045, Math.min(h, 1 - y2));
  return {
    ink,
    u: phase(n, k),
    v: phase(n, k + 2.7),
    s: 0.22 + phase(n, k + 5.1) * 0.38,
    x: x2,
    y: y2,
    w: w2,
    h: h2,
    shape,
  };
}

function parts(n: number, count: number, salt: number): number[] {
  const raw = Array.from({ length: count }, (_, i) => 0.55 + phase(n, salt + i * 1.7));
  const sum = raw.reduce((acc, v) => acc + v, 0);
  return raw.map((v) => v / sum);
}

function layout(grammar: number, n: number): Slot[] {
  const slots: Slot[] = [];
  const push = (
    k: number,
    ink: 0 | 1 | 2,
    x: number,
    y: number,
    w: number,
    h: number,
    shape: Shape,
  ) => {
    slots.push(slot(n, k, ink, x, y, w, h, shape));
  };

  switch (grammar) {
    case 0: {
      push(1, 0, 0.08, 0.05, 0.84, 0.9, "rect");
      break;
    }
    case 1: {
      push(1, 0, 0.04, 0.05, 0.44, 0.9, "rect");
      push(2, 1, 0.52, 0.05, 0.44, 0.9, "rect");
      break;
    }
    case 2: {
      const widths = parts(n, 3, 2);
      let x = 0.04;
      widths.forEach((p, i) => {
        const w = 0.88 * p;
        push(i + 1, inkOf(i), x, 0.05, w - 0.012, 0.9, "rect");
        x += w;
      });
      break;
    }
    case 3: {
      const bands = 4 + (n % 3);
      const heights = parts(n, bands, 4);
      let y = 0.04;
      heights.forEach((p, i) => {
        const h = 0.9 * p;
        push(i + 1, inkOf(i), 0.06, y, 0.88, h - 0.01, "rect");
        y += h;
      });
      break;
    }
    case 4: {
      push(1, 0, 0.14, 0.1, 0.72, 0.62, "round");
      break;
    }
    case 5: {
      push(1, 0, 0.08 + phase(n, 1) * 0.08, 0.08, 0.74, 0.7, "torn");
      push(2, 1, 0.62, 0.72, 0.28, 0.2, "rect");
      break;
    }
    case 6: {
      let k = 0;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          k += 1;
          push(k, inkOf(k), 0.05 + c * 0.31, 0.04 + r * 0.32, 0.28, 0.29, "rect");
        }
      }
      break;
    }
    case 7: {
      const rows = 4 + (n % 4);
      const cols = 3 + ((n >> 3) % 3);
      const gap = 0.012;
      const bw = (0.9 - gap * (cols - 1)) / cols;
      const bh = (0.9 - gap * (rows - 1)) / rows;
      let k = 0;
      for (let r = 0; r < rows; r++) {
        const shift = r % 2 ? bw * 0.45 : 0;
        for (let c = 0; c < cols; c++) {
          const x = 0.04 + shift + c * (bw + gap);
          if (x + bw > 0.98) continue;
          k += 1;
          push(k, inkOf(k), x, 0.04 + r * (bh + gap), bw, bh, "rect");
        }
      }
      break;
    }
    case 8: {
      const cols = 2 + (n % 3);
      const widths = parts(n, cols, 6);
      let x = 0.06;
      widths.forEach((p, i) => {
        const w = 0.88 * p;
        push(i + 1, inkOf(i), x, 0.04, w - 0.015, 0.92, "rect");
        x += w;
      });
      break;
    }
    case 9: {
      const corner = n % 4;
      const w = 0.3;
      const h = 0.24;
      const x = corner % 2 === 0 ? 0.06 : 0.64;
      const y = corner < 2 ? 0.06 : 0.7;
      push(1, 0, x, y, w, h, "rect");
      break;
    }
    case 10: {
      push(1, 0, 0.36, 0.05, 0.28, 0.2, "round");
      push(2, 1, 0.1, 0.34, 0.34, 0.22, "rect");
      push(3, 2, 0.56, 0.34, 0.34, 0.22, "rect");
      push(4, 0, 0.05, 0.66, 0.28, 0.26, "rect");
      push(5, 1, 0.36, 0.66, 0.28, 0.26, "rect");
      push(6, 2, 0.67, 0.66, 0.28, 0.26, "rect");
      break;
    }
    case 11: {
      push(1, 0, 0.16, 0.1, 0.68, 0.55, "arch");
      push(2, 1, 0.28, 0.7, 0.44, 0.22, "rect");
      break;
    }
    case 12: {
      const cut = 0.28 + phase(n, 2) * 0.22;
      push(1, 0, 0, 0, 1, cut, "rect");
      push(2, 1, 0, cut + 0.02, 1, 0.98 - cut, "rect");
      break;
    }
    case 13: {
      const count = 5 + (n % 3);
      for (let i = 0; i < count; i++) push(i + 1, inkOf(i), 0, 0, 1, 1, "fan");
      break;
    }
    case 14: {
      push(1, 0, 0.04, 0.03, 0.92, 0.94, "rect");
      push(2, 1, 0.16, 0.14, 0.68, 0.72, "rect");
      push(3, 2, 0.3, 0.28, 0.4, 0.44, "rect");
      break;
    }
    case 15: {
      const count = 5 + (n % 4);
      for (let i = 0; i < count; i++) {
        const x = 0.04 + phase(n, i * 2.2) * 0.58;
        const y = 0.04 + phase(n, i * 2.2 + 3) * 0.68;
        const w = 0.2 + phase(n, i + 8) * 0.12;
        const h = 0.12 + phase(n, i + 15) * 0.1;
        push(i + 1, inkOf(i), x, y, w, h, i % 2 ? "rect" : "torn");
      }
      break;
    }
    case 16: {
      push(1, 0, 0.1, 0.03, 0.8, 0.94, "arch");
      break;
    }
    case 17: {
      push(1, 0, 0.06, 0.16, 0.62, 0.56, "round");
      push(2, 1, 0.32, 0.22, 0.62, 0.56, "round");
      break;
    }
    case 18: {
      const steps = 5 + (n % 3);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        push(i + 1, inkOf(i), 0.05 + t * 0.62, 0.06 + t * 0.62, 0.28, 0.16, "rect");
      }
      break;
    }
    case 19: {
      const frames = 4 + (n % 3);
      const gap = 0.015;
      const w = (0.9 - gap * (frames - 1)) / frames;
      for (let i = 0; i < frames; i++) {
        push(i + 1, inkOf(i), 0.05 + i * (w + gap), 0.34, w, 0.32, "rect");
      }
      break;
    }
    case 20: {
      push(1, 0, 0.18, 0.12, 0.64, 0.7, "diamond");
      push(2, 1, 0.06, 0.06, 0.18, 0.16, "diamond");
      push(3, 2, 0.74, 0.74, 0.18, 0.16, "diamond");
      break;
    }
    case 21: {
      const vw = 0.14 + phase(n, 1) * 0.16;
      const hh = 0.1 + phase(n, 2) * 0.12;
      const hy = 0.28 + phase(n, 3) * 0.3;
      push(1, 0, (1 - vw) / 2, 0.04, vw, 0.92, "rect");
      push(2, 1, 0.04, hy, 0.92, hh, "rect");
      break;
    }
    case 22: {
      const count = 3 + (n % 3);
      for (let i = 0; i < count; i++) {
        push(i + 1, inkOf(i), 0.1 + i * 0.04, 0.08 + i * 0.06, 0.7, 0.62, "sheet");
      }
      break;
    }
    case 23: {
      const rows = 3 + (n % 2);
      const cols = 3 + ((n >> 2) % 2);
      const rh = parts(n, rows, 9);
      const cw = parts(n, cols, 14);
      let y = 0.04;
      let k = 0;
      for (let r = 0; r < rows; r++) {
        let x = 0.04;
        const h = 0.9 * rh[r];
        for (let c = 0; c < cols; c++) {
          const w = 0.9 * cw[c];
          k += 1;
          push(k, inkOf(k), x, y, w - 0.012, h - 0.012, "rect");
          x += w;
        }
        y += h;
      }
      break;
    }
    case 24: {
      push(1, 0, 0.12, 0.03, 0.76, 0.48, "arch");
      push(2, 1, 0.06, 0.54, 0.42, 0.4, "rect");
      push(3, 2, 0.52, 0.54, 0.42, 0.4, "rect");
      break;
    }
    case 25: {
      const rows = 6 + (n % 4);
      const h = 0.88 / rows;
      for (let i = 0; i < rows; i++) {
        push(i + 1, inkOf(i), 0.05, 0.05 + i * h, 0.22, h - 0.012, "rect");
        push(100 + i, inkOf(i + 1), 0.3, 0.05 + i * h, 0.64, h - 0.012, "rect");
      }
      break;
    }
    case 26: {
      push(1, 0, 0.08, 0.16, 0.5, 0.46, "round");
      push(2, 1, 0.52, 0.48, 0.36, 0.34, "round");
      break;
    }
    case 27: {
      const bands = 5 + (n % 3);
      const heights = parts(n, bands, 11);
      let y = 0.04;
      heights.forEach((p, i) => {
        const h = 0.92 * p;
        const inset = phase(n, i + 4) * 0.18;
        push(i + 1, inkOf(i), 0.04 + inset, y, 0.9 - inset * 1.4, h - 0.01, "rect");
        y += h;
      });
      break;
    }
    case 28: {
      const corner = (n >> 2) % 4;
      const s = 0.22;
      const x = corner % 2 === 0 ? 0.06 : 0.7;
      const y = corner < 2 ? 0.06 : 0.68;
      push(1, 0, x, y, s, s * 0.75, "round");
      break;
    }
    case 29: {
      const count = 6 + (n % 4);
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 + phase(n, 3) * 0.8;
        const cx = 0.5 + Math.cos(ang) * 0.3;
        const cy = 0.48 + Math.sin(ang) * 0.225;
        const s = 0.16;
        push(i + 1, inkOf(i), cx - s / 2, cy - s * 0.375, s, s * 0.75, "round");
      }
      break;
    }
    case 30: {
      push(1, 0, 0.05, 0.08, 0.42, 0.78, "rect");
      push(2, 1, 0.53, 0.08, 0.42, 0.78, "rect");
      push(3, 2, 0.14, 0.16, 0.24, 0.2, "diamond");
      break;
    }
    default: {
      const y = 0.34 + phase(n, 1) * 0.16;
      push(1, 0, 0, y, 1, 0.22 + phase(n, 2) * 0.08, "rect");
      push(2, 1, 0.08, 0.08, 0.28, 0.16, "rect");
      break;
    }
  }
  return slots;
}

export function recipeOf(n: number): Recipe {
  const grammar = (((n * 29 + 7) % 32) + 32) % 32;
  let a = Math.abs(n * 11) % INK_COUNT;
  let b = Math.abs(n * 17 + 3) % INK_COUNT;
  let c = Math.abs(n * 23 + 5) % INK_COUNT;
  if (b === a) b = (b + 1) % INK_COUNT;
  if (c === a || c === b) c = (c + 1) % INK_COUNT;
  if (c === a || c === b) c = (c + 1) % INK_COUNT;
  return {
    n,
    grammar,
    name: GRAMMARS[grammar],
    method: METHODS[grammar],
    inks: [a, b, c],
    slots: layout(grammar, n),
    treat: ((n % 5) + 5) % 5,
    ground: Math.abs(n) % 3,
    a: phase(n, 1),
    b: phase(n, 2),
    c: phase(n, 3),
  };
}
