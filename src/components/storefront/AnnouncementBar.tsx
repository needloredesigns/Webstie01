import { Link } from "@tanstack/react-router";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-[11px] sm:text-xs tracking-[0.18em] uppercase text-center py-2 px-4">
      <span className="hidden sm:inline">Free shipping on orders over ₹2,500 · </span>
      <span>₹100 off on prepaid orders · </span>
      <Link to="/" className="underline-offset-4 hover:underline">Hassle-free returns</Link>
    </div>
  );
}
