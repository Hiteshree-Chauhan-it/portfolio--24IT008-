import "./Spinner.css";

// A simple loading spinner shown while we wait for the API response.
// This is a "dumb" component - it has no logic, just visuals.
function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading repositories...</p>
    </div>
  );
}

export default Spinner;