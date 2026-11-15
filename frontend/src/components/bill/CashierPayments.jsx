"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const payers = [
  { name: "Suman", initials: "SP", badge: "Host", method: "UPI (Google Pay) • Ref: 409281...", icon: "qr", amount: "₹2,000.00" },
  { name: "Priya", initials: "PS", badge: "Co-payer", method: "HDFC Millennia (Tap to pay)", icon: "wallet", amount: "₹1,265.00" },
];

const guests = ["Ananya", "Rohan", "Suman (Additional)", "Priya (Additional)"];
const methods = ["UPI", "Card", "Cash"];

export default function CashierPayments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState("UPI");

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Cashier Payments</h2>
          <p className="text-[10px] font-semibold text-outline">Who tapped or swiped at the restaurant counter?</p>
        </div>
        <button
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-container"
          onClick={() => setModalOpen(true)}
          type="button"
        >
          <Icon name="add" className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-surface-low p-2.5">
        <Icon name="wallet" className="h-[18px] w-[18px] shrink-0 text-tertiary" />
        <p className="text-[10px] font-semibold leading-tight text-outline">
          Counter payments clear the venue&apos;s tab. In Step 3, TabTally will calculate who transfers money back to these payers.
        </p>
      </div>

      {payers.map((payer) => (
        <div className="flex items-start justify-between rounded-xl bg-white p-3 shadow-sm" key={payer.name}>
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-sm font-medium text-secondary">
                {payer.initials}
              </span>
              {payer.badge === "Host" && (
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">★</span>
              )}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-bold">{payer.name}</span>
                <span className="rounded bg-surface-high px-1.5 text-[10px] font-medium text-outline">{payer.badge}</span>
              </div>
              <p className="flex items-center gap-1 text-[10px] font-semibold text-outline">
                <Icon name={payer.icon} className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{payer.method}</span>
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold tabular-nums">{payer.amount}</p>
            <p className="flex items-center justify-end gap-0.5 text-[10px] font-semibold text-primary">
              <Icon name="check" className="h-3.5 w-3.5" />
              Confirmed
            </p>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2 rounded-xl bg-secondary-container p-3 text-secondary shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <Icon name="check" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold">Restaurant Tab Fully Settled</p>
              <p className="text-[10px] font-semibold opacity-80">Paid in full directly to Burmese Kitchen</p>
            </div>
          </div>
          <span className="shrink-0 text-lg font-bold tabular-nums">₹0.00 Left</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/10">
          <div className="h-full w-full rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-between pt-1 text-[10px] font-semibold opacity-90">
          <span>Paid by 2 guests: ₹3,265.00</span>
          <span>Target: ₹3,265.00</span>
        </div>
      </div>

      {modalOpen && (
        <div
          aria-labelledby="add-payer-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-foreground/40 backdrop-blur-xs"
          role="dialog"
        >
          <div className="mx-auto w-full max-w-md rounded-t-2xl bg-white p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold" id="add-payer-title">Record Counter Payment</h3>
              <button
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-outline"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                <Icon name="close" className="h-[18px] w-[18px]" />
              </button>
            </div>
            <div className="mb-3 flex flex-col gap-2">
              <label className="block text-[10px] font-semibold text-outline">
                Select Guest who Swiped/Paid
                <select className="mt-1 w-full rounded-lg bg-surface-low p-2.5 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-primary">
                  {guests.map((guest) => <option key={guest}>{guest}</option>)}
                </select>
              </label>
              <label className="block text-[10px] font-semibold text-outline">
                Amount Paid (₹)
                <input
                  className="mt-1 w-full rounded-lg bg-surface-low p-2.5 text-lg font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                  type="number"
                />
              </label>
              <div>
                <p className="mb-1 text-[10px] font-semibold text-outline">Payment Method</p>
                <div className="grid grid-cols-3 gap-2">
                  {methods.map((item) => (
                    <button
                      aria-pressed={method === item}
                      className={`rounded-lg px-1 py-2 text-center text-[10px] ${method === item ? "bg-surface-high font-semibold" : "bg-white font-semibold text-outline shadow-sm"}`}
                      key={item}
                      onClick={() => setMethod(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="h-11 w-full rounded-xl bg-primary text-xs font-semibold text-white"
              onClick={() => setModalOpen(false)}
              type="button"
            >
              Confirm Counter Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
