import { Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";

export function CategoryCircles() {
  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 sm:gap-8 lg:gap-12 overflow-x-auto no-scrollbar justify-start lg:justify-center">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="flex flex-col items-center flex-shrink-0 group"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="mt-2 text-xs sm:text-sm text-foreground tracking-wide text-center max-w-24 leading-tight">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
