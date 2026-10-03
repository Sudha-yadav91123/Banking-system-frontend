import { Routes,Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAccounts from "./pages/admin/AdminAccounts";
import AdminTransactions from "./pages/admin/AdminTransactions";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App(){
 return <Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route element={<ProtectedRoute/>}>
   <Route path="/dashboard" element={<Dashboard/>}/>
   <Route path="/transactions" element={<Transactions/>}/>
  </Route>
  <Route element={<AdminRoute/>}>
   <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
   <Route path="/admin/customers" element={<AdminCustomers/>}/>
   <Route path="/admin/accounts" element={<AdminAccounts/>}/>
   <Route path="/admin/transactions" element={<AdminTransactions/>}/>
  </Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}
