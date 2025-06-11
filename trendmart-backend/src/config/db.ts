import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  console.log("🔍 MONGODB_URI =", uri); // ADD THIS LINE

  try {
    await mongoose.connect(uri || "");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
