import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const { login, loading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/tasks";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const currentError = localError || authError;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back! Access your private task dashboard.</p>

        {loading && <Spinner message="Authenticating..." />}

        {!loading && currentError && (
          <ErrorMessage
            message={currentError}
            onRetry={() => setLocalError(null)}
          />
        )}

        {!loading && (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              Login
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
