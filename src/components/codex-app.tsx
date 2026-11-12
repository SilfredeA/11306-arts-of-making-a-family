import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import {
  CHAMBERS,
  TOTAL,
  chamberBounds,
  samples,
  type Chamber,
} from "@/codex/catalog";
import { leafOf } from "@/codex/leaf";
import { INKS, recipeOf } from "@/codex/ink";
import { paintedOf, type PaintedPlan } from "@/codex/painted";
import { Plate } from "@/components/plate";

type Search = {
  v?: "movements" | "library" | "leaf";
  n?: number;
  c?: number;
  b?: "painted" | "quarry";
};

type BranchId = "painted" | "quarry";

type Navigate = (opts: { search: Search; replace?: boolean }) => void;

const LAST_KEY = "codex-last-leaf";
const KEPT_KEY = "codex-kept-leaves";

function readNumber(key: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = Number(localStorage.getItem(key));
  if (!Number.isFinite(raw) || raw < 1 || raw > TOTAL) return null;
  return Math.floor(raw);
}

function readKept(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEPT_KEY) || "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter((n): n is number => typeof n === "number" && n >= 1 && n <= TOTAL).slice(0, 36);
  } catch {
    return [];
  }
}

function leafPath(n: number, branch: BranchId) {
  return `/?v=leaf&n=${n}&b=${branch}`;
}

function ActiveLink({ n, branch }: { n: number; branch: BranchId }) {
  const path = leafPath(n, branch);
  const [full, setFull] = useState(path);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const publishable =
      host === "grok.me" || host.endsWith(".grok.me") || host.endsWith(".grok.com");
    setFull(publishable ? `${window.location.origin}${path}` : path);
    setCopied(false);
  }, [path]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-5 flex min-w-0 items-center gap-2 border border-gold/30 bg-panel">
      <Link
        to="/"
        search={{ v: "leaf", n }}
        className="min-w-0 flex-1 truncate px-3 py-3 text-sm text-gold"
      >
        {full}
      </Link>
      <button type="button" onClick={copy} className="h-11 shrink-0 px-3 text-sm text-vellum">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function CodexApp({ search, navigate }: { search: Search; navigate: Navigate }) {
  const branch: BranchId = search.b === "quarry" ? "quarry" : "painted";
  const go = (next: Search, replace?: boolean) =>
    navigate({
      search: { ...next, b: next.b ?? branch },
      replace,
    });

  if (search.v === "movements") {
    return <Movements focus={search.c} go={go} />;
  }
  if (search.v === "library") {
    return <Library go={go} branch={branch} />;
  }
  if (search.v === "leaf") {
    return <LeafReader n={search.n ?? 1} go={go} branch={branch} />;
  }
  return <Threshold go={go} branch={branch} />;
}

function Bar({
  title,
  onBack,
  action,
}: {
  title: string;
  onBack: () => void;
  action?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-gold/20 bg-ink/95 px-3 py-2 backdrop-blur-md">
      <button
        type="button"
        onClick={onBack}
        className="grid size-11 shrink-0 place-items-center text-gold"
        aria-label="Back"
      >
        <ArrowLeft className="size-5" />
      </button>
      <p className="display min-w-0 flex-1 truncate text-2xl text-gold">{title}</p>
      {action}
    </header>
  );
}

function BranchSwitch({
  branch,
  onPick,
}: {
  branch: BranchId;
  onPick: (branch: BranchId) => void;
}) {
  return (
    <div className="mt-6 flex gap-2">
      <button
        type="button"
        aria-pressed={branch === "painted"}
        onClick={() => onPick("painted")}
        className={
          branch === "painted"
            ? "h-11 border border-gold px-4 text-sm font-medium text-gold"
            : "h-11 border border-gold/40 px-4 text-sm text-vellum"
        }
      >
        Painted branch
      </button>
      <button
        type="button"
        aria-pressed={branch === "quarry"}
        onClick={() => onPick("quarry")}
        className={
          branch === "quarry"
            ? "h-11 border border-gold px-4 text-sm font-medium text-gold"
            : "h-11 border border-gold/40 px-4 text-sm text-vellum"
        }
      >
        The quarry
      </button>
    </div>
  );
}

