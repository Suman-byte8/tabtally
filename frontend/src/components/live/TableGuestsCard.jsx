const guests = [
  { name: "Suman", label: "Host", initial: "S", paid: true },
  { name: "Rahul", label: "Settled", initial: "R", paid: true },
  { name: "Priya", label: "Settled", initial: "P", paid: true },
  { name: "Amit", label: "Payment due", initial: "A", paid: false },
  { name: "Rohan", label: "Payment due", initial: "R", paid: false },
];

export default function TableGuestsCard() {
  return (
    <section className="space-y-4 rounded-card bg-white p-4 shadow-sm" id="table-guests">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Your table</h2>
          <p className="mt-0.5 text-xs text-outline">3 settled · 2 payments due</p>
        </div>
        <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-medium text-secondary">5 guests</span>
      </div>
      <ul className="space-y-3">
        {guests.map((guest) => (
          <li className="flex items-center justify-between gap-3" key={guest.name}>
            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${guest.paid ? "bg-secondary-container text-secondary" : "bg-surface-high text-foreground"}`}>
                {guest.initial}
              </span>
              <div>
                <p className="text-sm font-medium">{guest.name}</p>
                <p className="text-xs text-outline">{guest.label}</p>
              </div>
            </div>
            {guest.paid ? (
              <span className="text-xs font-medium text-primary">{guest.label}</span>
            ) : (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">{guest.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
