import { useState } from "react";

export default function WithdrawForm({ onSubmit, loading }) {
  const [amount, setAmount] = useState("");

  const submit = async () => {
    if (!amount || Number(amount) <= 0) return;
    if (await onSubmit(Number(amount))) setAmount("");
  };

  return (
    <div className="card action-card">
      <div className="action-icon">↓</div>
      <h3>Withdraw Money</h3>
      <p className="muted">Withdraw money from your account.</p>
      <input type="number" min="1" placeholder="Amount"
        value={amount} onChange={e => setAmount(e.target.value)} />
      <button disabled={loading} onClick={submit}>
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}
