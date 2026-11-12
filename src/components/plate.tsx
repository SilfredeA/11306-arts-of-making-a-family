import { useEffect, useRef, useState } from "react";
import { INKS, phase, recipeOf, type Recipe, type Slot } from "@/codex/ink";
import { paintedOf, PAPER, type PaintedPlan } from "@/codex/painted";

const cache = new Map<string, Promise<HTMLImageElement>>();

function ensureInk(src: string): Promise<HTMLImageElement> {
  const hit = cache.get(src);
  if (hit) return hit;
  const pending = new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
  cache.set(src, pending);
  return pending;
}

const GROUNDS = [
  ["#f3eadb", "#d9c7a6"],
  ["#16130f", "#2a241c"],
  ["#2c1816", "#4a2a24"],
] as const;

const VEILS = [
  "rgba(243, 234, 219, 0.12)",
  "rgba(120, 82, 46, 0.5)",
  "rgba(12, 10, 8, 0.55)",
  "rgba(214, 186, 140, 0.42)",
  "rgba(154, 59, 47, 0.38)",
];

function clipSlot(
  ctx: CanvasRenderingContext2D,
  slot: Slot,
  index: number,
  W: number,
  H: number,
  recipe: Recipe,
) {
  const x = slot.x * W;
  const y = slot.y * H;
  const w = slot.w * W;
  const h = slot.h * H;
  ctx.beginPath();
  if (slot.shape === "round") {
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  } else if (slot.shape === "arch") {
    const r = w / 2;
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.arc(x + r, y + r, r, Math.PI, 0);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
  } else if (slot.shape === "diamond") {
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w, y + h / 2);
    ctx.lineTo(x + w / 2, y + h);
    ctx.lineTo(x, y + h / 2);
    ctx.closePath();
  } else if (slot.shape === "torn") {
    const steps = 7;
    const jig = Math.min(w, h) * 0.07;
    const j = (k: number) => (phase(recipe.n, k) - 0.5) * jig;
    ctx.moveTo(x, y);
    for (let i = 1; i <= steps; i++) ctx.lineTo(x + (w * i) / steps, y + j(i));
    for (let i = 1; i <= steps; i++) ctx.lineTo(x + w + j(20 + i), y + (h * i) / steps);
    for (let i = steps - 1; i >= 0; i--) ctx.lineTo(x + (w * i) / steps, y + h + j(40 + i));
    for (let i = steps - 1; i >= 1; i--) ctx.lineTo(x + j(60 + i), y + (h * i) / steps);
    ctx.closePath();
  } else if (slot.shape === "fan") {
    const fans = recipe.slots.filter((item) => item.shape === "fan");
    const at = Math.max(0, fans.indexOf(slot));
    const count = Math.max(1, fans.length);
    const spread = 0.7 + recipe.a * 0.45;
    const a0 = -Math.PI / 2 - spread;
    const span = (spread * 2) / count;
    const start = a0 + at * span;
    const end = start + span * 0.9;
    ctx.moveTo(W * 0.5, H * 0.9);
    ctx.arc(W * 0.5, H * 0.9, Math.hypot(W, H), start, end);
    ctx.closePath();
  } else if (slot.shape === "sheet") {
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate((phase(recipe.n, index + 1) - 0.5) * 0.1);
    ctx.rect(-w / 2, -h / 2, w, h);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.clip();
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  slot: Slot,
  W: number,
  H: number,
) {
  const destW = slot.shape === "fan" ? W : slot.w * W;
  const destH = slot.shape === "fan" ? H : slot.h * H;
  const destX = slot.shape === "fan" ? 0 : slot.x * W;
  const destY = slot.shape === "fan" ? 0 : slot.y * H;
  if (destW < 1 || destH < 1) return;
  const destAspect = destW / destH;
  const imgAspect = img.naturalWidth / img.naturalHeight;
  let sw: number;
  let sh: number;
  if (imgAspect > destAspect) {
    sh = img.naturalHeight;
    sw = sh * destAspect;
  } else {
    sw = img.naturalWidth;
    sh = sw / destAspect;
  }
  sw = Math.min(img.naturalWidth, sw * slot.s);
  sh = Math.min(img.naturalHeight, sh * slot.s);
  const sx = slot.u * Math.max(0, img.naturalWidth - sw);
  const sy = slot.v * Math.max(0, img.naturalHeight - sh);
  ctx.drawImage(img, sx, sy, sw, sh, destX, destY, destW, destH);
}

function renderPlate(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  recipe: Recipe,
  images: (HTMLImageElement | null)[],
) {
  const ang = (recipe.n % 8) * (Math.PI / 8);
  const cx = W / 2;
  const cy = H / 2;
  const len = Math.hypot(W, H);
  const ground = ctx.createLinearGradient(
    cx - Math.cos(ang) * len * 0.5,
    cy - Math.sin(ang) * len * 0.5,
    cx + Math.cos(ang) * len * 0.5,
    cy + Math.sin(ang) * len * 0.5,
  );
  const pair = GROUNDS[recipe.ground] ?? GROUNDS[0];
  ground.addColorStop(0, pair[0]);
  ground.addColorStop(1, pair[1]);
  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, W, H);

  recipe.slots.forEach((slot, index) => {
    const img = images[slot.ink];
    ctx.save();
    clipSlot(ctx, slot, index, W, H, recipe);
    if (img && img.naturalWidth > 0) {
      drawCover(ctx, img, slot, W, H);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = VEILS[recipe.treat] ?? VEILS[0];
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
  });
}

