import { forwardRef, useId } from "react";

const TextField = forwardRef(({ label, hint, className = "", ...rest }, ref) => {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-label text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input ref={ref} id={id} className="w-full bg-white/60 text-ink border-2 border-ink rounded-md px-3.5 py-3 text-base focus:bg-white" {...rest} />
      {hint && <p className="text-sm text-muted mt-1">{hint}</p>}
    </div>
  );
});
TextField.displayName = "TextField";

export default TextField;
