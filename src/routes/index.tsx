import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroBanner } from "@/components/storefront/HeroBanner";
import { CategoryCircles } from "@/components/storefront/CategoryCircles";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import { getBestsellers, getNewArrivals, products } from "@/data/products";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lilac & co. — Quietly considered womenswear" },
      { name: "description", content: "Discover Lilac & co. — tops, dresses, coord sets and silk loungewear, made with care. Shop new arrivals and bestsellers." },
      { property: "og:title", content: "Lilac & co. — Quietly considered womenswear" },
      { property: "og:description", content: "Tops, dresses, coord sets and silk loungewear made with care." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();

  return (
    <div>
      <CategoryCircles />

      <HeroBanner
        image={hero1}
        eyebrow="Summer Edit"
        title="Lyra Dress"
        ctaTo="/products/$slug"
        priority
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Just landed</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">New Arrivals</h2>
            </div>
            <Link to="/collections" className="text-xs uppercase tracking-widest hover:text-primary hidden sm:block">
              View all →
            </Link>
          </div>
          <ProductGrid products={newArrivals.length ? newArrivals : products.slice(0, 4)} />
        </div>
      </section>

      <HeroBanner
        image={hero2}
        eyebrow="The atelier"
        title="Made to be lived in"
        ctaLabel="Explore"
        align="center"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Most loved</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">Bestsellers</h2>
            </div>
            <Link to="/collections" className="text-xs uppercase tracking-widest hover:text-primary hidden sm:block">
              View all →
            </Link>
          </div>
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">As seen on</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 font-display text-xl sm:text-2xl text-muted-foreground/70">
            <span>VOGUE</span>
            <span className="italic">elle</span>
            <span>HARPER'S</span>
            <span>GRAZIA</span>
            <span className="italic">cosmopolitan</span>
          </div>
        </div>
      </section>
    </div>
  );
}
