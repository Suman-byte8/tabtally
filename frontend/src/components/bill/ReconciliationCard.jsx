"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const SUBTOTAL = 3420;
const GST = 171;
const DISCOUNT = 500;
const ROUNDING = 3;
const serviceOptions = [
  { percent: 5, amount: 171 },
  { percent: 10, amount: 342 },
  { percent: 0, amount: 0 },
];

function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ReconciliationCard() {
  const [service, setService] = useState(serviceOptions[0]);
  const total = SUBTOTAL + GST + service.amount - DISCOUNT + ROUNDING;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Bill Breakdown</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 text-[10px] font-semibold text-secondary">
          <Icon name="check" className="h-3.5 w-3.5" />
          Exact Match
        </span>
      </div>

      <div className="rounded-xl bg-white p-3 shadow-sm">
        <div className="mb-3 rounded-lg bg-surface-low p-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[13px] text-outline">Cart Order Subtotal</span>
            <span className="text-lg font-semibold tabular-nums text-outline">{formatCurrency(SUBTOTAL)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Actual Food Subtotal</span>
            <span className="text-lg font-bold tabular-nums text-primary">{formatCurrency(SUBTOTAL)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5">
              GST (5.0%)
              <span title="CGST 2.5% + SGST 2.5%">
                <Icon name="info" className="h-4 w-4 text-outline" />
              </span>
            </span>
            <span className="font-medium tabular-nums">+{formatCurrency(GST)}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <p>Restaurant Service Charge</p>
              <p className="text-[10px] font-semibold text-outline">Discretionary fee</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-lg bg-surface-high p-0.5" role="group" aria-label="Service charge">
                {serviceOptions.map((option) => (
                  <button
                    aria-pressed={service.percent === option.percent}
                    className={`rounded px-2 py-0.5 text-[10px] ${service.percent === option.percent ? "bg-white font-semibold text-primary shadow-sm" : "font-medium text-outline"}`}
                    key={option.percent}
                    onClick={() => setService(option)}
                    type="button"
                  >
                    {option.percent}%
                  </button>
                ))}
              </div>
              <span className="min-w-14 text-right font-medium tabular-nums">
                {service.amount > 0 ? "+" : ""}{formatCurrency(service.amount)}
              </span>
            </div>
          </div>

          <div className="my-0.5 flex items-center justify-between rounded-lg bg-secondary-container/50 px-2.5 py-1.5">
            <span className="flex min-w-0 items-center gap-1.5">
              <Icon name="tag" className="h-[18px] w-[18px] shrink-0 text-primary" />
              <span className="truncate text-[13px] font-medium text-secondary">Zomato Gold Dining 15%</span>
            </span>
            <span className="font-bold tabular-nums text-primary">-{formatCurrency(DISCOUNT)}</span>
          </div>

          <div className="flex items-center justify-between py-1 text-outline">
            <span className="text-[13px]">Rounding Adjustment</span>
            <span className="tabular-nums">+{formatCurrency(ROUNDING)}</span>
          </div>

          <div className="my-1 h-px bg-surface-high" />

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <p className="text-xl font-semibold tracking-tight">Final Bill Total</p>
              <p className="text-[10px] font-semibold text-outline">Payable to Burma Burma</p>
            </div>
            <span className="text-[28px] font-bold tabular-nums tracking-tight">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-1 rounded-lg bg-surface-low p-2">
          <Icon name="info" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
          <div>
            <p className="text-xs font-semibold">Proportional Tax &amp; Discounting</p>
            <p className="text-[13px] leading-snug text-outline">
              Taxes and the ₹500 discount are weighted against each person&apos;s individual dishes ordered. No one subsidizes someone else&apos;s cocktail!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
