import Link from "next/link";
import Icon from "../home/Icon";

const participants = [
  { label: "You (Fronted Bill)", initial: "S", tone: "host" },
  { label: "Rahul (Owes ₹157.50)", initial: "R", tone: "owes" },
  { label: "Amit (Owes ₹87.50)", initial: "A", tone: "owes" },
  { label: "Priya", tone: "settled" },
  { label: "Rohan", tone: "settled" },
];

const nudgeText = "Hey! Gentle reminder to settle your share for Burma Burma on TabTally: https://tabtally.app/s/TAB-8821";

export default function PendingCard() {
  return (
    <section aria-label="Pending settlement" className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-error">
          <span className="h-2 w-2 animate-pulse rounded-full bg-error" />
          Pending Settlement (1)
        </h2>
        <span className="text-[10px] font-semibold text-outline">Updated 12m ago</span>
      </div>

      <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-[#d6b98f] via-[#8a6c4a] to-[#35463c]">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent" />
          <div className="absolute inset-x-3.5 bottom-3 flex items-end justify-between gap-2">
            <div className="text-white">
              <p className="text-xl font-semibold tracking-tight">Burma Burma</p>
              <p className="flex items-center gap-1 text-[10px] font-semibold text-surface-high">
                <Icon name="pin" className="h-[13px] w-[13px]" />
                Indiranagar, Bangalore • Table #4
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-error-container px-2 py-0.5 text-[10px] font-semibold tracking-wide text-error">₹245 PENDING</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-3">
          <div className="flex items-center justify-between text-xs text-outline">
            <span className="flex items-center gap-1">
              <Icon name="history" className="h-4 w-4" />
              Yesterday, 8:45 PM
            </span>
            <span>5 Diners</span>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg bg-surface-low p-2.5 text-center">
            <div>
              <p className="text-[10px] font-semibold text-outline">Total Bill</p>
              <p className="text-lg font-semibold">₹3,265</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-outline">Your Share</p>
              <p className="text-lg font-semibold">₹649</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-primary">To Receive</p>
              <p className="text-lg font-bold text-primary">+₹1,351</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[10px] font-semibold">
              <span>Transfers Progress</span>
              <span className="text-outline">2 of 4 collected (₹739 pending)</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-[65%] bg-primary" />
              <div className="h-full w-[35%] bg-error-container" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-outline">Participant Breakdown</span>
            <ul className="flex flex-wrap items-center gap-1.5">
              {participants.map((person) => (
                <li
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    person.tone === "host" ? "bg-secondary-container text-secondary" : person.tone === "owes" ? "bg-error-container text-error" : "bg-surface-container text-outline"
                  }`}
                  key={person.label}
                >
                  {person.tone === "settled" ? (
                    <Icon name="check" className="h-[13px] w-[13px] text-primary" />
                  ) : (
                    <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${person.tone === "host" ? "bg-primary" : "bg-error"}`}>
                      {person.initial}
                    </span>
                  )}
                  {person.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-semibold text-white shadow-sm transition-transform hover:bg-primary-container active:scale-[0.98]"
              href="/live"
            >
              Open Live Session
              <Icon name="arrow" className="h-[18px] w-[18px]" />
            </Link>
            <a
              className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-surface-low px-3 text-xs font-medium transition-colors hover:bg-surface-container active:scale-[0.98]"
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(nudgeText)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="send" className="h-[18px] w-[18px] text-primary" />
              WhatsApp Nudge
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
