import { Link } from "@tanstack/react-router";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, cartSubtotal, formatINR } from "@/store/cart";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();
  const subtotal = cartSubtotal(items);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-background p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="font-display text-2xl tracking-wide flex items-center justify-between">
            Your Bag <span className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""}</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-muted-foreground mb-4">Your bag is empty.</p>
            <Link
              to="/collections"
              onClick={close}
              className="bg-primary text-primary-foreground px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                  <Link
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    onClick={close}
                    className="block w-20 h-24 bg-muted shrink-0 overflow-hidden"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.slug }}
                        onClick={close}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <button onClick={() => remove(item.productId, item.size, item.color)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.color} · {item.size}
                    </p>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQty(item.productId, item.size, item.color, item.qty - 1)}
                          className="px-2 py-1 hover:bg-muted"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.productId, item.size, item.color, item.qty + 1)}
                          className="px-2 py-1 hover:bg-muted"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">{formatINR(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatINR(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={close}
                className="block text-center bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.25em] hover:bg-accent transition-colors"
              >
                Checkout · {formatINR(subtotal)}
              </Link>
              <Link
                to="/cart"
                onClick={close}
                className="block text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                View bag
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
