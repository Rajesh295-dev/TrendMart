import express from "express";
import Order from "../models/Order";
import Product from "../models/Product";

const router = express.Router();

interface ProductRevenue {
  _id: string;
  totalRevenue: number;
  unitsSold: number;
  growthRate?: number | null;
}

interface CurrentAggRaw {
  _id: unknown;
  totalRevenue: number;
  unitsSold: number;
}

interface PreviousAggRaw {
  _id: unknown;
  totalRevenue: number;
}

// 🔹 Overview route
router.get("/overview", async (_req, res) => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const orders = await Order.find({
      status: "completed",
      orderDate: { $gte: fromDate },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    res.json({ totalRevenue, totalOrders, averageOrderValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🔹 Sales trends route
router.get("/sales-trends", async (req, res) => {
  try {
    const { period = "30d" } = req.query;
    const days = parseInt(period.toString().replace("d", "")) || 30;

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const orders = await Order.find({
      status: "completed",
      orderDate: { $gte: fromDate },
    });

    const trendsMap: Record<string, { revenue: number; orders: number }> = {};

    for (const order of orders) {
      const dateKey = order.orderDate.toISOString().split("T")[0];
      if (!trendsMap[dateKey]) trendsMap[dateKey] = { revenue: 0, orders: 0 };
      trendsMap[dateKey].revenue += order.totalAmount;
      trendsMap[dateKey].orders += 1;
    }

    const result = Object.entries(trendsMap)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Top products with growth rate & pagination
router.get("/top-products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;

    const now = new Date();
    const currentPeriodStart = new Date();
    const previousPeriodStart = new Date();
    currentPeriodStart.setDate(now.getDate() - 30);
    previousPeriodStart.setDate(now.getDate() - 60);

    const currentRaw = await Order.aggregate([
      {
        $match: {
          status: "completed",
          orderDate: { $gte: currentPeriodStart },
        },
      },
      {
        $group: {
          _id: "$productId",
          totalRevenue: { $sum: "$totalAmount" },
          unitsSold: { $sum: "$quantity" },
        },
      },
    ]);

    const currentPeriod: ProductRevenue[] = (currentRaw as CurrentAggRaw[]).map(
      (p) => ({
        _id: String(p._id),
        totalRevenue: p.totalRevenue,
        unitsSold: p.unitsSold,
      })
    );

    const previousRaw = await Order.aggregate([
      {
        $match: {
          status: "completed",
          orderDate: { $gte: previousPeriodStart, $lt: currentPeriodStart },
        },
      },
      {
        $group: {
          _id: "$productId",
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const previousPeriod: { _id: string; totalRevenue: number }[] = (
      previousRaw as PreviousAggRaw[]
    ).map((p) => ({
      _id: String(p._id),
      totalRevenue: p.totalRevenue,
    }));

    const prevMap = new Map<string, number>();
    previousPeriod.forEach((p) => {
      prevMap.set(p._id, p.totalRevenue);
    });

    const enriched = currentPeriod.map((p) => {
      const prevRevenue = prevMap.get(p._id) || 0;
      const growthRate =
        prevRevenue === 0 ? null : (p.totalRevenue - prevRevenue) / prevRevenue;
      return { ...p, growthRate };
    });

    const sorted = enriched
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(skip, skip + limit);

    const productIds = sorted.map((p) => p._id);
    const products = await Product.find({ _id: { $in: productIds } });
    const nameMap = new Map(products.map((p) => [String(p._id), p.name]));

    const result = sorted.map((p) => ({
      name: nameMap.get(p._id) || "Unknown Product",
      totalRevenue: p.totalRevenue,
      unitsSold: p.unitsSold,
      growthRate: p.growthRate,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
