import Head from "next/head";
import OverviewCards from "../components/OverviewCards";
import SalesTrendChart from "../components/SalesTrendChart";
import TopProductsTable from "../components/TopProductsTable";

export default function Home() {
  return (
    <>
      <Head>
        <title>TrendMart Dashboard</title>
      </Head>
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">📊 TrendMart Analytics</h1>
        <OverviewCards />
        <SalesTrendChart />
        <TopProductsTable />
      </main>
    </>
  );
}
