import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async ()=>{
    try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
  },
  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupons/validate",{code});
      set({coupon : res.data, isCouponApplied: true} );
      get().calculateTotals();
      toast.success("Coupon applied successfully!");
    } catch (error) {
      toast.error(error.response.data.message || 
        "Failed to apply coupon. Please try again.");
    }
  },
  removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},
  clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Item added to cart successfully!");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong ");
    }
  },
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart`, { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong ");
    }
  },
  updateQuantity: async (id, quantity)=>{
    if(quantity === 0){
        get().removeFromCart(id);
        return;
    }
    try {
        await axios.put(`/cart/${id}`, { quantity });
    
        set((prevState) => ({
          cart: prevState.cart.map((item) =>
            item._id === id ? { ...item, quantity } : item
          ),
        }));
    
        get().calculateTotals();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
  },
  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let total = subtotal;

    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
 
}));
