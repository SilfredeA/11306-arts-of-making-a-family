const INK = "#14110e";
const VELLUM = "#f0e2cc";
const VELLUM_DEEP = "#e2d0b4";
const GOLD = "#c6a15a";
const GOLD_BRIGHT = "#e4c98a";
const CINNABAR = "#9a3b2f";
const NIGHT = "#1c2430";

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function robe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  fill: string,
) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.72, s * 0.16, s * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y - s * 0.5);
  ctx.bezierCurveTo(x - s * 0.46, y - s * 0.2, x - s * 0.4, y + s * 0.45, x - s * 0.28, y + s * 0.62);
  ctx.lineTo(x + s * 0.28, y + s * 0.62);
  ctx.bezierCurveTo(x + s * 0.4, y + s * 0.45, x + s * 0.46, y - s * 0.2, x, y - s * 0.5);
  ctx.fill();
}

function floret(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x, y, s, 0, Math.PI * 2);
  ctx.moveTo(x - s * 1.6, y);
  ctx.lineTo(x + s * 1.6, y);
  ctx.moveTo(x, y - s * 1.6);
  ctx.lineTo(x, y + s * 1.6);
  ctx.stroke();
}

function frame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.25;
  ctx.strokeRect(x, y, w, h);
  ctx.lineWidth = 0.6;
  ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
  const s = Math.max(3, w * 0.015);
  floret(ctx, x + 8, y + 8, s);
  floret(ctx, x + w - 8, y + 8, s);
  floret(ctx, x + 8, y + h - 8, s);
  floret(ctx, x + w - 8, y + h - 8, s);
}

function rulings(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, rows: number) {
  ctx.strokeStyle = "rgba(28, 22, 16, 0.35)";
  ctx.lineWidth = 0.6;
  for (let i = 0; i < rows; i += 1) {
    const yy = y + i * 4.2;
    const inset = (i * 13) % 5;
    ctx.beginPath();
    ctx.moveTo(x + inset, yy);
    ctx.lineTo(x + w - ((i * 7) % 9), yy);
    ctx.stroke();
  }
}

