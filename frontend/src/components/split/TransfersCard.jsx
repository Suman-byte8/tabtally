"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const transfers = [
  { id: 1, from: "Rahul", fromInitials: "RK", to: "Suman", toFull: "Suman Patel", amount: 706, upi: "suman.patel@okhdfcbank" },
  { id: 2, from: "Amit", fromInitials: "AV", to: "Suman", toFull: "Suman Patel", amount: 645, upi: "suman.patel@okhdfcbank" },
  { id: 3, from: "Amit", fromInitials: "AV", to: "Priya", amount: 33, settledNote: "Settled via GPay (#8291)", settledAt: "Today, 10:42 PM" },
  { id: 4, from: "Rohan", fromInitials: "RM", to: "Priya", toFull: "Priya Sharma", amount: 640, upi: "priya.sharma@paytm" },
];

function upiLink(transfer) {
  return `upi://pay?pa=${transfer.upi}&pn=${encodeURIComponent(transfer.toFull)}&am=${transfer.amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent("TabTally Burma Burma")}`;
}

export default function TransfersCard({ showToast }) {
  const [paid, setPaid] = useState([]);

  function togglePaid(id) {
    const isPaid = paid.includes(id);
    setPaid((current) => (isPaid ? current.filter((item) => item !== id) : [...current, id]));
    showToast(isPaid ? "Reverted to pending" : "Payment marked as settled ✓", !isPaid);
  }

  function copyUpi(upi) {
    navigator.clipboard?.writeText(upi).catch(() => {});
    showToast(`UPI ID copied: ${upi}`);
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-medium tracking-tight">Optimized Debt Simplification</h2>
          <p className="text-[13px] text-outline">4 peer-to-peer transfers settle 100% of the table</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-primary">Smart Match</span>
      </div>
      <ul className="mt-3 space-y-2">
        {transfers.map((transfer) => {
          if (transfer.settledNote) {
            return (
              <li className="rounded-xl bg-secondary-container/40 p-3 shadow-sm" key={transfer.id}>
                <div className="flex items-start justify-between">
                  <TransferParties transfer={transfer} settled />
                  <span className="text-lg font-semibold tabular-nums text-primary">₹{transfer.amount.toFixed(2)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Icon name="check" className="h-[18px] w-[18px]" />
                    {transfer.settledNote}
                  </span>
                  <span className="text-[10px] font-semibold text-outline">{transfer.settledAt}</span>
                </div>
              </li>
            );
          }

          const isPaid = paid.includes(transfer.id);
          return (
            <li className={`rounded-xl p-3 shadow-sm transition-all duration-200 ${isPaid ? "bg-secondary-container/30" : "bg-white"}`} key={transfer.id}>
              <div className="flex items-start justify-between">
                <TransferParties transfer={transfer} />
                <span className="text-lg font-semibold tabular-nums">₹{transfer.amount.toFixed(2)}</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between pt-2.5 text-xs text-outline">
                <span className="flex min-w-0 items-center gap-1">
                  <Icon name="wallet" className="h-4 w-4 shrink-0" />
                  <span className="truncate font-mono text-[11px]">{transfer.upi}</span>
                </span>
                <button className="flex items-center gap-0.5 font-medium text-primary" onClick={() => copyUpi(transfer.upi)} type="button">
                  <Icon name="copy" className="h-3.5 w-3.5" />
                  Copy
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-[13px] font-semibold text-white shadow-sm transition-transform active:scale-[0.98]"
                  href={upiLink(transfer)}
                >
                  <Icon name="wallet" className="h-[18px] w-[18px]" />
                  Pay via UPI
                </a>
                <button
                  className={`flex h-10 items-center justify-center gap-1.5 rounded-xl bg-surface-high px-3.5 text-[13px] transition-all hover:bg-surface-container active:scale-[0.98] ${isPaid ? "font-semibold text-primary" : "font-medium"}`}
                  onClick={() => togglePaid(transfer.id)}
                  type="button"
                >
                  <Icon name="check" className="h-[18px] w-[18px]" />
                  {isPaid ? "Settled" : "Mark Paid"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TransferParties({ transfer, settled = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${settled ? "bg-secondary-container text-primary" : "bg-error-container text-error"}`}>
        {transfer.fromInitials}
      </span>
      <span className="flex items-center gap-1.5 text-sm font-semibold">
        {transfer.from}
        <Icon name="arrow" className="h-4 w-4 text-outline" />
        {transfer.to}
      </span>
    </div>
  );
}
