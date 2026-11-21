// Scrolling label tape. Content is duplicated for a seamless loop; the copy is hidden from screen readers.
const Tape = ({ items, className = "" }) => {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden bg-ink text-paper ${className}`} aria-hidden="true">
      <div className="tape-track flex w-max">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <li key={i} className="font-display font-black text-2xl uppercase px-5 py-2.5 whitespace-nowrap">
                {t}
                <span className="ml-10 text-sticker">/</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Tape;
