import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";


export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  confirmingAuth: true,
  // refreshPromise: null, // Store refreshPromise in Zustand

  // Signup method
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success("Signup successful. Welcome aboard!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Login method
  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("You're in! Welcome back to your account.");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Logout method
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // Confirm authentication and get user profile
  confirmAuth: async () => {
    set({ confirmingAuth: true });
    try {
      const res = await axios.get("/auth/getProfile");
      set({ user: res.data.user, confirmingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ confirmingAuth: false, user: null });
      // toast.error("Session expired or invalid. Please log in again.",{id:"session-expired"});
    }
  },

  // Refresh token method
  refreshToken: async () => {
    if (get().confirmingAuth) return;

    set({ confirmingAuth: true });
    try {
      const response = await axios.post("/auth/refresh");
      set({ confirmingAuth: false });
      return response.data;
    } catch (error) {
      set({ user: null, confirmingAuth: false });
      toast.error("Session expired. Please log in again.",{id:"session-expired"});
      throw error;
    }
  },
}));

// Axios interceptor for handling 401 errors and token refresh
let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // if the refreshPromise is already in progress, wait for it to finish
        if (refreshPromise) {
          refreshPromise;
          return axios(originalRequest);
        }
        // if not in progress then start a new Promise
      
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null; // reset the promise after it resloves 

        return axios(originalRequest);
      } catch (error) {
        // if refresh token fails, logout the user 
        useUserStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


// this is similar approch but here we are using Zustand store but the problem is that we have to refresh the token every time
// we make a request and it will not be efficient as we are using the same store for all the requests and it will

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const store = useUserStore.getState();

//       try {
//         if (store.refreshPromise) {
//           await store.refreshPromise;
//           return axios(originalRequest);
//         }

//         const refresh = store.refreshToken();
//         store.refreshPromise = refresh;

//         await refresh;
//         store.refreshPromise = null;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         store.logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
