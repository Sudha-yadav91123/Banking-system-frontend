import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import AccountCard from "../components/AccountCard";
import DepositForm from "../components/DepositForm";
import WithdrawForm from "../components/WithdrawForm";
import TransferForm from "../components/TransferForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const [account,setAccount]=useState(null);
  const [toast,setToast]=useState({message:"",type:"success"});
  const [loading,setLoading]=useState(false);

  const load = async () => {
    try { setAccount((await api.get("/bank/dashboard")).data); }
    catch(e) { if ([401,403].includes(e.response?.status)) navigate("/"); }
  };
  useEffect(()=>{load()},[]);

  const action = async (path, body) => {
    setLoading(true);
    try {
      const r=await api.post(path,body);
      setToast({message:r.data.message,type:"success"});
      await load();
      return true;
    } catch(e) {
      setToast({message:e.response?.data?.message||"Operation failed.",type:"error"});
      return false;
    } finally { setLoading(false); }
  };

  if (!account) return <div className="loading">Loading account...</div>;

  return <>
    <Navbar />
    <main className="container">
      <Toast {...toast} onClose={()=>setToast({message:"",type:"success"})}/>
      <AccountCard account={account}/>
      <section className="grid">
        <DepositForm loading={loading} onSubmit={amount=>action("/bank/deposit",{amount})}/>
        <WithdrawForm loading={loading} onSubmit={amount=>action("/bank/withdraw",{amount})}/>
        <TransferForm loading={loading} onSubmit={data=>action("/bank/transfer",data)}/>
      </section>
      <div className="center-link"><Link className="primary-link" to="/transactions">View Transaction History</Link></div>
    </main>
  </>;
}
