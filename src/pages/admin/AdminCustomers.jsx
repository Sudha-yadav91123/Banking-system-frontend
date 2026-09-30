import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

export default function AdminCustomers() {
  const [list,setList]=useState([]),[error,setError]=useState("");
  const navigate=useNavigate();
  const load=()=>api.get("/admin/customers").then(r=>setList(r.data)).catch(e=>{
    if([401,403].includes(e.response?.status))navigate("/");
  });
  useEffect(()=>{load()},[]);
  const remove=async(id)=>{
    if(!window.confirm("Delete this customer?"))return;
    try{await api.delete(`/admin/customers/${id}`);load()}
    catch(e){setError(e.response?.data?.message||"Unable to delete customer")}
  };
  return <><Navbar title="Customers List" admin/><main className="container admin-list">
    <div className="section-title"><h1>Customers List</h1></div>
    <div className="card table-card">{error&&<div className="inline-error">{error}</div>}
      <div className="table-scroll"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
      <tbody>{!list.length?<tr><td colSpan="5" className="empty">No customers found.</td></tr>:list.map(c=><tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.email}</td><td>{c.role}</td><td><button className="danger" onClick={()=>remove(c.id)}>Delete</button></td></tr>)}</tbody></table></div>
      <div className="back-row"><Link className="secondary-link" to="/admin/dashboard">Back</Link></div>
    </div>
  </main></>;
}
