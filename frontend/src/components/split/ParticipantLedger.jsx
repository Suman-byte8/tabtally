"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const participants = [
  {
    id: "suman", name: "Suman", initials: "SP", badge: "Host", paid: "₹2,000.00", share: "₹649.00", balance: "+₹1,351.00", receives: true,
    lines: [
      { label: "Item Consumption (Tofu Bao + Tea)", amount: "₹680.00" },
      { label: "GST + Service Share (+10%)", amount: "+₹68.00", tone: "tax" },
      { label: "Restaurant Promo Share (-14.5%)", amount: "-₹99.00", tone: "discount" },
      { label: "Final Consumption Share", amount: "₹649.00", tone: "total" },
      { label: "Counter Payment (Direct Card)", amount: "₹2,000.00", tone: "payment" },
    ],
  },
  {
    id: "priya", name: "Priya", initials: "PS", badge: "Co-payer", paid: "₹1,265.00", share: "₹592.00", balance: "+₹673.00", receives: true,
    lines: [
      { label: "Item Consumption (Samosa Soup)", amount: "₹620.00" },
      { label: "GST + Service Share", amount: "+₹62.00", tone: "tax" },
      { label: "Discount Adjustment", amount: "-₹90.00", tone: "discount" },
      { label: "Final Consumption Share", amount: "₹592.00", tone: "total" },
      { label: "Counter Payment (UPI)", amount: "₹1,265.00", tone: "payment" },
    ],
  },
  {
    id: "rahul", name: "Rahul", initials: "RK", paid: "₹0.00", share: "₹706.00", balance: "-₹706.00",
    lines: [
      { label: "Item Consumption (Khow Suey)", amount: "₹740.00" },
      { label: "Taxes + Cesses", amount: "+₹74.00", tone: "tax" },
      { label: "Coupon Savings", amount: "-₹108.00", tone: "discount" },
      { label: "Payable to Group", amount: "₹706.00", tone: "due" },
    ],
  },
  {
    id: "amit", name: "Amit", initials: "AV", paid: "₹0.00", share: "₹678.00", balance: "-₹678.00",
    lines: [
      { label: "Item Consumption (Lotus Stem Crisps)", amount: "₹710.00" },
      { label: "Taxes + Cesses", amount: "+₹71.00", tone: "tax" },
      { label: "Coupon Savings", amount: "-₹103.00", tone: "discount" },
      { label: "Payable to Group", amount: "₹678.00", tone: "due" },
    ],
  },
  {
    id: "rohan", name: "Rohan", initials: "RM", paid: "₹0.00", share: "₹640.00", balance: "-₹640.00",
    lines: [
      { label: "Item Consumption (Mandalay Salad)", amount: "₹670.00" },
      { label: "Taxes + Cesses", amount: "+₹67.00", tone: "tax" },
      { label: "Coupon Savings", amount: "-₹97.00", tone: "discount" },
      { label: "Payable to Group", amount: "₹640.00", tone: "due" },
    ],
  },
];

const lineTones = {
  tax: "text-outline",
  discount: "text-primary",
  total: "pt-1.5 font-medium text-foreground",
  payment: "font-medium text-secondary",
  due: "pt-1.5 font-semibold text-error",
};

export default function ParticipantLedger() {
  const [open, setOpen] = useState([]);
  const allOpen = open.length === participants.length;

  function toggle(id) {
    setOpen((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl font-medium tracking-tight">Participant Ledger</h2>
          <span className="rounded-full bg-surface-high px-2 py-0.5 text-[10px] font-semibold">{participants.length}</span>
        </div>
        <button
          className="flex items-center gap-0.5 text-xs font-medium text-primary"
          onClick={() => setOpen(allOpen ? [] : participants.map((p) => p.id))}
          type="button"
        >
          {allOpen ? "Collapse All" : "Expand All"}
          <Icon name="chevron" className={`h-4 w-4 transition-transform ${allOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      <ul className="space-y-2">
        {participants.map((person) => {
          const isOpen = open.includes(person.id);
          return (
            <li className="overflow-hidden rounded-xl bg-white shadow-sm" key={person.id}>
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-2 p-3 text-left"
                onClick={() => toggle(person.id)}
                type="button"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="relative shrink-0">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${person.receives ? "bg-secondary-container text-secondary" : "bg-surface-high"}`}>
                      {person.initials}
                    </span>
                    {person.badge === "Host" && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">★</span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-semibold">{person.name}</span>
                      {person.badge && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${person.badge === "Host" ? "bg-surface-high text-outline" : "bg-secondary-container text-secondary"}`}>
                          {person.badge}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[13px] text-outline">Paid {person.paid} • Share {person.share}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <div className="text-right">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-sm font-semibold ${person.receives ? "bg-secondary-container text-primary" : "bg-error-container text-error"}`}>
                      {person.balance}
                    </span>
                    <p className={`text-[10px] font-medium ${person.receives ? "text-primary" : "text-error"}`}>
                      {person.receives ? "To Receive" : "Owes Money"}
                    </p>
                  </div>
                  <Icon name="chevron" className={`h-5 w-5 text-outline transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>
              {isOpen && (
                <dl className="space-y-1.5 bg-surface-low/50 px-3 pb-3 pt-3 text-[13px] text-outline">
                  {person.lines.map((line) => (
                    <div className={`flex items-center justify-between gap-2 ${lineTones[line.tone] || ""}`} key={line.label}>
                      <dt>{line.label}</dt>
                      <dd className={`tabular-nums ${line.tone ? "" : "text-foreground"}`}>{line.amount}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
