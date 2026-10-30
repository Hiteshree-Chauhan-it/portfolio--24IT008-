import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  generateTaskDescription,
} from "../api/apiClient";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "./Tasks.css";

function Tasks() {
  const { token, handleUnauthorized } = useAuth();

  // Task list and main GET state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form input state for creating a task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // AI Generation State (Practical 13)
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNotice, setAiNotice] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Operation specific loading / error state for write operations (POST, PUT, DELETE)
  const [opLoading, setOpLoading] = useState(false);
  const [opError, setOpError] = useState(null);

  // Function to load all tasks from GET /tasks
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTasks(token, handleUnauthorized);
      setTasks(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [token, handleUnauthorized]);

  // Initial GET on mount
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create Task (POST /tasks)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setOpLoading(true);
    setOpError(null);

    try {
      // Send POST request to backend
      const response = await apiCreateTask(
        { title: title.trim(), description: description.trim() },
        token,
        handleUnauthorized
      );

      // Update local React state using ACTUAL response received from backend (No blind optimistic updates)
      setTasks((prevTasks) => [response.data, ...prevTasks]);

      // Reset form
      setTitle("");
      setDescription("");
      setAiNotice(null);
      setAiError(null);
    } catch (err) {
      setOpError(`Failed to create task: ${err.message}`);
    } finally {
      setOpLoading(false);
    }
  };

  // Generate AI Description (Practical 13)
  const handleGenerateAIDescription = async () => {
    if (!title.trim()) {
      setAiError("Please enter a task title first to generate a description.");
      return;
    }

    setAiLoading(true);
    setAiError(null);
    setAiNotice(null);

    try {
      const response = await generateTaskDescription(title.trim(), token);

      if (response && response.description) {
        setDescription(response.description);
        setAiNotice(response.disclaimer || "AI-generated suggestion. Please review before using.");
      }
    } catch (err) {
      console.warn("AI generation error:", err);
      // Fallback message to ensure application continues working smoothly
      const fallbackText = `Plan and complete the task: "${title.trim()}". Review details and verify deliverables.`;
      setDescription(fallbackText);
      setAiNotice("Notice: AI service unavailable. A standard template was provided instead. Please review.");
    } finally {
      setAiLoading(false);
    }
  };

  // Toggle Task Completion (PUT /tasks/:id)
  const handleToggleTask = async (task) => {
    setOpLoading(true);
    setOpError(null);

    try {
      // Send PUT request to backend
      const response = await apiUpdateTask(
        task._id,
        { completed: !task.completed },
        token,
        handleUnauthorized
      );

      // Update local React state with actual returned object from backend
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );
    } catch (err) {
      setOpError(`Failed to update task: ${err.message}`);
    } finally {
      setOpLoading(false);
    }
  };

  // Delete Task with confirmation (DELETE /tasks/:id)
  const handleDeleteTask = async (id, taskTitle) => {
    // Confirmation before deletion requirement
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the task: "${taskTitle}"?`
    );
    if (!confirmDelete) return;

    setOpLoading(true);
    setOpError(null);

    try {
      // Send DELETE request to backend
      const response = await apiDeleteTask(id, token, handleUnauthorized);

      // Update local React state using backend response
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== response.data._id));
    } catch (err) {
      setOpError(`Failed to delete task: ${err.message}`);
    } finally {
      setOpLoading(false);
    }
  };

  return (
    <section className="tasks-container">
      <div className="tasks-header">
        <h2>Tasks Manager</h2>
        <p className="tasks-subtitle">
          Full-stack integration for Practical 6 & 7 (Node/Express/MongoDB REST API)
        </p>
      </div>

      {/* --- Form to Create a Task --- */}
      <div className="task-card task-form-card">
        <h3>Create New Task</h3>
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="task-form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Complete Practical 6 submission"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={opLoading}
            />
          </div>

          <div className="task-form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label htmlFor="task-description" style={{ margin: 0 }}>Description (optional)</label>
              <button
                type="button"
                onClick={handleGenerateAIDescription}
                disabled={aiLoading || opLoading || !title.trim()}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.82rem",
                  cursor: title.trim() ? "pointer" : "not-allowed",
                  opacity: title.trim() ? 1 : 0.6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: "500",
                }}
              >
                {aiLoading ? "✨ Generating..." : "✨ Generate with AI"}
              </button>
            </div>
            <textarea
              id="task-description"
              placeholder="Add details or notes about this task (or click 'Generate with AI')..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              disabled={opLoading || aiLoading}
            />
            {aiNotice && (
              <small style={{ color: "#10b981", display: "block", marginTop: "4px", fontSize: "0.8rem" }}>
                ℹ️ {aiNotice}
              </small>
            )}
            {aiError && (
              <small style={{ color: "#ef4444", display: "block", marginTop: "4px", fontSize: "0.8rem" }}>
                ⚠️ {aiError}
              </small>
            )}
          </div>

          <button
            type="submit"
            className="create-task-btn"
            disabled={opLoading || aiLoading || !title.trim()}
          >
            {opLoading ? "Processing..." : "Add Task"}
          </button>
        </form>
      </div>

      {/* Operation Feedback (Loading / Error for POST, PUT, DELETE) */}
      {opLoading && <Spinner message="Updating tasks server..." />}
      {opError && (
        <ErrorMessage
          message={opError}
          onRetry={() => setOpError(null)}
        />
      )}

      {/* --- Tasks List (Initial GET state) --- */}
      <div className="task-list-section">
        <h3>Your Tasks</h3>

        {loading && <Spinner message="Fetching your tasks..." />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={loadTasks} />
        )}

        {!loading && !error && tasks.length === 0 && (
          <div className="no-tasks-box">
            <p>No tasks found. Create your first task above!</p>
          </div>
        )}

        {!loading && !error && tasks.length > 0 && (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <div className="task-content">
                  <div className="task-title-row">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task)}
                      disabled={opLoading}
                      title="Toggle completed status"
                    />
                    <h4 className={task.completed ? "line-through" : ""}>
                      {task.title}
                    </h4>
                  </div>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  <span className="task-date">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="delete-task-btn"
                    onClick={() => handleDeleteTask(task._id, task.title)}
                    disabled={opLoading}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Tasks;
