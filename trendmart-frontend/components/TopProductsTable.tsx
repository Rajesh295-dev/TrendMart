"use client";
import { default as useSWR } from "swr";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TopProductsTable() {
  const { data, error } = useSWR(
    `${API_BASE}/api/analytics/top-products?limit=10`,
    fetcher
  );
  if (error) return <div>Failed to load products.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm ">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Revenue</th>
              <th className="py-2">Units Sold</th>
              <th className="py-2">Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: any, idx: number) => (
              <tr key={idx} className="border-b">
                <td className="py-2 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="py-2">${product.totalRevenue.toFixed(2)}</td>
                <td className="py-2">{product.unitsSold}</td>
                <td className="py-2">
                  {product.growthRate === null
                    ? "–"
                    : `${(product.growthRate * 100).toFixed(1)}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
