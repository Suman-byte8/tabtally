import ActiveSessionCard from "./ActiveSessionCard";
import BalanceCard from "./BalanceCard";
import BottomNavigation from "./BottomNavigation";
import DashboardActions from "./DashboardActions";
import HomeHeader from "./HomeHeader";
import JoinSessionCard from "./JoinSessionCard";
import RecentSessions from "./RecentSessions";
import Icon from "./Icon";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5" id="dashboard">
        <section className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Namaste, Suman</h1>
            <p className="mt-1 text-sm text-outline">Order together. Split fairly.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-surface-container px-3 py-2 text-xs font-medium">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Table 4 live
          </span>
        </section>
        <section className="space-y-3 rounded-card bg-secondary-container/50 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <Icon name="restaurant" className="h-5 w-5 shrink-0 text-primary" />
              <h2 className="truncate text-sm font-semibold">Burma Burma, Indiranagar</h2>
            </div>
            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-primary">5 friends</span>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-outline">Estimated consumption</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">₹3,420<span className="text-sm font-normal text-outline">.00</span></p>
            </div>
            <Link className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-white transition hover:bg-primary-container" href="/live">
              Live tab <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <DashboardActions />
        <ActiveSessionCard />
        <BalanceCard />
        <JoinSessionCard />
        <RecentSessions />
        <aside className="flex items-start gap-3 rounded-card bg-secondary-container/40 p-4 text-sm text-outline">
          <Icon name="handshake" className="mt-0.5 h-5 w-5 shrink-0" />
          <p>TabTally can split GST and service charges proportionally, so everyone knows their fair share.</p>
        </aside>
      </main>
      <BottomNavigation activePage="home" />
    </div>
  );
}
