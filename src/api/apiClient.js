const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Helper to build request options with JSON headers and Authorization header if token exists.
 */
const getHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Centralized fetch handler that parses JSON response and handles HTTP errors.
 */
const request = async (endpoint, options = {}, onUnauthorized) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 && typeof onUnauthorized === "function") {
        onUnauthorized();
      }
      const errorMessage = data.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Please ensure the backend server is running on http://localhost:5000");
    }
    throw err;
  }
};

// Authentication Endpoints
export const registerUser = async (email, password) => {
  return request("/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
};

export const loginUser = async (email, password) => {
  return request("/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
};

export const fetchMe = async (token, onUnauthorized) => {
  return request("/me", {
    method: "GET",
    headers: getHeaders(token),
  }, onUnauthorized);
};

// Tasks Endpoints
export const fetchTasks = async (token, onUnauthorized) => {
  return request("/tasks", {
    method: "GET",
    headers: getHeaders(token),
  }, onUnauthorized);
};

export const createTask = async (taskData, token, onUnauthorized) => {
  return request("/tasks", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(taskData),
  }, onUnauthorized);
};

export const updateTask = async (id, taskData, token, onUnauthorized) => {
  return request(`/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(taskData),
  }, onUnauthorized);
};

export const deleteTask = async (id, token, onUnauthorized) => {
  return request(`/tasks/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  }, onUnauthorized);
};

// AI Endpoint
export const generateTaskDescription = async (title, token) => {
  return request("/api/ai/generate-description", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ title }),
  });
};

