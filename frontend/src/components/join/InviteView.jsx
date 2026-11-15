"use client";

import { useState } from "react";
import Icon from "../home/Icon";

const JOIN_URL = "https://tabtally.app/join/TAB-8821";
const whatsappText = `Hey! Join our table at Burma Burma on TabTally to order together & split fairly: ${JOIN_URL}`;

const diners = [
  { name: "Suman (Host)", initial: "S", avatar: "bg-primary text-white", mark: "star" },
  { name: "Rahul", initial: "R", avatar: "bg-secondary-container text-secondary", mark: "check" },
  { name: "Priya", initial: "P", avatar: "bg-surface-container", mark: "check" },
  { name: "Amit", initial: "A", avatar: "bg-secondary-container text-secondary" },
  { name: "Rohan", initial: "R", avatar: "bg-surface-high text-outline" },
];

const qrCells = [
  [56, 12, 8, 8], [72, 12, 16, 8], [96, 12, 8, 8], [56, 28, 16, 8], [80, 28, 8, 8], [96, 28, 8, 16],
  [56, 44, 8, 16], [72, 44, 16, 8], [12, 56, 8, 16], [28, 56, 16, 8], [112, 56, 16, 8], [136, 56, 16, 8],
  [12, 80, 16, 8], [36, 80, 8, 16], [112, 80, 8, 16], [128, 80, 24, 8], [12, 96, 8, 8], [28, 96, 16, 8],
  [120, 96, 16, 8], [56, 112, 16, 8], [80, 112, 8, 8], [96, 112, 16, 8], [56, 128, 8, 16], [72, 128, 16, 8],
  [96, 128, 8, 8], [112, 128, 16, 16], [56, 144, 24, 8], [88, 144, 8, 8], [136, 136, 16, 16],
];
const qrTargets = [[8, 8], [112, 8], [8, 112]];

export default function InviteView({ showToast }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard?.writeText("TAB-8821").catch(() => {});
    showToast("Code #TAB-8821 copied!");
  }

  function copyLink() {
    navigator.clipboard?.writeText(JOIN_URL).catch(() => {});
    setCopied(true);
    showToast("Table invite link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  function share() {
    if (navigator.share) {
      navigator.share({
        title: "Join Table #4 at Burma Burma",
        text: "Join our table on TabTally to order together and split the bill fairly!",
        url: JOIN_URL,
      }).catch(() => {});
    } else {
      copyLink();
    }
  }

  return (
    <div className="flex flex-col px-3 pb-5">
      <div className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-surface-low p-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-container text-secondary">
            <Icon name="restaurant" className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Burma Burma • Indiranagar</p>
            <p className="text-[10px] font-semibold text-outline">Table #4 • 12% GST Included</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2 py-1 shadow-sm">
          <span className="text-lg font-bold text-primary">#TAB-8821</span>
          <button aria-label="Copy session code" className="text-outline transition-colors hover:text-primary" onClick={copyCode} type="button">
            <Icon name="copy" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-3 flex flex-col items-center overflow-hidden rounded-2xl bg-surface-low p-3 text-center shadow-sm">
        <div className="mb-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md">
          <div className="flex -space-x-2">
            {["S", "R", "P", "+2"].map((initial, index) => (
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ring-2 ring-white ${["bg-secondary-container text-primary", "bg-secondary-container text-secondary", "bg-surface-container", "bg-surface-high text-outline"][index]}`}
                key={initial + index}
              >
                {initial}
              </span>
            ))}
          </div>
          <span className="ml-1 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-[10px] font-semibold">5 diners connected</span>
        </div>

        <div className="relative mb-3 flex h-56 w-56 items-center justify-center rounded-2xl bg-white p-3 shadow-md">
          <svg aria-label="Table QR code" className="h-full w-full text-foreground" fill="currentColor" role="img" viewBox="0 0 160 160">
            {qrTargets.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect fill="none" height="40" rx="6" stroke="currentColor" strokeWidth="8" width="40" x={x} y={y} />
                <rect height="16" rx="3" width="16" x={x + 12} y={y + 12} />
              </g>
            ))}
            {qrCells.map(([x, y, width, height]) => (
              <rect height={height} key={`${x}-${y}`} rx="1.5" width={width} x={x} y={y} />
            ))}
          </svg>
          <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-md">
            <span className="flex h-full w-full items-center justify-center rounded-lg bg-primary text-white">
              <Icon name="restaurant" className="h-5 w-5" />
            </span>
          </span>
        </div>

        <p className="mb-1 flex items-center gap-1 text-xs font-semibold">
          <Icon name="qr" className="h-[18px] w-[18px] text-primary" />
          Point camera or Google Lens to join
        </p>
        <p className="max-w-[280px] text-[13px] text-outline">
          No app download or sign-up needed. Diners open instantly in their mobile browser.
        </p>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-surface-high p-2">
        <span className="flex min-w-0 flex-1 items-center gap-1">
          <Icon name="link" className="h-[18px] w-[18px] shrink-0 text-outline" />
          <span className="select-all truncate text-[13px]">tabtally.app/join/TAB-8821</span>
        </span>
        <button
          className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-all hover:bg-surface-container"
          onClick={copyLink}
          type="button"
        >
          <Icon name="copy" className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-medium text-white shadow-sm transition-transform hover:bg-primary-container active:scale-[0.98]"
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon name="send" className="h-5 w-5" />
          Share via WhatsApp
        </a>
        <button
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-surface-high text-xs font-medium transition-colors hover:bg-surface-container"
          onClick={share}
          type="button"
        >
          <Icon name="share" className="h-[18px] w-[18px]" />
          Share Sheet / AirDrop
        </button>
      </div>

      <div className="rounded-xl bg-surface-low p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold">Connected Diners (5)</span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Syncing Live
          </span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {diners.map((diner) => (
            <li className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-sm" key={diner.name}>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${diner.avatar}`}>{diner.initial}</span>
              <span className="text-xs font-medium">{diner.name}</span>
              {diner.mark === "star" && <span className="text-[12px] text-primary">★</span>}
              {diner.mark === "check" && <Icon name="check" className="h-3.5 w-3.5 text-primary" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
