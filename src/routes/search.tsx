import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/storefront/ProductGrid";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — NEEDLORE" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.category.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="font-display text-4xl lg:text-5xl text-center mb-8">Search</h1>
      <div className="max-w-xl mx-auto relative mb-12">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search dresses, tops, coord sets…"
          className="w-full border border-border pl-11 pr-4 py-3 bg-background text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {q.trim() === "" ? (
        <p className="text-center text-muted-foreground">Start typing to find pieces.</p>
      ) : results.length === 0 ? (
        <p className="text-center text-muted-foreground">No matches for "{q}"</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6 text-center">{results.length} result{results.length === 1 ? "" : "s"}</p>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
