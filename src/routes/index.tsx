import { createFileRoute } from "@tanstack/react-router";
import { CodexApp } from "@/components/codex-app";
import { TOTAL } from "@/codex/catalog";

type CodexSearch = {
  v?: "movements" | "library" | "leaf";
  n?: number;
  c?: number;
  b?: "painted" | "quarry";
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): CodexSearch => {
    const v =
      search.v === "movements" || search.v === "library" || search.v === "leaf"
        ? search.v
        : undefined;
    const raw = typeof search.n === "number" ? search.n : Number(search.n);
    const n = Number.isFinite(raw) ? Math.min(TOTAL, Math.max(1, Math.floor(raw))) : undefined;
    const rawC = typeof search.c === "number" ? search.c : Number(search.c);
    const c = Number.isFinite(rawC) ? Math.min(10, Math.max(0, Math.floor(rawC))) : undefined;
    const b = search.b === "quarry" || search.b === "painted" ? search.b : undefined;
    return { v, n, c, b };
  },
  component: Home,
});

function Home() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <CodexApp search={search} navigate={navigate} />;
}