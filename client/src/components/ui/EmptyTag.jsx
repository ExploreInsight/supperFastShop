import Tag from "./Tag";

// Empty states are tags too: a blank run of ghost cells and one line of copy.
const EmptyTag = ({ title, children, action, className = "" }) => (
  <Tag hole string className={`px-8 pt-14 pb-8 text-center max-w-md mx-auto ${className}`} wrapClassName="mt-16">
    <div className="flex justify-center gap-1.5 mb-5" aria-hidden="true">
      {["XS", "S", "M", "L", "XL"].map((s) => (
        <span key={s} className="h-9 min-w-9 px-1.5 rounded-[4px] border-2 border-dashed border-ink/30 text-ink/35 font-label text-xs flex items-center justify-center">
          {s}
        </span>
      ))}
    </div>
    <h2 className="text-4xl mb-2">{title}</h2>
    <p className="text-muted mb-6">{children}</p>
    {action}
  </Tag>
);

export default EmptyTag;
