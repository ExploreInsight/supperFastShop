import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import AnalyticsTab from "../components/admin/AnalyticsTab";

const TABS = [
  { id: "create", label: "Create" },
  { id: "products", label: "Products" },
  { id: "analytics", label: "Analytics" },
];

const AdminPage = () => {
  const [tab, setTab] = useState("create");
  const fetchAllProducts = useProductStore((s) => s.fetchAllProducts);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-8">
      <h1 className="text-6xl sm:text-8xl">Dashboard</h1>
      <div role="tablist" aria-label="Dashboard sections" className="mt-6 flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 rounded-md border-2 border-on-field font-bold ${tab === t.id ? "bg-on-field text-field" : "hover:bg-on-field/10"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-8">
        {tab === "create" && <ProductForm />}
        {tab === "products" && <ProductTable />}
        {tab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
