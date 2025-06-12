// app/page.tsx
import OverviewCards from "../components/OverviewCards";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsTable from "../components/TopProductsTable";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <h1 className="text-3xl font-bold mb-4">📊 TrendMart Analytics</h1>
      <OverviewCards />
      <SalesTrendChart />
      <TopProductsTable />
    </>
  );
}
