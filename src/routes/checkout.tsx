import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart, cartSubtotal, formatINR } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Lilac & co." }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const subtotal = cartSubtotal(items);
  const shipping = subtotal > 2500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-4" />
        <h1 className="font-display text-4xl">Thank you</h1>
        <p className="mt-3 text-muted-foreground">Your order has been placed. We've sent a confirmation to your email.</p>
        <p className="mt-1 text-sm text-muted-foreground">Order #LC{Math.floor(Math.random() * 90000) + 10000}</p>
        <Link to="/" className="mt-8 inline-block bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-[0.25em]">
          Back to shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <Link to="/collections" className="mt-6 inline-block bg-primary text-primary-foreground px-8 py-3 text-xs uppercase tracking-[0.25em]">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="font-display text-4xl text-center mb-10">Checkout</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setPlaced(true);
        }}
        className="grid lg:grid-cols-[1fr_380px] gap-12"
      >
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-2xl mb-4">Contact</h2>
            <input required type="email" placeholder="Email" className="w-full border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Shipping address</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required placeholder="First name" className="border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Last name" className="border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Address" className="sm:col-span-2 border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="City" className="border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="PIN code" className="border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
              <input required placeholder="Phone" className="sm:col-span-2 border border-border px-4 py-3 bg-background text-sm focus:outline-none focus:border-primary" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Payment</h2>
            <div className="border border-border p-4 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="pay" defaultChecked className="accent-primary" />
                <span className="text-sm">Prepaid (UPI / Card / Netbanking) — ₹100 off applied at checkout</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="pay" className="accent-primary" />
                <span className="text-sm">Cash on Delivery</span>
              </label>
            </div>
          </section>

          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 text-xs uppercase tracking-[0.25em] hover:bg-accent transition-colors">
            Place order · {formatINR(total)}
          </button>
          <p className="text-xs text-muted-foreground text-center">This is a demo checkout — no real payment is processed.</p>
        </div>

        <aside className="bg-secondary/40 p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-4">Your order</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {items.map((i) => (
              <div key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-3 text-sm">
                <div className="w-14 h-16 bg-muted overflow-hidden shrink-0">
                  <img src={i.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.color} · {i.size} · ×{i.qty}</p>
                </div>
                <span>{formatINR(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            <div className="flex justify-between font-medium text-base pt-2 border-t border-border"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
        </aside>
      </form>
    </div>
  );
}
