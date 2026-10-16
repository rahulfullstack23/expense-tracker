
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD13Pm_A6P3YZ8B3lM8n5i_D2rDu5IGG74`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      // Store Firebase authentication token
      localStorage.setItem("token", data.idToken);

      navigate("/welcome");
    } catch (err) {
      if (
        [
          "INVALID_LOGIN_CREDENTIALS",
          "EMAIL_NOT_FOUND",
          "INVALID_PASSWORD",
          "INVALID_EMAIL",
        ].includes(err.message)
      ) {
        alert("Invalid email or password!");
      } else {
        alert("Login failed. Please try again.");
        console.error(err.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </div>

      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
