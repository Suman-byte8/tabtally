import Icon from "./Icon";

export default function JoinSessionCard() {
  return (
    <section className="space-y-3 rounded-card bg-white p-4 shadow-sm" id="join-session">
      <div className="flex items-center gap-2">
        <Icon name="pin" className="h-5 w-5 text-outline" />
        <h2 className="font-semibold">Join a companion table</h2>
      </div>
      <p className="text-sm text-outline">Enter a friend&apos;s session code to join their table.</p>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="session-code">Session code</label>
        <input
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-xl bg-surface-low px-3 text-center font-medium uppercase tracking-widest outline-none placeholder:font-normal placeholder:tracking-normal focus:ring-2 focus:ring-primary"
          id="session-code"
          maxLength={8}
          placeholder="e.g. TAB-4092"
          type="text"
        />
        <button className="h-11 rounded-xl bg-secondary px-5 text-sm font-semibold text-white transition hover:bg-primary" type="button">
          Join
        </button>
      </div>
    </section>
  );
}
