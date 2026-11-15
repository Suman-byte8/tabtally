import Icon from "./Icon";

const items = [
  { label: "Home", icon: "grid", href: "#dashboard" },
  { label: "Live", icon: "restaurant", href: "#active-session" },
  { label: "Bill & tax", icon: "receipt", href: "#join-session" },
  { label: "Split", icon: "swap", href: "#balance" },
  { label: "History", icon: "history", href: "#recent" },
];

export default function BottomNavigation() {
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-outline-variant/40 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-1">
        {items.map((item, index) => (
          <a
            aria-current={index === 0 ? "page" : undefined}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${index === 0 ? "text-primary" : "text-outline hover:text-foreground"}`}
            href={item.href}
            key={item.label}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
