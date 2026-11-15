import Icon from "./Icon";

const sessions = [
  { venue: "Toit Brewpub, Indiranagar", detail: "4 companions · 12 Oct", amount: "₹4,890.00", status: "All paid", icon: "bar" },
  { venue: "Meghana Foods, Koramangala", detail: "3 companions · 04 Oct", amount: "₹1,640.00", status: "Settled", icon: "dinner" },
];

export default function RecentSessions() {
  return (
    <section className="space-y-3" id="recent">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent feasts</h2>
        <a className="text-sm font-medium text-primary hover:underline" href="#recent">View archive</a>
      </div>
      <div className="space-y-2">
        {sessions.map((session) => (
          <article className="flex items-center justify-between gap-3 rounded-card bg-white p-3 shadow-sm" key={session.venue}>
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container text-secondary">
                <Icon name={session.icon} />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold">{session.venue}</h3>
                <p className="text-xs text-outline">{session.detail}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold">{session.amount}</p>
              <p className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                <Icon name="check" className="h-3.5 w-3.5" />
                {session.status}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
