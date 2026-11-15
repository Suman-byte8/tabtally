"use client";

import { useState } from "react";
import Icon from "./Icon";
import QuickCalculator from "./QuickCalculator";

const actions = [
  { label: "Create Session", icon: "add", tone: "text-primary" },
  { label: "Join via QR", icon: "qr", tone: "text-secondary", join: true },
  { label: "Quick Calc", icon: "calculate", tone: "text-tertiary", calculator: true },
];

export default function DashboardActions() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  function handleAction(action) {
    if (action.calculator) {
      setCalculatorOpen(true);
    } else if (action.join) {
      document.getElementById("join-session")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-card bg-white px-2 py-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            key={action.label}
            onClick={() => handleAction(action)}
            type="button"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-low ${action.tone}`}>
              <Icon name={action.icon} />
            </span>
            <span className="text-xs font-medium leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
      {calculatorOpen && <QuickCalculator onClose={() => setCalculatorOpen(false)} />}
    </>
  );
}
