
import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;

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
      setError("Signup successful!");
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>SignUp</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          minLength={6}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Confirm password"
          required
        />
        <br /><br />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p>{error}</p>}

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
