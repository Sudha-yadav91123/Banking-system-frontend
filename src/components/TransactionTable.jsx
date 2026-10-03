const money = (v) => `₹ ${Number(v ?? 0).toLocaleString("en-IN", {
  minimumFractionDigits: 2, maximumFractionDigits: 2
})}`;

export default function TransactionTable({ list = [] }) {
  return (
    <div className="table-wrapper">
      <div className="card table-card">
        <div className="table-scroll">
          <table>
            <thead><tr>
              <th>ID</th><th>Sender</th><th>Receiver</th><th>Type</th><th>Amount</th><th>Date</th>
            </tr></thead>
            <tbody>
              {!list.length ? (
                <tr><td colSpan="6" className="empty">No transactions found.</td></tr>
              ) : list.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td><td>{t.senderAccount}</td><td>{t.receiverAccount}</td>
                  <td><span className="type-pill">{t.type}</span></td>
                  <td>{money(t.amount)}</td><td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
