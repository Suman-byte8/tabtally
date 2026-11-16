import Link from "next/link";
import Icon from "./Icon";

const items = [
  { key: "home", label: "Home", icon: "grid", href: "/" },
  { key: "live", label: "Live", icon: "restaurant", href: "/live" },
  { key: "bill", label: "Bill & tax", icon: "receipt", href: "/bill" },
  { key: "split", label: "Split", icon: "swap", href: "/split" },
  { key: "history", label: "History", icon: "history", href: "/history" },
  { key: "profile", label: "Profile", icon: "user", href: "/profile" },
];

export default function BottomNavigation({ activePage = "home" }) {
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-outline-variant/40 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-1">
        {items.map((item) => (
          <Link
            aria-current={activePage === item.key ? "page" : undefined}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${activePage === item.key ? "text-primary" : "text-outline hover:text-foreground"}`}
            href={item.href}
            key={item.label}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
