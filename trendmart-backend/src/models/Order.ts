import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  totalAmount: number;
  status: "completed" | "pending" | "cancelled";
  orderDate: Date;
}

const OrderSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["completed", "pending", "cancelled"],
    required: true,
  },
  orderDate: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
