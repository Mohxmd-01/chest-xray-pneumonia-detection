import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes); // 🔥 THIS LINE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("🔥 Connected database:", mongoose.connection.name);
  })
  .catch((err) => console.error("❌ Mongo error", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Node backend running on port ${process.env.PORT || 5000}`);
});