function Threshold({ go, branch }: { go: (next: Search, replace?: boolean) => void; branch: BranchId }) {
  const [last, setLast] = useState<number | null>(null);
  useEffect(() => {
    setLast(readNumber(LAST_KEY));
  }, []);
  const painted = branch === "painted";

  return (
    <main className="safe-bottom mx-auto min-h-dvh max-w-6xl px-5 py-8 md:px-10 md:py-14">
      <p className="text-xs font-medium tracking-widest text-gold uppercase">
        {painted ? "The cover" : "The quarry"}
      </p>
      <div className="mt-6 grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <figure className="cover-board">
          <img
            src={painted ? "/cover/board.jpg" : "/chambers/mirror.jpg"}
            alt={painted ? "" : "A person finally meeting their own face in a dark mirror"}
          />
          {painted ? (
            <div className="cover-letter">
              <p className="text-xs tracking-widest text-gold uppercase">Eleven movements</p>
              <p className="display mt-3 text-6xl leading-none text-gold md:text-7xl">11,306</p>
              <h1>Arts of Making a Family</h1>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-vellum italic">
                Evil, meeting its own face, does not survive the looking.
              </p>
            </div>
          ) : null}
        </figure>
        <div>
          {painted ? null : <h1 className="display text-5xl">The quarry</h1>}
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Evil rarely kicks in the door. It sits down, changes the subject, and teaches the
            children to call the silence peace. This book is the counter-teaching. Harm is made to
            meet its own face. What overcomes it is not a prettier story. It is sight, account,
            mercy, and the long ordinary work of a family that can tell the truth and still pass
            the bread.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-vellum">
            {painted
              ? "The cover is the empty plate: night before a house is made. The gold is the binding. Inside, each of the 11,306 leaves is a figured painting. Hands keep five fingers. Each person keeps two legs. A fragment of the old books stays in the margin, unrevised."
              : "The quarry is the archive itself: folios, anatomies, plants, and faces, cut free of the phone and laid into a structure the next leaf refuses. Nothing here is repainted. The material keeps its own face."}
          </p>
          <BranchSwitch branch={branch} onPick={(next) => go({ b: next })} />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => go({ v: "movements" })}
              className="h-12 bg-gold px-5 text-sm font-medium text-ink"
            >
              Open the book
            </button>
            <button
              type="button"
              onClick={() => go({ v: "library" })}
              className="h-12 border border-gold/40 px-5 text-sm text-vellum"
            >
              Enter the library
            </button>
          </div>
          {last ? (
            <button
              type="button"
              onClick={() => go({ v: "leaf", n: last })}
              className="mt-4 text-sm text-gold underline-offset-4 hover:underline"
            >
              Continue at leaf {last.toLocaleString()}
            </button>
          ) : null}
        </div>
      </div>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="display text-3xl">Eleven doors</h2>
          <p className="text-xs tracking-widest text-muted uppercase">One movement, then the leaves</p>
        </div>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
          {CHAMBERS.map((chamber, index) => (
            <button
              key={chamber.id}
              type="button"
              onClick={() => go({ v: "movements", c: index })}
              className="w-36 shrink-0 text-left md:w-44"
            >
              <img
                src={chamber.image}
                alt=""
                className="plate-frame w-full border border-gold/25 object-cover"
              />
              <span className="mt-2 block text-xs tracking-widest text-gold">{chamber.numeral}</span>
              <span className="display block text-xl leading-tight">{chamber.title}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="display text-3xl">No two leaves match</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {painted
            ? "Each leaf is its own edition. The figure changes, the margin changes, and the number is painted once."
            : "Each leaf cuts the archive differently. The next one refuses the last one’s shape."}
        </p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
          {[1, 2, 3, 48, 210, 1024, 4096, 9000, 11306].map((n) => (
            <button key={n} type="button" onClick={() => go({ v: "leaf", n })} className="w-28 shrink-0">
              <div className="plate-frame overflow-hidden border border-gold/25 bg-panel">
                <Plate n={n} branch={branch} label={`Leaf ${n}`} />
              </div>
              <span className="mt-1 block text-center text-xs text-muted tabular-nums">{n.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </section>
      <Colophon />
    </main>
  );
}

function Movements({ focus, go }: { focus?: number; go: (next: Search, replace?: boolean) => void }) {
  useEffect(() => {
    if (focus === undefined) return;
    document.getElementById(`movement-${focus}`)?.scrollIntoView({ block: "start" });
  }, [focus]);

  return (
    <div className="safe-bottom min-h-dvh">
      <Bar title="Eleven doors" onBack={() => go({})} />
      <div className="mx-auto max-w-3xl">
        {CHAMBERS.map((chamber, index) => (
          <Movement
            key={chamber.id}
            chamber={chamber}
            index={index}
            onOpen={(n) => go({ v: "leaf", n })}
          />
        ))}
        <div className="px-5 py-10">
          <Colophon />
        </div>
      </div>
    </div>
  );
}

function Movement({
  chamber,
  index,
  onOpen,
}: {
  chamber: Chamber;
  index: number;
  onOpen: (n: number) => void;
}) {
  const [start, end] = chamberBounds(index);
  return (
    <article id={`movement-${index}`} className="scroll-mt-16 border-b border-gold/15">
      <img
        src={chamber.image}
        alt={chamber.title}
        className="max-h-[70dvh] w-full object-cover"
      />
      <div className="px-5 py-8 md:px-8">
        <p className="text-xs tracking-widest text-gold uppercase">
          {chamber.numeral} · Leaves {start.toLocaleString()}–{end.toLocaleString()}
        </p>
        <h2 className="display mt-2 text-5xl">{chamber.title}</h2>
        <p className="display mt-4 text-2xl leading-snug text-gold italic">{chamber.thesis}</p>
        <p className="mt-5 text-base leading-relaxed text-vellum md:text-lg">{chamber.essay}</p>
        <button
          type="button"
          onClick={() => onOpen(start)}
          className="mt-6 h-12 border border-gold/40 px-5 text-sm text-vellum"
        >
          Open these leaves
        </button>
      </div>
    </article>
  );
}

function Library({
  go,
  branch,
}: {
  go: (next: Search, replace?: boolean) => void;
  branch: BranchId;
}) {
  const [kept, setKept] = useState<number[]>([]);
  const [draft, setDraft] = useState("1");

  useEffect(() => {
    setKept(readKept());
  }, []);

  const jump = (event: FormEvent) => {
    event.preventDefault();
    const n = Math.min(TOTAL, Math.max(1, Math.floor(Number(draft))));
    if (Number.isFinite(n)) go({ v: "leaf", n });
  };

  return (
    <div className="safe-bottom min-h-dvh">
      <Bar title="The library" onBack={() => go({})} />
      <main className="mx-auto max-w-3xl px-5 py-6">
        <p className="text-base leading-relaxed text-muted">
          {branch === "painted"
            ? "Eleven bands. 11,306 editions. Each leaf is a figured painting — a person, a thing they refuse to hide, and a fragment of the archive kept in the margin."
            : "Eleven bands. 11,306 leaves. Each leaf is the archive cut once — a person, a thing they refuse to hide, and a teaching kept in the margin."}
        </p>
        <form onSubmit={jump} className="mt-5 flex gap-2">
          <label className="sr-only" htmlFor="jump">
            Leaf number
          </label>
          <input
            id="jump"
            inputMode="numeric"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="h-12 min-w-0 flex-1 border border-gold/30 bg-panel px-3 text-vellum tabular-nums"
            placeholder="Leaf 1 – 11306"
          />
          <button type="submit" className="h-12 bg-gold px-4 text-sm font-medium text-ink">
            Open
          </button>
        </form>

        {kept.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-xs tracking-widest text-gold uppercase">Kept</h2>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {kept.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => go({ v: "leaf", n })}
                  className="h-11 shrink-0 border border-gold/30 px-3 text-sm tabular-nums text-vellum"
                >
                  {n.toLocaleString()}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex flex-col gap-8">
          {CHAMBERS.map((chamber, index) => {
            const [start, end] = chamberBounds(index);
            return (
              <section key={chamber.id}>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-widest text-gold">{chamber.numeral}</p>
                    <h2 className="display text-3xl">{chamber.title}</h2>
                    <p className="text-xs text-muted tabular-nums">
                      {start.toLocaleString()} – {end.toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => go({ v: "movements", c: index })}
                    className="h-11 shrink-0 px-2 text-sm text-gold"
                  >
                    The door
                  </button>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {samples(index, 8).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => go({ v: "leaf", n })}
                      aria-label={`Open leaf ${n} in ${chamber.title}`}
                      className="w-16 shrink-0"
                    >
                      <div className="plate-frame overflow-hidden border border-gold/20 bg-panel">
                        <Plate n={n} branch={branch} decorative label={`Leaf ${n}`} />
                      </div>
                      <span className="mt-1 block text-center text-xs text-muted tabular-nums">
                        {n.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <Colophon />
      </main>
    </div>
  );
}

function LeafReader({
  n,
  go,
  branch,
}: {
  n: number;
  go: (next: Search, replace?: boolean) => void;
  branch: BranchId;
}) {
  const leaf = leafOf(n);
  const recipe = recipeOf(n);
  const plan: PaintedPlan = paintedOf(n);
  const [kept, setKept] = useState(false);
  const [draft, setDraft] = useState(String(n));
  const [start, end] = chamberBounds(CHAMBERS.findIndex((item) => item.id === leaf.chamber.id));

  useEffect(() => {
    localStorage.setItem(LAST_KEY, String(n));
    setKept(readKept().includes(n));
    setDraft(String(n));
  }, [n]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowRight" && n < TOTAL) go({ v: "leaf", n: n + 1 });
      if (event.key === "ArrowLeft" && n > 1) go({ v: "leaf", n: n - 1 });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, go]);

  const toggleKept = () => {
    const current = readKept();
    const next = current.includes(n) ? current.filter((item) => item !== n) : [n, ...current].slice(0, 36);
    localStorage.setItem(KEPT_KEY, JSON.stringify(next));
    setKept(next.includes(n));
  };

  const jump = (event: FormEvent) => {
    event.preventDefault();
    const next = Math.min(TOTAL, Math.max(1, Math.floor(Number(draft))));
    if (Number.isFinite(next)) go({ v: "leaf", n: next });
  };

  const neighbors = [n - 2, n - 1, n, n + 1, n + 2].filter((item) => item >= 1 && item <= TOTAL);

  return (
    <div className="safe-bottom min-h-dvh">
      <Bar
        title={`Leaf ${n.toLocaleString()}`}
        onBack={() => go({ v: "library" })}
        action={
          <button
            type="button"
            onClick={toggleKept}
            className="grid size-11 place-items-center"
            aria-pressed={kept}
            aria-label={kept ? "Remove from kept leaves" : "Keep this leaf"}
          >
            <Bookmark className={kept ? "size-5 fill-gold text-gold" : "size-5 text-gold"} />
          </button>
        }
      />
      <article key={n} className="leaf-in mx-auto grid max-w-5xl gap-6 px-5 py-6 md:grid-cols-2 md:px-8 md:py-10">
        <div className="plate-frame overflow-hidden border border-gold/30 bg-panel">
          <Plate
            n={n}
            branch={branch}
            label={
              branch === "painted"
                ? `${plan.name}. ${plan.master.title}. ${leaf.title}`
                : `${recipe.name}. ${leaf.title}`
            }
          />
          {branch === "quarry" ? (
            <p className="absolute right-2 bottom-2 bg-ink/80 px-2 py-1 text-xs text-gold tabular-nums">
              {n.toLocaleString()}
            </p>
          ) : null}
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              go({
                v: "movements",
                c: CHAMBERS.findIndex((item) => item.id === leaf.chamber.id),
              })
            }
            className="text-left text-xs tracking-widest text-gold uppercase"
          >
            {leaf.chamber.numeral} · {leaf.chamber.title}
          </button>
          <h1 className="display mt-3 text-4xl leading-tight md:text-5xl">{leaf.title}</h1>
          <BranchSwitch branch={branch} onPick={(next) => go({ v: "leaf", n, b: next })} />
          <ActiveLink n={n} branch={branch} />
          <p className="mt-5 text-base leading-relaxed text-vellum md:text-lg">{leaf.body}</p>
          <blockquote className="mt-6 border-l border-cinnabar pl-4">
            <p className="text-xs tracking-widest text-cinnabar uppercase">{leaf.tradition.name}</p>
            {leaf.tradition.line ? (
              <p className="display mt-2 text-xl leading-snug italic">“{leaf.tradition.line}”</p>
            ) : null}
            {leaf.tradition.source ? (
              <p className="mt-1 text-xs text-muted">{leaf.tradition.source}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted">{leaf.tradition.beside}</p>
          </blockquote>
          <p className="mt-5 text-sm text-muted">
            {branch === "painted"
              ? `In conversation with ${plan.master.voices}. This leaf also keeps company with ${leaf.school}.`
              : `In conversation with ${leaf.school}.`}
          </p>
          <figure className="mt-6 border border-gold/25 bg-panel px-4 py-3">
            <p className="text-xs tracking-widest text-gold uppercase">
              {branch === "painted" ? "Edition painted only for this leaf" : "Cut only for this leaf"}
            </p>
            <p className="display mt-1 text-2xl text-vellum">
              {branch === "painted" ? plan.name : recipe.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-vellum">
              {branch === "painted" ? plan.method : recipe.method}
            </p>
            {branch === "painted" ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Figure: {plan.master.title}. {plan.master.method} Archive held beside it:{" "}
                {plan.inks.map((i) => INKS[i].caption).join("; ")}.
              </p>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Ink from the archive: {recipe.inks.map((i) => INKS[i].caption).join("; ")}.
              </p>
            )}
          </figure>
          <p className="mt-1 text-xs text-muted tabular-nums">
            Leaves in this movement {start.toLocaleString()}–{end.toLocaleString()}
          </p>
        </div>
      </article>

      <div className="mx-auto max-w-5xl px-5 pb-10 md:px-8">
        <form onSubmit={jump} className="flex items-center gap-3">
          <button
            type="button"
            disabled={n <= 1}
            onClick={() => go({ v: "leaf", n: n - 1 })}
            className="grid size-12 shrink-0 place-items-center border border-gold/30 text-gold disabled:opacity-30"
            aria-label="Previous leaf"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <label className="sr-only" htmlFor="leaf-range">
              Choose a leaf
            </label>
            <input
              id="leaf-range"
              className="codex-range"
              type="range"
              min={1}
              max={TOTAL}
              value={n}
              onChange={(event) => go({ v: "leaf", n: Number(event.target.value) }, true)}
            />
            <div className="mt-2 flex gap-2">
              <input
                aria-label="Leaf number"
                inputMode="numeric"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="h-11 w-28 border border-gold/30 bg-panel px-2 text-sm text-vellum tabular-nums"
              />
              <button type="submit" className="h-11 px-3 text-sm text-gold">
                Go
              </button>
              <span className="ml-auto self-center text-xs text-muted tabular-nums">
                {n.toLocaleString()} / {TOTAL.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={n >= TOTAL}
            onClick={() => go({ v: "leaf", n: n + 1 })}
            className="grid size-12 shrink-0 place-items-center border border-gold/30 text-gold disabled:opacity-30"
            aria-label="Next leaf"
          >
            <ArrowRight className="size-5" />
          </button>
        </form>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {neighbors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => go({ v: "leaf", n: item })}
              aria-current={item === n ? "true" : undefined}
              className={
                item === n
                  ? "h-11 shrink-0 border border-gold bg-gold px-3 text-sm text-ink tabular-nums"
                  : "h-11 shrink-0 border border-gold/25 px-3 text-sm text-muted tabular-nums"
              }
            >
              {item.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Colophon() {
  return (
    <footer className="mt-12 border-t border-gold/20 pt-6 text-sm leading-relaxed text-muted">
      <p>
        Two branches, one count. The quarry keeps the archive as it was cut: folios, anatomies,
        plants, faces. The painted branch transforms that material into figured editions. The body
        is not shattered to prove a theory. Where a studio made its name by breaking the figure —
        Bosch, Munch, Schiele, Dalí, Magritte, Miró, Ernst, Chagall, Bacon, Richter — this codex
        takes the philosophy and refuses the extra finger. A family cannot be taught by a hand that
        cannot be counted.
      </p>
      <p className="mt-3">
        Teachings are approached as a visitor approaches an old library. Public-domain lines are
        attributed. Everything else is a meditation beside the tradition, not a claim to speak for
        it. Oral ceremonies that are not ours to borrow are not borrowed. The spine is shared and
        hard: harm meets its own face inside a house, and does not survive an honest looking.
      </p>
    </footer>
  );
}
