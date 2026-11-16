"use client";

import Icon from "../home/Icon";

const rows = [
  { label: "Payer", value: "Rahul Sharma (PhonePe UPI)", strong: true },
  { label: "Feast Session", value: "Burma Burma (Table #4)" },
  { label: "Items Share", value: "1x Khow Suey (Equal Split)" },
  { label: "Taxes & Service Charge", value: "₹17.50" },
];

export default function ReceiptDialog({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      aria-labelledby="receipt-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-surface-container bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-high pb-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold" id="receipt-title">
            <Icon name="check" className="h-[22px] w-[22px] text-primary" />
            Payment Verified
          </h2>
          <button
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-outline hover:bg-surface-container"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <dl className="flex flex-col gap-2 py-1 text-[13px]">
          {rows.map((row) => (
            <div className="flex items-center justify-between gap-3" key={row.label}>
              <dt className="text-outline">{row.label}</dt>
              <dd className={`text-right ${row.strong ? "font-semibold" : "font-medium"}`}>{row.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-dashed border-surface-high pt-2">
            <dt className="text-sm font-semibold">Settled Amount</dt>
            <dd className="text-lg font-bold text-primary">₹157.50</dd>
          </div>
        </dl>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
          onClick={onClose}
          type="button"
        >
          <Icon name="check" className="h-[18px] w-[18px]" />
          Dismiss
        </button>
      </div>
    </div>
  );
}
