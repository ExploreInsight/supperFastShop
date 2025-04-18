import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className="rounded-xl bg-gradient-to-br from-[#0f172a] to-blue-900 p-6 shadow-xl border border-blue-700/40">
			<div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
				{/* Product Image */}
				<div className="shrink-0 md:order-1">
					<img
						className="h-24 w-24 md:h-32 md:w-32 rounded-lg object-cover border border-gray-600"
						src={item.image}
						alt={item.name}
					/>
				</div>

				{/* Quantity and Price */}
				<div className="flex items-center justify-between md:order-3 md:flex-col md:items-end gap-4">
					{/* Quantity Control */}
					<div className="flex items-center gap-3">
						<button
							className="h-7 w-7 flex items-center justify-center rounded-md border border-gray-600 bg-slate-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className="text-white w-4 h-4" />
						</button>
						<p className="text-white text-lg font-medium">{item.quantity}</p>
						<button
							className="h-7 w-7 flex items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className="text-white w-4 h-4" />
						</button>
					</div>

					{/* Price */}
					<p className="text-emerald-500 text-[1.2rem] font-semibold">
						<span className="text-white mr-1.5">Price:</span>${item.price}
					</p>
				</div>

				{/* Product Info */}
				<div className="w-full flex-1 min-w-0 space-y-3 md:order-2 md:max-w-md">
					<h3 className="text-2xl font-bold text-white hover:text-blue-400 hover:underline">
						{item.name[0].toUpperCase() + item.name.slice(1)}
					</h3>
					<p className="text-lg text-gray-100">{item.description[0].toUpperCase() + item.description.slice(1)}</p>

					<button
						className="text-[1rem] text-red-400 hover:text-red-300 hover:underline inline-flex items-center gap-1"
						onClick={() => removeFromCart(item._id)}
					>
						<Trash className="w-4 h-4" />
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
