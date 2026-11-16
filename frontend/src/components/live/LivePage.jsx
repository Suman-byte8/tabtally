"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import { diners, formatCurrency, initialItems, itemTotal, shareOf } from "./liveData";
import OrderItemCard from "./OrderItemCard";
import QuickOrderForm from "./QuickOrderForm";

const YOU = "Suman";

export default function LivePage() {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [newestFirst, setNewestFirst] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + itemTotal(item), 0);
  const portions = items.reduce((sum, item) => sum + item.qty, 0);
  const shares = diners.map((diner) => ({ ...diner, amount: items.reduce((sum, item) => sum + shareOf(item, diner.name), 0) }));
  const balanced = Math.abs(shares.reduce((sum, diner) => sum + diner.amount, 0) - subtotal) < 0.01;
  const myTotal = shares.find((diner) => diner.name === YOU)?.amount || 0;
  const sharedCount = items.filter((item) => item.assigned.length > 1).length;
  const editingItem = items.find((item) => item.id === editingId);

  const filters = [
    { key: "all", label: `All Items (${items.length})` },
    { key: "mine", label: `My Orders (${formatCurrency(Math.round(myTotal))})` },
    { key: "shared", label: `Shared (${sharedCount})` },
    { key: "individual", label: `Individual (${items.length - sharedCount})` },
  ];

  const visible = items
    .filter((item) => {
      if (filter === "mine") return item.assigned.includes(YOU);
      if (filter === "shared") return item.assigned.length > 1;
      if (filter === "individual") return item.assigned.length === 1;
      return true;
    })
    .sort((a, b) => (newestFirst ? b.id - a.id : a.id - b.id));

  function saveItem(data) {
    if (editingItem) {
      setItems((current) => current.map((item) => (item.id === editingItem.id ? { ...item, ...data, detail: item.name === data.name ? item.detail : undefined } : item)));
      setEditingId(null);
    } else {
      setItems((current) => [...current, { ...data, id: Math.max(0, ...current.map((item) => item.id)) + 1 }]);
    }
  }

  function startEdit(id) {
    setEditingId(id);
    document.getElementById("quick-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-3 px-4 pb-44 pt-5">
        <section>
          <div className="flex items-center justify-between gap-1">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live Tab Active
            </span>
            <span className="rounded-full bg-surface-container px-2 py-0.5 text-[10px] font-medium text-outline">Table #4</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Burma Burma</h1>
            <span className="text-xs text-outline">{diners.length} Diners</span>
          </div>
          <p className="mt-0.5 text-[13px] text-outline">{diners.map((diner) => diner.label || diner.name).join(", ")}</p>
        </section>

        <section className="relative overflow-hidden rounded-xl bg-white shadow-sm">
          <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
          <div className="flex items-start justify-between p-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-outline">Estimated Subtotal</span>
              <p className="mt-0.5 flex items-baseline gap-1">
                <span className="text-[28px] font-semibold tracking-tight">{formatCurrency(subtotal)}</span>
                <span className="text-[10px] font-semibold text-outline">pre-tax</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-lg bg-secondary-container/50 px-2 py-1 text-xs font-medium text-primary">
              <Icon name="restaurant" className="h-[15px] w-[15px]" />
              {portions} Items Ordered
            </span>
          </div>
          <div className="rounded-b-xl bg-surface-low/70 p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-outline">Live Share Breakdown</span>
              <span className={`text-[10px] font-semibold ${balanced ? "text-primary" : "text-error"}`}>{balanced ? "Tally Balanced" : "Unassigned items"}</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1">
              {shares.map((diner) => (
                <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 shadow-sm" key={diner.name}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${diner.you ? "bg-secondary-container text-secondary" : "bg-surface-high text-outline"}`}>
                    {diner.short}
                  </span>
                  <span className="flex flex-col">
                    <span className={`text-[10px] leading-tight text-outline ${diner.you ? "font-medium" : ""}`}>{diner.label || diner.name}</span>
                    <span className={`text-[13px] font-semibold leading-tight ${diner.you ? "text-primary" : ""}`}>{formatCurrency(Math.round(diner.amount))}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QuickOrderForm editing={editingItem} key={editingId ?? "new"} onCancelEdit={() => setEditingId(null)} onSubmit={saveItem} />

        <section className="pt-2">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-semibold tracking-tight">Order Registry</h2>
              <span className="rounded-full bg-surface-container px-2 py-0.5 text-[10px] font-medium text-outline">{items.length} Items</span>
            </div>
            <button
              className="flex items-center gap-0.5 text-[10px] font-semibold text-primary"
              onClick={() => setNewestFirst((value) => !value)}
              type="button"
            >
              <Icon name="history" className="h-4 w-4" />
              {newestFirst ? "Newest First" : "Timeline"}
            </button>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Order filters">
            {filters.map((item) => (
              <button
                aria-selected={filter === item.key}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] ${filter === item.key ? "bg-foreground font-semibold text-white" : "bg-white font-medium text-outline shadow-sm hover:text-foreground"}`}
                key={item.key}
                onClick={() => setFilter(item.key)}
                role="tab"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          {visible.map((item) => (
            <OrderItemCard
              editing={item.id === editingId}
              item={item}
              key={item.id}
              onEdit={() => startEdit(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
          {visible.length === 0 && (
            <p className="rounded-xl bg-white p-6 text-center text-[13px] text-outline shadow-sm">No items in this view yet.</p>
          )}
        </section>
      </main>

      <aside className="fixed inset-x-0 bottom-16 z-20 bg-surface/95 px-4 py-2.5 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold text-outline">Current Subtotal</span>
            <p className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold tracking-tight">{formatCurrency(subtotal)}</span>
              <span className="text-[10px] font-semibold text-primary">({portions} items)</span>
            </p>
          </div>
          <Link
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-xs font-semibold text-white shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
            href="/bill"
          >
            Proceed to Bill &amp; Taxes
            <Icon name="arrow" className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </aside>

      <BottomNavigation activePage="live" />
    </div>
  );
}
