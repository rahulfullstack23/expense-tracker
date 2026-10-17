import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";



const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    setMessage("");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD13Pm_A6P3YZ8B3lM8n5i_D2rDu5IGG74`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to send verification email");
      }

      setMessage("Verification email sent successfully! Please check your inbox.");
    } catch (error) {
      // Handle Firebase REST API errors as specified in official docs
      const errorMessage = error.message.replaceAll("_", " ");
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3>Email Verification</h3>
        <p>Please verify your email ID to secure your account and enable password recovery.</p>

        {message && <p role="status" className="status-message">{message}</p>}

        <button 
          onClick={handleSendVerification} 
          disabled={loading}
          className="btn-update"
        >
          {loading ? "Sending..." : "Verify Email ID"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;