import { useMemo } from "react";

// Deterministic Code-39-style bars from any string. Decorative, not scannable.
const Barcode = ({ value = "SUPERFAST", height = 34, label = true, className = "" }) => {
  const bars = useMemo(() => {
    let h = 2166136261;
    const out = [];
    let x = 0;
    for (let i = 0; i < 44; i++) {
      h = Math.imul(h ^ (value.charCodeAt(i % value.length) + i), 16777619) >>> 0;
      const w = 1 + (h % 3);
      if (i % 2 === 0) out.push({ x, w });
      x += w;
    }
    return { out, width: x };
  }, [value]);

  return (
    <figure className={`inline-block max-w-full ${className}`} aria-label={`Code ${value}`}>
      <svg className="max-w-full h-auto" viewBox={`0 0 ${bars.width} ${height}`} width={bars.width * 2} height={height} role="img" aria-hidden="true" preserveAspectRatio="none">
        {bars.out.map((b, i) => (
          <rect key={i} x={b.x} y="0" width={b.w} height={height} fill="currentColor" />
        ))}
      </svg>
      {label && <figcaption className="font-label text-[0.65rem] tracking-[0.2em] mt-1 uppercase">{String(value).slice(-10)}</figcaption>}
    </figure>
  );
};

export default Barcode;
