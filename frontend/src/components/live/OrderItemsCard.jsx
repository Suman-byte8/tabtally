import Icon from "../home/Icon";

const items = [
  { name: "Burmese Khow Suey", detail: "Vegetable · Mild", quantity: 2, price: 680, addedBy: "Suman" },
  { name: "Crispy Lotus Stem", detail: "Chilli honey glaze", quantity: 1, price: 480, addedBy: "Rahul" },
  { name: "Tea Leaf Salad", detail: "Burmese classic", quantity: 2, price: 420, addedBy: "Priya" },
  { name: "Mushroom Bao", detail: "Steamed · 2 pieces", quantity: 2, price: 370, addedBy: "Amit" },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

export default function OrderItemsCard() {
  return (
    <section className="space-y-4 rounded-card bg-white p-4 shadow-sm" id="order-items">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold">Current order</h2>
          <p className="mt-0.5 text-xs text-outline">4 dishes · 8 portions</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-low px-2.5 py-1 text-xs font-medium text-outline">
          <Icon name="history" className="h-3.5 w-3.5" />
          Updated just now
        </span>
      </div>
      <ul className="divide-y divide-outline-variant/40">
        {items.map((item) => (
          <li className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0" key={item.name}>
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-low text-xs font-semibold text-primary">
                {item.quantity}×
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-outline">{item.detail} · Added by {item.addedBy}</p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold">{formatCurrency(item.quantity * item.price)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-outline-variant/40 pt-3 text-sm">
        <span className="text-outline">Order subtotal</span>
        <span className="font-semibold">{formatCurrency(3420)}</span>
      </div>
    </section>
  );
}
