import axios from "../lib/axios";
import { create } from "zustand";
import {toast} from "react-hot-toast";


export const useProductStore = create((set) => ({
    products : [],
    loading: false,

    setProducts: (products)=> set({products}),

    createProduct: async (productData)=>{
        set({loading: true});
        try {
            const res = await axios.post('/product',productData);
            set((prevData)=>({
                products: [...prevData.products , res.data], loading : false
            }));
            toast.success("Product created successfully!");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading:false})
        }
    },
    fetchAllProducts: async ()=>{
        set({loading: true});
        try {
            const res = await axios.get('/product');
            set({products:res.data.products , loading : false});
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading:false})
        }
    },
    fetchProductByCategory: async (category)=>{
        set({loading : true})
        try {
            const res = await axios.get(`/product/category/${category}`);
        set({products: res.data.products})
        } catch (error) {
            set({ error : "Failed to fetch products", loading: false});
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    ,
    deleteProduct: async (productId)=>{
        set({loading: true});
        try {
             await axios.delete(`/product/${productId}`);
            set((prevData)=>({
                products: prevData.products.filter((product)=> product._id !== productId), loading: false
            }));
            toast.success("Product deleted successfully!"); 
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading:false})
        }
    },
    toggleFeaturedProduct: async (id)=>{
        set({loading: true});
        try {
            const res = await axios.patch(`/product/${id}`);
            
            set((prevData)=>({
                products: prevData.products.map((product)=> product._id === id ? {...product , isFeatured: res.data.isFeatured}: product),
                loading : false
            }))
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            set({loading:false})
        }
    },
    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/product/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));