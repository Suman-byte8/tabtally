"use client";

import { useRef, useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import FormulaCard from "./FormulaCard";
import ParticipantLedger from "./ParticipantLedger";
import ShareSummaryCard from "./ShareSummaryCard";
import TransfersCard from "./TransfersCard";

export default function SplitPage() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  function showToast(message, success = true) {
    clearTimeout(timer.current);
    setToast({ message, success });
    timer.current = setTimeout(() => setToast(null), 2400);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5">
        <section>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-2.5 py-0.5 uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Ready for settlement
            </span>
            <span className="text-outline">•</span>
            <span className="text-outline">2 of 4 settled</span>
          </div>
          <div className="mt-2 flex items-start justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Final Settlement &amp; Transfers</h1>
              <p className="mt-0.5 text-sm text-outline">Burma Burma, Indiranagar • Total ₹3,265 • 5 Diners</p>
            </div>
            <span
              aria-label="Bill audited"
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container text-outline"
              role="img"
            >
              <Icon name="check" className="h-[18px] w-[18px]" />
            </span>
          </div>
        </section>

        <FormulaCard />
        <ParticipantLedger />
        <TransfersCard showToast={showToast} />
        <ShareSummaryCard showToast={showToast} />
      </main>

      <div
        aria-live="polite"
        className={`fixed inset-x-4 bottom-20 z-40 mx-auto flex max-w-sm items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-white shadow-xl transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}
      >
        <Icon name="check" className={`h-5 w-5 ${toast?.success === false ? "text-outline-variant" : "text-secondary-container"}`} />
        <span className="flex-1 text-sm font-medium">{toast?.message}</span>
      </div>

      <BottomNavigation activePage="split" />
    </div>
  );
}
