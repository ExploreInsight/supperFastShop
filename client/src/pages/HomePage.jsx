import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.webp" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.webp" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.webp" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.webp" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.webp" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.webp" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.webp" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  
	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
				<h1 className='text-center font-bold text-3xl sm:text-6xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300 mb-9 py-[.7rem]'>
					Explore Our Categories
				</h1>
				<p className='text-center text-base text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;