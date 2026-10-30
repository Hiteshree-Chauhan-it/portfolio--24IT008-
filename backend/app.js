import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Backend API is healthy" });
});

app.use(errorHandler);

export default app;
