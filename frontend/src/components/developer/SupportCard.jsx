"use client";

import { useRef, useState } from "react";
import Icon from "../home/Icon";

const tiers = [
  { amount: 100, emoji: "☕", label: "Single Filter Coffee" },
  { amount: 250, emoji: "🥟", label: "Bao & Chai Platter", popular: true },
  { amount: 500, emoji: "🚀", label: "Table Legend" },
];

const qrMarkers = [[10, 10], [80, 10], [10, 80]];
const qrCells = [
  [46, 12, 6, 6], [56, 12, 6, 6], [66, 12, 6, 6], [46, 22, 6, 14], [66, 26, 6, 10], [56, 30, 6, 6],
  [12, 46, 6, 6], [22, 46, 14, 6], [12, 56, 18, 6], [22, 66, 8, 6], [82, 46, 10, 6], [100, 46, 8, 6],
  [90, 56, 18, 6], [82, 66, 12, 6], [102, 66, 6, 6], [46, 82, 6, 10], [56, 82, 16, 6], [46, 96, 12, 12],
  [64, 92, 8, 16], [82, 82, 14, 6], [82, 94, 8, 14], [98, 86, 10, 8], [96, 98, 12, 10],
];

export default function SupportCard({ upi }) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const amountInput = useRef(null);

  function copyUpi() {
    navigator.clipboard?.writeText(upi).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function selectTier(value) {
    setAmount(String(value));
    amountInput.current?.focus();
  }

  function contribute() {
    const value = amount.trim() || "100";
    window.location.href = `upi://pay?pa=${upi}&pn=${encodeURIComponent("TabTally Indie Support")}&am=${encodeURIComponent(value)}&cu=INR`;
  }

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container text-lg">☕</span>
          <div>
            <h3 className="text-xl font-medium leading-tight tracking-tight">Buy a Filter Coffee</h3>
            <p className="text-[10px] font-semibold text-outline">Support continuous indie maintenance</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-primary">UPI Enabled</span>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl bg-surface-low p-3 text-center">
        <div className="relative flex items-center justify-center rounded-xl bg-white p-3 shadow-sm">
          <svg aria-label="UPI QR code" className="h-40 w-40 text-foreground" fill="currentColor" role="img" viewBox="0 0 120 120">
            {qrMarkers.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect height="30" rx="4" width="30" x={x} y={y} />
                <rect fill="#ffffff" height="20" rx="2" width="20" x={x + 5} y={y + 5} />
                <rect height="10" rx="1" width="10" x={x + 10} y={y + 10} />
              </g>
            ))}
            {qrCells.map(([x, y, width, height]) => (
              <rect height={height} key={`${x}-${y}`} rx="1" width={width} x={x} y={y} />
            ))}
            <circle cx="60" cy="60" fill="#ffffff" r="14" />
            <circle className="text-primary" cx="60" cy="60" fill="currentColor" r="11" />
          </svg>
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xl font-medium text-white">₹</span>
        </div>
        <div>
          <h4 className="text-xl font-medium tracking-tight">Scan to Donate via UPI</h4>
          <p className="text-[13px] text-outline">Works seamlessly with Google Pay, PhonePe, Paytm, and BHIM UPI.</p>
        </div>
        <div className="mt-1 flex w-full items-center justify-between rounded-lg bg-white px-3 py-2">
          <span className="flex min-w-0 items-center gap-2">
            <Icon name="wallet" className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate text-xs font-semibold">{upi}</span>
          </span>
          <button
            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-primary transition-colors hover:text-primary-container active:scale-95"
            onClick={copyUpi}
            type="button"
          >
            <Icon name="copy" className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold uppercase text-outline">Quick Contribution</span>
        <div className="grid grid-cols-1 gap-2">
          {tiers.map((tier) => (
            <button
              className={`flex items-center justify-between rounded-lg p-3 transition-all active:scale-[0.99] ${tier.popular ? "bg-secondary-container/50 hover:bg-secondary-container" : "bg-surface-low hover:bg-surface-container"}`}
              key={tier.amount}
              onClick={() => selectTier(tier.amount)}
              type="button"
            >
              <span className="flex items-center gap-2.5">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[15px] ${tier.popular ? "bg-white" : "bg-surface-high"}`}>{tier.emoji}</span>
                <span className="flex flex-col text-left">
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-medium leading-snug">₹{tier.amount}</span>
                    {tier.popular && (
                      <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">Popular</span>
                    )}
                  </span>
                  <span className="text-[10px] font-semibold text-outline">{tier.label}</span>
                </span>
              </span>
              <Icon name="arrow" className={`h-[18px] w-[18px] ${tier.popular ? "text-primary" : "text-outline"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <label className="text-[10px] font-semibold uppercase text-outline" htmlFor="custom-amount">Custom Amount</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-medium">₹</span>
            <input
              className="w-full rounded-lg bg-surface-low py-2.5 pl-8 pr-3 text-sm outline-none transition-all placeholder:text-outline focus:bg-white focus:ring-1 focus:ring-primary"
              id="custom-amount"
              min="1"
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Enter custom amount"
              ref={amountInput}
              type="number"
              value={amount}
            />
          </div>
          <button
            className="flex h-11 items-center justify-center gap-1 rounded-lg bg-primary px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-container active:scale-95"
            onClick={contribute}
            type="button"
          >
            Contribute
            <Icon name="heart" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-surface-container p-2.5 text-outline">
        <Icon name="check" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
        <p className="text-[13px] leading-snug">
          100% of contributions go directly toward AWS server hosting, domain renewals, and keeping TabTally free for everyone.
        </p>
      </div>
    </section>
  );
}