export function paintPlate(ctx: CanvasRenderingContext2D, w: number, h: number, n: number) {
  const rand = mulberry(n * 997 + 17);
  const mode = n % 8;

  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);

  const m = Math.max(10, Math.round(w * 0.07));
  ctx.fillStyle = VELLUM;
  ctx.beginPath();
  const jitter = () => (rand() - 0.5) * 4;
  ctx.moveTo(m + jitter(), m);
  ctx.lineTo(w - m + jitter(), m + jitter());
  ctx.lineTo(w - m, h - m + jitter());
  ctx.lineTo(m + jitter(), h - m);
  ctx.closePath();
  ctx.fill();

  const x = m + 8;
  const y = m + 8;
  const pw = w - (m + 8) * 2;
  const ph = h - (m + 8) * 2;
  const cx = x + pw / 2;
  const cy = y + ph * 0.46;

  if (mode === 0) {
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx - pw * 0.12, cy, pw * 0.22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + pw * 0.12, cy, pw * 0.22, 0, Math.PI * 2);
    ctx.stroke();
    robe(ctx, cx - pw * 0.2, cy + ph * 0.08, ph * 0.28, "#6e4a32");
    robe(ctx, cx + pw * 0.2, cy + ph * 0.08, ph * 0.28, "#3e4a55");
  } else if (mode === 1) {
    ctx.strokeStyle = "#5c3b28";
    ctx.lineWidth = Math.max(2, w * 0.012);
    ctx.beginPath();
    ctx.moveTo(cx, y + ph * 0.82);
    ctx.quadraticCurveTo(cx + pw * 0.02, cy, cx, y + ph * 0.16);
    ctx.stroke();
    const branches = 5 + (n % 4);
    for (let i = 0; i < branches; i += 1) {
      const dir = i % 2 === 0 ? -1 : 1;
      const by = y + ph * (0.28 + i * 0.08);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, by);
      ctx.quadraticCurveTo(cx + dir * pw * 0.15, by - ph * 0.04, cx + dir * pw * (0.22 + (i % 3) * 0.04), by - ph * 0.1);
      ctx.stroke();
      ctx.fillStyle = i % 3 === 0 ? CINNABAR : GOLD;
      ctx.beginPath();
      ctx.arc(cx + dir * pw * (0.24 + (i % 3) * 0.03), by - ph * 0.11, 3 + (n % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    robe(ctx, cx - pw * 0.18, y + ph * 0.78, ph * 0.16, "#4d4034");
    robe(ctx, cx + pw * 0.16, y + ph * 0.8, ph * 0.13, "#6d5338");
  } else if (mode === 2) {
    ctx.fillStyle = NIGHT;
    ctx.fillRect(x + pw * 0.12, y + ph * 0.12, pw * 0.76, ph * 0.62);
    ctx.fillStyle = VELLUM_DEEP;
    ctx.fillRect(x + pw * 0.28, y + ph * 0.16, pw * 0.3, ph * 0.28);
    ctx.fillStyle = "#c4b49a";
    ctx.beginPath();
    ctx.ellipse(cx, y + ph * 0.62, pw * 0.28, ph * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = CINNABAR;
    ctx.beginPath();
    ctx.ellipse(cx - pw * 0.06, y + ph * 0.58, pw * 0.05, ph * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
    robe(ctx, cx - pw * 0.22, y + ph * 0.58, ph * 0.2, "#2a241e");
    robe(ctx, cx + pw * 0.18, y + ph * 0.56, ph * 0.22, "#3a3128");
  } else if (mode === 3) {
    ctx.fillStyle = "#c9b292";
    ctx.beginPath();
    ctx.ellipse(cx, cy + ph * 0.08, pw * 0.34, ph * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    const bowls = 3 + (n % 4);
    for (let i = 0; i < bowls; i += 1) {
      const ang = -Math.PI / 2 + (i / bowls) * Math.PI * 2;
      const bx = cx + Math.cos(ang) * pw * 0.16;
      const by = cy + ph * 0.08 + Math.sin(ang) * ph * 0.07;
      ctx.fillStyle = i === n % bowls ? CINNABAR : "#f7f1e6";
      ctx.beginPath();
      ctx.ellipse(bx, by, pw * 0.045, ph * 0.028, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  } else if (mode === 4) {
    ctx.fillStyle = NIGHT;
    ctx.fillRect(x, y, pw, ph);
    ctx.strokeStyle = GOLD;
    for (let i = 0; i < 9; i += 1) {
      ctx.lineWidth = i === 4 ? 2 : 0.8;
      ctx.globalAlpha = i === 4 ? 1 : 0.55;
      ctx.beginPath();
      ctx.moveTo(x, y + ph * (0.2 + i * 0.07));
      ctx.bezierCurveTo(
        cx,
        y + ph * (0.05 + (i % 3) * 0.04),
        cx,
        y + ph * (0.55 - i * 0.02),
        x + pw,
        y + ph * (0.28 + i * 0.05),
      );
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = VELLUM;
    ctx.fillRect(cx - pw * 0.06, y + ph * 0.62, pw * 0.12, ph * 0.1);
    ctx.fillStyle = CINNABAR;
    ctx.fillRect(cx - pw * 0.02, y + ph * 0.66, pw * 0.04, ph * 0.03);
  } else if (mode === 5) {
    ctx.strokeStyle = CINNABAR;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy + ph * 0.22);
    ctx.bezierCurveTo(cx - pw * 0.38, cy + ph * 0.05, cx - pw * 0.28, cy - ph * 0.22, cx, cy - ph * 0.02);
    ctx.bezierCurveTo(cx + pw * 0.28, cy - ph * 0.22, cx + pw * 0.38, cy + ph * 0.05, cx, cy + ph * 0.22);
    ctx.stroke();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 0.7;
    ctx.strokeRect(cx - pw * 0.1, cy - ph * 0.02, pw * 0.09, ph * 0.08);
    ctx.strokeRect(cx + pw * 0.01, cy - ph * 0.02, pw * 0.09, ph * 0.08);
    robe(ctx, cx - pw * 0.055, cy + ph * 0.02, ph * 0.06, "#5a3b32");
    robe(ctx, cx + pw * 0.055, cy + ph * 0.02, ph * 0.05, "#31404a");
    ctx.strokeStyle = CINNABAR;
    ctx.beginPath();
    ctx.moveTo(cx, cy - ph * 0.16);
    ctx.lineTo(cx - pw * 0.04, cy - ph * 0.26);
    ctx.moveTo(cx, cy - ph * 0.16);
    ctx.lineTo(cx + pw * 0.05, cy - ph * 0.25);
    ctx.stroke();
  } else if (mode === 6) {
    const bands = ["#3d4a58", "#8d3d32", "#c6a15a"];
    bands.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x + pw * 0.1, y + ph * (0.16 + i * 0.2), pw * 0.8, ph * 0.16);
    });
    ctx.globalAlpha = 1;
    ctx.strokeStyle = GOLD_BRIGHT;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + pw * 0.14, y + ph * 0.58);
    ctx.lineTo(x + pw * 0.86, y + ph * 0.58);
    ctx.stroke();
    robe(ctx, cx - pw * 0.1, y + ph * 0.62, ph * 0.1, "#1a1612");
    robe(ctx, cx + pw * 0.1, y + ph * 0.62, ph * 0.1, "#1a1612");
  } else {
    const cols = 6;
    const rows = 8;
    const gw = pw * 0.78;
    const gh = ph * 0.62;
    const gx = cx - gw / 2;
    const gy = y + ph * 0.12;
    const cw = gw / cols;
    const rh = gh / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const cell = (r * cols + c + n) % 7;
        ctx.fillStyle = cell === 0 ? "#f7f1e4" : cell === 1 ? "#d9c7a4" : cell === 2 ? CINNABAR : "#efe6d6";
        ctx.globalAlpha = cell === 2 ? 0.85 : 0.95;
        ctx.fillRect(gx + c * cw + 1, gy + r * rh + 1, cw - 2, rh - 2);
        ctx.globalAlpha = 1;
        if (cell !== 2) rulings(ctx, gx + c * cw + 3, gy + r * rh + 4, cw - 8, 2);
      }
    }
    ctx.fillStyle = GOLD;
    ctx.fillRect(cx - cw * 0.7, cy - rh * 0.2, cw * 1.4, rh * 1.3);
    robe(ctx, cx, cy + rh * 0.35, rh * 0.7, "#3e342c");
  }

  rulings(ctx, x + pw * 0.14, y + ph * 0.84, pw * 0.72, 3);

  ctx.fillStyle = CINNABAR;
  ctx.beginPath();
  ctx.arc(x + pw * 0.84, y + ph * 0.84, Math.max(7, w * 0.028), 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = GOLD_BRIGHT;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(x + pw * 0.84, y + ph * 0.84, Math.max(4, w * 0.015), n % 2 === 0 ? 0 : Math.PI, Math.PI * 1.7);
  ctx.stroke();

  frame(ctx, x, y, pw, ph);

  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#1a120c";
  for (let i = 0; i < 70; i += 1) {
    ctx.fillRect(rand() * w, rand() * h, 1.2, 1.2);
  }
  ctx.globalAlpha = 1;
}
