import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const { register, loading, authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError("Email and password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (password.length < 4) {
      setLocalError("Password must be at least 4 characters long.");
      return;
    }

    const result = await register(email, password);
    if (result.success) {
      navigate("/tasks", { replace: true });
    }
  };

  const currentError = localError || authError;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <p className="auth-subtitle">Create a new account to manage your tasks.</p>

        {loading && <Spinner message="Registering account..." />}

        {!loading && currentError && (
          <ErrorMessage
            message={currentError}
            onRetry={() => setLocalError(null)}
          />
        )}

        {!loading && (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                placeholder="At least 4 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <input
                id="reg-confirm-password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              Create Account
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
