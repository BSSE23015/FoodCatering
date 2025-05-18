import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
