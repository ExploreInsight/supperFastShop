// Demo catalogue: 3 products per category. Images live in client/public/seed.
const ONE = ["OS"];
const APPAREL = ["XS", "S", "M", "L", "XL"];

const d = (name, category, price, description, extra = {}) => ({
  name, category, price, description, sizes: APPAREL, soldOutSizes: [], image: `/seed/${name.toLowerCase().replace(/\s+/g, "-")}.png`, ...extra,
});

export const DEMO_PRODUCTS = [
  d("Cargo Denim", "jeans", 68, "Loose-fit cargo jeans with big side pockets.", { isFeatured: true, soldOutSizes: ["XL"] }),
  d("Washed Baggy Jean", "jeans", 64, "Light wash, baggy through the leg, full length."),
  d("Black Carpenter Jean", "jeans", 72, "Black carpenter fit with a hammer loop and utility pockets."),
  d("Box Tee", "t-shirts", 32, "Boxy heavyweight cotton tee in bone.", { isFeatured: true }),
  d("Graphic Heavy Tee", "t-shirts", 38, "Black heavyweight tee with a front graphic.", { soldOutSizes: ["XS"] }),
  d("Acid Pocket Tee", "t-shirts", 34, "Acid lime tee with a chest pocket."),
  d("Chunky Runner", "shoes", 120, "Chunky-sole runner in signal orange.", { isFeatured: true, soldOutSizes: ["XS", "S"] }),
  d("Court Low", "shoes", 95, "Clean low-top court shoe in off-white."),
  d("Platform Hi", "shoes", 130, "Black high-top on a thick platform sole."),
  d("Wrap Shades", "glasses", 45, "Flat-front wrap sunglasses.", { isFeatured: true, sizes: ONE }),
  d("Round Frames", "glasses", 52, "Round amber-tint frames.", { sizes: ONE }),
  d("Flat Top Shades", "glasses", 48, "Flat-top cobalt shades.", { sizes: ONE }),
  d("Puffer Jacket", "jackets", 150, "Quilted puffer jacket in signal orange.", { isFeatured: true, soldOutSizes: ["XS", "XL"] }),
  d("Coach Jacket", "jackets", 110, "Lightweight black coach jacket with a snap front."),
  d("Varsity Bomber", "jackets", 140, "Cobalt bomber with contrast cuffs."),
  d("Oversized Suit", "suits", 220, "Oversized charcoal suit, relaxed trouser.", { isFeatured: true }),
  d("Pinstripe Suit", "suits", 240, "Navy pinstripe suit with a boxy cut."),
  d("Tonal Suit", "suits", 210, "Tonal sand suit, one colour head to toe."),
  d("Utility Sling", "bags", 55, "Compact black sling bag with a flap pocket.", { isFeatured: true, sizes: ONE }),
  d("Mini Messenger", "bags", 60, "Mini orange messenger bag.", { sizes: ONE }),
  d("Weekend Duffle", "bags", 85, "Cobalt duffle with a top handle.", { sizes: ONE }),
];
