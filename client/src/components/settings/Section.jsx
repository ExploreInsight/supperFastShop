const Section = ({ title, children }) => (
  <section className="rounded-xl border border-gray-700 bg-gray-800/40 p-5 sm:p-6">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </section>
);

export default Section;
