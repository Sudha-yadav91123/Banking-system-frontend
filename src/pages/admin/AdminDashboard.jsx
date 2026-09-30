import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  return <><Navbar title="Admin Dashboard" admin/><main className="container admin-container">
    <div className="admin-heading"><span className="eyebrow">ADMIN PANEL</span><h1>Admin Dashboard</h1>
    <p className="muted">Manage customers, accounts and transactions.</p></div>
    <div className="admin-grid">
      <Link to="/admin/customers" className="admin-card"><span>👥</span><h3>View Customers</h3><p>Manage registered customers</p></Link>
      <Link to="/admin/accounts" className="admin-card"><span>🏦</span><h3>View Accounts</h3><p>Review bank accounts</p></Link>
      <Link to="/admin/transactions" className="admin-card"><span>↔</span><h3>View Transactions</h3><p>Monitor all transactions</p></Link>
      <Link to="/dashboard" className="admin-card"><span>⌂</span><h3>User Dashboard</h3><p>Return to banking dashboard</p></Link>
    </div>
  </main></>;
}
