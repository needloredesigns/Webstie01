import { Link } from "@tanstack/react-router";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={className ?? "block"}>
      <span className="font-display text-2xl sm:text-3xl tracking-[0.2em] text-foreground">
        LILAC
      </span>
      <span className="font-display italic text-xs tracking-[0.3em] text-primary block leading-none -mt-0.5 text-center">
        & co.
      </span>
    </Link>
  );
}
