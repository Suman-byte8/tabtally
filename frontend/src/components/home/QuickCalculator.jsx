"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function QuickCalculator({ onClose }) {
  const [bill, setBill] = useState("2400");
  const [people, setPeople] = useState("4");
  const [extra, setExtra] = useState("100");
  const [total, setTotal] = useState(625);

  function calculateSplit(event) {
    event.preventDefault();
    const numberOfPeople = Math.max(1, Number.parseInt(people, 10) || 1);
    setTotal(((Number(bill) || 0) + (Number(extra) || 0)) / numberOfPeople);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <section
        aria-labelledby="calculator-title"
        aria-modal="true"
        className="w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="calculate" className="h-5 w-5 text-primary" />
            <h2 className="font-semibold" id="calculator-title">Quick table estimator</h2>
          </div>
          <button
            aria-label="Close calculator"
            className="rounded-full p-2 text-outline hover:bg-surface-low"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={calculateSplit}>
          <label className="block text-sm text-outline">
            Total bill (₹)
            <input
              className="mt-1.5 h-11 w-full rounded-xl bg-surface-low px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
              min="0"
              onChange={(event) => setBill(event.target.value)}
              placeholder="2400"
              type="number"
              value={bill}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-outline">
              People
              <input
                className="mt-1.5 h-11 w-full rounded-xl bg-surface-low px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
                min="1"
                onChange={(event) => setPeople(event.target.value)}
                type="number"
                value={people}
              />
            </label>
            <label className="block text-sm text-outline">
              Tip / extra (₹)
              <input
                className="mt-1.5 h-11 w-full rounded-xl bg-surface-low px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
                min="0"
                onChange={(event) => setExtra(event.target.value)}
                type="number"
                value={extra}
              />
            </label>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-surface-low p-4">
            <span className="text-sm text-outline">Per person</span>
            <output className="text-xl font-semibold text-primary">₹{total.toFixed(2)}</output>
          </div>
          <button
            className="h-12 w-full rounded-xl bg-primary font-semibold text-white transition hover:bg-primary-container"
            type="submit"
          >
            Calculate split
          </button>
        </form>
      </section>
    </div>
  );
}