function contain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  if (!img || img.naturalWidth < 2 || w < 2 || h < 2) return;
  const ia = img.naturalWidth / img.naturalHeight;
  const da = w / h;
  let dw = w;
  let dh = h;
  if (ia > da) dh = w / ia;
  else dw = h * ia;
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function detail(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  x: number,
  y: number,
  w: number,
  h: number,
  u: number,
  v: number,
) {
  if (!img || img.naturalWidth < 2 || w < 2 || h < 2) return;
  const destAspect = w / h;
  const imgAspect = img.naturalWidth / img.naturalHeight;
  let sw: number;
  let sh: number;
  if (imgAspect > destAspect) {
    sh = img.naturalHeight * 0.42;
    sw = sh * destAspect;
  } else {
    sw = img.naturalWidth * 0.42;
    sh = sw / destAspect;
  }
  sw = Math.min(img.naturalWidth, sw);
  sh = Math.min(img.naturalHeight, sh);
  const sx = u * Math.max(0, img.naturalWidth - sw);
  const sy = v * Math.max(0, img.naturalHeight - sh);
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function rule(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, paper: boolean) {
  ctx.strokeStyle = paper ? "#9a3b2f" : "#c6a15a";
  ctx.lineWidth = Math.max(1, Math.min(w, h) * 0.012);
  ctx.strokeRect(x, y, w, h);
}

function veil(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function medallion(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  cx: number,
  cy: number,
  r: number,
  u: number,
  v: number,
  paper: boolean,
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  detail(ctx, img, cx - r, cy - r, r * 2, r * 2, u, v);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = paper ? "#9a3b2f" : "#c6a15a";
  ctx.lineWidth = Math.max(1.5, r * 0.07);
  ctx.stroke();
}

function edition(ctx: CanvasRenderingContext2D, n: number, W: number, H: number, paper: boolean) {
  ctx.fillStyle = paper ? "#100e0c" : "#c6a15a";
  const size = Math.max(11, Math.round(H * 0.028));
  ctx.font = `500 ${size}px "Cormorant Garamond", Palatino, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`No. ${n.toLocaleString()}`, W * 0.06, H * 0.972);
  const count = 4 + (n % 5);
  ctx.fillStyle = paper ? "#9a3b2f" : "#c6a15a";
  for (let i = 0; i < count; i++) {
    const x = W * (0.62 + phase(n, 20 + i) * 0.3);
    const y = H * (0.955 + phase(n, 40 + i) * 0.028);
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.8, W * 0.004), 0, Math.PI * 2);
    ctx.fill();
  }
}

function renderPainted(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  plan: PaintedPlan,
  master: HTMLImageElement | null,
  inks: (HTMLImageElement | null)[],
) {
  const paper = plan.ground === PAPER;
  const u = phase(plan.n, 4);
  const v = phase(plan.n, 6);
  const u2 = phase(plan.n, 8);
  const v2 = phase(plan.n, 10);
  ctx.fillStyle = plan.ground;
  ctx.fillRect(0, 0, W, H);
  const a = inks[0] ?? null;
  const b = inks[1] ?? null;

  if (plan.grammar === 0) {
    const x = W * 0.05;
    const y = H * 0.035;
    const w = W * 0.9;
    const h = H * 0.78;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    medallion(ctx, a, plan.side ? W * 0.2 : W * 0.8, H * 0.885, Math.min(W, H) * 0.055, u, v, paper);
  } else if (plan.grammar === 1) {
    const x = W * 0.04;
    const y = H * 0.04;
    const w = W * 0.58;
    const h = H * 0.86;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    const ix = W * 0.66;
    const iy = H * 0.04;
    const iw = W * 0.3;
    const ih = H * 0.86;
    detail(ctx, a, ix, iy, iw, ih, u, v);
    rule(ctx, ix, iy, iw, ih, paper);
  } else if (plan.grammar === 2) {
    const x = W * 0.05;
    const y = H * 0.035;
    const w = W * 0.9;
    const h = H * 0.66;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    const py = H * 0.73;
    const ph = H * 0.16;
    detail(ctx, a, W * 0.05, py, W * 0.425, ph, u, v);
    detail(ctx, b, W * 0.525, py, W * 0.425, ph, u2, v2);
    rule(ctx, W * 0.05, py, W * 0.425, ph, paper);
    rule(ctx, W * 0.525, py, W * 0.425, ph, paper);
  } else if (plan.grammar === 3) {
    ctx.fillStyle = paper ? "#c6a15a" : "#c6a15a";
    ctx.globalAlpha = paper ? 0.35 : 0.22;
    ctx.fillRect(0, 0, W, H * 0.92);
    ctx.globalAlpha = 1;
    const x = W * 0.12;
    const y = H * 0.045;
    const w = W * 0.76;
    const h = H * 0.72;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    medallion(ctx, a, W * 0.5, H * 0.86, Math.min(W, H) * 0.05, u, v, paper);
  } else if (plan.grammar === 4) {
    const x = W * 0.22;
    const y = H * 0.05;
    const w = W * 0.56;
    const h = H * 0.84;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    detail(ctx, a, W * 0.04, H * 0.08, W * 0.14, H * 0.22, u, v);
    detail(ctx, b, W * 0.04, H * 0.36, W * 0.14, H * 0.22, u2, v2);
    detail(ctx, a, W * 0.82, H * 0.08, W * 0.14, H * 0.22, phase(plan.n, 12), phase(plan.n, 13));
    rule(ctx, W * 0.04, H * 0.08, W * 0.14, H * 0.22, paper);
    rule(ctx, W * 0.04, H * 0.36, W * 0.14, H * 0.22, paper);
    rule(ctx, W * 0.82, H * 0.08, W * 0.14, H * 0.22, paper);
  } else if (plan.grammar === 5) {
    const x = W * 0.08;
    const y = H * 0.045;
    const w = W * 0.84;
    const h = H * 0.68;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    const rad = ctx.createRadialGradient(W * 0.5, H * 0.36, W * 0.1, W * 0.5, H * 0.36, W * 0.72);
    rad.addColorStop(0, "rgba(16, 14, 12, 0)");
    rad.addColorStop(1, "rgba(16, 14, 12, 0.28)");
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H * 0.92);
    detail(ctx, a, W * 0.08, H * 0.76, W * 0.38, H * 0.13, u, v);
    rule(ctx, W * 0.08, H * 0.76, W * 0.38, H * 0.13, paper);
  } else if (plan.grammar === 6) {
    detail(ctx, a, W * 0.035, H * 0.08, W * 0.15, H * 0.74, u, v);
    detail(ctx, b, W * 0.815, H * 0.08, W * 0.15, H * 0.74, u2, v2);
    rule(ctx, W * 0.035, H * 0.08, W * 0.15, H * 0.74, paper);
    rule(ctx, W * 0.815, H * 0.08, W * 0.15, H * 0.74, paper);
    const x = W * 0.22;
    const y = H * 0.04;
    const w = W * 0.56;
    const h = H * 0.84;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
  } else {
    const x = W * 0.06;
    const y = H * 0.035;
    const w = W * 0.88;
    const h = H * 0.74;
    contain(ctx, master, x, y, w, h);
    veil(ctx, x, y, w, h, plan.climate);
    rule(ctx, x, y, w, h, paper);
    medallion(ctx, a, W * 0.5, H * 0.875, Math.min(W, H) * 0.052, u, v, paper);
  }

  edition(ctx, plan.n, W, H, paper);
}

export function Plate({
  n,
  label,
  decorative = false,
  branch = "painted",
}: {
  n: number;
  label: string;
  decorative?: boolean;
  branch?: "painted" | "quarry";
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(!decorative);

  useEffect(() => {
    if (!decorative) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [decorative]);

  useEffect(() => {
    if (!on) return;
    const canvas = ref.current;
    if (!canvas) return;
    let dead = false;

    if (branch === "quarry") {
      const recipe = recipeOf(n);
      const images: (HTMLImageElement | null)[] = [null, null, null];
      const draw = () => {
        if (dead) return;
        const host = canvas.parentElement ?? canvas;
        const rect = host.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        const dpr = rect.width < 120 ? 1 : Math.min(2, window.devicePixelRatio || 1);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderPlate(ctx, rect.width, rect.height, recipe, images);
      };
      draw();
      const ro = new ResizeObserver(draw);
      ro.observe(canvas.parentElement ?? canvas);
      Promise.all(recipe.inks.map((index) => ensureInk(INKS[index].file))).then((loaded) => {
        if (dead) return;
        loaded.forEach((img, index) => {
          images[index] = img;
        });
        draw();
      });
      return () => {
        dead = true;
        ro.disconnect();
      };
    }

    const plan = paintedOf(n);
    const images: (HTMLImageElement | null)[] = [null, null, null];
    const draw = () => {
      if (dead) return;
      const host = canvas.parentElement ?? canvas;
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = rect.width < 120 ? 1 : Math.min(2, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderPainted(ctx, rect.width, rect.height, plan, images[0], [images[1], images[2]]);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas.parentElement ?? canvas);
    Promise.all([
      ensureInk(plan.master.src),
      ensureInk(INKS[plan.inks[0]].file),
      ensureInk(INKS[plan.inks[1]].file),
      document.fonts?.ready ?? Promise.resolve(),
    ]).then((loaded) => {
      if (dead) return;
      images[0] = loaded[0] as HTMLImageElement;
      images[1] = loaded[1] as HTMLImageElement;
      images[2] = loaded[2] as HTMLImageElement;
      draw();
    });
    return () => {
      dead = true;
      ro.disconnect();
    };
  }, [n, on, branch]);

  return <canvas ref={ref} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />;
}
