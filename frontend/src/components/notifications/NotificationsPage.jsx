"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import NotificationCard from "./NotificationCard";
import ReceiptDialog from "./ReceiptDialog";

const initialNotifications = [
  { id: "rahul-paid", group: "Today", category: "payments", unread: true, type: "payment" },
  { id: "priya-added", group: "Today", category: "table", unread: true, type: "dish" },
  { id: "amit-pending", group: "Today", category: "nudges", unread: true, type: "nudge" },
  { id: "ocr-verified", group: "Yesterday", category: "table", unread: false, type: "ocr" },
  { id: "rohan-joined", group: "Yesterday", category: "table", unread: false, type: "joined" },
  { id: "october-statement", group: "Earlier This Week", category: "payments", unread: false, type: "statement" },
];

const groupNotes = {
  Today: null,
  Yesterday: "Burma Burma Feast",
  "Earlier This Week": "Monthly Summary",
};

const filters = [
  { key: "all", label: "All", count: 6 },
  { key: "payments", label: "Payments & UPI", dot: true },
  { key: "table", label: "Table Activity", count: 2 },
  { key: "nudges", label: "Reminders" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [toastOpen, setToastOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const timer = useRef(null);

  const unreadCount = items.filter((item) => item.unread).length;
  const visible = items.filter((item) => filter === "all" || item.category === filter);
  const groups = Object.keys(groupNotes)
    .map((group) => ({ group, items: visible.filter((item) => item.group === group) }))
    .filter((entry) => entry.items.length > 0);

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
    clearTimeout(timer.current);
    setToastOpen(true);
    timer.current = setTimeout(() => setToastOpen(false), 3200);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />

      <div
        aria-live="polite"
        className={`fixed inset-x-4 top-20 z-50 mx-auto flex max-w-md items-center justify-between rounded-xl bg-foreground px-3 py-2 text-white shadow-xl transition-all duration-300 ${toastOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-12 opacity-0"}`}
      >
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <Icon name="check" className="h-5 w-5 text-secondary-container" />
          All notifications marked as read
        </span>
        <button aria-label="Dismiss" className="p-1 text-white/80 hover:text-white" onClick={() => setToastOpen(false)} type="button">
          <Icon name="close" className="h-[18px] w-[18px]" />
        </button>
      </div>

      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pb-28 pt-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
              <span
                className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${unreadCount ? "bg-secondary-container text-secondary" : "bg-surface-container text-outline"}`}
              >
                {unreadCount} New
              </span>
            </div>
            <p className="mt-0.5 text-[13px] text-outline">Table alerts, UPI transfers &amp; dining nudges</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 pt-1">
            <button
              className="flex h-9 items-center gap-1.5 rounded-lg bg-surface-container px-2.5 transition-all hover:bg-surface-high active:scale-95"
              onClick={markAllRead}
              title="Mark all as read"
              type="button"
            >
              <Icon name="check" className="h-[18px] w-[18px] text-primary" />
              <span className="text-xs font-medium">Read all</span>
            </button>
            <Link
              aria-label="Alert preferences"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container text-outline transition-all hover:bg-surface-high active:scale-95"
              href="/profile"
            >
              <Icon name="user" className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Notification categories">
          {filters.map((item) => {
            const active = filter === item.key;
            return (
              <button
                aria-selected={active}
                className={`flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium transition-all ${active ? "bg-foreground text-white shadow-sm" : "bg-surface-low text-outline hover:bg-surface-container"}`}
                key={item.key}
                onClick={() => setFilter(item.key)}
                role="tab"
                type="button"
              >
                {item.label}
                {item.count && (
                  <span className={`rounded-full px-1.5 text-[11px] leading-tight ${active ? "bg-white/20" : "bg-surface-high"}`}>{item.count}</span>
                )}
                {item.dot && <span className="h-2 w-2 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>

        {groups.length > 0 ? (
          <div className="flex flex-col gap-5">
            {groups.map(({ group, items: groupItems }) => (
              <section className="flex flex-col gap-2" key={group}>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-outline">{group}</span>
                  <span className={`text-[10px] font-semibold ${groupNotes[group] ? "text-outline" : "text-primary"}`}>
                    {groupNotes[group] || `${groupItems.length} updates`}
                  </span>
                </div>
                {groupItems.map((item) => (
                  <NotificationCard item={item} key={item.id} onViewReceipt={() => setReceiptOpen(true)} />
                ))}
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-12 text-center">
            <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-surface-high text-outline">
              <Icon name="notifications" className="h-8 w-8" />
            </span>
            <h2 className="text-xl font-semibold">All caught up here</h2>
            <p className="mt-1 max-w-xs text-[13px] text-outline">
              No active notifications match this category. Live table activities and payment confirmations appear here in real-time.
            </p>
            <button
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-all active:scale-95"
              onClick={() => setFilter("all")}
              type="button"
            >
              Show All Feeds
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 px-4 py-2 text-center text-outline">
          <Icon name="history" className="h-4 w-4 shrink-0" />
          <p className="text-[10px] font-semibold">Notifications older than 30 days are automatically archived in Dining Statements.</p>
        </div>

        <aside className="flex items-center justify-between gap-2 rounded-2xl bg-gradient-to-br from-surface-low to-surface-container p-3 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
              <Icon name="notifications" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Customise alert nudges</p>
              <p className="truncate text-[13px] text-outline">Configure WhatsApp, SMS &amp; UPI tones</p>
            </div>
          </div>
          <Link
            aria-label="Open notification settings"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-surface-low active:scale-95"
            href="/profile"
          >
            <Icon name="chevron" className="h-[18px] w-[18px] -rotate-90" />
          </Link>
        </aside>
      </main>

      <ReceiptDialog onClose={() => setReceiptOpen(false)} open={receiptOpen} />
      <BottomNavigation activePage="profile" />
    </div>
  );
}
