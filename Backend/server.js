// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import photoRouter from "./routes/photoRoute.js";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure 'uploads' folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static images
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/users", userRouter);
app.use("/api/photos", photoRouter);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:${PORT}`);
});
