import React, { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore'
import { useNavigate, useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
	const navigate = useNavigate();
   const {fetchProductByCategory, products} = useProductStore();

   const {category} = useParams();

   useEffect(()=>{
    fetchProductByCategory(category);
   },[fetchProductByCategory,category]);

  return (
    <div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center font-bold text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300 mb-8 py-2'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						 <motion.div
						 className="flex flex-col items-center justify-center col-span-full min-h-[40vh] text-center"
						 initial={{ opacity: 0, y: 10 }}
						 animate={{ opacity: 1, y: 0 }}
						 transition={{ duration: 0.6 }}
					   >
						 <h2 className="text-4xl font-bold text-white mb-2">😕 No Products Found</h2>
						 <p className="text-gray-400 mb-6">
						   We couldn't find any items in the <span className="text-blue-400 font-medium">{category}</span> category.
						 </p>
						 <button
						   className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
						   onClick={() => navigate('/')}
						 >
						   🔙 Go Back Home
						 </button>
					   </motion.div>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
  )
}

export default CategoryPage