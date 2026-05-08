import tops from "@/assets/cat-tops.jpg";
import shirts from "@/assets/cat-shirts.jpg";
import dresses from "@/assets/cat-dresses.jpg";
import skirts from "@/assets/cat-skirts.jpg";
import coord from "@/assets/cat-coord.jpg";
import loungewear from "@/assets/cat-loungewear.jpg";
import gifting from "@/assets/cat-gifting.jpg";

export type Category = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
};

export const categories: Category[] = [
  { slug: "tops", name: "Tops", image: tops, blurb: "Effortless everyday tops, blouses & cropped silhouettes." },
  { slug: "shirts", name: "Shirts", image: shirts, blurb: "Crisp linen, breezy poplin and oversized button-ups." },
  { slug: "dresses", name: "Dresses", image: dresses, blurb: "From slip silks to flowing maxis — dresses for every moment." },
  { slug: "skirts", name: "Skirts", image: skirts, blurb: "Pleated minis to tailored midis — pair with anything." },
  { slug: "coord-sets", name: "Coord Sets", image: coord, blurb: "Matching sets that do all the styling for you." },
  { slug: "premium-loungewear", name: "Premium Loungewear", image: loungewear, blurb: "Silk, modal and cotton sets for slow mornings." },
  { slug: "gifting", name: "Gifting", image: gifting, blurb: "Beautifully wrapped pieces — ready to give." },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
