const Toggle = ({ checked, onChange, label, hint }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between gap-4 rounded-md border-2 border-ink/25 px-4 py-3 text-left hover:border-ink transition-colors"
  >
    <span>
      <span className="block font-bold">{label}</span>
      <span className="block text-sm text-muted">{hint}</span>
    </span>
    <span className={`relative w-12 h-7 rounded-full shrink-0 transition-colors ${checked ? "bg-ink" : "bg-ink/25"}`}>
      <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-paper transition-transform ${checked ? "translate-x-5" : ""}`} />
    </span>
  </button>
);

export default Toggle;
