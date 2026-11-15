import Link from "next/link";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import CashierPayments from "./CashierPayments";
import ReconciliationCard from "./ReconciliationCard";

const steps = [
  { label: "Live Cart", state: "done" },
  { label: "Bill & Tax", state: "active" },
  { label: "Settle Up", state: "next" },
];

export default function BillPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5">
        <section>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Stage 2 of 3
            </span>
            <span className="text-[10px] font-semibold text-outline">Burma Burma • Indiranagar</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Bill &amp; Tax Reconciliation</h1>
          <p className="mt-0.5 text-[13px] text-outline">Session #TAB-8821 • Verify receipt math &amp; cashier payments</p>

          <ol className="relative mt-3 flex items-center justify-between rounded-xl bg-white p-2 shadow-sm">
            <span className="absolute left-8 right-8 top-[calc(50%-0.5rem)] h-0.5 bg-surface-high" />
            <span className="absolute left-8 top-[calc(50%-0.5rem)] h-0.5 w-1/2 bg-primary" />
            {steps.map((step, index) => (
              <li className="relative z-10 flex flex-col items-center" key={step.label}>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                    step.state === "done"
                      ? "bg-primary text-white shadow-sm"
                      : step.state === "active"
                        ? "bg-secondary-container text-primary shadow-sm ring-4 ring-secondary-container/60"
                        : "bg-surface-high text-outline"
                  }`}
                >
                  {step.state === "done" ? <Icon name="check" className="h-4 w-4" /> : index + 1}
                </span>
                <span className={`mt-1 text-[10px] ${step.state === "active" ? "font-bold text-primary" : step.state === "done" ? "font-semibold" : "text-outline"}`}>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <ReconciliationCard />

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#d6b98f] via-[#8a6c4a] to-[#35463c] text-white shadow-sm">
              <Icon name="restaurant" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Burma Burma Indiranagar</p>
              <p className="text-[10px] font-semibold text-outline">Table 04 • 4 Guests</p>
            </div>
          </div>
          <Icon name="receipt" className="h-6 w-6 text-outline" />
        </div>

        <CashierPayments />

        <div className="space-y-1">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold text-white shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
            href="/split"
          >
            Calculate Final Settlement &amp; Transfers
            <Icon name="arrow" className="h-[18px] w-[18px]" />
          </Link>
          <p className="text-center text-[10px] font-semibold text-outline">
            Generates UPI links for Rohan &amp; Ananya to reimburse Suman &amp; Priya
          </p>
        </div>
      </main>
      <BottomNavigation activePage="bill" />
    </div>
  );
}
