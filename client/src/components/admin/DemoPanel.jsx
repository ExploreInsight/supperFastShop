import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../lib/axios";
import { useProductStore } from "../../stores/useProductStore";
import Tag from "../ui/Tag";
import Btn from "../ui/Btn";

// Fills an empty shop with 21 demo products (3 per category) and removes them again.
// Removing only touches products flagged as demo; your own products are never deleted.
const DemoPanel = () => {
  const fetchAllProducts = useProductStore((s) => s.fetchAllProducts);
  const [busy, setBusy] = useState("");

  const run = async (kind) => {
    if (kind === "remove" && !window.confirm("Remove all demo products? Your own products stay.")) return;
    setBusy(kind);
    try {
      if (kind === "load") {
        const { data } = await axios.post("/product/demo");
        toast.success(data.added ? `Added ${data.added} demo products` : "Demo products are already loaded");
      } else {
        const { data } = await axios.delete("/product/demo");
        toast.success(`Removed ${data.removed} demo products`);
      }
      await fetchAllProducts();
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      setBusy("");
    }
  };

  return (
    <Tag className="p-5 sm:p-6 max-w-2xl mx-auto mb-6">
      <h2 className="text-3xl">Demo products</h2>
      <p className="mt-2 text-muted">Adds 21 sample products, 3 for every category, so the shop is not empty. Delete them whenever you have your own.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Btn variant="sticker" className="text-2xl" busy={busy === "load"} onClick={() => run("load")}>Load demo products</Btn>
        <Btn variant="line" busy={busy === "remove"} onClick={() => run("remove")}>Remove demo products</Btn>
      </div>
    </Tag>
  );
};

export default DemoPanel;
