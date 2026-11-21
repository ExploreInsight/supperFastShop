const Toggle = ({ checked, onChange, label, hint, icon: IconComponent }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between gap-4 rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-3 text-left hover:border-blue-500/60 transition-colors"
  >
    <span className="flex items-center gap-3">
      <IconComponent className="w-5 h-5 text-blue-400" />
      <span>
        <span className="block font-medium">{label}</span>
        <span className="block text-sm text-gray-400">{hint}</span>
      </span>
    </span>
    <span
      className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </span>
  </button>
);

export default Toggle;
