import Link from "next/link";
import Icon from "./Icon";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-outline-variant/40 bg-surface/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <Icon name="restaurant" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-tight tracking-tight">TabTally</p>
            <p className="truncate text-xs text-outline">Order together. Split fairly.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Link
            aria-label="Notifications"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition hover:bg-surface-container"
            href="/notifications"
          >
            <Icon name="notifications" className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-surface" />
          </Link>
          <Link
            aria-label="Profile"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary ring-1 ring-outline-variant/50 transition hover:ring-primary"
            href="/profile"
          >
            <Icon name="user" className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
