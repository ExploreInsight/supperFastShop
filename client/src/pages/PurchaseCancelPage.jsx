import { useEffect, useState } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const PurchaseCancelPage = () => {
	const navigate = useNavigate();
	const [secondsLeft , setSecondsLeft] = useState(10);

	useEffect(() => {
		const interval = setInterval(()=>{
			setSecondsLeft((prev)=>{
				if(prev<= 1){
					clearInterval(interval);
					navigate("/");
					return 0;
				}
				return prev - 1;
			})
		}, 1000);

		return () => clearInterval(interval);
	}, [navigate]);

	return (
		<div
			className="min-h-screen flex items-center justify-center px-4 bg-gray-900 relative overflow-hidden"
		>
			{/* Background blur effect */}
			<div className="absolute inset-0 backdrop-blur-sm z-0" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-10"
			>
				<div className="p-6 sm:p-8">
					<div className="flex justify-center">
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: [1, 1.1, 1] }}
							transition={{
								repeat: Infinity,
								duration: 1.5,
								ease: "easeInOut",
							}}
						>
							<XCircle className="text-red-500 w-16 h-16 mb-4" />
						</motion.div>
					</div>

					<h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-3">
						Purchase Cancelled
					</h1>

					<p className="text-gray-300 text-center mb-4 sm:mb-6">
						Your order has been cancelled. No charges have been made.
					</p>

					<div className="bg-gray-700 rounded-lg p-4 mb-6 text-center">
						<p className="text-sm text-gray-400">
							If you faced any issues during checkout, feel free to contact our support team.
						</p>
					</div>

					<div className="space-y-4">
						<Link
							to={"/"}
							className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 
              rounded-lg transition duration-300 flex items-center justify-center"
						>
							<ArrowLeft className="mr-2" size={18} />
							Return to Shop
						</Link>
					</div>

					<p className="text-center text-xs text-gray-500 mt-4">
						Redirecting to home in {secondsLeft} seconds...
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
