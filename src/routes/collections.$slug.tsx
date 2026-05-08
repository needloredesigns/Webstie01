import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { getCategory, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => {
    const cat = loaderData?.cat;
    if (!cat) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${cat.name} — NEEDLORE` },
        { name: "description", content: cat.blurb },
        { property: "og:title", content: `${cat.name} — NEEDLORE` },
        { property: "og:description", content: cat.blurb },
        { property: "og:image", content: cat.image },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="text-center py-20">
      <h1 className="font-display text-3xl">Collection not found</h1>
      <Link to="/collections" className="mt-4 inline-block text-sm underline">View all collections</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData() as { cat: import("@/data/categories").Category };
  const items = getProductsByCategory(cat.slug);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Collection</p>
        <h1 className="font-display text-4xl lg:text-6xl">{cat.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">{cat.blurb}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <Link to="/collections" className="px-4 py-1.5 text-xs uppercase tracking-widest border border-border hover:border-foreground hover:bg-secondary">All</Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
              c.slug === cat.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground hover:bg-secondary"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={items} />
    </div>
  );
}
