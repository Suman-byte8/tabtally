"use client";

import { useState } from "react";

export default function Toggle({ label, description, defaultChecked = true }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        {description && <span className="block text-[13px] text-outline">{description}</span>}
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input checked={checked} className="peer sr-only" onChange={(event) => setChecked(event.target.checked)} type="checkbox" />
        <span className="h-6 w-11 rounded-full bg-surface-high transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40" />
      </span>
    </label>
  );
}
