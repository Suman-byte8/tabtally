import Icon from "../home/Icon";
import { diners, formatCurrency, itemTotal } from "./liveData";

function assignedLabel(item) {
  if (item.assigned.length === diners.length) return "Table Shared";
  if (item.mode === "individual" || item.assigned.length === 1) return `${item.assigned[0]} only`;
  if (item.mode === "equal" && item.assigned.length > 3) return "Equal Split";
  if (item.assigned.length === 2) return item.assigned.join(" & ");
  return item.assigned.join(", ");
}

function shareLabel(item) {
  const total = itemTotal(item);
  if (item.assigned.length === 1) return { text: "Individual", tone: "text-outline" };
  const each = formatCurrency(Number((total / item.assigned.length).toFixed(2)));
  if (item.mode === "custom") return { text: `Custom (${item.assigned.map(() => each).join(" / ")})`, tone: "text-tertiary" };
  return { text: `${each} / ea`, tone: "text-primary" };
}

export default function OrderItemCard({ item, editing, onEdit, onRemove }) {
  const share = shareLabel(item);

  return (
    <article className={`relative rounded-xl bg-white p-3 shadow-sm transition-all ${editing ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 shrink-0 items-center justify-center rounded-md bg-secondary-container px-1 text-[10px] font-bold text-primary">{item.qty}×</span>
            <h3 className="truncate font-semibold">{item.name}</h3>
          </div>
          {item.note ? (
            <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-surface-high px-2 py-0.5 text-[11px] text-tertiary">
              <Icon name="receipt" className="h-[13px] w-[13px]" />
              {item.note}
            </span>
          ) : (
            <p className="mt-0.5 text-[10px] font-semibold text-outline">
              {item.detail ? `${item.detail} • ` : ""}
              {formatCurrency(item.price)} ea
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xl font-semibold tracking-tight">{formatCurrency(itemTotal(item))}</p>
          <p className={`text-[10px] font-semibold ${share.tone}`}>{share.text}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-surface-low pt-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate rounded bg-surface-container px-2 py-0.5 text-[11px] font-medium text-outline">{assignedLabel(item)}</span>
          <span className="flex shrink-0 items-center -space-x-1.5">
            {item.assigned.map((name) => {
              const diner = diners.find((entry) => entry.name === name);
              return (
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white ${diner?.you ? "bg-secondary-container text-secondary" : "bg-surface-high text-outline"}`}
                  key={name}
                  title={name}
                >
                  {diner?.short}
                </span>
              );
            })}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label={`Edit ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-outline transition-colors hover:bg-surface-container hover:text-foreground"
            onClick={onEdit}
            type="button"
          >
            <Icon name="edit" className="h-[17px] w-[17px]" />
          </button>
          <button
            aria-label={`Remove ${item.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-outline transition-colors hover:bg-error-container/30 hover:text-error"
            onClick={onRemove}
            type="button"
          >
            <Icon name="trash" className="h-[17px] w-[17px]" />
          </button>
        </div>
      </div>
    </article>
  );
}
