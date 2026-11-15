import Icon from "./Icon";

const balances = [
  { initial: "R", name: "Rahul owes you", amount: "₹157.50" },
  { initial: "A", name: "Amit owes you", amount: "₹87.50" },
];

export default function BalanceCard() {
  return (
    <section className="space-y-4 rounded-card bg-white p-4 shadow-sm" id="balance">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon name="wallet" className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Your net balance</h2>
        </div>
        <span className="rounded-full bg-secondary-container px-2.5 py-1 text-xs font-medium text-secondary">You are owed</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight text-primary">+₹245.00</p>
          <p className="text-xs text-outline">From Indiranagar gatherings</p>
        </div>
        <p className="text-right text-xs text-outline">1 of 4 settled<br />25% complete</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-high">
        <div className="h-full w-1/4 rounded-full bg-primary" />
      </div>
      <div className="space-y-2">
        {balances.map((balance) => (
          <div className="flex items-center justify-between rounded-xl bg-surface-low px-3 py-2" key={balance.name}>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-xs font-semibold text-secondary">{balance.initial}</span>
              {balance.name}
            </div>
            <span className="text-sm font-semibold text-primary">{balance.amount}</span>
          </div>
        ))}
      </div>
      <button className="flex w-full items-center justify-center gap-1 py-1 text-sm font-medium text-primary hover:text-primary-container" type="button">
        Send a payment reminder
        <Icon name="send" className="h-4 w-4" />
      </button>
    </section>
  );
}
