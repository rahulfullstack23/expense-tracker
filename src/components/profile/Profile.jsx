import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";



const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
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
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD13Pm_A6P3YZ8B3lM8n5i_D2rDu5IGG74`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Update failed");
      }

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("profileCompleted", "true");

      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/welcome"), 1000);
    } catch (error) {
      setMessage(error.message.replaceAll("_", " "));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <ProfileHeader />

      <main className="form-main-container">
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-header">
            <h2>Contact Details</h2>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/welcome")}
            >
              Cancel
            </button>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="fullName">
                {/* GitHub SVG Icon */}
                <svg
                  className="field-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Full Name:</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="photoUrl">
                {/* Globe SVG Icon */}
                <svg
                  className="field-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Profile Photo URL</span>
              </label>
              <input
                id="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
          </div>

          {message && <p className="status-message">{message}</p>}

          <div className="form-footer">
            <button type="submit" className="btn-update" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompleteProfile;