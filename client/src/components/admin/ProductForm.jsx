import { useState } from "react";
import { useProductStore } from "../../stores/useProductStore";
import { CATEGORIES, SIZES } from "../../lib/format";
import Tag from "../ui/Tag";
import TextField from "../ui/TextField";
import SizeRun from "../ui/SizeRun";
import Btn from "../ui/Btn";

const EMPTY = { name: "", description: "", price: "", category: "", image: null, sizes: SIZES, soldOut: [] };

const ProductForm = () => {
  const [p, setP] = useState(EMPTY);
  const { createProduct, loading } = useProductStore();
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const toggle = (key, s) => setP({ ...p, [key]: p[key].includes(s) ? p[key].filter((x) => x !== s) : [...p[key], s] });

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", p.name);
    fd.append("description", p.description);
    fd.append("price", p.price);
    fd.append("category", p.category);
    fd.append("sizes", p.sizes.join(","));
    fd.append("soldOutSizes", p.soldOut.filter((s) => p.sizes.includes(s)).join(","));
    if (p.image) fd.append("image", p.image);
    await createProduct(fd);
    setP(EMPTY);
    e.target.reset();
  };

  const field = "w-full bg-white/60 text-ink border-2 border-ink rounded-md px-3.5 py-3";

  return (
    <Tag className="p-6 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-4xl">New product</h2>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <TextField label="Name" required value={p.name} onChange={set("name")} />
        <div>
          <label htmlFor="desc" className="block font-label text-xs font-semibold uppercase tracking-wider mb-1.5">Description</label>
          <textarea id="desc" rows={3} required value={p.description} onChange={set("description")} className={field} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField label="Price (USD)" type="number" step="0.01" min="0" required value={p.price} onChange={set("price")} />
          <div>
            <label htmlFor="cat" className="block font-label text-xs font-semibold uppercase tracking-wider mb-1.5">Category</label>
            <select id="cat" required value={p.category} onChange={set("category")} className={field}>
              <option value="">Select</option>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-wider mb-1.5">Sizes offered</p>
          <SizeRun value={null} sizes={SIZES} soldOut={SIZES.filter((s) => !p.sizes.includes(s))} onChange={(s) => toggle("sizes", s)} size="sm" />
          <p className="font-label text-xs font-semibold uppercase tracking-wider mt-4 mb-1.5">Sold out</p>
          <SizeRun value={null} sizes={p.sizes} soldOut={p.soldOut} onChange={(s) => toggle("soldOut", s)} size="sm" />
          <p className="text-sm text-muted mt-2">Tap to toggle. Ghost cells are off or sold out.</p>
        </div>
        <div>
          <label htmlFor="img" className="block font-label text-xs font-semibold uppercase tracking-wider mb-1.5">Photo</label>
          <input id="img" type="file" accept="image/*" required onChange={(e) => setP({ ...p, image: e.target.files[0] })} className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-ink file:text-paper file:px-4 file:py-2.5 file:font-bold" />
        </div>
        <Btn type="submit" variant="sticker" busy={loading} className="w-full text-3xl py-3.5">Create product</Btn>
      </form>
    </Tag>
  );
};

export default ProductForm;
