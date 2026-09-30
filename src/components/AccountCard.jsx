const money = (v) => `₹ ${Number(v ?? 0).toLocaleString("en-IN", {
  minimumFractionDigits: 2, maximumFractionDigits: 2
})}`;

export default function AccountCard({ account }) {
  return (
    <section className="card account-row">
      <div className="account-left">
        <span className="eyebrow">ACCOUNT NUMBER</span>
        <h3>{account.accountNumber}</h3>
        <p className="muted">Welcome, {account.customer?.name || "Customer"}</p>
      </div>
      <div className="account-right">
        <span className="eyebrow">AVAILABLE BALANCE</span>
        <div className="balance">{money(account.balance)}</div>
      </div>
    </section>
  );
}
