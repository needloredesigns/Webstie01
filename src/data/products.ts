import pinkblouse from "@/assets/p-pinkblouse.jpg";
import whiteshirt from "@/assets/p-whiteshirt.jpg";
import greendress from "@/assets/p-greendress.jpg";
import whiteskirt from "@/assets/p-whiteskirt.jpg";
import tealcoord from "@/assets/p-tealcoord.jpg";
import creampajama from "@/assets/p-creampajama.jpg";
import pinkmaxi from "@/assets/p-pinkmaxi.jpg";
import beigecardi from "@/assets/p-beigecardi.jpg";
import blackslip from "@/assets/p-blackslip.jpg";
import pinkpouch from "@/assets/p-pinkpouch.jpg";

import catTops from "@/assets/cat-tops.jpg";
import catShirts from "@/assets/cat-shirts.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catSkirts from "@/assets/cat-skirts.jpg";
import catCoord from "@/assets/cat-coord.jpg";
import catLoungewear from "@/assets/cat-loungewear.jpg";
import catGifting from "@/assets/cat-gifting.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  // Tops
  {
    id: "p-001", slug: "rosa-puff-sleeve-top", name: "Rosa Puff Sleeve Top",
    price: 1890, compareAt: 2490, category: "tops", sizes: SIZES, isBestseller: true,
    colors: [{ name: "Rose", hex: "#f4b8c4" }, { name: "Cream", hex: "#f5ebd9" }],
    images: [pinkblouse, catTops],
    description: "Our signature off-shoulder blouse in soft cotton-poplin, with elasticated puff sleeves and a relaxed fit through the body.",
    details: ["100% cotton poplin", "Hand wash cold", "Model is 5'8\" wearing size S", "Made in India"],
  },
  {
    id: "p-002", slug: "ines-cropped-cardigan", name: "Ines Cropped Cardigan",
    price: 2290, category: "tops", sizes: SIZES, isNew: true,
    colors: [{ name: "Beige", hex: "#d8c5a8" }, { name: "Cream", hex: "#f5ebd9" }],
    images: [beigecardi, catTops],
    description: "A cropped ribbed cardigan in airy knit, designed to layer over slip dresses or wear buttoned with denim.",
    details: ["80% cotton, 20% acrylic", "Cropped fit", "Mother-of-pearl buttons"],
  },
  {
    id: "p-003", slug: "lila-cotton-tee", name: "Lila Sleeveless Knit Tee",
    price: 1290, category: "tops", sizes: SIZES,
    colors: [{ name: "Camel", hex: "#c9a47b" }],
    images: [whiteskirt, catTops],
    description: "Soft sleeveless knit tee with a clean crew neck — your new everyday layering essential.",
    details: ["Modal blend", "Slim fit"],
  },

  // Shirts
  {
    id: "p-101", slug: "atelier-oversized-shirt", name: "Atelier Oversized Shirt",
    price: 2690, category: "shirts", sizes: SIZES, isBestseller: true,
    colors: [{ name: "White", hex: "#ffffff" }, { name: "Sky", hex: "#cfdbe4" }],
    images: [whiteshirt, catShirts],
    description: "Our most-loved oversized shirt — boyfriend cut, dropped shoulders, in featherweight cotton-linen.",
    details: ["55% linen, 45% cotton", "Oversized fit", "Mother-of-pearl buttons"],
  },
  {
    id: "p-102", slug: "marin-poplin-shirt", name: "Marin Poplin Shirt",
    price: 2390, category: "shirts", sizes: SIZES,
    colors: [{ name: "White", hex: "#ffffff" }],
    images: [whiteshirt, catShirts],
    description: "A classic tailored poplin shirt with a softly structured collar.",
    details: ["100% cotton poplin", "Regular fit"],
  },

  // Dresses
  {
    id: "p-201", slug: "olea-satin-slip-dress", name: "Olea Satin Slip Dress",
    price: 3490, category: "dresses", sizes: SIZES, isNew: true,
    colors: [{ name: "Sage", hex: "#a7b48a" }, { name: "Black", hex: "#1a1a1a" }],
    images: [greendress, catDresses],
    description: "A bias-cut satin slip dress that catches the light beautifully — finished with delicate spaghetti straps and a side slit.",
    details: ["Satin viscose", "Bias cut", "Adjustable straps", "Dry clean only"],
  },
  {
    id: "p-202", slug: "lyra-striped-maxi-dress", name: "Lyra Striped Maxi Dress",
    price: 3290, compareAt: 3990, category: "dresses", sizes: SIZES, isBestseller: true,
    colors: [{ name: "Rose Stripe", hex: "#e88da0" }],
    images: [pinkmaxi, catDresses],
    description: "Our hero summer dress — strapless smocked bodice and a tiered cotton skirt that moves with you.",
    details: ["100% cotton", "Smocked bodice", "Tiered skirt", "Pull-on style"],
  },
  {
    id: "p-203", slug: "noor-mini-slip", name: "Noor Mini Slip Dress",
    price: 2790, category: "dresses", sizes: SIZES,
    colors: [{ name: "Black", hex: "#1a1a1a" }],
    images: [blackslip, catDresses],
    description: "A clean V-neck mini slip cut for the quietest kind of glamour.",
    details: ["Crepe satin", "Mini length", "V neckline"],
  },

  // Skirts
  {
    id: "p-301", slug: "cara-pleated-mini-skirt", name: "Cara Pleated Mini Skirt",
    price: 2190, category: "skirts", sizes: SIZES,
    colors: [{ name: "Cream", hex: "#f5ebd9" }, { name: "Black", hex: "#1a1a1a" }],
    images: [whiteskirt, catSkirts],
    description: "A clean knife-pleated mini skirt with a fitted waistband.",
    details: ["Polyester twill", "Sits at waist", "Side zip"],
  },
  {
    id: "p-302", slug: "alma-tailored-midi", name: "Alma Tailored Midi Skirt",
    price: 2490, category: "skirts", sizes: SIZES, isNew: true,
    colors: [{ name: "Camel", hex: "#c9a47b" }],
    images: [whiteskirt, catSkirts],
    description: "A pencil-cut midi skirt in soft tailoring fabric.",
    details: ["Wool blend", "Back vent"],
  },

  // Coord sets
  {
    id: "p-401", slug: "vera-teal-coord-set", name: "Vera Coord Set",
    price: 4290, category: "coord-sets", sizes: SIZES, isBestseller: true,
    colors: [{ name: "Teal", hex: "#1f5f6b" }, { name: "Black", hex: "#1a1a1a" }],
    images: [tealcoord, catCoord],
    description: "Relaxed top with wide-leg trousers in a beautiful drape — sold as a set.",
    details: ["Viscose blend", "Pull-on trousers", "Sold as set"],
  },
  {
    id: "p-402", slug: "sage-summer-coord", name: "Sage Summer Coord",
    price: 3990, category: "coord-sets", sizes: SIZES,
    colors: [{ name: "Sage", hex: "#a7b48a" }],
    images: [tealcoord, catCoord],
    description: "A light-as-air matching set in soft sage — easy holiday dressing.",
    details: ["Cotton blend", "Elastic waist"],
  },

  // Loungewear
  {
    id: "p-501", slug: "soleil-silk-pajama-set", name: "Soleil Silk Pajama Set",
    price: 4990, category: "premium-loungewear", sizes: SIZES, isNew: true,
    colors: [{ name: "Cream", hex: "#f5ebd9" }, { name: "Rose", hex: "#f4b8c4" }],
    images: [creampajama, catLoungewear],
    description: "A sumptuous notched-collar pajama set in pure silk — with piped trims and drawstring trousers.",
    details: ["100% silk", "Piped trim", "Comes in gift box"],
  },
  {
    id: "p-502", slug: "luna-modal-set", name: "Luna Modal Lounge Set",
    price: 2990, category: "premium-loungewear", sizes: SIZES,
    colors: [{ name: "Cream", hex: "#f5ebd9" }],
    images: [creampajama, catLoungewear],
    description: "Buttery-soft modal pajama set, breathable and made for slow mornings.",
    details: ["Modal jersey", "Machine wash cold"],
  },

  // Gifting
  {
    id: "p-601", slug: "monogram-pouch", name: "Monogram Travel Pouch",
    price: 1490, category: "gifting", sizes: ["One Size"], isBestseller: true,
    colors: [{ name: "Pink", hex: "#f4b8c4" }],
    images: [pinkpouch, catGifting],
    description: "Our signature monogrammed canvas pouch with leather trim — the perfect carry-along.",
    details: ["Cotton canvas", "Leather handles", "Zip closure"],
  },
  {
    id: "p-602", slug: "monogram-tote", name: "Monogram Mini Tote",
    price: 1990, category: "gifting", sizes: ["One Size"],
    colors: [{ name: "Pink", hex: "#f4b8c4" }],
    images: [pinkpouch, catGifting],
    description: "A pretty mini tote in our monogram canvas — gift-boxed and ready to give.",
    details: ["Cotton canvas", "Leather handles"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getBestsellers = () => products.filter((p) => p.isBestseller);
