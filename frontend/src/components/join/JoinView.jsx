"use client";

import { useRef, useState } from "react";
import Icon from "../home/Icon";

const initialCode = ["T", "A", "B", "", "", "", ""];

export default function JoinView({ showToast }) {
  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState("Kavita");
  const [whatsapp, setWhatsapp] = useState(true);
  const inputs = useRef([]);

  function updateCode(index, value) {
    const char = value.slice(-1).toUpperCase();
    setCode((current) => current.map((item, i) => (i === index ? char : item)));
    if (char && index < code.length - 1) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !code[index] && index > 0) inputs.current[index - 1]?.focus();
  }

  const initial = name.trim() ? name.trim()[0].toUpperCase() : "?";

  return (
    <div className="flex flex-col px-3 pb-5">
      <div className="mb-3">
        <h2 className="mb-1 text-xl font-medium tracking-tight">Joining a Friend&apos;s Table?</h2>
        <p className="text-[13px] text-outline">
          Enter the 6-character table code displayed on their screen or restaurant bill card.
        </p>
      </div>

      <button
        className="mb-5 flex w-full items-center justify-between rounded-xl bg-secondary-container p-3 text-secondary transition-opacity hover:opacity-95"
        onClick={() => showToast("Camera scanner requested")}
        type="button"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm">
            <Icon name="qr" className="h-[22px] w-[22px]" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold">Scan QR with Camera</span>
            <span className="block text-[10px] font-semibold opacity-90">Auto-detects any active TabTally table</span>
          </span>
        </span>
        <Icon name="arrow" className="h-5 w-5" />
      </button>

      <fieldset className="mb-5 flex flex-col">
        <legend className="mb-1 text-xs font-semibold">Table Session Code</legend>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {code.map((char, index) => (
            <span className="contents" key={index}>
              {index === 3 && <span className="text-lg font-bold text-outline">-</span>}
              <input
                aria-label={`Code character ${index + 1}`}
                className="h-13 w-10 rounded-xl bg-surface-low text-center text-lg font-bold uppercase outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary sm:w-12"
                maxLength={2}
                onChange={(event) => updateCode(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                placeholder={index > 2 ? "•" : undefined}
                ref={(el) => { inputs.current[index] = el; }}
                type="text"
                value={char}
              />
            </span>
          ))}
        </div>
      </fieldset>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-surface-low p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-lg font-bold text-primary shadow-sm">
            {initial}
          </span>
          <div className="flex-1">
            <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-outline" htmlFor="dining-name">
              Your Dining Name
            </label>
            <input
              className="w-full rounded-xl bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 focus:ring-primary"
              id="dining-name"
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Kavita, Nikhil"
              type="text"
              value={name}
            />
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-white p-2 shadow-sm">
          <input
            checked={whatsapp}
            className="mt-1 h-4 w-4 cursor-pointer accent-primary"
            id="whatsapp-toggle"
            onChange={(event) => setWhatsapp(event.target.checked)}
            type="checkbox"
          />
          <div className="flex-1">
            <label className="cursor-pointer text-[13px] font-semibold" htmlFor="whatsapp-toggle">
              WhatsApp me the split bill link
            </label>
            <p className="text-[10px] font-semibold text-outline">
              Receive your itemized total + instant UPI payment link when the host finalizes the check.
            </p>
          </div>
        </div>
      </div>

      <button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-md transition-transform hover:bg-primary-container active:scale-[0.98]"
        onClick={() => showToast(`Joining table as ${name.trim() || "Guest"}...`)}
        type="button"
      >
        Join Table #4 Now
        <Icon name="arrow" className="h-5 w-5" />
      </button>
      <p className="mt-2 text-center text-[10px] font-semibold text-outline">
        No payment requested upfront. Split seamlessly at the end of the meal.
      </p>
    </div>
  );
}
