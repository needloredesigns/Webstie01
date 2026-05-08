import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/store/wishlist";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/storefront/ProductGrid";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Lilac & co." }] }),
  component: AccountPage,
});

function AccountPage() {
  const ids = useWishlist((s) => s.ids);
  const wishlistItems = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl lg:text-5xl">My Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to access orders, addresses, and saved pieces.</p>
      </div>

      <div className="max-w-md mx-auto bg-secondary/40 p-8 mb-12">
        <h2 className="font-display text-2xl mb-4">Sign in</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <input type="email" placeholder="Email" className="w-full border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
          <input type="password" placeholder="Password" className="w-full border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
          <button className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.25em] hover:bg-accent transition-colors">Sign in</button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-3">Demo only — accounts aren't wired up yet.</p>
      </div>

      <section>
        <h2 className="font-display text-3xl mb-6 text-center">Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">
            Your wishlist is empty. <Link to="/collections" className="underline">Browse pieces</Link> and tap the heart to save.
          </p>
        ) : (
          <ProductGrid products={wishlistItems} />
        )}
      </section>
    </div>
  );
}
