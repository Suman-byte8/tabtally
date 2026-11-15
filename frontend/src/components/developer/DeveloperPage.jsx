import BottomNavigation from "../home/BottomNavigation";
import HomeHeader from "../home/HomeHeader";
import Icon from "../home/Icon";
import SupportCard from "./SupportCard";

export const developer = {
  name: "Arjun Mehta",
  initials: "AM",
  role: "Full-stack Product Designer & Indie Hacker",
  location: "Bengaluru, India 🇮🇳",
  email: "arjun@tabtally.app",
  upi: "tabtally@okhdfcbank",
};

const socials = [
  { label: "GitHub", value: "@arjunmehta", href: "https://github.com", icon: "link" },
  { label: "X / Twitter", value: "@arjunbuilds", href: "https://twitter.com", icon: "link" },
  { label: "LinkedIn", value: developer.name, href: "https://linkedin.com", icon: "link" },
  { label: "Email", value: developer.email, href: `mailto:${developer.email}`, icon: "mail" },
];

const metrics = [
  { value: "12.4k+", label: "Tables Settled" },
  { value: "100%", label: "Ad-Free" },
  { value: "₹0", label: "Data Sold" },
];

const changelog = [
  "Proportional GST engine with custom tip offsets",
  "Instant UPI deep links for GPay & PhonePe settlement",
  "Offline cached math ledger for low restaurant reception",
];

export default function DeveloperPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <HomeHeader />
      <main className="mx-auto w-full max-w-lg space-y-5 px-4 pb-28 pt-5">
        <section className="flex flex-col items-start gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Creator &amp; Indie Developer
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">Crafted with care in Bengaluru</h1>
          <p className="max-w-sm text-sm text-outline">
            TabTally is an independent passion project built to eliminate awkward bill math and keep dining social.
          </p>
        </section>

        <section className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary-container text-2xl font-semibold text-primary">
              {developer.initials}
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <Icon name="check" className="h-[15px] w-[15px]" />
              </span>
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-medium tracking-tight">{developer.name}</h2>
              <p className="truncate text-xs font-medium text-primary">{developer.role}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-outline">
                <Icon name="pin" className="h-3.5 w-3.5" />
                {developer.location}
              </p>
            </div>
          </div>
          <p className="rounded-lg bg-surface-low p-3 text-[13px] leading-relaxed text-outline">
            &ldquo;Hey! I built TabTally after too many chaotic Indiranagar dinner tabs with messy GST splits and forgotten UPI transfers. TabTally is 100% ad-free, tracker-free, and respects your privacy.&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-1 pt-1">
            {socials.map((social) => (
              <a
                className="flex items-center gap-2 rounded-lg bg-surface-container p-2.5 transition-colors hover:bg-surface-high"
                href={social.href}
                key={social.label}
                rel="noopener noreferrer"
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                <Icon name={social.icon} className="h-[18px] w-[18px] shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold text-outline">{social.label}</span>
                  <span className="block truncate text-[13px] font-medium">{social.value}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-3 gap-1">
          {metrics.map((metric) => (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white p-3 text-center shadow-sm" key={metric.label}>
              <span className="text-lg font-semibold text-primary">{metric.value}</span>
              <span className="mt-0.5 text-[10px] font-semibold text-outline">{metric.label}</span>
            </div>
          ))}
        </section>

        <SupportCard upi={developer.upi} />

        <section className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium tracking-tight">What&apos;s New in v1.4</h3>
            <span className="text-[10px] font-semibold text-outline">Latest release</span>
          </div>
          <ul className="flex flex-col gap-2">
            {changelog.map((item) => (
              <li className="flex items-center gap-2 text-[13px]" key={item}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <a
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container py-2.5 text-xs font-medium transition-colors hover:bg-surface-high active:scale-[0.99]"
            href={`mailto:${developer.email}?subject=${encodeURIComponent("TabTally Feedback or Feature Request")}`}
          >
            <Icon name="send" className="h-[18px] w-[18px] text-primary" />
            Request a Feature or Report Bug
          </a>
        </section>

        <footer className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-center">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <Icon name="heart" className="h-[18px] w-[18px] fill-current" />
            Community First
          </span>
          <p className="max-w-xs text-[13px] text-outline">
            Thank you for supporting indie software. Built with love for good food and great company.
          </p>
        </footer>
      </main>
      <BottomNavigation activePage="home" />
    </div>
  );
}
