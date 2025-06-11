import dotenv from "dotenv";
import path from "path";

// Force-load .env from root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import connectDB from "./config/db";

import analyticsRoutes from "./routes/analytics";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
  res.send("✅ Backend is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

app.use("/api/analytics", analyticsRoutes);
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
