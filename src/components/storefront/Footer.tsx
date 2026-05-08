import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl tracking-[0.2em]">NEEDLORE</span>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Quietly considered womenswear from our atelier — thoughtful pieces, made to be lived in.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="p-2 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="p-2 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/collections/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping & Delivery</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
            <li>Track Order</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs uppercase tracking-[0.2em] mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">
            10% off your first order — plus first dibs on new drops.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border border-border rounded-sm overflow-hidden bg-background"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 bg-transparent text-sm focus:outline-none"
            />
            <button className="bg-primary text-primary-foreground text-xs uppercase tracking-widest px-4 hover:bg-accent transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} NEEDLORE — All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
