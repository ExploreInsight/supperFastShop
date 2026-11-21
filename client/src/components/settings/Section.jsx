import Tag from "../ui/Tag";

const Section = ({ title, hint, children }) => (
  <Tag as="section" className="p-5 sm:p-7">
    <h2 className="text-4xl">{title}</h2>
    {hint && <p className="mt-1 text-muted">{hint}</p>}
    <div className="mt-5">{children}</div>
  </Tag>
);

export default Section;
