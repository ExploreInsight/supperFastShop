// Loading state: a size run that stamps in cell by cell.
const Spinner = ({ label = "Loading" }) => (
  <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-label={label}>
    <div className="flex gap-1.5">
      {["XS", "S", "M", "L", "XL"].map((s, i) => (
        <span
          key={s}
          className="h-10 min-w-10 px-2 rounded-[4px] bg-ink text-paper font-label text-sm font-semibold flex items-center justify-center animate-pulse"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

export default Spinner;
