const Star = ({ fill }) => (
  <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
    <path
      d="M10 1.6l2.5 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.1 2.8 1-5.8L1.7 7.7l5.8-.8z"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const Rating = ({ value = 0, count, onChange, className = "" }) => (
  <span className={`inline-flex items-center gap-1.5 ${className}`}>
    <span className="inline-flex" role={onChange ? "radiogroup" : "img"} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) =>
        onChange ? (
          <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => onChange(n)} className="p-0.5">
            <Star fill={n <= value} />
          </button>
        ) : (
          <Star key={n} fill={n <= Math.round(value)} />
        )
      )}
    </span>
    {count !== undefined && <span className="font-label text-xs num">{count ? `${value.toFixed(1)} (${count})` : "No reviews"}</span>}
  </span>
);

export default Rating;
