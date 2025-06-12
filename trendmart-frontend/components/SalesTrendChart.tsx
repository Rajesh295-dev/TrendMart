"use client";
import { default as useSWR } from "swr";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesTrendChart() {
  const { data, error } = useSWR(
    `${API_BASE}/api/analytics/sales-trends?period=30d`,
    fetcher
  );

  if (error) return <div>Failed to load chart.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Sales Trends (Last 30 Days)
      </h2>
      {/* <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#10b981"
            name="Orders"
          />
        </LineChart>
      </ResponsiveContainer> */}

      {/* <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* <div className="scrollbar-visible w-full sm:overflow-visible overflow-x-scroll">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
              <Line type="monotone" dataKey="orders" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      <div className="overflow-x-auto w-full sm:overflow-visible">
        <div className="min-w-[600px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
              <Line type="monotone" dataKey="orders" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
