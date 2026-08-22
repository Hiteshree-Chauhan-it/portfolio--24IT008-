import "./Spinner.css";

// A simple loading spinner shown while we wait for the API response.
// This is a "dumb" component - it has no logic, just visuals.
function Spinner({ message = "Loading repositories..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Spinner;