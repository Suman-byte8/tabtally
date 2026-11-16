"use client";

import { useState } from "react";
import Icon from "../home/Icon";
import { diners, formatCurrency, splitModes, suggestions } from "./liveData";

const emptyForm = { name: "", price: "", qty: 1, mode: "equal", assigned: ["Suman", "Rahul", "Priya"], note: "" };

export default function QuickOrderForm({ editing, onSubmit, onCancelEdit }) {
  const [form, setForm] = useState(editing ? toForm(editing) : emptyForm);
  const [flash, setFlash] = useState(false);

  const price = Number(form.price) || 0;
  const total = price * form.qty;
  const count = form.assigned.length;
  const allSelected = count === diners.length;

  function update(patch) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function setMode(mode) {
    update({ mode, assigned: mode === "individual" ? form.assigned.slice(0, 1) : form.assigned });
  }

  function toggleDiner(name) {
    if (form.mode === "individual") {
      update({ assigned: [name] });
      return;
    }
    update({
      assigned: form.assigned.includes(name) ? form.assigned.filter((item) => item !== name) : [...form.assigned, name],
    });
  }

  function toggleAll() {
    if (form.mode === "individual") return;
    update({ assigned: allSelected ? [] : diners.map((diner) => diner.name) });
  }

  function submit() {
    if (!form.name.trim() || price <= 0 || count === 0) return;
    onSubmit({
      name: form.name.trim(),
      price,
      qty: form.qty,
      mode: form.mode,
      assigned: diners.map((diner) => diner.name).filter((name) => form.assigned.includes(name)),
      note: form.note.trim() || undefined,
    });
    if (!editing) setForm({ ...emptyForm, assigned: form.assigned, mode: form.mode });
    setFlash(true);
    setTimeout(() => setFlash(false), 1000);
  }

  const canSubmit = form.name.trim() && price > 0 && count > 0;

  return (
    <section className="rounded-xl bg-white p-3 shadow-sm" id="quick-order">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight">
          <Icon name={editing ? "edit" : "add"} className="h-5 w-5 text-primary" />
          {editing ? "Edit Order Item" : "Quick Order Entry"}
        </h2>
        {editing ? (
          <button className="text-xs font-semibold text-outline hover:text-foreground" onClick={onCancelEdit} type="button">
            Cancel
          </button>
        ) : (
          <span className="rounded-full bg-secondary-container/40 px-2 py-0.5 text-[10px] font-semibold text-primary">Speed Tab</span>
        )}
      </div>

      <div className="-mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-2">
        {suggestions.map((item) => (
          <button
            className="shrink-0 rounded-full bg-surface-low px-2.5 py-1 text-xs text-outline transition-colors hover:bg-surface-container"
            key={item.name}
            onClick={() => update({ name: item.name, price: String(item.price) })}
            type="button"
          >
            + {item.name}
          </button>
        ))}
      </div>

      <div className="mt-2 space-y-2">
        <label className="block text-[10px] font-semibold text-outline" htmlFor="dish-name">
          Item Name
          <span className="relative mt-1 block">
            <input
              className="w-full rounded-lg bg-surface-low px-3 py-2.5 pr-9 text-sm font-normal text-foreground outline-none transition-all focus:bg-white focus:ring-1 focus:ring-primary"
              id="dish-name"
              onChange={(event) => update({ name: event.target.value })}
              placeholder="e.g. Lotus Stem Crisps"
              type="text"
              value={form.name}
            />
            <Icon name="restaurant" className="absolute right-2.5 top-2.5 h-[18px] w-[18px] text-outline" />
          </span>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block text-[10px] font-semibold text-outline" htmlFor="dish-price">
            Price (₹)
            <span className="relative mt-1 block">
              <span className="absolute left-3 top-2 text-xl font-medium">₹</span>
              <input
                className="w-full rounded-lg bg-surface-low py-2 pl-7 pr-3 text-xl font-medium text-foreground outline-none transition-all focus:bg-white focus:ring-1 focus:ring-primary"
                id="dish-price"
                min="0"
                onChange={(event) => update({ price: event.target.value })}
                placeholder="0"
                type="number"
                value={form.price}
              />
            </span>
          </label>
          <div>
            <span className="mb-1 block text-[10px] font-semibold text-outline">Quantity</span>
            <div className="flex items-center justify-between rounded-lg bg-surface-low p-1">
              <button
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl font-bold shadow-sm transition-transform active:scale-95"
                onClick={() => update({ qty: Math.max(1, form.qty - 1) })}
                type="button"
              >
                −
              </button>
              <span className="text-xl font-semibold">{form.qty}</span>
              <button
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl font-bold shadow-sm transition-transform active:scale-95"
                onClick={() => update({ qty: form.qty + 1 })}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <span className="mb-1 block text-[10px] font-semibold text-outline">Allocation Mode</span>
          <div className="grid grid-cols-4 gap-1 rounded-lg bg-surface-low p-1 text-center" role="group" aria-label="Allocation mode">
            {splitModes.map((mode) => (
              <button
                aria-pressed={form.mode === mode.key}
                className={`rounded py-1.5 text-[10px] transition-colors ${form.mode === mode.key ? "bg-white font-semibold text-primary shadow-sm" : "font-medium text-outline hover:text-foreground"}`}
                key={mode.key}
                onClick={() => setMode(mode.key)}
                type="button"
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-outline">
              {form.mode === "individual" ? "Ordered By (pick one)" : `Assigned Participants (${count} Selected)`}
            </span>
            {form.mode !== "individual" && (
              <button className="text-[10px] font-semibold text-primary hover:underline" onClick={toggleAll} type="button">
                {allSelected ? "Clear All" : "Select All"}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {diners.map((diner) => {
              const checked = form.assigned.includes(diner.name);
              return (
                <label
                  className={`flex cursor-pointer select-none items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-all ${checked ? "bg-secondary-container/60 text-secondary" : "bg-surface-low text-outline hover:bg-surface-container"}`}
                  key={diner.name}
                >
                  <input
                    checked={checked}
                    className="h-3.5 w-3.5 accent-primary"
                    name={form.mode === "individual" ? "individual-diner" : undefined}
                    onChange={() => toggleDiner(diner.name)}
                    type={form.mode === "individual" ? "radio" : "checkbox"}
                  />
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${checked ? "bg-primary text-white" : "bg-surface-high"}`}>
                    {diner.short}
                  </span>
                  <span className={`text-[13px] ${checked ? "font-medium" : ""}`}>{diner.formLabel || diner.name}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-surface-low px-3 py-2 text-[13px]">
            <span className="flex items-center gap-1 text-outline">
              <Icon name="calculate" className="h-4 w-4" />
              {count === 0 ? "No diners selected" : count === 1 ? `Charged to ${form.assigned[0]}` : `Shared by ${count} diners`}
            </span>
            <span className="font-semibold text-primary">
              {count === 0 ? "₹0.00" : `${formatCurrency(Number((total / count).toFixed(2)))}${count > 1 ? " each" : ""}`}
            </span>
          </div>
        </div>

        <label className="block text-[10px] font-semibold text-outline" htmlFor="dish-note">
          Kitchen Note (Optional)
          <input
            className="mt-1 w-full rounded-lg bg-surface-low px-3 py-2 text-[13px] font-normal text-foreground outline-none transition-all focus:bg-white focus:ring-1 focus:ring-primary"
            id="dish-note"
            onChange={(event) => update({ note: event.target.value })}
            placeholder="e.g. Less spicy, vegan, extra lime"
            type="text"
            value={form.note}
          />
        </label>

        <button
          className={`flex h-11 w-full items-center justify-center gap-1.5 rounded-xl text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.99] disabled:opacity-50 ${flash ? "bg-primary-container" : "bg-primary hover:bg-primary-container"}`}
          disabled={!canSubmit}
          onClick={submit}
          type="button"
        >
          <Icon name={flash ? "check" : editing ? "edit" : "add"} className="h-5 w-5" />
          {flash ? (editing ? "Updated!" : "Added!") : editing ? "Update Item" : "Add to Active Tab"}
        </button>
      </div>
    </section>
  );
}

function toForm(item) {
  return { name: item.name, price: String(item.price), qty: item.qty, mode: item.mode, assigned: item.assigned, note: item.note || "" };
}
