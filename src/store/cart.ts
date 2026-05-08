import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (productId: string, size: string, color: string) => void;
  setQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const keyMatches = (i: CartItem, productId: string, size: string, color: string) =>
  i.productId === productId && i.size === size && i.color === color;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item, qty = 1) =>
        set((s) => {
          const idx = s.items.findIndex((i) => keyMatches(i, item.productId, item.size, item.color));
          if (idx >= 0) {
            const next = [...s.items];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return { items: next, isOpen: true };
          }
          return { items: [...s.items, { ...item, qty }], isOpen: true };
        }),
      remove: (productId, size, color) =>
        set((s) => ({ items: s.items.filter((i) => !keyMatches(i, productId, size, color)) })),
      setQty: (productId, size, color, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (keyMatches(i, productId, size, color) ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "lilac-cart" }
  )
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((s, i) => s + i.price * i.qty, 0);

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
