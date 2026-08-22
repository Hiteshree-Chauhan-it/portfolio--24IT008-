import Task from "../models/Task.js";

// GET /tasks
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// POST /tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description: description || "",
      completed: false,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
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

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
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

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
