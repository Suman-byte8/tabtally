"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const summaryText = "🧾 *TabTally Bill Split — Burma Burma*\nTotal Bill: ₹3,265 (Paid by Suman ₹2,000 & Priya ₹1,265)\n\nTransfers:\n• Rahul 👉 Suman: ₹706\n• Amit 👉 Suman: ₹645\n• Rohan 👉 Priya: ₹640\n\nView full itemised breakdown: https://tabtally.app/s/TAB-8821";

export default function ShareSummaryCard({ showToast }) {
  const [copied, setCopied] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function copySummary() {
    navigator.clipboard?.writeText(summaryText).catch(() => {});
    setCopied(true);
    showToast("Summary copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadPdf() {
    showToast("Generating official tax receipt PDF...");
    setTimeout(() => showToast("Burma_Burma_Settlement.pdf downloaded ✓"), 1200);
  }

  function confirmClose() {
    setConfirmOpen(false);
    showToast("Session locked and saved to History");
  }

  return (
    <section className="rounded-card bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon name="share" className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium tracking-tight">Share Summary</h2>
        </div>
        <span className="text-[10px] font-semibold text-outline">Ready to dispatch</span>
      </div>
      <div className="relative select-all rounded-xl bg-surface-low p-3 font-mono text-xs leading-relaxed text-outline">
        <p className="pr-16 font-semibold text-foreground">🧾 *TabTally Bill Split — Burma Burma*</p>
        <p>Total Bill: ₹3,265 (Paid by Suman ₹2,000 &amp; Priya ₹1,265)</p>
        <div className="my-1.5 space-y-0.5 text-foreground">
          <p>• Rahul 👉 Suman: ₹706</p>
          <p>• Amit 👉 Suman: ₹645</p>
          <p>• Rohan 👉 Priya: ₹640</p>
        </div>
        <p className="truncate text-primary">tabtally.app/s/TAB-8821</p>
        <button
          className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 font-sans text-[11px] font-medium text-foreground shadow-sm hover:bg-surface-container"
          onClick={copySummary}
          type="button"
        >
          <Icon name="copy" className="h-3.5 w-3.5" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <a
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(summaryText)}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon name="send" className="h-5 w-5" />
          Share on WhatsApp
        </a>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-surface-high text-[13px] font-medium transition-colors hover:bg-surface-container"
            onClick={downloadPdf}
            type="button"
          >
            <Icon name="receipt" className="h-[18px] w-[18px]" />
            Download PDF
          </button>
          <button
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-surface-high text-[13px] font-medium text-error transition-colors hover:bg-error-container"
            onClick={() => setConfirmOpen(true)}
            type="button"
          >
            <Icon name="lock" className="h-[18px] w-[18px]" />
            Close Session
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="close-session-title">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-primary">
              <Icon name="lock" className="h-6 w-6" />
            </span>
            <h3 className="text-xl font-semibold" id="close-session-title">Archive Tab?</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-outline">
              All calculated shares are reconciled. This will lock item edits and notify 3 unsettled diners.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="h-10 flex-1 rounded-xl bg-surface-high text-[13px] font-medium" onClick={() => setConfirmOpen(false)} type="button">
                Cancel
              </button>
              <button className="h-10 flex-1 rounded-xl bg-primary text-[13px] font-semibold text-white" onClick={confirmClose} type="button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
