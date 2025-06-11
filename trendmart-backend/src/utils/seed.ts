import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Product from "../models/Product";
import Order from "../models/Order";
import { faker } from "@faker-js/faker";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const NUM_PRODUCTS = 50;
const NUM_ORDERS = 200;

const statuses = ["completed", "pending", "cancelled"];

function getWeightedStatus(): "completed" | "pending" | "cancelled" {
  const r = Math.random();
  if (r < 0.8) return "completed";
  if (r < 0.95) return "pending";
  return "cancelled";
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Step 1: Create products
    const products = [];
    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
        stock: faker.number.int({ min: 10, max: 100 }),
      });
      products.push(product);
    }
    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    // Step 2: Create orders
    const orders = [];
    for (let i = 0; i < NUM_ORDERS; i++) {
      const product = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min: 1, max: 5 });
      const status = getWeightedStatus();

      const order = new Order({
        productId: product._id,
        quantity,
        totalAmount: product.price * quantity,
        status,
        orderDate: faker.date.recent({ days: 30 }),
      });

      orders.push(order);
    }

    await Order.insertMany(orders);
    console.log(`✅ Inserted ${orders.length} orders`);

    mongoose.disconnect();
    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
