"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../home/Icon";

function FlashButton({ idle, done, className, onClick }) {
  const [flashed, setFlashed] = useState(false);

  function handleClick() {
    onClick?.();
    setFlashed(true);
    setTimeout(() => setFlashed(false), 2200);
  }

  return (
    <button className={className} onClick={handleClick} type="button">
      {flashed ? done : idle}
    </button>
  );
}

function DownloadButton() {
  const [state, setState] = useState("idle");

  function download() {
    setState("saving");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 2000);
    }, 1200);
  }

  return (
    <button
      className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container px-3 py-1 text-xs font-semibold transition-all hover:bg-surface-high active:scale-95 disabled:opacity-70"
      disabled={state !== "idle"}
      onClick={download}
      type="button"
    >
      <Icon name={state === "done" ? "check" : "arrow"} className={`h-4 w-4 text-primary ${state === "idle" ? "rotate-90" : ""}`} />
      {state === "saving" ? "Saving..." : state === "done" ? "Downloaded" : "Download Statement"}
    </button>
  );
}

const nudgeText = "Hey Amit! Gentle reminder to settle ₹87.50 for our Burma Burma dinner on TabTally: https://tabtally.app/s/TAB-8821";

export default function NotificationCard({ item, onViewReceipt }) {
  const unreadDot = item.unread && (
    <span className="absolute right-4 top-4 h-2 w-2 animate-pulse rounded-full bg-primary ring-4 ring-secondary-container/60" />
  );

  if (item.type === "payment") {
    return (
      <article className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
        {unreadDot}
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary shadow-sm">
            <Icon name="check" className="h-[22px] w-[22px]" />
          </span>
          <div className="min-w-0 flex-1 pr-3">
            <p className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-sm font-semibold">Rahul</span>
              <span className="text-[13px]">settled</span>
              <span className="text-lg font-bold text-primary">₹157.50</span>
            </p>
            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[13px] text-outline">
              via PhonePe <span className="text-[10px]">•</span> Burma Burma #4 <span className="text-[10px]">•</span>
              <span className="font-medium">12m ago</span>
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-surface-low pt-2.5">
              <span className="flex items-center gap-1 rounded-full bg-secondary-container/70 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                <Icon name="check" className="h-3.5 w-3.5" />
                Auto-reconciled
              </span>
              <button
                className="flex items-center gap-0.5 text-xs font-semibold text-primary transition-transform hover:text-primary-container active:scale-95"
                onClick={onViewReceipt}
                type="button"
              >
                View Receipt
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "dish") {
    return (
      <article className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
        {unreadDot}
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
            <Icon name="restaurant" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1 pr-3">
            <p className="flex flex-wrap items-baseline gap-1">
              <span className="text-sm font-semibold">Priya</span>
              <span className="text-[13px] text-outline">added</span>
              <span className="text-sm font-semibold">2x Steamed Bao</span>
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-outline">
              Table #4 <span className="text-[10px]">•</span>
              <span className="font-medium text-foreground">Subtotal ₹3,265</span> <span className="text-[10px]">•</span> 28m ago
            </p>
            <Link
              className="mt-3 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-surface-high px-3 text-xs font-medium transition-all hover:bg-surface-container active:scale-95"
              href="/live"
            >
              <Icon name="restaurant" className="h-4 w-4 text-primary" />
              Review Live Tab
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "nudge") {
    return (
      <article className="relative overflow-hidden rounded-xl bg-surface-low p-3 shadow-sm transition-all hover:shadow-md">
        {unreadDot}
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-high text-tertiary">
            <Icon name="history" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2">
              <span className="text-sm font-semibold">Settlement Pending</span>
              <span className="text-lg font-bold text-error">₹87.50</span>
            </p>
            <p className="mt-1 text-[13px] leading-snug text-outline">
              From <strong className="font-semibold text-foreground">Amit</strong> for Burma Burma dinner (ended 45 mins ago). Fronted by you.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 pt-2">
              <FlashButton
                className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white px-2 text-xs font-medium shadow-sm transition-all active:scale-95"
                done={<><Icon name="check" className="h-4 w-4 text-primary" /> Sent!</>}
                idle={<><Icon name="send" className="h-4 w-4 text-primary" /> WhatsApp</>}
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(nudgeText)}`, "_blank", "noopener,noreferrer")}
              />
              <FlashButton
                className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-container active:scale-95"
                done={<><Icon name="check" className="h-4 w-4" /> Requested</>}
                idle={<><Icon name="notifications" className="h-4 w-4" /> UPI Request</>}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "ocr") {
    return (
      <article className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="receipt" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">OCR Receipt breakdown verified</h2>
              <span className="shrink-0 text-[10px] font-semibold text-outline">9:15 PM</span>
            </div>
            <p className="mt-1 text-[13px] leading-snug text-outline">
              12% GST &amp; 5% service charge proportionally distributed across 5 table members without roundoff loss.
            </p>
            <Link className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container" href="/bill">
              <Icon name="receipt" className="h-4 w-4" />
              View Tax Audit
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "joined") {
    return (
      <article className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-outline">
            <Icon name="qr" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">Rohan Verma</span>
                <span className="text-[13px] text-outline">joined</span>
              </p>
              <span className="shrink-0 text-[10px] font-semibold text-outline">8:48 PM</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-surface-container px-2 py-0.5 text-[10px] font-semibold text-outline">Scanned Table Standee</span>
              <span className="text-[13px] text-outline">Table #4</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-secondary">
          <Icon name="bar" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">October Dining Statement ready</h2>
            <span className="shrink-0 text-[10px] font-semibold text-outline">Wed</span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-outline">
            <span className="font-semibold text-foreground">₹6,530 settled</span> across 2 feasts (Toit Brewpub, Meghana Foods). You saved{" "}
            <span className="font-semibold text-primary">₹1,484</span> in equalised discounts.
          </p>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-surface-low pt-2.5">
            <span className="text-[10px] font-semibold text-outline">PDF &amp; CSV available</span>
            <DownloadButton />
          </div>
        </div>
      </div>
    </article>
  );
}
