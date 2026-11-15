import Icon from "../home/Icon";

export default function FormulaCard() {
  return (
    <section className="rounded-card bg-white p-4 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-high text-primary">
          <Icon name="calculate" className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold tracking-tight">Fair Share Net Balance Formula</h2>
            <span className="text-[10px] font-semibold uppercase text-primary">100% Audited</span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-outline">
            <span className="font-medium text-foreground">Net Balance</span> = (Paid at Counter) − (Dish Consumption + Proportional Tax − Proportional Discount)
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-2 rounded-lg bg-surface-low px-2.5 py-1.5 text-[10px] font-semibold text-outline">
            <span>Tax Split: 5% GST (₹163)</span>
            <span>Discount: ₹220 Flat</span>
            <span>Tip: ₹0.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
