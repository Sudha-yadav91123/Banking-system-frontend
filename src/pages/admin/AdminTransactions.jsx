import { useEffect,useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import TransactionTable from "../../components/TransactionTable";

export default function AdminTransactions(){
 const [list,setList]=useState([]),navigate=useNavigate();
 useEffect(()=>{api.get("/admin/transactions").then(r=>setList(r.data)).catch(e=>{if([401,403].includes(e.response?.status))navigate("/")})},[navigate]);
 return <><Navbar title="Transaction History" admin/><main className="container admin-list"><div className="section-title"><h1>Transaction History</h1></div>
 <div className="card table-card"><TransactionTable list={list}/><div className="back-row"><Link className="secondary-link" to="/admin/dashboard">Back</Link></div></div></main></>;
}
