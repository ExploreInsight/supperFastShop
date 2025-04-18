import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const {
		coupon,
		isCouponApplied,
		applyCoupon,
		getMyCoupon,
		removeCoupon,
		
	} = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode || isCouponApplied) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='w-full rounded-xl border bg-gradient-to-r from-[#0f172a] to-blue-900 
          border-blue-700/40 p-6 shadow-md space-y-4'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='space-y-4'>
				<div>
					<label htmlFor='voucher' className='mb-2 block text-sm font-medium text-gray-300'>
						Do you have a voucher or gift card?
					</label>
					<input
						type='text'
						id='voucher'
						className='block w-full rounded-lg border border-gray-600 bg-gray-700 
							p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 
							focus:ring-blue-500'
						placeholder='Enter code here'
						value={userInputCode}
						onChange={(e) => setUserInputCode(e.target.value)}
						required
					/>
				</div>

				<motion.button
					type='button'
					disabled={isCouponApplied || !userInputCode}
					className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium 
						${isCouponApplied ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white text-[.9rem] hover:bg-blue-700 focus:ring-blue-300'}
						focus:outline-none focus:ring-4`}
					whileHover={{ scale: isCouponApplied ? 1 : 1.05 }}
					whileTap={{ scale: isCouponApplied ? 1 : 0.95 }}
					onClick={handleApplyCoupon}
				>
					{isCouponApplied ? 'Already Applied' : 'Apply Code'}
				</motion.button>

			</div>

			{/* Show applied coupon with remove button */}
			{isCouponApplied && coupon && (
				<div className='mt-4 rounded-md bg-gray800 p-4'>
					<h3 className='text-lg font-medium text-gray-300'>Applied Coupon</h3>
					<p className='mt-2 text-sm text-gray-300'>
						✅ {coupon.code} - {coupon.discountPercentage}% off
					</p>

					<motion.button
						type='button'
						className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 
							px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
							focus:ring-4 focus:ring-red-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</motion.button>
				</div>
			)}

			{/* Show available coupon only if not yet applied */}
			{coupon && !isCouponApplied && (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-gray-300'>Your Available Coupon:</h3>
					<p className='mt-2 text-sm text-gray-400'>
						{coupon.code} - {coupon.discountPercentage}% off
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default GiftCouponCard;
