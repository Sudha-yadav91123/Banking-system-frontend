import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const submit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await api.post("/auth/register", form);

    navigate("/", {
      state: {
        message: response.data.message
      }
    });

  } catch (e) {
    setError(e.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <div className="brand-icon">🏦</div>
        <h2>Create Bank Account</h2>
        <p className="muted">Register to start banking securely</p>
        {error && <div className="inline-error">{error}</div>}
        <form onSubmit={submit}>
          <label>Full Name</label><input value={form.name} placeholder="Enter your full name"
            onChange={e=>setForm({...form,name:e.target.value})} required />
          <label>Email</label><input type="email" value={form.email} placeholder="Enter your email"
            onChange={e=>setForm({...form,email:e.target.value})} required />
          <label>Password</label><input type="password" value={form.password} placeholder="Create a password"
            onChange={e=>setForm({...form,password:e.target.value})} required />
          <button disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        </form>
        <div className="center-link"><Link to="/">Back to Login</Link></div>
      </div>
    </div>
  );
}
