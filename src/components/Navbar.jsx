import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { clearUser, getUser } from "../utils/auth";

export default function Navbar({ title = "🏦 My Bank Dashboard", admin = false }) {
  const navigate = useNavigate();
  const user = getUser();

  const logout = async () => {
    try { await api.post("/auth/logout"); }
    catch (error) { console.log("Logout API error"); }
    finally {
      clearUser();
      navigate("/");
    }
  };

  return (
    <header className="navbar">
      <h2>{title}</h2>
      <div className="nav-actions">
        {admin && <Link className="nav-link" to="/admin/dashboard">Admin</Link>}
        {user?.name && <span className="nav-user">{user.name}</span>}
        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
