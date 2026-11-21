import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axios from "../../lib/axios";
import { money } from "../../lib/format";
import Tag from "../ui/Tag";
import Sticker from "../ui/Sticker";
import Spinner from "../ui/Spinner";

const Stat = ({ label, value }) => (
  <Tag className="p-5">
    <p className="font-label text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
    <p className="mt-1 font-display font-black text-6xl num leading-none">{value}</p>
  </Tag>
);

const AnalyticsTab = () => {
  const [data, setData] = useState(null);
  const [daily, setDaily] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/analytics")
      .then((r) => {
        setData(r.data.analyticsData);
        setDaily(
          [...r.data.dailySalesData]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(-7)
            .map((d) => ({ ...d, name: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }) }))
        );
      })
      .catch((e) => setError(e.response?.data?.message || "Could not load analytics"));
  }, []);

  if (error) return <p className="text-center font-bold">{error}</p>;
  if (!data) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Users" value={data.users.toLocaleString()} />
        <Stat label="Products" value={data.products.toLocaleString()} />
        <Stat label="Sales" value={data.totalSales.toLocaleString()} />
        <Stat label="Revenue" value={money(data.totalRevenue)} />
      </div>
      <Tag className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl">Last 7 days</h2>
          <Sticker className="text-lg" tilt={-2}>Sales + revenue</Sticker>
        </div>
        <div className="h-80" role="img" aria-label="Line chart of daily sales and revenue for the last seven days">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={daily}>
              <CartesianGrid stroke="rgba(11,11,11,0.15)" strokeDasharray="4 4" />
              <XAxis dataKey="name" stroke="#0b0b0b" tick={{ fontFamily: "Azeret Mono", fontSize: 12 }} />
              <YAxis yAxisId="left" stroke="#0b0b0b" tick={{ fontFamily: "Azeret Mono", fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#0b0b0b" tick={{ fontFamily: "Azeret Mono", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#0b0b0b", color: "#f7f4ec", border: 0, borderRadius: 6 }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#0b0b0b" strokeWidth={3} name="Sales" dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#0b0b0b" strokeDasharray="6 5" strokeWidth={3} name="Revenue" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Tag>
    </div>
  );
};

export default AnalyticsTab;
