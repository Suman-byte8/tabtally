"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import InviteView from "./InviteView";
import JoinView from "./JoinView";

const tabs = [
  { key: "invite", label: "Invite Table (QR & Link)" },
  { key: "join", label: "Join with Code / Scan" },
];

export default function JoinPage() {
  const [tab, setTab] = useState("invite");
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  function showToast(message) {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(null), 2400);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-3 px-4 pb-28 pt-5">
        <section className="flex items-center justify-between rounded-2xl bg-surface-low p-3 opacity-85 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
            <div>
              <p className="text-xl font-medium tracking-tight">Burma Burma • Table #4</p>
              <p className="text-[13px] text-outline">Active group session • 5 items ordered</p>
            </div>
          </div>
          <span className="rounded-full bg-secondary-container px-2 py-1 text-xs font-semibold text-secondary">Active</span>
        </section>

        <section className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-col items-center px-3 pt-3">
            <span className="mb-3 h-1 w-10 rounded-full bg-surface-high" />
            <div className="mb-3 flex w-full items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-outline">Table Collaboration</p>
                <h1 className="text-2xl font-semibold tracking-tight">Connect to Table</h1>
              </div>
              <Link
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-high text-outline transition-colors hover:bg-surface-container"
                href="/"
              >
                <Icon name="close" className="h-5 w-5" />
              </Link>
            </div>
            <div className="mb-5 flex w-full items-center rounded-xl bg-surface-high p-1" role="tablist">
              {tabs.map((item) => (
                <button
                  aria-selected={tab === item.key}
                  className={`flex-1 rounded-lg py-2 text-center text-xs font-medium transition-all ${tab === item.key ? "bg-white shadow-sm" : "text-outline hover:text-foreground"}`}
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  role="tab"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "invite" ? <InviteView showToast={showToast} /> : <JoinView showToast={showToast} />}

          <div className="flex items-center justify-center gap-2 bg-surface-low px-3 py-2 text-center text-outline">
            <Icon name="check" className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-[10px] font-semibold">Protected with TabTally Fair-Split Engine • Exact GST &amp; Tip math</span>
          </div>
        </section>
      </main>

      <div
        aria-live="polite"
        className={`fixed inset-x-6 bottom-24 z-50 mx-auto flex max-w-sm items-center justify-between gap-2 rounded-xl bg-foreground px-4 py-2.5 text-white shadow-xl transition-opacity duration-200 ${toast ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className="flex items-center gap-2">
          <Icon name="check" className="h-[18px] w-[18px] text-secondary-container" />
          <span className="text-[13px] font-medium">{toast}</span>
        </span>
        <span className="text-[10px] font-semibold text-outline-variant">Ready to paste</span>
      </div>

      <BottomNavigation activePage="home" />
    </div>
  );
}
