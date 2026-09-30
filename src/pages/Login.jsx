import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { saveUser } from "../utils/auth";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const message = location.state?.message;

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      saveUser(response.data.user);
      navigate(response.data.redirect || "/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Invalid email or password");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="brand-icon">🏦</div>
        <h2>Banking Login</h2>
        <p className="muted">Securely access your account</p>
        {message && (
  <div className="success-message">
    {message}
  </div>
)}
        {error && <div className="inline-error">{error}</div>}
        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={form.email} placeholder="Enter your email"
            onChange={e => setForm({...form, email:e.target.value})} required />
          <label>Password</label>
          <input type="password" value={form.password} placeholder="Enter your password"
            onChange={e => setForm({...form, password:e.target.value})} required />
          <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        <div className="center-link"><Link to="/register">Create Account</Link></div>
      </div>
    </div>
  );
}
