"use client";
import { default as useSWR } from "swr";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewCards() {
  const { data, error } = useSWR(`${API_BASE}/api/analytics/overview`, fetcher);
  if (error) return <div>Failed to load metrics.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
      <Card title="Total Revenue" value={`$${data.totalRevenue.toFixed(2)}`} />
      <Card title="Total Orders" value={data.totalOrders} />
      <Card
        title="Avg. Order Value"
        value={`$${data.averageOrderValue.toFixed(2)}`}
      />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl shadow p-4 bg-white">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
