import Head from "next/head";
import OverviewCards from "../components/OverviewCards";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsTable from "../components/TopProductsTable";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <Head>
        <title>TrendMart Dashboard</title>
      </Head>
      <main className="p-6 space-y-6 ml-3 ">
        {/* <main className="p-6 space-y-6 ml-2 bg-red-100 dark:bg-gray-900 min-h-screen transition-colors"> */}
        <h1 className="text-2xl font-bold">📊 TrendMart Analytics</h1>
        <OverviewCards />
        <SalesTrendChart />
        <TopProductsTable />
      </main>
    </>
  );
}
