import { useState } from "react";

export default function TransferForm({ onSubmit, loading }) {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const submit = async () => {
    if (!amount || Number(amount) <= 0 || !receiver.trim()) return;
    if (await onSubmit({
      amount: Number(amount),
      receiverAccount: receiver.trim()
    })) {
      setAmount("");
      setReceiver("");
    }
  };

  return (
    <div className="card action-card">
      <div className="action-icon">↗</div>
      <h3>Transfer Money</h3>
      <p className="muted">Send money to another account.</p>
      <input placeholder="Receiver Account No" value={receiver}
        onChange={e => setReceiver(e.target.value)} />
      <input type="number" min="1" placeholder="Amount" value={amount}
        onChange={e => setAmount(e.target.value)} />
      <button disabled={loading} onClick={submit}>
        {loading ? "Processing..." : "Transfer"}
      </button>
    </div>
  );
}
