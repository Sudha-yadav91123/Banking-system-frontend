import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
const money=v=>`₹ ${Number(v??0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

export default function AdminAccounts() {
 const [list,setList]=useState([]),navigate=useNavigate();
 useEffect(()=>{api.get("/admin/accounts").then(r=>setList(r.data)).catch(e=>{if([401,403].includes(e.response?.status))navigate("/")})},[navigate]);
 return <><Navbar title="Accounts List" admin/><main className="container admin-list"><div className="section-title"><h1>Accounts List</h1></div>
 <div className="card table-card"><div className="table-scroll"><table><thead><tr><th>ID</th><th>Account Number</th><th>Balance</th></tr></thead><tbody>
 {!list.length?<tr><td colSpan="3" className="empty">No accounts found.</td></tr>:list.map(a=><tr key={a.id}><td>{a.id}</td><td>{a.accountNumber}</td><td>{money(a.balance)}</td></tr>)}
 </tbody></table></div><div className="back-row"><Link className="secondary-link" to="/admin/dashboard">Back</Link></div></div></main></>;
}
