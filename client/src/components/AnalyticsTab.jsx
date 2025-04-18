import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "./LoadingSpinner";

//Get current week (Mon–Sun)
const getCurrentWeekRange = () => {
  const now = new Date();
  const day = now.getDay();

  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7)); // Go to Monday

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return `${format(monday)} - ${format(sunday)}`;
};

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [weekRange, setWeekRange] = useState("");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);

        // Assume response includes array of last 7 days
        const fullData = response.data.dailySalesData;

        // Sort by date and get last 7 items (Mon to Sun)
        const sortedWeek = [...fullData]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(-7)
          .map((item) => ({
            ...item,
            name: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
            }), // Mon, Tue, etc.
          }));

        setDailySalesData(sortedWeek);
        setWeekRange(getCurrentWeekRange());
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-blue-600 to-blue-800"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-blue-600 to-blue-800"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-blue-600 to-blue-800"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-blue-600 to-blue-800"
        />
      </div>

      {/* Show dynamic week range */}
      <p className="text-sm text-gray-300 mb-2">
        Showing data for:{" "}
        <span className="text-white font-semibold">{weekRange}</span>
      </p>

      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className="text-white text-sm mb-2">
          <p>Sales & Revenue (Mon–Sun)</p>
          <p className="text-gray-400 text-xs">
            Week of{" "}
            {new Date().toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <ResponsiveContainer
          width="100%"
          height={window.innerWidth < 640 ? 300 : 400}
        >
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#374151",
                color: "#E5E7EB",
              }}
              labelStyle={{ fontSize: 12 }}
              itemStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out group`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center z-10 relative">
      <div>
        <p className="text-blue-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
    />
    <div className="absolute -bottom-4 -right-4 text-blue-800 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
