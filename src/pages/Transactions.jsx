import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  const [list,setList]=useState([]),[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  useEffect(()=>{
    api.get("/bank/transactions")
      .then(r=>setList(r.data))
      .catch(e=>{if([401,403].includes(e.response?.status))navigate("/")})
      .finally(()=>setLoading(false));
  },[navigate]);
  return <><Navbar title="Transaction History"/><main className="container">
    {loading?<div className="loading">Loading transactions...</div>:<TransactionTable list={list}/>}
  </main></>;
}
