import Link from "next/link";
import Icon from "./Icon";

const guests = [
  { initial: "S", name: "Suman (You)", tone: "bg-primary text-white", host: true },
  { initial: "R", name: "Rahul", tone: "bg-secondary-container text-secondary" },
  { initial: "P", name: "Priya", tone: "bg-surface-high text-foreground" },
  { initial: "A", name: "Amit", tone: "bg-surface-container text-foreground" },
  { initial: "R", name: "Rohan", tone: "bg-secondary-container/70 text-secondary" },
];

export default function ActiveSessionCard() {
  return (
    <section className="overflow-hidden rounded-card bg-white shadow-sm" id="active-session">
      <div className="relative flex h-32 items-end bg-gradient-to-br from-[#d6b98f] via-[#8a6c4a] to-[#35463c] p-4">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <span className="relative text-xs font-medium uppercase tracking-wider text-white">Indiranagar, Bengaluru</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary">
          Ordering active
        </span>
      </div>
      <div className="space-y-5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Burma Burma</h2>
            <p className="text-sm text-outline">Restaurant &amp; Tea Room · Today, 8:45 PM</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs text-outline">Session code</span>
            <p className="font-semibold">TAB-8821</p>
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-outline">Companions at table</span>
            <span className="font-medium text-primary">5 seated</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {guests.map((guest) => (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-low py-1 pl-1 pr-2.5 text-xs" key={guest.name}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${guest.tone}`}>
                  {guest.initial}
                </span>
                <span>{guest.name}</span>
                {guest.host && <span className="text-[9px] font-bold text-primary">HOST</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-outline-variant/50 rounded-xl bg-surface-low px-2 py-3 text-center">
          <div><p className="text-xs text-outline">Dishes</p><p className="font-semibold">8</p></div>
          <div><p className="text-xs text-outline">Subtotal</p><p className="font-semibold">₹3,420</p></div>
          <div><p className="text-xs text-outline">Pending</p><p className="font-semibold text-primary">2 unpaid</p></div>
        </div>
        <Link className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-container" href="/live">
          Manage live order &amp; splitting
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
