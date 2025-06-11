from pathlib import Path

readme_content = # 🛒 TrendMart – E-Commerce Analytics Dashboard

**TrendMart** is a full-stack analytics dashboard built for e-commerce merchants to gain actionable insights into their store’s performance. Designed as a rapid MVP in under 2 hours, the application demonstrates real-time revenue trends, product performance, and order metrics—all optimized for mobile and desktop viewing.

## 💡 Problem It Solves

In fast-paced online marketplaces, merchants often struggle with scattered metrics and delayed insights. TrendMart centralizes key analytics—total revenue, daily sales trends, and top-performing products—into a clean, responsive dashboard. This empowers sellers to monitor what’s selling, how revenue is trending, and make fast, data-driven decisions.

## 🧱 Tech Stack

- **Frontend**: Next.js (React + TypeScript), Tailwind CSS, Recharts, SWR for data fetching
- **Backend**: Node.js + Express with TypeScript
- **Database**: MongoDB + Mongoose
- **Charts**: Recharts for interactive line and bar visualizations
- **Performance**: Indexed DB queries, SWR caching, and API pagination

## 📊 Features

- **Overview Metrics**: Total revenue, order count, and average order value (last 30 days)
- **Sales Trend Chart**: Line chart visualizing daily revenue and order counts (7/30/90 day options)
- **Top Products Table**: Best-selling products sorted by revenue, with pagination and growth rate comparison (last 30 vs previous 30 days)
- **Real-time Simulation**: Auto-refresh support (planned with WebSocket/SSE)
- **Mobile-First UI**: Fully responsive with touch-friendly interactions

## 🛠️ Engineering Highlights

- Optimized MongoDB aggregation queries with `$group` and `$match` for sales analytics
- Growth rate computed by comparing current vs previous periods
- Pagination implemented using `.skip()` and `.limit()` in aggregation
- Frontend uses environment variables and SWR for clean API communication
- Clean folder structure and modular component design with `pages/` and `components/` separation

## 🚀 Getting Started

### Backend:

```bash
cd trendmart-backend
yarn install
yarn dev
```
