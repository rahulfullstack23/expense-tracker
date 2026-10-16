import { Link } from "react-router-dom";
import "./Profile.css";

const ProfileHeader = () => {
  const completed = localStorage.getItem("profileCompleted") === "true";

  return (
    <div className="profile-header-bar">
      <div className="quote">
        <em>Winners never quit, Quitters never win.</em>
      </div>

      {!completed && (
        <div className="completion-badge">
          Your Profile is <strong>64%</strong> completed. A complete Profile has
          higher chances of landing a job.
          <Link to="/complete-profile" className="complete-link">
            Complete now
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;