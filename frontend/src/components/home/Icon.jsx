const icons = {
  add: <path d="M12 5v14m-7-7h14" />,
  arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
  bar: <><path d="M8 3v7m4-7v7m-6 0h8l-1 11H7L6 10Zm10-7v18" /><path d="M16 3c3 2 3 5 0 7" /></>,
  calculate: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  lock:<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>,
  dinner: <><path d="M3 3v7a3 3 0 0 0 6 0V3M6 3v18m12-18v18m0-18c-3 3-4 7-4 11h4" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  handshake: <><path d="m8 12 2 2a2 2 0 0 0 3 0l3-3" /><path d="m3 9 4-4 5 2 5-2 4 4-3 3-3-1-4 4-5-4-3 2-3-4Z" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  logout: <><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="m10 17-5-5 5-5M5 12h11" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  history:<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5m4-1v5l3 2" /></>,
  notifications: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  qr: <><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zm4 0h2v6h-2zm-4 4h2v2h-2z" /></>,
  receipt: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z" /><path d="M8 8h8m-8 4h8m-8 4h4" /></>,
  restaurant: <><path d="M6 3v7m4-7v7M8 10v11m8-18v18m0-18c3 3 3 8 0 10" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" /></>,
  swap: <><path d="M7 7h14l-4-4m4 4-4 4M17 17H3l4 4m-4-4 4-4" /></>,
  wallet: <><rect x="3" y="6" width="18" height="15" rx="2" /><path d="M3 9h18M16 15h2M6 6l2-3h11" /></>,
};

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {icons[name] || icons.grid}
    </svg>
  );
}
