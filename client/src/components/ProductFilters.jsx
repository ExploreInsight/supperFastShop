const ProductFilters = ({ query, onQuery, sort, onSort }) => (
  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
    <input
      type="search"
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      placeholder="Search products..."
      aria-label="Search products"
      className="w-full sm:w-72 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
    />
    <select
      value={sort}
      onChange={(e) => onSort(e.target.value)}
      aria-label="Sort products"
      className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
    >
      <option value="default">Sort: Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name">Name: A-Z</option>
    </select>
  </div>
);

export default ProductFilters;
