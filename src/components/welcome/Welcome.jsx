
import { Link, useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      <h1>Welcome to Expense Tracker</h1>
      <p>You have successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>
      <p>
        Your profile is incomplete.{" "}
        <Link to="/complete-profile">Complete now</Link>.
      </p>
    </div>
  );
}
