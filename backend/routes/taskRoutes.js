import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateTask } from "../middleware/validateMiddleware.js";

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

router.route("/")
  .get(getTasks)
  .post(validateTask, createTask);

router.route("/:id")
  .put(updateTask)
  .delete(deleteTask);

export default router;
