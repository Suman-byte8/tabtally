import Icon from "../home/Icon";

export default function SettlementsCard() {
  return (
    <section className="space-y-4 rounded-card bg-white p-4 shadow-sm" id="settlement">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold">Settlement status</h2>
          <p className="mt-0.5 text-xs text-outline">3 of 5 guests have paid</p>
        </div>
        <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-medium text-secondary">60% complete</span>
      </div>
      <div
        aria-label="Settlement progress: 60 percent"
        className="h-2 overflow-hidden rounded-full bg-surface-high"
        role="progressbar"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="60"
      >
        <div className="h-full w-3/5 rounded-full bg-primary" />
      </div>
      <div className="flex items-center justify-between rounded-xl bg-surface-low p-3">
        <div>
          <p className="text-sm font-medium">Amount still due</p>
          <p className="mt-0.5 text-xs text-outline">From Amit and Rohan</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-primary">₹1,504.80</p>
          <p className="text-xs text-outline">2 × ₹752.40</p>
        </div>
      </div>
      <div className="flex items-start gap-2 rounded-xl bg-secondary-container/40 p-3 text-xs text-secondary">
        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Each guest&apos;s share includes their proportional service charge and GST.</p>
      </div>
    </section>
  );
}
