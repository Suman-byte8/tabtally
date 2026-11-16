"use client";

import { useRef, useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import SettingsSections from "./SettingsSections";
import Toggle from "./Toggle";

const VPA = "suman.patel@okhdfcbank";

const stats = [
  { value: "14", label: "Feasts Joined" },
  { value: "₹34,820", label: "Settled Fairly", accent: true },
  { value: "100%", label: "On-Time Settler", accent: true, verified: true },
];

export default function ProfilePage() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  function showToast(message) {
    clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(null), 2000);
  }

  function copyVpa() {
    navigator.clipboard?.writeText(VPA).catch(() => {});
    showToast("UPI VPA copied to clipboard");
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5">
        <section className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm">
          <span className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary-container/40 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <span className="relative shrink-0">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-container text-2xl font-semibold text-primary shadow-sm">SR</span>
              <button
                aria-label="Update profile photo"
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform active:scale-95"
                onClick={() => showToast("Photo upload coming soon")}
                type="button"
              >
                <Icon name="add" className="h-4 w-4" />
              </button>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1">
                <h1 className="truncate text-xl font-semibold tracking-tight">Suman Rao</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-secondary">
                  <Icon name="check" className="h-3 w-3 text-primary" />
                  Host &amp; Diner
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-outline">@suman_rao • Bengaluru, India</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-semibold">
                <span className="inline-flex items-center gap-1 rounded-lg bg-surface-low px-2 py-0.5 text-primary">
                  <Icon name="lock" className="h-[13px] w-[13px]" />
                  +91 98765 43210
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-surface-low px-2 py-0.5 text-outline">
                  <Icon name="mail" className="h-[13px] w-[13px]" />
                  suman.rao@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-1 rounded-xl bg-surface-low p-2">
            {stats.map((stat, index) => (
              <div className={`flex flex-col items-center justify-center p-1 text-center ${index === 1 ? "border-x border-outline-variant/30" : ""}`} key={stat.label}>
                <span className={`inline-flex items-center gap-0.5 text-xl font-semibold tracking-tight ${stat.accent ? "text-primary" : ""}`}>
                  {stat.value}
                  {stat.verified && <Icon name="check" className="h-3.5 w-3.5" />}
                </span>
                <span className="mt-0.5 text-[10px] font-semibold leading-tight text-outline">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Payment &amp; Receiving</h2>
              <p className="text-[13px] text-outline">Where tablemates transfer their fair share</p>
            </div>
            <Icon name="wallet" className="h-[22px] w-[22px] text-primary" />
          </div>
          <div className="space-y-2 rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container text-lg font-bold text-primary">₹</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-semibold">{VPA}</span>
                    <span className="shrink-0 rounded bg-secondary-container px-1.5 py-0.5 text-[10px] font-medium text-primary">Default</span>
                  </div>
                  <p className="truncate text-xs text-outline">HDFC Bank Savings • Primary P2P VPA</p>
                </div>
              </div>
              <button aria-label="Copy UPI ID" className="shrink-0 rounded-lg p-2 text-outline transition-colors hover:text-primary" onClick={copyVpa} type="button">
                <Icon name="copy" className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-surface-low p-2 text-[13px] text-outline">
              <Icon name="info" className="h-[18px] w-[18px] shrink-0 text-primary" />
              Transfers from dining companions will default to this VPA directly into your bank.
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
              <button className="inline-flex items-center gap-1 font-semibold text-primary active:opacity-75" onClick={() => showToast("Secondary UPI ID coming soon")} type="button">
                <Icon name="add" className="h-4 w-4" />
                Add Secondary UPI ID
              </button>
              <button className="font-medium text-outline hover:text-foreground" onClick={() => showToast("Account management coming soon")} type="button">
                Manage Accounts
              </button>
            </div>
          </div>
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <Toggle description="Provides GPay, PhonePe & Paytm direct links in settlement chats" label="Auto-generate One-Click UPI Links" />
          </div>
        </section>

        <SettingsSections showToast={showToast} />
      </main>

      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs text-white shadow-lg transition-opacity duration-300 ${toast ? "opacity-100" : "opacity-0"}`}
      >
        <Icon name="check" className="h-4 w-4 text-secondary-container" />
        {toast}
      </div>

      <BottomNavigation activePage="profile" />
    </div>
  );
}
