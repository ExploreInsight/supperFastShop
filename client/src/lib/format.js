export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);

export const titleCase = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

export const dateShort = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const SIZES = ["XS", "S", "M", "L", "XL"];

export const CATEGORIES = [
  { slug: "jeans", name: "Jeans" },
  { slug: "t-shirts", name: "T-shirts" },
  { slug: "shoes", name: "Shoes" },
  { slug: "glasses", name: "Glasses" },
  { slug: "jackets", name: "Jackets" },
  { slug: "suits", name: "Suits" },
  { slug: "bags", name: "Bags" },
];
