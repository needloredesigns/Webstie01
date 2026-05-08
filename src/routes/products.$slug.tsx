import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { getProduct, getProductsByCategory } from "@/data/products";
import { getCategory } from "@/data/categories";
import { useCart, formatINR } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { ProductGrid } from "@/components/storefront/ProductGrid";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${p.name} — Lilac & co.` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Lilac & co.` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.images[0] },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="text-center py-20">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/collections" className="mt-4 inline-block text-sm underline">Continue shopping</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/data/products").Product };
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [activeImg, setActiveImg] = useState(0);
  const add = useCart((s) => s.add);
  const wishlistHas = useWishlist((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const cat = getCategory(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
    });
    toast.success("Added to bag", { description: `${product.name} · ${color} · ${size}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      <nav className="text-xs text-muted-foreground mb-6 flex gap-2">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        {cat && (
          <>
            <Link to="/collections/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-muted overflow-hidden">
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "aspect-square overflow-hidden border-2",
                  i === activeImg ? "border-primary" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {(product.isNew || product.isBestseller) && (
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {product.isNew ? "New arrival" : "Bestseller"}
            </p>
          )}
          <h1 className="font-display text-4xl lg:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            )}
          </div>
          <p className="mt-5 text-sm text-foreground/80 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest mb-3">Color · <span className="text-muted-foreground">{color}</span></p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition",
                    color === c.name ? "border-foreground" : "border-border"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs uppercase tracking-widest">Size</p>
              <button className="text-xs underline text-muted-foreground">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 px-4 py-2.5 text-sm border transition-colors",
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.25em] hover:bg-accent transition-colors"
            >
              Add to bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className="px-4 border border-border hover:border-foreground"
            >
              <Heart className={cn("h-5 w-5", wishlistHas && "fill-primary text-primary")} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="border border-border p-3">
              <Truck className="h-4 w-4 mx-auto mb-1.5 text-primary" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Free Shipping</p>
            </div>
            <div className="border border-border p-3">
              <RotateCcw className="h-4 w-4 mx-auto mb-1.5 text-primary" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Easy Returns</p>
            </div>
            <div className="border border-border p-3">
              <ShieldCheck className="h-4 w-4 mx-auto mb-1.5 text-primary" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Secure Checkout</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="mt-8" defaultValue="details">
            <AccordionItem value="details">
              <AccordionTrigger className="text-xs uppercase tracking-widest">Product details</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                  {product.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xs uppercase tracking-widest">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/80">
                Free standard shipping on orders over ₹2,500. 30-min delivery available in Bangalore.
                Hassle-free 14-day returns and exchanges.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl mb-8 text-center">You may also love</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
