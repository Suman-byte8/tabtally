"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";

const SESSION_CODE = "TAB-9042";

const moods = ["Casual Dinner", "Team Lunch", "Birthday", "Drinks", "Quick Bite"];
const tips = ["5%", "7%", "10%", "Custom"];
const companions = [
  { name: "Rahul V.", initials: "RV" },
  { name: "Priya S.", initials: "PS" },
  { name: "Amit K.", initials: "AK" },
  { name: "Rohan M.", initials: "RM" },
];

const engines = [
  {
    key: "proportional",
    label: "Proportional Tax & GST",
    recommended: true,
    description: "5% GST, service fee & promo discounts are weighted strictly by each diner's net item share. Zero unfair cross-subsidies.",
    perks: ["Drinkers pay alcohol VAT", "Scaled discounts"],
  },
  {
    key: "equal",
    label: "Equal Split on Shared Essentials",
    description: "Dishes are itemized, but cumulative taxes and gratuity are partitioned equally across active diners regardless of order total.",
  },
];

function Section({ icon, title, aside, children }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon name={icon} className="h-[18px] w-[18px]" />
          </span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export default function CreateSessionPage() {
  const router = useRouter();
  const [venue, setVenue] = useState("Toit Brewpub, Indiranagar");
  const [table, setTable] = useState("Table #4 (Rooftop)");
  const [mood, setMood] = useState(moods[0]);
  const [engine, setEngine] = useState("proportional");
  const [tipOn, setTipOn] = useState(true);
  const [tip, setTip] = useState("10%");
  const [selected, setSelected] = useState(["Priya S."]);
  const [whatsappInvite, setWhatsappInvite] = useState(true);
  const [showQr, setShowQr] = useState(true);
  const [codeCopied, setCodeCopied] = useState(false);

  function copyCode() {
    navigator.clipboard?.writeText(SESSION_CODE).catch(() => {});
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 800);
  }

  function toggleCompanion(name) {
    setSelected((current) => (current.includes(name) ? current.filter((item) => item !== name) : [...current, name]));
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 pb-28 pt-5">
        <section className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Live Table Setup
            </span>
            <button
              aria-label="Copy session code"
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors active:scale-95 ${codeCopied ? "bg-secondary-container" : "bg-surface-high hover:bg-surface-container"}`}
              onClick={copyCode}
              type="button"
            >
              <Icon name="tag" className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-tight">#{SESSION_CODE}</span>
              <Icon name={codeCopied ? "check" : "copy"} className="ml-0.5 h-[13px] w-[13px] text-outline" />
            </button>
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Start a Dining Tab</h1>
          <p className="text-sm leading-relaxed text-outline">
            Configure your table, lock in fair weighted tax rules, and effortlessly pool companions into this feast.
          </p>
        </section>

        <Section aside={<span className="text-[10px] font-semibold uppercase tracking-wider text-outline">Step 1 of 3</span>} icon="restaurant" title="Venue & Table">
          <label className="flex flex-col gap-1.5 text-xs text-outline" htmlFor="venue-name">
            Restaurant or Spot Name
            <span className="relative flex items-center">
              <Icon name="pin" className="pointer-events-none absolute left-3 h-[18px] w-[18px]" />
              <input
                className="h-11 w-full rounded-lg bg-surface-low pl-9 pr-3 text-sm text-foreground outline-none transition-all placeholder:text-outline focus:bg-white focus:ring-1 focus:ring-primary"
                id="venue-name"
                onChange={(event) => setVenue(event.target.value)}
                placeholder="e.g., Toit Brewpub, Indiranagar"
                type="text"
                value={venue}
              />
            </span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1.5 text-xs text-outline" htmlFor="table-num">
              Table / Booth
              <span className="relative flex items-center">
                <Icon name="grid" className="pointer-events-none absolute left-3 h-[18px] w-[18px]" />
                <input
                  className="h-11 w-full rounded-lg bg-surface-low pl-9 pr-2 text-sm text-foreground outline-none transition-all placeholder:text-outline focus:bg-white focus:ring-1 focus:ring-primary"
                  id="table-num"
                  onChange={(event) => setTable(event.target.value)}
                  placeholder="e.g., Table 4"
                  type="text"
                  value={table}
                />
              </span>
            </label>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-outline">When</span>
              <span className="flex h-11 items-center justify-between rounded-lg bg-surface-low px-3">
                <span className="flex min-w-0 items-center gap-1.5">
                  <Icon name="history" className="h-4 w-4 text-primary" />
                  <span className="truncate text-[13px] font-medium">Today, 8:30 PM</span>
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-xs text-outline">Gathering Mood</span>
            <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1">
              {moods.map((item) => (
                <button
                  aria-pressed={mood === item}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-all ${mood === item ? "bg-foreground text-white" : "bg-surface-high text-outline hover:bg-surface-container"}`}
                  key={item}
                  onClick={() => setMood(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section
          aside={
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-primary">
              <Icon name="check" className="h-3.5 w-3.5" /> Zero-Drama
            </span>
          }
          icon="calculate"
          title="Fair-Split Engine"
        >
          <div className="flex flex-col gap-2.5">
            {engines.map((option) => (
              <label
                className={`flex cursor-pointer flex-col rounded-xl p-3 transition-all ${engine === option.key ? "bg-surface-low" : "hover:bg-surface-low"}`}
                key={option.key}
              >
                <span className="flex items-center gap-2.5">
                  <input
                    checked={engine === option.key}
                    className="h-4 w-4 cursor-pointer accent-primary"
                    name="split-engine"
                    onChange={() => setEngine(option.key)}
                    type="radio"
                  />
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{option.label}</span>
                    {option.recommended && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Recommended</span>
                    )}
                  </span>
                </span>
                <span className="mt-1 pl-6 text-[13px] leading-normal text-outline">{option.description}</span>
                {option.perks && (
                  <span className="mt-2 flex flex-wrap items-center gap-3 pl-6 text-[10px] font-semibold text-outline">
                    {option.perks.map((perk) => (
                      <span className="flex items-center gap-1" key={perk}>
                        <Icon name="check" className="h-[13px] w-[13px] text-primary" />
                        {perk}
                      </span>
                    ))}
                  </span>
                )}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 rounded-xl bg-surface-low p-3">
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Icon name="heart" className="h-[18px] w-[18px] text-outline" />
                <span>
                  <span className="block text-xs font-medium">Discretionary Tip Offset</span>
                  <span className="block text-[10px] font-semibold text-outline">Distributed transparently on individual checkout</span>
                </span>
              </span>
              <span className="relative inline-flex shrink-0 items-center">
                <input checked={tipOn} className="peer sr-only" onChange={(event) => setTipOn(event.target.checked)} type="checkbox" />
                <span className="h-5 w-9 rounded-full bg-surface-high transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-4" />
              </span>
            </label>
            <div className={`flex items-center justify-between gap-1.5 pt-1 transition-opacity ${tipOn ? "" : "pointer-events-none opacity-35"}`}>
              {tips.map((item) => (
                <button
                  aria-pressed={tip === item}
                  className={`flex-1 rounded-lg py-1 text-center text-xs transition-all ${tip === item ? "bg-foreground font-semibold text-white" : "bg-surface-high hover:bg-surface-container"}`}
                  disabled={!tipOn}
                  key={item}
                  onClick={() => setTip(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section aside={<span className="text-[10px] font-semibold text-outline">{selected.length} Selected</span>} icon="user" title="Table Companions">
          <div className="flex items-center justify-between rounded-xl bg-secondary-container/60 p-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">SR</span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5">
                  <span className="truncate text-xs font-semibold">Suman Rao</span>
                  <span className="rounded bg-primary px-1.5 text-[9px] font-semibold uppercase tracking-wider text-white">Host</span>
                </p>
                <p className="truncate text-[10px] font-semibold text-secondary">suman.patel@okhdfcbank</p>
              </div>
            </div>
            <Icon name="lock" className="mr-1 h-[18px] w-[18px] text-primary" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-outline">Frequent Dining Circle</span>
              <button className="text-[10px] font-semibold text-primary" type="button">+ Add by Phone</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {companions.map((person) => {
                const isSelected = selected.includes(person.name);
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`flex items-center justify-between rounded-xl p-2 text-left transition-all ${isSelected ? "bg-secondary-container" : "bg-surface-low hover:bg-surface-container"}`}
                    key={person.name}
                    onClick={() => toggleCompanion(person.name)}
                    type="button"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${isSelected ? "bg-primary text-white" : "bg-surface-high text-outline"}`}>
                        {person.initials}
                      </span>
                      <span className={`truncate text-xs ${isSelected ? "font-medium" : ""}`}>{person.name}</span>
                    </span>
                    <Icon name={isSelected ? "check" : "add"} className={`h-4 w-4 ${isSelected ? "text-primary" : "text-outline"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {[
              { icon: "share", label: "WhatsApp Invite Dispatch", note: "Auto-generates instant table join link", checked: whatsappInvite, set: setWhatsappInvite },
              { icon: "qr", label: "Show Table QR Code", note: "Display on screen for rapid companions check-in", checked: showQr, set: setShowQr },
            ].map((option) => (
              <label className="flex cursor-pointer items-center justify-between rounded-xl bg-surface-low p-2.5" key={option.label}>
                <span className="flex items-center gap-2.5">
                  <Icon name={option.icon} className="h-[18px] w-[18px] text-primary" />
                  <span>
                    <span className="block text-xs font-medium">{option.label}</span>
                    <span className="block text-[10px] font-semibold text-outline">{option.note}</span>
                  </span>
                </span>
                <input
                  checked={option.checked}
                  className="h-4 w-4 cursor-pointer accent-primary"
                  onChange={(event) => option.set(event.target.checked)}
                  type="checkbox"
                />
              </label>
            ))}
          </div>
        </Section>

        <div className="flex flex-col gap-2 pt-2">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
            onClick={() => router.push("/live")}
            type="button"
          >
            Create Session &amp; Open Live Tab
            <Icon name="arrow" className="h-5 w-5" />
          </button>
          <p className="flex items-center justify-center gap-1.5 text-center text-[10px] font-semibold text-outline">
            <Icon name="lock" className="h-3.5 w-3.5" />
            No immediate payment required. Dine first, scan receipt later.
          </p>
        </div>
      </main>
      <BottomNavigation activePage="home" />
    </div>
  );
}
