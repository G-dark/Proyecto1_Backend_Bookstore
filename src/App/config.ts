import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET;
export const SALT_OR_ROUNDS = Number(process.env.SALT_OR_ROUNDS) || 10;
export const PEPPER = process.env.PEPPER;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
