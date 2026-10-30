import NodeCache from "node-cache";
import Task from "../models/Task.js";

// Initialize in-memory cache with default TTL of 60 seconds
const taskCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// GET /tasks (Cached with 60s TTL)
export const getTasks = async (req, res, next) => {
  try {
    const cacheKey = `tasks_${req.user.id}`;

    // 1. Check if tasks are in cache
    const cachedTasks = taskCache.get(cacheKey);

    if (cachedTasks) {
      console.log(`[Cache] HIT: Returning tasks for user ${req.user.id} from in-memory cache`);
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json({
        success: true,
        source: "cache",
        count: cachedTasks.length,
        data: cachedTasks,
      });
    }

    // 2. Cache MISS: Fetch from MongoDB
    console.log(`[Cache] MISS: Fetching tasks for user ${req.user.id} from MongoDB`);
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    // 3. Save into cache with 60-second TTL
    taskCache.set(cacheKey, tasks, 60);

    res.setHeader("X-Cache", "MISS");
    res.status(200).json({
      success: true,
      source: "database",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// POST /tasks (Invalidates Cache)
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description: description || "",
      completed: false,
      user: req.user.id,
    });

    // Invalidate cache for this user so stale data is never returned
    taskCache.del(`tasks_${req.user.id}`);
    console.log(`[Cache] INVALIDATED: Cache cleared for user ${req.user.id} (Task Created)`);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id (Invalidates Cache)
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    let task = await Task.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with ID: ${id}`,
      });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();

    // Invalidate cache for this user
    taskCache.del(`tasks_${req.user.id}`);
    console.log(`[Cache] INVALIDATED: Cache cleared for user ${req.user.id} (Task Updated)`);

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id (Invalidates Cache)
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with ID: ${id}`,
      });
    }

    // Invalidate cache for this user
    taskCache.del(`tasks_${req.user.id}`);
    console.log(`[Cache] INVALIDATED: Cache cleared for user ${req.user.id} (Task Deleted)`);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
