import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Shop All — Lilac & co." },
      { name: "description", content: "Browse the entire Lilac & co. collection — tops, dresses, coord sets, loungewear and more." },
      { property: "og:title", content: "Shop All — Lilac & co." },
      { property: "og:description", content: "Browse the entire Lilac & co. collection." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Shop the edit</p>
        <h1 className="font-display text-4xl lg:text-6xl">All Pieces</h1>
        <p className="mt-3 text-sm text-muted-foreground">{products.length} pieces · across {categories.length} categories</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <Link to="/collections" className="px-4 py-1.5 text-xs uppercase tracking-widest border border-foreground bg-foreground text-background">All</Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className="px-4 py-1.5 text-xs uppercase tracking-widest border border-border hover:border-foreground hover:bg-secondary transition-colors"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
