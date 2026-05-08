import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/store/wishlist";
import type { Product } from "@/data/products";
import { formatINR } from "@/store/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const has = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const img = hover && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block relative overflow-hidden bg-muted aspect-[4/5]"
      >
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {(product.isNew || product.isBestseller || product.compareAt) && (
          <span className="absolute top-3 left-3 bg-background/90 text-[10px] tracking-widest uppercase px-2 py-1 text-foreground">
            {product.compareAt ? "Sale" : product.isNew ? "New" : "Bestseller"}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
        >
          <Heart className={cn("h-4 w-4", has && "fill-primary text-primary")} />
        </button>
      </Link>
      <div className="mt-3 px-1">
        <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
          <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm text-foreground">{formatINR(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>
        {product.colors.length > 1 && (
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
