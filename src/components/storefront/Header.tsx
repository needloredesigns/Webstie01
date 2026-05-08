import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart, cartCount } from "@/store/cart";
import { categories } from "@/data/categories";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV = [
  { label: "Women", to: "/collections" as const },
  { label: "Men", to: "/collections" as const },
  { label: "Clearance Sale", to: "/collections" as const },
  { label: "#YOU", to: "/" as const },
  { label: "30-min Delivery", to: "/" as const },
];

export function Header() {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const count = cartCount(items);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Mobile menu */}
          <div className="flex lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger aria-label="Open menu" className="p-2 -ml-2">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-96 bg-background">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl tracking-widest">LILAC & co.</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col">
                  {NAV.map((n) => (
                    <Link
                      key={n.label}
                      to={n.to}
                      onClick={() => setMenuOpen(false)}
                      className="py-3 border-b border-border text-sm tracking-widest uppercase"
                    >
                      {n.label}
                    </Link>
                  ))}
                  <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Shop by category</div>
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/collections/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setMenuOpen(false)}
                      className="py-2.5 text-sm border-b border-border/60"
                    >
                      {c.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav left */}
          <nav className="hidden lg:flex items-center gap-7 flex-1">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="text-[12px] uppercase tracking-[0.18em] text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Logo center */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-center">
            <Logo />
          </div>

          {/* Icons right */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-1 justify-end">
            <Link to="/search" aria-label="Search" className="p-2 hover:text-primary">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/account" aria-label="Account" className="hidden sm:inline-flex p-2 hover:text-primary">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/account" aria-label="Wishlist" className="hidden sm:inline-flex p-2 hover:text-primary">
              <Heart className="h-5 w-5" />
            </Link>
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative p-2 hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-medium rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
