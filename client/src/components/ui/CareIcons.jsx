const wrap = (children, label) => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>
    {children}
  </svg>
);

export const CARE = [
  { id: "wash", label: "Machine wash cold", icon: wrap(<><path d="M4 9h24l-3 17H7z" /><path d="M9 16c2-2 4 2 7 0s5 2 7 0" /></>, "Machine wash cold") },
  { id: "bleach", label: "Do not bleach", icon: wrap(<><path d="M16 5L28 26H4z" /><path d="M6 4l20 24" /></>, "Do not bleach") },
  { id: "iron", label: "Iron low", icon: wrap(<><path d="M4 24h24c0-8-5-13-12-13H6z" /><circle cx="14" cy="19" r="1.2" fill="currentColor" /></>, "Iron low") },
  { id: "dry", label: "Do not tumble dry", icon: wrap(<><rect x="4" y="4" width="24" height="24" rx="2" /><circle cx="16" cy="16" r="7" /><path d="M5 5l22 22" /></>, "Do not tumble dry") },
];

const CareIcons = ({ className = "" }) => (
  <ul className={`flex gap-2 ${className}`}>
    {CARE.map((c) => (
      <li key={c.id} title={c.label}>
        {c.icon}
      </li>
    ))}
  </ul>
);

export default CareIcons;
