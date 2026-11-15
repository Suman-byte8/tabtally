import Icon from "../home/Icon";

const charges = [
  { label: "Food and drinks", amount: 3420 },
  { label: "Service charge · 5%", amount: 171 },
  { label: "CGST · 2.5%", amount: 85.5 },
  { label: "SGST · 2.5%", amount: 85.5 },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

export default function BillBreakdownCard() {
  return (
    <section className="space-y-4 rounded-card bg-white p-4 shadow-sm" id="bill-breakdown">
      <div className="flex items-center gap-2">
        <Icon name="receipt" className="h-5 w-5 text-primary" />
        <div>
          <h2 className="font-semibold">Bill breakdown</h2>
          <p className="mt-0.5 text-xs text-outline">Charges split proportionally</p>
        </div>
      </div>
      <dl className="space-y-3">
        {charges.map((charge) => (
          <div className="flex justify-between gap-3 text-sm" key={charge.label}>
            <dt className="text-outline">{charge.label}</dt>
            <dd className="font-medium">{formatCurrency(charge.amount)}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-end justify-between border-t border-outline-variant/50 pt-4">
        <div>
          <p className="font-semibold">Total bill</p>
          <p className="mt-0.5 text-xs text-outline">Equal split · 5 guests</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-primary">{formatCurrency(3762)}</p>
          <p className="text-xs text-outline">{formatCurrency(752.4)} per guest</p>
        </div>
      </div>
    </section>
  );
}
