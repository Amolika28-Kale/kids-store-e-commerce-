export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="p-6">
      {orders.map((o, i) => (
        <div key={i} className="border p-4 mb-2">
          <p>Date: {new Date(o.date).toLocaleDateString()}</p>
          <p>Total: ₹{o.total}</p>
        </div>
      ))}
    </div>
  );
}
