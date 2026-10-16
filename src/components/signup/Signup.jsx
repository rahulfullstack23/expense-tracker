
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD13Pm_A6P3YZ8B3lM8n5i_D2rDu5IGG74`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

      console.log("User has successfully signed up.");
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message === "EMAIL_EXISTS"
          ? "Email already registered. Please log in."
          : err.message.replaceAll("_", " ")
        );
    }
  };

  return (
    <div className="signup-container">
      <h1>SignUp</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="new-password"
          required
        />
        <br /><br />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p>{error}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
