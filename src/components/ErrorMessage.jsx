import "./ErrorMessage.css";

// Displays an error message when the API call fails.
// It also receives an "onRetry" function as a prop, so the parent
// component (Projects.jsx) decides what happens when Retry is clicked.
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>⚠ Something went wrong: {message}</p>
      <button className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;