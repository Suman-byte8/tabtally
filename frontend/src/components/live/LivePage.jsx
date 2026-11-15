import Link from "next/link";
import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import BillBreakdownCard from "./BillBreakdownCard";
import OrderItemsCard from "./OrderItemsCard";
import SettlementsCard from "./SettlementsCard";
import TableGuestsCard from "./TableGuestsCard";

export default function LivePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5">
        <Link className="inline-flex items-center gap-2 text-sm font-medium text-outline transition hover:text-primary" href="/">
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
          Dashboard
        </Link>

        <section className="overflow-hidden rounded-card bg-white shadow-sm">
          <div className="relative bg-gradient-to-br from-[#d6b98f] via-[#8a6c4a] to-[#35463c] p-5 text-white">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  Live order
                </span>
                <h1 className="mt-4 text-2xl font-semibold tracking-tight">Burma Burma</h1>
                <p className="mt-1 text-sm text-white/85">Restaurant &amp; Tea Room</p>
              </div>
              <Icon name="restaurant" className="relative mt-1 h-7 w-7" />
            </div>
            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-3 text-sm text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="pin" className="h-4 w-4" />
                Indiranagar, Bengaluru
              </span>
              <span>Session TAB-8821</span>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-outline-variant/50 px-2 py-3 text-center">
            <div><p className="text-xs text-outline">Dishes</p><p className="mt-0.5 font-semibold">8</p></div>
            <div><p className="text-xs text-outline">Guests</p><p className="mt-0.5 font-semibold">5</p></div>
            <div><p className="text-xs text-outline">Order status</p><p className="mt-0.5 font-semibold text-primary">Preparing</p></div>
          </div>
        </section>

        <TableGuestsCard />
        <OrderItemsCard />
        <BillBreakdownCard />
        <SettlementsCard />

        <a
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-container"
          href="#bill-breakdown"
        >
          Review bill breakdown
          <Icon name="arrow" className="h-4 w-4" />
        </a>
      </main>
      <BottomNavigation activePage="live" />
    </div>
  );
}
