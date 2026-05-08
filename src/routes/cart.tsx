import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart, cartSubtotal, formatINR } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — NEEDLORE" }, { name: "description", content: "Review your bag." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const subtotal = cartSubtotal(items);
  const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 99;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="font-display text-4xl lg:text-5xl text-center mb-10">Your Bag</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">Your bag is currently empty.</p>
          <Link to="/collections" className="bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-[0.25em] inline-block">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-6">
                <Link to="/products/$slug" params={{ slug: item.slug }} className="block w-24 h-32 sm:w-28 sm:h-36 bg-muted shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to="/products/$slug" params={{ slug: item.slug }} className="font-medium hover:text-primary">{item.name}</Link>
                    <span className="font-medium">{formatINR(item.price * item.qty)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.color} · {item.size}</p>
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex items-center border border-border">
                      <button onClick={() => setQty(item.productId, item.size, item.color, item.qty - 1)} className="px-3 py-1.5 hover:bg-muted">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 text-sm w-10 text-center">{item.qty}</span>
                      <button onClick={() => setQty(item.productId, item.size, item.color, item.qty + 1)} className="px-3 py-1.5 hover:bg-muted">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => remove(item.productId, item.size, item.color)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-secondary/40 p-6 h-fit">
            <h2 className="font-display text-2xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                <span>Total</span><span>{formatINR(subtotal + shipping)}</span>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 block text-center bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.25em] hover:bg-accent transition-colors">
              Proceed to checkout
            </Link>
            <Link to="/collections" className="mt-3 block text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
