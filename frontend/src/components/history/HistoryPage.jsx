"use client";

import { useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import HistoryCard from "./HistoryCard";
import PendingCard from "./PendingCard";

const months = [
  {
    label: "October 2024",
    summary: "2 Feasts • ₹6,530.00",
    feasts: [
      {
        name: "Toit Brewpub", meta: "Indiranagar • 12 Oct 2024, 9:30 PM", share: "₹1,220.00", total: "₹4,890.00",
        sideLabel: "Settlement Via", sideValue: "Fronted by Rahul", tags: ["4 Diners", "Beer & Pizzas"], action: "Receipt",
      },
      {
        name: "Meghana Foods", meta: "Koramangala • 04 Oct 2024, 1:15 PM", share: "₹546.00", total: "₹1,640.00",
        sideLabel: "Collected via UPI", sideValue: "+₹1,094.00", sideHighlight: true, tags: ["3 Diners"], hostedTag: "You Paid Full",
        hosted: true, action: "Breakdown",
      },
    ],
  },
  {
    label: "September 2024",
    summary: "2 Feasts • ₹8,240.00",
    feasts: [
      {
        name: "The Fatty Bao", meta: "Lavelle Road • 28 Sep 2024, 8:00 PM", share: "₹1,380.00", total: "₹7,420.00",
        promo: { label: "Zomato Gold 20% discount applied", saved: "-₹1,484 saved" },
        sideLabel: "Split Mode", sideValue: "Custom Mocktails", tags: ["6 Diners"], action: "View Receipt",
      },
      {
        name: "CTR (Shri Sagar)", meta: "Malleshwaram • 15 Sep 2024, 8:30 AM", share: "₹205.00", total: "₹820.00",
        sideLabel: "Settlement", sideValue: "Split Equal (4 ways)", tags: ["Benne Dosa Breakfast"], action: "View Breakdown",
      },
    ],
  },
];

const filters = [
  { key: "all", label: "All Feasts (14)" },
  { key: "pending", label: "Pending", count: 1 },
  { key: "settled", label: "Fully Settled (13)" },
  { key: "hosted", label: "You Hosted (8)" },
  { key: "october", label: "Oct 2024", calendar: true },
];

const metrics = [
  { label: "TOTAL SETTLED", value: "₹34,820", note: "14 feasts" },
  { label: "YOU HOSTED", value: "₹18,450", note: "fronted bills", accent: true },
];

function matches(text, query) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const showPending =
    ["all", "pending", "hosted", "october"].includes(filter) &&
    matches("Burma Burma Indiranagar Rahul Amit Priya Rohan", query);

  const visibleMonths = filter === "pending"
    ? []
    : months
        .filter((month) => filter !== "october" || month.label.startsWith("October"))
        .map((month) => ({
          ...month,
          feasts: month.feasts.filter(
            (feast) => (filter !== "hosted" || feast.hosted) && matches(`${feast.name} ${feast.meta} ${feast.tags.join(" ")}`, query),
          ),
        }))
        .filter((month) => month.feasts.length > 0);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-28 pt-5">
        <header className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Session History</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-1 text-[10px] font-semibold text-secondary">
              <Icon name="history" className="h-3.5 w-3.5" />
              14 Feasts
            </span>
          </div>
          <p className="text-[13px] text-outline">Past gatherings, itemized receipts &amp; communal settlements</p>
        </header>

        <section aria-label="Settlement overview" className="grid grid-cols-3 gap-2">
          {metrics.map((metric) => (
            <div className="flex flex-col justify-between rounded-xl bg-white p-3 shadow-sm" key={metric.label}>
              <span className="truncate text-[10px] font-semibold text-outline">{metric.label}</span>
              <div className="mt-2">
                <p className={`text-lg font-semibold tracking-tight ${metric.accent ? "text-primary" : ""}`}>{metric.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-outline">{metric.note}</p>
              </div>
            </div>
          ))}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-error-container/40 p-3 shadow-sm">
            <span className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-error-container/60" />
            <div className="flex items-center justify-between">
              <span className="truncate text-[10px] font-semibold text-error">PENDING</span>
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-error" />
            </div>
            <div className="mt-2">
              <p className="text-lg font-semibold tracking-tight text-error">₹245</p>
              <p className="mt-0.5 text-[10px] font-semibold text-error">1 to collect</p>
            </div>
          </div>
        </section>

        <section aria-label="Search and filter" className="flex flex-col gap-2">
          <div className="relative flex w-full items-center">
            <Icon name="search" className="pointer-events-none absolute left-3 h-5 w-5 text-outline" />
            <input
              aria-label="Search history"
              className="h-11 w-full rounded-xl bg-white pl-10 pr-9 text-[13px] shadow-sm outline-none transition-colors placeholder:text-outline focus:bg-surface-low"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by restaurant, companion or dish..."
              type="search"
              value={query}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="absolute right-2.5 flex h-6 w-6 items-center justify-center text-outline transition-colors hover:text-foreground"
                onClick={() => setQuery("")}
                type="button"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            )}
          </div>
          <div aria-label="Feast filters" className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 pb-1" role="tablist">
            {filters.map((item) => (
              <button
                aria-selected={filter === item.key}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium shadow-sm transition-transform active:scale-95 ${filter === item.key ? "bg-foreground text-white" : "bg-white hover:bg-surface-container"}`}
                key={item.key}
                onClick={() => setFilter(item.key)}
                role="tab"
                type="button"
              >
                {item.calendar && <Icon name="history" className="h-3.5 w-3.5 text-outline" />}
                {item.label}
                {item.count && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-error-container text-[10px] font-semibold text-error">{item.count}</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {showPending && <PendingCard />}

        {visibleMonths.map((month) => (
          <section aria-label={month.label} className="flex flex-col gap-2" key={month.label}>
            <div className="flex items-center justify-between px-0.5">
              <h3 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-outline">
                <span className="h-1.5 w-1.5 rounded-full bg-outline" />
                {month.label}
              </h3>
              <span className="text-[10px] font-semibold text-outline">{month.summary}</span>
            </div>
            {month.feasts.map((feast) => <HistoryCard feast={feast} key={feast.name} />)}
          </section>
        ))}

        {!showPending && visibleMonths.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-center text-[13px] text-outline shadow-sm">No feasts match your search.</p>
        )}

        <ExportCard />
      </main>
      <BottomNavigation activePage="history" />
    </div>
  );
}

function ExportCard() {
  const [status, setStatus] = useState("idle");

  function exportReport() {
    setStatus("generating");
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1200);
  }

  return (
    <section aria-label="Export" className="flex flex-col gap-2 pt-1">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-low p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container text-outline">
            <Icon name="receipt" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium">Dining Statement</p>
            <p className="text-[10px] font-semibold text-outline">Download verified CSV or itemized PDF</p>
          </div>
        </div>
        <button
          className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-white px-3 text-xs font-semibold text-primary shadow-sm transition-transform hover:bg-surface-container active:scale-95 disabled:opacity-70"
          disabled={status !== "idle"}
          onClick={exportReport}
          type="button"
        >
          {status === "generating" ? "Generating..." : status === "done" ? "Downloaded" : "Export"}
          <Icon name={status === "done" ? "check" : "arrow"} className={`h-4 w-4 ${status === "idle" ? "rotate-90" : ""}`} />
        </button>
      </div>
      <p className="pt-2 text-center text-[10px] font-semibold text-outline-variant">TabTally • End-to-end fair communal tally for diners</p>
    </section>
  );
}
