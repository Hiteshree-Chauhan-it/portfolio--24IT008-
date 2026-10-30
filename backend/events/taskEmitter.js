import { EventEmitter } from "events";

// Create an instance of EventEmitter
const taskEmitter = new EventEmitter();

// Helper to format clean timestamps: HH:MM:SS.mmm
const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
};

// Listen for the "task-created" event asynchronously
taskEmitter.on("task-created", (task) => {
  console.log(`[${getTimestamp()}] [Event] 'task-created' received for Task ID: ${task._id} ("${task.title}")`);
  console.log(`[${getTimestamp()}] [Notification Service] Starting background notification (2s delay)...`);

  // Simulate a 2-second asynchronous operation (e.g., sending an email or push notification)
  setTimeout(() => {
    console.log(`[${getTimestamp()}] [Notification Service] Notification sent successfully for: "${task.title}"`);
  }, 2000);
});

export default taskEmitter;
