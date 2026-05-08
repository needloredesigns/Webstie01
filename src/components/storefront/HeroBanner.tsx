import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

type Props = {
  image: string;
  eyebrow?: string;
  title: string;
  ctaLabel?: string;
  ctaTo?: string;
  align?: "left" | "right" | "center";
  priority?: boolean;
};

export function HeroBanner({ image, eyebrow, title, ctaLabel = "Shop Now", ctaTo = "/collections", align = "center", priority }: Props) {
  const alignCls =
    align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";
  return (
    <section className="relative w-full overflow-hidden bg-muted">
      <img
        src={image}
        alt={title}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/30" />
      <div className={`absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-24 px-6 lg:px-16 ${alignCls}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`flex flex-col ${alignCls}`}
        >
          {eyebrow && (
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90 mb-3">{eyebrow}</span>
          )}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-md">
            {title}
          </h1>
          <Link
            to={ctaTo as any}
            className="mt-6 inline-block bg-background text-foreground px-8 py-3 text-xs uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
