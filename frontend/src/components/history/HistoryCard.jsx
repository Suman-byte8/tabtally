import Link from "next/link";
import Icon from "../home/Icon";

export default function HistoryCard({ feast }) {
  return (
    <article className="flex flex-col rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-container/60 text-primary">
            <Icon name="restaurant" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h4 className="truncate text-xl font-semibold tracking-tight">{feast.name}</h4>
            <p className="text-[10px] font-semibold text-outline">{feast.meta}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-semibold text-secondary">
          <Icon name="check" className="h-[13px] w-[13px] text-primary" />
          Settled
        </span>
      </div>

      {feast.promo && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-low px-2.5 py-1.5 text-[10px] font-semibold">
          <span className="flex items-center gap-1 text-outline">
            <Icon name="tag" className="h-3.5 w-3.5 text-primary" />
            {feast.promo.label}
          </span>
          <span className="text-primary">{feast.promo.saved}</span>
        </div>
      )}

      <div className={`mt-3 flex items-center justify-between pt-3 ${feast.promo ? "" : "border-t border-surface-container"}`}>
        <div>
          <p className="text-[10px] font-semibold text-outline">Your Share</p>
          <p className="flex items-baseline gap-1">
            <span className="text-lg font-bold">{feast.share}</span>
            <span className="text-[10px] font-semibold text-outline">of {feast.total}</span>
          </p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] font-semibold ${feast.sideHighlight ? "text-primary" : "text-outline"}`}>{feast.sideLabel}</p>
          <p className={feast.sideHighlight ? "text-lg font-bold text-primary" : "text-xs font-medium"}>{feast.sideValue}</p>
        </div>
      </div>

      <div className={`mt-3 flex items-center justify-between pt-2.5 ${feast.promo ? "border-t border-surface-container" : ""}`}>
        <div className="flex items-center gap-1.5 overflow-hidden">
          {feast.tags.map((tag) => (
            <span className="truncate rounded-md bg-surface-low px-2 py-0.5 text-[10px] font-semibold text-outline" key={tag}>{tag}</span>
          ))}
          {feast.hostedTag && (
            <span className="truncate rounded-md bg-secondary-container/50 px-2 py-0.5 text-[10px] font-semibold text-secondary">{feast.hostedTag}</span>
          )}
        </div>
        <Link className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-primary hover:text-primary-container" href="/bill">
          {feast.action}
          <Icon name="chevron" className="h-4 w-4 -rotate-90" />
        </Link>
      </div>
    </article>
  );
}
