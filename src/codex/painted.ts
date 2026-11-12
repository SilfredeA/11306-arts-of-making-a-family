import { phase, INKS } from "./ink";
import { MASTERS, type Master } from "./masters";

export type PaintedPlan = {
  n: number;
  grammar: number;
  name: string;
  method: string;
  master: Master;
  inks: [number, number];
  climate: string;
  ground: string;
  side: number;
};

const FRAMES = [
  {
    name: "The Whole Figure",
    method:
      "The painting is kept entire, so the hands and both legs can be counted. One fragment of the archive sits in a gold reliquary beneath the figure and does not cover a foot.",
  },
  {
    name: "Facing Pages",
    method:
      "The figured painting and a folio from the source library face each other, the way two people do when they have decided to stay. The body is not cut to make room.",
  },
  {
    name: "Predella",
    method:
      "Above, the family at full length. Below, a predella of the archive — the old page this picture was asked to answer, still itself.",
  },
  {
    name: "Gold Ground",
    method:
      "A costly ground, the kind a house spends on what it refuses to lose. The figures stand inside an arch, uncropped. A roundel of the source hangs under them like a seal.",
  },
  {
    name: "Illuminated Margin",
    method:
      "Wide margins, as in a manuscript that knows the picture is the teaching and the notes must stay in the border. The archive lives only in the margin.",
  },
  {
    name: "Nocturne",
    method:
      "The painting is the lamp. Around it, dark. A single study from the archive is kept in the lower shadow, still legible, still unrevised.",
  },
  {
    name: "Household Altar",
    method:
      "A central panel for the body, and two narrow wings of source material. The wings open. They do not swallow the people standing between them.",
  },
  {
    name: "Sealed Leaf",
    method:
      "The figure fills its field. A wax-dark roundel holds one transformed fragment of the archive in the band below, where nobody is standing.",
  },
] as const;

const GROUNDS = ["#100e0c", "#1c1712", "#f3eadb"] as const;

const CLIMATES = [
  "rgba(198, 161, 90, 0.13)",
  "rgba(154, 59, 47, 0.12)",
  "rgba(16, 14, 12, 0.14)",
  "rgba(243, 234, 219, 0.12)",
  "rgba(183, 168, 144, 0.16)",
] as const;

export function paintedOf(n: number): PaintedPlan {
  const index = Math.max(1, Math.floor(n));
  const grammar = ((index % FRAMES.length) + FRAMES.length) % FRAMES.length;
  const frame = FRAMES[grammar] ?? FRAMES[0];
  const master = MASTERS[Math.abs(index * 5) % MASTERS.length] ?? MASTERS[0];
  let a = Math.abs(index * 11) % INKS.length;
  let b = Math.abs(index * 17 + 3) % INKS.length;
  if (b === a) b = (b + 1) % INKS.length;
  return {
    n: index,
    grammar,
    name: frame.name,
    method: frame.method,
    master,
    inks: [a, b],
    climate: CLIMATES[Math.abs(index * 3) % CLIMATES.length] ?? CLIMATES[0],
    ground: GROUNDS[Math.abs(index * 7) % GROUNDS.length] ?? GROUNDS[0],
    side: index % 2,
  };
}

export const PAPER = "#f3eadb";
