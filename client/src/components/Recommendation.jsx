import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const Recommendation = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
  

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/product/recommendtion");
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response.data.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='mt-8'>
			<h3 className=' text-4xl font-semibold text-blue-400'>People also bought</h3>
			<div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center'>
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};
export default Recommendation;