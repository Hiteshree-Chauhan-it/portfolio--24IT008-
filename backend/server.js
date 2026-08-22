import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import loggerMiddleware from "./middleware/loggerMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Request logging middleware
app.use(loggerMiddleware);

// API Routes
// Auth endpoints: POST /register, POST /login, GET /me
app.use("/", authRoutes);

// Tasks endpoints: GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Backend API is healthy" });
});

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
});
