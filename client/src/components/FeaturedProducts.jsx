import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const {user} = useUserStore();
	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleCart = ( product ) =>{
		if(!user){
		 toast.error("Please Login to add items to your cart",{id:"login"});
		 return;
		}
		addToCart(product);
	}
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-16'>
			<div className='container mx-auto px-4'>
			<h2 className='text-center font-bold text-2xl sm:text-5xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all duration-300 mb-9 py-4'>
					Featured Products
				</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts.map((product) => (
								<div key={product._id} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3'>
									<div className='bg-gradient-to-br from-[#0f172a] to-blue-900 rounded-xl shadow-xl border border-blue-700/40 p-4'>

										<div className='overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-xl font-semibold text-white mb-1'>{product.name[0].toUpperCase() + product.name.slice(1)}</h3>
											<p className='text-blue-300 text-lg font-medium mb-4'>
												${product.price.toFixed(2)}
											</p>
											<button
												onClick={()=>handleCart(product)}
												className='w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-colors duration-300'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Arrows */}
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-5 transform -translate-y-1/2 p-2 rounded-full shadow ${
							isStartDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6 text-white' />
					</button>
					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-5 transform -translate-y-1/2 p-2 rounded-full shadow ${
							isEndDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
						}`}
					>
						<ChevronRight className='w-6 h-6 text-white' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
