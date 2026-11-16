"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../home/Icon";
import Toggle from "./Toggle";

const taxEngines = [
  {
    key: "proportional",
    label: "Proportional Split",
    recommended: true,
    description: "Taxes & tips are weighted strictly by the cost of food ordered by each diner. Zero cross-subsidies.",
  },
  {
    key: "equal",
    label: "Equal Tax Division",
    description: "Total GST and service fee divided identically by head count regardless of individual item totals.",
  },
];

const pushToggles = [
  { label: "New Dish Added to Active Tab", description: "Alert when tablemate appends food or beverages" },
  { label: "Bill Ready for Final Review", description: "When host confirms OCR receipt scan" },
  { label: "Payment & Transfer Receipts", description: "Real-time notification when a diner settles via UPI" },
];

const whatsappToggles = [
  { label: "Neat Itemized PDF Summaries", description: "Send beautiful receipt digest to personal WhatsApp upon settlement" },
  { label: "Polite Settlement Nudges", description: "Automated respectful ping for unpaid shares after 24 hours" },
  { label: "Table Invite Dispatch", description: "Quick share QR code & join link to recent dining contacts" },
];

function SectionHeading({ title, description }) {
  return (
    <div className="px-1">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="text-[13px] text-outline">{description}</p>
    </div>
  );
}

function ActionRow({ icon, title, description, action, onClick, muted }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-low ${muted ? "text-outline" : "text-primary"}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-[13px] text-outline">{description}</p>
        </div>
      </div>
      <button
        className={`shrink-0 rounded-lg bg-surface-low px-3 py-1.5 text-xs font-semibold transition-all hover:bg-surface-container active:scale-95 ${muted ? "text-outline hover:text-foreground" : ""}`}
        onClick={onClick}
        type="button"
      >
        {action}
      </button>
    </div>
  );
}

export default function SettingsSections({ showToast }) {
  const [engine, setEngine] = useState("proportional");

  return (
    <>
      <section className="space-y-2">
        <SectionHeading description="Your default math algorithms and dining presence" title="Dining & Splitting Rules" />
        <div className="space-y-3 rounded-xl bg-white p-3 shadow-sm">
          <fieldset>
            <legend className="mb-1 text-sm font-medium">Default Tax &amp; Service Charge Algorithm</legend>
            <div className="space-y-1">
              {taxEngines.map((option) => (
                <label
                  className={`flex cursor-pointer items-start gap-2 rounded-xl p-2 transition-colors ${engine === option.key ? "bg-surface-low" : "hover:bg-surface-low"}`}
                  key={option.key}
                >
                  <input
                    checked={engine === option.key}
                    className="mt-1 h-4 w-4 accent-primary"
                    name="tax-engine"
                    onChange={() => setEngine(option.key)}
                    type="radio"
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1">
                      <span className={`text-sm ${engine === option.key ? "font-semibold" : "font-medium"}`}>{option.label}</span>
                      {option.recommended && <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white">Recommended</span>}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-outline">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-low p-2">
              <span className="text-[10px] font-semibold uppercase text-outline">Base Currency</span>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm font-semibold">Indian Rupee (₹ INR)</span>
                <Icon name="lock" className="h-[18px] w-[18px] text-outline" />
              </div>
            </div>
            <div className="rounded-xl bg-surface-low p-2">
              <span className="text-[10px] font-semibold uppercase text-outline">Dietary Badge in Sessions</span>
              <div className="mt-1 flex items-center justify-between">
                <span className="truncate text-sm font-semibold">Non-Vegetarian</span>
                <button className="text-xs font-semibold text-primary hover:underline" onClick={() => showToast("Dietary badge editing coming soon")} type="button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <SectionHeading description="Keep the table updated without notification spam" title="Notification Controls" />
        <div className="space-y-3 rounded-xl bg-white p-3 shadow-sm">
          <h3 className="flex items-center gap-1 pb-1 text-sm font-semibold">
            <Icon name="notifications" className="h-5 w-5 text-primary" />
            Table Activity (Push)
          </h3>
          {pushToggles.map((item) => <Toggle description={item.description} key={item.label} label={item.label} />)}
        </div>
        <div className="space-y-3 rounded-xl bg-white p-3 shadow-sm">
          <h3 className="flex items-center gap-1 pb-1 text-sm font-semibold">
            <Icon name="send" className="h-5 w-5 text-primary" />
            WhatsApp Integrations
          </h3>
          {whatsappToggles.map((item) => <Toggle description={item.description} key={item.label} label={item.label} />)}
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm">
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-sm font-medium">
              Critical Security &amp; OTPs (SMS)
              <Icon name="lock" className="h-3.5 w-3.5 text-outline" />
            </p>
            <p className="text-[13px] text-outline">Mandatory two-factor authentications</p>
          </div>
          <span className="shrink-0 rounded bg-secondary-container px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">Always On</span>
        </div>
      </section>

      <section className="space-y-2">
        <SectionHeading description="Device biometric locks and statement exports" title="Security & Data" />
        <div className="space-y-3 rounded-xl bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-low text-primary">
              <Icon name="lock" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <Toggle description="Require Face ID / Fingerprint to approve settlements" label="Biometric App Lock" />
            </div>
          </div>
          <ActionRow
            action="Export"
            description="Generate CSV & tax breakdown reports"
            icon="receipt"
            onClick={() => showToast("Expense statement export started")}
            title="Export Expense Statements"
          />
          <ActionRow
            action="Clear"
            description="Frees 18.4 MB of local bill image cache"
            icon="close"
            muted
            onClick={() => showToast("Cached feasts cleared")}
            title="Clear Cached Feasts"
          />
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-3 shadow-sm">
        <Link className="group flex items-center justify-between" href="/developer">
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-container/60 text-lg">☕</span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold transition-colors group-hover:text-primary">Buy Arjun a Filter Coffee ☕</span>
              <span className="block text-[13px] text-outline">TabTally is proudly crafted indie software from Bangalore</span>
            </span>
          </span>
          <Icon name="chevron" className="h-5 w-5 -rotate-90 text-outline transition-colors group-hover:text-primary" />
        </Link>
        <div className="flex flex-col items-center justify-center space-y-1 pt-1 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-outline">TabTally • Fair-Split Engine v1.4.2 (Build 204)</p>
          <p className="text-[10px] font-semibold text-outline">Crafted with precision for communal tables across India</p>
        </div>
        <button
          className="flex w-full items-center justify-center gap-1 rounded-xl bg-error-container/30 py-2.5 text-sm font-semibold text-error transition-all hover:bg-error-container/60 active:scale-[0.99]"
          onClick={() => showToast("Signed out (demo)")}
          type="button"
        >
          <Icon name="logout" className="h-[18px] w-[18px]" />
          Log Out of TabTally
        </button>
      </section>
    </>
  );
}
